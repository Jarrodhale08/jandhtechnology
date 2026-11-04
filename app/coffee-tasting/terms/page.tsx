import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalList, LegalP } from "@/components/legal";
import { CoffeeTastingRelatedLinks } from "@/components/coffee-tasting/RelatedLinks";

const LAST_UPDATED = "November 4, 2026";
const EFFECTIVE_DATE = "November 4, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";

const FLAVOR_ATTRIBUTION =
  "Flavor vocabulary adapted from the Counter Culture Coffee Taster's Flavor Wheel © Counter Culture Coffee 2013. Changes: redrawn as lists and an interactive wheel, with new layout and colors.";
const CHARACTER_ATTRIBUTION =
  "Character vocabulary adapted from the Coffee Character Wheel (AgriFutures Australia publication 23-227, 2023), developed by Southern Cross University with Processing Methods Bootcamp and the Australian coffee industry. Changes: redrawn as lists and an interactive wheel.";

export const metadata: Metadata = {
  title: "Terms of Service | Coffee Tasting | J&H Technology",
  description:
    "The terms that apply to the Coffee Tasting app, which supplement Apple's standard Licensed Application End User License Agreement.",
  alternates: { canonical: "https://www.jandhtechnology.com/coffee-tasting/terms" },
  openGraph: {
    title: "Terms of Service | Coffee Tasting | J&H Technology",
    description:
      "The terms that apply to the Coffee Tasting app, which supplement Apple's standard Licensed Application End User License Agreement.",
    url: "https://www.jandhtechnology.com/coffee-tasting/terms",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function CoffeeTastingTermsPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
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

          <LegalSection id="accounts" number="2" title="Accounts and sign-in">
            <LegalP>
              You can use the app without signing in. The app creates an anonymous guest identifier
              so that purchases and group sessions can work. You can sign in with Apple or with an
              email code to keep your data if you change phones. You are responsible for your
              account and for what happens under it. You can delete it at any time from Settings
              (see{" "}
              <a className={LINK} href="/coffee-tasting/delete-account">
                Delete account
              </a>
              ).
            </LegalP>
          </LegalSection>

          <LegalSection id="your-content" number="3" title="Your content stays yours">
            <LegalP>
              The tastings, ratings, and notes you write belong to you. By default they are stored
              only on your device. If you turn on backup, or you take part in a group tasting, the
              content involved is also stored on our servers as described in the{" "}
              <a className={LINK} href="/coffee-tasting/privacy">
                privacy policy
              </a>
              . You give us a limited license to store and display that content for the purpose of
              running those features: backup shows it to you on your devices, and a group tasting
              shows what you enter to the other people in that session. We do not claim ownership
              of it and do not use it for anything else.
            </LegalP>
          </LegalSection>

          <LegalSection id="group-tastings" number="4" title="Group tastings">
            <LegalP>
              A group tasting has a leader, who creates the session, names the coffees, optionally
              enters what the coffees are, and decides when the group&rsquo;s notes are shown.
              Hosting a group tasting needs a Coffee Tasting account and an active Premium
              subscription. Joining one with a session code needs neither.
            </LegalP>
            <LegalP>
              Everyone in a session can see the display name you chose, and your notes for a coffee
              become visible to the rest of the group when the leader opens the Wall for that coffee.
              Session titles, coffee names, display names and notes are visible to the people in the
              session. Leaders are responsible for the content they add and for the links they
              share. Sessions that stay idle for 72 hours are closed automatically.
            </LegalP>
          </LegalSection>

          <LegalSection id="acceptable-use" number="5" title="Acceptable use, zero tolerance">
            <LegalP>
              Do not post anything objectionable, abusive, hateful, sexually explicit, harassing,
              infringing, or illegal in session titles, display names, coffee names, notes, or
              links. Do not impersonate anyone, send spam, or share unsolicited links.
            </LegalP>
            <LegalP emphasis>
              WE HAVE NO TOLERANCE FOR OBJECTIONABLE CONTENT OR ABUSIVE USERS. VIOLATIONS LEAD TO
              REMOVAL OF CONTENT AND SUSPENSION OR A PERMANENT BAN, WITHOUT REFUND.
            </LegalP>
            <LegalP>
              The app filters objectionable text before it is shared, but filters are not perfect.
              If you see something that breaks these rules, use Report on a person or their notes in
              the session. You can also Block a person, which hides their content from you straight
              away, and unblock them later in Settings. We review every report within 24 hours and
              act on it, including removing content and suspending or banning users. You must accept
              these terms before you host or join a group tasting.
            </LegalP>
          </LegalSection>

          <LegalSection id="premium" number="6" title="Premium subscriptions">
            <LegalP>
              Premium is an auto-renewing subscription sold through the App Store or Google Play,
              which handle billing, renewal, cancellation, and refunds under their own terms. Manage
              or cancel it in your App Store or Google Play account settings. Deleting your Coffee
              Tasting account does not cancel a subscription.
            </LegalP>
          </LegalSection>

          <LegalSection id="coffee-wheels" number="7" title="Coffee wheels">
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

          <LegalSection id="retailer-links" number="8" title="Retailer links are third-party">
            <LegalP>
              The app&rsquo;s &ldquo;Buy&rdquo; links, including links a group leader adds, show the retailer&rsquo;s web address
              and open it in your browser. These are third-party websites that we do not own or control. We
              take no payment from these links and are not responsible for the retailers&rsquo;
              products, prices, content, or policies. Any purchase is between you and the retailer.
            </LegalP>
          </LegalSection>

          <LegalSection id="warranty" number="9" title="No warranty, and limitation of liability">
            <LegalP emphasis>
              THE APP IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;, WITHOUT
              WARRANTIES OF ANY KIND, TO THE FULLEST EXTENT PERMITTED BY LAW.
            </LegalP>
            <LegalP>
              To the fullest extent permitted by law, we are not liable for indirect, incidental,
              special, or consequential damages, or for lost data, arising from your use of the app.
              If you do not turn on backup, your tastings live only on your device, and you may lose them if you delete the
              app, lose the device, or use Delete all my data. Our total liability for any claim
              relating to the app is limited to the amount you paid for it, which for a free app
              is zero. Some places do not allow these limits, and in that case they apply only as
              far as the law allows.
            </LegalP>
          </LegalSection>

          <LegalSection id="governing-law" number="10" title="Governing law">
            <LegalP>
              These terms are governed by the laws of the State of Michigan, United States,
              without regard to conflict of law principles.
            </LegalP>
          </LegalSection>

          <LegalSection id="changes" number="11" title="Changes to these terms">
            <LegalP>
              If we change these terms in a way that matters, we will update this page and ask you to
              accept the new version in the app before you host or join a group tasting again. This is
              version 1 of the group terms.
            </LegalP>
          </LegalSection>

          <LegalSection id="contact" number="12" title="Contact">
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
          <CoffeeTastingRelatedLinks current="/coffee-tasting/terms" />
        </article>
      </main>
      <Footer />
    </>
  );
}
