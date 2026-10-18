import Link from "next/link";
import type { ReactNode } from "react";
import {
  generationLabel,
  safetyLabel,
  truncate,
  type SafetyLevel,
  type SlangTerm,
} from "@/lib/slang-core";
import { APP_NAME, APP_STORE_URL } from "@/lib/slang";

export const SLANG_LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#ababab]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2 min-w-0">
            {i > 0 && <span aria-hidden="true" className="text-white/20">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-white transition-colors">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-[#c8c8d0] break-words">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SlangHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10">
      <p className="text-xs uppercase tracking-[0.25em] text-indigo-400 mb-4">{eyebrow}</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight break-words">
        {title}
      </h1>
      {children}
    </header>
  );
}

const SAFETY_STYLES: Record<SafetyLevel, string> = {
  safe: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  edgy: "bg-amber-500/10 border-amber-500/30 text-amber-300",
  inappropriate: "bg-rose-500/10 border-rose-500/30 text-rose-300",
};

export function SafetyBadge({ safety }: { safety: SafetyLevel }) {
  return (
    <span
      className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full border font-medium ${SAFETY_STYLES[safety]}`}
    >
      {safetyLabel(safety)}
    </span>
  );
}

export function GenerationBadge({ term }: { term: SlangTerm }) {
  return (
    <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#ababab]">
      {generationLabel(term.generation)}
    </span>
  );
}

export function TermList({ terms, showBadges = true }: { terms: SlangTerm[]; showBadges?: boolean }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {terms.map((t) => (
        <div
          key={t.slug}
          data-slang-term={t.term.toLowerCase()}
          className="rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 p-4 transition-colors"
        >
          <dt className="flex flex-wrap items-center gap-2 mb-1">
            <Link href={`/slang/${t.slug}`} prefetch={false} className="font-semibold text-white hover:text-indigo-200 underline-offset-2 hover:underline break-words">
              {t.term}
            </Link>
            {showBadges && t.safety !== "safe" && <SafetyBadge safety={t.safety} />}
          </dt>
          <dd className="text-sm text-[#c8c8d0] leading-relaxed">{truncate(t.definition, 140)}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CompactTermList({ terms }: { terms: SlangTerm[] }) {
  return (
    <dl className="grid gap-x-8 sm:grid-cols-2 [&>div]:py-3 [&>div]:border-b [&>div]:border-white/[0.06] [&_dt]:font-semibold [&_dt]:break-words [&_dt_a]:text-white [&_dt_a:hover]:text-indigo-200 [&_dt_a:hover]:underline [&_dd]:mt-1 [&_dd]:text-sm [&_dd]:text-[#c8c8d0] [&_dd]:leading-relaxed">
      {terms.map((t) => (
        <div key={t.slug} data-slang-term={t.term.toLowerCase()}>
          <dt>
            <Link href={`/slang/${t.slug}`} prefetch={false}>{t.term}</Link>
          </dt>
          <dd>{truncate(t.definition, 100)}</dd>
        </div>
      ))}
    </dl>
  );
}

export function AppStoreCta({ heading = `Decode slang on the go with ${APP_NAME}` }: { heading?: string }) {
  return (
    <aside
      aria-labelledby="app-cta-heading"
      className="mt-16 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-indigo-500/15 to-purple-600/15 border border-indigo-500/20"
    >
      <h2 id="app-cta-heading" className="text-2xl font-semibold text-white mb-3">
        {heading}
      </h2>
      <p className="text-[#c8c8d0] leading-relaxed mb-6 max-w-2xl">
        {APP_NAME} is a free iPhone app with 1,000+ Gen Z and Gen Alpha slang terms, flashcards,
        quizzes, and a parent safety rating on every word.
      </p>
      <a
        href={APP_STORE_URL}
        className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
      >
        Download {APP_NAME} on the App Store
      </a>
    </aside>
  );
}

export function SlangSubnav() {
  const links = [
    { href: "/slang", label: "A–Z dictionary" },
    { href: "/slang/gen-alpha", label: "Gen Alpha slang" },
    { href: "/slang/for-parents", label: "For parents" },
  ];
  return (
    <nav aria-label="Slang dictionary sections" className="mb-10">
      <ul className="flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-flex text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#c8c8d0] hover:text-white hover:border-indigo-500/40 transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
