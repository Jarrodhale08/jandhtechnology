import { ListPage } from "@/components/slang/ListPage";
import { TermList } from "@/components/slang/ui";
import { formatDate, latestUpdate, pageUpdated, trendingTerms } from "@/lib/slang-core";
import { APP_NAME, getAllTerms } from "@/lib/slang";
import { slangMetadata } from "@/lib/slang-metadata";

export const revalidate = 86400;

const SHOWN = 60;

export const metadata = slangMetadata({
  title: `Trending Gen Z & Gen Alpha Slang Right Now | ${APP_NAME}`,
  description:
    "Slang terms marked trending in the Slang Decoder app, with the generation and parent safety rating for each. Look up what they mean in Slang Decoder.",
  path: "/slang/trending",
});

export default async function TrendingPage() {
  const all = await getAllTerms();
  const trending = trendingTerms(all, all.length);
  const updated = pageUpdated(latestUpdate(all));
  return (
    <ListPage
      path="/slang/trending"
      crumb="Trending"
      eyebrow="Trending now"
      title="Trending slang"
      ctaHeading={`See what trending slang means in ${APP_NAME}`}
      intro={
        <>
          <p>
            {trending.length} terms in the index are currently marked trending in {APP_NAME}. Here are{" "}
            {Math.min(SHOWN, trending.length)} of them, with the generation and parent safety rating
            for each.
          </p>
          <p className="text-sm text-[#c4c4cc]">
            Last updated <time dateTime={updated}>{formatDate(updated)}</time>
          </p>
        </>
      }
    >
      <section aria-labelledby="trending-list-heading">
        <h2 id="trending-list-heading" className="text-2xl font-semibold text-white mb-4">
          Terms marked trending
        </h2>
        <TermList terms={trending.slice(0, SHOWN)} />
      </section>
    </ListPage>
  );
}
