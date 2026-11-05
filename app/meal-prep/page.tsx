import { AppPageView, appPageMetadata } from "@/components/apps/AppPage";

export const metadata = appPageMetadata("meal-prep");

export default function MealPrepPage() {
  return <AppPageView slug="meal-prep" />;
}
