import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, SlangHeader } from "@/components/slang/ui";
import { AnswerSummary, AppCard, AppIcon, FactsChecked, LINK, PageShell, SectionHeading, StoreBadges } from "@/components/apps/ui";
import { APPLE_DEVELOPER_URL, APPS, FACTS_CHECKED_AT, PLAY_DEVELOPER_URL, getApp } from "@/lib/apps";
import { appListJsonLd } from "@/lib/apps-jsonld";
import { pageMetadata } from "@/lib/apps-metadata";
import { SITE_URL } from "@/lib/slang";
import { breadcrumbJsonLd } from "@/lib/slang-jsonld";

const URL = `${SITE_URL}/apps`;

export const metadata = pageMetadata({
  title: "Apps by J&H Technology: iPhone, Android and Web",
  description:
    "Every app published by J&H Technology LLC: RepairRadar, NannyLog, Meal Prep, Craving Crush, HandyBook, Stronger Couple, Slang Decoder, ProTravel and more.",
  path: "/apps",
});

export default function AppsPage() {
  const flagship = getApp("repairradar");
  const others = APPS.filter((a) => a.slug !== flagship.slug);
  const names = APPS.map((a) => a.name);
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Apps", url: URL },
          ]),
          appListJsonLd(APPS, URL),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Apps" }]} />
      <SlangHeader eyebrow="Portfolio" title="J&H Technology apps">
        <p className="text-lg text-[#d4d4dc] leading-relaxed max-w-3xl">
          The mobile apps we build and publish, with links to each app&rsquo;s store listings, website and
          support pages.
        </p>
      </SlangHeader>

      <AnswerSummary label="At a glance">
        <p>
          J&amp;H Technology LLC publishes {APPS.length} apps: {names.slice(0, -1).join(", ")} and {names.at(-1)}. Most
          run on iPhone and iPad, and several are also on Android or the web.
        </p>
      </AnswerSummary>

      <section aria-labelledby="flagship-heading" className="mb-14">
        <div className="rounded-2xl p-6 md:p-8 bg-gradient-to-br from-indigo-500/15 to-purple-600/15 border border-indigo-400/30">
          <div className="flex items-center gap-4 mb-4">
            <AppIcon app={flagship} size={72} />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-200 mb-1">Featured</p>
              <h2 id="flagship-heading" className="text-2xl md:text-3xl font-semibold text-white">
                <Link href={flagship.path} className="hover:text-indigo-200">
                  {flagship.storeName}
                </Link>
              </h2>
            </div>
          </div>
          <p className="text-[#d4d4dc] leading-relaxed mb-6 max-w-3xl">{flagship.summary}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <StoreBadges app={flagship} />
            <p className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href={flagship.path} className={LINK}>
                About RepairRadar
              </Link>
              <Link href="/repairradar/guides" className={LINK}>
                Home maintenance guides
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="all-apps-heading" className="mb-14">
        <SectionHeading id="all-apps-heading">All apps</SectionHeading>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((a) => (
            <AppCard key={a.slug} app={a} headingLevel="h3" />
          ))}
        </ul>
      </section>

      <section aria-labelledby="stores-heading" className="mb-6">
        <SectionHeading id="stores-heading">Find us on the stores</SectionHeading>
        <ul className="space-y-3">
          <li>
            <a href={APPLE_DEVELOPER_URL} rel="noopener noreferrer" className={LINK}>
              J&amp;H Technology LLC on the App Store
            </a>
          </li>
          <li>
            <a href={PLAY_DEVELOPER_URL} rel="noopener noreferrer" className={LINK}>
              J&amp;H Technology on Google Play
            </a>
          </li>
        </ul>
      </section>
      <FactsChecked date={FACTS_CHECKED_AT} />
    </PageShell>
  );
}
