import { OG_SIZE } from "@/components/OgCard";
import { appOgImage } from "@/components/apps/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Coffee Tasting: a cupping app and coffee tasting journal";

export default function Image() {
  return appOgImage("coffee-tasting");
}
