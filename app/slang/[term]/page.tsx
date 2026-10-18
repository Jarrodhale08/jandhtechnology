import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AppStoreCta,
  Breadcrumbs,
  GenerationBadge,
  SLANG_LINK,
  SafetyBadge,
  TermList,
} from "@/components/slang/ui";
import {
  answerSentence,
  badWordAnswer,
  categoryLabel,
  displayTerm,
  formatDate,
  generationLabel,
  parentNote,
  relatedTerms,
  safetyLabel,
  shouldShowExample,
  truncate,
} from "@/lib/slang-core";
import { APP_NAME, SITE_URL, getAllTerms, getTermBySlug, termUrl } from "@/lib/slang";
import {
  breadcrumbJsonLd,
  definedTermJsonLd,
  SLANG_INDEX_URL,
  termFaqJsonLd,
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
    title: `What does ${displayTerm(term.term)} mean? ${generation} slang definition | ${APP_NAME}`,
    description: truncate(
      `${answerSentence(term)} Example, meaning, and parent safety rating for this ${generationLabel(term.generation)} slang term.`,
      158,
    ),
    path: `/slang/${term.slug}`,
    type: "article",
  });
}

export default async function SlangTermPage({ params }: PageProps<"/slang/[term]">) {
  const term = await getTermBySlug((await params).term);
  if (!term) notFound();
  const related = relatedTerms(await getAllTerms(), term);
  const showExample = shouldShowExample(term);

  return (
    <article>
      <JsonLd
        data={[
          definedTermJsonLd(term),
          termFaqJsonLd(term),
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

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-indigo-400 mb-4">
          {generationLabel(term.generation)} slang
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight break-words">
          What does {term.term} mean?
        </h1>
        <p className="text-xl text-white leading-relaxed">{answerSentence(term)}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <GenerationBadge term={term} />
          <SafetyBadge safety={term.safety} />
          <Link
            href={`/slang/category/${term.category}`}
            className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#c8c8d0] hover:text-white"
          >
            {categoryLabel(term.category)}
          </Link>
        </div>
      </header>

      <dl className="space-y-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
        <div>
          <dt className="text-sm uppercase tracking-wider text-indigo-300 mb-1">Definition</dt>
          <dd className="text-[#e2e2e2] leading-relaxed">{term.definition}</dd>
        </div>
        {term.pronunciation && (
          <div>
            <dt className="text-sm uppercase tracking-wider text-indigo-300 mb-1">Pronunciation</dt>
            <dd className="text-[#e2e2e2] font-mono">{term.pronunciation}</dd>
          </div>
        )}
        <div>
          <dt className="text-sm uppercase tracking-wider text-indigo-300 mb-1">Example</dt>
          <dd className="text-[#e2e2e2] leading-relaxed">
            {showExample ? (
              <blockquote className="border-l-2 border-indigo-500/50 pl-4 italic">{term.example}</blockquote>
            ) : (
              <span className="text-[#c8c8d0]">
                Example withheld because this term is not appropriate for kids. The definition and
                parent note explain what it means.
              </span>
            )}
          </dd>
        </div>
        {term.context && (
          <div>
            <dt className="text-sm uppercase tracking-wider text-indigo-300 mb-1">Origin & context</dt>
            <dd className="text-[#e2e2e2] leading-relaxed">{term.context}</dd>
          </div>
        )}
        <div>
          <dt className="text-sm uppercase tracking-wider text-indigo-300 mb-1">Generation</dt>
          <dd className="text-[#e2e2e2]">{generationLabel(term.generation)}</dd>
        </div>
        <div>
          <dt className="text-sm uppercase tracking-wider text-indigo-300 mb-1">Parent safety rating</dt>
          <dd className="text-[#e2e2e2] leading-relaxed">
            <span className="font-semibold">{safetyLabel(term.safety)}.</span> {parentNote(term)}
          </dd>
        </div>
        {term.equivalents.length > 0 && (
          <div>
            <dt className="text-sm uppercase tracking-wider text-indigo-300 mb-2">How each generation says it</dt>
            <dd>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[#e2e2e2]">
                {term.equivalents.map((e) => (
                  <li key={e.label}>
                    <span className="text-[#ababab]">{e.label}:</span> {e.value}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>

      <section aria-labelledby="faq-heading" className="mt-12">
        <h2 id="faq-heading" className="text-2xl font-semibold text-white mb-4">
          Questions parents ask
        </h2>
        <dl className="space-y-5">
          <div>
            <dt className="font-semibold text-white mb-1">Is {term.term} a bad word?</dt>
            <dd className="text-[#c8c8d0] leading-relaxed">{badWordAnswer(term)}</dd>
          </div>
          <div>
            <dt className="font-semibold text-white mb-1">Who uses {term.term}?</dt>
            <dd className="text-[#c8c8d0] leading-relaxed">
              It is mostly used by {generationLabel(term.generation)} and is listed under{" "}
              <Link href={`/slang/category/${term.category}`} className={SLANG_LINK}>
                {categoryLabel(term.category)} slang
              </Link>
              . For context on safer and riskier terms, read the{" "}
              <Link href="/slang/for-parents" className={SLANG_LINK}>parent guide to slang</Link>.
            </dd>
          </div>
        </dl>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-12">
          <h2 id="related-heading" className="text-2xl font-semibold text-white mb-4">
            Related {categoryLabel(term.category)} slang
          </h2>
          <TermList terms={related} />
        </section>
      )}

      <p className="mt-10 text-sm text-[#ababab]">
        Last updated <time dateTime={term.updatedAt}>{formatDate(term.updatedAt)}</time>
      </p>

      <AppStoreCta heading={`Learn ${term.term} and 1,000+ more terms in ${APP_NAME}`} />
    </article>
  );
}
