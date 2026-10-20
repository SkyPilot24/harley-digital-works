import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { Route } from "../src/routes/api.webhooks.resend.ts";

function handler(method) {
  const candidate = Route.options.server?.handlers?.[method];
  assert.equal(typeof candidate, "function", `Expected a ${method} webhook route handler`);
  return candidate;
}

test("Resend outreach webhook route rejects GET and HEAD without cacheable responses", async () => {
  for (const method of ["GET", "HEAD"]) {
    const response = await handler(method)({
      request: new Request("https://local.example.test/api/webhooks/resend", { method }),
    });

    assert.equal(response.status, 405);
    assert.equal(response.headers.get("Allow"), "POST");
    assert.equal(response.headers.get("Cache-Control"), "no-store");
  }
});

test("Resend outreach webhook route forwards the untouched POST request to the server-only handler", async () => {
  const source = await readFile(
    new URL("../src/routes/api.webhooks.resend.ts", import.meta.url),
    "utf8",
  );

  assert.equal(typeof handler("POST"), "function");
  assert.match(source, /configuredResendOutreachWebhook/);
  assert.match(source, /return configuredResendOutreachWebhook\(request\)/);
  assert.doesNotMatch(source, /request\.(json|text|arrayBuffer|formData)\(/);
});
