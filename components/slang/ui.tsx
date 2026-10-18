import Link from "next/link";
import type { ReactNode } from "react";
import { generationLabel, safetyLabel, type SafetyLevel, type SlangTerm } from "@/lib/slang-core";
import { APP_NAME, APP_STORE_URL } from "@/lib/slang";

export const SLANG_LINK =
  "text-indigo-300 hover:text-indigo-200 underline underline-offset-2 decoration-indigo-300/60";
const PILL =
  "inline-flex items-center min-h-6 text-xs px-2.5 py-1 rounded-full border font-medium";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#b4b4be]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2 min-w-0">
            {i > 0 && <span aria-hidden="true" className="text-white/40">/</span>}
            {item.href ? (
              <Link href={item.href} className="inline-flex min-h-6 items-center underline-offset-2 hover:text-white hover:underline">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-[#d4d4dc] break-words">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SlangHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="mb-10">
      <p className="text-xs uppercase tracking-[0.25em] text-indigo-300 mb-4">{eyebrow}</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight break-words">{title}</h1>
      {children}
    </header>
  );
}

const SAFETY_STYLES: Record<SafetyLevel, string> = {
  safe: "bg-emerald-500/10 border-emerald-400/40 text-emerald-200",
  edgy: "bg-amber-500/10 border-amber-400/40 text-amber-200",
  inappropriate: "bg-rose-500/10 border-rose-400/40 text-rose-200",
};

export function SafetyBadge({ safety, prefix = true }: { safety: SafetyLevel; prefix?: boolean }) {
  return (
    <span className={`${PILL} ${SAFETY_STYLES[safety]}`}>
      {prefix && <span className="sr-only">Safety rating: </span>}
      {safetyLabel(safety)}
    </span>
  );
}

export function GenerationBadge({ term, prefix = true }: { term: SlangTerm; prefix?: boolean }) {
  return (
    <span className={`${PILL} bg-white/5 border-white/20 text-[#d4d4dc]`}>
      {prefix && <span className="sr-only">Generation: </span>}
      {generationLabel(term.generation)}
    </span>
  );
}

export function TermList({ terms, showBadges = true }: { terms: SlangTerm[]; showBadges?: boolean }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {terms.map((t) => (
        <li
          key={t.slug}
          className="flex flex-wrap items-center gap-2 rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3"
        >
          <Link
            href={`/slang/${t.slug}`}
            prefetch={false}
            className="font-semibold text-white underline-offset-2 hover:text-indigo-200 hover:underline break-words min-h-6 inline-flex items-center"
          >
            {t.term}
          </Link>
          {showBadges && (
            <span className="flex flex-wrap gap-1.5">
              <GenerationBadge term={t} />
              <SafetyBadge safety={t.safety} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function TermNameList({ terms }: { terms: SlangTerm[] }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1">
      {terms.map((t) => (
        <li key={t.slug} data-slang-term={t.term.toLowerCase()} className="min-w-0">
          <Link
            href={`/slang/${t.slug}`}
            prefetch={false}
            className="inline-flex min-h-8 items-center break-words text-[#e2e2e8] underline-offset-2 hover:text-white hover:underline"
          >
            {t.term}
          </Link>
          {t.safety !== "safe" && (
            <span className="ml-2 align-middle">
              <SafetyBadge safety={t.safety} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function AppStoreBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={APP_STORE_URL}
      className={`inline-flex rounded-lg focus-visible:outline-offset-4 ${className}`}
      rel="noopener noreferrer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Apple's official badge SVG must not be re-encoded */}
      <img
        src="/app-store-badge.svg"
        alt={`Download ${APP_NAME} on the App Store`}
        width={160}
        height={53}
        className="h-[53px] w-auto"
      />
    </a>
  );
}

export function AppStoreCta({
  heading = `Look up any slang term in ${APP_NAME}`,
  id = "app-cta-heading",
  children,
}: {
  heading?: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <aside
      aria-labelledby={id}
      className="mt-16 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-indigo-500/15 to-purple-600/15 border border-indigo-400/30"
    >
      <h2 id={id} className="text-2xl font-semibold text-white mb-3 break-words">
        {heading}
      </h2>
      {children ?? (
        <p className="text-[#d4d4dc] leading-relaxed mb-6 max-w-2xl">
          {APP_NAME} for iPhone explains 1,000+ Gen Z and Gen Alpha slang terms with a plain-English
          meaning, a real example, and a parent safety rating. Free to download, with an optional
          Premium subscription ($2.99/month or $19.99/year, 7-day free trial).
        </p>
      )}
      <AppStoreBadge />
    </aside>
  );
}

export function LockedMeaning({ term }: { term: string }) {
  return (
    <section
      aria-labelledby="meaning-heading"
      className="relative overflow-hidden rounded-2xl border border-indigo-400/30 bg-white/[0.03] p-6 md:p-8"
    >
      <h2 id="meaning-heading" className="text-sm uppercase tracking-wider text-indigo-300 mb-4">
        Meaning and example
      </h2>
      <div aria-hidden="true" className="space-y-3 mb-6 select-none">
        <div className="h-4 w-11/12 rounded bg-white/10" />
        <div className="h-4 w-9/12 rounded bg-white/10" />
        <div className="h-4 w-10/12 rounded bg-white/10" />
        <div className="h-4 w-6/12 rounded bg-white/10" />
      </div>
      <p className="text-lg text-white font-semibold mb-2 break-words">
        See what “{term}” means in {APP_NAME}
      </p>
      <p className="text-[#d4d4dc] leading-relaxed mb-6 max-w-2xl">
        The meaning, a real example sentence, and a parent note for {term} are in the {APP_NAME} app
        for iPhone. Free to download, with an optional Premium subscription.
      </p>
      <AppStoreBadge />
    </section>
  );
}

export const SLANG_SECTIONS = [
  { href: "/slang", label: "A–Z index" },
  { href: "/slang/gen-alpha", label: "Gen Alpha" },
  { href: "/slang/for-parents", label: "For parents" },
];

export function SlangSubnav({ current }: { current?: string }) {
  return (
    <nav aria-label="Slang dictionary sections" className="mb-10">
      <ul className="flex flex-wrap gap-2">
        {SLANG_SECTIONS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={current === l.href ? "page" : undefined}
              className="inline-flex min-h-8 items-center text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/20 text-[#d4d4dc] hover:text-white hover:border-indigo-400/60 aria-[current=page]:bg-indigo-500/20 aria-[current=page]:text-white aria-[current=page]:border-indigo-300"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
