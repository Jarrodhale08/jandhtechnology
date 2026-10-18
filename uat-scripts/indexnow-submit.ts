// Usage: tsx uat-scripts/indexnow-submit.ts [https://www.jandhtechnology.com]
// Submits every /slang URL from the live sitemap to IndexNow (Bing, Yandex and other participants).
const HOST = "www.jandhtechnology.com";
const KEY = "023e023b21d20df54095fbc060701cdf";
const BATCH = 10000;

async function main() {
  const base = process.argv[2] ?? `https://${HOST}`;
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1])
    .filter((u) => u.startsWith(`https://${HOST}/slang`));
  for (let i = 0; i < urls.length; i += BATCH) {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: urls.slice(i, i + BATCH),
      }),
    });
    console.log(`IndexNow batch ${i / BATCH + 1}: ${urls.slice(i, i + BATCH).length} URLs -> HTTP ${res.status} ${await res.text()}`);
  }
}

main();
