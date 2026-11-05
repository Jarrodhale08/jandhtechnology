import { OG_SIZE } from "@/components/OgCard";
import { appOgImage } from "@/components/apps/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Craving Crush: log cravings, ride out urges and spot your triggers";

export default function Image() {
  return appOgImage("craving-crush");
}
