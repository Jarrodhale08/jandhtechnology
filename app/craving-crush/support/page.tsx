import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalSubSection, LegalP } from "@/components/legal";
import { CravingCrushRelatedLinks } from "@/components/craving-crush/RelatedLinks";

const LAST_UPDATED = "November 2, 2026";
const EFFECTIVE_DATE = "November 2, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";
const EMAIL = "support@jandhtechnology.com";
const DESCRIPTION =
  "Get help with the Craving Crush app: restore purchases, cancel your subscription, delete your account, and contact us.";

export const metadata: Metadata = {
  title: "Support | Craving Crush | J&H Technology",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.jandhtechnology.com/craving-crush/support" },
  openGraph: {
    title: "Support | Craving Crush | J&H Technology",
    description: DESCRIPTION,
    url: "https://www.jandhtechnology.com/craving-crush/support",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function CravingCrushSupportPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="Craving Crush"
            title="Craving Crush Support"
            lastUpdated={LAST_UPDATED}
            effectiveDate={EFFECTIVE_DATE}
          />

          <LegalSection id="contact" number="1" title="Contact us">
            <LegalP>
              Email{" "}
              <a className={LINK} href={`mailto:${EMAIL}?subject=Craving%20Crush%20support`}>
                {EMAIL}
              </a>{" "}
              with your question. If something went wrong, tell us your phone model and what you
              were doing when it happened.
            </LegalP>
          </LegalSection>

          <LegalSection id="faq" number="2" title="Frequently asked questions">
            <LegalSubSection number="Q" title="How do I restore my purchase?">
              <LegalP>
                Make sure you are signed in to the same Apple ID or Google account you subscribed
                with. Then open Settings, tap Subscription, and tap Restore at the top of the
                screen. If Premium is already active, Settings shows Manage Subscription instead,
                and it has a Restore Purchases button.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="Q" title="How do I cancel my subscription on iPhone?">
              <LegalP>
                Open the Settings app, tap your name, tap Subscriptions, choose Craving Crush, and
                tap Cancel Subscription. Apple handles the billing, so we cannot cancel it for you.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="Q" title="How do I cancel my subscription on Android?">
              <LegalP>
                Open the Google Play Store app, tap your profile picture, tap Payments &amp;
                subscriptions, then Subscriptions, choose Craving Crush, and tap Cancel
                subscription. Google handles the billing, so we cannot cancel it for you.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="Q" title="How do I delete my account?">
              <LegalP>
                In the app, go to Settings, then Privacy &amp; Data, and tap Delete Account. This
                permanently deletes your account and its data straight away. Deleting your account
                does not cancel a subscription. See{" "}
                <a className={LINK} href="/craving-crush/delete-account">
                  delete your account and data
                </a>{" "}
                for the details and the email option.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="Q" title="Do I need an account?">
              <LegalP>
                No. Without an account your data stays on your device. An optional account syncs
                your data to our server so you can keep it. See the{" "}
                <a className={LINK} href="/craving-crush/privacy">
                  privacy policy
                </a>
                .
              </LegalP>
            </LegalSubSection>
          </LegalSection>
          <CravingCrushRelatedLinks current="/craving-crush/support" />
        </article>
      </main>
      <Footer />
    </>
  );
}
