import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs, SlangHeader } from "@/components/slang/ui";
import { LINK, PageShell, StoreBadges } from "@/components/apps/ui";
import { getApp } from "@/lib/apps";
import { pageMetadata } from "@/lib/apps-metadata";
import { GUIDES, guidePath } from "@/lib/repairradar";
import { SITE_URL } from "@/lib/slang";
import { breadcrumbJsonLd } from "@/lib/slang-jsonld";

const URL = `${SITE_URL}/repairradar/guides`;

export const metadata = pageMetadata({
  title: "Home Maintenance Guides | RepairRadar",
  description:
    "Home maintenance guides from RepairRadar: a seasonal checklist, tracking repair costs for taxes, warranty records, shared homes and property manager logs.",
  path: "/repairradar/guides",
});

export default function GuidesPage() {
  const app = getApp("repairradar");
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Apps", url: `${SITE_URL}/apps` },
            { name: "RepairRadar", url: `${SITE_URL}/repairradar` },
            { name: "Guides", url: URL },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${URL}#guides`,
            name: "RepairRadar home maintenance guides",
            itemListElement: GUIDES.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}${guidePath(g.slug)}`,
              name: g.title,
            })),
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Apps", href: "/apps" },
          { name: "RepairRadar", href: "/repairradar" },
          { name: "Guides" },
        ]}
      />
      <SlangHeader eyebrow="RepairRadar guides" title="Home maintenance guides">
        <p className="text-lg text-[#d4d4dc] leading-relaxed max-w-3xl">
          Practical guides to keeping a home in good shape and keeping the records that prove it. Each one starts with
          a short answer.
        </p>
      </SlangHeader>
      <ul className="space-y-4 mb-14">
        {GUIDES.map((g) => (
          <li key={g.slug} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              <Link href={guidePath(g.slug)} className="hover:text-indigo-200 underline-offset-2 hover:underline">
                {g.title}
              </Link>
            </h2>
            <p className="text-[#c4c4cc] leading-relaxed">{g.description}</p>
          </li>
        ))}
      </ul>
      <aside
        aria-labelledby="guides-app-heading"
        className="rounded-2xl p-6 md:p-8 bg-gradient-to-br from-indigo-500/15 to-purple-600/15 border border-indigo-400/30"
      >
        <h2 id="guides-app-heading" className="text-2xl font-semibold text-white mb-3">
          Keep the records in RepairRadar
        </h2>
        <p className="text-[#d4d4dc] leading-relaxed mb-6 max-w-2xl">
          Log repairs with costs and photos, schedule maintenance reminders and track warranties on iPhone and iPad.{" "}
          <Link href="/repairradar" className={LINK}>
            Learn about RepairRadar
          </Link>
          .
        </p>
        <StoreBadges app={app} />
      </aside>
    </PageShell>
  );
}
