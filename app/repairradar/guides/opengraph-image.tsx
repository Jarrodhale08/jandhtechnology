import { ogCard, OG_SIZE } from "@/components/OgCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "RepairRadar home maintenance guides";

export default function Image() {
  return ogCard({
    eyebrow: "RepairRadar guides",
    title: "Home maintenance guides",
    subtitle: "Checklists and record-keeping for homeowners and landlords",
    footer: ["RepairRadar for iPhone and iPad", "jandhtechnology.com/repairradar"],
  });
}
