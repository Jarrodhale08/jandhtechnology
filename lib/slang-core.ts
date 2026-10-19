const APP_LABEL = "Slang Decoder";

export type SafetyLevel = "safe" | "edgy" | "inappropriate";
export type Generation = "gen-z" | "gen-alpha" | "both";

export type SlangRow = {
  term: string;
  category: string | null;
  generation: string | null;
  safety_level: string | null;
  trending: boolean | null;
  usage_count: number | null;
  created_at: string;
  updated_at: string;
};

export type SlangTerm = {
  slug: string;
  term: string;
  category: string;
  generation: Generation;
  safety: SafetyLevel;
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

const RESERVED_SLUGS = [
  "about",
  "category",
  "faq",
  "for-grandparents",
  "for-parents",
  "for-teachers",
  "gen-alpha",
  "gen-z",
  "glossary-categories",
  "how-it-works",
  "letter",
  "new-this-month",
  "safety-guide",
  "trending",
];

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

export function normalizeRows(rows: SlangRow[]): SlangTerm[] {
  const usable = rows
    .map((row) => ({ row, term: cleanText(row.term) }))
    .filter((r): r is { row: SlangRow; term: string } => !!r.term)
    .sort((a, b) => compareTerms(a.term, b.term));
  const slugs = assignUniqueSlugs(usable.map((r) => r.term));
  return usable.map(({ row, term }, i) => ({
    slug: slugs[i],
    term,
    category: cleanText(row.category)?.toLowerCase() ?? "general",
    generation: toGeneration(row.generation),
    safety: toSafety(row.safety_level),
    trending: row.trending === true,
    usageCount: row.usage_count ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export function compareTerms(a: string, b: string): number {
  return a.localeCompare(b, "en", { sensitivity: "base", numeric: true });
}

export function letterOf(term: string): string {
  const first = term.trim().charAt(0).toUpperCase();
  return first >= "A" && first <= "Z" ? first : "#";
}

export const LETTERS = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

export function letterSlug(letter: string): string {
  return letter === "#" ? "0-9" : letter.toLowerCase();
}

export function letterFromSlug(slug: string): string | null {
  if (slug === "0-9") return "#";
  return /^[a-z]$/.test(slug) ? slug.toUpperCase() : null;
}

export function letterName(letter: string): string {
  return letter === "#" ? "Numbers and emoji" : `Letter ${letter}`;
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

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  general: "Everyday slang that shows up in conversation, at school, and online.",
  gaming: "Words from Roblox, Fortnite, Minecraft, and streaming culture.",
  meme: "Phrases that started as memes and spread through short videos.",
  tiktok: "Slang that took off on TikTok and other short-form video apps.",
  texting: "Acronyms and shorthand used in texts, DMs, and group chats.",
  insults: "Put-downs and teasing terms, many rated Edgy.",
  workplace: "Slang that Gen Z brought into offices and job chats.",
  music: "Terms from music fandoms, artists, and lyrics.",
  fashion: "Words for style, outfits, and looks.",
  relationships: "Slang about friendships, crushes, and relationships.",
  reactions: "Quick words used to react to news, posts, and messages.",
  dating: "Terms about dating and talking to someone new.",
};

export function categoryDescription(category: string): string {
  return CATEGORY_DESCRIPTIONS[category] ?? `Gen Z and Gen Alpha slang in the ${categoryLabel(category)} category.`;
}

export function safetyLabel(s: SafetyLevel): string {
  if (s === "safe") return "Safe";
  if (s === "edgy") return "Edgy";
  return "Parent alert";
}

export function safetyDescription(s: SafetyLevel): string {
  if (s === "safe") return "everyday slang that is not rude or explicit";
  if (s === "edgy") return "not explicit, but it can come across as rude, mean, or suggestive depending on context";
  return "flagged for parents because it can relate to sensitive topics such as self-harm, drugs, sexual content, or unsafe contact";
}

export function safetyAnswer(t: SlangTerm): string {
  return `${APP_LABEL} rates ${t.term} as ${safetyLabel(t.safety)}, meaning it is ${safetyDescription(t.safety)}.`;
}

export function generationAnswer(t: SlangTerm): string {
  if (t.generation === "both") return `${t.term} is used by both Gen Z and Gen Alpha.`;
  return `${t.term} is mostly used by ${generationLabel(t.generation)}.`;
}

export function meaningAnswer(t: SlangTerm): string {
  return `The meaning of ${t.term}, with a real example and a parent note, is in the ${APP_LABEL} app for iPhone. ${APP_LABEL} is free to download, with an optional Premium subscription that unlocks the full library.`;
}

export function displayTerm(term: string): string {
  return /^[A-Z][a-z]/.test(term) && !/[A-Z]{2}/.test(term) ? term.toLowerCase() : term;
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

// Every public page was rebuilt without definitions on this date, so no page is older than it.
export const PAGES_REVISED_AT = "2026-10-18T12:00:00.000Z";

export function pageUpdated(iso: string): string {
  return new Date(iso).getTime() > new Date(PAGES_REVISED_AT).getTime() ? iso : PAGES_REVISED_AT;
}

export function trendingTerms(terms: SlangTerm[], count: number): SlangTerm[] {
  return terms
    .filter((t) => t.trending)
    .sort((a, b) => b.usageCount - a.usageCount || compareTerms(a.term, b.term))
    .slice(0, count);
}

export function newestTerms(terms: SlangTerm[], count: number): SlangTerm[] {
  return [...terms].sort((a, b) => b.createdAt.localeCompare(a.createdAt) || compareTerms(a.term, b.term)).slice(0, count);
}

export function addedInMonth(terms: SlangTerm[], now: Date): SlangTerm[] {
  const prefix = now.toISOString().slice(0, 7);
  return terms.filter((t) => t.createdAt.slice(0, 7) === prefix).sort((a, b) => compareTerms(a.term, b.term));
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
