import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeRows, type SlangRow } from "../lib/slang-core";
import { faqPageJsonLd, mobileApplicationJsonLd, organizationJsonLd, termFaqItems } from "../lib/slang-jsonld";
import { llmsFull, llmsIndex } from "../lib/slang-llms";
import { contentPageMarkdown, termMarkdown } from "../lib/slang-markdown";
import { absoluteLinks, CONTENT_PAGES, FAQ_PAGE, plainText, splitLinks } from "../lib/slang-pages";

const SITE = "https://www.jandhtechnology.com";

function row(overrides: Partial<SlangRow>): SlangRow {
  return {
    term: "Rizz",
    category: "tiktok",
    generation: "gen-z",
    safety_level: "safe",
    trending: true,
    usage_count: 3,
    created_at: "2026-02-26T00:00:00Z",
    updated_at: "2026-03-01T00:00:00Z",
    ...overrides,
  };
}

test("splitLinks separates text and links, including edges", () => {
  assert.deepEqual(splitLinks("See [the guide](/slang/safety-guide) now."), [
    { text: "See " },
    { label: "the guide", href: "/slang/safety-guide" },
    { text: " now." },
  ]);
  assert.deepEqual(splitLinks("[a](/a)[b](/b)"), [{ label: "a", href: "/a" }, { label: "b", href: "/b" }]);
  assert.deepEqual(splitLinks("no links"), [{ text: "no links" }]);
  assert.deepEqual(splitLinks(""), []);
});

test("plainText and absoluteLinks", () => {
  assert.equal(plainText("Read [our FAQ](/slang/faq)."), "Read our FAQ.");
  assert.equal(absoluteLinks("[x](/slang) [y](mailto:a@b.c)", SITE), `[x](${SITE}/slang) [y](mailto:a@b.c)`);
});

test("content pages have unique paths, titles and descriptions within SEO limits", () => {
  const paths = new Set(CONTENT_PAGES.map((p) => p.path));
  assert.equal(paths.size, CONTENT_PAGES.length);
  assert.equal(new Set(CONTENT_PAGES.map((p) => p.metaTitle)).size, CONTENT_PAGES.length);
  for (const p of CONTENT_PAGES) {
    assert.ok(p.description.length >= 120 && p.description.length <= 165, `${p.path} description ${p.description.length}`);
    assert.ok(p.path.startsWith("/slang/"));
  }
  assert.ok((FAQ_PAGE.faq ?? []).length >= 10);
});

test("app pitch never calls the app simply free", () => {
  const text = JSON.stringify(CONTENT_PAGES) + JSON.stringify(mobileApplicationJsonLd());
  assert.ok(!/(Slang Decoder|app|It) is free\b(?! to download)/i.test(text.replace(/It is free, confidential/g, "")));
  assert.ok(!/free (iPhone )?app/i.test(text));
});

test("JSON-LD: offers are a free download plus in-app purchases, no ratings, org links the App Store", () => {
  const app = mobileApplicationJsonLd() as { offers: { price: string }[]; aggregateRating?: unknown };
  assert.deepEqual(app.offers.map((o) => o.price), ["0", "2.99", "19.99"]);
  assert.equal(app.aggregateRating, undefined);
  assert.deepEqual(organizationJsonLd().sameAs, ["https://apps.apple.com/app/id6759603354"]);
  const faq = faqPageJsonLd([{ question: "Q?", answer: "A." }], `${SITE}/x`) as { mainEntity: { acceptedAnswer: { text: string } }[] };
  assert.equal(faq.mainEntity[0].acceptedAnswer.text, "A.");
});

test("markdown and llms output link the app and carry only names and labels", () => {
  const terms = normalizeRows([row({}), row({ term: "Bet", safety_level: "edgy", generation: "both", category: "texting" })]);
  const md = termMarkdown(terms[1], [terms[0]]);
  assert.match(md, /^# What does Rizz mean\?/);
  assert.match(md, /https:\/\/apps\.apple\.com\/app\/id6759603354/);
  assert.match(md, /Canonical page: https:\/\/www\.jandhtechnology\.com\/slang\/rizz/);
  assert.equal(termFaqItems(terms[1]).length, 3);
  const page = contentPageMarkdown(FAQ_PAGE);
  assert.ok(page.includes(`(${SITE}/slang/safety-guide)`));
  assert.ok(!page.includes("](/"));
  const full = llmsFull(terms);
  assert.match(full, /^- Bet \| Gen Z & Gen Alpha \| Edgy \| Texting \| https:\/\/www\.jandhtechnology\.com\/slang\/bet$/m);
  const index = llmsIndex(terms, ["texting"], [{ title: "FAQ", path: "/slang/faq", note: "n" }], []);
  assert.match(index, /^# Slang Decoder by J&H Technology\n\n> /);
});
