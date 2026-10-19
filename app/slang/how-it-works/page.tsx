import { ContentPageView, contentMetadata } from "@/components/slang/ContentPage";
import { HOW_IT_WORKS_PAGE } from "@/lib/slang-pages";

export const metadata = contentMetadata(HOW_IT_WORKS_PAGE);

export default function Page() {
  return <ContentPageView page={HOW_IT_WORKS_PAGE} />;
}
