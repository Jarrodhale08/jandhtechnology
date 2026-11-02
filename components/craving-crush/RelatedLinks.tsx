const PAGES = [
  { href: "/craving-crush/privacy", label: "Privacy Policy" },
  { href: "/craving-crush/terms", label: "Terms of Service" },
  { href: "/craving-crush/support", label: "Support" },
  { href: "/craving-crush/delete-account", label: "Delete Account" },
] as const;

export type CravingCrushPage = (typeof PAGES)[number]["href"];

export function CravingCrushRelatedLinks({ current }: { current: CravingCrushPage }) {
  return (
    <nav aria-label="Craving Crush pages" className="mt-16 pt-8 border-t border-white/[0.06]">
      <p className="text-xs uppercase tracking-[0.25em] text-indigo-400 mb-4">Craving Crush</p>
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {PAGES.map(({ href, label }) =>
          href === current ? (
            <li key={href}>
              <a href={href} aria-current="page" className="inline-block py-2 text-white font-semibold">
                {label}
              </a>
            </li>
          ) : (
            <li key={href}>
              <a
                href={href}
                className="inline-block py-2 text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
              >
                {label}
              </a>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
