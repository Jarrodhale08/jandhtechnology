import { ContentPageView, contentMetadata } from "@/components/slang/ContentPage";
import { TEACHERS_PAGE } from "@/lib/slang-pages";

export const metadata = contentMetadata(TEACHERS_PAGE);

export default function Page() {
  return <ContentPageView page={TEACHERS_PAGE} />;
}
