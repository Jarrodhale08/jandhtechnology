import { ogCard } from "@/components/OgCard";
import { getApp, platformSummary } from "@/lib/apps";

export function appOgImage(slug: string) {
  const app = getApp(slug);
  return ogCard({
    eyebrow: "J&H Technology app",
    title: app.name,
    subtitle: app.tagline,
    footer: [platformSummary(app), `jandhtechnology.com${app.path}`],
  });
}
