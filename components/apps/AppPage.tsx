import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/slang/ui";
import {
  AnswerSummary,
  AppCard,
  AppIcon,
  FactsChecked,
  FaqList,
  FeatureGroups,
  LINK,
  OfficialLinks,
  PageShell,
  SectionHeading,
  StoreBadges,
} from "@/components/apps/ui";
import { appFaq } from "@/lib/apps-faq";
import { FACTS_CHECKED_AT, ORG_NAME, PAGE_APPS, getApp, pageUrl, platformSummary, type PortfolioApp } from "@/lib/apps";
import { mobileAppJsonLd } from "@/lib/apps-jsonld";
import { pageMetadata } from "@/lib/apps-metadata";
import { SITE_URL } from "@/lib/slang";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/slang-jsonld";
import { plainText } from "@/lib/slang-pages";

export function appPageMetadata(slug: string): Metadata {
  const app = getApp(slug);
  return pageMetadata({
    title: app.metaTitle,
    description: app.metaDescription,
    path: app.path,
    appStoreId: app.iosStatus === "live" ? app.appStoreId : undefined,
  });
}

export function appBreadcrumbs(app: PortfolioApp) {
  return [
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Apps", url: `${SITE_URL}/apps` },
    { name: app.name, url: pageUrl(app) },
  ];
}

export function AppHeader({ app }: { app: PortfolioApp }) {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-4 mb-5">
        <AppIcon app={app} size={72} />
        <p className="text-xs uppercase tracking-[0.25em] text-indigo-300">
          {`${app.category} app ${app.creator ? "published by" : "by"} J&H Technology`}
        </p>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight break-words">{app.storeName}</h1>
      <StoreBadges app={app} />
    </header>
  );
}

export function QuickFacts({ app }: { app: PortfolioApp }) {
  const rows: [string, string][] = [
    ["Platforms", platformSummary(app)],
    ["Price", app.pricing],
    ...(app.contentRating ? ([["App Store age rating", app.contentRating]] as [string, string][]) : []),
    ["Publisher", ORG_NAME],
    ...(app.creator ? ([["Built and maintained by", app.creator.name]] as [string, string][]) : []),
  ];
  return (
    <section aria-labelledby="facts-heading" className="mb-14">
      <SectionHeading id="facts-heading">Quick facts</SectionHeading>
      <dl className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="text-sm font-semibold text-[#c4c4cc]">{k}</dt>
            <dd className="text-[#e2e2e8] leading-relaxed">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function MoreApps({ current }: { current: string }) {
  const others = PAGE_APPS.filter((a) => a.slug !== current).slice(0, 3);
  return (
    <section aria-labelledby="more-apps-heading" className="mb-6">
      <SectionHeading id="more-apps-heading">More apps from J&amp;H Technology</SectionHeading>
      <ul className="grid gap-4 sm:grid-cols-3">
        {others.map((a) => (
          <AppCard key={a.slug} app={a} headingLevel="h3" />
        ))}
      </ul>
      <p className="mt-6">
        <Link href="/apps" className={LINK}>
          See all J&amp;H Technology apps
        </Link>
      </p>
    </section>
  );
}

export function AppPageView({ slug }: { slug: string }) {
  const app = getApp(slug);
  const faq = appFaq(app);
  return (
    <PageShell>
      <JsonLd
        data={[
          mobileAppJsonLd(app),
          breadcrumbJsonLd(appBreadcrumbs(app)),
          faqPageJsonLd(faq.map((f) => ({ question: f.question, answer: plainText(f.answer) })), pageUrl(app)),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Apps", href: "/apps" }, { name: app.name }]} />
      <AppHeader app={app} />
      <AnswerSummary label={`What is ${app.name}?`}>
        <p>{app.summary}</p>
      </AnswerSummary>
      <FeatureGroups groups={app.features} title={`${app.name} features`} />
      <QuickFacts app={app} />
      <OfficialLinks app={app} />
      <FaqList items={faq} title={`${app.name} questions`} />
      <MoreApps current={app.slug} />
      <FactsChecked date={FACTS_CHECKED_AT} />
    </PageShell>
  );
}
