import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { APP_STORE_ID } from "@/lib/slang";

export const metadata: Metadata = {
  other: { "apple-itunes-app": `app-id=${APP_STORE_ID}` },
};

export default function SlangLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
      <Footer />
    </>
  );
}
