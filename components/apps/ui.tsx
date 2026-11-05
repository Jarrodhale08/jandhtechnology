import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SLANG_LINK } from "@/components/slang/ui";
import {
  appStoreUrl,
  officialLinks,
  platformSummary,
  playUrl,
  type FeatureGroup,
  type LinkKind,
  type PortfolioApp,
} from "@/lib/apps";
import { splitLinks } from "@/lib/slang-pages";

export const LINK = SLANG_LINK;
const EXTERNAL_REL = "noopener noreferrer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function RichText({ text }: { text: string }) {
  return (
    <>
      {splitLinks(text).map((part, i) =>
        "text" in part ? (
          part.text
        ) : part.href.startsWith("/") ? (
          <Link key={i} href={part.href} className={LINK}>
            {part.label}
          </Link>
        ) : (
          <a key={i} href={part.href} className={LINK} rel={EXTERNAL_REL}>
            {part.label}
          </a>
        ),
      )}
    </>
  );
}

export function AppIcon({ app, size = 64, className = "" }: { app: PortfolioApp; size?: number; className?: string }) {
  return (
    <Image
      src={`/apps/${app.slug}.png`}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 rounded-[22%] border border-white/10 ${className}`}
    />
  );
}

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-2xl md:text-3xl font-semibold text-white mb-5 tracking-tight">
      {children}
    </h2>
  );
}

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" | "amber" }) {
  const tones = {
    neutral: "bg-white/5 border-white/20 text-[#d4d4dc]",
    accent: "bg-indigo-500/15 border-indigo-300/40 text-indigo-100",
    amber: "bg-amber-500/10 border-amber-300/40 text-amber-100",
  };
  return (
    <span className={`inline-flex items-center min-h-6 text-xs px-2.5 py-1 rounded-full border font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function StoreBadges({ app }: { app: PortfolioApp }) {
  const ios = appStoreUrl(app);
  const android = playUrl(app);
  return (
    <div className="flex flex-wrap items-center gap-3">
      {ios && (
        <a href={ios} rel={EXTERNAL_REL} className="inline-flex rounded-lg focus-visible:outline-offset-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- Apple's official badge SVG must not be re-encoded */}
          <img
            src="/app-store-badge.svg"
            alt={`Download ${app.name} on the App Store`}
            width={160}
            height={53}
            className="h-[53px] w-auto"
          />
        </a>
      )}
      {android && (
        <a href={android} rel={EXTERNAL_REL} className="inline-flex rounded-lg focus-visible:outline-offset-4">
          <Image
            src="/google-play-badge.png"
            alt={`Get ${app.name} on Google Play`}
            width={178}
            height={53}
            className="h-[53px] w-auto"
          />
        </a>
      )}
      {app.iosStatus === "in-review" && <Pill tone="amber">iPhone: in App Review</Pill>}
      {app.androidStatus === "coming-soon" && <Pill tone="amber">Android coming soon</Pill>}
    </div>
  );
}

const KIND_LABEL: Record<LinkKind, string> = {
  "app-store": "App Store",
  "google-play": "Google Play",
  website: "Website",
  "web-app": "Web app",
  hub: "On this site",
  privacy: "Privacy",
  terms: "Terms",
  support: "Support",
  "delete-account": "Account",
};

export function OfficialLinks({ app, headingId = "official-links-heading" }: { app: PortfolioApp; headingId?: string }) {
  return (
    <section aria-labelledby={headingId} className="mb-14">
      <SectionHeading id={headingId}>Official {app.name} links</SectionHeading>
      <ul className="grid gap-2 sm:grid-cols-2">
        {officialLinks(app).map((l) => {
          const internal = l.url.startsWith("https://www.jandhtechnology.com/");
          const href = internal ? l.url.replace("https://www.jandhtechnology.com", "") : l.url;
          return (
            <li key={l.url} className="rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 min-w-0">
              <span className="block text-xs uppercase tracking-wider text-[#a4a4ae] mb-1">{KIND_LABEL[l.kind]}</span>
              {internal ? (
                <Link href={href} className={`${LINK} break-words`}>
                  {l.label}
                </Link>
              ) : (
                <a href={href} rel={EXTERNAL_REL} className={`${LINK} break-words`}>
                  {l.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function FeatureGroups({ groups, headingId = "features-heading", title }: { groups: FeatureGroup[]; headingId?: string; title: string }) {
  return (
    <section aria-labelledby={headingId} className="mb-14">
      <SectionHeading id={headingId}>{title}</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.heading} className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
            <h3 className="text-lg font-semibold text-white mb-3">{g.heading}</h3>
            <ul className="space-y-2 pl-5 list-disc marker:text-indigo-300 text-[#d4d4dc] leading-relaxed">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FaqList({ items, headingId = "faq-heading", title = "Frequently asked questions" }: { items: { question: string; answer: string }[]; headingId?: string; title?: string }) {
  return (
    <section aria-labelledby={headingId} className="mb-14">
      <SectionHeading id={headingId}>{title}</SectionHeading>
      <dl className="space-y-6 max-w-3xl">
        {items.map((f) => (
          <div key={f.question}>
            <dt className="font-semibold text-white mb-1">{f.question}</dt>
            <dd className="text-[#d4d4dc] leading-relaxed">
              <RichText text={f.answer} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function AnswerSummary({ label = "In short", children }: { label?: string; children: ReactNode }) {
  return (
    <div className="mb-10 rounded-2xl border-l-4 border-indigo-400 bg-indigo-500/10 px-5 py-4 md:px-6 md:py-5">
      <p className="text-xs uppercase tracking-[0.2em] text-indigo-200 mb-2 font-semibold">{label}</p>
      <div className="text-[#e2e2e8] leading-relaxed text-base md:text-lg">{children}</div>
    </div>
  );
}

export function AppCard({ app, headingLevel = "h2" }: { app: PortfolioApp; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <li className="card-hover relative flex flex-col rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-400/50 p-5">
      <div className="flex items-start gap-4 mb-3">
        <AppIcon app={app} size={56} />
        <div className="min-w-0">
          <Heading className="text-lg font-semibold text-white leading-snug">
            <Link href={app.path} className="after:absolute after:inset-0 after:rounded-2xl hover:text-indigo-200">
              {app.name}
            </Link>
          </Heading>
          <p className="text-sm text-indigo-300 font-medium">{app.category}</p>
        </div>
      </div>
      <p className="text-[#c4c4cc] text-sm leading-relaxed mb-4 flex-1">{app.tagline}.</p>
      <p className="text-xs text-[#b4b4be]">
        <span className="sr-only">Platforms: </span>
        {platformSummary(app)}
      </p>
    </li>
  );
}

export function FactsChecked({ date }: { date: string }) {
  const formatted = new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <p className="mt-10 text-sm text-[#a4a4ae]">
      Details checked against the store listings on <time dateTime={date}>{formatted}</time>.
    </p>
  );
}
