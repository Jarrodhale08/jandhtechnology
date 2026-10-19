import { ContentPageView, contentMetadata } from "@/components/slang/ContentPage";
import { TermList } from "@/components/slang/ui";
import { getAllTerms } from "@/lib/slang";
import { SAFETY_GUIDE_PAGE } from "@/lib/slang-pages";

export const revalidate = 86400;

export const metadata = contentMetadata(SAFETY_GUIDE_PAGE);

export default async function SafetyGuidePage() {
  const all = await getAllTerms();
  const flagged = all.filter((t) => t.safety === "inappropriate");
  const edgy = all.filter((t) => t.safety === "edgy");

  return (
    <ContentPageView
      page={SAFETY_GUIDE_PAGE}
      after={
        <>
          <section aria-labelledby="alert-terms-heading" className="mb-12">
            <h2 id="alert-terms-heading" className="text-2xl font-semibold text-white mb-2">
              Terms with a parent alert ({flagged.length})
            </h2>
            <p className="text-[#d4d4dc] leading-relaxed mb-4 max-w-3xl">
              Of the {all.length.toLocaleString("en-US")} terms in the index, these carry a Parent alert
              rating. Some also have innocent uses, so context matters. The meaning of each term and a
              note for parents are in Slang Decoder.
            </p>
            <TermList terms={flagged} showBadges={false} />
          </section>
          <section aria-labelledby="edgy-terms-heading" className="mb-12">
            <h2 id="edgy-terms-heading" className="text-2xl font-semibold text-white mb-2">
              Edgy terms ({edgy.length})
            </h2>
            <p className="text-[#d4d4dc] leading-relaxed mb-4 max-w-3xl">
              Not dangerous on their own, but often used to put someone down. Worth knowing if you
              hear them aimed at your child.
            </p>
            <TermList terms={edgy} showBadges={false} />
          </section>
        </>
      }
    />
  );
}
