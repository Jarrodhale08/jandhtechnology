import { AppPageView, appPageMetadata } from "@/components/apps/AppPage";

export const metadata = appPageMetadata("handybook");

export default function HandybookPage() {
  return <AppPageView slug="handybook" />;
}
