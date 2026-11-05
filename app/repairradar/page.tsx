import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/slang/ui";
import { AppHeader, MoreApps, QuickFacts, appBreadcrumbs, appPageMetadata } from "@/components/apps/AppPage";
import { AnswerSummary, FactsChecked, FaqList, FeatureGroups, LINK, OfficialLinks, PageShell, SectionHeading } from "@/components/apps/ui";
import { FACTS_CHECKED_AT, getApp, pageUrl } from "@/lib/apps";
import { mobileAppJsonLd } from "@/lib/apps-jsonld";
import { GUIDES, PLANS, REPAIRRADAR_FAQ, TRIAL_DAYS, formatPrice, guidePath, yearlySavingsPercent } from "@/lib/repairradar";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/slang-jsonld";
import { plainText } from "@/lib/slang-pages";

export const metadata = appPageMetadata("repairradar");

function Plans() {
  return (
    <section aria-labelledby="plans-heading" className="mb-14">
      <SectionHeading id="plans-heading">Plans and pricing</SectionHeading>
      <p className="text-[#d4d4dc] leading-relaxed mb-6 max-w-3xl">
        RepairRadar is free to download. Every paid plan has a {TRIAL_DAYS}-day free trial for eligible new subscribers
        and is billed monthly or yearly through your Apple Account.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {PLANS.map((plan) => {
          const savings = yearlySavingsPercent(plan);
          return (
            <li
              key={plan.id}
              className={`flex flex-col rounded-2xl border p-5 ${
                plan.id === "pro" ? "border-indigo-300/60 bg-indigo-500/10" : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <p className="text-sm text-[#c4c4cc] mb-4">{plan.description}</p>
              {plan.monthly === null || plan.yearly === null ? (
                <p className="mb-4">
                  <span className="text-3xl font-bold text-white tabular-nums">$0</span>
                </p>
              ) : (
                <div className="mb-4">
                  <p>
                    <span className="text-3xl font-bold text-white tabular-nums">{formatPrice(plan.monthly)}</span>
                    <span className="text-[#c4c4cc]"> / month</span>
                  </p>
                  <p className="text-sm text-[#d4d4dc] tabular-nums">
                    or {formatPrice(plan.yearly)} / year{savings ? ` (save about ${savings}%)` : ""}
                  </p>
                </div>
              )}
              <ul className="space-y-2 pl-5 list-disc marker:text-indigo-300 text-[#d4d4dc] text-sm leading-relaxed">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-sm text-[#b4b4be] leading-relaxed max-w-3xl">
        Prices are in US dollars; the App Store shows the price in your currency before you confirm. Subscriptions
        renew automatically unless canceled at least 24 hours before the end of the current period. Manage or cancel
        them in your Apple Account settings.
      </p>
    </section>
  );
}

function Guides() {
  return (
    <section aria-labelledby="guides-heading" className="mb-14">
      <SectionHeading id="guides-heading">Home maintenance guides</SectionHeading>
      <ul className="grid gap-4 sm:grid-cols-2">
        {GUIDES.map((g) => (
          <li key={g.slug} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-lg font-semibold text-white mb-2">
              <Link href={guidePath(g.slug)} className="hover:text-indigo-200 underline-offset-2 hover:underline">
                {g.title}
              </Link>
            </h3>
            <p className="text-sm text-[#c4c4cc] leading-relaxed">{g.description}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link href="/repairradar/guides" className={LINK}>
          All RepairRadar guides
        </Link>
      </p>
    </section>
  );
}

export default function RepairRadarPage() {
  const app = getApp("repairradar");
  return (
    <PageShell>
      <JsonLd
        data={[
          mobileAppJsonLd(app),
          breadcrumbJsonLd(appBreadcrumbs(app)),
          faqPageJsonLd(
            REPAIRRADAR_FAQ.map((f) => ({ question: f.question, answer: plainText(f.answer) })),
            pageUrl(app),
          ),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Apps", href: "/apps" }, { name: app.name }]} />
      <AppHeader app={app} />
      <AnswerSummary label="What is RepairRadar?">
        <p>{app.summary}</p>
      </AnswerSummary>
      <FeatureGroups groups={app.features} title="What RepairRadar does" />
      <Plans />
      <Guides />
      <QuickFacts app={app} />
      <OfficialLinks app={app} />
      <FaqList items={REPAIRRADAR_FAQ} title="RepairRadar FAQ" />
      <MoreApps current={app.slug} />
      <FactsChecked date={FACTS_CHECKED_AT} />
    </PageShell>
  );
}
