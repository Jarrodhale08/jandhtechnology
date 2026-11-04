import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalSubSection, LegalList, LegalP } from "@/components/legal";
import { CoffeeTastingRelatedLinks } from "@/components/coffee-tasting/RelatedLinks";

const LAST_UPDATED = "November 4, 2026";
const EFFECTIVE_DATE = "November 4, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";

export const metadata: Metadata = {
  title: "Privacy Policy | Coffee Tasting | J&H Technology",
  description:
    "How the Coffee Tasting app handles your data: tastings stay on your device unless you turn on backup or join a group tasting, crash reports are opt-in, and there are no ads or tracking.",
  alternates: { canonical: "https://www.jandhtechnology.com/coffee-tasting/privacy" },
  openGraph: {
    title: "Privacy Policy | Coffee Tasting | J&H Technology",
    description:
      "How the Coffee Tasting app handles your data: tastings stay on your device unless you turn on backup or join a group tasting, crash reports are opt-in, and there are no ads or tracking.",
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
              Coffee Tasting is a notebook for your coffee tastings. By default your tastings stay on
              your phone. If you sign in and turn on backup, or you host or join a group tasting, the
              content involved is stored on our servers, as described below. We have no ads and no
              tracking. The app checks for app updates when it opens, and sends crash reports only if
              you switch that on.
            </LegalP>
          </LegalSection>

          <LegalSection id="on-your-device" number="2" title="What stays on your device">
            <LegalP>
              Everything you record in the app is stored on your device, in the app&rsquo;s private
              storage, unless one of the features in section 3 sends a copy to us. That includes:
            </LegalP>
            <LegalList>
              <li>your tastings, ratings, and notes</li>
              <li>the flavors and characters you pick, including words you type yourself</li>
              <li>your settings, such as appearance and whether you have seen the introduction</li>
            </LegalList>
            <LegalP>
              If you back up your device with iCloud or a computer, your operating system may include
              the app&rsquo;s data in that backup under your own backup settings.
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

          <LegalSection id="what-we-hold" number="3" title="What we hold on our servers">
            <LegalP>
              We use Supabase to run our database, sign-in, and server functions. We hold the following,
              and only when the feature involved is used.
            </LegalP>
            <LegalSubSection number="3.1" title="Your account">
              <LegalP>
                The first time you open the app it creates an anonymous guest identifier. It is a random
                ID with no name or email, and it lets the app check purchases and join group tastings.
                If you sign in, we also hold your email address (or the private relay address Apple
                gives us), your sign-in method, and the display name you choose. When you sign in, any
                guest data on that phone, such as an active subscription, is moved to your account.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="3.2" title="Purchases">
              <LegalP>
                When you subscribe or restore a purchase, the app sends Apple&rsquo;s or Google&rsquo;s
                signed purchase information to our server to confirm it. We store the product, status,
                renewal date, and the store&rsquo;s transaction identifiers. We never see your payment
                details.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="3.3" title="Backup (off until you turn it on)">
              <LegalP>
                If you sign in and turn on backup, your tastings, the coffees in them, and your notes are
                copied to your account so they follow you to another device. Nobody else can read them.
                Turning backup off deletes the copy we hold; the tastings on your phone stay.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="3.4" title="Group tastings">
              <LegalP>
                A session stores its title, code, the coffees the leader adds (names, and optionally
                origin, species, a buy link and the answer key), the display names of the people in it,
                and each person&rsquo;s entries for each coffee. Everyone in the session can see its
                title, the coffee names and the display names. Entries are shown to the group when the
                leader opens the Wall for that coffee, and the answer key is shown only when the leader
                reveals it. Sessions that stay idle for 72 hours are closed. Closed sessions stay
                available to their members in the app until they or the leader delete their account or
                data.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="3.5" title="Reports and blocks">
              <LegalP>
                If you report content or a person, we store who reported what, the reason, any details you
                add, and a copy of the reported text so we can review it. We review reports within 24 hours
                and delete reviewed reports after 30 days. A block stores who you blocked, so their content
                stays hidden from you.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="3.6" title="Security and abuse prevention">
              <LegalP>
                To stop guessing of session codes and other abuse we count requests per account and per
                IP address for short periods. These counters are deleted automatically and are not used for
                anything else.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="3.7" title="Sign-in emails">
              <LegalP>
                If you sign in with an email code, we send the code to your address through an email
                delivery service. We also email ourselves a notice when a report is filed; it names
                identifiers only, never your notes.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="crash-reports" number="4" title="Crash reports">
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
              <li>your name or email address</li>
            </LegalList>
            <LegalP>
              The app attaches no account or user identifier to crash reports and tells Sentry not to
              send its default personal data. As with any internet request, Sentry receives the IP
              address the report was sent from and may store it with the report. We use crash
              reports only to find and fix bugs, and we do not use them to identify you or your
              device. Reports are kept for
              the retention period set in our Sentry organization, and then deleted.
            </LegalP>
          </LegalSection>

          <LegalSection id="what-we-dont-do" number="5" title="What we don't do">
            <LegalList>
              <li>No advertising.</li>
              <li>No tracking across apps or websites.</li>
              <li>No analytics or usage statistics.</li>
              <li>We do not sell your data or share it with advertisers.</li>
            </LegalList>
          </LegalSection>

          <LegalSection id="retailer-links" number="6" title="Links to coffee retailers">
            <LegalP>
              Some coffees, including coffees a group leader adds, link to the website of a retailer that sells them. The
              app shows a &ldquo;Buy this coffee&rdquo; link with the retailer&rsquo;s web address.
              It opens in your browser only when you tap it. We add no tracking to them and take no payment. Once you leave the
              app, the retailer&rsquo;s own privacy policy applies.
            </LegalP>
          </LegalSection>

          <LegalSection id="deleting-your-data" number="7" title="Deleting your data">
            <LegalP>
              In the app, open Settings, then Account, and choose <strong className="text-white">Delete account</strong>.
              This deletes your account and everything we hold for it: your backup, the group sessions you
              led, your entries in other sessions, your blocks, and your reports (reports you filed are kept
              without your identity until reviewed). If you signed in with Apple, we also tell Apple to revoke
              the sign-in. It does not cancel a subscription; cancel that in your App Store or Google Play
              account settings first. <strong className="text-white">Delete all my data</strong> in Settings
              does the same, and also erases what is on the device. You can also email us from the address on your account and we will
              delete the account within 30 days. See{" "}
              <a className={LINK} href="/coffee-tasting/delete-account">
                Delete account
              </a>
              . A crash report already sent cannot be linked back to you, so it cannot be looked up or removed
              individually.
            </LegalP>
          </LegalSection>

          <LegalSection id="children" number="8" title="Children">
            <LegalP>
              Coffee Tasting is not directed at children under 13, and we do not knowingly collect
              personal information from children under 13. Group tastings are not intended for them.
            </LegalP>
          </LegalSection>

          <LegalSection id="changes" number="9" title="Changes">
            <LegalP>
              If we change how the app handles data, we will update this page and its Last Updated
              date before the change takes effect. If a future version adds a feature that
              collects data, we will describe it here first.
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
