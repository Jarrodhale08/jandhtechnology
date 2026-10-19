import { getAllTerms } from "@/lib/slang";

export const revalidate = 86400;

// Names and slugs only: the client search never sees meanings.
export async function GET() {
  const terms = await getAllTerms();
  return Response.json(
    terms.map((t) => [t.term, t.slug]),
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
        "X-Robots-Tag": "noindex",
      },
    },
  );
}
