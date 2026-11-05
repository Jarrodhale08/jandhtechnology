import {
  APPLE_DEVELOPER_URL,
  APPS,
  ORG_NAME,
  PLAY_DEVELOPER_URL,
  appJsonLdId,
  appStoreUrl,
  operatingSystems,
  pageUrl,
  playUrl,
  sameAsUrls,
  type PortfolioApp,
} from "@/lib/apps";
import { PLANS, TRIAL_DAYS, guidePath, type Guide } from "@/lib/repairradar";
import { SITE_URL } from "@/lib/slang";
import { ORG_ID } from "@/lib/slang-jsonld";

type JsonLdNode = Record<string, unknown>;

export function organizationJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: ORG_NAME,
    alternateName: "J&H Technology",
    url: SITE_URL,
    email: "jarrod@jandhtechnology.com",
    sameAs: [APPLE_DEVELOPER_URL, PLAY_DEVELOPER_URL],
    owns: APPS.filter((a) => a.ownedByOrg).map((a) => ({ "@id": appJsonLdId(a) })),
  };
}

function freeOffer(app: PortfolioApp): JsonLdNode {
  return {
    "@type": "Offer",
    name: "Free download",
    price: "0",
    priceCurrency: "USD",
    category: "free",
    url: appStoreUrl(app) ?? playUrl(app) ?? pageUrl(app),
  };
}

function repairRadarOffers(app: PortfolioApp): JsonLdNode[] {
  const url = appStoreUrl(app);
  return PLANS.flatMap((plan) =>
    plan.monthly === null || plan.yearly === null
      ? []
      : (
          [
            ["Monthly", plan.monthly, "MON"],
            ["Annual", plan.yearly, "ANN"],
          ] as const
        ).map(([period, price, unitCode]) => ({
          "@type": "Offer",
          name: `RepairRadar ${plan.name} ${period} (in-app subscription)`,
          description: `Auto-renewing subscription with a ${TRIAL_DAYS}-day free trial for eligible new subscribers.`,
          price: price.toFixed(2),
          priceCurrency: "USD",
          category: "subscription",
          url,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: price.toFixed(2),
            priceCurrency: "USD",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode },
          },
        })),
  );
}

export function mobileAppJsonLd(app: PortfolioApp): JsonLdNode {
  const sameAs = sameAsUrls(app);
  const installUrl = appStoreUrl(app) ?? playUrl(app);
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": appJsonLdId(app),
    name: app.name,
    alternateName: [app.storeName, ...(app.alternateNames ?? [])].filter((n) => n !== app.name),
    description: app.summary,
    url: pageUrl(app),
    mainEntityOfPage: pageUrl(app),
    image: `${pageUrl(app)}/opengraph-image`,
    operatingSystem: operatingSystems(app),
    applicationCategory: app.applicationCategory,
    ...(app.contentRating ? { contentRating: app.contentRating } : {}),
    inLanguage: "en",
    ...(installUrl ? { installUrl } : {}),
    sameAs,
    offers: app.slug === "repairradar" ? [freeOffer(app), ...repairRadarOffers(app)] : [freeOffer(app)],
    publisher: { "@id": ORG_ID },
    ...(app.creator ? { creator: { "@type": "Organization", name: app.creator.name, url: app.creator.url } } : {}),
  };
}

export function appListJsonLd(apps: PortfolioApp[], url: string): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#apps`,
    name: "J&H Technology apps",
    numberOfItems: apps.length,
    itemListElement: apps.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: pageUrl(a),
      name: a.name,
    })),
  };
}

export function articleJsonLd(guide: Guide, appId: string): JsonLdNode {
  const url = `${SITE_URL}${guidePath(guide.slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: guide.title,
    description: guide.description,
    abstract: guide.summary,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    inLanguage: "en",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: { "@id": appId },
    ...(guide.sources.length ? { citation: guide.sources.map((s) => s.url) } : {}),
  };
}
