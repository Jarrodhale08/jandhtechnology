import { getAllTerms, getCategories } from "@/lib/slang";
import { llmsIndex, TEXT_CACHE_HEADERS, type LlmsLink } from "@/lib/slang-llms";

export const revalidate = 86400;

const PAGES: LlmsLink[] = [
  { title: "Slang index A–Z", path: "/slang", note: "search and browse every term name with generation and safety rating" },
  { title: "Trending slang", path: "/slang/trending", note: "terms marked trending in the app" },
  { title: "New slang this month", path: "/slang/new-this-month", note: "the latest additions" },
  { title: "Slang safety guide for parents", path: "/slang/safety-guide", note: "ratings, warning signs, conversation starters, and crisis lines" },
  { title: "Slang Decoder FAQ", path: "/slang/faq", note: "pricing, privacy, safety, generations, and talking with kids" },
  { title: "How Slang Decoder works", path: "/slang/how-it-works", note: "what the app does" },
  { title: "About Slang Decoder", path: "/slang/about", note: "who curates the terms and editorial standards" },
  { title: "Who is Gen Z?", path: "/slang/gen-z", note: "birth years and where Gen Z slang comes from" },
  { title: "Who is Gen Alpha?", path: "/slang/gen-alpha", note: "birth years and where Gen Alpha slang comes from" },
  { title: "Slang for teachers", path: "/slang/for-teachers", note: "classroom ideas" },
  { title: "Slang for grandparents", path: "/slang/for-grandparents", note: "a friendly starting point" },
  { title: "Slang categories", path: "/slang/glossary-categories", note: "gaming, TikTok, texting, and more" },
];

const MARKDOWN: LlmsLink[] = [
  { title: "Slang index (markdown)", path: "/slang.md", note: "letters, trending terms, categories, and guides" },
  { title: "FAQ (markdown)", path: "/slang/faq.md", note: "the full FAQ" },
  { title: "Safety guide (markdown)", path: "/slang/safety-guide.md", note: "the full safety guide" },
  { title: "About (markdown)", path: "/slang/about.md", note: "editorial standards" },
  { title: "How it works (markdown)", path: "/slang/how-it-works.md", note: "app overview" },
  { title: "Any term (markdown)", path: "/slang/rizz.md", note: "replace rizz with any term slug" },
];

export async function GET() {
  const [terms, categories] = await Promise.all([getAllTerms(), getCategories()]);
  return new Response(llmsIndex(terms, categories.map((c) => c.category), PAGES, MARKDOWN), {
    headers: TEXT_CACHE_HEADERS,
  });
}
