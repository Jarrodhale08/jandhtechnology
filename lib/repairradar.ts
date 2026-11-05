// RepairRadar plans, FAQ and guides. Prices, limits and the trial are from the app's
// src/config/premiumFeatures.ts and the App Store Connect introductory offers (7-day free trial on all six
// subscriptions). Text may contain [label](url) links; internal links start with "/".

export type Plan = {
  id: "free" | "premium" | "pro" | "property_manager";
  name: string;
  monthly: number | null;
  yearly: number | null;
  description: string;
  features: string[];
};

export const TRIAL_DAYS = 7;

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthly: null,
    yearly: null,
    description: "Start logging without paying.",
    features: ["Up to 10 repairs", "2 photos per repair", "One home", "Data stored on your device"],
  },
  {
    id: "premium",
    name: "Premium",
    monthly: 6.99,
    yearly: 69.99,
    description: "Everything a single home needs.",
    features: [
      "Unlimited repairs and photos",
      "Documents, warranties and contractors",
      "Calendar, timeline and spending reports",
      "PDF and CSV export",
      "Backup and sync across your devices",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 12.99,
    yearly: 129.99,
    description: "For a second home and deeper insight.",
    features: [
      "Everything in Premium",
      "Up to 2 homes",
      "Home Value estimates",
      "AI Repair Assistant (iPhone 15 Pro or later, iOS 26 or later)",
    ],
  },
  {
    id: "property_manager",
    name: "Property Manager",
    monthly: 19.99,
    yearly: 199.99,
    description: "For landlords and shared households.",
    features: ["Everything in Pro", "Unlimited homes", "Household sharing with family members or co-managers"],
  },
];

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function yearlySavingsPercent(plan: Plan): number | null {
  if (plan.monthly === null || plan.yearly === null) return null;
  return Math.round((1 - plan.yearly / (plan.monthly * 12)) * 100);
}

export type Faq = { question: string; answer: string };

export const REPAIRRADAR_FAQ: Faq[] = [
  {
    question: "What is RepairRadar?",
    answer:
      "RepairRadar is a home maintenance app for iPhone and iPad from J&H Technology LLC. It logs every home repair with its cost, photos, status and due date, runs recurring maintenance schedules with reminders, tracks warranties, stores receipts and manuals, and exports PDF or CSV reports.",
  },
  {
    question: "Is RepairRadar free?",
    answer:
      "Yes, RepairRadar is free to download and free to use for up to 10 repairs with 2 photos per repair, for one home. Paid plans remove the limits and add documents, contractors, reports, export and backup.",
  },
  {
    question: "How much does RepairRadar cost?",
    answer:
      "Premium is $6.99 a month or $69.99 a year, Pro is $12.99 a month or $129.99 a year, and Property Manager is $19.99 a month or $199.99 a year. Paying yearly costs about 17% less than paying monthly. Prices are in US dollars and the App Store shows the price for your country before you confirm.",
  },
  {
    question: "Does RepairRadar have a free trial?",
    answer:
      "Yes. Every paid plan has a 7-day free trial for eligible new subscribers. The subscription renews automatically unless you cancel at least 24 hours before the trial or period ends, in your Apple Account subscription settings.",
  },
  {
    question: "Is RepairRadar available on Android?",
    answer:
      "Not yet. RepairRadar is available on the App Store for iPhone and iPad, and an Android version is coming soon. This page will link to Google Play when it is public.",
  },
  {
    question: "Can I use RepairRadar without an account?",
    answer:
      "Yes. As a guest your data is stored only on your device. Create an account and subscribe to Premium or higher to back up and sync your repairs, photos and documents across your devices.",
  },
  {
    question: "Can I share a home with family or a co-manager?",
    answer:
      "Yes, on the Property Manager plan. It adds household sharing, so family members or co-managers can work from the same homes and repairs, along with unlimited homes.",
  },
  {
    question: "Does the AI Repair Assistant send my questions to a server?",
    answer:
      "No. The AI Repair Assistant runs on your device with Apple Intelligence, so your questions stay private. It is part of the Pro and Property Manager plans and needs an iPhone 15 Pro or later with iOS 26 or later.",
  },
  {
    question: "How do I delete my RepairRadar account?",
    answer:
      "In the app, go to Settings, then Privacy, tap Delete All Data, type DELETE and confirm. Your data is deleted from our servers straight away. Deleting your account does not cancel a subscription. Full steps are on the [delete account page](/repairradar/delete-account).",
  },
  {
    question: "Who makes RepairRadar?",
    answer:
      "RepairRadar is developed and published by J&H Technology LLC, a US app developer. For help, see [support](/support) or email jarrod@jandhtechnology.com.",
  },
];

