import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LegalHeader, LegalSection, LegalSubSection, LegalList, LegalP } from "@/components/legal";
import { CravingCrushRelatedLinks } from "@/components/craving-crush/RelatedLinks";

const LAST_UPDATED = "November 2, 2026";
const EFFECTIVE_DATE = "November 2, 2026";
const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";
const EMAIL = "support@jandhtechnology.com";
const DESCRIPTION =
  "How the Craving Crush app handles your data: it works without an account, an optional account syncs your cravings, crash reports are scrubbed, and there are no ads or tracking.";

export const metadata: Metadata = {
  title: "Privacy Policy | Craving Crush | J&H Technology",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.jandhtechnology.com/craving-crush/privacy" },
  openGraph: {
    title: "Privacy Policy | Craving Crush | J&H Technology",
    description: DESCRIPTION,
    url: "https://www.jandhtechnology.com/craving-crush/privacy",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function CravingCrushPrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="Craving Crush"
            title="Craving Crush Privacy Policy"
            lastUpdated={LAST_UPDATED}
            effectiveDate={EFFECTIVE_DATE}
          />

          <LegalP>
            This policy covers the Craving Crush app for iPhone and Android (app ID
            com.cravecrush.app), made by J&amp;H Technology LLC. It supplements the{" "}
            <a className={LINK} href="/privacy">
              J&amp;H Technology Privacy Policy
            </a>
            . If the two differ for this app, this page controls.
          </LegalP>

          <LegalSection id="summary" number="1" title="Summary">
            <LegalP>
              Craving Crush helps you log cravings and build streaks. You can use it without an
              account, and then your data stays on your device. If you choose to create an account,
              your Craving Crush data is synced to our server so you can keep it. We have no ads, no
              tracking, and no analytics. We never sell or share your personal data for advertising.
            </LegalP>
          </LegalSection>

          <LegalSection id="without-account" number="2" title="Using the app without an account">
            <LegalP>
              Without an account, everything you record is stored only on your device:
            </LegalP>
            <LegalList>
              <li>your cravings and notes</li>
              <li>your goals, badges, and stats</li>
              <li>your settings</li>
            </LegalList>
            <LegalP>
              When you are signed out, the app sends nothing to our servers except crash reports
              (section 5). Purchase checks are done by Apple or Google.
            </LegalP>
          </LegalSection>

          <LegalSection id="account" number="3" title="If you create an account">
            <LegalP>
              An account is optional. To create one you give an email address and a password, and
              you can add a display name. When you are signed in, the app syncs the following to
              our backend, a hosted database run by Supabase:
            </LegalP>
            <LegalList>
              <li>your email address and display name</li>
              <li>
                your craving logs: the trigger, the intensity (1 to 5), the outcome, any note you
                type, and the times you logged them
              </li>
              <li>
                &ldquo;ride the wave&rdquo; intensity readings, the category and length of any
                challenge, and your reflection
              </li>
              <li>your XP, streak, and crush stats</li>
              <li>the badges you have unlocked</li>
            </LegalList>
            <LegalP>
              We store this data only to run Craving Crush for you, such as keeping your history
              when you change phones.
            </LegalP>
          </LegalSection>

          <LegalSection id="subscriptions" number="4" title="Craving Crush Premium">
            <LegalP>
              Craving Crush Premium is a monthly or annual subscription that renews automatically.
              The Apple App Store or Google Play processes the payment. We never see your card
              details.
            </LegalP>
            <LegalP>
              If you are signed in, the app sends the store&rsquo;s purchase token or transaction
              ID to our server. The server checks it with Apple or Google and stores an entitlement
              record linked to your account. That record holds the product, its status and expiry
              date, the store environment, and the store&rsquo;s transaction identifiers. We use it
              only to unlock Premium.
            </LegalP>
          </LegalSection>

          <LegalSection id="crash-reports" number="5" title="Crash reports">
            <LegalP>
              Release versions of the app send crash and error reports to Sentry (sentry.io), our
              crash-reporting service. The app removes personal data before a report is sent:
              email addresses, sign-in tokens, and your craving notes, triggers, and reflections
              are redacted. Reports include no screenshots and are not linked to your identity. We
              use them only to find and fix bugs.
            </LegalP>
          </LegalSection>

          <LegalSection id="notifications" number="6" title="Reminders">
            <LegalP>
              Reminders are scheduled on your device. The app does not send us a push notification
              token.
            </LegalP>
          </LegalSection>

          <LegalSection id="what-we-dont-do" number="7" title="What we don't do">
            <LegalList>
              <li>No advertising.</li>
              <li>No tracking across apps or websites.</li>
              <li>No analytics tools. Sentry crash reporting is the only one we use.</li>
              <li>We do not sell your personal data or share it for advertising.</li>
            </LegalList>
          </LegalSection>

          <LegalSection id="retention" number="8" title="How long we keep data">
            <LegalSubSection number="8.1" title="Account data">
              <LegalP>
                We keep your account and synced data while your account exists, and delete it when
                you delete your account.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="8.2" title="Crash reports">
              <LegalP>Sentry keeps crash reports for its standard retention period of 90 days.</LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="deleting-your-data" number="9" title="Deleting your data">
            <LegalList>
              <li>
                <strong className="text-white">Delete your account:</strong> in the app, go to
                Settings, then Privacy &amp; Data, then Delete Account. This straight away deletes
                your account and all its Craving Crush data from our servers.
              </li>
              <li>
                <strong className="text-white">Delete your craving data only:</strong> Settings,
                then Privacy &amp; Data, then Delete All Data. This removes your craving data and
                keeps your account.
              </li>
              <li>Deleting the app removes the data stored on your device.</li>
              <li>
                If you cannot use the app, email{" "}
                <a className={LINK} href={`mailto:${EMAIL}?subject=Craving%20Crush%20account%20deletion`}>
                  {EMAIL}
                </a>{" "}
                from your account email to ask us to delete your account. We complete it within 30
                days.
              </li>
            </LegalList>
            <LegalP>
              Deleting your account does not cancel a subscription. Cancel it in the App Store or
              Google Play. More detail is on the{" "}
              <a className={LINK} href="/craving-crush/delete-account">
                delete your account and data
              </a>{" "}
              page.
            </LegalP>
          </LegalSection>

          <LegalSection id="health" number="10" title="Not a medical device">
            <LegalP>
              Craving Crush is not a medical device and does not give medical advice. The data in
              it is habit data that you report yourself.
            </LegalP>
          </LegalSection>

          <LegalSection id="children" number="11" title="Children">
            <LegalP>
              Craving Crush is not directed to children under 13, and we do not knowingly collect
              personal information from them.
            </LegalP>
          </LegalSection>

          <LegalSection id="changes" number="12" title="Changes">
            <LegalP>
              If we change how the app handles data, we will update this page and its Last Updated
              date before the change takes effect.
            </LegalP>
          </LegalSection>

          <LegalSection id="contact" number="13" title="Contact">
            <LegalP>
              Questions about this policy:{" "}
              <a className={LINK} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </LegalP>
          </LegalSection>
          <CravingCrushRelatedLinks current="/craving-crush/privacy" />
        </article>
      </main>
      <Footer />
    </>
  );
}
