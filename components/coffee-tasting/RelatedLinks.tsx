const PAGES = [
  { href: "/coffee-tasting/privacy", label: "Privacy Policy" },
  { href: "/coffee-tasting/terms", label: "Terms of Service" },
  { href: "/coffee-tasting/support", label: "Support" },
  { href: "/coffee-tasting/delete-account", label: "Delete Account" },
] as const;

export type CoffeeTastingPage = (typeof PAGES)[number]["href"];

export function CoffeeTastingRelatedLinks({ current }: { current: CoffeeTastingPage }) {
  return (
    <nav aria-label="Coffee Tasting pages" className="mt-16 pt-8 border-t border-white/[0.06]">
      <p className="text-xs uppercase tracking-[0.25em] text-indigo-400 mb-4">Coffee Tasting</p>
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
