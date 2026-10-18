import {
  answerSentence,
  badWordAnswer,
  definitionAfterLead,
  generationLabel,
  type SlangTerm,
} from "@/lib/slang-core";
import { APP_NAME, APP_STORE_URL, SITE_URL, termUrl } from "@/lib/slang";

type JsonLdNode = Record<string, unknown>;

export const SLANG_INDEX_URL = `${SITE_URL}/slang`;
const TERM_SET_ID = `${SLANG_INDEX_URL}#defined-term-set`;
const ORG_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "J&H Technology LLC",
    url: SITE_URL,
    email: "jarrod@jandhtechnology.com",
  };
}

export function mobileApplicationJsonLd(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: APP_NAME,
    alternateName: "Slang Decoder - Gen Z & Alpha",
    operatingSystem: "iOS",
    applicationCategory: "EducationalApplication",
    description:
      "Slang Decoder helps parents, grandparents, and teachers understand Gen Z and Gen Alpha slang with clear definitions, real examples, and a parent safety rating for every term.",
    url: APP_STORE_URL,
    installUrl: APP_STORE_URL,
    contentRating: "4+",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": ORG_ID },
  };
}

export function definedTermSetJsonLd(terms: SlangTerm[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": TERM_SET_ID,
    name: "Slang Decoder Gen Z and Gen Alpha Slang Dictionary",
    url: SLANG_INDEX_URL,
    publisher: { "@id": ORG_ID },
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      url: termUrl(t.slug),
    })),
  };
}

export function definedTermJsonLd(t: SlangTerm): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${termUrl(t.slug)}#term`,
    name: t.term,
    description: t.definition,
    url: termUrl(t.slug),
    termCode: t.slug,
    inDefinedTermSet: { "@type": "DefinedTermSet", "@id": TERM_SET_ID, url: SLANG_INDEX_URL },
    keywords: [generationLabel(t.generation), t.category].join(", "),
    dateModified: t.updatedAt,
  };
}

export function termFaqJsonLd(t: SlangTerm): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does ${t.term} mean?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: [answerSentence(t), definitionAfterLead(t), t.context].filter(Boolean).join(" "),
        },
      },
      {
        "@type": "Question",
        name: `Is ${t.term} a bad word?`,
        acceptedAnswer: { "@type": "Answer", text: badWordAnswer(t) },
      },
    ],
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
