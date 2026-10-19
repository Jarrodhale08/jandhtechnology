import { ogCard, OG_SIZE } from "@/components/OgCard";
import { generationLabel } from "@/lib/slang-core";
import { getTermBySlug } from "@/lib/slang";

export const revalidate = 86400;
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "A slang term from the Slang Decoder index. What does it mean? Find out in Slang Decoder.";

export default async function Image({ params }: { params: Promise<{ term: string }> }) {
  const term = await getTermBySlug((await params).term);
  return ogCard({
    eyebrow: term ? `${generationLabel(term.generation)} slang` : "Slang Decoder",
    title: term?.term ?? "Slang Decoder",
    subtitle: "What does it mean? Find out in Slang Decoder",
  });
}
