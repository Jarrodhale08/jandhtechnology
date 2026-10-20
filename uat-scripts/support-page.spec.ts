import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SITE = "https://www.jandhtechnology.com";
const SHOTS = "uat-artifacts/support-page";
const EMAIL = "jarrod@jandhtechnology.com";
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa", "best-practice"];
const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];

if (process.env.VERCEL_OIDC_TOKEN && !BASE.startsWith("http://localhost")) {
  test.use({ extraHTTPHeaders: { "x-vercel-trusted-oidc-idp-token": process.env.VERCEL_OIDC_TOKEN } });
}

test.describe("support page", () => {
  test("renders content, metadata, and links", async ({ page }) => {
    const res = await page.goto(`${BASE}/support`);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle("Support | J&H Technology");
    await expect(page.locator("h1")).toHaveText("Support");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}/support`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Slang Decoder/);
    const main = page.getByRole("main");
    await expect(main.getByRole("link", { name: EMAIL })).toHaveAttribute("href", `mailto:${EMAIL}`);
    for (const heading of ["Contact us", "Manage or cancel Premium", "Restore purchases", "Delete your account", "Export your data"]) {
      await expect(main.getByRole("heading", { name: heading })).toBeVisible();
    }
    await expect(main).toContainText("tap Subscriptions, choose Slang Decoder, and tap Cancel Subscription");
    await expect(main).toContainText("Restore Purchases");
    for (const [name, href] of [
      ["Slang Decoder FAQ", "/slang/faq"],
      ["Privacy Policy", "/privacy"],
      ["Terms of Service", "/terms"],
      ["Coffee Tasting support", "/coffee-tasting/support"],
    ]) {
      await expect(main.getByRole("link", { name, exact: true })).toHaveAttribute("href", href);
    }
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Support", exact: true })).toHaveAttribute("href", "/support");
  });

  test("footer support link navigates to the page", async ({ page }) => {
    await page.goto(`${BASE}/privacy`);
    await page.getByRole("contentinfo").getByRole("link", { name: "Support", exact: true }).click();
    await expect(page).toHaveURL(/\/support$/);
    await expect(page.locator("h1")).toHaveText("Support");
  });

  test("sitemap and llms.txt list the page", async ({ request }) => {
    const xml = await (await request.get(`${BASE}/sitemap.xml`)).text();
    expect(xml).toContain(`<loc>${SITE}/support</loc>`);
    const llms = await (await request.get(`${BASE}/llms.txt`)).text();
    expect(llms).toContain(`${SITE}/support`);
  });

  for (const vp of VIEWPORTS) {
    test(`no serious or critical axe violations and no overflow at ${vp.name}px`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE}/support`);
      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(blocking.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      await page.screenshot({ path: `${SHOTS}/support-${vp.name}.png`, fullPage: true });
    });
  }

  test("text at 200% does not overflow horizontally", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE}/support`);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.screenshot({ path: `${SHOTS}/support-text-200.png`, fullPage: true });
  });
});
