import { AppPageView, appPageMetadata } from "@/components/apps/AppPage";

export const metadata = appPageMetadata("coffee-tasting");

export default function CoffeeTastingPage() {
  return <AppPageView slug="coffee-tasting" />;
}
