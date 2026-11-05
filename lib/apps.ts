import { SITE_URL } from "@/lib/slang";

// Every fact here comes from the app's App Store or Google Play listing (itunes lookup API and Play pages)
// or its repo, and every URL was checked to return 200 on FACTS_CHECKED_AT. No ratings, user counts or awards.
export const FACTS_CHECKED_AT = "2026-11-05";
export const ORG_NAME = "J&H Technology LLC";
export const APPLE_DEVELOPER_URL = "https://apps.apple.com/developer/id1865047154";
export const PLAY_DEVELOPER_URL = "https://play.google.com/store/apps/developer?id=J%26H+Technology";

export type LinkKind = "app-store" | "google-play" | "website" | "web-app" | "hub" | "privacy" | "terms" | "support" | "delete-account";

export type OfficialLink = { kind: LinkKind; label: string; url: string };

export type FeatureGroup = { heading: string; items: string[] };

export type PortfolioApp = {
  slug: string;
  path: string;
  name: string;
  storeName: string;
  alternateNames?: string[];
  tagline: string;
  category: string;
  applicationCategory: string;
  appStoreId?: string;
  iosStatus: "live" | "in-review";
  playPackage?: string;
  androidStatus: "live" | "coming-soon" | "none";
  platforms: string[];
  contentRating?: string;
  website?: { url: string; label: string };
  webApp?: { url: string; label: string };
  privacyUrl: string;
  termsUrl: string;
  supportUrl: string;
  deleteAccountUrl?: string;
  summary: string;
  features: FeatureGroup[];
  pricing: string;
  creator?: { name: string; url: string };
  ownedByOrg: boolean;
  hasOwnPage: boolean;
  metaTitle: string;
  metaDescription: string;
};

const site = (path: string) => `${SITE_URL}${path}`;

