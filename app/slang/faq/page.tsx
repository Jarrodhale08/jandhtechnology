import { ContentPageView, contentMetadata } from "@/components/slang/ContentPage";
import { FAQ_PAGE } from "@/lib/slang-pages";

export const metadata = contentMetadata(FAQ_PAGE);

export default function Page() {
  return <ContentPageView page={FAQ_PAGE} />;
}
