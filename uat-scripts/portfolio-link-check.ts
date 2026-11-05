export {};

// Checks every link on the app portfolio pages: external links must return 200 after redirects,
// internal links must return 200 from BASE. Usage: npx tsx uat-scripts/portfolio-link-check.ts [BASE]
const BASE = process.argv[2] ?? process.env.BASE_URL ?? "http://localhost:3000";
const SITE = "https://www.jandhtechnology.com";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const PAGES = [
  "/apps",
  "/repairradar",
  "/repairradar/guides",
  "/repairradar/guides/seasonal-home-maintenance-checklist",
  "/repairradar/guides/track-home-repair-costs-taxes-resale",
  "/repairradar/guides/warranty-claim-records",
  "/repairradar/guides/shared-rental-home-repairs",
  "/repairradar/guides/property-manager-maintenance-log",
  "/nannylog",
  "/meal-prep",
  "/craving-crush",
  "/handybook",
  "/stronger-couple",
  "/bold-watchman",
  "/protravel",
  "/coffee-tasting",
];

const headers: Record<string, string> = { "user-agent": UA, accept: "text/html,*/*" };
if (process.env.VERCEL_OIDC_TOKEN && !BASE.startsWith("http://localhost")) {
  headers["x-vercel-trusted-oidc-idp-token"] = process.env.VERCEL_OIDC_TOKEN;
}

async function status(url: string, internal: boolean): Promise<number> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { redirect: "follow", headers: internal ? headers : { "user-agent": UA, accept: "text/html,*/*" } });
      await res.arrayBuffer();
      if (res.status === 200 || attempt === 2) return res.status;
    } catch {
      if (attempt === 2) return 0;
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  return 0;
}

async function main() {
  const external = new Map<string, Set<string>>();
  const internal = new Map<string, Set<string>>();
  for (const page of PAGES) {
    const html = await (await fetch(`${BASE}${page}`, { headers })).text();
    const main = html.slice(html.indexOf('<main'), html.indexOf("</main>"));
    for (const [, raw] of main.matchAll(/<a[^>]+href="([^"]+)"/g)) {
      const href = raw.replace(/&amp;/g, "&");
      if (href.startsWith("mailto:") || href.startsWith("#")) continue;
      const target = href.startsWith("/") || href.startsWith(SITE) ? internal : external;
      const key = href.startsWith(SITE) ? href.slice(SITE.length) || "/" : href;
      if (!target.has(key)) target.set(key, new Set());
      target.get(key)!.add(page);
    }
  }
  const failures: string[] = [];
  const check = async (map: Map<string, Set<string>>, isInternal: boolean) => {
    for (const [href, pages] of map) {
      const url = isInternal ? `${BASE}${href}` : href;
      const code = await status(url, isInternal);
      console.log(`${code} ${isInternal ? "internal" : "external"} ${href}`);
      if (code !== 200) failures.push(`${code} ${href} (on ${[...pages].join(", ")})`);
    }
  };
  await check(external, false);
  await check(internal, true);
  console.log(`\n${external.size} external and ${internal.size} internal links checked on ${PAGES.length} pages.`);
  if (failures.length) {
    console.error(`FAILED:\n${failures.join("\n")}`);
    process.exit(1);
  }
  console.log("All links returned 200.");
}

main();