export const APPS: PortfolioApp[] = [
  {
    slug: "repairradar",
    path: "/repairradar",
    name: "RepairRadar",
    storeName: "RepairRadar: Home Maintenance",
    tagline: "Home repair log, maintenance reminders and warranty tracker",
    category: "Home maintenance",
    applicationCategory: "LifestyleApplication",
    appStoreId: "6759541528",
    iosStatus: "live",
    androidStatus: "coming-soon",
    platforms: ["iPhone", "iPad"],
    contentRating: "4+",
    privacyUrl: site("/privacy"),
    termsUrl: site("/terms"),
    supportUrl: site("/support"),
    deleteAccountUrl: site("/repairradar/delete-account"),
    summary:
      "RepairRadar is a home maintenance app for iPhone and iPad from J&H Technology LLC. It keeps a log of every home repair with its cost, photos, status and due date, runs recurring maintenance schedules with reminders, tracks warranty expiry dates, stores receipts and manuals with the repair they belong to, and exports PDF or CSV reports for insurance, a contractor or a sale. It is free for up to 10 repairs with 2 photos per repair. Premium ($6.99/month or $69.99/year), Pro ($12.99/month or $129.99/year) and Property Manager ($19.99/month or $199.99/year) unlock more, with a 7-day free trial for eligible new subscribers. An Android version is coming soon.",
    features: [
      {
        heading: "Track every repair",
        items: [
          "Status, priority, cost, due date and reminders for each repair",
          "Photos of the problem and the fix",
          "A shopping list of parts and materials per repair",
          "A calendar and a timeline of all your repairs",
        ],
      },
      {
        heading: "Maintenance schedules",
        items: [
          "Recurring upkeep such as HVAC filters, gutters, smoke detectors and seasonal checks",
          "Reminders before tasks are due",
        ],
      },
      {
        heading: "Warranties and documents",
        items: [
          "Warranty expiry dates for appliances and home systems",
          "Receipts, manuals and invoices stored with the repair they belong to",
        ],
      },
      {
        heading: "Contractors and insurance",
        items: [
          "Your handyman, plumber and electrician details, with ratings and notes",
          "Photos, receipts and repair history kept together for an insurance claim",
        ],
      },
      {
        heading: "Reports and home value",
        items: [
          "Spending reports and cost breakdowns, exported to PDF or CSV",
          "Home Value: estimate how improvements and repairs affect your home's value",
        ],
      },
      {
        heading: "Multiple homes and sharing",
        items: [
          "More than one home or rental in one app",
          "A shared household with family members or co-managers (Property Manager)",
        ],
      },
      {
        heading: "AI Repair Assistant",
        items: [
          "Describe a problem and get step-by-step guidance, parts ideas and cost estimates",
          "Runs on your device with Apple Intelligence, so your questions stay private",
          "Requires iPhone 15 Pro or later with iOS 26 or later",
        ],
      },
    ],
    pricing:
      "Free for up to 10 repairs and 2 photos per repair. Premium $6.99/month or $69.99/year, Pro $12.99/month or $129.99/year, Property Manager $19.99/month or $199.99/year, each with a 7-day free trial for eligible new subscribers.",
    ownedByOrg: true,
    hasOwnPage: true,
    metaTitle: "RepairRadar: Home Repair Log & Maintenance App",
    metaDescription:
      "RepairRadar logs home repairs, costs, warranties and maintenance reminders on iPhone and iPad. Free for 10 repairs; plans from $6.99/month with a 7-day trial.",
  },
  {
    slug: "nannylog",
    path: "/nannylog",
    name: "NannyLog",
    storeName: "NannyLog: Reports, Hours & Pay",
    tagline: "Daily reports, hours and pay for nannies and babysitters",
    category: "Childcare",
    applicationCategory: "LifestyleApplication",
    appStoreId: "6757959069",
    iosStatus: "live",
    playPackage: "com.nannydaily.app",
    androidStatus: "live",
    platforms: ["iPhone", "iPad", "Android"],
    contentRating: "4+",
    website: { url: "https://nannydaily.com", label: "nannydaily.com" },
    privacyUrl: "https://nannydaily.com/privacy",
    termsUrl: "https://nannydaily.com/terms",
    supportUrl: "https://nannydaily.com/support",
    deleteAccountUrl: "https://nannydaily.com/delete-account",
    summary:
      "NannyLog is a nanny and babysitter app for iPhone, iPad and Android from J&H Technology LLC. Caregivers clock in, log meals, naps, diapers, activities and milestones with photos, send parents a daily report, track hours and pay for more than one family, and share invoices as PDFs. Parents join free with an 8-character invite code. The free plan covers one child and 10 log entries a day; NannyLog Premium, an optional subscription with a 7-day free trial for new subscribers, adds unlimited children and entries, hours tracking, invoices and arrival check-in.",
    features: [
      {
        heading: "Daily log and parent reports",
        items: [
          "One-tap timestamps for meals, bottles, naps, diaper changes, activities and milestones, with photos",
          "End-of-day parent reports built from what you logged, with an optional on-device AI draft on iPhones with Apple Intelligence (iOS 26 or later)",
          "Incident reports with severity levels and parent acknowledgement",
        ],
      },
      {
        heading: "Hours, pay and invoices",
        items: [
          "One-tap clock in and out, with a rate per family",
          "Invoices from tracked hours, shared as a PDF; invoiced hours are marked so they are never billed twice",
        ],
      },
      {
        heading: "For families",
        items: [
          "Parents use NannyLog free with an invite code",
          "Messaging, a shared calendar, expense reimbursement and supply requests",
          "More than one child and more than one family, kept separate",
        ],
      },
    ],
    pricing:
      "Free to download. The free plan covers one child and 10 log entries a day; NannyLog Premium is an optional subscription with a 7-day free trial for new subscribers. Parents use it free.",
    ownedByOrg: true,
    hasOwnPage: true,
    metaTitle: "NannyLog: Nanny App for Daily Reports, Hours & Pay",
    metaDescription:
      "NannyLog helps nannies and babysitters log the day, send parents daily reports, track hours and send invoices on iPhone, iPad and Android. Free for parents.",
  },
  {
    slug: "meal-prep",
    path: "/meal-prep",
    name: "Meal Prep",
    storeName: "Meal Prep: Weekly Meal Planner",
    alternateNames: ["MealPrepPro"],
    tagline: "Weekly meal plans, recipes with macros and a shopping list",
    category: "Meal planning",
    applicationCategory: "LifestyleApplication",
    appStoreId: "6757171359",
    iosStatus: "live",
    androidStatus: "coming-soon",
    platforms: ["iPhone", "iPad"],
    contentRating: "12+",
    website: { url: "https://weeklymealprep.food", label: "weeklymealprep.food" },
    privacyUrl: "https://weeklymealprep.food/privacy",
    termsUrl: "https://weeklymealprep.food/terms",
    supportUrl: "https://weeklymealprep.food/support",
    deleteAccountUrl: "https://weeklymealprep.food/delete-account",
    summary:
      "Meal Prep: Weekly Meal Planner (MealPrepPro on its website) is an iPhone and iPad app from J&H Technology LLC for planning a week of meals and shopping from one list. It has breakfast, lunch, dinner and snack slots for every day, 1,000+ recipes with calories and macros, 22 dietary filters, a shopping list built from the plan, and family sharing with an invite code. Plans, the shopping list and 300+ built-in recipes work offline. It is free to download; Premium, a monthly or annual subscription, adds every recipe and filter, a meal plan generator, a nutrition dashboard, a pantry tracker and, in the US, Walmart ordering. An Android version is coming soon.",
    features: [
      {
        heading: "Weekly meal planner",
        items: [
          "Breakfast, lunch, dinner and snack slots for every day",
          "Set how many adults and children you cook for, and plan leftovers",
          "Share plans with your family using an invite code",
        ],
      },
      {
        heading: "Recipes and nutrition",
        items: [
          "1,000+ recipes with calories, protein, carbs and fat per serving",
          "22 dietary filters, from vegan and gluten-free to halal, kosher and keto",
          "Cook mode keeps the screen awake and picks up timers from each step",
        ],
      },
      {
        heading: "Shopping list",
        items: [
          "Every ingredient from your plan in one list, grouped by store category",
          "Barcode scanning, and in the US with Premium, sending matching items to a Walmart cart",
        ],
      },
    ],
    pricing:
      "Free to download. Premium is an optional monthly or annual subscription that covers up to 6 people in a family; eligible new subscribers may get a free trial shown before purchase.",
    ownedByOrg: true,
    hasOwnPage: true,
    metaTitle: "Meal Prep: Weekly Meal Planner App for iPhone",
    metaDescription:
      "Meal Prep: Weekly Meal Planner plans your week, with 1,000+ recipes with macros, 22 dietary filters and a shopping list built from your plan on iPhone and iPad.",
  },
  {
    slug: "craving-crush",
    path: "/craving-crush",
    name: "Craving Crush",
    storeName: "Craving Crush",
    alternateNames: ["Craving Crush: Craving Log"],
    tagline: "Log cravings, ride out urges and spot your triggers",
    category: "Habits",
    applicationCategory: "LifestyleApplication",
    appStoreId: "6757388139",
    iosStatus: "live",
    playPackage: "com.cravecrush.app",
    androidStatus: "live",
    platforms: ["iPhone", "iPad", "Android"],
    contentRating: "4+",
    privacyUrl: site("/craving-crush/privacy"),
    termsUrl: site("/craving-crush/terms"),
    supportUrl: site("/craving-crush/support"),
    deleteAccountUrl: site("/craving-crush/delete-account"),
    summary:
      "Craving Crush is a craving tracker for iPhone, iPad and Android from J&H Technology LLC. You log a craving with its trigger, intensity and an optional note, ride out the urge with a 5-minute craving surf timer or a short distraction challenge, and keep your streak. Progress insights show how cravings change over time. The free plan includes up to 15 craving logs a month; Craving Crush Premium, a monthly or annual subscription, adds unlimited logs, more challenge categories and advanced insights. It is a self-awareness and habit tool, not a medical device.",
    features: [
      {
        heading: "Log, surf and distract",
        items: [
          "Log a craving with its trigger, intensity and an optional note",
          "A 5-minute craving surf timer to ride out an urge",
          "Short hydration, breathing and physical distraction challenges",
        ],
      },
      {
        heading: "Track progress",
        items: [
          "Streaks, a streak shield and badges",
          "Progress insights, history, weekday check-in reminders and a weekly summary",
          "Cloud backup when you sign in",
        ],
      },
    ],
    pricing:
      "Free to download, with up to 15 craving logs a month. Craving Crush Premium is an optional monthly or annual subscription; the price and any free trial are shown in the app.",
    ownedByOrg: true,
    hasOwnPage: true,
    metaTitle: "Craving Crush: Craving Tracker for iPhone and Android",
    metaDescription:
      "Craving Crush helps you log cravings, ride out urges with a 5-minute surf timer, and spot triggers and streaks on iPhone, iPad and Android, by J&H Technology.",
  },
  {
    slug: "handybook",
    path: "/handybook",
    name: "HandyBook",
    storeName: "HandyBook: Handyman Business",
    tagline: "Quotes, invoices, jobs and customers for handymen",
    category: "Business",
    applicationCategory: "BusinessApplication",
    appStoreId: "6761731339",
    iosStatus: "live",
    androidStatus: "none",
    platforms: ["iPhone", "Web"],
    contentRating: "4+",
    webApp: { url: "https://handymanbook.app", label: "handymanbook.app" },
    privacyUrl: "https://handymanbook.app/privacy",
    termsUrl: "https://handymanbook.app/terms",
    supportUrl: "https://handymanbook.app/help",
    summary:
      "HandyBook is business management software for handymen, contractors and trade professionals, on iPhone and on the web at handymanbook.app, from J&H Technology LLC. It covers line-item quotes and invoices sent by email or text, online quote acceptance and digital signatures, a job pipeline from lead to paid, scheduling with recurring jobs, a customer CRM, expense and time tracking, a materials catalog, profitability and tax summaries, and team roles. Jobs, customers and invoices stay viewable offline and sync when you reconnect.",
    features: [
      {
        heading: "Quotes and invoices",
        items: [
          "Line-item quotes with materials, labor and flat fees, sent by email or text",
          "Customers accept quotes online, and you collect digital signatures from your phone",
          "Automated invoice reminders",
        ],
      },
      {
        heading: "Jobs and customers",
        items: [
          "A pipeline board from lead to paid, a scheduling calendar and recurring jobs",
          "Job templates, before and after photos and a sketch pad for measurements",
          "A customer database with job history and a communication log",
        ],
      },
      {
        heading: "Money and team",
        items: [
          "Expense tracking with receipt photos, a time clock and a materials catalog",
          "Profitability reports and a tax summary",
          "Crew invites with owner, admin and field roles",
        ],
      },
    ],
    pricing: "Free to download from the App Store. Plans for the web app are listed at handymanbook.app.",
    ownedByOrg: true,
    hasOwnPage: true,
    metaTitle: "HandyBook: Handyman Business App for Quotes & Invoices",
    metaDescription:
      "HandyBook is handyman business software for iPhone and the web: quotes, invoices, job scheduling, customers, expenses and team roles. By J&H Technology.",
  },
  {
    slug: "stronger-couple",
    path: "/stronger-couple",
    name: "Stronger Couple",
    storeName: "Stronger Couple",
    tagline: "Weekly check-ins and calmer conversations for couples",
    category: "Relationships",
    applicationCategory: "LifestyleApplication",
    appStoreId: "6757447022",
    iosStatus: "live",
    playPackage: "com.couplescheckin.app",
    androidStatus: "live",
    platforms: ["iPhone", "iPad", "Android"],
    contentRating: "17+",
    website: { url: "https://strongercouple.app", label: "strongercouple.app" },
    privacyUrl: "https://strongercouple.app/privacy",
    termsUrl: "https://strongercouple.app/terms",
    supportUrl: "https://strongercouple.app/support",
    deleteAccountUrl: "https://strongercouple.app/delete-account",
    summary:
      "Stronger Couple is a relationship app for iPhone, iPad and Android from J&H Technology LLC. It gives couples a weekly guided check-in, daily appreciations in five love language categories, a 6-step guided flow for working through conflict, conversation prompts, a 160+ question partner quiz, 60+ date night ideas, shared goals and milestones, and relationship insights. Partners link with a private invite code. The free tier includes check-ins, appreciations and starter content with monthly limits, and Premium is a monthly or annual subscription. It is a self-guided tool, not therapy.",
    features: [
      {
        heading: "Talk regularly",
        items: [
          "A short weekly guided check-in with a reminder",
          "Daily appreciations in five love language categories",
          "Conversation prompts about connection, dreams, family, money, intimacy, repair and fun",
        ],
      },
      {
        heading: "Work through conflict",
        items: [
          "A 6-step guided flow that starts with a safety check",
          "Turn-taking with a timer, repair attempts and a saved summary of what you agreed",
        ],
      },
      {
        heading: "Have fun and grow",
        items: [
          "A 160+ question \"how well do you know each other\" quiz and 60+ date night ideas",
          "Shared goals, milestones and relationship insights",
          "Help Now lists crisis and support lines, even offline",
        ],
      },
    ],
    pricing:
      "Free to download, with monthly limits on the free tier. Premium is an optional monthly or annual subscription; a free trial may be offered to eligible new subscribers.",
    ownedByOrg: true,
    hasOwnPage: true,
    metaTitle: "Stronger Couple: Relationship Check-in App",
    metaDescription:
      "Stronger Couple gives couples weekly check-ins, daily appreciations and a calm, step-by-step way through conflict, on iPhone, iPad and Android. Not therapy.",
  },
  {
    slug: "slang-decoder",
    path: "/slang",
    name: "Slang Decoder",
    storeName: "Slang Decoder - Gen Z & Alpha",
    tagline: "Gen Z and Gen Alpha slang, explained for parents",
    category: "Education",
    applicationCategory: "EducationalApplication",
    appStoreId: "6759603354",
    iosStatus: "live",
    androidStatus: "none",
    platforms: ["iPhone"],
    contentRating: "4+",
    privacyUrl: site("/privacy"),
    termsUrl: site("/terms"),
    supportUrl: site("/support"),
    summary:
      "Slang Decoder is an iPhone app from J&H Technology LLC that explains Gen Z and Gen Alpha slang to parents, grandparents and teachers. Every term has a plain-English meaning, a real example, the generation that uses it and a parent safety rating. It is free to download, with an optional Premium subscription ($2.99/month or $19.99/year, 7-day free trial). Its public slang index lives at jandhtechnology.com/slang.",
    features: [],
    pricing: "Free to download, with an optional Premium subscription ($2.99/month or $19.99/year, 7-day free trial).",
    ownedByOrg: true,
    hasOwnPage: false,
    metaTitle: "Slang Decoder",
    metaDescription: "",
  },
  {
    slug: "bold-watchman",
    path: "/bold-watchman",
    name: "Bold Watchman",
    storeName: "Bold Watchman",
    alternateNames: ["BOLD Watchman: Accountability", "Watchman"],
    tagline: "Faith-based accountability for men",
    category: "Faith and accountability",
    applicationCategory: "LifestyleApplication",
    appStoreId: "6768419299",
    iosStatus: "live",
    playPackage: "app.boldmen.boldp1",
    androidStatus: "live",
    platforms: ["iPhone", "iPad", "Android"],
    contentRating: "17+",
    website: { url: "https://www.boldmen.org/watchman", label: "boldmen.org/watchman" },
    privacyUrl: "https://www.boldmen.org/privacy",
    termsUrl: "https://www.boldmen.org/terms",
    supportUrl: "https://www.boldmen.org/contact",
    deleteAccountUrl: "https://www.boldmen.org/delete-account",
    creator: { name: "B.O.L.D. (Brothers Overcoming Lustful Desires)", url: "https://www.boldmen.org" },
    summary:
      "Bold Watchman (BOLD Watchman: Accountability on Google Play) is a faith-based accountability app for men, on iPhone, iPad and Android. It is built and maintained by the B.O.L.D. ministry (Brothers Overcoming Lustful Desires) and published on the App Store and Google Play by J&H Technology LLC. The free core includes a daily check-in, a small accountability community, prayer requests, Scripture and devotionals, and group meetings. Watchman Premium, an optional subscription, adds an on-device content filter and real-time alerts to your accountability team when something is blocked. Filtering runs on the device, and browsing history is never collected.",
    features: [
      {
        heading: "Free core",
        items: [
          "A daily check-in your group can see",
          "A small accountability community with encouragement and prayer requests",
          "A verse of the day, written devotionals and group meetings",
        ],
      },
      {
        heading: "Watchman Premium",
        items: [
          "An on-device content filter that blocks adult sites across browsers",
          "Real-time alerts to your accountability team when something is blocked",
          "Your team sees only that something was blocked, never what you were doing",
        ],
      },
    ],
    pricing: "Free to start. Watchman Premium is an optional auto-renewing subscription.",
    ownedByOrg: false,
    hasOwnPage: true,
    metaTitle: "Bold Watchman: Christian Accountability App for Men",
    metaDescription:
      "Bold Watchman is a faith-based accountability app for men by the B.O.L.D. ministry: daily check-ins, community, prayer and an optional on-device content filter.",
  },
  {
    slug: "protravel",
    path: "/protravel",
    name: "ProTravel",
    storeName: "ProTravel",
    tagline: "Trip plans, packing lists and travel budgets",
    category: "Travel",
    applicationCategory: "TravelApplication",
    appStoreId: "6757807664",
    iosStatus: "live",
    androidStatus: "none",
    platforms: ["iPhone", "iPad"],
    contentRating: "17+",
    privacyUrl: site("/privacy"),
    termsUrl: site("/terms"),
    supportUrl: site("/support"),
    summary:
      "ProTravel is a trip planning app for iPhone and iPad from J&H Technology LLC. It keeps trip itineraries with destinations, dates and notes, builds packing lists from templates for beach, business and camping trips, and tracks upcoming, ongoing and completed trips. The free plan includes 5 trips and 3 packing lists with cloud sync; Premium, with a 7-day free trial, adds unlimited trips and lists, budget and expense tracking by category, AI trip planning suggestions, offline access and export.",
    features: [
      {
        heading: "Plan and pack",
        items: [
          "Trip itineraries with destinations, dates and notes",
          "Packing lists from templates for beach, business, camping and more",
          "Upcoming, ongoing and completed trips with reminders",
        ],
      },
      {
        heading: "Premium",
        items: [
          "Unlimited trips and packing lists",
          "Trip budgets and expenses by category",
          "AI trip planning suggestions, offline access and export",
        ],
      },
    ],
    pricing: "Free to download, with 5 trips and 3 packing lists. Premium is an optional subscription with a 7-day free trial.",
    ownedByOrg: true,
    hasOwnPage: true,
    metaTitle: "ProTravel: Trip Planner and Packing List App",
    metaDescription:
      "ProTravel plans trips, builds packing lists from templates and tracks travel budgets on iPhone and iPad. Free for 5 trips; Premium adds more. By J&H Technology.",
  },
  {
    slug: "coffee-tasting",
    path: "/coffee-tasting",
    name: "Coffee Tasting",
    storeName: "Coffee Tasting: Cupping Notes",
    tagline: "A cupping app and coffee tasting journal",
    category: "Food and drink",
    applicationCategory: "LifestyleApplication",
    appStoreId: "6824314389",
    iosStatus: "in-review",
    playPackage: "com.jarrodhale.coffeetasting",
    androidStatus: "live",
    platforms: ["Android"],
    website: { url: "https://coffeetasting.app", label: "coffeetasting.app" },
    privacyUrl: site("/coffee-tasting/privacy"),
    termsUrl: site("/coffee-tasting/terms"),
    supportUrl: site("/coffee-tasting/support"),
    deleteAccountUrl: site("/coffee-tasting/delete-account"),
    summary:
      "Coffee Tasting: Cupping Notes is a cupping app and coffee tasting journal from J&H Technology LLC for baristas, roasters, cuppers and home brewers. You set up a tasting, add each coffee and record every field on the cupping sheet, picking notes from 250+ flavor and character terms, with optional scores from 6.00 to 10.00. It works offline with no sign-up, and tastings stay on your device. Up to three tastings are free, and an in-app upgrade unlocks unlimited tastings. It is on Google Play now, and the iPhone version is in App Review.",
    features: [
      {
        heading: "The whole cupping sheet",
        items: [
          "Fragrance, aroma, flavor, aftertaste, acidity, mouthfeel, balance, sweetness and more",
          "250+ flavor and character terms to drill down from Fruit to Citrus to Clementine",
          "Optional scores from 6.00 to 10.00 in quarter steps",
        ],
      },
    ],
    pricing: "Free for up to three tastings, with an in-app upgrade for unlimited tastings.",
    ownedByOrg: true,
    hasOwnPage: true,
    metaTitle: "Coffee Tasting: Cupping Notes App",
    metaDescription:
      "Coffee Tasting: Cupping Notes is a cupping app and coffee tasting journal: record every cupping-sheet field from 250+ flavor terms, offline. On Google Play now.",
  },
];

