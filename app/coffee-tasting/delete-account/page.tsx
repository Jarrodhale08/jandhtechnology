import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalList, LegalP } from "@/components/legal";
import { CoffeeTastingRelatedLinks } from "@/components/coffee-tasting/RelatedLinks";

const LAST_UPDATED = "October 26, 2026";
const EFFECTIVE_DATE = "October 26, 2026";
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
              Coffee Tasting, by J&amp;H Technology LLC, has no sign-up, and your tastings are not
              stored on our servers. The app creates an anonymous account on first launch so it
              can check your Premium status. It holds only a random identifier and, if you
              subscribe, your subscription record (plan, status, and period end). Deleting your
              data in the app deletes that account and record. Pseudonymous purchase event logs
              (transaction identifiers, no personal information) are kept for refund and fraud
              handling, and the next time you open the app it creates a fresh anonymous account.
            </LegalP>
          </LegalSection>

          <LegalSection id="delete-in-app" number="2" title="Delete your data in the app">
            <LegalList>
              <li>Open Coffee Tasting and go to Settings.</li>
              <li>Tap Delete all my data, then confirm with Delete everything.</li>
            </LegalList>
            <LegalP>
              This permanently erases every tasting, coffee, note and setting on your device straight
              away, and deletes your anonymous account and purchase records from our server. If the
              app cannot reach the server, your device data is still erased and the app asks you to
              try again from Settings. If you use Premium on more than one device, the shared
              subscription record stays on our server until every device using it has deleted its
              data. Uninstalling the app removes your tastings, coffees, notes and settings from the
              device. On iPhone and iPad, the anonymous sign-in and the saved Premium status are kept
              in the device keychain and can survive an uninstall; use Delete all my data first to
              remove them.
            </LegalP>
            <LegalP>
              Deleting your data does not cancel a subscription. Cancel it first in your App Store
              or Google Play subscription settings, otherwise the store keeps billing you.
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
          <CoffeeTastingRelatedLinks current="/coffee-tasting/delete-account" />
        </article>
      </main>
      <Footer />
    </>
  );
}
