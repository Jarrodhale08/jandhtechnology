import { OG_SIZE } from "@/components/OgCard";
import { appOgImage } from "@/components/apps/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "ProTravel: trip plans, packing lists and travel budgets";

export default function Image() {
  return appOgImage("protravel");
}
