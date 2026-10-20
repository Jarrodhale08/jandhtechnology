import Link from "next/link";
import { AppStoreBadge } from "@/components/slang/ui";

const FOOTER_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#apps", label: "Apps" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
  { href: "/slang", label: "Slang Dictionary" },
  { href: "/slang/faq", label: "Slang Decoder FAQ" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/support", label: "Support" },
];

const LINK = "inline-flex min-h-6 items-center hover:text-white underline-offset-2 hover:underline transition-colors";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <section
          aria-labelledby="footer-app-heading"
          className="mb-10 flex flex-col gap-4 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h2 id="footer-app-heading" className="text-lg font-semibold text-white">
              Get Slang Decoder
            </h2>
            <p className="mt-1 text-sm text-[#d4d4dc] max-w-xl">
              Understand Gen Z and Gen Alpha slang on your iPhone. Free to download, with an optional
              Premium subscription.
            </p>
          </div>
          <AppStoreBadge className="shrink-0" />
        </section>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2 min-h-11">
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm"
            >
              J
            </span>
            <span className="font-semibold text-white">J&H Technology LLC</span>
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#c4c4cc]">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={LINK}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm text-[#c4c4cc]">
            <a href="mailto:jarrod@jandhtechnology.com" className={LINK}>
              jarrod@jandhtechnology.com
            </a>
          </div>
        </div>

        <p className="mt-8 pt-8 border-t border-white/[0.06] text-center text-sm text-[#a4a4ae]">
          Copyright &copy; {new Date().getFullYear()} J&H Technology LLC — All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
