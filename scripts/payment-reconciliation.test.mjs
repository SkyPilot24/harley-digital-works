import test from "node:test";
import assert from "node:assert/strict";
import {
  reconcilePaymentObject,
  createPaymentProviderReader,
} from "../src/lib/payment-reconciliation.server.ts";
const source = {
  eventId: "evt_test",
  providerObjectId: "du_test",
  paymentIntentId: null,
  kind: "dispute",
  status: "needs_response",
  amountPence: 74750,
  currency: "gbp",
  livemode: false,
  created: 100,
};
const charge = {
  id: "ch_test",
  object: "charge",
  currency: "gbp",
  livemode: false,
  amount: 74750,
  amount_refunded: 0,
  payment_intent: "pi_test",
};
const dispute = {
  id: "du_test",
  object: "dispute",
  currency: "gbp",
  livemode: false,
  amount: 74750,
  status: "needs_response",
  charge: "ch_test",
  payment_intent: null,
};
const reader = (c = charge, d = dispute) => ({ charge: async () => c, dispute: async () => d });
test("missing event intent is resolved through the verified dispute-charge relationship", async () => {
  const observation = await reconcilePaymentObject(source, reader());
  assert.equal(observation.paymentIntentId, "pi_test");
  assert.equal(observation.blocked, true);
  assert.equal(observation.chargeId, "ch_test");
});
test("won disputes clear only the dispute hold; refunded charges retain a financial hold", async () => {
  assert.equal(
    (await reconcilePaymentObject(source, reader(charge, { ...dispute, status: "won" }))).blocked,
    false,
  );
  assert.equal(
    (
      await reconcilePaymentObject(
        source,
        reader({ ...charge, amount_refunded: 1000 }, { ...dispute, status: "won" }),
      )
    ).blocked,
    true,
  );
});
test("wrong objects, environment, currency and payment identity fail closed", async () => {
  for (const change of [
    { id: "ch_other" },
    { livemode: true },
    { currency: "usd" },
    { amount_refunded: -1 },
    { payment_intent: undefined },
  ])
    await assert.rejects(reconcilePaymentObject(source, reader({ ...charge, ...change })));
  await assert.rejects(
    reconcilePaymentObject({ ...source, paymentIntentId: "pi_other" }, reader()),
    /identity mismatch/,
  );
  await assert.rejects(
    reconcilePaymentObject(source, reader(charge, { ...dispute, id: "du_other" })),
    /does not match/,
  );
  await assert.rejects(
    reconcilePaymentObject(source, reader(charge, { ...dispute, payment_intent: "pi_other" })),
    /identity mismatch/,
  );
});
test("refunds require matching cumulative provider amount and legacy charges are distinguished", async () => {
  const refund = { ...source, kind: "refund", providerObjectId: "ch_test", amountPence: 1000 };
  await assert.rejects(reconcilePaymentObject(refund, reader()), /does not match/);
  const result = await reconcilePaymentObject(
    refund,
    reader({ ...charge, payment_intent: null, amount_refunded: 1000 }),
  );
  assert.equal(result.disposition, "legacy_charge");
  assert.equal(result.paymentIntentId, null);
  assert.equal(result.blocked, true);
});
test("provider outage cannot manufacture an observation and API-key mode is checked before network access", async () => {
  await assert.rejects(
    reconcilePaymentObject(source, {
      dispute: async () => {
        throw Error("offline");
      },
    }),
    /offline/,
  );
  assert.throws(
    () => createPaymentProviderReader("sk_live_fictional", "acct_test", false),
    /environment/,
  );
  assert.throws(
    () => createPaymentProviderReader("sk_test_fictional", "other", false),
    /environment/,
  );
});
