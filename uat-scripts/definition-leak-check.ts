import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { slugify } from "../lib/slang-core";

// Usage:
//   tsx uat-scripts/definition-leak-check.ts dir .next
//   tsx uat-scripts/definition-leak-check.ts live https://www.jandhtechnology.com
// Samples 20 random terms from Supabase and fails if any 25+ character substring of a definition,
// example, or origin note appears in the build output or on the live term page and site files.

type Row = { term: string; definition: string | null; example: string | null; context: string | null };

const SAMPLE = 20;
const MIN = 25;

function needle(text: string | null): string | null {
  if (!text) return null;
  const runs = text.match(/[A-Za-z0-9 ,]{25,}/g) ?? [];
  const best = runs.sort((a, b) => b.length - a.length)[0]?.trim();
  return best && best.length >= MIN ? best.slice(0, 40).trim() : null;
}

async function sampleRows(): Promise<Row[]> {
  const url = process.env.SLANG_SUPABASE_URL;
  const key = process.env.SLANG_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("SLANG_SUPABASE_URL / SLANG_SUPABASE_ANON_KEY are not set");
  const all: Row[] = [];
  for (let offset = 0; ; offset += 1000) {
    const params = new URLSearchParams({
      select: "term,definition,example,context",
      app_id: "eq.slang_to_english",
      order: "term.asc",
      limit: "1000",
      offset: String(offset),
    });
    const res = await fetch(`${url}/rest/v1/slang_terms?${params}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    const page: Row[] = await res.json();
    all.push(...page);
    if (page.length < 1000) break;
  }
  const withNeedle = all.filter((r) => needle(r.definition));
  for (let i = withNeedle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [withNeedle[i], withNeedle[j]] = [withNeedle[j], withNeedle[i]];
  }
  return withNeedle.slice(0, SAMPLE);
}

function* walk(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function main() {
  const [mode, target] = process.argv.slice(2);
  const rows = await sampleRows();
  const needles = rows.flatMap((r) =>
    [needle(r.definition), needle(r.example), needle(r.context)]
      .filter((n): n is string => !!n)
      .map((n) => ({ term: r.term, n })),
  );
  const hits: string[] = [];
  let scanned = 0;

  if (mode === "dir") {
    for (const file of walk(target)) {
      const text = readFileSync(file).toString("latin1");
      scanned++;
      for (const { term, n } of needles) if (text.includes(n)) hits.push(`${term}: "${n}" in ${file}`);
    }
  } else if (mode === "live") {
    const paths = [
      ...rows.map((r) => `/slang/${slugify(r.term)}`),
      "/slang",
      "/llms.txt",
      "/llms-full.txt",
      "/sitemap.xml",
    ];
    for (const path of paths) {
      const res = await fetch(`${target}${path}`);
      const text = await res.text();
      scanned++;
      for (const { term, n } of needles) if (text.includes(n)) hits.push(`${term}: "${n}" at ${path}`);
    }
  } else {
    throw new Error("mode must be dir or live");
  }

  console.log(`Sampled ${rows.length} terms, ${needles.length} needles (>= ${MIN} chars), scanned ${scanned} ${mode === "dir" ? "files" : "URLs"}.`);
  for (const { term, n } of needles.slice(0, 60)) console.log(`  ${term}: "${n}"`);
  if (hits.length) {
    console.error(`LEAKS FOUND (${hits.length}):\n${hits.slice(0, 50).join("\n")}`);
    process.exit(1);
  }
  console.log("PASS: no definition, example, or origin text found.");
}

main();
