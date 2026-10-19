import { mkdirSync, writeFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { chromium, type Page } from "@playwright/test";

// Usage: tsx uat-scripts/ada-scan.ts [baseUrl] [concurrency]
// Scans every URL in the sitemap plus routes that are not in it, at 375px and 1440px,
// with WCAG 2.0/2.1/2.2 A+AA rules and axe best practices. Reports violations of every impact.

const BASE = process.argv[2] ?? "http://localhost:3000";
const CONCURRENCY = Number(process.argv[3] ?? 8);
const OUT = "uat-artifacts/ada";
const WIDTHS = [
  { name: "375", width: 375, height: 812 },
  { name: "1440", width: 1440, height: 900 },
];
const EXTRA_PATHS = ["/this-page-does-not-exist", "/slang/no-such-term-xyz"];
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa", "best-practice"];

type Finding = { path: string; width: string; id: string; impact: string | null; nodes: number; target: string };

async function paths(): Promise<string[]> {
  if (process.env.ADA_PATHS) return process.env.ADA_PATHS.split(",");
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const fromSitemap = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  return [...new Set([...fromSitemap, ...EXTRA_PATHS])];
}

async function scan(page: Page, path: string, width: string): Promise<Finding[]> {
  await page.goto(`${BASE}${path}`, { waitUntil: "load", timeout: 60_000 });
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  return results.violations.map((v) => ({
    path,
    width,
    id: v.id,
    impact: v.impact ?? null,
    nodes: v.nodes.length,
    target: v.nodes
      .slice(0, 3)
      .map((n) => n.target.join(" "))
      .join(" | "),
  }));
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const all = await paths();
  const [shard, shards] = (process.env.SHARD ?? "0/1").split("/").map(Number);
  const jobs = all.flatMap((p) => WIDTHS.map((vp) => ({ p, vp }))).filter((_, i) => i % shards === shard);
  const findings: Finding[] = [];
  const failures: string[] = [];
  let done = 0;
  let next = 0;

  async function worker() {
    const browser = await chromium.launch();
    const pages = new Map<string, Page>();
    for (const vp of WIDTHS) {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      pages.set(vp.name, await context.newPage());
    }
    while (next < jobs.length) {
      const job = jobs[next++];
      try {
        findings.push(...(await scan(pages.get(job.vp.name)!, job.p, job.vp.name)));
      } catch (err) {
        failures.push(`${job.p} @${job.vp.name}: ${(err as Error).message.split("\n")[0]}`);
      }
      if (++done % 50 === 0) console.log(`${done}/${jobs.length} scans, ${findings.length} findings`);
    }
    await browser.close();
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const pagesWithViolations = new Set(findings.map((f) => f.path));
  const summary = {
    base: BASE,
    scannedAt: new Date().toISOString(),
    pages: new Set(jobs.map((j) => j.p)).size,
    sitePages: all.length,
    scans: jobs.length,
    scanErrors: failures.length,
    pagesWithViolations: pagesWithViolations.size,
    violations: findings.length,
    byRule: Object.entries(
      findings.reduce<Record<string, number>>((acc, f) => ({ ...acc, [`${f.id} (${f.impact})`]: (acc[`${f.id} (${f.impact})`] ?? 0) + 1 }), {}),
    ),
  };
  const suffix = shards > 1 ? `-shard${shard}` : "";
  writeFileSync(`${OUT}/axe-summary${suffix}.json`, JSON.stringify(summary, null, 2));
  writeFileSync(`${OUT}/axe-findings${suffix}.json`, JSON.stringify({ paths: [...new Set(jobs.map((j) => j.p))], findings, failures }, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  for (const f of findings.slice(0, 40)) console.log(`${f.path} @${f.width} ${f.id} (${f.impact}) x${f.nodes}: ${f.target}`);
  for (const f of failures.slice(0, 20)) console.log(`ERROR ${f}`);
  process.exit(findings.length || failures.length ? 1 : 0);
}

main();
