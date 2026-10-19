# Accessibility report — jandhtechnology.com

Date: 2026-10-18. Target: WCAG 2.2 Level AA. Production build after commit `0c7c686`.

## Automated: axe-core on every page

- Tool: `@axe-core/playwright` 4.x, tags `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22a, wcag22aa, best-practice` (every impact level counted, including best practices).
- Scope: every URL in `sitemap.xml` (1,071) plus two 404 routes = **1,073 pages**, each at **375px and 1440px** = **2,146 scans**. That is every term page (1,012), every letter, category and guide page, and all legacy pages (home, privacy, terms, coffee-tasting ×4, accessibility).
- Runner: `uat-scripts/ada-scan.ts`, sharded 6 ways in GitHub Actions (`.github/workflows/accessibility.yml`, run 39187114558) because the local machine was saturated by other workloads.
- **Result: 1,073/1,073 pages scanned, 0 violations of any impact, 0 scan errors.** Raw: `axe-full-site-production.json`.
- First pass (run 39185241845) found 12 violations on 4 pages: contrast on legal-page footers (`#666`) and the home "Process" numbers (indigo at 20% opacity), plus the default 404 page lacking a main landmark/skip target. All fixed at the component level.

## Manual checks per template

Driven with Playwright by `uat-scripts/ada-manual-checks.ts` (raw: `manual-checks.json`), 18 templates.

- **Keyboard:** Tab from the top of the page. The skip link is always the first stop, and Enter moves focus to `main`. A full home-page trace runs skip link → header → hero → apps → contact form fields → Send → footer links, then exits the page, so there is no trap and the order is logical. No positive `tabindex`.
- **Search box and letter nav:** searchable with the keyboard alone. Typing filters names, Tab moves into the results, and each letter is a ≥44px link. The result count is a `role="status"` `aria-live="polite"` region (Playwright-verified).
- **Mobile menu:** a real `<button>` with `aria-expanded` and `aria-controls`; Escape closes it (Playwright-verified).
- **Focus visible:** a global `:focus-visible` 3px outline (`#c7d2fe`) with a 3px offset. It is 3px or wider on every stop of every template, with minimum contrast 11.7:1 against the page background.
- **Target size (2.5.8):** axe `target-size` passes everywhere. Nav, footer, breadcrumb, badge and pill links are at least 24px tall (most 32–44px).
- **Reflow and zoom:** no horizontal overflow at 320px (400% equivalent), at a 720px viewport (200% zoom), or with root font size set to 200%, on all templates. `/terms` overflowed by 91px from a long URL; a global `main { overflow-wrap: anywhere }` fixed it.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, every animation lasts ≤0.01ms and smooth scroll is off.
- **Contrast:** text ≥4.5:1 and UI ≥3:1 per axe `color-contrast` (0 failures). Low greys were raised site-wide.
- **Structure:** exactly one `h1` per page, no skipped heading levels, one `banner`, one `main`, one `contentinfo`, and labelled `nav`s (Main, Footer, Breadcrumb, section and letter navs).
- **Links:** no vague link text ("click here", "read more"). Every App Store badge is an `<img alt="Download Slang Decoder on the App Store">` inside a link.
- **Language and titles:** `lang="en"` everywhere, and every page has a unique `<title>`, including a descriptive "Page not found" on 404s.
- **Contact form:** visible `<label for>` on every field, `autocomplete` name/email, the required state stated in text, and errors in `role="alert"`. Success moves focus to the result heading. The submit gesture is driven in Playwright.

| Template | Result |
|---|---|
| Home (`/`) | 23 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.01ms; PASS |
| Legal (privacy) (`/privacy`) | 21 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Legal (terms) (`/terms`) | 19 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Coffee Tasting support (`/coffee-tasting/support`) | 15 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Coffee Tasting delete account (`/coffee-tasting/delete-account`) | 16 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Accessibility statement (`/accessibility`) | 15 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Slang index (`/slang`) | 87 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Term page (`/slang/rizz`) | 33 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Term page (parent alert) (`/slang/kys`) | 34 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Letter page (`/slang/letter/s`) | 167 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Category page (`/slang/category/gaming`) | 240 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Category glossary (`/slang/glossary-categories`) | 40 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Content page (FAQ) (`/slang/faq`) | 37 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Content page (safety guide) (`/slang/safety-guide`) | 85 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Generation page (`/slang/gen-alpha`) | 42 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| Trending list (`/slang/trending`) | 88 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| New this month (`/slang/new-this-month`) | 52 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |
| 404 (`/no-such-page`) | 15 tab stops after skip; focus ring 11.70:1; h1=1; reflow/zoom overflow 0/0/0px; reduced-motion max 0.00ms; PASS |

## Screen readers: honest limits

- Automated tools catch only about 30–50% of accessibility issues. The checks above narrow the gap, but they do not replace people.
- **VoiceOver was not driven.** "Allow VoiceOver to be controlled with AppleScript" is off on this Mac, and turning VoiceOver on would take over speech and keyboard on a machine shared with other running jobs. As a proxy, the Chromium accessibility trees for a term page and the FAQ are saved in `aria-snapshot-term-rizz.yml` and `aria-snapshot-faq.yml`. They show the landmark, heading, definition-list and link names a screen reader receives.
- **Recommended:** a human pass with VoiceOver (macOS and iOS Safari) and NVDA (Firefox and Chrome) on `/slang/rizz`, `/slang/faq`, `/slang` (search) and the home contact form.
