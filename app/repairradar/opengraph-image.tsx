import { OG_SIZE } from "@/components/OgCard";
import { appOgImage } from "@/components/apps/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "RepairRadar: home repair log, maintenance reminders and warranty tracker";

export default function Image() {
  return appOgImage("repairradar");
}
