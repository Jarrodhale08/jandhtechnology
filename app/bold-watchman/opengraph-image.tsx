import { OG_SIZE } from "@/components/OgCard";
import { appOgImage } from "@/components/apps/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Bold Watchman: faith-based accountability for men";

export default function Image() {
  return appOgImage("bold-watchman");
}
