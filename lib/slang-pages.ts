// Editorial pages for the Slang Decoder funnel. Text may contain [label](/path) links, which render as
// links in HTML and stay as links in the .md variants. No page may contain a term's meaning.

export type ContentSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  list?: string[];
  ordered?: boolean;
};

export type FaqItem = { question: string; answer: string };

export type ContentPage = {
  path: string;
  crumb: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string[];
  sections: ContentSection[];
  faq?: FaqItem[];
  ctaHeading: string;
  markdown: boolean;
};

const APP = "Slang Decoder";
const PRICING =
  "free to download, with an optional Premium subscription ($2.99 a month or $19.99 a year, with a 7-day free trial)";

export const SAFETY_LEVELS = [
  { label: "Safe", text: "Everyday slang that is not rude or explicit." },
  { label: "Edgy", text: "Not explicit, but it can come across as rude, mean, or suggestive depending on context." },
  {
    label: "Parent alert",
    text: "Can relate to sensitive topics such as self-harm, drugs, sexual content, or unsafe contact online. Worth a calm, direct conversation.",
  },
];

export const GENERATIONS = {
  genZ: "Gen Z is usually defined as people born from about 1997 to 2012 (the Pew Research Center definition).",
  genAlpha:
    "Gen Alpha is usually defined as people born from about 2010 to 2024 (the range used by McCrindle, the research firm that coined the name). Definitions vary by a year or two.",
};

const CRISIS_LINES = [
  "If someone is in immediate danger, call 911 (in the US).",
  "988 Suicide & Crisis Lifeline: call or text 988, or chat at 988lifeline.org. It is free, confidential, and available 24/7 in the US.",
  "If a child is being exploited or pressured online, report it to the NCMEC CyberTipline at report.cybertip.org or 1-800-843-5678.",
];

export const FAQ_PAGE: ContentPage = {
  path: "/slang/faq",
  crumb: "FAQ",
  eyebrow: `${APP} help`,
  title: "Slang Decoder FAQ",
  metaTitle: `Slang Decoder FAQ: Pricing, Safety, Privacy | ${APP}`,
  description:
    "Answers about the Slang Decoder iPhone app: what it costs, how safety ratings work, privacy, Gen Z vs Gen Alpha, and how to talk with kids about slang.",
  intro: [
    `Common questions from parents, grandparents, and teachers about ${APP} and about keeping up with Gen Z and Gen Alpha slang.`,
  ],
  sections: [],
  faq: [
    {
      question: "What is Slang Decoder?",
      answer: `${APP} is an iPhone app from J&H Technology that helps parents, grandparents, and teachers understand Gen Z and Gen Alpha slang. Every term in the app has a plain-English meaning, a real example, the generation that uses it, and a parent safety rating.`,
    },
    {
      question: "How much does Slang Decoder cost?",
      answer: `${APP} is ${PRICING}. Premium unlocks the full library, the Slang Age Quiz, the Quiz Your Parents generator, the two-way text translator, and unlimited flashcards and quizzes.`,
    },
    {
      question: "Is Slang Decoder available on Android?",
      answer: `Not yet. ${APP} is available for iPhone on the App Store and requires iOS 15.1 or later.`,
    },
    {
      question: "Why doesn't this website show what each term means?",
      answer: `Meanings, example sentences, and parent notes live in the ${APP} app, where they stay together and up to date. This website is the public index: it shows each term's generation, category, and safety rating, and links to the app. See [how Slang Decoder works](/slang/how-it-works).`,
    },
    {
      question: "How do the safety ratings work?",
      answer:
        "Every term is rated Safe (everyday slang that is not rude or explicit), Edgy (can be rude, mean, or suggestive depending on context), or Parent alert (can relate to self-harm, drugs, sexual content, or unsafe contact). The [safety guide](/slang/safety-guide) explains what to do when a term worries you.",
    },
    {
      question: "Who curates the slang terms?",
      answer:
        "Terms are curated by J&H Technology and reviewed before they are published. Read our [editorial standards](/slang/about).",
    },
    {
      question: "How can I understand what my teen is saying?",
      answer:
        "Listen for the words that come up again and again, look them up, and then ask your teen what they mean to them. Slang shifts with context, so the way your teen uses a word matters as much as the dictionary meaning. Browsing [trending slang](/slang/trending) is a quick way to see what is common right now.",
    },
    {
      question: "How should I talk to my kids about slang?",
      answer:
        "Be curious rather than critical. Ask what a word means and where they heard it, let them be the expert, and save serious conversations for terms that point to real risk. The [safety guide](/slang/safety-guide) has conversation starters.",
    },
    {
      question: "What should I do if a term my child uses worries me?",
      answer:
        "Stay calm and ask open questions in private. If you are worried your child may hurt themselves, call or text 988 in the US to reach the 988 Suicide & Crisis Lifeline at any time. If anyone is in immediate danger, call 911.",
    },
    {
      question: "What is the difference between Gen Z and Gen Alpha?",
      answer: `${GENERATIONS.genZ} ${GENERATIONS.genAlpha} Learn more about [Gen Z](/slang/gen-z) and [Gen Alpha](/slang/gen-alpha).`,
    },
    {
      question: "Does Slang Decoder collect my data?",
      answer:
        "The App Store privacy label for Slang Decoder says Data Not Collected. Our [privacy policy](/privacy) explains how J&H Technology handles data across its apps.",
    },
    {
      question: "How do I cancel Slang Decoder Premium?",
      answer:
        "Premium is billed through your Apple ID. On your iPhone, open Settings, tap your name, tap Subscriptions, choose Slang Decoder, and tap Cancel Subscription. Cancel at least 24 hours before the trial or billing period ends to avoid being charged.",
    },
    {
      question: "Is Slang Decoder appropriate for children?",
      answer:
        "The app is rated 4+ on the App Store and is designed for adults who want to understand young people. Some terms in the library carry a Parent alert rating because of what they refer to.",
    },
    {
      question: "Can teachers use Slang Decoder?",
      answer: "Yes. See [Slang Decoder for teachers](/slang/for-teachers) for classroom ideas.",
    },
  ],
  ctaHeading: `Get ${APP} for iPhone`,
  markdown: true,
};

