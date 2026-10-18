import JsonLd from "@/components/JsonLd";
import { AppStoreCta, Breadcrumbs, SlangHeader, SlangSubnav, TermList } from "@/components/slang/ui";
import { APP_NAME, SITE_URL, getAllTerms } from "@/lib/slang";
import { breadcrumbJsonLd, SLANG_INDEX_URL } from "@/lib/slang-jsonld";
import { slangMetadata } from "@/lib/slang-metadata";

export const revalidate = 86400;

export const metadata = slangMetadata({
  title: `Gen Alpha Slang Dictionary: What Kids Are Saying | ${APP_NAME}`,
  description:
    "Gen Alpha slang explained for parents and teachers: skibidi, sigma, Ohio, fanum tax and hundreds more, with definitions, examples, and a safety rating for each term.",
  path: "/slang/gen-alpha",
});

export default async function GenAlphaSlangPage() {
  const all = await getAllTerms();
  const alphaOnly = all.filter((t) => t.generation === "gen-alpha");
  const shared = all.filter((t) => t.generation === "both");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Slang dictionary", url: SLANG_INDEX_URL },
          { name: "Gen Alpha slang", url: `${SLANG_INDEX_URL}/gen-alpha` },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Slang dictionary", href: "/slang" }, { name: "Gen Alpha slang" }]} />
      <SlangHeader eyebrow="Born 2010 and later" title="Gen Alpha slang dictionary">
        <p className="text-lg text-[#c8c8d0] leading-relaxed max-w-3xl">
          Gen Alpha is the generation after Gen Z. Much of their slang comes from Roblox, Fortnite,
          YouTube Shorts, and TikTok, and it changes fast. Here are {alphaOnly.length} terms that
          started with Gen Alpha, plus {shared.length} that Gen Z and Gen Alpha both use.
        </p>
      </SlangHeader>
      <SlangSubnav />
      <section aria-labelledby="alpha-heading" className="mb-12">
        <h2 id="alpha-heading" className="text-2xl font-semibold text-white mb-4">
          Gen Alpha slang terms
        </h2>
        <TermList terms={alphaOnly} />
      </section>
      <section aria-labelledby="shared-heading">
        <h2 id="shared-heading" className="text-2xl font-semibold text-white mb-4">
          Slang shared by Gen Z and Gen Alpha
        </h2>
        <TermList terms={shared} />
      </section>
      <AppStoreCta />
    </>
  );
}
