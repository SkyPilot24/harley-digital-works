import test from "node:test";
import assert from "node:assert/strict";
import Stripe from "stripe";
import { paymentWebhook } from "../src/lib/payment-webhook.server.ts";
const secret = "whsec_fictional_local_request";
const options = {
  enabled: true,
  signingSecret: secret,
  mode: "test",
  store: async () => {
    throw Error("Unexpected database access");
  },
};
test("disabled or incomplete configuration fails closed without database access", async () => {
  for (const change of [
    { enabled: false },
    { mode: undefined },
    { mode: "typo" },
    { signingSecret: undefined },
  ]) {
    const response = await paymentWebhook(
      new Request("https://local.example.test", { method: "POST" }),
      { ...options, ...change },
    );
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("Cache-Control"), "no-store");
  }
});
test("wrong method and missing or forged signature fail before store access", async () => {
  assert.equal(
    (await paymentWebhook(new Request("https://local.example.test"), options)).status,
    405,
  );
  assert.equal(
    (
      await paymentWebhook(
        new Request("https://local.example.test", { method: "POST", body: "{}" }),
        options,
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await paymentWebhook(
        new Request("https://local.example.test", {
          method: "POST",
          body: "{}",
          headers: { "Stripe-Signature": "t=1,v1=bad" },
        }),
        options,
      )
    ).status,
    400,
  );
});
test("chunked oversized body is rejected without trusting content length", async () => {
  const request = new Request("https://local.example.test", {
    method: "POST",
    body: "x".repeat(262145),
    headers: { "Stripe-Signature": "t=1,v1=bad" },
  });
  assert.equal((await paymentWebhook(request, options)).status, 413);
});
test("signed ignored event and storage outage produce truthful responses", async () => {
  const session = {
    id: "cs_test_local",
    object: "checkout.session",
    mode: "payment",
    livemode: false,
    payment_status: "paid",
    payment_intent: "pi_local",
    amount_total: 74750,
    currency: "gbp",
    client_reference_id: "H50",
  };
  for (const [type, expected] of [
    ["payment_intent.payment_failed", 200],
    ["checkout.session.completed", 503],
  ]) {
    const body = JSON.stringify({
      id: "evt_local",
      object: "event",
      livemode: false,
      type,
      data: { object: session },
    });
    const signature = Stripe.webhooks.generateTestHeaderString({ payload: body, secret });
    const response = await paymentWebhook(
      new Request("https://local.example.test", {
        method: "POST",
        body,
        headers: { "Stripe-Signature": signature },
      }),
      options,
    );
    assert.equal(response.status, expected);
  }
});
