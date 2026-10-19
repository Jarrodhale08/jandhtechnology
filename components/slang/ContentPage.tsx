import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import type { ReactNode } from "react";
import { AppStoreCta, Breadcrumbs, SLANG_LINK, SlangHeader, SlangSubnav } from "@/components/slang/ui";
import { SITE_URL } from "@/lib/slang";
import { breadcrumbJsonLd, faqPageJsonLd, SLANG_INDEX_URL } from "@/lib/slang-jsonld";
import { slangMetadata } from "@/lib/slang-metadata";
import { plainText, splitLinks, type ContentPage, type ContentSection } from "@/lib/slang-pages";

export function contentMetadata(page: ContentPage) {
  return slangMetadata({
    title: page.metaTitle,
    description: page.description,
    path: page.path,
    markdownPath: page.markdown ? `${page.path}.md` : undefined,
  });
}

export function RichText({ text }: { text: string }) {
  return (
    <>
      {splitLinks(text).map((part, i) =>
        "text" in part ? (
          part.text
        ) : part.href.startsWith("/") ? (
          <Link key={i} href={part.href} className={SLANG_LINK}>
            {part.label}
          </Link>
        ) : (
          <a key={i} href={part.href} className={SLANG_LINK}>
            {part.label}
          </a>
        ),
      )}
    </>
  );
}

function Section({ section }: { section: ContentSection }) {
  const ListTag = section.ordered ? "ol" : "ul";
  return (
    <section aria-labelledby={`${section.id}-heading`} className="mb-12">
      <h2 id={`${section.id}-heading`} className="text-2xl font-semibold text-white mb-4">
        {section.heading}
      </h2>
      {section.paragraphs?.map((p) => (
        <p key={p} className="text-[#d4d4dc] leading-relaxed mb-4 max-w-3xl">
          <RichText text={p} />
        </p>
      ))}
      {section.list && (
        <ListTag
          className={`space-y-3 pl-6 text-[#d4d4dc] leading-relaxed max-w-3xl marker:text-indigo-300 ${
            section.ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {section.list.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ListTag>
      )}
    </section>
  );
}

export function ContentPageView({
  page,
  children,
  after,
}: {
  page: ContentPage;
  children?: ReactNode;
  after?: ReactNode;
}) {
  const url = `${SITE_URL}${page.path}`;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Slang dictionary", url: SLANG_INDEX_URL },
            { name: page.crumb, url },
          ]),
          ...(page.faq ? [faqPageJsonLd(page.faq.map((f) => ({ question: f.question, answer: plainText(f.answer) })), url)] : []),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Slang dictionary", href: "/slang" }, { name: page.crumb }]} />
      <SlangHeader eyebrow={page.eyebrow} title={page.title}>
        {page.intro.map((p) => (
          <p key={p} className="text-lg text-[#d4d4dc] leading-relaxed max-w-3xl mb-4">
            <RichText text={p} />
          </p>
        ))}
      </SlangHeader>
      <SlangSubnav current={page.path} />
      {children}
      {page.sections.map((s) => (
        <Section key={s.id} section={s} />
      ))}
      {page.faq && (
        <section aria-labelledby="faq-list-heading" className="mb-12">
          <h2 id="faq-list-heading" className="text-2xl font-semibold text-white mb-6">
            Frequently asked questions
          </h2>
          <dl className="space-y-6 max-w-3xl">
            {page.faq.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-white mb-1">{f.question}</dt>
                <dd className="text-[#d4d4dc] leading-relaxed">
                  <RichText text={f.answer} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      {after}
      <AppStoreCta heading={page.ctaHeading} />
    </>
  );
}
