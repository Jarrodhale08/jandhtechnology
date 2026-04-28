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
  title: "Terms of Service | J&H Technology",
  description:
    "Terms of Service governing your use of all mobile applications and services developed and published by J&H Technology LLC.",
  alternates: { canonical: "https://jandhtechnology.com/terms" },
  openGraph: {
    title: "Terms of Service | J&H Technology",
    description:
      "Terms of Service governing your use of all mobile applications and services developed and published by J&H Technology LLC.",
    url: "https://jandhtechnology.com/terms",
    siteName: "J&H Technology",
    type: "article",
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <LegalHeader
            eyebrow="Legal"
            title="Terms of Service"
            lastUpdated={LAST_UPDATED}
            effectiveDate={EFFECTIVE_DATE}
          />

          <div className="space-y-5">
            <LegalP>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of all mobile applications
              and services (&ldquo;Apps&rdquo;) developed and published by J&amp;H Technology LLC
              (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our,&rdquo; or &ldquo;Company&rdquo;).
            </LegalP>
            <LegalP>
              <strong className="text-white">IMPORTANT:</strong> These Terms may be updated at any
              time without prior notice. Users should check this page regularly for updates.
              Continued use of our Apps after any changes constitutes acceptance of the updated
              Terms.
            </LegalP>
            <LegalP emphasis>
              BY DOWNLOADING, INSTALLING, OR USING ANY OF OUR APPS, YOU AGREE TO BE BOUND BY THESE
              TERMS. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE OUR APPS.
            </LegalP>
          </div>

          <LegalSection id="acceptance" number="1" title="Acceptance of Terms">
            <LegalSubSection number="1.1" title="Agreement">
              <LegalP>By accessing or using our Apps, you confirm that:</LegalP>
              <LegalList>
                <li>
                  You are at least 13 years of age (or the minimum age required in your
                  jurisdiction)
                </li>
                <li>You have the legal capacity to enter into this agreement</li>
                <li>You will comply with these Terms and all applicable laws</li>
                <li>
                  If using on behalf of an organization, you have authority to bind that
                  organization to these Terms
                </li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="1.2" title="Additional Terms">
              <LegalP>
                Certain features may be subject to additional terms, which will be presented to you
                when you access those features. Such additional terms are incorporated into these
                Terms by reference.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="account" number="2" title="Account Registration">
            <LegalSubSection number="2.1" title="Account Creation">
              <LegalP>
                To access certain features, you may need to create an account. You agree to:
              </LegalP>
              <LegalList>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as needed</li>
                <li>Keep your login credentials confidential</li>
                <li>Notify us immediately of unauthorized account access</li>
                <li>Accept responsibility for all activities under your account</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="2.2" title="Account Security">
              <LegalP>
                You are responsible for maintaining the security of your account. We are not liable
                for any loss or damage arising from your failure to protect your account
                credentials.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="2.3" title="Account Termination">
              <LegalP>
                We reserve the right to suspend or terminate your account at any time for:
              </LegalP>
              <LegalList>
                <li>Violation of these Terms</li>
                <li>Fraudulent, abusive, or illegal activity</li>
                <li>Extended periods of inactivity</li>
                <li>Any reason at our sole discretion</li>
              </LegalList>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="subscriptions" number="3" title="Subscriptions and Payments">
            <LegalSubSection number="3.1" title="Free and Premium Features">
              <LegalP>
                Our Apps may offer both free and premium (paid) features. Free features are subject
                to limitations that may change at any time.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="3.2" title="Subscription Plans">
              <LegalP>Premium subscriptions may be offered as:</LegalP>
              <LegalList>
                <li>
                  <strong className="text-white">Monthly:</strong> Billed every month
                </li>
                <li>
                  <strong className="text-white">Annual:</strong> Billed once per year
                </li>
                <li>
                  <strong className="text-white">Lifetime:</strong> One-time payment for perpetual
                  access
                </li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="3.3" title="Billing and Payment">
              <LegalList>
                <li>Payments are processed through Apple App Store or Google Play Store</li>
                <li>Subscription fees are charged in advance for each billing period</li>
                <li>Prices are in US dollars unless otherwise specified</li>
                <li>Taxes may apply based on your location</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="3.4" title="Free Trials">
              <LegalP>We may offer free trial periods for premium features:</LegalP>
              <LegalList>
                <li>Trial length and terms will be specified at sign-up</li>
                <li>You may be required to provide payment information</li>
                <li>If you don&apos;t cancel before the trial ends, you will be charged</li>
                <li>Trial offers are typically limited to one per user</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="3.5" title="Auto-Renewal">
              <LegalP>Subscriptions automatically renew unless:</LegalP>
              <LegalList>
                <li>You cancel at least 24 hours before the renewal date</li>
                <li>We discontinue the subscription service</li>
              </LegalList>
              <LegalP>To cancel, use your device&apos;s subscription management:</LegalP>
              <LegalList>
                <li>
                  <strong className="text-white">iOS:</strong> Settings &gt; [Your Name] &gt;
                  Subscriptions
                </li>
                <li>
                  <strong className="text-white">Android:</strong> Google Play Store &gt;
                  Subscriptions
                </li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="3.6" title="Refund Policy">
              <LegalP>Refunds are handled by Apple or Google according to their policies:</LegalP>
              <LegalList>
                <li>
                  Apple:{" "}
                  <a
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                    href="https://support.apple.com/en-us/HT204084"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    support.apple.com/en-us/HT204084
                  </a>
                </li>
                <li>
                  Google:{" "}
                  <a
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                    href="https://support.google.com/googleplay/answer/2479637"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    support.google.com/googleplay/answer/2479637
                  </a>
                </li>
              </LegalList>
              <LegalP>
                We do not directly process refunds. Contact the respective app store for refund
                requests.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="3.7" title="Price Changes">
              <LegalP>We reserve the right to change subscription prices. Price changes will:</LegalP>
              <LegalList>
                <li>Not affect your current subscription period</li>
                <li>Take effect at the next renewal after notice is provided</li>
                <li>Be communicated through the app or email</li>
              </LegalList>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="license" number="4" title="License and Intellectual Property">
            <LegalSubSection number="4.1" title="License Grant">
              <LegalP>
                Subject to these Terms, we grant you a limited, non-exclusive, non-transferable,
                revocable license to:
              </LegalP>
              <LegalList>
                <li>Download and install our Apps on your personal devices</li>
                <li>Use our Apps for personal, non-commercial purposes</li>
                <li>Access premium features if you have an active subscription</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="4.2" title="License Restrictions">
              <LegalP>You may NOT:</LegalP>
              <LegalList>
                <li>Copy, modify, or distribute our Apps or their content</li>
                <li>Reverse engineer, decompile, or disassemble our Apps</li>
                <li>Remove any copyright or proprietary notices</li>
                <li>Use our Apps for commercial purposes without authorization</li>
                <li>Sublicense, sell, or transfer your license to others</li>
                <li>Use our Apps in any way that violates applicable laws</li>
                <li>Attempt to bypass security features or access restrictions</li>
                <li>Use automated systems to access our Apps (bots, scrapers)</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="4.3" title="Intellectual Property">
              <LegalP>All rights, title, and interest in our Apps, including but not limited to:</LegalP>
              <LegalList>
                <li>Software code and architecture</li>
                <li>User interface and design</li>
                <li>Graphics, icons, and images</li>
                <li>Text, content, and documentation</li>
                <li>Trademarks, logos, and brand elements</li>
              </LegalList>
              <LegalP>
                are owned by J&amp;H Technology LLC or our licensors and are protected by
                intellectual property laws.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="4.4" title="Your Content">
              <LegalP>
                You retain ownership of content you create within our Apps. By using our Apps, you
                grant us a license to:
              </LegalP>
              <LegalList>
                <li>Store and process your content to provide our services</li>
                <li>Create backups for data protection</li>
                <li>Display your content to you across your devices</li>
              </LegalList>
              <LegalP>We do not claim ownership of your personal content.</LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="user-conduct" number="5" title="User Conduct">
            <LegalSubSection number="5.1" title="Acceptable Use">
              <LegalP>
                You agree to use our Apps only for lawful purposes and in accordance with these
                Terms. You will not:
              </LegalP>
              <LegalList>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Upload malicious code, viruses, or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Impersonate any person or entity</li>
                <li>Collect information about other users without consent</li>
                <li>Use our Apps for spam or unsolicited communications</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="5.2" title="Content Standards">
              <LegalP>
                If our Apps allow user-generated content, you agree not to post content that:
              </LegalP>
              <LegalList>
                <li>Is illegal, harmful, or offensive</li>
                <li>Infringes on intellectual property rights</li>
                <li>Contains personal information of others without consent</li>
                <li>Is fraudulent, deceptive, or misleading</li>
                <li>Contains malware or malicious code</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="5.3" title="Enforcement">
              <LegalP>We may, at our sole discretion:</LegalP>
              <LegalList>
                <li>Remove content that violates these Terms</li>
                <li>Suspend or terminate accounts for violations</li>
                <li>Report illegal activities to law enforcement</li>
                <li>Take legal action against violators</li>
              </LegalList>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="privacy" number="6" title="Privacy">
            <LegalP>
              Your privacy is important to us. Our collection and use of personal information is
              governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </LegalP>
            <LegalP>
              By using our Apps, you consent to the data practices described in our{" "}
              <a
                className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                href="/privacy"
              >
                Privacy Policy
              </a>
              .
            </LegalP>
          </LegalSection>

          <LegalSection id="disclaimers" number="7" title="Disclaimers">
            <LegalSubSection number="7.1" title="&ldquo;As Is&rdquo; Basis">
              <LegalP emphasis>
                OUR APPS ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT
                WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </LegalP>
              <LegalList>
                <li>Merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Accuracy or completeness of content</li>
                <li>Uninterrupted or error-free operation</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="7.2" title="No Professional Advice">
              <LegalP>
                Our Apps are for informational and personal use only. They do not provide:
              </LegalP>
              <LegalList>
                <li>Medical, health, or fitness advice</li>
                <li>Financial, legal, or tax advice</li>
                <li>Professional guidance of any kind</li>
              </LegalList>
              <LegalP>Always consult qualified professionals for such matters.</LegalP>
            </LegalSubSection>
            <LegalSubSection number="7.3" title="Third-Party Services">
              <LegalP>
                Our Apps may integrate with or link to third-party services. We are not responsible
                for the availability, accuracy, or practices of third parties.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="liability" number="8" title="Limitation of Liability">
            <LegalSubSection number="8.1" title="Exclusion of Damages">
              <LegalP emphasis>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, J&amp;H TECHNOLOGY LLC AND ITS OFFICERS,
                DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR:
              </LegalP>
              <LegalList>
                <li>Indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, revenue, or data</li>
                <li>Business interruption</li>
                <li>Personal injury or property damage</li>
                <li>Any damages arising from your use of our Apps</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="8.2" title="Maximum Liability">
              <LegalP emphasis>
                OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM YOUR USE OF OUR APPS SHALL NOT
                EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE
                HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="8.3" title="Essential Terms">
              <LegalP>
                The limitations in this section are essential terms of this agreement. Some
                jurisdictions do not allow certain limitations, so some of the above may not apply
                to you.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="indemnification" number="9" title="Indemnification">
            <LegalP>
              You agree to indemnify, defend, and hold harmless J&amp;H Technology LLC and its
              officers, directors, employees, and agents from any claims, damages, losses,
              liabilities, and expenses (including legal fees) arising from:
            </LegalP>
            <LegalList>
              <li>Your use of our Apps</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your user content</li>
              <li>Your negligence or misconduct</li>
            </LegalList>
          </LegalSection>

          <LegalSection id="dispute-resolution" number="10" title="Dispute Resolution">
            <LegalSubSection number="10.1" title="Informal Resolution">
              <LegalP>
                Before initiating formal proceedings, you agree to contact us at{" "}
                <a
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                  href="mailto:jarrod@jandhtechnology.com"
                >
                  jarrod@jandhtechnology.com
                </a>{" "}
                to attempt to resolve any dispute informally. We will attempt to resolve disputes
                within 30 days.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="10.2" title="Binding Arbitration">
              <LegalP>
                If informal resolution fails, any dispute shall be resolved by binding arbitration
                administered by the American Arbitration Association under its Consumer Arbitration
                Rules.
              </LegalP>
              <LegalList>
                <li>Arbitration will be conducted in English</li>
                <li>The arbitrator&apos;s decision is final and binding</li>
                <li>Judgment may be entered in any court of competent jurisdiction</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="10.3" title="Class Action Waiver">
              <LegalP emphasis>
                YOU AGREE TO RESOLVE DISPUTES ON AN INDIVIDUAL BASIS. YOU WAIVE THE RIGHT TO
                PARTICIPATE IN CLASS ACTIONS, CLASS ARBITRATIONS, OR REPRESENTATIVE ACTIONS.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="10.4" title="Exceptions">
              <LegalP>The following disputes are not subject to arbitration:</LegalP>
              <LegalList>
                <li>Claims for injunctive or equitable relief</li>
                <li>Intellectual property disputes</li>
                <li>Small claims court matters</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="10.5" title="Governing Law">
              <LegalP>
                These Terms shall be governed by the laws of the State of Michigan, United
                States, without regard to conflict of law principles.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="termination" number="11" title="Termination">
            <LegalSubSection number="11.1" title="Termination by You">
              <LegalP>You may terminate your use of our Apps at any time by:</LegalP>
              <LegalList>
                <li>Deleting the App from your devices</li>
                <li>Canceling any active subscriptions</li>
                <li>Requesting account deletion</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="11.2" title="Termination by Us">
              <LegalP>
                We may terminate or suspend your access immediately, without notice, for:
              </LegalP>
              <LegalList>
                <li>Breach of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Extended inactivity</li>
                <li>Discontinuation of the service</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="11.3" title="Effect of Termination">
              <LegalP>Upon termination:</LegalP>
              <LegalList>
                <li>Your license to use our Apps ends immediately</li>
                <li>We may delete your account and data</li>
                <li>Subscription fees already paid are non-refundable</li>
                <li>Sections of these Terms that should survive will remain in effect</li>
              </LegalList>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="modifications" number="12" title="Modifications to Apps and Terms">
            <LegalSubSection number="12.1" title="Changes to Apps">
              <LegalP>We reserve the right to:</LegalP>
              <LegalList>
                <li>Modify, update, or discontinue any feature</li>
                <li>Change the functionality of our Apps</li>
                <li>Limit availability in certain regions</li>
                <li>Require updates for continued use</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="12.2" title="Changes to Terms">
              <LegalP>
                <strong className="text-white">IMPORTANT:</strong> We may revise these Terms at any
                time without prior notice. Changes are effective immediately upon posting.
              </LegalP>
              <LegalP>
                We encourage you to review these Terms regularly. Your continued use of our Apps
                after changes constitutes acceptance of the revised Terms.
              </LegalP>
              <LegalP>
                The &ldquo;Last Updated&rdquo; date at the top indicates when these Terms were last
                modified.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="general" number="13" title="General Provisions">
            <LegalSubSection number="13.1" title="Entire Agreement">
              <LegalP>
                These Terms, together with our Privacy Policy and any additional terms for specific
                features, constitute the entire agreement between you and J&amp;H Technology LLC
                regarding our Apps.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="13.2" title="Severability">
              <LegalP>
                If any provision of these Terms is found unenforceable, the remaining provisions
                will continue in full force and effect.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="13.3" title="Waiver">
              <LegalP>
                Our failure to enforce any right or provision does not constitute a waiver of that
                right or provision.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="13.4" title="Assignment">
              <LegalP>
                You may not assign or transfer your rights under these Terms. We may assign our
                rights to any affiliate or successor.
              </LegalP>
            </LegalSubSection>
            <LegalSubSection number="13.5" title="Notices">
              <LegalP>We may provide notices to you through:</LegalP>
              <LegalList>
                <li>The App interface</li>
                <li>Email to your registered address</li>
                <li>Push notifications (if enabled)</li>
                <li>Posting on our website</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="13.6" title="Force Majeure">
              <LegalP>
                We are not liable for delays or failures due to circumstances beyond our reasonable
                control, including natural disasters, acts of government, or infrastructure
                failures.
              </LegalP>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="specific-app-provisions" number="14" title="Specific App Provisions">
            <LegalSubSection number="14.1" title="Health and Fitness Apps">
              <LegalList>
                <li>Our Apps are not medical devices</li>
                <li>Do not use as a substitute for professional medical advice</li>
                <li>Consult a healthcare provider before starting any fitness program</li>
                <li>
                  We are not responsible for injuries resulting from exercises or activities
                  suggested by our Apps
                </li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="14.2" title="Finance and Budgeting Apps">
              <LegalList>
                <li>Our Apps provide tools for personal finance management only</li>
                <li>We do not provide financial, investment, or tax advice</li>
                <li>We are not responsible for financial decisions made using our Apps</li>
                <li>Verify all calculations independently</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="14.3" title="Productivity Apps">
              <LegalList>
                <li>We are not responsible for data loss due to sync failures</li>
                <li>Maintain your own backups of important information</li>
                <li>We do not guarantee availability of cloud sync features</li>
              </LegalList>
            </LegalSubSection>
            <LegalSubSection number="14.4" title="Lifestyle Apps">
              <LegalList>
                <li>Content and suggestions are for informational purposes only</li>
                <li>User discretion is advised for all recommendations</li>
                <li>Results may vary based on individual circumstances</li>
              </LegalList>
            </LegalSubSection>
          </LegalSection>

          <LegalSection id="contact" number="15" title="Contact Information">
            <LegalP>For questions about these Terms, contact us:</LegalP>
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
            </div>
          </LegalSection>

          <LegalSection id="acknowledgment" number="16" title="Acknowledgment">
            <LegalP emphasis>BY USING OUR APPS, YOU ACKNOWLEDGE THAT:</LegalP>
            <LegalList>
              <li>You have read and understood these Terms</li>
              <li>You agree to be bound by these Terms</li>
              <li>You are of legal age to enter into this agreement</li>
              <li>You have reviewed our Privacy Policy</li>
              <li>You understand that these Terms may change at any time</li>
              <li>You will check regularly for updates to these Terms</li>
            </LegalList>
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
