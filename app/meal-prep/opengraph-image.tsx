import { OG_SIZE } from "@/components/OgCard";
import { appOgImage } from "@/components/apps/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Meal Prep: weekly meal plans, recipes with macros and a shopping list";

export default function Image() {
  return appOgImage("meal-prep");
}
