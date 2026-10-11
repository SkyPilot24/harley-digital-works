import assert from "node:assert/strict";
import test from "node:test";
import {
  assertIntakeBackend,
  checkIntakeResult,
  trustedIntakeIp,
} from "../src/lib/lead-intake-result.ts";

test("intake fails closed when browser and server backend disagree", () => {
  assert.doesNotThrow(() =>
    assertIntakeBackend("https://stage.supabase.co", "https://stage.supabase.co/"),
  );
  for (const [server, browser] of [
    [undefined, undefined],
    ["https://a.supabase.co", "https://b.supabase.co"],
    ["https://a.supabase.co", undefined],
  ]) {
    assert.throws(() => assertIntakeBackend(server, browser));
  }
});

test("receipt accepts only persisted or deduplicated results", () => {
  assert.equal(checkIntakeResult("saved"), "saved");
  assert.equal(checkIntakeResult("duplicate"), "duplicate");
  for (const result of [null, undefined, "", "failed", { ok: true }]) {
    assert.throws(() => checkIntakeResult(result), /Lead submission failed/);
  }
});
test("abuse responses produce HTTP 429", () => {
  for (const result of ["rate_limited", "too_fast"]) {
    assert.throws(
      () => checkIntakeResult(result),
      (error) => error instanceof Response && error.status === 429,
    );
  }
});
test("spoofable forwarded headers cannot rotate the fallback bucket", () => {
  assert.equal(
    trustedIntakeIp(new Headers({ "x-forwarded-for": "1.2.3.4", "x-real-ip": "5.6.7.8" })),
    "unknown",
  );
  assert.equal(trustedIntakeIp(new Headers({ "cf-connecting-ip": "192.0.2.1" })), "192.0.2.1");
});
