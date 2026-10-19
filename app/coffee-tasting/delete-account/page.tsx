import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalList, LegalP } from "@/components/legal";

const LAST_UPDATED = "October 18, 2026";
const EFFECTIVE_DATE = "October 18, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";
const DESCRIPTION =
  "How to delete your Coffee Tasting account and data, what is deleted, and how to ask us to delete crash reports.";

export const metadata: Metadata = {
  title: "Delete your account and data | Coffee Tasting | J&H Technology",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.jandhtechnology.com/coffee-tasting/delete-account" },
  openGraph: {
    title: "Delete your account and data | Coffee Tasting | J&H Technology",
    description: DESCRIPTION,
    url: "https://www.jandhtechnology.com/coffee-tasting/delete-account",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function CoffeeTastingDeleteAccountPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="Coffee Tasting"
            title="Delete your Coffee Tasting account and data"
            lastUpdated={LAST_UPDATED}
            effectiveDate={EFFECTIVE_DATE}
          />

          <LegalSection id="accounts" number="1" title="Accounts">
            <LegalP>
              The current version of Coffee Tasting, by J&amp;H Technology LLC, does not have user
              accounts. There is no account to delete, and your tastings are not stored on our
              servers. When accounts are added, this page and the app&rsquo;s Settings will let you
              delete your account and its data.
            </LegalP>
          </LegalSection>

          <LegalSection id="delete-in-app" number="2" title="Delete your data in the app">
            <LegalList>
              <li>Open Coffee Tasting and go to Settings.</li>
              <li>Tap Delete all my data, then confirm with Delete everything.</li>
            </LegalList>
            <LegalP>
              This permanently erases every tasting, coffee, note and setting on your device straight
              away. Uninstalling the app also removes all of its data.
            </LegalP>
          </LegalSection>

          <LegalSection id="crash-reports" number="3" title="Delete crash reports">
            <LegalP>
              If you turned on crash reports, anonymous crash data may be held by our crash reporting
              provider, Sentry. To have it deleted, email{" "}
              <a className={LINK} href="mailto:jarrod@jandhtechnology.com?subject=Coffee%20Tasting%20data%20deletion%20request">
                jarrod@jandhtechnology.com
              </a>{" "}
              with the subject &ldquo;Coffee Tasting data deletion request&rdquo;. We delete it within
              30 days and confirm by email. Crash reports are otherwise deleted at the end of our
              Sentry retention period.
            </LegalP>
          </LegalSection>

          <LegalSection id="more" number="4" title="More information">
            <LegalP>
              See the{" "}
              <a className={LINK} href="/coffee-tasting/privacy">
                Coffee Tasting privacy policy
              </a>{" "}
              or{" "}
              <a className={LINK} href="/coffee-tasting/support">
                support
              </a>
              .
            </LegalP>
          </LegalSection>
        </article>
      </main>
      <Footer />
    </>
  );
}
