import type { Metadata } from "next";
import { SITE_URL } from "@/lib/slang";

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  appStoreId,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  appStoreId?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "J&H Technology", type, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
    ...(appStoreId ? { other: { "apple-itunes-app": `app-id=${appStoreId}` } } : {}),
  };
}
