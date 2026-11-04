import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalList, LegalP } from "@/components/legal";
import { CoffeeTastingRelatedLinks } from "@/components/coffee-tasting/RelatedLinks";

const LAST_UPDATED = "November 4, 2026";
const EFFECTIVE_DATE = "November 4, 2026";
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

          <LegalSection id="delete-account" number="1" title="Delete your account in the app">
            <LegalList>
              <li>Open Coffee Tasting and go to Settings, then Account.</li>
              <li>Tap Delete account and confirm.</li>
            </LegalList>
            <LegalP>
              This permanently deletes your account and the data we hold for it straight away: your backup
              (if you turned it on), the group sessions you led and everything in them, your entries in sessions
              you joined, your blocks, and your sign-in. If you signed in with Apple, we also ask Apple to revoke
              the sign-in. Reports you filed are kept without your identity until reviewed, then deleted after 30
              days. The data on your phone is removed too.
            </LegalP>
            <LegalP>
              Deleting your account does not cancel a subscription. Cancel it first in your App Store or Google
              Play account settings.
            </LegalP>
          </LegalSection>

          <LegalSection id="no-app" number="2" title="If you can't use the app">
            <LegalP>
              Email{" "}
              <a className={LINK} href="mailto:jarrod@jandhtechnology.com?subject=Coffee%20Tasting%20account%20deletion%20request">
                jarrod@jandhtechnology.com
              </a>{" "}
              from the email address on your account, with the subject &ldquo;Coffee Tasting account deletion
              request&rdquo;. We confirm it is you by replying to that address, delete the account within 30
              days, and confirm by email. If you signed in with Apple using a private relay address, delete the
              account in the app instead, or tell us the relay address shown in Settings.
            </LegalP>
          </LegalSection>

          <LegalSection id="delete-data-only" number="3" title="Delete only the data on your device">
            <LegalList>
              <li>Open Settings and tap Delete all my data, then confirm with Delete everything.</li>
            </LegalList>
            <LegalP>
              This erases every tasting, coffee, note and setting on your device. If you are signed in it also
              deletes your account and its data, so that nothing is left behind. Uninstalling the app removes
              the data on the device only.
            </LegalP>
          </LegalSection>

          <LegalSection id="crash-reports" number="4" title="Delete crash reports">
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

          <LegalSection id="more" number="5" title="More information">
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
