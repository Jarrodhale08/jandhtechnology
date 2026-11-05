import Link from "next/link";
import { AppCard } from "@/components/apps/ui";
import { APPS } from "@/lib/apps";

export default function Apps() {
  return (
    <section id="apps" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
            Our Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Apps We&apos;ve
            <br />
            <span className="gradient-text">Built & Launched</span>
          </h2>
          <p className="text-[#ababab] text-lg max-w-2xl mx-auto">
            Apps we build and publish ourselves, on the App Store, Google Play and the web.
          </p>
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPS.map((app) => (
            <AppCard key={app.slug} app={app} headingLevel="h3" />
          ))}
        </ul>

        <div className="text-center mt-12 space-y-3">
          <p>
            <Link href="/apps" className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4">
              See every app, with store links and support pages
            </Link>
          </p>
          <p className="text-[#ababab] text-sm">
            Have an app idea?{" "}
            <a href="#contact" className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4">
              Let&apos;s build it together.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
