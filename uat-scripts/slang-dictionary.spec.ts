import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SHOTS = "uat-artifacts/slang-dictionary";
const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "1440", width: 1440, height: 900 },
];

async function jsonLd(page: Page): Promise<Record<string, unknown>[]> {
  const raw = await page.locator('script[type="application/ld+json"]').allTextContents();
  return raw.flatMap((text) => {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [parsed];
  });
}

function types(nodes: Record<string, unknown>[]): string[] {
  return nodes.map((n) => String(n["@type"]));
}

test.describe("slang dictionary", () => {
  test("index renders the full A–Z list with valid JSON-LD", async ({ page }) => {
    await page.goto(`${BASE}/slang`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("Gen Z & Gen Alpha Slang Dictionary");
    const count = await page.locator("#slang-az [data-slang-term]").count();
    expect(count).toBeGreaterThan(1000);
    const nodes = await jsonLd(page);
    expect(types(nodes)).toEqual(
      expect.arrayContaining(["Organization", "DefinedTermSet", "MobileApplication", "BreadcrumbList"]),
    );
    const set = nodes.find((n) => n["@type"] === "DefinedTermSet")!;
    expect((set.hasDefinedTerm as unknown[]).length).toBe(count);
    const app = nodes.find((n) => n["@type"] === "MobileApplication")!;
    expect(app.operatingSystem).toBe("iOS");
    expect(app.applicationCategory).toBe("EducationalApplication");
    await expect(page.locator('meta[name="apple-itunes-app"]')).toHaveAttribute("content", "app-id=6759603354");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.jandhtechnology.com/slang");
    await expect(page.locator('a[href="#letter-r"]')).toBeVisible();
  });

  test("search box filters the index", async ({ page }) => {
    await page.goto(`${BASE}/slang`);
    const search = page.getByLabel("Search slang terms");
    await search.fill("rizz");
    const visible = page.locator("#slang-az [data-slang-term]:visible");
    await expect(visible.first()).toBeVisible();
    const n = await visible.count();
    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThan(20);
    await expect(page.locator("#slang-az").getByRole("link", { name: "Rizz", exact: true })).toBeVisible();
    await expect(page.getByRole("status")).toContainText("rizz");
    await page.locator('section[aria-labelledby="az-heading"]').screenshot({ path: `${SHOTS}/search-rizz-1440.png` });
    await search.fill("zzzz-no-such-term");
    await expect(page.locator("#slang-az [data-slang-term]:visible")).toHaveCount(0);
    await expect(page.getByRole("status")).toContainText("0 terms match");
    await search.fill("");
    expect(await page.locator("#slang-az [data-slang-term]:visible").count()).toBeGreaterThan(1000);
  });

  test("term page: answer-first h1, JSON-LD, CTA and metadata", async ({ page }) => {
    await page.goto(`${BASE}/slang/rizz`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("What does Rizz mean?");
    await expect(page.getByText(/^Rizz means /)).toBeVisible();
    await expect(page).toHaveTitle("What does rizz mean? Gen Z slang definition | Slang Decoder");
    const nodes = await jsonLd(page);
    expect(types(nodes)).toEqual(expect.arrayContaining(["DefinedTerm", "FAQPage", "BreadcrumbList", "Organization"]));
    const faq = nodes.find((n) => n["@type"] === "FAQPage")!;
    const questions = (faq.mainEntity as { name: string }[]).map((q) => q.name);
    expect(questions).toEqual(["What does Rizz mean?", "Is Rizz a bad word?"]);
    await expect(page.locator('meta[name="apple-itunes-app"]')).toHaveAttribute("content", "app-id=6759603354");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.jandhtechnology.com/slang/rizz");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /rizz/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1);
    await expect(page.getByRole("link", { name: /Download Slang Decoder on the App Store/ })).toHaveAttribute(
      "href",
      "https://apps.apple.com/app/id6759603354",
    );
    await expect(page.getByText(/Last updated/)).toBeVisible();
    await expect(page.locator("dl dt", { hasText: "Parent safety rating" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Related .* slang/ })).toBeVisible();
  });

  test("inappropriate term withholds the example and shows a parent note", async ({ page }) => {
    await page.goto(`${BASE}/slang/kys`);
    await expect(page.getByText(/Example withheld/)).toBeVisible();
    await expect(page.getByText(/988/).first()).toBeVisible();
    await expect(page.getByText("Parent alert").first()).toBeVisible();
  });

  test("hub pages render", async ({ page }) => {
    for (const [path, h1] of [
      ["/slang/gen-alpha", "Gen Alpha slang dictionary"],
      ["/slang/for-parents", "Slang every parent should know"],
      ["/slang/category/gaming", "Gaming slang meanings"],
    ]) {
      const res = await page.goto(`${BASE}${path}`);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(h1);
      await jsonLd(page);
    }
    const nodes = await jsonLd(page);
    expect(types(nodes)).toContain("BreadcrumbList");
    await page.goto(`${BASE}/slang/for-parents`);
    expect(types(await jsonLd(page))).toContain("MobileApplication");
    const missing = await page.goto(`${BASE}/slang/category/not-a-category`);
    expect(missing?.status()).toBe(404);
  });

  test("crawler files return 200 with expected content", async ({ request }) => {
    const robots = await request.get(`${BASE}/robots.txt`);
    expect(robots.status()).toBe(200);
    const robotsText = await robots.text();
    for (const bot of [
      "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User",
      "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot",
    ]) {
      expect(robotsText).toContain(`User-Agent: ${bot}`);
    }
    expect(robotsText).toContain("Sitemap: https://www.jandhtechnology.com/sitemap.xml");

    const sitemap = await request.get(`${BASE}/sitemap.xml`);
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    expect(xml).toContain("<loc>https://www.jandhtechnology.com/slang/rizz</loc>");
    expect(xml).toContain("<lastmod>");
    expect((xml.match(/<url>/g) ?? []).length).toBeGreaterThan(1000);

    const llms = await request.get(`${BASE}/llms.txt`);
    expect(llms.status()).toBe(200);
    expect(llms.headers()["content-type"]).toContain("text/plain");
    const llmsText = await llms.text();
    expect(llmsText).toContain("Slang Decoder");
    expect(llmsText).toContain("https://apps.apple.com/app/id6759603354");
    expect(llmsText).toContain("https://www.jandhtechnology.com/slang/for-parents");

    const full = await request.get(`${BASE}/llms-full.txt`);
    expect(full.status()).toBe(200);
    const fullText = await full.text();
    expect(fullText).toMatch(/^- Rizz — .+ — Gen Z — https:\/\/www\.jandhtechnology\.com\/slang\/rizz$/m);
    expect(fullText.split("\n").filter((l) => l.startsWith("- ")).length).toBeGreaterThan(1000);
  });

  test("existing pages still render", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    for (const path of ["/", "/privacy", "/terms", "/coffee-tasting/privacy", "/coffee-tasting/terms", "/coffee-tasting/support"]) {
      const res = await page.goto(`${BASE}${path}`);
      expect(res?.status(), path).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
    }
    await page.goto(`${BASE}/`);
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Slang Dictionary" })).toHaveAttribute("href", "/slang");
    expect(errors.filter((e) => /Content Security Policy/i.test(e) && !/vercel\.live/.test(e))).toEqual([]);
  });

  for (const vp of VIEWPORTS) {
    for (const path of ["/slang", "/slang/rizz", "/slang/for-parents"]) {
      test(`axe + no horizontal scroll ${path} @${vp.name}`, async ({ page }) => {
        test.setTimeout(240_000);
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(`${BASE}${path}`);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        expect(serious.map((v) => `${v.id}: ${v.nodes.length} nodes`)).toEqual([]);
        const name = path === "/slang" ? "index" : path.split("/").pop();
        await page.screenshot({ path: `${SHOTS}/${name}-${vp.name}.png`, fullPage: path !== "/slang" });
      });
    }
  }
});
