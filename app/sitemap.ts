import type { MetadataRoute } from "next";
import { latestUpdate, pageUpdated } from "@/lib/slang-core";
import { SITE_URL, getAllTerms, getCategories, termUrl } from "@/lib/slang";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [terms, categories] = await Promise.all([getAllTerms(), getCategories()]);
  const dictionaryUpdated = new Date(pageUpdated(latestUpdate(terms)));
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/coffee-tasting/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/coffee-tasting/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/coffee-tasting/support`, changeFrequency: "yearly", priority: 0.3 },
  ];
  const hubs: MetadataRoute.Sitemap = ["/slang", "/slang/gen-alpha", "/slang/for-parents"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: dictionaryUpdated,
    changeFrequency: "daily",
    priority: path === "/slang" ? 0.9 : 0.8,
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
  return [...staticPages, ...hubs, ...categoryPages, ...termPages];
}
