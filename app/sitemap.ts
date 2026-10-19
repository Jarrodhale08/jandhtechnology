import type { MetadataRoute } from "next";
import { groupByLetter, latestUpdate, letterSlug, pageUpdated, PAGES_REVISED_AT } from "@/lib/slang-core";
import { SITE_URL, getAllTerms, getCategories, termUrl } from "@/lib/slang";
import { CONTENT_PAGES } from "@/lib/slang-pages";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [terms, categories] = await Promise.all([getAllTerms(), getCategories()]);
  const revised = new Date(PAGES_REVISED_AT);
  const dictionaryUpdated = new Date(pageUpdated(latestUpdate(terms)));
  const staticPages: MetadataRoute.Sitemap = [
    "/",
    "/accessibility",
    "/privacy",
    "/terms",
    "/coffee-tasting/privacy",
    "/coffee-tasting/terms",
    "/coffee-tasting/support",
    "/coffee-tasting/delete-account",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: revised,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.3,
  }));
  const hubs: MetadataRoute.Sitemap = ["/slang", "/slang/trending", "/slang/new-this-month", "/slang/glossary-categories"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: dictionaryUpdated,
      changeFrequency: "daily",
      priority: path === "/slang" ? 0.9 : 0.8,
    }),
  );
  const guides: MetadataRoute.Sitemap = CONTENT_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: revised,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const letterPages: MetadataRoute.Sitemap = groupByLetter(terms).map((g) => ({
    url: `${SITE_URL}/slang/letter/${letterSlug(g.letter)}`,
    lastModified: new Date(pageUpdated(latestUpdate(g.terms))),
    changeFrequency: "weekly",
    priority: 0.6,
  }));
  const categoryPages: MetadataRoute.Sitemap = categories.map(({ category }) => ({
    url: `${SITE_URL}/slang/category/${category}`,
    lastModified: new Date(pageUpdated(latestUpdate(terms.filter((t) => t.category === category)))),
    changeFrequency: "weekly",
    priority: 0.6,
  }));
  const termPages: MetadataRoute.Sitemap = terms.map((t) => ({
    url: termUrl(t.slug),
    lastModified: new Date(pageUpdated(t.updatedAt)),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticPages, ...hubs, ...guides, ...letterPages, ...categoryPages, ...termPages];
}
