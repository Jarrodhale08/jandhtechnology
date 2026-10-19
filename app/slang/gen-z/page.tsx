import { GenerationPage } from "@/components/slang/GenerationPage";
import { contentMetadata } from "@/components/slang/ContentPage";
import { GEN_Z_PAGE } from "@/lib/slang-pages";

export const revalidate = 86400;

export const metadata = contentMetadata(GEN_Z_PAGE);

export default function Page() {
  return <GenerationPage page={GEN_Z_PAGE} generation="gen-z" />;
}
