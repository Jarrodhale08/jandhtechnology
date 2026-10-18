import { getAllTerms, getCategories } from "@/lib/slang";
import { llmsIndex, TEXT_CACHE_HEADERS, type LlmsLink } from "@/lib/slang-llms";

export const revalidate = 86400;

const PAGES: LlmsLink[] = [
  { title: "Slang index A–Z", path: "/slang", note: "every term name with generation and safety rating" },
  { title: "Gen Alpha slang", path: "/slang/gen-alpha", note: "terms that started with Gen Alpha" },
  { title: "Slang for parents", path: "/slang/for-parents", note: "safety ratings, flagged terms, and how to talk with your kid" },
];

export async function GET() {
  const [terms, categories] = await Promise.all([getAllTerms(), getCategories()]);
  return new Response(llmsIndex(terms, categories.map((c) => c.category), PAGES), { headers: TEXT_CACHE_HEADERS });
}
