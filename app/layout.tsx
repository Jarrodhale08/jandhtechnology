import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "J&H Technology | Mobile App Development",
  description:
    "J&H Technology crafts high-quality iOS and Android mobile applications. We specialize in React Native development, delivering polished apps from concept to App Store.",
  keywords: "mobile app development, iOS, Android, React Native, app developer, J&H Technology",
  openGraph: {
    title: "J&H Technology | Mobile App Development",
    description: "Crafting software solutions — iOS & Android apps built with React Native.",
    url: "https://jandhtechnology.com",
    siteName: "J&H Technology",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#050510] text-[#e2e2e2]">
        {children}
      </body>
    </html>
  );
}
