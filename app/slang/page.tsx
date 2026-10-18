import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import SlangSearch from "@/components/slang/SlangSearch";
import {
  AppStoreCta,
  Breadcrumbs,
  CompactTermList,
  SLANG_LINK,
  SlangHeader,
  SlangSubnav,
  TermList,
} from "@/components/slang/ui";
import { categoryLabel, formatDate, groupByLetter, latestUpdate, letterAnchor } from "@/lib/slang-core";
import { APP_NAME, getAllTerms, getCategories } from "@/lib/slang";
import { breadcrumbJsonLd, definedTermSetJsonLd, mobileApplicationJsonLd, SLANG_INDEX_URL } from "@/lib/slang-jsonld";
import { slangMetadata } from "@/lib/slang-metadata";

export const revalidate = 86400;

export const metadata = slangMetadata({
  title: `Gen Z & Gen Alpha Slang Dictionary A–Z | ${APP_NAME}`,
  description:
    "What does rizz, skibidi, or gyatt mean? Look up 1,000+ Gen Z and Gen Alpha slang terms with plain-English definitions, examples, and a parent safety rating.",
  path: "/slang",
});

export default async function SlangIndexPage() {
  const [terms, categories] = await Promise.all([getAllTerms(), getCategories()]);
  const groups = groupByLetter(terms);
  const trending = terms
    .filter((t) => t.trending)
    .sort((a, b) => b.usageCount - a.usageCount || a.term.localeCompare(b.term))
    .slice(0, 12);
  const newest = [...terms].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 12);
  const updated = latestUpdate(terms);

  return (
    <>
      <JsonLd
        data={[
          definedTermSetJsonLd(terms),
          mobileApplicationJsonLd(),
          breadcrumbJsonLd([{ name: "Slang dictionary", url: SLANG_INDEX_URL }]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Slang dictionary" }]} />
      <SlangHeader eyebrow={`${APP_NAME} · Slang dictionary`} title="Gen Z & Gen Alpha Slang Dictionary">
        <p className="text-lg text-[#c8c8d0] leading-relaxed max-w-3xl">
          Plain-English definitions for {terms.length.toLocaleString("en-US")} slang terms your kids,
          students, or coworkers are using, each with a real example, the generation that uses it,
          and a parent safety rating. Built by the team behind the{" "}
          <Link href="#app-cta-heading" className={SLANG_LINK}>
            {APP_NAME} iPhone app
          </Link>
          .
        </p>
        <p className="mt-4 text-sm text-[#ababab]">
          Last updated <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      </SlangHeader>

      <SlangSubnav />

      <section aria-labelledby="trending-heading" className="mb-12">
        <h2 id="trending-heading" className="text-2xl font-semibold text-white mb-4">
          Trending slang
        </h2>
        <TermList terms={trending} />
      </section>

      <section aria-labelledby="newest-heading" className="mb-12">
        <h2 id="newest-heading" className="text-2xl font-semibold text-white mb-4">
          Newest additions
        </h2>
        <TermList terms={newest} />
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
                className="inline-flex text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#c8c8d0] hover:text-white hover:border-indigo-500/40 transition-colors"
              >
                {categoryLabel(category)} <span className="ml-1 text-[#ababab]">({count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="az-heading">
        <h2 id="az-heading" className="text-2xl font-semibold text-white mb-4">
          All slang terms A–Z
        </h2>
        <SlangSearch targetId="slang-az" total={terms.length} />
        <nav aria-label="Jump to letter" className="mb-8">
          <ul className="flex flex-wrap gap-1.5">
            {groups.map(({ letter }) => (
              <li key={letter}>
                <a
                  href={`#${letterAnchor(letter)}`}
                  className="inline-flex items-center justify-center min-w-11 min-h-11 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-[#c8c8d0] hover:text-white hover:border-indigo-500/40 transition-colors"
                >
                  <span className="sr-only">{letter === "#" ? "Numbers and emoji" : `Letter ${letter}`}</span>
                  <span aria-hidden="true">{letter}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div id="slang-az" className="space-y-10">
          {groups.map(({ letter, terms: letterTerms }) => (
            <section
              key={letter}
              id={letterAnchor(letter)}
              data-slang-section=""
              aria-labelledby={`${letterAnchor(letter)}-heading`}
              className="scroll-mt-28"
            >
              <h3
                id={`${letterAnchor(letter)}-heading`}
                className="text-xl font-semibold text-indigo-300 font-mono mb-4 pb-2 border-b border-white/[0.06]"
              >
                {letter === "#" ? "# Numbers & emoji" : letter}
              </h3>
              <CompactTermList terms={letterTerms} />
            </section>
          ))}
        </div>
      </section>

      <AppStoreCta />
    </>
  );
}
