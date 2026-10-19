import Link from "next/link";
import { ListPage } from "@/components/slang/ListPage";
import { categoryDescription, categoryLabel } from "@/lib/slang-core";
import { APP_NAME, getCategories } from "@/lib/slang";
import { slangMetadata } from "@/lib/slang-metadata";

export const revalidate = 86400;

export const metadata = slangMetadata({
  title: `Slang Categories: Gaming, TikTok, Texting & More | ${APP_NAME}`,
  description:
    "Browse Gen Z and Gen Alpha slang by category, from gaming and TikTok to texting, music, and workplace slang. Each term's meaning is in the Slang Decoder app.",
  path: "/slang/glossary-categories",
});

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <ListPage
      path="/slang/glossary-categories"
      crumb="Categories"
      eyebrow="Slang by category"
      title="Slang categories"
      intro={<p>Every term in the index belongs to one of {categories.length} categories.</p>}
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {categories.map(({ category, count }) => (
          <li key={category} className="rounded-xl bg-white/[0.03] border border-white/10 p-5">
            <h2 className="text-xl font-semibold text-white mb-1">
              <Link href={`/slang/category/${category}`} className="underline-offset-2 hover:underline">
                {categoryLabel(category)} slang
              </Link>
            </h2>
            <p className="text-sm text-[#c4c4cc] mb-2">{count} terms</p>
            <p className="text-[#d4d4dc] leading-relaxed">{categoryDescription(category)}</p>
          </li>
        ))}
      </ul>
    </ListPage>
  );
}
