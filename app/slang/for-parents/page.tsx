import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import {
  AppStoreCta,
  Breadcrumbs,
  SLANG_LINK,
  SlangHeader,
  SlangSubnav,
  TermList,
} from "@/components/slang/ui";
import { APP_NAME, SITE_URL, getAllTerms } from "@/lib/slang";
import { breadcrumbJsonLd, mobileApplicationJsonLd, SLANG_INDEX_URL } from "@/lib/slang-jsonld";
import { slangMetadata } from "@/lib/slang-metadata";

export const revalidate = 86400;

export const metadata = slangMetadata({
  title: `Slang Every Parent Should Know: Safety Guide | ${APP_NAME}`,
  description:
    "Which Gen Z and Gen Alpha slang terms carry a parent alert, how our safety ratings work, and how to talk with your kid about slang. Meanings are in Slang Decoder.",
  path: "/slang/for-parents",
});

const TALK_TIPS = [
  {
    title: "Ask, do not accuse",
    body: "Try “I keep seeing this word online, what does it actually mean?” Kids are far more open when they get to be the expert.",
  },
  {
    title: "Stay calm about edgy words",
    body: "Most slang is harmless, and a lot of edgy slang is just kids testing boundaries. Save the serious talk for the terms that point to real risk.",
  },
  {
    title: "Take risk signals seriously",
    body: "Coded words for self-harm, drugs, or meeting strangers deserve a direct, private conversation. Listen first, then decide on next steps together.",
  },
  {
    title: "Talk about where they heard it",
    body: "Ask which game, app, or creator a word came from. That tells you more about their online world than the word itself.",
  },
  {
    title: "Keep the door open",
    body: "End by making it clear they can come to you about anything they see online without automatically losing their phone or games.",
  },
];

export default async function ForParentsPage() {
  const all = await getAllTerms();
  const flagged = all.filter((t) => t.safety === "inappropriate");
  const edgy = all.filter((t) => t.safety === "edgy");

  return (
    <>
      <JsonLd
        data={[
          mobileApplicationJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Slang dictionary", url: SLANG_INDEX_URL },
            { name: "Slang for parents", url: `${SLANG_INDEX_URL}/for-parents` },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Slang dictionary", href: "/slang" }, { name: "For parents" }]} />
      <SlangHeader eyebrow="Parent guide" title="Slang every parent should know">
        <p className="text-lg text-[#c8c8d0] leading-relaxed max-w-3xl">
          Most Gen Z and Gen Alpha slang is harmless. A small number of terms are worth knowing
          because they can point to self-harm, drugs, sexual content, or unsafe contact online.
          Of the {all.length.toLocaleString("en-US")} terms in our{" "}
          <Link href="/slang" className={SLANG_LINK}>slang dictionary</Link>, {flagged.length} carry
          a parent alert and {edgy.length} are rated edgy.
        </p>
      </SlangHeader>
      <SlangSubnav />

      <section aria-labelledby="ratings-heading" className="mb-12">
        <h2 id="ratings-heading" className="text-2xl font-semibold text-white mb-4">
          How our safety ratings work
        </h2>
        <dl className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4">
            <dt className="font-semibold text-emerald-300 mb-1">Safe</dt>
            <dd className="text-sm text-[#c8c8d0]">Everyday slang. Nothing rude or explicit.</dd>
          </div>
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4">
            <dt className="font-semibold text-amber-300 mb-1">Edgy</dt>
            <dd className="text-sm text-[#c8c8d0]">Not explicit, but can be rude, mean, or suggestive.</dd>
          </div>
          <div className="rounded-xl bg-rose-500/5 border border-rose-500/20 p-4">
            <dt className="font-semibold text-rose-300 mb-1">Parent alert</dt>
            <dd className="text-sm text-[#c8c8d0]">
              Can relate to self-harm, drugs, sexual content, or grooming. Worth a direct conversation.
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="alert-heading" className="mb-12">
        <h2 id="alert-heading" className="text-2xl font-semibold text-white mb-2">
          Terms with a parent alert
        </h2>
        <p className="text-[#d4d4dc] leading-relaxed mb-4">
          These terms can relate to self-harm, drugs, sexual content, or unsafe contact online. Some
          also have innocent uses, so context matters. If you are ever worried that your child may
          hurt themselves, in the US you can call or text 988 to reach the 988 Suicide &amp; Crisis
          Lifeline at any time. The meaning of each term and a note for parents are in {APP_NAME}.
        </p>
        <TermList terms={flagged} showBadges={false} />
      </section>

      <section aria-labelledby="edgy-heading" className="mb-12">
        <h2 id="edgy-heading" className="text-2xl font-semibold text-white mb-2">
          Edgy slang: rude, mean, or suggestive
        </h2>
        <p className="text-[#c8c8d0] leading-relaxed mb-4">
          Not dangerous on their own, but often used to put someone down. Worth knowing if you hear
          them aimed at your child.
        </p>
        <TermList terms={edgy} showBadges={false} />
      </section>

      <section aria-labelledby="talk-heading" className="mb-12">
        <h2 id="talk-heading" className="text-2xl font-semibold text-white mb-4">
          How to talk with your kid about slang
        </h2>
        <ol className="space-y-4 list-decimal list-outside pl-6 marker:text-indigo-400">
          {TALK_TIPS.map((tip) => (
            <li key={tip.title} className="text-[#c8c8d0] leading-relaxed">
              <span className="font-semibold text-white">{tip.title}.</span> {tip.body}
            </li>
          ))}
        </ol>
      </section>

      <AppStoreCta heading={`Stay fluent with ${APP_NAME}`} />
    </>
  );
}