export const HOW_IT_WORKS_PAGE: ContentPage = {
  path: "/slang/how-it-works",
  crumb: "How it works",
  eyebrow: `Inside ${APP}`,
  title: "How Slang Decoder works",
  metaTitle: `How Slang Decoder Works: Look Up Any Slang Term | ${APP}`,
  description:
    "How the Slang Decoder iPhone app explains Gen Z and Gen Alpha slang: search, meanings with examples, parent safety ratings, flashcards, quizzes, and a translator.",
  intro: [
    `${APP} turns confusing slang into plain English. This website lists every term with its generation and safety rating. The app has the meaning, a real example, and a parent note for each one.`,
  ],
  sections: [
    {
      id: "steps",
      heading: "Look up a term in four steps",
      ordered: true,
      list: [
        `Download ${APP} from the App Store. It is ${PRICING}.`,
        "Search for a word you heard, or browse by category, such as gaming, TikTok, or texting.",
        "Read the plain-English meaning and a real example of how it is used.",
        "Check the parent safety rating: Safe, Edgy, or Parent alert.",
      ],
    },
    {
      id: "features",
      heading: "What else is in the app",
      list: [
        "Flashcard decks you can sort by category, difficulty, or generation.",
        "A Word of the Day with streaks, so new terms stick.",
        "The Slang Age Quiz and a Quiz Your Parents generator (Premium).",
        "A translator between Gen Z slang and plain English (two-way translation is Premium).",
        "Generational equivalents that show how five generations say the same thing (Premium).",
      ],
    },
    {
      id: "ratings",
      heading: "How safety ratings help",
      paragraphs: [
        "Every term carries one of three ratings, so you can tell harmless slang from words worth a conversation. Read the [safety guide](/slang/safety-guide) for details.",
      ],
      list: SAFETY_LEVELS.map((s) => `${s.label}: ${s.text}`),
    },
    {
      id: "website",
      heading: "What this website is for",
      paragraphs: [
        "Use this website to browse the [A–Z index](/slang), see what is [trending](/slang/trending), and check a term's rating before a conversation. Open the app when you want to know what a term means.",
      ],
    },
  ],
  ctaHeading: `Start decoding with ${APP}`,
  markdown: true,
};

