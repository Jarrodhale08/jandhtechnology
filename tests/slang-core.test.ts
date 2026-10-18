import { test } from "node:test";
import assert from "node:assert/strict";
import {
  answerSentence,
  assignUniqueSlugs,
  badWordAnswer,
  cleanText,
  definitionAfterLead,
  displayTerm,
  groupByLetter,
  letterAnchor,
  normalizeRows,
  parentNote,
  relatedTerms,
  shouldShowExample,
  slugify,
  truncate,
  type SlangRow,
} from "../lib/slang-core";

function row(overrides: Partial<SlangRow>): SlangRow {
  return {
    term: "Rizz",
    definition: "Natural charm. Used about flirting.",
    example: "His rizz is unmatched.",
    category: "tiktok",
    generation: "gen-z",
    safety_level: "safe",
    context: null,
    generational_equivalents: { genZ: "Rizz", boomer: "Charm", unknown: "x" },
    pronunciation: "RIZ",
    trending: true,
    usage_count: 3,
    created_at: "2026-02-26T00:00:00Z",
    updated_at: "2026-03-01T00:00:00Z",
    danger_category: null,
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

test("normalizeRows sorts, drops unusable rows and maps enums safely", () => {
  const terms = normalizeRows([
    row({ term: "Zesty", safety_level: "weird", generation: null, category: null }),
    row({ term: "", definition: "x" }),
    row({ term: "Ate", danger_category: "drugs", safety_level: "inappropriate" }),
  ]);
  assert.deepEqual(terms.map((t) => t.term), ["Ate", "Zesty"]);
  assert.equal(terms[1].safety, "safe");
  assert.equal(terms[1].generation, "both");
  assert.equal(terms[1].category, "general");
  assert.equal(terms[0].danger, "drugs");
  assert.deepEqual(terms[0].equivalents, [
    { label: "Gen Z", value: "Rizz" },
    { label: "Boomer", value: "Charm" },
  ]);
});

test("answerSentence leads with the term and the first sentence", () => {
  const [rizz] = normalizeRows([row({})]);
  assert.equal(answerSentence(rizz), "Rizz means natural charm.");
  assert.equal(definitionAfterLead(rizz), "Used about flirting.");
  const [kys] = normalizeRows([row({ term: "KYS", definition: "Stands for 'Kill Yourself'" })]);
  assert.equal(answerSentence(kys), "KYS stands for 'Kill Yourself'.");
  const [percs] = normalizeRows([row({ term: "Percs", definition: "Short for Percocet." })]);
  assert.equal(answerSentence(percs), "Percs is short for Percocet.");
  const [sh] = normalizeRows([row({ term: "SH", definition: "Abbreviation for Self-Harm." })]);
  assert.equal(answerSentence(sh), "SH is an abbreviation for Self-Harm.");
  const [lol] = normalizeRows([row({ term: "LOL", definition: "LOUD laughter" })]);
  assert.equal(answerSentence(lol), "LOL means LOUD laughter.");
});

test("inappropriate terms hide examples and carry danger-specific notes", () => {
  const [safe, edgy, alert, generic] = normalizeRows([
    row({ term: "A" }),
    row({ term: "B", safety_level: "edgy" }),
    row({ term: "C", safety_level: "inappropriate", danger_category: "self-harm" }),
    row({ term: "D", safety_level: "inappropriate" }),
  ]);
  assert.equal(shouldShowExample(safe), true);
  assert.equal(shouldShowExample(edgy), true);
  assert.equal(shouldShowExample(alert), false);
  assert.match(parentNote(alert), /988/);
  assert.match(parentNote(generic), /flagged as inappropriate/);
  assert.match(badWordAnswer(safe), /^No\./);
  assert.match(badWordAnswer(edgy), /^Not exactly/);
  assert.match(badWordAnswer(alert), /^It can be\./);
  const [noExample] = normalizeRows([row({ example: null })]);
  assert.equal(shouldShowExample(noExample), false);
});

test("groupByLetter puts non-letters first under #", () => {
  const groups = groupByLetter(normalizeRows([row({ term: "bet" }), row({ term: "67" }), row({ term: "Aura" })]));
  assert.deepEqual(groups.map((g) => g.letter), ["#", "A", "B"]);
  assert.equal(letterAnchor("#"), "letter-num");
  assert.equal(letterAnchor("B"), "letter-b");
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

test("truncate respects the limit and word boundaries", () => {
  assert.equal(truncate("short", 10), "short");
  const out = truncate("one two three four five six", 12);
  assert.ok(out.length <= 12);
  assert.ok(out.endsWith("…"));
});
