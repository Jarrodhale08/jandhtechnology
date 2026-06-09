import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  LegalHeader,
  LegalSection,
  LegalSubSection,
  LegalList,
  LegalP,
} from "@/components/legal";

const LAST_UPDATED = "April 27, 2026";
const EFFECTIVE_DATE = "April 27, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy | J&H Technology",
  description:
    "How J&H Technology LLC collects, uses, and protects information across all mobile applications and services.",
  alternates: { canonical: "https://jandhtechnology.com/privacy" },
  openGraph: {
    title: "Privacy Policy | J&H Technology",
    description:
      "How J&H Technology LLC collects, uses, and protects information across all mobile applications and services.",
    url: "https://jandhtechnology.com/privacy",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="Legal"
            title="Privacy Policy"
            lastUpdated={LAST_UPDATED}
            effectiveDate={EFFECTIVE_DATE}
          />

          <div className="space-y-5">
            <LegalP>
              This Privacy Policy describes how J&amp;H Technology LLC (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; &ldquo;our,&rdquo; or &ldquo;Company&rdquo;) collects, uses, shares,
              and protects information across all mobile applications, websites, and services
              (collectively, our &ldquo;Apps&rdquo;).
            </LegalP>
            <LegalP>
              <strong className="text-white">Scope:</strong> This policy applies to information we
              collect through our Apps and from communications you have with us. It does not apply
              to third-party services that have their own privacy policies, even if those services
              are integrated with or linked from our Apps.
            </LegalP>
            <LegalP emphasis>
              BY DOWNLOADING, INSTALLING, OR USING ANY OF OUR APPS, YOU CONSENT TO THE PRACTICES
              DESCRIBED IN THIS POLICY. IF YOU DO NOT AGREE, DO NOT USE OUR APPS.
            </LegalP>
          </div>

          <LegalSection id="information-we-collect" number="1" title="Information We Collect">
            <LegalSubSection number="1.1" title="Information You Provide">
              <LegalP>We collect information you provide directly when you:</LegalP>
              <LegalList>
                <li>Create an account (email address, name, password or sign-in token)</li>
                <li>
                  Sign in via a third-party identity provider (Apple, Google) — we receive a unique
                  identifier and any name/email you authorize
                </li>
                <li>
                  Configure a business or company profile (business name, address, phone, logo,
                  branding)
                </li>
                <li>
                  Add customers, jobs, quotes, invoices, expenses, inventory, or other records
                </li>
                <li>Upload photos, sketches, or other content</li>
                <li>Send messages or contact us for support</li>
                <li>Respond to surveys or provide feedback</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="1.2" title="Information Collected Automatically">
              <LegalP>When you use our Apps, we automatically collect:</LegalP>
              <LegalList>
                <li>
                  <strong className="text-white">Device information:</strong> device model,
                  operating system and version, unique device identifiers, language, time zone
                </li>
                <li>
                  <strong className="text-white">Usage data:</strong> features accessed, screens
                  viewed, actions taken, session duration, crashes and errors
                </li>
                <li>
                  <strong className="text-white">Log data:</strong> IP address, request times,
                  approximate location derived from IP
                </li>
                <li>
                  <strong className="text-white">Diagnostics:</strong> performance metrics and
                  anonymized stack traces submitted by error-monitoring tools
                </li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="1.3" title="Payment Information">
              <LegalP>
                Subscription purchases are processed by the Apple App Store or Google Play Store.
                We do not collect or store your full payment card details. We receive only a
                purchase confirmation, the product purchased, and a transaction identifier from the
                relevant store.
              </LegalP>
              <LegalP>
                Where our Apps allow you to accept payments from your own customers (for example,
                via Stripe), payment card information is handled directly by that payment processor
                under their own privacy policy. We receive only metadata required to associate the
                payment with your account.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="1.4" title="Permissions You Grant">
              <LegalP>
                Some features require operating-system permissions. You can grant or revoke each
                permission at any time in your device settings:
              </LegalP>
              <LegalList>
                <li>
                  <strong className="text-white">Camera:</strong> capture job-site photos, scan
                  barcodes
                </li>
                <li>
                  <strong className="text-white">Photo Library:</strong> attach existing photos
                </li>
                <li>
                  <strong className="text-white">Notifications:</strong> deliver job, quote, and
                  payment alerts
                </li>
                <li>
                  <strong className="text-white">Location (when applicable):</strong> tag job
                  addresses, calculate mileage
                </li>
                <li>
                  <strong className="text-white">Contacts (when applicable):</strong> add customers
                  from your address book
                </li>
              </LegalList>
              <LegalP>
                We do not access permissions you have not granted, and revoking a permission only
                disables the corresponding feature.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="1.5" title="Information from Third Parties">
              <LegalP>
                If you connect an Apple ID or Google account to sign in, we receive a unique
                identifier and the name and email you authorize. If you connect an external
                accounting service (for example, QuickBooks), we receive only the data you
                explicitly authorize that service to share with us.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="1.6" title="Google API Services (HandyBook Calendar & Drive)">
              <LegalP>
                If you connect your Google account in HandyBook, we access only the following Google
                data, and only to power the features you choose to turn on:
              </LegalP>
              <LegalList>
                <li>
                  <strong className="text-white">Google Calendar (calendar.events):</strong> to add and
                  update the events HandyBook creates for your scheduled jobs. We do not read, modify,
                  or delete your other calendar events, calendars, or settings.
                </li>
                <li>
                  <strong className="text-white">Google Drive (drive.file):</strong> to create and
                  update only the backup files HandyBook generates — your &ldquo;Handyman Book
                  Records&rdquo; folder, its spreadsheets, and quote/invoice PDFs. We cannot access any
                  other files in your Google Drive.
                </li>
              </LegalList>
              <LegalP>
                HandyBook&rsquo;s use and transfer of information received from Google APIs adheres to
                the{' '}
                <a
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google API Services User Data Policy
                </a>
                , including its Limited Use requirements. This Google data is used solely to provide
                these features; it is never sold or shared for advertising, and is not used to develop,
                improve, or train generalized or large language AI models. You can revoke access at any
                time in your Google Account security settings or by disconnecting Google in HandyBook.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="how-we-use" number="2" title="How We Use Information">
            <LegalP>We use information to:</LegalP>
            <LegalList>
              <li>Provide, operate, and maintain our Apps</li>
              <li>Authenticate you and protect your account</li>
              <li>Process subscriptions and payments</li>
              <li>Sync your data across your devices</li>
              <li>Send transactional notifications (job updates, quote acceptance, payment receipts)</li>
              <li>Diagnose crashes, fix bugs, and improve performance</li>
              <li>Develop new features and understand how our Apps are used</li>
              <li>Communicate with you about updates, security, and support</li>
              <li>Detect, investigate, and prevent fraud or abuse</li>
              <li>Comply with legal obligations and enforce our Terms</li>
            </LegalList>
            <LegalP>
              We do not sell your personal information, and we do not use your content to train
              third-party advertising models.
            </LegalP>
          </LegalSection>

          <LegalSection id="legal-bases" number="3" title="Legal Bases for Processing (EEA / UK)">
            <LegalP>
              If you are located in the European Economic Area or the United Kingdom, we rely on
              the following legal bases:
            </LegalP>
            <LegalList>
              <li>
                <strong className="text-white">Contract:</strong> to provide the Apps you have
                signed up for
              </li>
              <li>
                <strong className="text-white">Legitimate interests:</strong> to secure our Apps,
                prevent fraud, and improve our services
              </li>
              <li>
                <strong className="text-white">Consent:</strong> for optional features such as push
                notifications or location access
              </li>
              <li>
                <strong className="text-white">Legal obligation:</strong> where processing is
                required by law
              </li>
            </LegalList>
          </LegalSection>

          <LegalSection id="how-we-share" number="4" title="How We Share Information">
            <LegalSubSection number="4.1" title="Service Providers">
              <LegalP>
                We share information with vendors who perform services on our behalf under written
                data-protection terms. Categories include:
              </LegalP>
              <LegalList>
                <li>
                  <strong className="text-white">Cloud hosting and database:</strong> to store your
                  account and content
                </li>
                <li>
                  <strong className="text-white">Authentication providers:</strong> Apple and
                  Google for sign-in
                </li>
                <li>
                  <strong className="text-white">App distribution:</strong> Apple App Store and
                  Google Play Store
                </li>
                <li>
                  <strong className="text-white">Push notification delivery:</strong> Apple Push
                  Notification service, Firebase Cloud Messaging, and Expo
                </li>
                <li>
                  <strong className="text-white">Payment processing:</strong> Stripe and the
                  relevant app store for subscription purchases
                </li>
                <li>
                  <strong className="text-white">Email delivery:</strong> for transactional emails
                  such as quote acceptance and password reset
                </li>
                <li>
                  <strong className="text-white">Error monitoring and analytics:</strong> to
                  diagnose crashes and improve reliability
                </li>
                <li>
                  <strong className="text-white">AI and machine-learning providers:</strong> when
                  you opt in to AI-assisted features, we transmit only the content necessary for
                  the feature you invoked
                </li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="4.2" title="Legal and Safety">
              <LegalP>We may disclose information when we believe in good faith it is necessary to:</LegalP>
              <LegalList>
                <li>Comply with applicable law, subpoena, court order, or governmental request</li>
                <li>Enforce our Terms or investigate potential violations</li>
                <li>
                  Detect, prevent, or address fraud, security, or technical issues
                </li>
                <li>Protect the rights, property, or safety of users, the public, or us</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="4.3" title="Business Transfers">
              <LegalP>
                If we are involved in a merger, acquisition, financing, or sale of assets,
                information may be transferred as part of that transaction. We will notify users
                of any change in ownership or use of personal information.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="4.4" title="With Your Direction">
              <LegalP>
                We share information at your explicit direction — for example, when you generate a
                PDF quote or invoice and email or share it with your customer.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="4.5" title="No Sale of Personal Information">
              <LegalP>
                We do not sell your personal information for monetary or other valuable
                consideration, and we do not share it for cross-context behavioral advertising as
                those terms are defined under U.S. state privacy laws.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="retention" number="5" title="Data Retention">
            <LegalP>
              We retain personal information for as long as your account is active and as needed to
              provide our Apps. Specifically:
            </LegalP>
            <LegalList>
              <li>
                <strong className="text-white">Account data:</strong> until you delete your account
              </li>
              <li>
                <strong className="text-white">Business records (jobs, invoices, expenses):</strong>{" "}
                until you delete them or your account, plus a reasonable period to comply with tax
                and legal obligations
              </li>
              <li>
                <strong className="text-white">Diagnostic logs:</strong> typically up to 90 days
              </li>
              <li>
                <strong className="text-white">Backups:</strong> retained for a limited period
                after deletion to enable recovery
              </li>
            </LegalList>
            <LegalP>
              When you delete your account, we delete or anonymize personal information within a
              reasonable period, except where retention is required by law or to resolve disputes.
            </LegalP>
          </LegalSection>

          <LegalSection id="security" number="6" title="Data Security">
            <LegalP>
              We use technical and organizational measures designed to protect personal
              information, including:
            </LegalP>
            <LegalList>
              <li>Encryption in transit (TLS) for all network communication</li>
              <li>Encryption at rest for stored data</li>
              <li>Row-level security rules so each account can access only its own data</li>
              <li>Hashed credentials and short-lived authentication tokens</li>
              <li>Restricted access to production systems and audit logging</li>
            </LegalList>
            <LegalP>
              No method of transmission or storage is 100% secure. You are responsible for keeping
              your account credentials confidential and notifying us promptly of any suspected
              unauthorized access.
            </LegalP>
          </LegalSection>

          <LegalSection id="your-rights" number="7" title="Your Rights and Choices">
            <LegalSubSection number="7.1" title="Access, Correction, and Deletion">
              <LegalP>You can:</LegalP>
              <LegalList>
                <li>View and edit most of your information directly inside the App</li>
                <li>
                  Request a copy of the personal information we hold about you, or request
                  correction or deletion, by emailing{" "}
                  <a
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                    href="mailto:jarrod@jandhtechnology.com"
                  >
                    jarrod@jandhtechnology.com
                  </a>
                </li>
                <li>Delete your account from within the App at any time</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="7.2" title="Communication Preferences">
              <LegalP>
                You can manage push-notification settings in your device settings. Transactional
                emails (account, security, billing) are required to operate the Apps and cannot be
                disabled while you have an active account.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="7.3" title="California Residents (CCPA / CPRA)">
              <LegalP>
                If you are a California resident, you have the right to:
              </LegalP>
              <LegalList>
                <li>Know what personal information we collect, use, and disclose</li>
                <li>Request deletion of your personal information</li>
                <li>Correct inaccurate personal information</li>
                <li>
                  Opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal
                  information — we do not sell or share personal information as those terms are
                  defined
                </li>
                <li>Limit use of sensitive personal information</li>
                <li>Be free from retaliation for exercising your rights</li>
              </LegalList>
              <LegalP>
                To exercise these rights, email{" "}
                <a
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                  href="mailto:jarrod@jandhtechnology.com"
                >
                  jarrod@jandhtechnology.com
                </a>
                . We may need to verify your identity before responding.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="7.4" title="EEA / UK / Swiss Residents">
              <LegalP>
                You have the right to access, rectify, erase, restrict, or object to processing of
                your personal information, and the right to data portability. You also have the
                right to lodge a complaint with your local supervisory authority. To exercise these
                rights, email{" "}
                <a
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                  href="mailto:jarrod@jandhtechnology.com"
                >
                  jarrod@jandhtechnology.com
                </a>
                .
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="7.5" title="Other U.S. State Privacy Laws">
              <LegalP>
                Residents of states with comprehensive privacy laws (including but not limited to
                Virginia, Colorado, Connecticut, Utah, and Texas) may have similar rights to
                access, correct, delete, and obtain a copy of their personal information, and to
                opt out of certain processing. Contact us at the address above to exercise these
                rights.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="childrens-privacy" number="8" title="Children's Privacy">
            <LegalP>
              Our Apps are not directed to children under 13, and we do not knowingly collect
              personal information from children under 13. If you believe a child has provided us
              with personal information, contact us at{" "}
              <a
                className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                href="mailto:jarrod@jandhtechnology.com"
              >
                jarrod@jandhtechnology.com
              </a>{" "}
              and we will promptly delete it.
            </LegalP>
          </LegalSection>

          <LegalSection id="international-transfers" number="9" title="International Data Transfers">
            <LegalP>
              We are based in the United States, and our service providers may process information
              in the United States and other countries. When we transfer personal information
              outside your jurisdiction, we rely on appropriate safeguards (such as Standard
              Contractual Clauses) to protect that information.
            </LegalP>
          </LegalSection>

          <LegalSection id="cookies" number="10" title="Cookies and Tracking Technologies">
            <LegalP>
              Our marketing website (jandhtechnology.com) uses minimal cookies for essential
              functionality and aggregate analytics. Our mobile Apps do not use browser cookies but
              do use local storage on your device to remember your preferences and authentication.
            </LegalP>
            <LegalP>
              We do not use cross-context behavioral advertising trackers. We honor the Global
              Privacy Control (&ldquo;GPC&rdquo;) signal where applicable.
            </LegalP>
          </LegalSection>

          <LegalSection id="push-notifications" number="11" title="Push Notifications">
            <LegalP>
              With your permission, we send push notifications for events such as quote
              acceptances, payment receipts, and job updates. You can disable push notifications at
              any time in your device settings; doing so will not affect your ability to use the
              Apps.
            </LegalP>
          </LegalSection>

          <LegalSection id="third-party" number="12" title="Third-Party Services and Links">
            <LegalP>
              Our Apps may link to or integrate with third-party services (for example, payment
              processors, accounting tools, mapping services). Those services are governed by their
              own privacy policies, and we are not responsible for their practices. We encourage
              you to review their policies before sharing information with them.
            </LegalP>
          </LegalSection>

          <LegalSection id="changes" number="13" title="Changes to This Privacy Policy">
            <LegalP>
              We may update this Privacy Policy from time to time. When we make material changes,
              we will update the &ldquo;Last Updated&rdquo; date at the top of this page and, where
              appropriate, notify you through the App or by email. Your continued use of our Apps
              after the changes take effect constitutes acceptance of the updated policy.
            </LegalP>
          </LegalSection>

          <LegalSection id="contact" number="14" title="Contact Us">
            <LegalP>
              If you have questions about this Privacy Policy or our privacy practices, contact us:
            </LegalP>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-2">
              <p className="text-white font-semibold">J&amp;H Technology LLC</p>
              <p className="text-[#c8c8d0]">
                Email:{" "}
                <a
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                  href="mailto:jarrod@jandhtechnology.com"
                >
                  jarrod@jandhtechnology.com
                </a>
              </p>
              <p className="text-[#c8c8d0]">
                Website:{" "}
                <a
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                  href="https://jandhtechnology.com"
                >
                  jandhtechnology.com
                </a>
              </p>
              <p className="text-[#c8c8d0]">
                Terms of Service:{" "}
                <a
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                  href="/terms"
                >
                  jandhtechnology.com/terms
                </a>
              </p>
            </div>
          </LegalSection>

          <div className="mt-16 pt-8 border-t border-white/[0.06] text-center text-sm text-[#666]">
            Copyright &copy; {new Date().getFullYear()} J&amp;H Technology LLC. All rights reserved.
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