export const ABOUT_PAGE: ContentPage = {
  path: "/slang/about",
  crumb: "About",
  eyebrow: "Editorial standards",
  title: "About Slang Decoder",
  metaTitle: `About Slang Decoder: Editorial Standards | ${APP}`,
  description:
    "Who makes Slang Decoder, how slang terms are curated and reviewed before publishing, how safety ratings are assigned, and how to report a correction.",
  intro: [
    `${APP} is made by J&H Technology LLC, an independent app studio. We built it for parents, grandparents, and teachers who want to understand the young people in their lives without guessing.`,
  ],
  sections: [
    {
      id: "curation",
      heading: "How terms are curated",
      paragraphs: [
        "Every term in Slang Decoder is curated by J&H Technology and reviewed before it is published. Each term is assigned the generation that mainly uses it (Gen Z, Gen Alpha, or both), a category, and a parent safety rating.",
        "Slang changes fast and often means different things in different places. When a term has more than one common use, the app says so.",
      ],
    },
    {
      id: "ratings",
      heading: "How safety ratings are assigned",
      paragraphs: [
        "The safety rating describes the term itself, not the person using it. We rate on the side of caution: if a common use of a term relates to self-harm, drugs, sexual content, or unsafe contact, it gets a Parent alert rating.",
      ],
      list: SAFETY_LEVELS.map((s) => `${s.label}: ${s.text}`),
    },
    {
      id: "what-we-publish",
      heading: "What we publish where",
      paragraphs: [
        "This website is a public index of term names, generations, categories, and safety ratings. Meanings, example sentences, and parent notes are published in the Slang Decoder app.",
      ],
    },
    {
      id: "corrections",
      heading: "Corrections and suggestions",
      paragraphs: [
        "Spotted an outdated rating or a term we are missing? Email [jarrod@jandhtechnology.com](mailto:jarrod@jandhtechnology.com). We review every report.",
      ],
    },
    {
      id: "company",
      heading: "About J&H Technology",
      paragraphs: [
        "J&H Technology LLC designs and builds mobile apps for iOS and Android. Learn more on our [home page](/), or read our [privacy policy](/privacy) and [terms](/terms).",
      ],
    },
  ],
  ctaHeading: `Try ${APP}`,
  markdown: true,
};

export const SAFETY_GUIDE_PAGE: ContentPage = {
  path: "/slang/safety-guide",
  crumb: "Safety guide",
  eyebrow: "For parents and caregivers",
  title: "Slang safety guide for parents",
  metaTitle: `Slang Safety Guide for Parents: Warning Signs & Talks | ${APP}`,
  description:
    "A parent guide to Gen Z and Gen Alpha slang safety: what our ratings mean, warning signs to watch for, how to start the conversation, and where to get help.",
  intro: [
    "Most slang is harmless. A small number of terms are worth knowing because they can point to self-harm, drugs, sexual content, or unsafe contact online. This guide helps you tell the difference and talk about it calmly.",
  ],
  sections: [
    {
      id: "ratings",
      heading: "What the safety ratings mean",
      list: SAFETY_LEVELS.map((s) => `${s.label}: ${s.text}`),
    },
    {
      id: "warning-signs",
      heading: "Warning signs that matter more than any word",
      paragraphs: ["A single word rarely means much on its own. Patterns like these deserve your attention:"],
      list: [
        "Sudden secrecy about a phone, game, or account, or a second account you did not know about.",
        "New online friends they will not name, or gifts and money from people you do not know.",
        "Pulling away from family and friends, or dropping activities they used to enjoy.",
        "Changes in sleep, eating, or mood that last more than a couple of weeks.",
        "Talk about feeling hopeless, being a burden, or not being around, including as a joke.",
        "Giving away belongings or saying goodbye in unusual ways.",
      ],
    },
    {
      id: "conversations",
      heading: "How to start the conversation",
      ordered: true,
      list: [
        "Ask, do not accuse. Try: “I keep seeing this word online. What does it actually mean?” Kids open up when they get to be the expert.",
        "Pick a low-pressure moment, like a car ride or a walk, rather than a sit-down talk.",
        "Stay calm about edgy words. A lot of edgy slang is kids testing limits. Save the serious talk for real risk signals.",
        "Ask where they heard it. The game, app, or creator tells you more than the word does.",
        "Keep the door open. Make it clear they can come to you about anything online without automatically losing their phone.",
      ],
    },
    {
      id: "get-help",
      heading: "Where to get help",
      list: CRISIS_LINES,
    },
  ],
  ctaHeading: `Check any term's rating in ${APP}`,
  markdown: true,
};

