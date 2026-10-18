import { getAllTerms, getCategories } from "@/lib/slang";
import { llmsIndex, TEXT_CACHE_HEADERS } from "@/lib/slang-llms";

export const revalidate = 86400;

export async function GET() {
  const [terms, categories] = await Promise.all([getAllTerms(), getCategories()]);
  return new Response(llmsIndex(terms, categories.map((c) => c.category)), { headers: TEXT_CACHE_HEADERS });
}
