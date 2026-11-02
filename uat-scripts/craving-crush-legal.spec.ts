import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SITE = "https://www.jandhtechnology.com";
const SHOTS = "uat-artifacts/craving-crush-legal";
const EMAIL = "support@jandhtechnology.com";
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa", "best-practice"];
const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];
const PAGES = [
  { path: "/craving-crush/privacy", slug: "privacy", title: "Privacy Policy | Craving Crush | J&H Technology", h1: "Craving Crush Privacy Policy" },
  { path: "/craving-crush/terms", slug: "terms", title: "Terms of Service | Craving Crush | J&H Technology", h1: "Craving Crush Terms of Service" },
  { path: "/craving-crush/support", slug: "support", title: "Support | Craving Crush | J&H Technology", h1: "Craving Crush Support" },
  {
    path: "/craving-crush/delete-account",
    slug: "delete-account",
    title: "Delete your account and data | Craving Crush | J&H Technology",
    h1: "Delete your Craving Crush account and data",
  },
];

if (process.env.VERCEL_OIDC_TOKEN && !BASE.startsWith("http://localhost")) {
  test.use({ extraHTTPHeaders: { "x-vercel-trusted-oidc-idp-token": process.env.VERCEL_OIDC_TOKEN } });
}

test.describe("craving crush legal pages", () => {
  for (const p of PAGES) {
    test(`${p.slug} renders content, metadata, and related links`, async ({ page }) => {
      const res = await page.goto(`${BASE}${p.path}`);
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle(p.title);
      await expect(page.locator("h1")).toHaveText(p.h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${p.path}`);
      const main = page.getByRole("main");
      await expect(main.getByRole("link", { name: EMAIL }).first()).toHaveAttribute("href", new RegExp(`^mailto:${EMAIL}`));
      const nav = page.getByRole("navigation", { name: "Craving Crush pages" });
      await expect(nav.locator('[aria-current="page"]')).toHaveAttribute("href", p.path);
      await expect(nav.getByRole("link")).toHaveCount(4);
    });

    for (const vp of VIEWPORTS) {
      test(`${p.slug} has no serious or critical axe violations and no overflow at ${vp.name}px`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(`${BASE}${p.path}`);
        const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
        const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        expect(blocking.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow).toBeLessThanOrEqual(0);
        await page.screenshot({ path: `${SHOTS}/${p.slug}-${vp.name}.png`, fullPage: true });
      });
    }

    test(`${p.slug} text at 200% does not overflow horizontally`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE}${p.path}`);
      await page.evaluate(() => {
        document.documentElement.style.fontSize = "200%";
      });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test("delete-account names the app and developer and gives steps", async ({ page }) => {
    await page.goto(`${BASE}/craving-crush/delete-account`);
    const main = page.getByRole("main");
    await expect(main).toContainText("Craving Crush");
    await expect(main).toContainText("J&H Technology");
    await expect(main).toContainText("Go to Settings, then Privacy & Data.");
    await expect(main).toContainText("Tap Delete Account");
    await expect(main).toContainText("within 30 days");
    await expect(main).toContainText("does not cancel Craving Crush Premium");
  });

  test("support page links to craving crush support and the related nav works", async ({ page }) => {
    await page.goto(`${BASE}/support`);
    await page.getByRole("main").getByRole("link", { name: "Craving Crush support", exact: true }).click();
    await expect(page).toHaveURL(/\/craving-crush\/support$/);
    await page.getByRole("navigation", { name: "Craving Crush pages" }).getByRole("link", { name: "Delete Account" }).click();
    await expect(page).toHaveURL(/\/craving-crush\/delete-account$/);
    await expect(page.locator("h1")).toHaveText("Delete your Craving Crush account and data");
  });

  test("sitemap lists the pages", async ({ request }) => {
    const xml = await (await request.get(`${BASE}/sitemap.xml`)).text();
    for (const p of PAGES) expect(xml).toContain(`<loc>${SITE}${p.path}</loc>`);
  });
});
