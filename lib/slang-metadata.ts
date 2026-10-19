import type { Metadata } from "next";
import { APP_NAME, SITE_URL } from "@/lib/slang";

export function slangMetadata({
  title,
  description,
  path,
  type = "website",
  markdownPath,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  markdownPath?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      ...(markdownPath ? { types: { "text/markdown": `${SITE_URL}${markdownPath}` } } : {}),
    },
    openGraph: { title, description, url, siteName: `${APP_NAME} by J&H Technology`, type, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}
