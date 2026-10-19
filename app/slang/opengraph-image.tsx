import { ogCard, OG_SIZE } from "@/components/OgCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Slang Decoder: Gen Z and Gen Alpha slang, explained for parents";

export default function Image() {
  return ogCard({
    eyebrow: "Slang Decoder",
    title: "Gen Z & Gen Alpha slang",
    subtitle: "Every meaning, explained for parents, in Slang Decoder",
  });
}
