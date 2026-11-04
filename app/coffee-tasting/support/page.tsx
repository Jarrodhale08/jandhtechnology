import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalSubSection, LegalP } from "@/components/legal";
import { CoffeeTastingRelatedLinks } from "@/components/coffee-tasting/RelatedLinks";

const LAST_UPDATED = "November 4, 2026";
const EFFECTIVE_DATE = "November 4, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";

export const metadata: Metadata = {
  title: "Support | Coffee Tasting | J&H Technology",
  description:
    "Get help with the Coffee Tasting app: where your tastings are stored, how to delete them, and how to contact us.",
  alternates: { canonical: "https://www.jandhtechnology.com/coffee-tasting/support" },
  openGraph: {
    title: "Support | Coffee Tasting | J&H Technology",
    description:
      "Get help with the Coffee Tasting app: where your tastings are stored, how to delete them, and how to contact us.",
    url: "https://www.jandhtechnology.com/coffee-tasting/support",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function CoffeeTastingSupportPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="Coffee Tasting"
            title="Coffee Tasting Support"
            lastUpdated={LAST_UPDATED}
            effectiveDate={EFFECTIVE_DATE}
          />

          <LegalSection id="contact" number="1" title="Contact us">
            <LegalP>
              Email{" "}
              <a className={LINK} href="mailto:jarrod@jandhtechnology.com">
                jarrod@jandhtechnology.com
              </a>{" "}
              with your question and, if something went wrong, the app version shown at the bottom
              of Settings. We reply within 2 business days.
            </LegalP>
          </LegalSection>

          <LegalSection id="faq" number="2" title="Frequently asked questions">
            <LegalSubSection number="Q" title="Where are my tastings stored?">
              <LegalP>
                On your device. If you sign in and turn on backup in Settings, a copy is also kept in your
                account so it follows you to a new phone; turning backup off deletes that copy. Without backup
                we cannot recover tastings if you delete the app or lose your phone. See the{" "}
                <a className={LINK} href="/coffee-tasting/privacy">
                  privacy policy
                </a>
                .
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="Q" title="How do I join a group tasting?">
              <LegalP>
                Open the Groups tab, choose Join with code, and enter the six-character code from your host, or
                open the link they sent you. You don&rsquo;t need an account or a subscription to join.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="Q" title="How do I report or block someone in a group tasting?">
              <LegalP>
                In the session, open People, or tap a name on the Wall, and choose Report or Block. Blocking
                hides that person&rsquo;s notes from you at once; you can unblock in Settings, under Blocked
                people. We review every report within 24 hours and remove content or suspend or ban users who
                break our{" "}
                <a className={LINK} href="/coffee-tasting/terms">
                  terms
                </a>
                .
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="Q" title="How do I delete my account?">
              <LegalP>
                Open Settings, then Account, and choose Delete account. See{" "}
                <a className={LINK} href="/coffee-tasting/delete-account">
                  Delete account
                </a>
                . To erase only what is on your device, use Delete all my data in Settings.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="Q" title="How do I see the introduction again?">
              <LegalP>Open Settings and tap Replay introduction.</LegalP>
            </LegalSubSection>
            <LegalSubSection number="Q" title="How do I turn crash reports on or off?">
              <LegalP>
                Open Settings and use the Share crash reports switch. It is off by default. Turning
                it off stops reports from being sent straight away.
              </LegalP>
            </LegalSubSection>
          </LegalSection>
          <CoffeeTastingRelatedLinks current="/coffee-tasting/support" />
        </article>
      </main>
      <Footer />
    </>
  );
}
