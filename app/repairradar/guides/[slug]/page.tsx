import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/slang/ui";
import { AnswerSummary, LINK, PageShell, RichText, SectionHeading, StoreBadges } from "@/components/apps/ui";
import { appJsonLdId, getApp } from "@/lib/apps";
import { articleJsonLd } from "@/lib/apps-jsonld";
import { pageMetadata } from "@/lib/apps-metadata";
import { GUIDES, getGuide, guidePath, type GuideSection } from "@/lib/repairradar";
import { SITE_URL } from "@/lib/slang";
import { breadcrumbJsonLd } from "@/lib/slang-jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/repairradar/guides/[slug]">): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return pageMetadata({ title: guide.metaTitle, description: guide.description, path: guidePath(guide.slug), type: "article" });
}

function Section({ section }: { section: GuideSection }) {
  const ListTag = section.ordered ? "ol" : "ul";
  return (
    <section aria-labelledby={`${section.id}-heading`} className="mb-12">
      <SectionHeading id={`${section.id}-heading`}>{section.heading}</SectionHeading>
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

export default async function GuidePage({ params }: PageProps<"/repairradar/guides/[slug]">) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const app = getApp("repairradar");
  const url = `${SITE_URL}${guidePath(guide.slug)}`;
  const published = new Date(`${guide.dateModified}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const related = GUIDES.filter((g) => g.slug !== guide.slug);
  return (
    <PageShell>
      <JsonLd
        data={[
          articleJsonLd(guide, appJsonLdId(app)),
          breadcrumbJsonLd([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "RepairRadar", url: `${SITE_URL}/repairradar` },
            { name: "Guides", url: `${SITE_URL}/repairradar/guides` },
            { name: guide.title, url },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "RepairRadar", href: "/repairradar" },
          { name: "Guides", href: "/repairradar/guides" },
          { name: guide.title },
        ]}
      />
      <article>
        <header className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-indigo-300 mb-4">RepairRadar guide</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight break-words">{guide.title}</h1>
          <p className="text-sm text-[#b4b4be]">
            By J&amp;H Technology · Updated <time dateTime={guide.dateModified}>{published}</time>
          </p>
        </header>
        <AnswerSummary label="The short answer">
          <p>{guide.summary}</p>
        </AnswerSummary>
        <section aria-labelledby="key-points-heading" className="mb-12">
          <SectionHeading id="key-points-heading">Key points</SectionHeading>
          <ul className="space-y-2 pl-6 list-disc marker:text-indigo-300 text-[#d4d4dc] leading-relaxed max-w-3xl">
            {guide.keyPoints.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </section>
        {guide.sections.map((s) => (
          <Section key={s.id} section={s} />
        ))}
        {guide.sources.length > 0 && (
          <section aria-labelledby="sources-heading" className="mb-12">
            <SectionHeading id="sources-heading">Sources</SectionHeading>
            <ul className="space-y-2 pl-6 list-disc marker:text-indigo-300 text-[#d4d4dc] max-w-3xl">
              {guide.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noopener noreferrer" className={LINK}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      <aside
        aria-labelledby="app-tip-heading"
        className="mb-14 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-indigo-500/15 to-purple-600/15 border border-indigo-400/30"
      >
        <h2 id="app-tip-heading" className="text-2xl font-semibold text-white mb-3">
          Do it in RepairRadar
        </h2>
        <p className="text-[#d4d4dc] leading-relaxed mb-6 max-w-2xl">
          {guide.appTip}{" "}
          <Link href="/repairradar" className={LINK}>
            See plans and features
          </Link>
          .
        </p>
        <StoreBadges app={app} />
      </aside>
      <nav aria-labelledby="related-guides-heading">
        <h2 id="related-guides-heading" className="text-xl font-semibold text-white mb-4">
          More guides
        </h2>
        <ul className="space-y-2">
          {related.map((g) => (
            <li key={g.slug}>
              <Link href={guidePath(g.slug)} className={LINK}>
                {g.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </PageShell>
  );
}
