import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalList, LegalP } from "@/components/legal";

const LAST_UPDATED = "October 18, 2026";
const EFFECTIVE_DATE = "October 18, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";

const FLAVOR_ATTRIBUTION =
  "Flavor vocabulary adapted from the Counter Culture Coffee Taster's Flavor Wheel © Counter Culture Coffee 2013. Changes: redrawn as lists and an interactive wheel, with new layout and colors.";
const CHARACTER_ATTRIBUTION =
  "Character vocabulary adapted from the Coffee Character Wheel (AgriFutures Australia publication 23-227, 2023), developed by Southern Cross University with Processing Methods Bootcamp and the Australian coffee industry. Changes: redrawn as lists and an interactive wheel.";

export const metadata: Metadata = {
  title: "Terms of Service | Coffee Tasting | J&H Technology",
  description:
    "The terms that apply to the Coffee Tasting app, which supplement Apple's standard Licensed Application End User License Agreement.",
  alternates: { canonical: "https://jandhtechnology.com/coffee-tasting/terms" },
  openGraph: {
    title: "Terms of Service | Coffee Tasting | J&H Technology",
    description:
      "The terms that apply to the Coffee Tasting app, which supplement Apple's standard Licensed Application End User License Agreement.",
    url: "https://jandhtechnology.com/coffee-tasting/terms",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function CoffeeTastingTermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="Coffee Tasting"
            title="Coffee Tasting Terms of Service"
            lastUpdated={LAST_UPDATED}
            effectiveDate={EFFECTIVE_DATE}
          />

          <LegalSection id="agreement" number="1" title="Agreement">
            <LegalP>
              These terms are between you and J&amp;H Technology LLC (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;) and cover your use of the Coffee Tasting app. If you download the
              app from the Apple App Store, Apple&apos;s standard Licensed Application End User
              License Agreement applies to your use of it, and these terms supplement it. If the
              two conflict, Apple&apos;s agreement controls for the matters it covers. Our{" "}
              <a className={LINK} href="/terms">
                company Terms of Service
              </a>{" "}
              and{" "}
              <a className={LINK} href="/coffee-tasting/privacy">
                Coffee Tasting Privacy Policy
              </a>{" "}
              also apply.
            </LegalP>
            <LegalP>
              We, not Apple, are responsible for the app and its support. See the{" "}
              <a className={LINK} href="/coffee-tasting/support">
                support page
              </a>
              .
            </LegalP>
          </LegalSection>

          <LegalSection id="your-content" number="2" title="Your content stays yours">
            <LegalP>
              The tastings, ratings, and notes you write belong to you. They are stored only on
              your device, and we do not receive, claim, or license them. You are responsible for
              keeping your own backups.
            </LegalP>
          </LegalSection>

          <LegalSection id="coffee-wheels" number="3" title="Coffee wheels">
            <LegalP>
              The app&rsquo;s flavor and character vocabularies draw on published coffee wheels. We
              credit them as follows.
            </LegalP>
            <LegalP>{FLAVOR_ATTRIBUTION}</LegalP>
            <LegalP>{CHARACTER_ATTRIBUTION}</LegalP>
            <LegalP>
              Those wheels remain the work of their owners. Coffee Tasting is not affiliated with
              or endorsed by Counter Culture Coffee, AgriFutures Australia, or Southern Cross
              University.
            </LegalP>
          </LegalSection>

          <LegalSection id="retailer-links" number="4" title="Retailer links are third-party">
            <LegalP>
              The app&rsquo;s &ldquo;Buy this coffee&rdquo; links show the retailer&rsquo;s web address and
              open it in your browser. These are third-party websites that we do not own or control. We
              take no payment from these links and are not responsible for the retailers&rsquo;
              products, prices, content, or policies. Any purchase is between you and the retailer.
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
              Because your tastings live only on your device, you may lose them if you delete the
              app, lose the device, or use Delete all my data. Our total liability for any claim
              relating to the app is limited to the amount you paid for it, which for a free app
              is zero. Some places do not allow these limits, and in that case they apply only as
              far as the law allows.
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
                <a className={LINK} href="mailto:jarrod@jandhtechnology.com">
                  jarrod@jandhtechnology.com
                </a>
              </li>
            </LegalList>
          </LegalSection>
        </article>
      </main>
      <Footer />
    </>
  );
}
