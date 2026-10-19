import {
  categoryLabel,
  generationLabel,
  letterSlug,
  safetyLabel,
  type SlangTerm,
} from "@/lib/slang-core";
import { APP_NAME, APP_STORE_URL, SITE_URL, termUrl } from "@/lib/slang";
import { termFaqItems } from "@/lib/slang-jsonld";
import { APP_PITCH } from "@/lib/slang-llms";
import { absoluteLinks, type ContentPage } from "@/lib/slang-pages";

export const MARKDOWN_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
};

const abs = (text: string) => absoluteLinks(text, SITE_URL);

function cta(heading: string): string[] {
  return [`## ${heading}`, "", APP_PITCH, "", `[Download ${APP_NAME} on the App Store](${APP_STORE_URL})`, ""];
}

export function contentPageMarkdown(page: ContentPage): string {
  const out = [`# ${page.title}`, "", ...page.intro.flatMap((p) => [abs(p), ""])];
  for (const s of page.sections) {
    out.push(`## ${s.heading}`, "");
    for (const p of s.paragraphs ?? []) out.push(abs(p), "");
    if (s.list) {
      s.list.forEach((item, i) => out.push(`${s.ordered ? `${i + 1}.` : "-"} ${abs(item)}`));
      out.push("");
    }
  }
  if (page.faq) {
    out.push("## Frequently asked questions", "");
    for (const f of page.faq) out.push(`### ${f.question}`, "", abs(f.answer), "");
  }
  out.push(...cta(page.ctaHeading), `Canonical page: ${SITE_URL}${page.path}`, "");
  return out.join("\n");
}

export function indexMarkdown(
  terms: SlangTerm[],
  letters: string[],
  categories: { category: string; count: number }[],
  trending: SlangTerm[],
): string {
  return [
    "# Gen Z & Gen Alpha Slang Dictionary",
    "",
    `An index of ${terms.length.toLocaleString("en-US")} slang terms with the generation that uses each one and a parent safety rating (Safe, Edgy, or Parent alert). Meanings and examples are in the ${APP_NAME} app, not on this website.`,
    "",
    "## Browse A–Z",
    "",
    ...letters.map((l) => `- [${l === "#" ? "0–9 and emoji" : l}](${SITE_URL}/slang/letter/${letterSlug(l)})`),
    "",
    "## Trending slang",
    "",
    ...trending.map((t) => `- [${t.term}](${termUrl(t.slug)}): ${generationLabel(t.generation)}, ${safetyLabel(t.safety)}`),
    "",
    "## Categories",
    "",
    ...categories.map((c) => `- [${categoryLabel(c.category)} slang](${SITE_URL}/slang/category/${c.category}) (${c.count} terms)`),
    "",
    "## Guides",
    "",
    `- [Slang safety guide for parents](${SITE_URL}/slang/safety-guide)`,
    `- [How Slang Decoder works](${SITE_URL}/slang/how-it-works)`,
    `- [Slang Decoder FAQ](${SITE_URL}/slang/faq)`,
    `- [About and editorial standards](${SITE_URL}/slang/about)`,
    "",
    ...cta(`Look up any slang term in ${APP_NAME}`),
    `Canonical page: ${SITE_URL}/slang`,
    "",
  ].join("\n");
}

export function termMarkdown(t: SlangTerm, related: SlangTerm[]): string {
  return [
    `# What does ${t.term} mean?`,
    "",
    `- Generation: ${generationLabel(t.generation)}`,
    `- Category: [${categoryLabel(t.category)}](${SITE_URL}/slang/category/${t.category})`,
    `- Parent safety rating: ${safetyLabel(t.safety)}`,
    ...(t.trending ? [`- Status: marked trending in ${APP_NAME}`] : []),
    "",
    `The meaning of ${t.term}, a real example, and a parent note are in the ${APP_NAME} app: [Download ${APP_NAME} on the App Store](${APP_STORE_URL}).`,
    "",
    "## Questions parents ask",
    "",
    ...termFaqItems(t).flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
    "## Related slang",
    "",
    ...related.map((r) => `- [${r.term}](${termUrl(r.slug)})`),
    "",
    ...cta(`See what "${t.term}" means in ${APP_NAME}`),
    `Canonical page: ${termUrl(t.slug)}`,
    "",
  ].join("\n");
}
