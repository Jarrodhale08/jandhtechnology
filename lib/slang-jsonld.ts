import {
  categoryLabel,
  generationAnswer,
  generationLabel,
  meaningAnswer,
  safetyAnswer,
  safetyLabel,
  type SlangTerm,
} from "@/lib/slang-core";
import { APP_NAME, APP_STORE_URL, SITE_URL, termUrl } from "@/lib/slang";

type JsonLdNode = Record<string, unknown>;

export const SLANG_INDEX_URL = `${SITE_URL}/slang`;
const TERM_SET_ID = `${SLANG_INDEX_URL}#defined-term-set`;
const ORG_ID = `${SITE_URL}/#organization`;
const APP_ID = `${SITE_URL}/#slang-decoder-app`;

export function organizationJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "J&H Technology LLC",
    url: SITE_URL,
    email: "jarrod@jandhtechnology.com",
    sameAs: [APP_STORE_URL],
  };
}

export function mobileApplicationJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": APP_ID,
    name: APP_NAME,
    alternateName: "Slang Decoder - Gen Z & Alpha",
    operatingSystem: "iOS",
    softwareRequirements: "Requires iOS 15.1 or later",
    applicationCategory: "EducationalApplication",
    description:
      "Slang Decoder is an iPhone app that helps parents, grandparents, and teachers understand Gen Z and Gen Alpha slang, with a plain-English meaning, a real example, and a parent safety rating for every term.",
    url: APP_STORE_URL,
    installUrl: APP_STORE_URL,
    sameAs: APP_STORE_URL,
    contentRating: "4+",
    inLanguage: "en",
    offers: [
      {
        "@type": "Offer",
        name: "Free download",
        price: "0",
        priceCurrency: "USD",
        category: "free",
        url: APP_STORE_URL,
      },
      {
        "@type": "Offer",
        name: "Slang Decoder Premium Monthly (in-app purchase)",
        description: "Optional auto-renewing subscription with a 7-day free trial.",
        price: "2.99",
        priceCurrency: "USD",
        category: "subscription",
        url: APP_STORE_URL,
      },
      {
        "@type": "Offer",
        name: "Slang Decoder Premium Annual (in-app purchase)",
        description: "Optional auto-renewing subscription with a 7-day free trial.",
        price: "19.99",
        priceCurrency: "USD",
        category: "subscription",
        url: APP_STORE_URL,
      },
    ],
    publisher: { "@id": ORG_ID },
  };
}

export function definedTermSetJsonLd(terms: SlangTerm[], url = SLANG_INDEX_URL): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": url === SLANG_INDEX_URL ? TERM_SET_ID : `${url}#terms`,
    name: "Slang Decoder Gen Z and Gen Alpha slang index",
    url,
    publisher: { "@id": ORG_ID },
    hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, url: termUrl(t.slug) })),
  };
}

export function termTeaserDescription(t: SlangTerm): string {
  return `${t.term} is ${generationLabel(t.generation)} slang in the ${categoryLabel(t.category)} category, rated ${safetyLabel(t.safety)} for parents. Its meaning is in the ${APP_NAME} app.`;
}

export function definedTermJsonLd(t: SlangTerm): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${termUrl(t.slug)}#term`,
    name: t.term,
    description: termTeaserDescription(t),
    url: termUrl(t.slug),
    termCode: t.slug,
    inDefinedTermSet: { "@type": "DefinedTermSet", "@id": TERM_SET_ID, url: SLANG_INDEX_URL },
    keywords: [generationLabel(t.generation), categoryLabel(t.category), safetyLabel(t.safety)].join(", "),
  };
}

export function termFaqItems(t: SlangTerm): { question: string; answer: string }[] {
  return [
    { question: `Is ${t.term} safe for kids?`, answer: safetyAnswer(t) },
    { question: `Which generation uses ${t.term}?`, answer: generationAnswer(t) },
    { question: `Where can I find the meaning of ${t.term}?`, answer: meaningAnswer(t) },
  ];
}

export function faqPageJsonLd(items: { question: string; answer: string }[], url: string): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serializeJsonLd(data: JsonLdNode | JsonLdNode[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