export type GuideSection = { id: string; heading: string; paragraphs?: string[]; list?: string[]; ordered?: boolean };

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  summary: string;
  keyPoints: string[];
  sections: GuideSection[];
  appTip: string;
  sources: { label: string; url: string }[];
  datePublished: string;
  dateModified: string;
};

const PUBLISHED = "2026-11-05";

export const GUIDES: Guide[] = [
  {
    slug: "seasonal-home-maintenance-checklist",
    title: "Seasonal home maintenance checklist",
    metaTitle: "Seasonal Home Maintenance Checklist | RepairRadar",
    description:
      "A season-by-season home maintenance checklist: monthly safety checks, spring and fall gutter and HVAC jobs, winter freeze prevention, and yearly tasks to log.",
    summary:
      "Test smoke and carbon monoxide alarms every month and check the HVAC filter. In spring, clean gutters and service the air conditioning. In summer, check the outside of the house. In fall, clean gutters again, service the heating and get the chimney inspected. In winter, prevent frozen pipes and ice dams. Once a year, flush the water heater and replace anything past its service life. Write down the date of each job so you know when it is next due.",
    keyPoints: [
      "Monthly: test smoke and CO alarms, check the HVAC filter.",
      "Spring and fall: gutters, plus servicing whichever system is about to work hardest.",
      "Winter: protect pipes and keep vents and roofs clear.",
      "Yearly: water heater, chimney, alarm replacement dates and appliance hoses.",
    ],
    sections: [
      {
        id: "monthly",
        heading: "Every month",
        list: [
          "Test every smoke alarm with its test button. The U.S. Fire Administration recommends testing monthly and replacing the whole smoke alarm every 10 years.",
          "Test carbon monoxide alarms the same way, and replace them by the date on the back.",
          "Check the HVAC filter and replace it when it looks dirty or on the schedule the manufacturer gives. Many filters last one to three months; homes with pets or allergies often need more frequent changes.",
          "Run water in rarely used sinks and showers, and look under sinks for drips or stains.",
        ],
      },
      {
        id: "spring",
        heading: "Spring",
        list: [
          "Clean gutters and downspouts, and check that downspouts send water away from the foundation.",
          "Look at the roof from the ground (or with binoculars) for missing, cracked or lifted shingles and damaged flashing.",
          "Have the air conditioning serviced before the first hot week, and clear leaves and debris from around the outdoor unit.",
          "Check exterior caulk and paint around windows and doors.",
          "Test the sump pump if you have one by pouring water into the pit.",
          "After a heavy rain, look for water pooling near the foundation.",
        ],
      },
      {
        id: "summer",
        heading: "Summer",
        list: [
          "Inspect decks, porches and railings for loose boards, popped nails and soft wood.",
          "Clean the dryer lint filter after every load and have the dryer vent duct cleaned out regularly; lint build-up is a fire risk.",
          "Check irrigation and outdoor faucets for leaks.",
          "Trim plants and branches away from the siding, roof and outdoor AC unit.",
        ],
      },
      {
        id: "fall",
        heading: "Fall",
        list: [
          "Clean gutters again once the leaves have fallen.",
          "Have the furnace or heat pump serviced before the heating season.",
          "Have the chimney, fireplace and vents inspected once a year, as the National Fire Protection Association recommends, and swept when needed.",
          "In cold climates, disconnect garden hoses and shut off and drain outdoor faucets before the first freeze.",
          "Seal drafts around doors and windows with weatherstripping or caulk.",
        ],
      },
      {
        id: "winter",
        heading: "Winter",
        list: [
          "Keep pipes in unheated spaces from freezing: insulate them, keep the heat on when you travel, and know where your main water shut-off is.",
          "Watch for ice dams and icicles along the roof edge, which can mean heat is escaping into the attic.",
          "Keep furnace intakes, dryer vents and the gas meter clear of snow.",
          "Test a standby generator before you need it, and never run one indoors or in a garage.",
        ],
      },
      {
        id: "yearly",
        heading: "Once a year",
        list: [
          "Flush the water heater to clear sediment, following the manufacturer's instructions.",
          "Check washing machine and dishwasher hoses for bulges or cracks.",
          "Check the pressure gauge on each fire extinguisher.",
          "Note the install dates of smoke alarms, CO alarms and the water heater so you know when they need replacing.",
          "Review your warranties and note any that expire in the next year.",
        ],
      },
      {
        id: "record",
        heading: "Record what you did",
        paragraphs: [
          "A checklist only helps if you know when each job was last done. Write down the date, what you did, what it cost and who did it. That record also helps with warranty claims, insurance claims and selling the house, because it shows the home was looked after.",
        ],
      },
    ],
    appTip:
      "In RepairRadar, set each of these jobs up as a recurring maintenance schedule (HVAC filters, gutters, smoke detectors and seasonal checks) and the app reminds you before each one is due. Log the completed job as a repair with its cost and photos.",
    sources: [
      { label: "U.S. Fire Administration: smoke alarms", url: "https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/smoke-alarms/" },
      { label: "NFPA: smoke alarms", url: "https://www.nfpa.org/education-and-research/home-fire-safety/smoke-alarms" },
    ],
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  },
  {
    slug: "track-home-repair-costs-taxes-resale",
    title: "How to track home repair costs for taxes and resale",
    metaTitle: "Track Home Repair Costs for Taxes and Resale | RepairRadar",
    description:
      "How to track home repair and improvement costs: what to record, why the IRS treats improvements and repairs differently, and how long to keep the records.",
    summary:
      "Record every repair and improvement with the date, a description, the cost, who did the work and the receipt. Keep improvements separate from repairs: for a main home, the IRS adds the cost of improvements to your basis, which can reduce taxable gain when you sell, while ordinary repairs usually are not added. For a rental, repairs are generally deductible in the year you pay for them and improvements are depreciated. Keep the records until the IRS period of limitations expires for the year you sell the home.",
    keyPoints: [
      "Record date, description, cost, contractor and receipt for every job.",
      "Tag each cost as a repair or an improvement.",
      "Improvements to a main home add to its basis; ordinary repairs usually don't.",
      "Keep property records until the limitations period ends for the year you sell.",
    ],
    sections: [
      {
        id: "what-to-record",
        heading: "What to record for every job",
        list: [
          "The date the work was done (and the date paid, if different).",
          "What was done and where in the house.",
          "The total cost, split into materials and labor if you have it.",
          "Who did it: the contractor's name, license number if relevant, and contact details.",
          "The receipt or invoice, and before-and-after photos.",
          "Any warranty that came with the work or the product.",
        ],
      },
      {
        id: "repairs-vs-improvements",
        heading: "Repairs and improvements are not the same",
        paragraphs: [
          "The IRS treats repairs and improvements differently. An improvement adds to the value of your home, prolongs its useful life or adapts it to new uses: a new roof, an addition, central air, new windows or a remodeled kitchen. A repair keeps the home in good condition without adding value or prolonging its life: fixing a leak, patching drywall or replacing a broken window pane.",
          "For your main home, [IRS Publication 523](https://www.irs.gov/publications/p523) explains that the cost of improvements is added to your basis. A higher basis means a smaller gain when you sell. Repairs are generally not added, unless they are done as part of a larger improvement project.",
          "When you sell your main home, you may be able to exclude up to $250,000 of gain ($500,000 for a married couple filing jointly) if you meet the ownership and use tests. Improvement records matter most when the gain could be larger than that, or when you don't qualify for the full exclusion.",
        ],
      },
      {
        id: "rentals",
        heading: "If the home is a rental",
        paragraphs: [
          "For rental property, [IRS Publication 527](https://www.irs.gov/publications/p527) says you can generally deduct the cost of repairs in the year you pay for them, but you can't deduct the cost of improvements; you recover them through depreciation instead. That makes the repair-or-improvement label on each cost even more important.",
        ],
      },
      {
        id: "how-long",
        heading: "How long to keep the records",
        paragraphs: [
          "The IRS says to keep records relating to property until the period of limitations expires for the year in which you dispose of the property. For a home, that means keeping improvement records for as long as you own it, and for a few years after you sell. See [How long should I keep records?](https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records) on IRS.gov.",
        ],
      },
      {
        id: "resale",
        heading: "Why it helps when you sell",
        paragraphs: [
          "Buyers and their inspectors ask how old the roof, the HVAC system and the water heater are. A dated history with receipts answers those questions quickly, shows the house was looked after, and helps you back up the asking price. It also helps you fill in seller disclosure forms accurately.",
        ],
      },
      {
        id: "not-advice",
        heading: "A note on tax advice",
        paragraphs: [
          "This guide explains general rules from IRS publications and is not tax advice. Tax rules change and your situation may differ, so check with a tax professional before you rely on a specific treatment.",
        ],
      },
    ],
    appTip:
      "RepairRadar records the cost, date, photos and receipts for every repair, stores invoices with the repair they belong to, and turns your history into spending reports you can export to PDF or CSV for your tax preparer or a buyer.",
    sources: [
      { label: "IRS Publication 523, Selling Your Home", url: "https://www.irs.gov/publications/p523" },
      { label: "IRS Publication 527, Residential Rental Property", url: "https://www.irs.gov/publications/p527" },
      {
        label: "IRS: How long should I keep records?",
        url: "https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records",
      },
    ],
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  },
  {
    slug: "warranty-claim-records",
    title: "What to record for home warranty claims",
    metaTitle: "What to Record for Home Warranty Claims | RepairRadar",
    description:
      "What to record so a home or appliance warranty claim goes smoothly: model and serial numbers, proof of purchase, registration, maintenance history and photos.",
    summary:
      "For every appliance and home system, keep the model and serial number, the proof of purchase, the installation date and installer, the warranty terms and expiry date, and any registration confirmation. Keep a dated maintenance history, because many warranties require proper maintenance. When something fails, photograph it, write down what happened and when, and log every call with names and claim numbers.",
    keyPoints: [
      "Model, serial number, purchase date and receipt for each item.",
      "Warranty length, what it covers, and the expiry date.",
      "Registration confirmation if the maker asks you to register.",
      "A dated maintenance history and photos of any failure.",
    ],
    sections: [
      {
        id: "before",
        heading: "Record these before anything breaks",
        list: [
          "Product, brand, model number and serial number (usually on a label inside the door, on the back, or on the unit's data plate).",
          "Purchase date, seller and the receipt or invoice.",
          "Installation date and who installed it. Some warranties require professional installation.",
          "The warranty document: how long it lasts, whether parts and labor are covered, and what voids it.",
          "Registration confirmation. Some manufacturers ask you to register within a set time, sometimes to get a longer term.",
          "The expiry date, so you can check the item before coverage ends.",
        ],
      },
      {
        id: "maintenance",
        heading: "Keep a maintenance history",
        paragraphs: [
          "Many warranties for HVAC systems, water heaters and roofs require reasonable or regular maintenance, and a claim can be refused if you can't show it was done. Keep the date, what was done and the invoice for every service visit and filter change.",
          "Under the federal [Magnuson-Moss Warranty Act](https://www.law.cornell.edu/uscode/text/15/2302), a warrantor generally can't make a warranty conditional on using a particular brand of parts or service unless it provides them free. Using an independent technician doesn't void a warranty by itself, but you still need records that the work was done properly.",
        ],
      },
      {
        id: "when-it-fails",
        heading: "When something fails",
        ordered: true,
        list: [
          "Stop using it if it is unsafe, and limit further damage (shut off water or power if needed).",
          "Take dated photos and short videos of the problem, error codes and any damage it caused.",
          "Write down what happened and when you first noticed it.",
          "Find the warranty, the receipt and the serial number before you call.",
          "Log every contact: the date, the person you spoke to, the claim or ticket number, and what they promised.",
          "Keep the invoices for any repair, including the parts that were replaced.",
        ],
      },
      {
        id: "types",
        heading: "Know which warranty applies",
        paragraphs: [
          "A manufacturer's warranty covers a product such as an appliance or a water heater. A contractor's or builder's warranty covers the workmanship of a job or a new home. A home warranty is a service contract you buy separately, with its own exclusions and service fees. One failure can involve more than one, so keep the documents for each.",
        ],
      },
    ],
    appTip:
      "RepairRadar tracks warranty expiry dates for your appliances and home systems, keeps receipts and manuals with the repair they belong to, and keeps photos and repair history together so your records are ready when you file a claim.",
    sources: [{ label: "15 U.S.C. § 2302, Magnuson-Moss Warranty Act (Cornell LII)", url: "https://www.law.cornell.edu/uscode/text/15/2302" }],
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  },
  {
    slug: "shared-rental-home-repairs",
    title: "How to coordinate repairs in a shared or rental home",
    metaTitle: "Coordinate Repairs in a Shared or Rental Home | RepairRadar",
    description:
      "How to coordinate repairs with roommates, family, tenants or a landlord: one shared list, written requests, who pays, emergencies and a record of each fix.",
    summary:
      "Keep one shared list of repairs that everyone can see. Put every request in writing with the date and photos, agree up front who is responsible for what and how costs are split, and decide what counts as an emergency. When the work is done, record the date, the cost and who did it. Tenants and landlords should also follow the lease and local notice rules.",
    keyPoints: [
      "One shared list instead of scattered texts.",
      "Written, dated requests with photos.",
      "Agree who pays and who arranges each kind of repair.",
      "Know the emergency plan and where the shut-offs are.",
    ],
    sections: [
      {
        id: "one-list",
        heading: "Keep one list everyone can see",
        paragraphs: [
          "Repairs get missed when requests live in different text threads. Keep a single list with each problem, where it is, who reported it, its priority and its status, so everyone knows what is waiting, what is booked and what is done.",
        ],
      },
      {
        id: "in-writing",
        heading: "Put requests in writing",
        list: [
          "Describe the problem, where it is and when it started.",
          "Add photos or a short video.",
          "Date the request, and keep the reply.",
          "Tenants: send requests the way the lease says (for example a portal or email), even if you also mention it in person.",
        ],
      },
      {
        id: "who-pays",
        heading: "Agree who does what, and who pays",
        paragraphs: [
          "In a shared house, agree in advance how shared costs are split and who books contractors. In a rental, the lease usually says which repairs the tenant handles (such as replacing light bulbs) and which the landlord handles. In most states landlords must keep a rental fit to live in, but the details, including how much notice a landlord must give before entering, vary by state and city. Check your lease and local rules.",
        ],
      },
      {
        id: "emergencies",
        heading: "Have an emergency plan",
        list: [
          "Agree what counts as an emergency: no heat in winter, a burst pipe or active leak, sewage backup, no power, or a security problem such as a broken lock.",
          "Make sure everyone knows where the main water shut-off and the electrical panel are.",
          "If you smell gas, leave the building and call the gas utility or 911 from outside.",
          "Keep the emergency numbers for the landlord, property manager and key contractors in one place.",
        ],
      },
      {
        id: "record",
        heading: "Close the loop",
        paragraphs: [
          "When a repair is finished, record the date, the cost, who did it and photos of the result, and tell everyone it's done. A dated history helps settle disagreements about what was reported and when, and helps with deposits at move-out.",
        ],
      },
    ],
    appTip:
      "RepairRadar's Property Manager plan adds household sharing, so family members or co-managers work from the same homes and repair list, each repair carries its status, priority, photos and due date, and the history is there when you need it.",
    sources: [],
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  },
  {
    slug: "property-manager-maintenance-log",
    title: "Property manager maintenance logs: what to track",
    metaTitle: "Property Manager Maintenance Log Guide | RepairRadar",
    description:
      "What a property manager maintenance log should track for each unit: requests, vendors, costs, photos and completion dates, plus preventive schedules.",
    summary:
      "A good maintenance log has one entry per job with the property and unit, the date reported, who reported it, a description and priority, photos, the vendor, the quote and final cost, the invoice, the completion date and whether the tenant was told. Add a preventive schedule for each property, label each cost as a repair or an improvement, and keep the records until the tax limitations period ends for the year you sell the property.",
    keyPoints: [
      "One entry per job, per unit, with dates from report to completion.",
      "Vendor, cost, invoice and photos on every entry.",
      "Preventive schedules for each property.",
      "Repair or improvement label on every cost.",
    ],
    sections: [
      {
        id: "fields",
        heading: "Fields every entry should have",
        list: [
          "Property and unit.",
          "Date reported and who reported it (tenant, inspection, or you).",
          "Description, location in the unit, category (plumbing, electrical, HVAC, appliance) and priority.",
          "Before and after photos.",
          "Vendor or technician, with their quote and the final cost.",
          "The invoice or receipt.",
          "Date completed, and the date the tenant was told.",
          "Any warranty on the parts or the work.",
        ],
      },
      {
        id: "preventive",
        heading: "Preventive maintenance per property",
        paragraphs: [
          "Reactive repairs cost more than planned ones. Give each property a schedule for HVAC servicing, filter changes, gutter cleaning, smoke and CO alarm checks, water heater flushing and seasonal inspections, and check alarms and appliances at every turnover.",
        ],
      },
      {
        id: "money",
        heading: "Label every cost for taxes",
        paragraphs: [
          "For rental property, [IRS Publication 527](https://www.irs.gov/publications/p527) says repairs are generally deductible in the year you pay for them, while improvements are depreciated over time. Label each cost when you log it, and your year-end numbers are ready for your accountant. This is general information, not tax advice.",
        ],
      },
      {
        id: "retention",
        heading: "How long to keep the log",
        paragraphs: [
          "The IRS says to keep records relating to property until the period of limitations expires for the year in which you dispose of it, because you need them to work out depreciation and your gain or loss on sale. See [How long should I keep records?](https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records).",
        ],
      },
      {
        id: "reports",
        heading: "Review it regularly",
        paragraphs: [
          "Once a month, look for repeat problems in the same unit, slow vendors and rising costs per property. Recurring issues often point to a bigger repair or a replacement that would cost less in the long run.",
        ],
      },
    ],
    appTip:
      "RepairRadar's Property Manager plan covers unlimited homes and household sharing with co-managers. Each repair stores its cost, photos, documents and contractor, maintenance schedules handle the preventive work, and reports export to PDF or CSV.",
    sources: [
      { label: "IRS Publication 527, Residential Rental Property", url: "https://www.irs.gov/publications/p527" },
      {
        label: "IRS: How long should I keep records?",
        url: "https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records",
      },
    ],
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidePath(slug: string): string {
  return `/repairradar/guides/${slug}`;
}
