import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalList, LegalP } from "@/components/legal";

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
              Coffee Tasting is a notebook for your coffee tastings. Your tastings stay on your
              phone. We have no accounts, no ads, and no tracking. The only data that can leave
              your device is a crash report, and only if you switch that on.
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
          </LegalSection>

          <LegalSection id="crash-reports" number="3" title="Crash reports">
            <LegalP>
              Crash reporting is off unless you turn it on, either on the last introduction screen
              or in Settings. You can turn it off at any time, and the app then stops sending
              reports straight away.
            </LegalP>
            <LegalP>
              When it is on, a crash report is sent to Sentry, our crash-reporting service. A
              report contains technical details such as the error, the app version, and the
              operating system version.
            </LegalP>
            <LegalP>A crash report never contains:</LegalP>
            <LegalList>
              <li>your tasting notes or any other text you typed</li>
              <li>your name, email address, or any user identifier</li>
              <li>your device name</li>
            </LegalList>
            <LegalP>
              We configure Sentry not to store IP addresses. We use crash reports only to find and
              fix bugs, and we do not use them to identify you or your device. Reports are kept for
              the retention period set in our Sentry organization, and then deleted.
            </LegalP>
          </LegalSection>

          <LegalSection id="what-we-dont-do" number="4" title="What we don't do">
            <LegalList>
              <li>No advertising.</li>
              <li>No tracking across apps or websites.</li>
              <li>No analytics or usage statistics.</li>
              <li>We do not sell or share your data, because we do not have it.</li>
            </LegalList>
          </LegalSection>

          <LegalSection id="retailer-links" number="5" title="Links to coffee retailers">
            <LegalP>
              Some coffees in the app link to the website of a retailer that sells them. These
              links open in your browser, are marked as external, and are only ever followed when
              you tap them. We add no tracking to them and take no payment. Once you leave the
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
