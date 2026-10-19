import Link from "next/link";
import { ContentPageView } from "@/components/slang/ContentPage";
import { SLANG_LINK, TermList } from "@/components/slang/ui";
import { generationLabel, trendingTerms, type Generation } from "@/lib/slang-core";
import { getAllTerms } from "@/lib/slang";
import type { ContentPage } from "@/lib/slang-pages";

export async function GenerationPage({ page, generation }: { page: ContentPage; generation: Exclude<Generation, "both"> }) {
  const all = await getAllTerms();
  const own = all.filter((t) => t.generation === generation);
  const shared = all.filter((t) => t.generation === "both");
  const label = generationLabel(generation);

  return (
    <ContentPageView
      page={page}
      after={
        <section aria-labelledby="in-index-heading" className="mb-12">
          <h2 id="in-index-heading" className="text-2xl font-semibold text-white mb-2">
            {label} slang in the index
          </h2>
          <p className="text-[#d4d4dc] leading-relaxed mb-4 max-w-3xl">
            The index lists {own.length} terms mainly used by {label} and {shared.length} used by both
            Gen Z and Gen Alpha. Here are some {label} terms marked trending in Slang Decoder. Browse
            the <Link href="/slang" className={SLANG_LINK}>full A–Z index</Link> for the rest.
          </p>
          <TermList terms={trendingTerms(own, 12)} />
        </section>
      }
    />
  );
}
