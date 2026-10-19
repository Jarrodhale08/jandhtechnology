import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import SlangSearch from "@/components/slang/SlangSearch";
import {
  AppStoreCta,
  Breadcrumbs,
  LetterNav,
  SLANG_LINK,
  SlangHeader,
  SlangSubnav,
  TermList,
} from "@/components/slang/ui";
import { categoryLabel, formatDate, groupByLetter, latestUpdate, pageUpdated, trendingTerms } from "@/lib/slang-core";
import { APP_NAME, APP_STORE_URL, getAllTerms, getCategories } from "@/lib/slang";
import { breadcrumbJsonLd, SLANG_INDEX_URL } from "@/lib/slang-jsonld";
import { slangMetadata } from "@/lib/slang-metadata";

export const revalidate = 86400;

export const metadata = slangMetadata({
  title: `Gen Z & Gen Alpha Slang Dictionary A–Z | ${APP_NAME}`,
  description:
    "Browse 1,000+ Gen Z and Gen Alpha slang terms with the generation and a parent safety rating for each. Get every meaning in the Slang Decoder iPhone app.",
  path: "/slang",
  markdownPath: "/slang.md",
});

const GUIDES = [
  { href: "/slang/safety-guide", label: "Slang safety guide for parents" },
  { href: "/slang/for-teachers", label: "Slang for teachers" },
  { href: "/slang/for-grandparents", label: "Slang for grandparents" },
  { href: "/slang/gen-z", label: "Who is Gen Z?" },
  { href: "/slang/gen-alpha", label: "Who is Gen Alpha?" },
  { href: "/slang/how-it-works", label: "How Slang Decoder works" },
];

export default async function SlangIndexPage() {
  const [terms, categories] = await Promise.all([getAllTerms(), getCategories()]);
  const groups = groupByLetter(terms);
  const trending = trendingTerms(terms, 12);
  const updated = pageUpdated(latestUpdate(terms));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://www.jandhtechnology.com/" },
          { name: "Slang dictionary", url: SLANG_INDEX_URL },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Slang dictionary" }]} />
      <SlangHeader eyebrow={`${APP_NAME} · Slang dictionary`} title="Gen Z & Gen Alpha Slang Dictionary">
        <p className="text-lg text-[#d4d4dc] leading-relaxed max-w-3xl">
          An index of {terms.length.toLocaleString("en-US")} slang terms your kids, students, or
          coworkers are using, with the generation that uses each one and a parent safety rating.
          The meaning and a real example for every term are in the{" "}
          <a href={APP_STORE_URL} className={SLANG_LINK} rel="noopener noreferrer">
            {APP_NAME} iPhone app
          </a>
          .
        </p>
        <p className="mt-4 text-sm text-[#c4c4cc]">
          Last updated <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      </SlangHeader>

      <SlangSubnav current="/slang" />

      <section aria-labelledby="search-heading" className="mb-12">
        <h2 id="search-heading" className="text-2xl font-semibold text-white mb-4">
          Find a slang term
        </h2>
        <SlangSearch total={terms.length} />
        <h3 className="text-lg font-semibold text-white mb-3">Browse A–Z</h3>
        <LetterNav letters={groups.map((g) => g.letter)} />
      </section>

      <section aria-labelledby="trending-heading" className="mb-12">
        <h2 id="trending-heading" className="text-2xl font-semibold text-white mb-4">
          Trending slang
        </h2>
        <TermList terms={trending} />
        <p className="mt-4">
          <Link href="/slang/trending" className={SLANG_LINK}>
            See more trending slang
          </Link>
        </p>
      </section>

      <section aria-labelledby="categories-heading" className="mb-12">
        <h2 id="categories-heading" className="text-2xl font-semibold text-white mb-4">
          Browse by category
        </h2>
        <ul className="flex flex-wrap gap-2">
          {categories.map(({ category, count }) => (
            <li key={category}>
              <Link
                href={`/slang/category/${category}`}
                className="inline-flex min-h-8 items-center text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/20 text-[#e2e2e8] hover:text-white hover:border-indigo-400/60"
              >
                {categoryLabel(category)} <span className="ml-1 text-[#c4c4cc]">({count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="guides-heading" className="mb-12">
        <h2 id="guides-heading" className="text-2xl font-semibold text-white mb-4">
          Guides
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <li key={g.href}>
              <Link href={g.href} className={`${SLANG_LINK} inline-flex min-h-8 items-center`}>
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <AppStoreCta />
    </>
  );
}
