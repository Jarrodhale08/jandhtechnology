import { test, expect, type Page } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SITE = "https://www.jandhtechnology.com";
const APP_STORE = "https://apps.apple.com/app/id6759603354";
const SHOTS = "uat-artifacts/slang-dictionary";
const BADGE = "Download Slang Decoder on the App Store";

const NEW_PAGES: [string, string][] = [
  ["/slang/faq", "Slang Decoder FAQ"],
  ["/slang/how-it-works", "How Slang Decoder works"],
  ["/slang/about", "About Slang Decoder"],
  ["/slang/safety-guide", "Slang safety guide for parents"],
  ["/slang/for-teachers", "Slang Decoder for teachers"],
  ["/slang/for-grandparents", "Slang Decoder for grandparents"],
  ["/slang/gen-z", "Who is Gen Z?"],
  ["/slang/gen-alpha", "Who is Gen Alpha?"],
  ["/slang/trending", "Trending slang"],
  ["/slang/new-this-month", "New slang this month"],
  ["/slang/glossary-categories", "Slang categories"],
  ["/slang/letter/a", "Slang terms starting with A"],
  ["/slang/letter/0-9", "Slang terms starting with a number or emoji"],
  ["/slang/category/gaming", "Gaming slang"],
  ["/accessibility", "Accessibility Statement"],
];

const OTHER_PAGES = ["/", "/privacy", "/terms", "/coffee-tasting/privacy", "/coffee-tasting/terms", "/coffee-tasting/support", "/coffee-tasting/delete-account"];

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

async function expectSiteWideAppFunnel(page: Page) {
  await expect(page.locator('meta[name="apple-itunes-app"]')).toHaveAttribute("content", "app-id=6759603354");
  const footerCta = page.getByRole("contentinfo").getByRole("link", { name: BADGE });
  await expect(footerCta).toHaveAttribute("href", APP_STORE);
  await expect(page.getByRole("contentinfo").getByRole("heading", { name: "Get Slang Decoder" })).toBeVisible();
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "Accessibility" })).toHaveAttribute("href", "/accessibility");
  const nodes = await jsonLd(page);
  expect(types(nodes)).toEqual(expect.arrayContaining(["Organization", "MobileApplication"]));
  const org = nodes.find((n) => n["@type"] === "Organization")!;
  expect(org.sameAs).toEqual([APP_STORE]);
  const app = nodes.find((n) => n["@type"] === "MobileApplication")!;
  expect(app.operatingSystem).toBe("iOS");
  expect(app.aggregateRating).toBeUndefined();
  const offers = app.offers as { price: string }[];
  expect(offers.map((o) => o.price)).toEqual(["0", "2.99", "19.99"]);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("main#main")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main");
}

if (process.env.VERCEL_OIDC_TOKEN && !BASE.startsWith("http://localhost")) {
  test.use({ extraHTTPHeaders: { "x-vercel-trusted-oidc-idp-token": process.env.VERCEL_OIDC_TOKEN } });
}

