import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppStoreCta, Breadcrumbs, SlangHeader, SlangSubnav, TermList } from "@/components/slang/ui";
import { categoryLabel } from "@/lib/slang-core";
import { APP_NAME, SITE_URL, getAllTerms, getCategories } from "@/lib/slang";
import { breadcrumbJsonLd, SLANG_INDEX_URL } from "@/lib/slang-jsonld";
import { slangMetadata } from "@/lib/slang-metadata";

export const revalidate = 86400;

export async function generateStaticParams() {
  return (await getCategories()).map(({ category }) => ({ category }));
}

async function loadCategory(category: string) {
  const terms = (await getAllTerms()).filter((t) => t.category === category);
  return terms.length > 0 ? terms : null;
}

export async function generateMetadata({ params }: PageProps<"/slang/category/[category]">): Promise<Metadata> {
  const { category } = await params;
  const terms = await loadCategory(category);
  if (!terms) return {};
  const label = categoryLabel(category);
  return slangMetadata({
    title: `${label} Slang: ${terms.length} Gen Z & Gen Alpha Terms | ${APP_NAME}`,
    description: `${terms.length} Gen Z and Gen Alpha ${label} slang terms with the generation and a parent safety rating for each. Get every meaning in the ${APP_NAME} iPhone app.`,
    path: `/slang/category/${category}`,
  });
}

export default async function SlangCategoryPage({ params }: PageProps<"/slang/category/[category]">) {
  const { category } = await params;
  const terms = await loadCategory(category);
  if (!terms) notFound();
  const label = categoryLabel(category);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Slang dictionary", url: SLANG_INDEX_URL },
          { name: "Categories", url: `${SLANG_INDEX_URL}/glossary-categories` },
          { name: `${label} slang`, url: `${SLANG_INDEX_URL}/category/${category}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Slang dictionary", href: "/slang" },
          { name: "Categories", href: "/slang/glossary-categories" },
          { name: `${label} slang` },
        ]}
      />
      <SlangHeader eyebrow="Slang by category" title={`${label} slang`}>
        <p className="text-lg text-[#c8c8d0] leading-relaxed max-w-3xl">
          {terms.length} {label} slang terms used by Gen Z and Gen Alpha, each with its generation and
          a parent safety rating. Open any term to see how to look up its meaning in {APP_NAME}.
        </p>
      </SlangHeader>
      <SlangSubnav current="/slang/glossary-categories" />
      <TermList terms={terms} />
      <AppStoreCta />
    </>
  );
}
