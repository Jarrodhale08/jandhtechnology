import { AppPageView, appPageMetadata } from "@/components/apps/AppPage";

export const metadata = appPageMetadata("protravel");

export default function ProtravelPage() {
  return <AppPageView slug="protravel" />;
}
