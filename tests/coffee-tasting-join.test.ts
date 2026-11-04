import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { APP_PACKAGE, JOIN_CODE_ALPHABET, groupJoinCode, joinLinks, normalizeJoinCode } from "../lib/coffee-tasting/join";

test("normalizeJoinCode accepts the app's alphabet, any case, with spaces or dashes", () => {
  assert.equal(normalizeJoinCode("abc234"), "ABC234");
  assert.equal(normalizeJoinCode(" ABC 234 "), "ABC234");
  assert.equal(normalizeJoinCode("abc-234"), "ABC234");
});

test("normalizeJoinCode rejects wrong length and letters the alphabet leaves out", () => {
  for (const bad of ["", "ABC23", "ABC2345", "ABC10O", "ABCI23", "ABC23L", "ABC 23!", "../../x", "ABC234\n<script>"]) {
    assert.equal(normalizeJoinCode(bad), null, bad);
  }
  assert.ok(!/[ILO01]/.test(JOIN_CODE_ALPHABET));
});

test("groupJoinCode and joinLinks format the code the way the app does", () => {
  assert.equal(groupJoinCode("ABC234"), "ABC 234");
  assert.deepEqual(joinLinks("ABC234"), {
    universal: "https://www.jandhtechnology.com/coffee-tasting/join/ABC234",
    custom: "coffeetasting://join/ABC234",
  });
});

test("the alphabet matches the app and the database", () => {
  assert.equal(JOIN_CODE_ALPHABET, "ABCDEFGHJKMNPQRSTUVWXYZ23456789");
});

test("AASA names the app id and only the join path", () => {
  const aasa = JSON.parse(readFileSync("public/.well-known/apple-app-site-association", "utf8"));
  assert.deepEqual(aasa.applinks.details, [
    { appIDs: ["JC38W9DS2S.com.jarrodhale.coffeetasting"], components: [{ "/": "/coffee-tasting/join/*" }] },
  ]);
});

test("assetlinks delegates handle_all_urls to the app package with colon-separated SHA-256 fingerprints", () => {
  const links = JSON.parse(readFileSync("public/.well-known/assetlinks.json", "utf8"));
  assert.equal(links.length, 1);
  assert.deepEqual(links[0].relation, ["delegate_permission/common.handle_all_urls"]);
  assert.equal(links[0].target.namespace, "android_app");
  assert.equal(links[0].target.package_name, APP_PACKAGE);
  assert.ok(links[0].target.sha256_cert_fingerprints.length >= 1);
  for (const f of links[0].target.sha256_cert_fingerprints) assert.match(f, /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/);
});

test("next.config serves both files as JSON", () => {
  const next = readFileSync("next.config.ts", "utf8");
  assert.match(next, /\/\.well-known\/apple-app-site-association/);
  assert.match(next, /\/\.well-known\/assetlinks\.json/);
  assert.match(next, /application\/json/);
});
