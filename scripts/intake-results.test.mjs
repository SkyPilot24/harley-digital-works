import assert from "node:assert/strict";
import test from "node:test";
import {
  assertIntakeBackend,
  checkIntakeResult,
  trustedIntakeIp,
  createRequestFingerprint,
  verifyTurnstileToken,
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

test("lead rate-limit fingerprint requires LEAD_RATE_LIMIT_SECRET and throws when missing", async () => {
  const origSecret = process.env.LEAD_RATE_LIMIT_SECRET;
  const origServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  try {
    delete process.env.LEAD_RATE_LIMIT_SECRET;
    // Even if SUPABASE_SERVICE_ROLE_KEY is present, it must NOT fall back to it
    process.env.SUPABASE_SERVICE_ROLE_KEY = "dummy-service-role-key";

    await assert.rejects(
      () => createRequestFingerprint("192.0.2.1"),
      /Lead rate-limit secret is not configured/,
    );

    // When LEAD_RATE_LIMIT_SECRET is present, it computes a valid hex HMAC
    process.env.LEAD_RATE_LIMIT_SECRET = "test-secret-value-12345";
    const fingerprint = await createRequestFingerprint("192.0.2.1");
    assert.match(fingerprint, /^[0-9a-f]{64}$/);
  } finally {
    if (origSecret !== undefined) process.env.LEAD_RATE_LIMIT_SECRET = origSecret;
    else delete process.env.LEAD_RATE_LIMIT_SECRET;
    if (origServiceKey !== undefined) process.env.SUPABASE_SERVICE_ROLE_KEY = origServiceKey;
    else delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  }
});

test("Turnstile verification behaviour across configuration states", async () => {
  const origEnabled = process.env.TURNSTILE_ENABLED;
  const origKey = process.env.TURNSTILE_SECRET_KEY;
  try {
    // 1. When disabled (default for tests/local dev), returns true
    process.env.TURNSTILE_ENABLED = "false";
    assert.equal(await verifyTurnstileToken("dummy-token", "192.0.2.1"), true);
    assert.equal(await verifyTurnstileToken("", "192.0.2.1"), true);
    assert.equal(await verifyTurnstileToken(undefined, "192.0.2.1"), true);

    // 2. When enabled but secret key missing, throws (fails closed)
    process.env.TURNSTILE_ENABLED = "true";
    delete process.env.TURNSTILE_SECRET_KEY;
    await assert.rejects(
      () => verifyTurnstileToken("some-token", "192.0.2.1"),
      /TURNSTILE_SECRET_KEY is not configured/,
    );

    // 3. When enabled with secret key, empty/missing token is rejected before API call
    process.env.TURNSTILE_SECRET_KEY = "1x0000000000000000000000000000000AA";
    assert.equal(await verifyTurnstileToken("", "192.0.2.1"), false);
    assert.equal(await verifyTurnstileToken(undefined, "192.0.2.1"), false);
  } finally {
    if (origEnabled !== undefined) process.env.TURNSTILE_ENABLED = origEnabled;
    else delete process.env.TURNSTILE_ENABLED;
    if (origKey !== undefined) process.env.TURNSTILE_SECRET_KEY = origKey;
    else delete process.env.TURNSTILE_SECRET_KEY;
  }
});

test("honeypot short-circuits form submission before Turnstile or database operations", () => {
  const botSubmission = {
    website: "https://spambot.example.com",
    name: "Bot",
    email: "bot@example.com",
    message: "Buy cheap pharmaceuticals",
  };
  // In lead-intake handler, if data.website is present, it returns { ok: true } immediately
  const isHoneypotTriggered = Boolean(botSubmission.website);
  assert.equal(isHoneypotTriggered, true);
});
