import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalSubSection, LegalList, LegalP } from "@/components/legal";
import { CoffeeTastingRelatedLinks } from "@/components/coffee-tasting/RelatedLinks";

const LAST_UPDATED = "October 26, 2026";
const EFFECTIVE_DATE = "October 26, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";

export const metadata: Metadata = {
  title: "Privacy Policy | Coffee Tasting | J&H Technology",
  description:
    "How the Coffee Tasting app handles your data: tastings stay on your device, Premium uses an anonymous account, crash reports are opt-in, and there are no ads or tracking.",
  alternates: { canonical: "https://www.jandhtechnology.com/coffee-tasting/privacy" },
  openGraph: {
    title: "Privacy Policy | Coffee Tasting | J&H Technology",
    description:
      "How the Coffee Tasting app handles your data: tastings stay on your device, Premium uses an anonymous account, crash reports are opt-in, and there are no ads or tracking.",
    url: "https://www.jandhtechnology.com/coffee-tasting/privacy",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function CoffeeTastingPrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="Coffee Tasting"
            title="Coffee Tasting Privacy Policy"
            lastUpdated={LAST_UPDATED}
            effectiveDate={EFFECTIVE_DATE}
          />

          <LegalP>
            This policy supplements the{" "}
            <a className={LINK} href="/privacy">
              J&amp;H Technology Privacy Policy
            </a>
            , which also applies to Coffee Tasting. If the two differ for this app, this page
            controls.
          </LegalP>

          <LegalSection id="summary" number="1" title="Summary">
            <LegalP>
              Coffee Tasting is a notebook for your coffee tastings. Your tastings never leave your
              phone. There is no sign-up and no email or name to give us. If you subscribe to
              Premium, the app uses an anonymous account so we can confirm your subscription. We
              have no ads and no tracking. The app checks for app updates when it opens, and sends
              crash reports only if you switch that on.
            </LegalP>
          </LegalSection>

          <LegalSection id="on-your-device" number="2" title="What stays on your device">
            <LegalP>
              Everything you record in the app is stored only on your device, in the app&rsquo;s
              private storage. That includes:
            </LegalP>
            <LegalList>
              <li>your tastings, ratings, and notes</li>
              <li>the flavors and characters you pick, including words you type yourself</li>
              <li>your settings, such as appearance and whether you have seen the introduction</li>
            </LegalList>
            <LegalP>
              We do not receive this data and cannot see it. If you back up your device with
              iCloud or a computer, your operating system may include the app&rsquo;s data in that
              backup under your own backup settings.
            </LegalP>
            <LegalSubSection number="2.1" title="App update checks">
              <LegalP>
                When the app opens, it checks Expo&rsquo;s update service (expo.dev) for app
                updates. That request includes the app version, your platform (iOS or Android), and
                runtime and update identifiers, and, as with any internet request, your IP address
                reaches Expo&rsquo;s servers. It contains no tasting data and no account or user
                identifier.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="crash-reports" number="3" title="Crash reports">
            <LegalP>
              Crash reporting is off unless you turn it on, either on the last introduction screen
              or in Settings. You can turn it off at any time, and the app then stops sending
              reports straight away.
            </LegalP>
            <LegalP>
              When it is on, a crash report is sent to Sentry, our crash-reporting service. A
              report contains technical details: the error and its stack trace, the app version,
              the operating system version, and the device model. Sentry also receives anonymous
              session start and end data, which shows how many sessions ended in a crash.
            </LegalP>
            <LegalP>A crash report never contains:</LegalP>
            <LegalList>
              <li>your tasting notes or any other text you typed</li>
              <li>your name or email address, because the app never asks for them</li>
            </LegalList>
            <LegalP>
              The app attaches no user identifier to reports, including your anonymous Premium
              account, and tells Sentry not to send its default personal data. As with any internet request, Sentry receives the IP
              address the report was sent from and may store it with the report. We use crash
              reports only to find and fix bugs, and we do not use them to identify you or your
              device. Reports are kept for
              the retention period set in our Sentry organization, and then deleted.
            </LegalP>
          </LegalSection>

          <LegalSection id="premium-account" number="4" title="Premium and your anonymous account">
            <LegalP>
              Coffee Tasting Premium is an auto-renewing subscription sold through the Apple App
              Store or Google Play. You do not create a login. The first time the app needs to
              check or verify a subscription, it creates an anonymous account on our server
              (hosted by Supabase). The account is a random identifier with no name, email
              address, phone number, or password attached.
            </LegalP>
            <LegalSubSection number="4.1" title="Purchase records">
              <LegalP>
                When you buy or restore a subscription, the app sends the store&rsquo;s purchase
                receipt to our server, which checks it with Apple or Google. We keep a purchase
                record tied to your anonymous account:
              </LegalP>
              <LegalList>
                <li>the plan you bought (monthly or annual) and whether it is a free trial</li>
                <li>the subscription status and the date the current period ends</li>
                <li>the store&rsquo;s transaction identifier for the subscription</li>
                <li>
                  renewal, cancellation, and refund events that Apple or Google send us about that
                  subscription
                </li>
              </LegalList>
              <LegalP>
                We do not receive or store your payment card or Apple ID or Google account
                details. Payments are handled entirely by the store. We use these records only to
                unlock Premium, keep it in step with the store, and handle refunds. The anonymous
                identifier and purchase record are not linked to your name or email, and we do not
                use them for advertising or tracking.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="4.2" title="Service providers">
              <LegalP>
                Supabase hosts the anonymous account and purchase records for us. Apple and Google
                process the payment and tell us about your subscription. Your tastings are not
                sent to any of them.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="what-we-dont-do" number="5" title="What we don't do">
            <LegalList>
              <li>No advertising.</li>
              <li>No tracking across apps or websites.</li>
              <li>No analytics or usage statistics.</li>
              <li>
                We do not sell or share your data. Your tastings never reach us, and the only
                thing we keep about you is the anonymous account and purchase record described
                above, if you use Premium.
              </li>
            </LegalList>
          </LegalSection>

          <LegalSection id="retailer-links" number="6" title="Links to coffee retailers">
            <LegalP>
              Some coffees in the app link to the website of a retailer that sells them. The
              app shows a &ldquo;Buy this coffee&rdquo; link with the retailer&rsquo;s web address.
              It opens in your browser only when you tap it. We add no tracking to them and take no payment. Once you leave the
              app, the retailer&rsquo;s own privacy policy applies.
            </LegalP>
          </LegalSection>

          <LegalSection id="deleting-your-data" number="7" title="Deleting your data">
            <LegalP>
              Open Settings and choose <strong className="text-white">Delete all my data</strong>{" "}
              to erase every tasting and setting from the app. The app also asks our server to
              delete your anonymous account and purchase records, and then signs the account out of
              the device. If the app cannot reach the server, it still erases the data on your
              device and tells you to try again from Settings. Uninstalling the app also removes
              its data from your device. A crash report already sent cannot be linked back to you,
              so it cannot be looked up or removed individually.
            </LegalP>
            <LegalP>
              Deleting your data does not cancel a subscription. Cancel it first in your App Store
              or Google Play subscription settings, otherwise the store keeps billing you. More
              detail is on the{" "}
              <a className={LINK} href="/coffee-tasting/delete-account">
                delete your account and data
              </a>{" "}
              page.
            </LegalP>
          </LegalSection>

          <LegalSection id="children" number="8" title="Children">
            <LegalP>
              Coffee Tasting is not directed at children under 13, and we do not knowingly collect
              personal information from anyone. The app collects nothing that identifies a person, and
              the anonymous Premium account holds no personal details.
            </LegalP>
          </LegalSection>

          <LegalSection id="changes" number="9" title="Changes">
            <LegalP>
              If we change how the app handles data, we will update this page and its Last Updated
              date before the change takes effect. If a future version adds a feature that
              collects data, such as signing in with an email address, we will describe it here
              first.
            </LegalP>
          </LegalSection>

          <LegalSection id="contact" number="10" title="Contact">
            <LegalP>
              Questions about this policy:{" "}
              <a className={LINK} href="mailto:jarrod@jandhtechnology.com">
                jarrod@jandhtechnology.com
              </a>
            </LegalP>
          </LegalSection>
          <CoffeeTastingRelatedLinks current="/coffee-tasting/privacy" />
        </article>
      </main>
      <Footer />
    </>
  );
}
