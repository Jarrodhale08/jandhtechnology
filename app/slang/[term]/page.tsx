import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AppStoreCta,
  Breadcrumbs,
  GenerationBadge,
  LockedMeaning,
  SLANG_LINK,
  SafetyBadge,
  TermList,
} from "@/components/slang/ui";
import {
  categoryLabel,
  displayTerm,
  formatDate,
  generationLabel,
  pageUpdated,
  relatedTerms,
  safetyLabel,
} from "@/lib/slang-core";
import { APP_NAME, SITE_URL, getAllTerms, getTermBySlug, termUrl } from "@/lib/slang";
import {
  breadcrumbJsonLd,
  definedTermJsonLd,
  faqPageJsonLd,
  SLANG_INDEX_URL,
  termFaqItems,
} from "@/lib/slang-jsonld";
import { slangMetadata } from "@/lib/slang-metadata";

export const revalidate = 86400;

export async function generateStaticParams() {
  return (await getAllTerms()).map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/slang/[term]">): Promise<Metadata> {
  const term = await getTermBySlug((await params).term);
  if (!term) return {};
  const generation = term.generation === "gen-alpha" ? "Gen Alpha" : "Gen Z";
  return slangMetadata({
    title: `What does ${displayTerm(term.term)} mean? ${generation} slang | ${APP_NAME}`,
    description: `${term.term}: ${generationLabel(term.generation)} slang, ${categoryLabel(term.category)} category, rated ${safetyLabel(term.safety)} for parents. See what it means in the ${APP_NAME} iPhone app.`,
    path: `/slang/${term.slug}`,
    type: "article",
  });
}

export default async function SlangTermPage({ params }: PageProps<"/slang/[term]">) {
  const term = await getTermBySlug((await params).term);
  if (!term) notFound();
  const related = relatedTerms(await getAllTerms(), term);
  const faq = termFaqItems(term);
  const updated = pageUpdated(term.updatedAt);

  return (
    <article>
      <JsonLd
        data={[
          definedTermJsonLd(term),
          faqPageJsonLd(faq, termUrl(term.slug)),
          breadcrumbJsonLd([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Slang dictionary", url: SLANG_INDEX_URL },
            { name: categoryLabel(term.category), url: `${SLANG_INDEX_URL}/category/${term.category}` },
            { name: term.term, url: termUrl(term.slug) },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Slang dictionary", href: "/slang" },
          { name: categoryLabel(term.category), href: `/slang/category/${term.category}` },
          { name: term.term },
        ]}
      />

      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-indigo-300 mb-4">
          {generationLabel(term.generation)} slang
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight break-words">
          What does {term.term} mean?
        </h1>
        <dl className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <div className="flex items-center gap-2">
            <dt className="text-[#b4b4be]">Generation</dt>
            <dd><GenerationBadge term={term} prefix={false} /></dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-[#b4b4be]">Category</dt>
            <dd>
              <Link href={`/slang/category/${term.category}`} className={SLANG_LINK}>
                {categoryLabel(term.category)}
              </Link>
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-[#b4b4be]">Parent safety rating</dt>
            <dd><SafetyBadge safety={term.safety} prefix={false} /></dd>
          </div>
          {term.trending && (
            <div className="flex items-center gap-2">
              <dt className="text-[#b4b4be]">Status</dt>
              <dd className="text-white">Marked trending in {APP_NAME}</dd>
            </div>
          )}
        </dl>
      </header>

      <LockedMeaning term={term.term} />

      <section aria-labelledby="faq-heading" className="mt-12">
        <h2 id="faq-heading" className="text-2xl font-semibold text-white mb-4">
          Questions parents ask about {term.term}
        </h2>
        <dl className="space-y-5">
          {faq.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold text-white mb-1 break-words">{item.question}</dt>
              <dd className="text-[#d4d4dc] leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-12">
          <h2 id="related-heading" className="text-2xl font-semibold text-white mb-4">
            Related {categoryLabel(term.category)} slang
          </h2>
          <TermList terms={related} />
          <p className="mt-4 text-[#d4d4dc]">
            Browse all{" "}
            <Link href={`/slang/category/${term.category}`} className={SLANG_LINK}>
              {categoryLabel(term.category)} slang
            </Link>
            {" "}or the{" "}
            <Link href="/slang" className={SLANG_LINK}>full slang index</Link>.
          </p>
        </section>
      )}

      <p className="mt-10 text-sm text-[#b4b4be]">
        Last updated <time dateTime={updated}>{formatDate(updated)}</time>
      </p>

      <AppStoreCta id="term-cta-heading" heading={`See what “${term.term}” means in ${APP_NAME}`} />
    </article>
  );
}
