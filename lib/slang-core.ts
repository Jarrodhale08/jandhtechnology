export type SafetyLevel = "safe" | "edgy" | "inappropriate";
export type Generation = "gen-z" | "gen-alpha" | "both";
export type DangerCategory = "self-harm" | "drugs" | "sexual" | "predatory";

export type SlangRow = {
  term: string;
  definition: string;
  example: string | null;
  category: string | null;
  generation: string | null;
  safety_level: string | null;
  context: string | null;
  generational_equivalents: Record<string, string> | null;
  pronunciation: string | null;
  trending: boolean | null;
  usage_count: number | null;
  created_at: string;
  updated_at: string;
  danger_category: string | null;
};

export type SlangTerm = {
  slug: string;
  term: string;
  definition: string;
  example: string | null;
  context: string | null;
  category: string;
  generation: Generation;
  safety: SafetyLevel;
  danger: DangerCategory | null;
  equivalents: { label: string; value: string }[];
  pronunciation: string | null;
  trending: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
};

const EMOJI_NAMES: Record<string, string> = {
  "🤢": "nauseated-face",
  "🌿": "herb",
  "💊": "pill",
  "💦": "sweat-droplets",
  "👀": "eyes",
  "❄": "snowflake",
  "❄️": "snowflake",
  "🍆🍑": "eggplant-peach",
  "🍍": "pineapple",
  "💀": "skull",
  "😭": "loudly-crying-face",
};

const EQUIVALENT_LABELS: [string, string][] = [
  ["genAlpha", "Gen Alpha"],
  ["genZ", "Gen Z"],
  ["millennial", "Millennial"],
  ["genX", "Gen X"],
  ["boomer", "Boomer"],
];

export function cleanText(value: string | null | undefined): string | null {
  if (value == null) return null;
  const cleaned = value.replace(/''/g, "'").replace(/\s+/g, " ").trim();
  return cleaned.length > 0 ? cleaned : null;
}

export function slugify(term: string): string {
  const trimmed = term.trim();
  const emoji = EMOJI_NAMES[trimmed];
  if (emoji) return `${emoji}-emoji`;
  const ascii = trimmed
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (ascii) return ascii;
  const codepoints = Array.from(trimmed)
    .map((ch) => ch.codePointAt(0)!.toString(16))
    .filter((hex) => hex !== "fe0f")
    .join("-");
  return `emoji-${codepoints}`;
}

const RESERVED_SLUGS = ["category", "gen-alpha", "for-parents"];

export function assignUniqueSlugs(terms: string[]): string[] {
  const seen = new Map<string, number>(RESERVED_SLUGS.map((slug) => [slug, 1]));
  return terms.map((term) => {
    const base = slugify(term);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  });
}

function toSafety(value: string | null): SafetyLevel {
  return value === "edgy" || value === "inappropriate" ? value : "safe";
}

function toGeneration(value: string | null): Generation {
  return value === "gen-z" || value === "gen-alpha" ? value : "both";
}

function toDanger(value: string | null): DangerCategory | null {
  return value === "self-harm" || value === "drugs" || value === "sexual" || value === "predatory"
    ? value
    : null;
}

export function normalizeRows(rows: SlangRow[]): SlangTerm[] {
  const usable = rows
    .map((row) => ({ row, term: cleanText(row.term), definition: cleanText(row.definition) }))
    .filter((r): r is { row: SlangRow; term: string; definition: string } => !!r.term && !!r.definition)
    .sort((a, b) => compareTerms(a.term, b.term));
  const slugs = assignUniqueSlugs(usable.map((r) => r.term));
  return usable.map(({ row, term, definition }, i) => {
    const equivalents = EQUIVALENT_LABELS.flatMap(([key, label]) => {
      const value = cleanText(row.generational_equivalents?.[key]);
      return value ? [{ label, value }] : [];
    });
    return {
      slug: slugs[i],
      term,
      definition,
      example: cleanText(row.example),
      context: cleanText(row.context),
      category: cleanText(row.category)?.toLowerCase() ?? "general",
      generation: toGeneration(row.generation),
      safety: toSafety(row.safety_level),
      danger: toDanger(row.danger_category),
      equivalents,
      pronunciation: cleanText(row.pronunciation),
      trending: row.trending === true,
      usageCount: row.usage_count ?? 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  });
}

export function compareTerms(a: string, b: string): number {
  return a.localeCompare(b, "en", { sensitivity: "base", numeric: true });
}

export function letterOf(term: string): string {
  const first = term.trim().charAt(0).toUpperCase();
  return first >= "A" && first <= "Z" ? first : "#";
}

export function letterAnchor(letter: string): string {
  return letter === "#" ? "letter-num" : `letter-${letter.toLowerCase()}`;
}

export function groupByLetter(terms: SlangTerm[]): { letter: string; terms: SlangTerm[] }[] {
  const groups = new Map<string, SlangTerm[]>();
  for (const t of terms) {
    const letter = letterOf(t.term);
    const list = groups.get(letter) ?? [];
    list.push(t);
    groups.set(letter, list);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => (a === "#" ? -1 : b === "#" ? 1 : a.localeCompare(b)))
    .map(([letter, list]) => ({ letter, terms: list }));
}

export function generationLabel(g: Generation): string {
  if (g === "gen-z") return "Gen Z";
  if (g === "gen-alpha") return "Gen Alpha";
  return "Gen Z & Gen Alpha";
}

const CATEGORY_LABELS: Record<string, string> = { tiktok: "TikTok" };

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category.charAt(0).toUpperCase() + category.slice(1);
}

