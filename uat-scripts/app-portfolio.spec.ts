import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SITE = "https://www.jandhtechnology.com";
const SHOTS = process.env.SHOTS_DIR ?? "uat-artifacts/app-portfolio";
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa", "best-practice"];
const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "1440", width: 1440, height: 900 },
];

type Route = { path: string; h1: string; types: string[] };

const APP_TYPES = ["MobileApplication", "BreadcrumbList", "FAQPage"];
const ROUTES: Route[] = [
  { path: "/apps", h1: "J&H Technology apps", types: ["BreadcrumbList", "ItemList"] },
  { path: "/repairradar", h1: "RepairRadar: Home Maintenance", types: APP_TYPES },
  { path: "/repairradar/guides", h1: "Home maintenance guides", types: ["BreadcrumbList", "ItemList"] },
  { path: "/repairradar/guides/seasonal-home-maintenance-checklist", h1: "Seasonal home maintenance checklist", types: ["Article", "BreadcrumbList"] },
  { path: "/repairradar/guides/track-home-repair-costs-taxes-resale", h1: "How to track home repair costs for taxes and resale", types: ["Article", "BreadcrumbList"] },
  { path: "/repairradar/guides/warranty-claim-records", h1: "What to record for home warranty claims", types: ["Article", "BreadcrumbList"] },
  { path: "/repairradar/guides/shared-rental-home-repairs", h1: "How to coordinate repairs in a shared or rental home", types: ["Article", "BreadcrumbList"] },
  { path: "/repairradar/guides/property-manager-maintenance-log", h1: "Property manager maintenance logs: what to track", types: ["Article", "BreadcrumbList"] },
  { path: "/nannylog", h1: "NannyLog: Reports, Hours & Pay", types: APP_TYPES },
  { path: "/meal-prep", h1: "Meal Prep: Weekly Meal Planner", types: APP_TYPES },
  { path: "/craving-crush", h1: "Craving Crush", types: APP_TYPES },
  { path: "/handybook", h1: "HandyBook: Handyman Business", types: APP_TYPES },
  { path: "/stronger-couple", h1: "Stronger Couple", types: APP_TYPES },
  { path: "/bold-watchman", h1: "Bold Watchman", types: APP_TYPES },
  { path: "/protravel", h1: "ProTravel", types: APP_TYPES },
  { path: "/coffee-tasting", h1: "Coffee Tasting: Cupping Notes", types: APP_TYPES },
];

if (process.env.VERCEL_OIDC_TOKEN && !BASE.startsWith("http://localhost")) {
  test.use({ extraHTTPHeaders: { "x-vercel-trusted-oidc-idp-token": process.env.VERCEL_OIDC_TOKEN } });
}

type Ld = Record<string, unknown>;

async function jsonLd(page: Page): Promise<Ld[]> {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  return raw.flatMap((r) => {
    const parsed = JSON.parse(r) as Ld | Ld[];
    return Array.isArray(parsed) ? parsed : [parsed];
  });
}

