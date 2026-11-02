import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalList, LegalP } from "@/components/legal";
import { CravingCrushRelatedLinks } from "@/components/craving-crush/RelatedLinks";

const LAST_UPDATED = "November 2, 2026";
const EFFECTIVE_DATE = "November 2, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";
const EMAIL = "support@jandhtechnology.com";
const DESCRIPTION =
  "How to delete your Craving Crush account and data, by J&H Technology: in-app steps, what is deleted, the email option, and timelines.";

export const metadata: Metadata = {
  title: "Delete your account and data | Craving Crush | J&H Technology",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.jandhtechnology.com/craving-crush/delete-account" },
  openGraph: {
    title: "Delete your account and data | Craving Crush | J&H Technology",
    description: DESCRIPTION,
    url: "https://www.jandhtechnology.com/craving-crush/delete-account",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function CravingCrushDeleteAccountPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="Craving Crush by J&H Technology"
            title="Delete your Craving Crush account and data"
            lastUpdated={LAST_UPDATED}
            effectiveDate={EFFECTIVE_DATE}
          />

          <LegalP>
            This page explains how to delete your account in Craving Crush, the craving tracker app
            developed by J&amp;H Technology LLC.
          </LegalP>

          <LegalSection id="delete-in-app" number="1" title="Delete your account in the app">
            <LegalList>
              <li>Open Craving Crush and sign in.</li>
              <li>Go to Settings, then Privacy &amp; Data.</li>
              <li>Tap Delete Account, then confirm with Delete Account.</li>
            </LegalList>
            <LegalP>
              Your account and all its Craving Crush data are deleted from our servers straight
              away, and you are signed out.
            </LegalP>
            <LegalP>
              To remove your craving data but keep your account, use Delete All Data on the same
              screen instead. Deleting the app removes the data stored on your device.
            </LegalP>
          </LegalSection>

          <LegalSection id="what-is-deleted" number="2" title="What is deleted">
            <LegalList>
              <li>your account, email address, and display name</li>
              <li>your cravings and notes</li>
              <li>your stats and badges</li>
              <li>your subscription entitlement records</li>
            </LegalList>
          </LegalSection>

          <LegalSection id="what-is-kept" number="3" title="What is kept">
            <LegalP>
              Nothing linked to your account. Anonymous crash reports, which have personal data
              removed and are not linked to you, may remain with our crash-reporting service,
              Sentry, for up to 90 days before they are deleted.
            </LegalP>
          </LegalSection>

          <LegalSection id="by-email" number="4" title="Delete by email">
            <LegalP>
              If you cannot use the app, email{" "}
              <a className={LINK} href={`mailto:${EMAIL}?subject=Craving%20Crush%20account%20deletion`}>
                {EMAIL}
              </a>{" "}
              from the email address on your account, with the subject &ldquo;Craving Crush account
              deletion&rdquo;. We delete your account and its data within 30 days and confirm by
              email.
            </LegalP>
          </LegalSection>

          <LegalSection id="timeline" number="5" title="How long it takes">
            <LegalList>
              <li>In the app: immediately.</li>
              <li>By email: within 30 days.</li>
            </LegalList>
          </LegalSection>

          <LegalSection id="subscriptions" number="6" title="Cancel your subscription separately">
            <LegalP>
              Deleting your account does not cancel Craving Crush Premium. Cancel it in your App
              Store or Google Play subscription settings, otherwise the store keeps billing you.
            </LegalP>
          </LegalSection>

          <LegalSection id="more" number="7" title="More information">
            <LegalP>
              See the{" "}
              <a className={LINK} href="/craving-crush/privacy">
                Craving Crush privacy policy
              </a>{" "}
              or{" "}
              <a className={LINK} href="/craving-crush/support">
                support
              </a>
              .
            </LegalP>
          </LegalSection>
          <CravingCrushRelatedLinks current="/craving-crush/delete-account" />
        </article>
      </main>
      <Footer />
    </>
  );
}
