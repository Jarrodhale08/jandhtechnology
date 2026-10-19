import JsonLd from "@/components/JsonLd";
import type { ReactNode } from "react";
import { AppStoreCta, Breadcrumbs, SlangHeader, SlangSubnav } from "@/components/slang/ui";
import { SITE_URL } from "@/lib/slang";
import { breadcrumbJsonLd, SLANG_INDEX_URL } from "@/lib/slang-jsonld";

export function ListPage({
  path,
  crumb,
  eyebrow,
  title,
  intro,
  ctaHeading,
  children,
}: {
  path: string;
  crumb: string;
  eyebrow: string;
  title: string;
  intro: ReactNode;
  ctaHeading?: string;
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Slang dictionary", url: SLANG_INDEX_URL },
          { name: crumb, url: `${SITE_URL}${path}` },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Slang dictionary", href: "/slang" }, { name: crumb }]} />
      <SlangHeader eyebrow={eyebrow} title={title}>
        <div className="text-lg text-[#d4d4dc] leading-relaxed max-w-3xl space-y-4">{intro}</div>
      </SlangHeader>
      <SlangSubnav current={path} />
      {children}
      <AppStoreCta heading={ctaHeading} />
    </>
  );
}
