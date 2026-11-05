import { ogCard, OG_SIZE } from "@/components/OgCard";
import { GUIDES, getGuide } from "@/lib/repairradar";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "A RepairRadar home maintenance guide";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  return ogCard({
    eyebrow: "RepairRadar guide",
    title: guide?.title ?? "Home maintenance guides",
    subtitle: "Practical advice from RepairRadar",
    footer: ["RepairRadar for iPhone and iPad", "jandhtechnology.com/repairradar"],
  });
}