export function getApp(slug: string): PortfolioApp {
  const app = APPS.find((a) => a.slug === slug);
  if (!app) throw new Error(`Unknown app: ${slug}`);
  return app;
}

export const PAGE_APPS = APPS.filter((a) => a.hasOwnPage);

export function pageUrl(app: PortfolioApp): string {
  return `${SITE_URL}${app.path}`;
}

export function appJsonLdId(app: PortfolioApp): string {
  return app.slug === "slang-decoder" ? `${SITE_URL}/#slang-decoder-app` : `${pageUrl(app)}#app`;
}

export function appStoreUrl(app: PortfolioApp): string | undefined {
  return app.appStoreId && app.iosStatus === "live" ? `https://apps.apple.com/app/id${app.appStoreId}` : undefined;
}

export function playUrl(app: PortfolioApp): string | undefined {
  return app.playPackage && app.androidStatus === "live"
    ? `https://play.google.com/store/apps/details?id=${app.playPackage}`
    : undefined;
}

export function storeLinks(app: PortfolioApp): OfficialLink[] {
  const links: OfficialLink[] = [];
  const ios = appStoreUrl(app);
  const android = playUrl(app);
  if (ios) links.push({ kind: "app-store", label: `${app.name} on the App Store`, url: ios });
  if (android) links.push({ kind: "google-play", label: `${app.name} on Google Play`, url: android });
  return links;
}