export const TEACHERS_PAGE: ContentPage = {
  path: "/slang/for-teachers",
  crumb: "For teachers",
  eyebrow: "For educators",
  title: "Slang Decoder for teachers",
  metaTitle: `Gen Z & Gen Alpha Slang for Teachers | ${APP}`,
  description:
    "How teachers can keep up with Gen Z and Gen Alpha slang, spot words used to put students down, and use slang as a lesson in language and digital citizenship.",
  intro: [
    "Students switch slang faster than any staff training can keep up. Knowing the words helps you follow classroom conversations, notice when language is used to hurt someone, and build trust.",
  ],
  sections: [
    {
      id: "why",
      heading: "Why slang matters in the classroom",
      list: [
        "It helps you follow what students are saying in class, in group work, and in writing.",
        "Edgy terms are often used to mock or exclude, so recognizing them helps you catch bullying early.",
        "Parent alert terms can be an early signal that a student needs support. Follow your school's safeguarding policy.",
      ],
    },
    {
      id: "lessons",
      heading: "Ways to use slang in lessons",
      list: [
        "Language change: compare how five generations say the same thing, using the generational equivalents in the app.",
        "Register and audience: discuss when slang works and when formal language is expected.",
        "Digital citizenship: talk about how words spread on TikTok, YouTube, Roblox, and Fortnite, and how jokes can hurt.",
        "Student experts: let students explain a term to the class. It builds confidence and gives you current usage.",
      ],
    },
    {
      id: "browse",
      heading: "Browse by topic",
      paragraphs: [
        "Start with [trending slang](/slang/trending), the [category list](/slang/glossary-categories), or the [safety guide](/slang/safety-guide). Each term page shows the generation and safety rating, and the app has the meaning and an example.",
      ],
    },
  ],
  ctaHeading: `Keep up with your students using ${APP}`,
  markdown: false,
};

export const GRANDPARENTS_PAGE: ContentPage = {
  path: "/slang/for-grandparents",
  crumb: "For grandparents",
  eyebrow: "For grandparents",
  title: "Slang Decoder for grandparents",
  metaTitle: `Understand Your Grandkids' Slang | ${APP}`,
  description:
    "A friendly guide for grandparents who want to understand Gen Z and Gen Alpha slang, connect with grandkids, and know which words are worth a closer look.",
  intro: [
    "If your grandkids say things that sound like a foreign language, you are not alone. Slang has always changed with each generation. It just moves faster now because it spreads through videos and games.",
  ],
  sections: [
    {
      id: "connect",
      heading: "Use slang to connect, not to correct",
      list: [
        "Ask your grandkids to teach you a word. Most kids love being the expert.",
        "Share the slang from your own youth. The app's generational equivalents show how the same idea was said in your day.",
        "Try a word back on them. Even getting it a little wrong is a good laugh together.",
      ],
    },
    {
      id: "getting-started",
      heading: "Getting started is simple",
      ordered: true,
      list: [
        "Open the App Store on your iPhone and search for Slang Decoder, or use the button on this page.",
        "Type in a word you heard. You can make the text larger with your iPhone's Display & Text Size settings.",
        "Read what it means, an example, and whether it is Safe, Edgy, or a Parent alert.",
      ],
    },
    {
      id: "safety",
      heading: "When a word worries you",
      paragraphs: [
        "A small number of terms have a Parent alert rating. If you hear one, share it calmly with the child's parents. The [safety guide](/slang/safety-guide) explains what to look for.",
      ],
    },
  ],
  ctaHeading: `Get ${APP} for your iPhone`,
  markdown: false,
};