export function safetyLabel(s: SafetyLevel): string {
  if (s === "safe") return "Safe";
  if (s === "edgy") return "Edgy";
  return "Parent alert";
}

export function shouldShowExample(t: SlangTerm): boolean {
  return t.safety !== "inappropriate" && !!t.example;
}

export function parentNote(t: SlangTerm): string {
  if (t.safety === "safe") {
    return `${t.term} is everyday slang. It is not rude or explicit, so there is nothing to worry about if you hear it.`;
  }
  if (t.safety === "edgy") {
    return `${t.term} is not explicit, but it can come across as rude, mean, or suggestive depending on who says it and how. Worth a casual conversation if you hear it aimed at someone.`;
  }
  switch (t.danger) {
    case "self-harm":
      return `${t.term} can relate to self-harm or suicide. If your child uses it about themselves, ask calmly and listen without judgment. In the US, you can call or text 988 (Suicide & Crisis Lifeline) at any time.`;
    case "drugs":
      return `${t.term} can be a reference to drugs. Ask where they heard it and talk openly about the risks rather than reacting with punishment first.`;
    case "sexual":
      return `${t.term} has a sexual meaning. If a younger child is using it, they may have picked it up online without understanding it, so explain calmly what it means and why it is not appropriate.`;
    case "predatory":
      return `${t.term} can show up when someone is trying to move a child into private or in-person contact. Check who your child is talking to online and remind them never to meet an online contact alone.`;
    default:
      return `${t.term} is flagged as inappropriate for kids. Talk with your child about what it means and where they came across it.`;
  }
}

export function badWordAnswer(t: SlangTerm): string {
  if (t.safety === "safe") {
    return `No. ${t.term} is not a bad word. It is safe, everyday slang.`;
  }
  if (t.safety === "edgy") {
    return `Not exactly, but it is edgy. ${t.term} is not a swear word, though it can be rude, mean, or suggestive depending on context.`;
  }
  return `It can be. ${t.term} is flagged as inappropriate for kids, and parents should know what it means. ${parentNote(t)}`;
}

function firstSentence(text: string): string {
  const match = text.match(/^.+?[.!?](?=\s+[A-Z(“"'0-9]|$)/);
  return (match ? match[0] : text).trim();
}

function lowerFirst(text: string): string {
  if (/^[A-Z][a-z]/.test(text)) return text.charAt(0).toLowerCase() + text.slice(1);
  return text;
}

export function answerSentence(t: SlangTerm): string {
  const lead = firstSentence(t.definition);
  const withStop = /[.!?]$/.test(lead) ? lead : `${lead}.`;
  if (/^(stands for|short for)\b/i.test(withStop)) {
    const rest = lowerFirst(withStop);
    return rest.startsWith("short for") ? `${t.term} is ${rest}` : `${t.term} ${rest}`;
  }
  if (/^(an? )?(abbreviation|acronym) for\b/i.test(withStop)) {
    return `${t.term} is ${/^an? /i.test(withStop) ? lowerFirst(withStop) : `an ${lowerFirst(withStop)}`}`;
  }
  return `${t.term} means ${lowerFirst(withStop)}`;
}

export function definitionAfterLead(t: SlangTerm): string | null {
  const rest = t.definition.slice(firstSentence(t.definition).length).trim();
  return rest || null;
}

export function displayTerm(term: string): string {
  return /^[A-Z][a-z]/.test(term) && !/[A-Z]{2}/.test(term) ? term.toLowerCase() : term;
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.]+$/, "")}…`;
}

export function relatedTerms(all: SlangTerm[], t: SlangTerm, count = 8): SlangTerm[] {
  const same = all.filter((x) => x.category === t.category);
  const idx = same.findIndex((x) => x.slug === t.slug);
  const n = same.length;
  if (idx === -1) return [];
  const limit = Math.min(count, n - 1);
  const picks: SlangTerm[] = [];
  for (let step = 1; picks.length < limit; step++) {
    for (const candidate of [same[(idx + step) % n], same[(((idx - step) % n) + n) % n]]) {
      if (picks.length < limit && candidate.slug !== t.slug && !picks.includes(candidate)) {
        picks.push(candidate);
      }
    }
  }
  return picks;
}

export function latestUpdate(terms: SlangTerm[]): string {
  return terms.reduce((max, t) => (t.updatedAt > max ? t.updatedAt : max), "1970-01-01T00:00:00Z");
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