export function officialLinks(app: PortfolioApp): OfficialLink[] {
  const links = storeLinks(app);
  if (app.website) links.push({ kind: "website", label: `Official website: ${app.website.label}`, url: app.website.url });
  if (app.webApp) links.push({ kind: "web-app", label: `Web app: ${app.webApp.label}`, url: app.webApp.url });
  if (!app.hasOwnPage) links.push({ kind: "hub", label: `${app.name} on jandhtechnology.com`, url: pageUrl(app) });
  links.push({ kind: "privacy", label: "Privacy policy", url: app.privacyUrl });
  links.push({ kind: "terms", label: "Terms of use", url: app.termsUrl });
  links.push({ kind: "support", label: "Support", url: app.supportUrl });
  if (app.deleteAccountUrl) links.push({ kind: "delete-account", label: "Delete your account and data", url: app.deleteAccountUrl });
  return links;
}

// Entity links for sameAs: store listings and the app's own site. Legal pages are not identities of the
// app, so they are left out.
export function sameAsUrls(app: PortfolioApp): string[] {
  const urls = storeLinks(app).map((l) => l.url);
  if (app.website) urls.push(app.website.url);
  if (app.webApp) urls.push(app.webApp.url);
  return urls;
}

export function platformSummary(app: PortfolioApp): string {
  const parts = [...app.platforms];
  if (app.iosStatus === "in-review") parts.push("iPhone (in App Review)");
  if (app.androidStatus === "coming-soon") parts.push("Android (coming soon)");
  return parts.join(", ");
}

export function operatingSystems(app: PortfolioApp): string {
  const os: string[] = [];
  if (app.iosStatus === "live") os.push("iOS 15.1 or later");
  if (app.androidStatus === "live") os.push("Android");
  if (app.webApp) os.push("Web browser");
  return os.join(", ");
}
