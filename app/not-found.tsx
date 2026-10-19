import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found | J&H Technology",
  robots: { index: false },
};

const LINK = "text-indigo-300 hover:text-indigo-200 underline underline-offset-2 inline-flex min-h-8 items-center";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-indigo-300 mb-4">Error 404</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Page not found</h1>
          <p className="text-lg text-[#d4d4dc] leading-relaxed mb-6">
            We could not find that page. It may have moved, or the address may be mistyped.
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/" className={LINK}>Go to the J&H Technology home page</Link>
            </li>
            <li>
              <Link href="/slang" className={LINK}>Browse the slang dictionary</Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
