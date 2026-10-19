import { ContentPageView, contentMetadata } from "@/components/slang/ContentPage";
import { GRANDPARENTS_PAGE } from "@/lib/slang-pages";

export const metadata = contentMetadata(GRANDPARENTS_PAGE);

export default function Page() {
  return <ContentPageView page={GRANDPARENTS_PAGE} />;
}