function validate(node: Ld) {
  expect(node["@context"]).toBe("https://schema.org");
  const type = node["@type"];
  if (type === "MobileApplication") {
    for (const k of ["name", "operatingSystem", "applicationCategory", "offers", "publisher", "sameAs", "url"]) expect(node[k], k).toBeTruthy();
    expect(node.aggregateRating).toBeUndefined();
    expect(node.review).toBeUndefined();
    for (const o of node.offers as Ld[]) {
      expect(o.price).toMatch(/^\d+(\.\d{2})?$/);
      expect(o.priceCurrency).toBe("USD");
    }
  }
  if (type === "BreadcrumbList") {
    const items = node.itemListElement as Ld[];
    expect(items.length).toBeGreaterThanOrEqual(2);
    items.forEach((it, i) => {
      expect(it.position).toBe(i + 1);
      expect(String(it.item)).toMatch(/^https:\/\/www\.jandhtechnology\.com\//);
    });
  }
  if (type === "FAQPage") {
    const qs = node.mainEntity as Ld[];
    expect(qs.length).toBeGreaterThanOrEqual(4);
    for (const q of qs) expect(((q.acceptedAnswer as Ld).text as string).length).toBeGreaterThan(20);
  }
  if (type === "Article") {
    for (const k of ["headline", "datePublished", "dateModified", "author", "publisher", "mainEntityOfPage"]) expect(node[k], k).toBeTruthy();
  }
  if (type === "Organization") {
    expect((node.owns as Ld[]).length).toBeGreaterThanOrEqual(8);
    expect(node.sameAs).toEqual([
      "https://apps.apple.com/developer/id1865047154",
      "https://play.google.com/store/apps/developer?id=J%26H+Technology",
    ]);
  }
}

test.describe("app portfolio pages", () => {
  for (const r of ROUTES) {
    test(`${r.path}: content, metadata and valid JSON-LD`, async ({ page }) => {
      const res = await page.goto(`${BASE}${r.path}`);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(r.h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${r.path}`);
      const title = await page.title();
      expect(title.length).toBeLessThanOrEqual(60);
      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc?.length ?? 0).toBeGreaterThanOrEqual(140);
      expect(desc?.length ?? 0).toBeLessThanOrEqual(160);
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /opengraph-image/);
      const nodes = await jsonLd(page);
      const types = nodes.map((n) => n["@type"]);
      for (const t of [...r.types, "Organization"]) expect(types, t).toContain(t);
      nodes.forEach(validate);
      const ids = nodes.map((n) => n["@id"]).filter(Boolean);
      expect(new Set(ids).size).toBe(ids.length);
      const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute("content");
      const og = await page.request.get(ogImage!.replace(SITE, BASE));
      expect(og.status()).toBe(200);
      expect(og.headers()["content-type"]).toContain("image/png");
    });

    for (const vp of VIEWPORTS) {
      test(`${r.path}: no serious or critical axe violations, no overflow at ${vp.name}px`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(`${BASE}${r.path}`);
        const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
        const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        expect(blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
        const broken = await page.evaluate(() =>
          [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
        );
        expect(broken).toEqual([]);
        const slug = r.path.replace(/^\//, "").replace(/\//g, "_");
        await page.screenshot({ path: `${SHOTS}/${slug}-${vp.name}.png`, fullPage: true });
      });
    }
  }

  test("journey: home -> all apps -> RepairRadar -> a guide -> back to plans", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/`);
    await page.getByRole("link", { name: "See every app, with store links and support pages" }).click();
    await expect(page).toHaveURL(`${BASE}/apps`);
    await page.getByRole("link", { name: "RepairRadar: Home Maintenance" }).click();
    await expect(page).toHaveURL(`${BASE}/repairradar`);
    await expect(page.getByRole("heading", { name: "Plans and pricing" })).toBeVisible();
    for (const price of ["$6.99", "$69.99", "$12.99", "$129.99", "$19.99", "$199.99"]) {
      await expect(page.getByRole("main").getByText(price, { exact: false }).first()).toBeVisible();
    }
    await expect(page.getByText("Android coming soon").first()).toBeVisible();
    await page.getByRole("link", { name: "What to record for home warranty claims" }).click();
    await expect(page).toHaveURL(`${BASE}/repairradar/guides/warranty-claim-records`);
    await expect(page.getByText("The short answer")).toBeVisible();
    await page.getByRole("link", { name: "See plans and features" }).click();
    await expect(page).toHaveURL(`${BASE}/repairradar`);
  });

  test("journey: open the menu on mobile and reach the apps hub", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/slang`);
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator("#mobile-menu").getByRole("link", { name: "Apps" }).click();
    await expect(page).toHaveURL(`${BASE}/apps`);
  });

  test("footer and home link the new pages", async ({ page }) => {
    await page.goto(`${BASE}/`);
    const footer = page.getByRole("navigation", { name: "Footer" });
    await expect(footer.getByRole("link", { name: "Apps", exact: true })).toHaveAttribute("href", "/apps");
    await expect(footer.getByRole("link", { name: "RepairRadar" })).toHaveAttribute("href", "/repairradar");
    await expect(footer.getByRole("link", { name: "Home Maintenance Guides" })).toHaveAttribute("href", "/repairradar/guides");
    const apps = page.locator("#apps");
    for (const href of ["/repairradar", "/nannylog", "/meal-prep", "/craving-crush", "/handybook", "/stronger-couple", "/slang", "/bold-watchman", "/protravel", "/coffee-tasting"]) {
      await expect(apps.locator(`a[href="${href}"]`)).toHaveCount(1);
    }
  });

  test("store links follow the verified availability", async ({ page }) => {
    const main = page.getByRole("main");
    await page.goto(`${BASE}/repairradar`);
    await expect(main.locator('a[href^="https://play.google.com"]')).toHaveCount(0);
    await expect(main.locator('a[href="https://apps.apple.com/app/id6759541528"]').first()).toBeVisible();
    await expect(page.locator('a[href*="repairradar.app"]')).toHaveCount(0);
    await page.goto(`${BASE}/meal-prep`);
    await expect(main.locator('a[href^="https://play.google.com"]')).toHaveCount(0);
    await page.goto(`${BASE}/coffee-tasting`);
    await expect(main.locator('a[href^="https://apps.apple.com"]')).toHaveCount(0);
    await expect(page.locator('a[href="https://play.google.com/store/apps/details?id=com.jarrodhale.coffeetasting"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://coffeetasting.app"]')).toHaveCount(1);
    await page.goto(`${BASE}/nannylog`);
    await expect(page.locator('a[href="https://play.google.com/store/apps/details?id=com.nannydaily.app"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://nannydaily.com"]').first()).toBeVisible();
  });

  test("sitemap, llms.txt, llms-full.txt and robots cover the new pages", async ({ request }) => {
    const sitemap = await (await request.get(`${BASE}/sitemap.xml`)).text();
    const llms = await (await request.get(`${BASE}/llms.txt`)).text();
    const full = await (await request.get(`${BASE}/llms-full.txt`)).text();
    for (const r of ROUTES) {
      expect(sitemap).toContain(`<loc>${SITE}${r.path}</loc>`);
      expect(llms).toContain(`${SITE}${r.path}`);
    }
    expect(llms).toMatch(/^# J&H Technology\n\n> /);
    expect(full).toContain("Premium $6.99/month or $69.99/year");
    const robots = await (await request.get(`${BASE}/robots.txt`)).text();
    for (const bot of ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-User", "Google-Extended", "Applebot-Extended"]) {
      expect(robots).toContain(`User-Agent: ${bot}`);
    }
  });
});
