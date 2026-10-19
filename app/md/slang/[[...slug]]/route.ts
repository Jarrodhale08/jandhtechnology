import { groupByLetter, relatedTerms, trendingTerms } from "@/lib/slang-core";
import { getAllTerms, getCategories, getTermBySlug, SITE_URL } from "@/lib/slang";
import { contentPageMarkdown, indexMarkdown, MARKDOWN_HEADERS, termMarkdown } from "@/lib/slang-markdown";
import { CONTENT_PAGES } from "@/lib/slang-pages";

export const revalidate = 86400;

// Served publicly at /slang.md and /slang/{page}.md via rewrites in next.config.ts.
export async function GET(_req: Request, ctx: RouteContext<"/md/slang/[[...slug]]">) {
  const { slug = [] } = await ctx.params;
  if (slug.length > 1) return new Response("Not found", { status: 404 });
  const name = slug[0];
  const canonical = name ? `${SITE_URL}/slang/${name}` : `${SITE_URL}/slang`;
  const headers = { ...MARKDOWN_HEADERS, Link: `<${canonical}>; rel="canonical"` };

  if (!name) {
    const [terms, categories] = await Promise.all([getAllTerms(), getCategories()]);
    const letters = groupByLetter(terms).map((g) => g.letter);
    return new Response(indexMarkdown(terms, letters, categories, trendingTerms(terms, 24)), { headers });
  }

  const page = CONTENT_PAGES.find((p) => p.markdown && p.path === `/slang/${name}`);
  if (page) return new Response(contentPageMarkdown(page), { headers });

  const term = await getTermBySlug(name);
  if (!term) return new Response("Not found", { status: 404 });
  return new Response(termMarkdown(term, relatedTerms(await getAllTerms(), term)), { headers });
}
