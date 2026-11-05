import { AppPageView, appPageMetadata } from "@/components/apps/AppPage";

export const metadata = appPageMetadata("nannylog");

export default function NannylogPage() {
  return <AppPageView slug="nannylog" />;
}
