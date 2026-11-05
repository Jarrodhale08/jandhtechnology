import { OG_SIZE } from "@/components/OgCard";
import { appOgImage } from "@/components/apps/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Stronger Couple: weekly check-ins and calmer conversations for couples";

export default function Image() {
  return appOgImage("stronger-couple");
}
