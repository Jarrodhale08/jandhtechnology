import { ListPage } from "@/components/slang/ListPage";
import { TermList } from "@/components/slang/ui";
import { addedInMonth, formatDate, newestTerms } from "@/lib/slang-core";
import { APP_NAME, getAllTerms } from "@/lib/slang";
import { slangMetadata } from "@/lib/slang-metadata";

export const revalidate = 86400;

export const metadata = slangMetadata({
  title: `New Slang This Month: Latest Additions | ${APP_NAME}`,
  description:
    "The newest Gen Z and Gen Alpha slang terms added to Slang Decoder, with the date added, generation, and parent safety rating. Meanings are in the app.",
  path: "/slang/new-this-month",
});

function monthLabel(d: Date) {
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

export default async function NewThisMonthPage() {
  const all = await getAllTerms();
  const now = new Date();
  const thisMonth = addedInMonth(all, now);
  const recent = newestTerms(all, 24);
  const latest = recent[0]?.createdAt;

  return (
    <ListPage
      path="/slang/new-this-month"
      crumb="New this month"
      eyebrow="Latest additions"
      title="New slang this month"
      ctaHeading={`Get new slang as it lands in ${APP_NAME}`}
      intro={
        thisMonth.length > 0 ? (
          <p>
            {thisMonth.length} {thisMonth.length === 1 ? "term was" : "terms were"} added in {monthLabel(now)}.
          </p>
        ) : (
          <p>
            No new terms have been added in {monthLabel(now)} yet.
            {latest && (
              <>
                {" "}The most recent additions are from{" "}
                <time dateTime={latest}>{formatDate(latest)}</time>.
              </>
            )}
          </p>
        )
      }
    >
      {thisMonth.length > 0 && (
        <section aria-labelledby="month-heading" className="mb-12">
          <h2 id="month-heading" className="text-2xl font-semibold text-white mb-4">
            Added in {monthLabel(now)}
          </h2>
          <TermList terms={thisMonth} />
        </section>
      )}
      <section aria-labelledby="recent-heading">
        <h2 id="recent-heading" className="text-2xl font-semibold text-white mb-4">
          Most recent additions
        </h2>
        <TermList terms={recent} />
      </section>
    </ListPage>
  );
}
