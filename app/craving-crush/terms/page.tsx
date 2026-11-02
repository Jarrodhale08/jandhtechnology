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
  "The terms that apply to the Craving Crush app, which supplement Apple's standard Licensed Application End User License Agreement.";

export const metadata: Metadata = {
  title: "Terms of Service | Craving Crush | J&H Technology",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.jandhtechnology.com/craving-crush/terms" },
  openGraph: {
    title: "Terms of Service | Craving Crush | J&H Technology",
    description: DESCRIPTION,
    url: "https://www.jandhtechnology.com/craving-crush/terms",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function CravingCrushTermsPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="Craving Crush"
            title="Craving Crush Terms of Service"
            lastUpdated={LAST_UPDATED}
            effectiveDate={EFFECTIVE_DATE}
          />

          <LegalSection id="agreement" number="1" title="Agreement">
            <LegalP>
              These terms are between you and J&amp;H Technology LLC (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;) and cover your use of the Craving Crush app. If you download the
              app from the Apple App Store, Apple&apos;s standard Licensed Application End User
              License Agreement applies to your use of it, and these terms supplement it. If the
              two conflict, Apple&apos;s agreement controls for the matters it covers. Our{" "}
              <a className={LINK} href="/terms">
                company Terms of Service
              </a>{" "}
              and{" "}
              <a className={LINK} href="/craving-crush/privacy">
                Craving Crush Privacy Policy
              </a>{" "}
              also apply.
            </LegalP>
            <LegalP>
              We, not Apple, are responsible for the app and its support. See the{" "}
              <a className={LINK} href="/craving-crush/support">
                support page
              </a>
              .
            </LegalP>
          </LegalSection>

          <LegalSection id="not-medical" number="2" title="Not medical advice">
            <LegalP>
              Craving Crush is a habit tool. It is not a medical device and does not diagnose,
              treat, or give medical advice. If you need help with a health condition or an
              addiction, talk to a qualified health professional.
            </LegalP>
          </LegalSection>

          <LegalSection id="premium" number="3" title="Craving Crush Premium">
            <LegalP>
              Craving Crush Premium is a monthly or annual subscription that renews automatically
              until you cancel it. The Apple App Store or Google Play sells it and handles billing,
              renewals, cancellations, and refunds under its own terms. Cancel in your App Store or
              Google Play subscription settings. Deleting the app or your account does not cancel
              a subscription.
            </LegalP>
          </LegalSection>

          <LegalSection id="your-content" number="4" title="Your content stays yours">
            <LegalP>
              The cravings, notes, and reflections you record belong to you. Without an account
              they are stored only on your device. If you create an account, we store them only to
              run Craving Crush for you, as described in the privacy policy.
            </LegalP>
          </LegalSection>

          <LegalSection id="warranty" number="5" title="No warranty, and limitation of liability">
            <LegalP emphasis>
              THE APP IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;, WITHOUT
              WARRANTIES OF ANY KIND, TO THE FULLEST EXTENT PERMITTED BY LAW.
            </LegalP>
            <LegalP>
              To the fullest extent permitted by law, we are not liable for indirect, incidental,
              special, or consequential damages, or for lost data, arising from your use of the app.
              Without an account, your data lives only on your device, and you may lose it if you
              delete the app or lose the device. Our total liability for any claim relating to the
              app is limited to the amount you paid for it. Some
              places do not allow these limits, and in that case they apply only as far as the law
              allows.
            </LegalP>
          </LegalSection>

          <LegalSection id="governing-law" number="6" title="Governing law">
            <LegalP>
              These terms are governed by the laws of the State of Michigan, United States,
              without regard to conflict of law principles.
            </LegalP>
          </LegalSection>

          <LegalSection id="contact" number="7" title="Contact">
            <LegalList>
              <li>J&amp;H Technology LLC</li>
              <li>
                Email:{" "}
                <a className={LINK} href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </li>
            </LegalList>
          </LegalSection>
          <CravingCrushRelatedLinks current="/craving-crush/terms" />
        </article>
      </main>
      <Footer />
    </>
  );
}
