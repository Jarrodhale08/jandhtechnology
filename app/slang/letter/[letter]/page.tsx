import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppStoreCta, Breadcrumbs, LetterNav, SLANG_LINK, SlangHeader, SlangSubnav, TermList } from "@/components/slang/ui";
import { groupByLetter, letterFromSlug, letterSlug } from "@/lib/slang-core";
import { APP_NAME, SITE_URL, getAllTerms } from "@/lib/slang";
import { breadcrumbJsonLd, definedTermSetJsonLd, SLANG_INDEX_URL } from "@/lib/slang-jsonld";
import { NOT_FOUND_METADATA, slangMetadata } from "@/lib/slang-metadata";

export const revalidate = 86400;
export const dynamicParams = false;

export async function generateStaticParams() {
  return groupByLetter(await getAllTerms()).map((g) => ({ letter: letterSlug(g.letter) }));
}

async function load(slug: string) {
  const letter = letterFromSlug(slug);
  if (!letter) return null;
  const groups = groupByLetter(await getAllTerms());
  const index = groups.findIndex((g) => g.letter === letter);
  if (index === -1) return null;
  return { letter, groups, index, terms: groups[index].terms };
}

function heading(letter: string) {
  return letter === "#" ? "Slang terms starting with a number or emoji" : `Slang terms starting with ${letter}`;
}

export async function generateMetadata({ params }: PageProps<"/slang/letter/[letter]">): Promise<Metadata> {
  const data = await load((await params).letter);
  if (!data) return NOT_FOUND_METADATA;
  const label = data.letter === "#" ? "Numbers & Emoji" : data.letter;
  return slangMetadata({
    title: `Slang Terms: ${label} (${data.terms.length}) | ${APP_NAME}`,
    description: `${data.terms.length} Gen Z and Gen Alpha slang terms ${
      data.letter === "#" ? "starting with a number or emoji" : `starting with ${data.letter}`
    }, with the generation and parent safety rating for each. Meanings are in ${APP_NAME}.`,
    path: `/slang/letter/${letterSlug(data.letter)}`,
  });
}

export default async function LetterPage({ params }: PageProps<"/slang/letter/[letter]">) {
  const data = await load((await params).letter);
  if (!data) notFound();
  const { letter, groups, index, terms } = data;
  const url = `${SLANG_INDEX_URL}/letter/${letterSlug(letter)}`;
  const prev = groups[index - 1];
  const next = groups[index + 1];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Slang dictionary", url: SLANG_INDEX_URL },
            { name: heading(letter), url },
          ]),
          definedTermSetJsonLd(terms, url),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Slang dictionary", href: "/slang" },
          { name: letter === "#" ? "0–9 and emoji" : `Letter ${letter}` },
        ]}
      />
      <SlangHeader eyebrow="Slang A–Z" title={heading(letter)}>
        <p className="text-lg text-[#d4d4dc] leading-relaxed max-w-3xl">
          {terms.length} Gen Z and Gen Alpha slang terms, each with its generation and parent safety
          rating. Open a term to see where to find its meaning in {APP_NAME}.
        </p>
      </SlangHeader>
      <SlangSubnav />
      <LetterNav letters={groups.map((g) => g.letter)} current={letter} />
      <TermList terms={terms} />
      <nav aria-label="Previous and next letter" className="mt-10 flex flex-wrap justify-between gap-4">
        {prev ? (
          <Link href={`/slang/letter/${letterSlug(prev.letter)}`} className={`${SLANG_LINK} inline-flex min-h-8 items-center`}>
            Previous: {prev.letter === "#" ? "0–9 and emoji" : `letter ${prev.letter}`}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/slang/letter/${letterSlug(next.letter)}`} className={`${SLANG_LINK} inline-flex min-h-8 items-center`}>
            Next: letter {next.letter}
          </Link>
        )}
      </nav>
      <AppStoreCta />
    </>
  );
}
