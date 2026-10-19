import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { APP_STORE_ID, SITE_URL } from "@/lib/slang";
import { mobileApplicationJsonLd, organizationJsonLd } from "@/lib/slang-jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "J&H Technology | Mobile App Development",
  description:
    "J&H Technology crafts high-quality iOS and Android mobile applications, including Slang Decoder. We specialize in React Native, from concept to App Store.",
  keywords: "mobile app development, iOS, Android, React Native, app developer, J&H Technology, Slang Decoder",
  openGraph: {
    title: "J&H Technology | Mobile App Development",
    description: "Crafting software solutions — iOS & Android apps built with React Native.",
    url: `${SITE_URL}/`,
    siteName: "J&H Technology",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary", title: "J&H Technology | Mobile App Development" },
  other: { "apple-itunes-app": `app-id=${APP_STORE_ID}` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#050510] text-[#e2e2e2]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-[#050510]"
        >
          Skip to main content
        </a>
        <JsonLd data={[organizationJsonLd(), mobileApplicationJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
