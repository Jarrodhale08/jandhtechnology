import { ogCard, OG_SIZE } from "@/components/OgCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "J&H Technology apps: RepairRadar, NannyLog, Meal Prep, HandyBook and more";

export default function Image() {
  return ogCard({
    eyebrow: "J&H Technology",
    title: "Our apps",
    subtitle: "RepairRadar, NannyLog, HandyBook, Slang Decoder and more",
    footer: ["iPhone, iPad, Android and web", "jandhtechnology.com/apps"],
  });
}
