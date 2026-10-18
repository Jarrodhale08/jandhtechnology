import { getAllTerms } from "@/lib/slang";
import { llmsFull, TEXT_CACHE_HEADERS } from "@/lib/slang-llms";

export const revalidate = 86400;

export async function GET() {
  return new Response(llmsFull(await getAllTerms()), { headers: TEXT_CACHE_HEADERS });
}
