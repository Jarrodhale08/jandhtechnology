import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { APP_STORE_URL, PLAY_STORE_URL, groupJoinCode, joinLinks, normalizeJoinCode } from "@/lib/coffee-tasting/join";

type Props = { params: Promise<{ code: string }> };

const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2";
const BUTTON =
  "inline-flex items-center justify-center min-h-12 px-6 rounded-full bg-indigo-500 text-white font-semibold hover:bg-indigo-400";

// Session links are private: never indexed, never cached by search, and the page fetches nothing about the session.
export const metadata: Metadata = {
  title: "Join a Coffee Tasting session | J&H Technology",
  description: "Open Coffee Tasting and enter the session code from your host.",
  robots: { index: false, follow: false },
};

export default async function JoinPage({ params }: Props) {
  const { code: raw } = await params;
  const code = normalizeJoinCode(decodeURIComponent(raw));

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-indigo-400 mb-4">Coffee Tasting</p>
          {code ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Join a Coffee Tasting session
              </h1>
              <p className="text-[#c8c8d0] mb-6">Your host&rsquo;s session code is:</p>
              <p
                aria-label={`Session code, ${[...code].join(" ")}`}
                className="text-5xl md:text-6xl font-bold text-white tracking-[0.25em] mb-8 break-words"
              >
                {groupJoinCode(code)}
              </p>
              <p className="mb-8">
                <a className={BUTTON} href={joinLinks(code).custom}>
                  Open in the Coffee Tasting app
                </a>
              </p>
              <p className="text-[#c8c8d0] mb-6">
                If the app doesn&rsquo;t open, install it, then choose Groups, Join with code, and type the code
                above. You don&rsquo;t need an account to join.
              </p>
              <ul className="flex flex-wrap justify-center gap-4 mb-10">
                <li>
                  {APP_STORE_URL ? (
                    <a href={APP_STORE_URL} className={LINK}>
                      Get it on the App Store
                    </a>
                  ) : (
                    <span className="text-[#8a8a94]">App Store: coming soon</span>
                  )}
                </li>
                <li>
                  <a href={PLAY_STORE_URL} className={LINK}>
                    Get it on Google Play
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                That link doesn&rsquo;t look right
              </h1>
              <p className="text-[#c8c8d0] mb-8">
                Session codes are six letters and numbers. Ask your host to send the link again, or open Coffee
                Tasting and choose Groups, then Join with code.
              </p>
            </>
          )}
          <p className="text-sm text-[#8a8a94]">
            Questions? See{" "}
            <a className={LINK} href="/coffee-tasting/support">
              support
            </a>{" "}
            or our{" "}
            <a className={LINK} href="/coffee-tasting/privacy">
              privacy policy
            </a>
            .
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
