import { OG_SIZE } from "@/components/OgCard";
import { appOgImage } from "@/components/apps/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "NannyLog: daily reports, hours and pay for nannies and babysitters";

export default function Image() {
  return appOgImage("nannylog");
}
