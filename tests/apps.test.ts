import { test } from "node:test";
import assert from "node:assert/strict";
import {
  APPS,
  PAGE_APPS,
  appJsonLdId,
  appStoreUrl,
  getApp,
  officialLinks,
  operatingSystems,
  platformSummary,
  playUrl,
  sameAsUrls,
} from "../lib/apps";
import { appFaq, joinList } from "../lib/apps-faq";
import { appListJsonLd, articleJsonLd, mobileAppJsonLd, organizationJsonLd } from "../lib/apps-jsonld";
import { COMPANY_PITCH, portfolioLlmsFull, portfolioLlmsSection } from "../lib/apps-llms";
import { GUIDES, PLANS, REPAIRRADAR_FAQ, formatPrice, getGuide, guidePath, yearlySavingsPercent } from "../lib/repairradar";
import { ORG_ID, serializeJsonLd } from "../lib/slang-jsonld";

const SITE = "https://www.jandhtechnology.com";
const PUBLIC_PLAY = ["com.nannydaily.app", "app.boldmen.boldp1", "com.jarrodhale.coffeetasting", "com.cravecrush.app", "com.couplescheckin.app"];
const UNRELEASED = /sports tracker|command view|outfitmate|sportsparent/i;

type Node = Record<string, unknown>;
const roundTrip = (n: Node | Node[]) => JSON.parse(serializeJsonLd(n)) as Node;

test("app data: unique slugs, paths, titles and descriptions within SEO limits", () => {
  assert.equal(new Set(APPS.map((a) => a.slug)).size, APPS.length);
  assert.equal(new Set(APPS.map((a) => a.path)).size, APPS.length);
  assert.equal(new Set(PAGE_APPS.map((a) => a.metaTitle)).size, PAGE_APPS.length);
  assert.equal(new Set(PAGE_APPS.map((a) => a.metaDescription)).size, PAGE_APPS.length);
  for (const a of PAGE_APPS) {
    assert.ok(a.metaTitle.length <= 60, `${a.slug} title ${a.metaTitle.length}`);
    assert.ok(a.metaDescription.length >= 140 && a.metaDescription.length <= 160, `${a.slug} description ${a.metaDescription.length}`);
    assert.ok(a.summary.length > 200, `${a.slug} summary`);
    assert.ok(a.features.length > 0, `${a.slug} features`);
  }
});

test("app data: no unreleased apps, and Slang Decoder points at the existing hub", () => {
  assert.ok(!APPS.some((a) => UNRELEASED.test(a.name) || UNRELEASED.test(a.storeName)));
  const slang = getApp("slang-decoder");
  assert.equal(slang.path, "/slang");
  assert.equal(slang.hasOwnPage, false);
  assert.ok(!PAGE_APPS.includes(slang));
  assert.equal(appJsonLdId(slang), `${SITE}/#slang-decoder-app`);
  assert.throws(() => getApp("sportsparent"), /Unknown app/);
});

test("store links: App Store only when live, Google Play only for verified public packages", () => {
  for (const a of APPS) {
    const play = playUrl(a);
    if (play) assert.ok(PUBLIC_PLAY.includes(a.playPackage ?? ""), `${a.slug} play`);
    if (a.androidStatus !== "live") assert.equal(play, undefined);
  }
  assert.equal(playUrl(getApp("repairradar")), undefined);
  assert.equal(playUrl(getApp("meal-prep")), undefined);
  assert.equal(getApp("repairradar").androidStatus, "coming-soon");
  assert.equal(getApp("meal-prep").androidStatus, "coming-soon");
  assert.equal(appStoreUrl(getApp("repairradar")), "https://apps.apple.com/app/id6759541528");
  assert.equal(appStoreUrl(getApp("coffee-tasting")), undefined, "in review: no App Store link yet");
  assert.equal(playUrl(getApp("coffee-tasting")), "https://play.google.com/store/apps/details?id=com.jarrodhale.coffeetasting");
  assert.equal(getApp("slang-decoder").appStoreId, "6759603354");
});

