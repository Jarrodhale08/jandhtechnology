import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalList, LegalP, LegalSection } from "@/components/legal";

const LAST_UPDATED = "October 18, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";
const TITLE = "Accessibility Statement | J&H Technology";
const DESCRIPTION =
  "J&H Technology's accessibility statement for jandhtechnology.com: our WCAG 2.2 AA target, how we test, known limitations, and how to report a barrier.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.jandhtechnology.com/accessibility" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.jandhtechnology.com/accessibility",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="J&H Technology"
            title="Accessibility Statement"
            lastUpdated={LAST_UPDATED}
            effectiveDate={LAST_UPDATED}
          />

          <LegalSection id="commitment" number="1" title="Our commitment">
            <LegalP>
              J&H Technology LLC wants everyone to be able to use jandhtechnology.com, including the
              Slang Decoder slang index. Our target is conformance with the Web Content Accessibility
              Guidelines (WCAG) 2.2 at Level AA.
            </LegalP>
          </LegalSection>

          <LegalSection id="measures" number="2" title="What we do">
            <LegalList>
              <li>Semantic HTML with landmarks, one main heading per page, and a skip-to-content link.</li>
              <li>Keyboard access to every link, menu, and form, with a visible focus outline.</li>
              <li>Text and controls that meet WCAG color-contrast minimums.</li>
              <li>Touch targets of at least 24 by 24 pixels.</li>
              <li>Layouts that reflow at 320 pixels wide and support 200% text zoom.</li>
              <li>Animations that stop when your device asks for reduced motion.</li>
              <li>Form fields with visible labels and error messages that are announced to screen readers.</li>
            </LegalList>
          </LegalSection>

          <LegalSection id="testing" number="3" title="How we test">
            <LegalP>
              We run automated axe-core checks against every page of the site at mobile and desktop
              widths, and we check keyboard navigation, zoom, reflow, and reduced motion by hand.
              Automated tools find only part of the accessibility issues that real people run into, so
              we also welcome reports from people who use screen readers, magnifiers, voice control, or
              other assistive technology.
            </LegalP>
          </LegalSection>

          <LegalSection id="limitations" number="4" title="Known limitations">
            <LegalP>
              The Download on the App Store badge is Apple&apos;s official artwork and links to the App
              Store, which is outside our control. A full manual screen-reader review with VoiceOver and
              NVDA has not yet been completed. If you find a barrier, please tell us.
            </LegalP>
          </LegalSection>

          <LegalSection id="contact" number="5" title="Report a barrier">
            <LegalP>
              Email{" "}
              <a href="mailto:jarrod@jandhtechnology.com?subject=Accessibility" className={LINK}>
                jarrod@jandhtechnology.com
              </a>{" "}
              with the page address and what went wrong. We aim to reply within 3 business days. You can
              also use the <Link href="/#contact" className={LINK}>contact form</Link>.
            </LegalP>
          </LegalSection>
        </article>
      </main>
      <Footer />
    </>
  );
}
