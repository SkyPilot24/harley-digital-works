import test from "node:test";
import assert from "node:assert/strict";
import Stripe from "stripe";
import { receivePaymentEvent } from "../src/lib/payment-receipts.server.ts";

const secret = "whsec_local_fictional_test_only";
const contract = {
  sessionId: "cs_test_rehearsal",
  reference: "H50-LOCAL-DEPOSIT",
  amountPence: 74750,
  currency: "gbp",
  livemode: false,
};
function event(overrides = {}, type = "checkout.session.completed") {
  return {
    id: "evt_local_1",
    object: "event",
    type,
    livemode: false,
    data: {
      object: {
        id: contract.sessionId,
        object: "checkout.session",
        mode: "payment",
        livemode: false,
        client_reference_id: contract.reference,
        payment_status: "paid",
        amount_total: 74750,
        currency: "gbp",
        payment_intent: "pi_local_1",
        ...overrides,
      },
    },
  };
}
function store() {
  const receipts = new Map();
  const adverse = new Map();
  return {
    receipts,
    adverse,
    recordAdverse: async (event) => {
      if (adverse.has(event.eventId)) return "duplicate";
      adverse.set(event.eventId, event);
      return "recorded";
    },
    contractForSession: async () => contract,
    recordPaid: async (receipt) => {
      if (receipts.has(receipt.sessionId)) return "duplicate";
      receipts.set(receipt.sessionId, receipt);
      return "recorded";
    },
  };
}

test("signed refunds and disputes persist even before a receipt and failures request retry", async () => {
  const storage = store();
  const refund = {
    ...event(),
    created: 100,
    type: "charge.refunded",
    data: {
      object: {
        id: "ch_local",
        object: "charge",
        livemode: false,
        currency: "gbp",
        payment_intent: "pi_local_1",
        amount_refunded: 1000,
      },
    },
  };
  assert.equal((await send(refund, storage)).result, "recorded");
  assert.equal((await send(refund, storage)).result, "duplicate");
  const dispute = {
    ...refund,
    id: "evt_dispute",
    type: "charge.dispute.created",
    data: {
      object: {
        id: "du_local",
        object: "dispute",
        livemode: false,
        currency: "gbp",
        payment_intent: null,
        amount: 74750,
        status: "needs_response",
      },
    },
  };
  assert.equal((await send(dispute, storage)).status, 200);
  assert.equal(storage.adverse.get("evt_dispute").paymentIntentId, null);
  assert.equal(
    (
      await send(
        {
          ...dispute,
          id: "evt_closed",
          type: "charge.dispute.closed",
          data: { object: { ...dispute.data.object, status: "won" } },
        },
        storage,
      )
    ).status,
    200,
  );
  assert.equal(
    (
      await send(
        { ...refund, data: { object: { ...refund.data.object, currency: "usd" } } },
        storage,
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await send(refund, {
        recordAdverse: async () => {
          throw Error("offline");
        },
      })
    ).status,
    503,
  );
});
async function send(value, storage, overrides = {}) {
  const rawBody = JSON.stringify(value);
  const signature = Stripe.webhooks.generateTestHeaderString({ payload: rawBody, secret });
  return receivePaymentEvent({
    rawBody,
    signature,
    signingSecret: secret,
    livemode: false,
    store: storage,
    ...overrides,
  });
}

test("valid signed deposit records once across concurrent retries and distinct event IDs", async () => {
  const storage = store();
  const results = await Promise.all([send(event(), storage), send(event(), storage)]);
  assert.deepEqual(results.map((r) => r.result).sort(), ["duplicate", "recorded"]);
  assert.equal((await send({ ...event(), id: "evt_local_2" }, storage)).result, "duplicate");
  assert.equal(storage.receipts.size, 1);
  assert.equal(storage.receipts.get(contract.sessionId).amountPence, 74750);
});
test("missing, bad, stale and tampered signatures cannot touch storage", async () => {
  const storage = {
    contractForSession: async () => {
      throw Error("Must not read");
    },
  };
  assert.equal((await send(event(), storage, { signingSecret: undefined })).status, 503);
  assert.equal((await send(event(), storage, { signature: null })).status, 400);
  assert.equal((await send(event(), storage, { signature: "t=1,v1=bad" })).status, 400);
  const rawBody = JSON.stringify(event());
  const signature = Stripe.webhooks.generateTestHeaderString({
    payload: rawBody,
    secret,
    timestamp: Math.floor(Date.now() / 1000) - 301,
  });
  assert.equal((await send(event(), storage, { signature })).status, 400);
  assert.equal((await send(event(), storage, { rawBody: rawBody + " " })).status, 400);
});
test("unpaid, unrelated and subscription events never record a deposit", async () => {
  const storage = store();
  for (const value of [
    event({ payment_status: "unpaid" }),
    event({}, "payment_intent.payment_failed"),
    event({ mode: "subscription" }),
  ])
    assert.equal((await send(value, storage)).status, 200);
  assert.equal(storage.receipts.size, 0);
});
test("wrong environment, amount, reference, currency and unknown session fail closed", async () => {
  for (const change of [
    { livemode: true },
    { amount_total: 1 },
    { currency: "usd" },
    { client_reference_id: "other-client" },
    { payment_intent: null },
  ]) {
    const storage = store();
    assert.notEqual((await send(event(change), storage)).status, 200);
    assert.equal(storage.receipts.size, 0);
  }
  const storage = store();
  storage.contractForSession = async () => null;
  assert.equal((await send(event(), storage)).status, 409);
  assert.equal((await send({ ...event(), livemode: true }, store())).status, 400);
  assert.equal((await send({ ...event(), account: "acct_other" }, store())).status, 400);
});
test("failed durable write returns retryable error then succeeds without lost receipt", async () => {
  const storage = store();
  const persist = storage.recordPaid;
  let fail = true;
  storage.recordPaid = async (receipt) => {
    if (fail) throw Error("offline");
    return persist(receipt);
  };
  assert.equal((await send(event(), storage)).status, 503);
  assert.equal(storage.receipts.size, 0);
  fail = false;
  assert.equal((await send(event(), storage)).result, "recorded");
});
test("delayed successful checkout uses the same receipt path", async () => {
  const storage = store();
  assert.equal(
    (await send(event({}, "checkout.session.async_payment_succeeded"), storage)).result,
    "recorded",
  );
});
