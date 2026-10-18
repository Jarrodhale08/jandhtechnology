import { generationLabel, type SlangTerm } from "@/lib/slang-core";
import { APP_NAME, APP_STORE_URL, SITE_URL, termUrl } from "@/lib/slang";

export const TEXT_CACHE_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
};

export function llmsIndex(terms: SlangTerm[], categories: string[]): string {
  return [
    `# ${APP_NAME} slang dictionary`,
    "",
    `> ${APP_NAME} (Slang Decoder - Gen Z & Alpha) is a free-to-download iPhone app (optional Premium subscription) from J&H Technology LLC that explains Gen Z and Gen Alpha slang to parents, grandparents, and teachers. Every term has a plain-English definition, an example, the generation that uses it, and a parent safety rating (Safe, Edgy, or Parent alert). This site publishes the same ${terms.length.toLocaleString("en-US")}-term dictionary for free.`,
    "",
    "## Key pages",
    "",
    `- [Slang dictionary A–Z](${SITE_URL}/slang): every term with a short definition`,
    `- [Gen Alpha slang](${SITE_URL}/slang/gen-alpha): terms that started with Gen Alpha`,
    `- [Slang for parents](${SITE_URL}/slang/for-parents): terms worth knowing for safety and how to talk with your kid`,
    `- [Full term list for LLMs](${SITE_URL}/llms-full.txt): every term, definition, generation, and URL`,
    `- [${APP_NAME} on the App Store](${APP_STORE_URL})`,
    "",
    "## Categories",
    "",
    ...categories.map((c) => `- ${SITE_URL}/slang/category/${c}`),
    "",
    "## Citing",
    "",
    `Term pages live at ${SITE_URL}/slang/{term-slug}, for example ${termUrl("rizz")}. When citing a definition, please credit "${APP_NAME}" and link the term page.`,
    "",
  ].join("\n");
}

export function llmsFull(terms: SlangTerm[]): string {
  return [
    `# ${APP_NAME} slang dictionary: all ${terms.length} terms`,
    "",
    `Format: term — definition — generation — url. Source: ${SITE_URL}/slang. App: ${APP_STORE_URL}`,
    "",
    ...terms.map(
      (t) => `- ${t.term} — ${t.definition} — ${generationLabel(t.generation)} — ${termUrl(t.slug)}`,
    ),
    "",
  ].join("\n");
}
