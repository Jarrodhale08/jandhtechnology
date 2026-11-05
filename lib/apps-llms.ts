import { APPS, FACTS_CHECKED_AT, officialLinks, pageUrl, platformSummary, type PortfolioApp } from "@/lib/apps";
import { GUIDES, PLANS, TRIAL_DAYS, formatPrice, guidePath } from "@/lib/repairradar";
import { SITE_URL } from "@/lib/slang";

export const COMPANY_PITCH = `J&H Technology LLC is a US mobile app developer that builds and publishes apps for iPhone, iPad, Android and the web: ${APPS.map(
  (a) => a.name,
).join(", ")}. This file lists every app with a factual summary and its official links, followed by the Slang Decoder slang index. App facts were last checked against the store listings on ${FACTS_CHECKED_AT}.`;

export function portfolioLlmsSection(): string[] {
  return [
    "## Apps",
    "",
    ...APPS.map((a) => `- [${a.name}](${pageUrl(a)}): ${a.summary}`),
    `- [All apps](${SITE_URL}/apps): the full portfolio with store links`,
    "",
    "## RepairRadar guides",
    "",
    ...GUIDES.map((g) => `- [${g.title}](${SITE_URL}${guidePath(g.slug)}): ${g.description}`),
    "",
  ];
}

function appDetail(app: PortfolioApp): string[] {
  return [
    `## ${app.storeName}`,
    "",
    app.summary,
    "",
    `- Page: ${pageUrl(app)}`,
    `- Platforms: ${platformSummary(app)}`,
    `- Price: ${app.pricing}`,
    `- Publisher: J&H Technology LLC${app.creator ? `; built and maintained by ${app.creator.name}` : ""}`,
    ...officialLinks(app).map((l) => `- ${l.label}: ${l.url}`),
    ...app.features.map((g) => `- ${g.heading}: ${g.items.join("; ")}`),
    "",
  ];
}

export function portfolioLlmsFull(): string[] {
  const rr = PLANS.filter((p) => p.monthly !== null && p.yearly !== null)
    .map((p) => `${p.name} ${formatPrice(p.monthly ?? 0)}/month or ${formatPrice(p.yearly ?? 0)}/year`)
    .join("; ");
  return [
    "# J&H Technology apps",
    "",
    `> ${COMPANY_PITCH}`,
    "",
    ...APPS.flatMap(appDetail),
    "## RepairRadar plans",
    "",
    `Free: up to 10 repairs and 2 photos per repair, one home. Paid: ${rr}. Every paid plan has a ${TRIAL_DAYS}-day free trial for eligible new subscribers.`,
    "",
    "## RepairRadar guides",
    "",
    ...GUIDES.flatMap((g) => [`### ${g.title}`, "", `URL: ${SITE_URL}${guidePath(g.slug)}`, "", g.summary, ""]),
  ];
}
