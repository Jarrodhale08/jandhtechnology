import type { MetadataRoute } from "next";
import { groupByLetter, latestUpdate, letterSlug, pageUpdated, PAGES_REVISED_AT } from "@/lib/slang-core";
import { SITE_URL, getAllTerms, getCategories, termUrl } from "@/lib/slang";
import { CONTENT_PAGES } from "@/lib/slang-pages";
import { FACTS_CHECKED_AT, PAGE_APPS } from "@/lib/apps";
import { GUIDES, guidePath } from "@/lib/repairradar";

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
    "/support",
    "/coffee-tasting/privacy",
    "/coffee-tasting/terms",
    "/coffee-tasting/support",
    "/coffee-tasting/delete-account",
    "/craving-crush/privacy",
    "/craving-crush/terms",
    "/craving-crush/support",
    "/craving-crush/delete-account",
    "/repairradar/delete-account",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: revised,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.3,
  }));
  const appPages: MetadataRoute.Sitemap = ["/apps", ...PAGE_APPS.map((a) => a.path), "/repairradar/guides"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(FACTS_CHECKED_AT),
    changeFrequency: "monthly",
    priority: path === "/apps" || path === "/repairradar" ? 0.9 : 0.8,
  }));
  const repairGuides: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE_URL}${guidePath(g.slug)}`,
    lastModified: new Date(g.dateModified),
    changeFrequency: "yearly",
    priority: 0.7,
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
  return [...staticPages, ...appPages, ...repairGuides, ...hubs, ...guides, ...letterPages, ...categoryPages, ...termPages];
}
