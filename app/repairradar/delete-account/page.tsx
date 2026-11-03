import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalList, LegalP } from "@/components/legal";

const LAST_UPDATED = "November 2, 2026";
const EFFECTIVE_DATE = "November 2, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";
const EMAIL = "jarrod@jandhtechnology.com";
const URL = "https://www.jandhtechnology.com/repairradar/delete-account";
const TITLE = "Delete your account and data | RepairRadar | J&H Technology";
const DESCRIPTION =
  "How to delete your RepairRadar account and data, by J&H Technology: in-app steps, what is deleted, the email option, and timelines.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function RepairRadarDeleteAccountPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="RepairRadar by J&H Technology"
            title="Delete your RepairRadar account and data"
            lastUpdated={LAST_UPDATED}
            effectiveDate={EFFECTIVE_DATE}
          />

          <LegalP>
            This page explains how to delete your account and data in RepairRadar, the home repair
            and maintenance tracking app developed by J&amp;H Technology LLC.
          </LegalP>

          <LegalSection id="delete-in-app" number="1" title="Delete your account in the app">
            <LegalList>
              <li>Open RepairRadar and sign in.</li>
              <li>Go to Settings, then Privacy.</li>
              <li>Tap Delete All Data.</li>
              <li>Type DELETE to confirm, then tap Delete permanently.</li>
            </LegalList>
            <LegalP>
              Your data is deleted from our servers straight away, the data on your device is
              removed, and you are signed out.
            </LegalP>
          </LegalSection>

          <LegalSection id="what-is-deleted" number="2" title="What is deleted">
            <LegalList>
              <li>your account and sign-in</li>
              <li>your homes and repairs</li>
              <li>your warranties and documents</li>
              <li>your insurance records and maintenance schedules</li>
              <li>your household memberships, and the households you own</li>
              <li>the photos and files you stored in cloud storage</li>
            </LegalList>
            <LegalP>
              If you use another J&amp;H Technology app with the same sign-in, your sign-in is kept
              for that app and only your RepairRadar data is removed.
            </LegalP>
          </LegalSection>

          <LegalSection id="what-is-kept" number="3" title="What is kept">
            <LegalList>
              <li>
                Content reports you filed about other users&rsquo; content are kept so we can
                complete moderation.
              </li>
              <li>
                Purchase records are held by Apple or Google, which process the payment. We do not
                control them.
              </li>
            </LegalList>
          </LegalSection>

          <LegalSection id="by-email" number="4" title="Delete by email">
            <LegalP>
              If you cannot use the app, email{" "}
              <a className={LINK} href={`mailto:${EMAIL}?subject=RepairRadar%20account%20deletion`}>
                {EMAIL}
              </a>{" "}
              from the email address on your account, with the subject &ldquo;RepairRadar account
              deletion&rdquo;. We delete your account and its data within 30 days and confirm by
              email.
            </LegalP>
          </LegalSection>

          <LegalSection id="guests" number="5" title="If you use RepairRadar as a guest">
            <LegalP>
              Without an account, your data is stored only on your device. Delete the app to remove
              it, or use Delete All Data in Settings, then Privacy.
            </LegalP>
          </LegalSection>

          <LegalSection id="timeline" number="6" title="How long it takes">
            <LegalList>
              <li>In the app: immediately.</li>
              <li>By email: within 30 days.</li>
            </LegalList>
          </LegalSection>

          <LegalSection id="subscriptions" number="7" title="Cancel your subscription separately">
            <LegalP>
              Deleting your account does not cancel a RepairRadar subscription. Cancel it with the
              store you bought it from, otherwise the store keeps billing you.
            </LegalP>
            <LegalList>
              <li>
                App Store: open Settings on your iPhone, tap your name, tap Subscriptions, choose
                RepairRadar, and tap Cancel Subscription.
              </li>
              <li>
                Google Play: open the Play Store, tap your profile picture, then Payments &amp;
                subscriptions, then Subscriptions, choose RepairRadar, and tap Cancel subscription.
              </li>
            </LegalList>
          </LegalSection>

          <LegalSection id="more" number="8" title="More information">
            <LegalP>
              See the{" "}
              <a className={LINK} href="/privacy">
                privacy policy
              </a>{" "}
              or{" "}
              <a className={LINK} href="/support">
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
