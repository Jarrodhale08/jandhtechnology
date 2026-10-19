import { ContentPageView, contentMetadata } from "@/components/slang/ContentPage";
import { ABOUT_PAGE } from "@/lib/slang-pages";

export const metadata = contentMetadata(ABOUT_PAGE);

export default function Page() {
  return <ContentPageView page={ABOUT_PAGE} />;
}
