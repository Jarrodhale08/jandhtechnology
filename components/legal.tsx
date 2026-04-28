import type { ReactNode } from "react";

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 pt-10 mt-10 border-t border-white/[0.06]">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
        <span className="text-indigo-400 mr-3 font-mono text-xl md:text-2xl">{number}.</span>
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function LegalSubSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-base md:text-lg font-semibold text-white">
        <span className="text-indigo-400/70 mr-2 font-mono">{number}</span>
        {title}
      </h3>
      <div className="space-y-3 text-[#c8c8d0] leading-relaxed">{children}</div>
    </div>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return (
    <ul className="space-y-2 list-disc list-outside pl-6 marker:text-indigo-400/60 text-[#c8c8d0]">
      {children}
    </ul>
  );
}

export function LegalP({
  children,
  emphasis,
}: {
  children: ReactNode;
  emphasis?: boolean;
}) {
  if (emphasis) {
    return <p className="font-semibold text-white leading-relaxed">{children}</p>;
  }
  return <p className="text-[#c8c8d0] leading-relaxed">{children}</p>;
}

export function LegalHeader({
  eyebrow,
  title,
  lastUpdated,
  effectiveDate,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  effectiveDate: string;
}) {
  return (
    <header className="mb-12">
      <p className="text-xs uppercase tracking-[0.25em] text-indigo-400 mb-4">{eyebrow}</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{title}</h1>
      <div className="flex flex-col sm:flex-row gap-x-8 gap-y-1 text-sm text-[#888]">
        <span>
          <span className="text-[#666]">Last Updated:</span>{" "}
          <span className="text-[#c8c8d0]">{lastUpdated}</span>
        </span>
        <span>
          <span className="text-[#666]">Effective Date:</span>{" "}
          <span className="text-[#c8c8d0]">{effectiveDate}</span>
        </span>
      </div>
    </header>
  );
}
