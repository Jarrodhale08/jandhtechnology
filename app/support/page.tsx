import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalSubSection, LegalList, LegalP } from "@/components/legal";

const LAST_UPDATED = "October 19, 2026";
const EFFECTIVE_DATE = "October 19, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";
const DESCRIPTION =
  "Get help with Slang Decoder and other J&H Technology apps: contact us, manage or cancel your subscription, restore purchases, and delete your account.";

export const metadata: Metadata = {
  title: "Support | J&H Technology",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.jandhtechnology.com/support" },
  openGraph: {
    title: "Support | J&H Technology",
    description: DESCRIPTION,
    url: "https://www.jandhtechnology.com/support",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="Help"
            title="Support"
            lastUpdated={LAST_UPDATED}
            effectiveDate={EFFECTIVE_DATE}
          />

          <LegalSection id="contact" number="1" title="Contact us">
            <LegalP>
              Email{" "}
              <a className={LINK} href="mailto:jarrod@jandhtechnology.com">
                jarrod@jandhtechnology.com
              </a>{" "}
              with your question. If something went wrong, tell us which app you are using and the
              app version. We reply within 2 business days.
            </LegalP>
            <LegalP>
              In Slang Decoder you can also open Settings and tap Help &amp; Support to email us, report
              a bug, or request a feature. The app version is shown on the same screen.
            </LegalP>
          </LegalSection>

          <LegalSection id="subscription" number="2" title="Slang Decoder subscription">
            <LegalSubSection number="2.1" title="Manage or cancel Premium">
              <LegalP>
                Premium is billed through your Apple ID. On your iPhone, open Settings, tap your name,
                tap Subscriptions, choose Slang Decoder, and tap Cancel Subscription. Cancel at least
                24 hours before the trial or billing period ends to avoid being charged. Premium stays
                active until the end of the period you have paid for.
              </LegalP>
              <LegalP>
                Slang Decoder is available for iPhone only, so there is no Google Play subscription to
                manage.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="2.2" title="Restore purchases">
              <LegalP>
                If you reinstall the app or move to a new iPhone, sign in to the App Store with the
                Apple ID you subscribed with. Then open Slang Decoder, go to Settings, tap Upgrade to
                Pro, and tap Restore Purchases at the bottom of the screen.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="account" number="3" title="Your Slang Decoder account and data">
            <LegalSubSection number="3.1" title="Delete your account">
              <LegalP>In Slang Decoder, use either of these:</LegalP>
              <LegalList>
                <li>Settings, then Privacy &amp; Data, then Delete Account, then Delete Everything</li>
                <li>Settings, then Account, then Delete Account, then Delete Forever</li>
              </LegalList>
              <LegalP>
                This permanently deletes your account and your learning progress, favorites, streaks,
                and suggestions from your device and our servers. It cannot be undone. Deleting your
                account does not cancel an active subscription, so cancel it first as described above.
              </LegalP>
              <LegalP>
                If you never signed in, Settings, then Privacy &amp; Data shows Delete All Data
                instead, which removes everything the app has stored on your device.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="3.2" title="Export your data">
              <LegalP>
                Open Settings, tap Privacy &amp; Data, and tap Export My Data to save a copy of your
                favorites, learned terms, and settings.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="more" number="4" title="More help">
            <LegalList>
              <li>
                <Link className={LINK} href="/slang/faq">
                  Slang Decoder FAQ
                </Link>{" "}
                for pricing, privacy, and safety questions
              </li>
              <li>
                <Link className={LINK} href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className={LINK} href="/terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className={LINK} href="/coffee-tasting/support">
                  Coffee Tasting support
                </Link>{" "}
                for help with the Coffee Tasting app
              </li>
            </LegalList>
          </LegalSection>
        </article>
      </main>
      <Footer />
    </>
  );
}
