import { mkdirSync, writeFileSync } from "node:fs";
import { chromium, type Page } from "@playwright/test";

// Usage: tsx uat-scripts/ada-manual-checks.ts [baseUrl]
// Drives each page template the way a keyboard / zoom / reduced-motion user would and records
// evidence for uat-artifacts/ada/report.md.

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = "uat-artifacts/ada";
const TEMPLATES: [string, string][] = [
  ["Home", "/"],
  ["Legal (privacy)", "/privacy"],
  ["Legal (terms)", "/terms"],
  ["Coffee Tasting support", "/coffee-tasting/support"],
  ["Coffee Tasting delete account", "/coffee-tasting/delete-account"],
  ["Accessibility statement", "/accessibility"],
  ["Slang index", "/slang"],
  ["Term page", "/slang/rizz"],
  ["Term page (parent alert)", "/slang/kys"],
  ["Letter page", "/slang/letter/s"],
  ["Category page", "/slang/category/gaming"],
  ["Category glossary", "/slang/glossary-categories"],
  ["Content page (FAQ)", "/slang/faq"],
  ["Content page (safety guide)", "/slang/safety-guide"],
  ["Generation page", "/slang/gen-alpha"],
  ["Trending list", "/slang/trending"],
  ["New this month", "/slang/new-this-month"],
  ["404", "/no-such-page"],
];

type Result = Record<string, string | number | boolean>;

function luminance(rgb: number[]) {
  const [r, g, b] = rgb.map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: number[], b: number[]) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

async function keyboard(page: Page) {
  await page.goto(`${BASE}${page.url().startsWith("http") ? new URL(page.url()).pathname : "/"}`);
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const r = el.getBoundingClientRect();
    return { text: el.textContent?.trim() ?? "", visible: r.width > 0 && r.height > 0 && r.top >= 0 };
  });
  await page.keyboard.press("Enter");
  const afterSkip = await page.evaluate(() => document.activeElement?.id ?? "");
  const stops: { tag: string; name: string; outline: number; color: number[]; size: number[] }[] = [];
  const seen = new Set<string>();
  let trapped = false;
  for (let i = 0; i < 400; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const color = (cs.outlineColor.match(/\d+(\.\d+)?/g) ?? ["0", "0", "0"]).slice(0, 3).map(Number);
      const path: string[] = [];
      let n: Element | null = el;
      while (n && n !== document.body) {
        path.unshift(`${n.tagName}:${Array.from(n.parentElement?.children ?? []).indexOf(n)}`);
        n = n.parentElement;
      }
      return {
        key: path.join("/"),
        tag: el.tagName.toLowerCase(),
        name: (el.getAttribute("aria-label") ?? el.textContent ?? (el as HTMLImageElement).alt ?? "").trim().slice(0, 40),
        outline: cs.outlineStyle === "none" ? 0 : parseFloat(cs.outlineWidth),
        color,
        size: [Math.round(r.width), Math.round(r.height)],
      };
    });
    if (!info) break;
    if (seen.has(info.key)) {
      if (stops.length > 0 && info.key === [...seen][0]) break;
      trapped = stops.length < 3;
      break;
    }
    seen.add(info.key);
    stops.push(info);
  }
  const bg = [5, 5, 16];
  const weakFocus = stops.filter((s) => s.outline < 2 || contrast(s.color, bg) < 3);
  const tabindexPositive = await page.locator("[tabindex]:not([tabindex='-1']):not([tabindex='0'])").count();
  return {
    skipLinkFirst: /Skip to main content/.test(first.text) && first.visible,
    skipMovesFocusToMain: afterSkip === "main",
    tabStops: stops.length,
    focusIndicatorFailures: weakFocus.length,
    minFocusContrast: stops.length ? Math.min(...stops.map((s) => contrast(s.color, bg))).toFixed(2) : "n/a",
    keyboardTrap: trapped,
    positiveTabindex: tabindexPositive,
  };
}

async function structure(page: Page) {
  return page.evaluate(() => {
    const levels = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((h) => Number(h.tagName[1]));
    let skips = 0;
    levels.forEach((l, i) => {
      if (i > 0 && l > levels[i - 1] + 1) skips++;
    });
    const linkTexts = Array.from(document.querySelectorAll("a")).map((a) =>
      (a.getAttribute("aria-label") ?? a.textContent ?? a.querySelector("img")?.alt ?? "").trim().toLowerCase(),
    );
    const badges = Array.from(document.querySelectorAll('a[href^="https://apps.apple.com"] img')).map((i) => (i as HTMLImageElement).alt);
    const labelsMissing = Array.from(document.querySelectorAll("input,textarea,select")).filter((el) => {
      const id = el.id;
      return !(id && document.querySelector(`label[for="${id}"]`)) && !el.getAttribute("aria-label");
    }).length;
    return {
      lang: document.documentElement.lang,
      title: document.title,
      h1: levels.filter((l) => l === 1).length,
      headingSkips: skips,
      banner: document.querySelectorAll("header:not(main header):not(article header):not(aside header):not(section header)").length,
      navs: document.querySelectorAll("nav").length,
      main: document.querySelectorAll("main").length,
      contentinfo: document.querySelectorAll("body > footer, body footer:not(main footer)").length,
      vagueLinks: linkTexts.filter((t) => ["click here", "here", "read more", "more", "link"].includes(t)).length,
      emptyLinks: linkTexts.filter((t) => !t).length,
      badgeAltOk: badges.length > 0 && badges.every((a) => a === "Download Slang Decoder on the App Store"),
      unlabelledFields: labelsMissing,
    };
  });
}

async function overflow(page: Page, width: number) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(150);
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const rows: Result[] = [];
  for (const [name, path] of TEMPLATES) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${BASE}${path}`);
    const kb = await keyboard(page);
    await page.goto(`${BASE}${path}`);
    const st = await structure(page);
    const reflow320 = await overflow(page, 320);
    const zoom200 = await overflow(page, 720);
    await context.close();

    const zoomCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const zp = await zoomCtx.newPage();
    await zp.goto(`${BASE}${path}`);
    await zp.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    const textZoomOverflow = await zp.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await zoomCtx.close();

    const rmCtx = await browser.newContext({ reducedMotion: "reduce" });
    const rm = await rmCtx.newPage();
    await rm.goto(`${BASE}${path}`);
    const motion = await rm.evaluate(() => {
      const animated = Array.from(document.querySelectorAll("*")).filter((el) => getComputedStyle(el).animationName !== "none");
      const longest = Math.max(0, ...animated.map((el) => parseFloat(getComputedStyle(el).animationDuration) * 1000));
      return { animated: animated.length, longestMs: longest, smooth: getComputedStyle(document.documentElement).scrollBehavior };
    });
    await rmCtx.close();

    rows.push({
      template: name,
      path,
      ...kb,
      ...st,
      reflow320Overflow: reflow320,
      zoom200ViewportOverflow: zoom200,
      textZoom200Overflow: textZoomOverflow,
      reducedMotionAnimated: motion.animated,
      reducedMotionLongestMs: motion.longestMs,
      reducedMotionScroll: motion.smooth,
    });
    console.log(name, JSON.stringify(rows.at(-1)));
  }
  await browser.close();
  writeFileSync(`${OUT}/manual-checks.json`, JSON.stringify(rows, null, 2));
}

main();