test("official links: every app has privacy, terms and support; all https; no duplicates", () => {
  for (const a of APPS) {
    const links = officialLinks(a);
    for (const kind of ["privacy", "terms", "support"]) assert.ok(links.some((l) => l.kind === kind), `${a.slug} ${kind}`);
    assert.equal(new Set(links.map((l) => l.url)).size, links.length, `${a.slug} duplicate links`);
    for (const l of links) assert.match(l.url, /^https:\/\//);
  }
  const rr = officialLinks(getApp("repairradar"));
  assert.ok(rr.some((l) => l.url === `${SITE}/repairradar/delete-account`));
  assert.ok(!rr.some((l) => l.url.includes("repairradar.app")), "repairradar.app is a holding page");
  assert.ok(officialLinks(getApp("slang-decoder")).some((l) => l.kind === "hub" && l.url === `${SITE}/slang`));
  assert.ok(officialLinks(getApp("coffee-tasting")).some((l) => l.kind === "website" && /launching soon/.test(l.label)));
});

test("sameAs: store listings and live sites only, never legal pages or holding pages", () => {
  for (const a of APPS) {
    for (const u of sameAsUrls(a)) {
      assert.ok(!/privacy|terms|support|delete-account|help/.test(u), `${a.slug} ${u}`);
      assert.match(u, /^https:\/\//);
    }
  }
  assert.deepEqual(sameAsUrls(getApp("coffee-tasting")), ["https://play.google.com/store/apps/details?id=com.jarrodhale.coffeetasting"]);
  assert.deepEqual(sameAsUrls(getApp("handybook")), ["https://apps.apple.com/app/id6761731339", "https://handymanbook.app"]);
  assert.deepEqual(sameAsUrls(getApp("nannylog")), [
    "https://apps.apple.com/app/id6757959069",
    "https://play.google.com/store/apps/details?id=com.nannydaily.app",
    "https://nannydaily.com",
  ]);
});

test("platform and OS summaries", () => {
  assert.equal(platformSummary(getApp("repairradar")), "iPhone, iPad, Android (coming soon)");
  assert.equal(platformSummary(getApp("coffee-tasting")), "Android, iPhone (in App Review)");
  assert.equal(operatingSystems(getApp("handybook")), "iOS 15.1 or later, Web browser");
  assert.equal(operatingSystems(getApp("coffee-tasting")), "Android");
  assert.equal(operatingSystems(getApp("nannylog")), "iOS 15.1 or later, Android");
});

test("JSON-LD MobileApplication: valid required fields, publisher, no ratings or reviews", () => {
  for (const a of PAGE_APPS) {
    const n = roundTrip(mobileAppJsonLd(a));
    assert.equal(n["@context"], "https://schema.org");
    assert.equal(n["@type"], "MobileApplication");
    assert.equal(n["@id"], `${SITE}${a.path}#app`);
    assert.equal(n.name, a.name);
    assert.equal(n.url, `${SITE}${a.path}`);
    assert.ok(typeof n.operatingSystem === "string" && n.operatingSystem.length > 0);
    assert.match(String(n.applicationCategory), /Application$/);
    assert.deepEqual(n.publisher, { "@id": ORG_ID });
    assert.deepEqual(n.sameAs, sameAsUrls(a));
    const offers = n.offers as Node[];
    assert.ok(offers.length >= 1);
    for (const o of offers) {
      assert.equal(o["@type"], "Offer");
      assert.match(String(o.price), /^\d+(\.\d{2})?$/);
      assert.equal(o.priceCurrency, "USD");
    }
    assert.equal(offers[0].price, "0");
    assert.equal(n.aggregateRating, undefined);
    assert.equal(n.review, undefined);
    assert.ok(!/aggregateRating|ratingValue|"review"/.test(serializeJsonLd(mobileAppJsonLd(a))));
  }
  const bold = roundTrip(mobileAppJsonLd(getApp("bold-watchman")));
  assert.deepEqual(bold.creator, { "@type": "Organization", name: "B.O.L.D. (Brothers Overcoming Lustful Desires)", url: "https://www.boldmen.org" });
  assert.equal(roundTrip(mobileAppJsonLd(getApp("nannylog"))).creator, undefined);
});

test("JSON-LD RepairRadar offers match the plan prices exactly", () => {
  const offers = (mobileAppJsonLd(getApp("repairradar")).offers as Node[]).map((o) => ({
    price: o.price,
    unit: (o.priceSpecification as { referenceQuantity?: { unitCode: string } } | undefined)?.referenceQuantity?.unitCode,
  }));
  assert.deepEqual(offers, [
    { price: "0", unit: undefined },
    { price: "6.99", unit: "MON" },
    { price: "69.99", unit: "ANN" },
    { price: "12.99", unit: "MON" },
    { price: "129.99", unit: "ANN" },
    { price: "19.99", unit: "MON" },
    { price: "199.99", unit: "ANN" },
  ]);
});

test("JSON-LD Organization owns every owned app by @id, links developer pages", () => {
  const org = roundTrip(organizationJsonLd());
  assert.equal(org["@id"], ORG_ID);
  const owns = (org.owns as { "@id": string }[]).map((o) => o["@id"]);
  assert.equal(owns.length, APPS.filter((a) => a.ownedByOrg).length);
  for (const a of PAGE_APPS.filter((x) => x.ownedByOrg)) assert.ok(owns.includes(appJsonLdId(a)), a.slug);
  assert.ok(owns.includes(`${SITE}/#slang-decoder-app`));
  assert.ok(!owns.includes(appJsonLdId(getApp("bold-watchman"))), "Bold Watchman is built by B.O.L.D.");
});

test("JSON-LD ItemList and Article", () => {
  const list = roundTrip(appListJsonLd(APPS, `${SITE}/apps`));
  assert.equal(list["@type"], "ItemList");
  assert.equal((list.itemListElement as Node[]).length, APPS.length);
  assert.deepEqual((list.itemListElement as Node[]).map((i) => i.position), APPS.map((_, i) => i + 1));
  for (const g of GUIDES) {
    const art = roundTrip(articleJsonLd(g, appJsonLdId(getApp("repairradar"))));
    assert.equal(art["@type"], "Article");
    assert.equal(art.url, `${SITE}${guidePath(g.slug)}`);
    assert.ok(String(art.headline).length <= 110);
    assert.match(String(art.datePublished), /^\d{4}-\d{2}-\d{2}$/);
    assert.deepEqual(art.author, { "@id": ORG_ID });
    assert.deepEqual(art.about, { "@id": `${SITE}/repairradar#app` });
    if (g.sources.length) assert.deepEqual(art.citation, g.sources.map((s) => s.url));
    else assert.equal(art.citation, undefined);
  }
});

test("serializeJsonLd escapes < so content can't close the script tag", () => {
  assert.ok(!serializeJsonLd({ x: "</script><b>" }).includes("<"));
});

test("RepairRadar plans and pricing helpers", () => {
  assert.deepEqual(
    PLANS.map((p) => [p.id, p.monthly, p.yearly]),
    [
      ["free", null, null],
      ["premium", 6.99, 69.99],
      ["pro", 12.99, 129.99],
      ["property_manager", 19.99, 199.99],
    ],
  );
  assert.equal(formatPrice(6.99), "$6.99");
  assert.equal(formatPrice(70), "$70.00");
  assert.equal(yearlySavingsPercent(PLANS[0]), null);
  for (const p of PLANS.slice(1)) assert.equal(yearlySavingsPercent(p), 17);
  assert.equal(yearlySavingsPercent({ ...PLANS[1], yearly: PLANS[1].monthly! * 12 }), 0);
  assert.ok(PLANS[0].features.includes("Up to 10 repairs"));
  assert.ok(PLANS[0].features.includes("2 photos per repair"));
});

test("RepairRadar guides and FAQ", () => {
  assert.equal(new Set(GUIDES.map((g) => g.slug)).size, GUIDES.length);
  assert.ok(GUIDES.length >= 3 && GUIDES.length <= 5);
  for (const g of GUIDES) {
    assert.ok(g.metaTitle.length <= 60, `${g.slug} title ${g.metaTitle.length}`);
    assert.ok(g.description.length >= 140 && g.description.length <= 160, `${g.slug} description ${g.description.length}`);
    assert.ok(g.summary.length >= 200, `${g.slug} summary`);
    assert.ok(g.sections.length >= 3 && g.keyPoints.length >= 3);
  }
  assert.equal(getGuide(GUIDES[0].slug), GUIDES[0]);
  assert.equal(getGuide("nope"), undefined);
  assert.ok(REPAIRRADAR_FAQ.length >= 8);
  const text = JSON.stringify(REPAIRRADAR_FAQ);
  for (const price of ["$6.99", "$69.99", "$12.99", "$129.99", "$19.99", "$199.99", "7-day", "10 repairs", "2 photos"])
    assert.ok(text.includes(price), price);
});

test("per-app FAQ: four answers, honest about Android and who builds the app", () => {
  for (const a of PAGE_APPS) assert.equal(appFaq(a).length, 4);
  assert.equal(joinList([]), "");
  assert.equal(joinList(["Android"]), "Android");
  assert.equal(joinList(["iPhone", "iPad"]), "iPhone and iPad");
  assert.equal(joinList(["iPhone", "iPad", "Android"]), "iPhone, iPad and Android");
  assert.equal(appFaq(getApp("coffee-tasting"))[2].answer, "Coffee Tasting is available on Android. The iPhone version is in App Review.");
  assert.equal(appFaq(getApp("handybook"))[2].answer, "HandyBook is available on iPhone. It also works in a web browser at [handymanbook.app](https://handymanbook.app).");
  const meal = appFaq(getApp("meal-prep"));
  assert.match(meal[2].answer, /not on Google Play yet/);
  assert.match(appFaq(getApp("handybook"))[2].answer, /\[handymanbook\.app\]\(https:\/\/handymanbook\.app\)/);
  assert.match(appFaq(getApp("bold-watchman"))[3].answer, /built and maintained by B\.O\.L\.D\..*published on the app stores by J&H Technology LLC/);
  assert.match(appFaq(getApp("nannylog"))[3].answer, /developed and published by J&H Technology LLC/);
});

test("llms sections list every app, guide and official link", () => {
  const index = portfolioLlmsSection().join("\n");
  const full = portfolioLlmsFull().join("\n");
  for (const a of APPS) {
    assert.ok(index.includes(`(${SITE}${a.path})`), a.slug);
    assert.ok(COMPANY_PITCH.includes(a.name));
    for (const l of officialLinks(a)) assert.ok(full.includes(l.url), `${a.slug} ${l.url}`);
  }
  for (const g of GUIDES) {
    assert.ok(index.includes(`${SITE}${guidePath(g.slug)}`));
    assert.ok(full.includes(g.summary));
  }
  assert.match(full, /Pro \$12\.99\/month or \$129\.99\/year/);
  assert.ok(!/aggregateRating|stars|downloads|award/i.test(full));
});
