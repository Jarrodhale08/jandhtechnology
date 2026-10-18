import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalSubSection, LegalList, LegalP } from "@/components/legal";

const LAST_UPDATED = "October 18, 2026";
const EFFECTIVE_DATE = "October 18, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";

export const metadata: Metadata = {
  title: "Privacy Policy | Coffee Tasting | J&H Technology",
  description:
    "How the Coffee Tasting app handles your data: tastings stay on your device, crash reports are opt-in, and there are no ads or tracking.",
  alternates: { canonical: "https://jandhtechnology.com/coffee-tasting/privacy" },
  openGraph: {
    title: "Privacy Policy | Coffee Tasting | J&H Technology",
    description:
      "How the Coffee Tasting app handles your data: tastings stay on your device, crash reports are opt-in, and there are no ads or tracking.",
    url: "https://jandhtechnology.com/coffee-tasting/privacy",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function CoffeeTastingPrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6">
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
              phone. We have no accounts, no ads, and no tracking. The app checks for app updates
              when it opens, and sends crash reports only if you switch that on.
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
                identifier, because the app has none.
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
              <li>an account, name, or email address, because the app has none</li>
            </LegalList>
            <LegalP>
              The app attaches no account or user identifier to reports and tells Sentry not to
              send its default personal data. As with any internet request, Sentry receives the IP
              address the report was sent from and may store it with the report. We use crash
              reports only to find and fix bugs, and we do not use them to identify you or your
              device. Reports are kept for
              the retention period set in our Sentry organization, and then deleted.
            </LegalP>
          </LegalSection>

          <LegalSection id="what-we-dont-do" number="4" title="What we don't do">
            <LegalList>
              <li>No advertising.</li>
              <li>No tracking across apps or websites.</li>
              <li>No analytics or usage statistics.</li>
              <li>We do not sell or share your data. Your tastings never reach us.</li>
            </LegalList>
          </LegalSection>

          <LegalSection id="retailer-links" number="5" title="Links to coffee retailers">
            <LegalP>
              Some coffees in the app link to the website of a retailer that sells them. The
              app shows a &ldquo;Buy this coffee&rdquo; link with the retailer&rsquo;s web address.
              It opens in your browser only when you tap it. We add no tracking to them and take no payment. Once you leave the
              app, the retailer&rsquo;s own privacy policy applies.
            </LegalP>
          </LegalSection>

          <LegalSection id="deleting-your-data" number="6" title="Deleting your data">
            <LegalP>
              Open Settings and choose <strong className="text-white">Delete all my data</strong>{" "}
              to erase every tasting and setting from the app. Uninstalling the app also removes
              its data from your device. Because we hold no copy, there is nothing to delete on our
              side. A crash report already sent cannot be linked back to you, so it cannot be
              looked up or removed individually.
            </LegalP>
          </LegalSection>

          <LegalSection id="children" number="7" title="Children">
            <LegalP>
              Coffee Tasting is not directed at children under 13, and we do not knowingly collect
              personal information from anyone. The app collects nothing that identifies a person.
            </LegalP>
          </LegalSection>

          <LegalSection id="changes" number="8" title="Changes">
            <LegalP>
              If we change how the app handles data, we will update this page and its Last Updated
              date before the change takes effect. If a future version adds a feature that
              collects data, we will describe it here first.
            </LegalP>
          </LegalSection>

          <LegalSection id="contact" number="9" title="Contact">
            <LegalP>
              Questions about this policy:{" "}
              <a className={LINK} href="mailto:jarrod@jandhtechnology.com">
                jarrod@jandhtechnology.com
              </a>
            </LegalP>
          </LegalSection>
        </article>
      </main>
      <Footer />
    </>
  );
}
