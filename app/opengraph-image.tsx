import { ogCard, OG_SIZE } from "@/components/OgCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "J&H Technology: mobile apps for iOS and Android, including Slang Decoder";

export default function Image() {
  return ogCard({
    eyebrow: "J&H Technology",
    title: "Crafting software solutions",
    subtitle: "iOS and Android apps, including Slang Decoder",
  });
}