export const GEN_Z_PAGE: ContentPage = {
  path: "/slang/gen-z",
  crumb: "Gen Z",
  eyebrow: "Born about 1997 to 2012",
  title: "Who is Gen Z?",
  metaTitle: `Gen Z Explained: Birth Years and Slang | ${APP}`,
  description:
    "Who counts as Gen Z, the birth years usually used, where Gen Z slang comes from, and how it differs from Gen Alpha. Look up any term in Slang Decoder.",
  intro: [GENERATIONS.genZ, "Gen Z grew up with smartphones and social media, and much of their slang spread through Twitter, Vine, Instagram, and later TikTok."],
  sections: [
    {
      id: "slang",
      heading: "Where Gen Z slang comes from",
      list: [
        "Online communities and video platforms, especially TikTok and YouTube.",
        "Music, including hip-hop and the language of Black American communities, which has shaped a large share of mainstream slang.",
        "Gaming and streaming culture.",
        "Texting shorthand and acronyms.",
      ],
    },
    {
      id: "vs-alpha",
      heading: "Gen Z vs Gen Alpha",
      paragraphs: [
        `${GENERATIONS.genAlpha} Many words start with Gen Z and are picked up by Gen Alpha, so plenty of terms are used by both. Read about [Gen Alpha](/slang/gen-alpha).`,
      ],
    },
  ],
  ctaHeading: `Decode Gen Z slang with ${APP}`,
  markdown: false,
};

export const GEN_ALPHA_PAGE: ContentPage = {
  path: "/slang/gen-alpha",
  crumb: "Gen Alpha",
  eyebrow: "Born about 2010 to 2024",
  title: "Who is Gen Alpha?",
  metaTitle: `Gen Alpha Explained: Birth Years and Slang | ${APP}`,
  description:
    "Who counts as Gen Alpha, the birth years usually used, where Gen Alpha slang comes from, and how it differs from Gen Z. Look up any term in Slang Decoder.",
  intro: [GENERATIONS.genAlpha, "Gen Alpha is the first generation raised entirely with tablets, smart speakers, and short-form video."],
  sections: [
    {
      id: "slang",
      heading: "Where Gen Alpha slang comes from",
      list: [
        "Roblox, Fortnite, and Minecraft, plus the streamers who play them.",
        "YouTube Shorts and TikTok memes, which can turn a phrase into slang in days.",
        "Words borrowed from Gen Z and given a new, often ironic, twist.",
      ],
    },
    {
      id: "pace",
      heading: "Why it changes so fast",
      paragraphs: [
        "Gen Alpha slang is driven by memes, and memes move quickly. A term can be everywhere one month and considered cringe the next, which is why the app marks terms that are trending.",
      ],
    },
    {
      id: "vs-z",
      heading: "Gen Alpha vs Gen Z",
      paragraphs: [`${GENERATIONS.genZ} Read about [Gen Z](/slang/gen-z).`],
    },
  ],
  ctaHeading: `Decode Gen Alpha slang with ${APP}`,
  markdown: false,
};

export const CONTENT_PAGES: ContentPage[] = [
  FAQ_PAGE,
  HOW_IT_WORKS_PAGE,
  ABOUT_PAGE,
  SAFETY_GUIDE_PAGE,
  TEACHERS_PAGE,
  GRANDPARENTS_PAGE,
  GEN_Z_PAGE,
  GEN_ALPHA_PAGE,
];

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

export function plainText(text: string): string {
  return text.replace(LINK_RE, "$1");
}

export function absoluteLinks(text: string, siteUrl: string): string {
  return text.replace(LINK_RE, (_, label: string, href: string) =>
    `[${label}](${href.startsWith("/") ? `${siteUrl}${href}` : href})`,
  );
}

export function splitLinks(text: string): ({ text: string } | { label: string; href: string })[] {
  const parts: ({ text: string } | { label: string; href: string })[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    parts.push({ label: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}
