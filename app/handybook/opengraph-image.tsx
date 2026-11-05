import { OG_SIZE } from "@/components/OgCard";
import { appOgImage } from "@/components/apps/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "HandyBook: quotes, invoices, jobs and customers for handymen";

export default function Image() {
  return appOgImage("handybook");
}
