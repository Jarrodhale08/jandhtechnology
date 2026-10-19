import { test } from "node:test";
import assert from "node:assert/strict";
import {
  assignUniqueSlugs,
  cleanText,
  displayTerm,
  generationAnswer,
  groupByLetter,
  letterFromSlug,
  letterSlug,
  addedInMonth,
  newestTerms,
  trendingTerms,
  meaningAnswer,
  normalizeRows,
  pageUpdated,
  PAGES_REVISED_AT,
  relatedTerms,
  safetyAnswer,
  slugify,
  type SlangRow,
} from "../lib/slang-core";

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

test("slugify handles words, punctuation, apostrophes and emoji", () => {
  assert.equal(slugify("Rizz"), "rizz");
  assert.equal(slugify("It's the ___ for Me"), "its-the-for-me");
  assert.equal(slugify("L + Ratio"), "l-ratio");
  assert.equal(slugify("Sic/Sick"), "sic-sick");
  assert.equal(slugify("Café"), "cafe");
  assert.equal(slugify("💀"), "skull-emoji");
  assert.equal(slugify("🍆🍑"), "eggplant-peach-emoji");
  assert.equal(slugify("🦄"), "emoji-1f984");
});

test("assignUniqueSlugs suffixes duplicates and avoids reserved route names", () => {
  assert.deepEqual(assignUniqueSlugs(["Cap", "cap", "CAP!"]), ["cap", "cap-2", "cap-3"]);
  assert.deepEqual(assignUniqueSlugs(["Gen Alpha", "For Parents", "Category"]), [
    "gen-alpha-2",
    "for-parents-2",
    "category-2",
  ]);
});

test("cleanText collapses doubled quotes and whitespace, nulls empties", () => {
  assert.equal(cleanText("Don''t   trust"), "Don't trust");
  assert.equal(cleanText("   "), null);
  assert.equal(cleanText(null), null);
});

test("groupByLetter puts non-letters first under #", () => {
  const groups = groupByLetter(normalizeRows([row({ term: "bet" }), row({ term: "67" }), row({ term: "Aura" })]));
  assert.deepEqual(groups.map((g) => g.letter), ["#", "A", "B"]);
  assert.equal(letterSlug("#"), "0-9");
  assert.equal(letterSlug("B"), "b");
  assert.equal(letterFromSlug("0-9"), "#");
  assert.equal(letterFromSlug("b"), "B");
  assert.equal(letterFromSlug("B"), null);
  assert.equal(letterFromSlug("ab"), null);
  assert.equal(letterFromSlug("#"), null);
});

test("relatedTerms returns neighbours in the same category without self", () => {
  const terms = normalizeRows(
    ["a", "b", "c", "d", "e"].map((term) => row({ term })).concat(row({ term: "z", category: "gaming" })),
  );
  const c = terms.find((t) => t.term === "c")!;
  assert.deepEqual(relatedTerms(terms, c, 2).map((t) => t.term), ["d", "b"]);
  assert.equal(relatedTerms(terms, c, 10).length, 4);
  const z = terms.find((t) => t.term === "z")!;
  assert.deepEqual(relatedTerms(terms, z), []);
});

test("displayTerm lowercases plain capitalised words only", () => {
  assert.equal(displayTerm("Rizz"), "rizz");
  assert.equal(displayTerm("GG EZ"), "GG EZ");
  assert.equal(displayTerm("iPad Kid"), "iPad Kid");
});

test("normalizeRows sorts, drops blank terms and maps enums safely", () => {
  const terms = normalizeRows([
    row({ term: "Zesty", safety_level: "weird", generation: null, category: null, trending: null }),
    row({ term: "   " }),
    row({ term: "Ate", safety_level: "inappropriate", generation: "gen-alpha" }),
  ]);
  assert.deepEqual(terms.map((t) => t.term), ["Ate", "Zesty"]);
  assert.equal(terms[1].safety, "safe");
  assert.equal(terms[1].generation, "both");
  assert.equal(terms[1].category, "general");
  assert.equal(terms[1].trending, false);
  assert.equal(terms[0].safety, "inappropriate");
  assert.equal(terms[0].generation, "gen-alpha");
});

test("normalized terms carry no meaning fields at all", () => {
  const [t] = normalizeRows([
    { ...row({}), definition: "SECRET MEANING", example: "SECRET EXAMPLE", context: "SECRET ORIGIN" } as SlangRow,
  ]);
  assert.deepEqual(Object.keys(t).sort(), [
    "category",
    "createdAt",
    "generation",
    "safety",
    "slug",
    "term",
    "trending",
    "updatedAt",
    "usageCount",
  ]);
  assert.ok(!JSON.stringify(t).includes("SECRET"));
});

test("FAQ answers come from the rating label and generation only", () => {
  const [safe, edgy, alert, both] = normalizeRows([
    row({ term: "A" }),
    row({ term: "B", safety_level: "edgy", generation: "gen-alpha" }),
    row({ term: "C", safety_level: "inappropriate" }),
    row({ term: "D", generation: "both" }),
  ]);
  assert.equal(safetyAnswer(safe), "Slang Decoder rates A as Safe, meaning it is everyday slang that is not rude or explicit.");
  assert.match(safetyAnswer(edgy), /rates B as Edgy, meaning it is not explicit/);
  assert.match(safetyAnswer(alert), /rates C as Parent alert, meaning it is flagged for parents/);
  assert.equal(generationAnswer(safe), "A is mostly used by Gen Z.");
  assert.equal(generationAnswer(edgy), "B is mostly used by Gen Alpha.");
  assert.equal(generationAnswer(both), "D is used by both Gen Z and Gen Alpha.");
  assert.match(meaningAnswer(safe), /^The meaning of A, with a real example and a parent note, is in the Slang Decoder app/);
  assert.match(meaningAnswer(safe), /optional Premium subscription/);
});

test("pageUpdated never reports a date before the no-definition rebuild", () => {
  assert.equal(pageUpdated("2026-03-01T00:00:00Z"), PAGES_REVISED_AT);
  assert.equal(pageUpdated("2027-01-01T00:00:00.000Z"), "2027-01-01T00:00:00.000Z");
});

test("trending, newest and month helpers", () => {
  const terms = normalizeRows([
    row({ term: "a", trending: true, usage_count: 5, created_at: "2026-10-02T00:00:00Z" }),
    row({ term: "b", trending: true, usage_count: 9, created_at: "2026-09-30T23:59:59Z" }),
    row({ term: "c", trending: false, usage_count: 99, created_at: "2026-10-18T00:00:00Z" }),
    row({ term: "d", trending: true, usage_count: 5, created_at: "2026-03-01T00:00:00Z" }),
  ]);
  assert.deepEqual(trendingTerms(terms, 2).map((t) => t.term), ["b", "a"]);
  assert.deepEqual(trendingTerms(terms, 10).map((t) => t.term), ["b", "a", "d"]);
  assert.deepEqual(newestTerms(terms, 2).map((t) => t.term), ["c", "a"]);
  assert.deepEqual(addedInMonth(terms, new Date("2026-10-18T12:00:00Z")).map((t) => t.term), ["a", "c"]);
  assert.deepEqual(addedInMonth(terms, new Date("2026-11-01T00:00:00Z")), []);
});