test.describe("slang funnel", () => {
  test("index is light, names-only, and links to letters", async ({ page, request }) => {
    const res = await request.get(`${BASE}/slang`);
    expect((await res.body()).length).toBeLessThan(200_000);
    await page.goto(`${BASE}/slang`);
    await expect(page.locator("h1")).toHaveText("Gen Z & Gen Alpha Slang Dictionary");
    await expectSiteWideAppFunnel(page);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}/slang`);
    await expect(page.locator('link[rel="alternate"][type="text/markdown"]')).toHaveAttribute("href", `${SITE}/slang.md`);
    const letters = page.getByRole("navigation", { name: "Browse slang by first letter" });
    await expect(letters.getByRole("link", { name: "Letter R" })).toHaveAttribute("href", "/slang/letter/r");
    await expect(letters.getByRole("link", { name: "Numbers and emoji" })).toHaveAttribute("href", "/slang/letter/0-9");
    expect(await page.locator('main a[href^="/slang/"]').count()).toBeLessThan(120);
  });

  test("search filters term names, announces the count, and is keyboard operable", async ({ page }) => {
    await page.goto(`${BASE}/slang`);
    const search = page.getByRole("searchbox", { name: "Search slang terms" });
    await search.focus();
    await page.keyboard.type("rizz");
    const status = page.getByRole("status");
    await expect(status).toHaveAttribute("aria-live", "polite");
    await expect(status).toContainText(/terms? match(es)? “rizz”/);
    const results = page.getByRole("list", { name: "Matching slang terms" });
    await expect(results.getByRole("link", { name: "Rizz", exact: true })).toHaveAttribute("href", "/slang/rizz");
    await page.keyboard.press("Tab");
    await expect(results.getByRole("link").first()).toBeFocused();
    await page.locator('section[aria-labelledby="search-heading"]').screenshot({ path: `${SHOTS}/search-rizz-1440.png` });
    await search.fill("zzzz-no-such-term");
    await expect(status).toHaveText("No terms match “zzzz-no-such-term”.");
    const payload = await (await page.request.get(`${BASE}/slang-index.json`)).json();
    expect(payload.length).toBeGreaterThan(1000);
    expect(payload.every((row: unknown[]) => row.length === 2)).toBe(true);
  });

  test("term page: teaser only, FAQ, internal links, CTA and metadata", async ({ page }) => {
    await page.goto(`${BASE}/slang/rizz`);
    await expect(page.locator("h1")).toHaveText("What does Rizz mean?");
    await expect(page).toHaveTitle("What does rizz mean? Gen Z slang | Slang Decoder");
    await expectSiteWideAppFunnel(page);
    const nodes = await jsonLd(page);
    expect(types(nodes)).toEqual(expect.arrayContaining(["DefinedTerm", "FAQPage", "BreadcrumbList"]));
    const faq = nodes.find((n) => n["@type"] === "FAQPage")!;
    expect((faq.mainEntity as { name: string }[]).map((q) => q.name)).toEqual([
      "Is Rizz safe for kids?",
      "Which generation uses Rizz?",
      "Where can I find the meaning of Rizz?",
    ]);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}/slang/rizz`);
    await expect(page.locator('link[rel="alternate"][type="text/markdown"]')).toHaveAttribute("href", `${SITE}/slang/rizz.md`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/slang\/rizz\/opengraph-image/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.getByRole("heading", { name: "See what “Rizz” means in Slang Decoder" })).toBeVisible();
    const badge = page.getByRole("main").getByRole("link", { name: BADGE }).first();
    await expect(badge).toHaveAttribute("href", APP_STORE);
    await expect(badge.locator("img")).toHaveAttribute("alt", BADGE);
    const related = page.locator('section[aria-labelledby="related-heading"] li a');
    expect(await related.count()).toBeGreaterThanOrEqual(6);
    expect(await related.count()).toBeLessThanOrEqual(10);
    const explore = page.getByRole("navigation", { name: "Keep exploring" });
    await expect(explore.getByRole("link", { name: "Who is Gen Z?" })).toHaveAttribute("href", "/slang/gen-z");
    await expect(explore.getByRole("link", { name: "More slang starting with R" })).toHaveAttribute("href", "/slang/letter/r");
    await expect(explore.getByRole("link", { name: "Slang Decoder FAQ" })).toHaveAttribute("href", "/slang/faq");
    await expect(page.locator("header dd").getByRole("link", { name: "TikTok", exact: true })).toHaveAttribute("href", "/slang/category/tiktok");
  });

  test("no definition, example, or origin text in HTML, DOM, metadata, JSON-LD or markdown", async ({ page, request }) => {
    const url = process.env.SLANG_SUPABASE_URL;
    const key = process.env.SLANG_SUPABASE_ANON_KEY;
    test.skip(!url || !key, "Supabase env not loaded");
    for (const [slug, term] of [["rizz", "Rizz"], ["kys", "KYS"], ["skibidi", "Skibidi"], ["gyatt", "Gyatt"]]) {
      const params = new URLSearchParams({ select: "definition,example,context", term: `eq.${term}`, app_id: "eq.slang_to_english" });
      const rows: { definition: string; example: string | null; context: string | null }[] = await (
        await request.get(`${url}/rest/v1/slang_terms?${params}`, { headers: { apikey: key!, Authorization: `Bearer ${key}` } })
      ).json();
      expect(rows.length, slug).toBeGreaterThan(0);
      const html = await (await request.get(`${BASE}/slang/${slug}`)).text();
      const md = await (await request.get(`${BASE}/slang/${slug}.md`)).text();
      await page.goto(`${BASE}/slang/${slug}`);
      const dom = await page.content();
      for (const text of [rows[0].definition, rows[0].example, rows[0].context]) {
        if (!text) continue;
        const sample = text.replace(/\s+/g, " ").trim().slice(0, 30);
        expect(html, `${slug} HTML`).not.toContain(sample);
        expect(dom, `${slug} DOM`).not.toContain(sample);
        expect(md, `${slug} markdown`).not.toContain(sample);
      }
    }
  });

  test("parent-alert term shows its rating and the app CTA", async ({ page }) => {
    await page.goto(`${BASE}/slang/kys`);
    await expect(page.locator("header dd").getByText("Parent alert", { exact: true })).toBeVisible();
    await expect(page.getByText(/rates KYS as Parent alert/).first()).toBeVisible();
  });

  test("new pages: unique metadata, www canonical, breadcrumbs, funnel", async ({ page }) => {
    test.setTimeout(240_000);
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const [path, h1] of NEW_PAGES) {
      const res = await page.goto(`${BASE}${path}`);
      expect(res?.status(), path).toBe(200);
      await expect(page.locator("h1"), path).toHaveText(h1);
      await expectSiteWideAppFunnel(page);
      await expect(page.locator('link[rel="canonical"]'), path).toHaveAttribute("href", `${SITE}${path}`);
      if (path !== "/accessibility") expect(types(await jsonLd(page)), path).toContain("BreadcrumbList");
      titles.add(await page.title());
      descriptions.add((await page.locator('meta[name="description"]').getAttribute("content")) ?? "");
    }
    expect(titles.size).toBe(NEW_PAGES.length);
    expect(descriptions.size).toBe(NEW_PAGES.length);
  });

  test("FAQ page has FAQPage JSON-LD with no term meanings", async ({ page }) => {
    await page.goto(`${BASE}/slang/faq`);
    const faq = (await jsonLd(page)).find((n) => n["@type"] === "FAQPage")!;
    const items = faq.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
    expect(items.length).toBeGreaterThanOrEqual(10);
    for (const item of items) expect(item.acceptedAnswer.text).not.toMatch(/\]\(/);
    await expect(page.getByText(/\$2\.99/).first()).toBeVisible();
  });

  test("letters 404 when unknown; for-parents redirects to the safety guide", async ({ page, request }) => {
    expect((await request.get(`${BASE}/slang/letter/zz`)).status()).toBe(404);
    const res = await request.get(`${BASE}/slang/for-parents`, { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toContain("/slang/safety-guide");
    await page.goto(`${BASE}/slang/safety-guide`);
    await expect(page.getByText(/call or text 988/).first()).toBeVisible();
  });

  test("crawler, LLM, markdown and well-known files", async ({ request }) => {
    const robotsText = await (await request.get(`${BASE}/robots.txt`)).text();
    for (const bot of [
      "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User",
      "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot",
    ]) expect(robotsText).toContain(`User-Agent: ${bot}`);
    expect(robotsText).toContain(`Sitemap: ${SITE}/sitemap.xml`);

    const xml = await (await request.get(`${BASE}/sitemap.xml`)).text();
    for (const path of ["/slang/rizz", "/slang/faq", "/slang/letter/a", "/slang/trending", "/accessibility"]) {
      expect(xml).toContain(`<loc>${SITE}${path}</loc>`);
    }
    expect(xml).not.toContain(".md</loc>");
    expect(xml).not.toContain("/slang/for-parents<");
    expect(xml).toContain("<lastmod>2026-10-18");

    const llms = await request.get(`${BASE}/llms.txt`);
    expect(llms.headers()["content-type"]).toContain("text/plain");
    const llmsText = await llms.text();
    expect(llmsText).toMatch(/^# Slang Decoder by J&H Technology\n\n> /);
    expect(llmsText).toContain("## Key pages");
    expect(llmsText).toContain(APP_STORE);
    expect(llmsText).toContain(`${SITE}/slang/faq.md`);

    const fullText = await (await request.get(`${BASE}/llms-full.txt`)).text();
    expect(fullText).toMatch(/^- Rizz \| Gen Z \| Safe \| TikTok \| https:\/\/www\.jandhtechnology\.com\/slang\/rizz$/m);

    for (const path of ["/slang.md", "/slang/rizz.md", "/slang/faq.md", "/slang/about.md", "/slang/safety-guide.md"]) {
      const res = await request.get(`${BASE}${path}`);
      expect(res.status(), path).toBe(200);
      expect(res.headers()["content-type"], path).toContain("text/markdown");
      expect(res.headers()["link"], path).toContain('rel="canonical"');
      expect(await res.text(), path).toContain(APP_STORE);
    }
    expect((await request.get(`${BASE}/slang/no-such-term-xyz.md`)).status()).toBe(404);

    const security = await (await request.get(`${BASE}/.well-known/security.txt`)).text();
    expect(security).toContain("Contact: mailto:jarrod@jandhtechnology.com");
    expect(security).toMatch(/Expires: 2027-/);
    expect(await (await request.get(`${BASE}/humans.txt`)).text()).toContain("J&H Technology");

    const og = await request.get(`${BASE}/slang/rizz/opengraph-image`);
    expect(og.status()).toBe(200);
    expect(og.headers()["content-type"]).toBe("image/png");
  });

  test("existing pages carry the site-wide app funnel and render", async ({ page }) => {
    test.setTimeout(120_000);
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    for (const path of OTHER_PAGES) {
      const res = await page.goto(`${BASE}${path}`);
      expect(res?.status(), path).toBe(200);
      await expectSiteWideAppFunnel(page);
      await expect(page.locator('link[rel="canonical"]'), path).toHaveAttribute("href", path === "/" ? SITE : `${SITE}${path}`);
    }
    await page.goto(`${BASE}/`);
    await expect(page.getByRole("main").getByRole("heading", { name: "Slang Decoder" })).toBeVisible();
    expect(errors.filter((e) => /Content Security Policy/i.test(e) && !/vercel\.live/.test(e))).toEqual([]);
  });

  test("contact form: labelled fields, submit gesture, announced result", async ({ page }) => {
    test.skip(!BASE.startsWith("http://localhost"), "do not send contact messages to production");
    await page.goto(`${BASE}/#contact`);
    await page.getByLabel("Name").fill("UAT Tester");
    await page.getByLabel("Email").fill("uat@example.com");
    await page.getByLabel("Tell us about your app idea").fill("Automated accessibility check, please ignore.");
    await expect(page.getByLabel("Email")).toHaveAttribute("autocomplete", "email");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByRole("alert").or(page.getByRole("heading", { name: "Message Sent!" }))).toBeVisible();
  });

  test("mobile menu toggle exposes state and closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/slang/faq`);
    const toggle = page.getByRole("button", { name: "Open menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-menu").getByRole("link", { name: "Slang Dictionary" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
    for (const [name, path] of [["index", "/slang"], ["rizz", "/slang/rizz"], ["faq", "/slang/faq"]]) {
      await page.goto(`${BASE}${path}`);
      await page.screenshot({ path: `${SHOTS}/${name}-375.png`, fullPage: true });
    }
  });
});
