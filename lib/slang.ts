import { cache } from "react";
import { normalizeRows, type SlangRow, type SlangTerm } from "@/lib/slang-core";

export const SITE_URL = "https://www.jandhtechnology.com";
export const APP_STORE_ID = "6759603354";
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;
export const APP_NAME = "Slang Decoder";
export const SLANG_REVALIDATE_SECONDS = 86400;

const PAGE_SIZE = 1000;
const COLUMNS = [
  "term",
  "definition",
  "example",
  "category",
  "generation",
  "safety_level",
  "context",
  "generational_equivalents",
  "pronunciation",
  "trending",
  "usage_count",
  "created_at",
  "updated_at",
  "danger_category",
].join(",");

async function fetchPage(baseUrl: string, key: string, offset: number): Promise<SlangRow[]> {
  const params = new URLSearchParams({
    select: COLUMNS,
    app_id: "eq.slang_to_english",
    order: "term.asc",
    limit: String(PAGE_SIZE),
    offset: String(offset),
  });
  const res = await fetch(`${baseUrl}/rest/v1/slang_terms?${params}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    next: { revalidate: SLANG_REVALIDATE_SECONDS, tags: ["slang-terms"] },
  });
  if (!res.ok) throw new Error(`slang_terms fetch failed: ${res.status}`);
  return res.json();
}

export const getAllTerms = cache(async (): Promise<SlangTerm[]> => {
  const baseUrl = process.env.SLANG_SUPABASE_URL;
  const key = process.env.SLANG_SUPABASE_ANON_KEY;
  if (!baseUrl || !key) throw new Error("SLANG_SUPABASE_URL / SLANG_SUPABASE_ANON_KEY are not set");
  const rows: SlangRow[] = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const page = await fetchPage(baseUrl, key, offset);
    rows.push(...page);
    if (page.length < PAGE_SIZE) break;
  }
  return normalizeRows(rows);
});

export async function getTermBySlug(slug: string): Promise<SlangTerm | undefined> {
  return (await getAllTerms()).find((t) => t.slug === slug);
}

export async function getCategories(): Promise<{ category: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const t of await getAllTerms()) counts.set(t.category, (counts.get(t.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

export function termUrl(slug: string): string {
  return `${SITE_URL}/slang/${slug}`;
}
