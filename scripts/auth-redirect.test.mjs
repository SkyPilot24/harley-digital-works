import test from "node:test";
import assert from "node:assert/strict";
import { safeAuthRedirect } from "../src/lib/auth-redirect.ts";
test("sign-in preserves the review destination and rejects external or ambiguous redirects", () => {
  const review = "/client-review/00000000-0000-4000-8000-000000000001?kind=preview";
  assert.equal(safeAuthRedirect(review), review);
  for (const value of [
    undefined,
    123,
    "https://evil.test",
    "//evil.test",
    "/\\evil.test",
    "javascript:alert(1)",
    "/\nevil.test",
  ])
    assert.equal(safeAuthRedirect(value), "/admin");
});
