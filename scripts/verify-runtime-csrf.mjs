import assert from "node:assert/strict";
const base = process.env.H50_LOCAL_BASE_URL || "http://127.0.0.1:5178";
assert.match(base, /^http:\/\/(127\.0\.0\.1|localhost):\d+$/);
const compiled = await (await fetch(base + "/src/lib/delivery-approval.functions.ts")).text();
const id = compiled.match(/getDeliveryReview = .*?createClientRpc\("([^"]+)"\)/)?.[1];
assert.ok(id, "Running development server function missing");
for (const [label, headers] of [
  ["foreign Origin", { Origin: "https://foreign.example.invalid" }],
  ["missing browser origin metadata", {}],
  ["cross-site fetch metadata", { "Sec-Fetch-Site": "cross-site", Origin: base }],
  ["same-site sibling metadata", { "Sec-Fetch-Site": "same-site", Origin: base }],
]) {
  const response = await fetch(base + "/_serverFn/" + id, {
    headers: { "x-tsr-serverFn": "true", ...headers },
  });
  assert.equal(response.status, 403);
  assert.equal(await response.text(), "Forbidden");
  console.log(`PASS: ${label} rejected before authentication`);
}
const sameOrigin = await fetch(base + "/_serverFn/" + id, {
  headers: { "x-tsr-serverFn": "true", Origin: base },
});
assert.equal(sameOrigin.status, 200);
assert.match(await sameOrigin.text(), /Unauthorized: No authorization header provided/);
console.log("PASS: Same-origin request reaches authentication and remains unauthenticated");
const provider = await fetch(base + "/api/payments/stripe", { method: "POST", body: "{}" });
assert.equal(provider.status, 503);
assert.equal(provider.headers.get("cache-control"), "no-store");
console.log("PASS: Independent provider receiver remains disabled and outside browser RPC filter");
