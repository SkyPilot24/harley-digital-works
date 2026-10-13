import test from "node:test";
import assert from "node:assert/strict";
import {
  processStripeWebhook,
  EXPECTED_DEPOSIT_PENCE,
  EXPECTED_CURRENCY,
} from "../src/lib/stripe/payment-receiver.ts";
import { verifyStripeSignature, generateTestStripeSignature } from "../src/lib/stripe/verify.ts";
import { handleStripeIncomingRequest } from "../src/lib/stripe/server-handler.ts";

const TEST_WEBHOOK_SECRET = "whsec_test_secret_for_rehearsal_0123456789abcdef";
const TEST_REHEARSAL_ID = "H50-INTERNAL-20261012";
const TEST_CLIENT_REF = "H50-INTERNAL-20261012-DEPOSIT";

function createMockStorage() {
  const receiptsByEvent = new Map();
  const receiptsByPi = new Map();
  const clientPaidStatus = new Map();
  let saveCalls = 0;
  let markPaidCalls = 0;

  return {
    receiptsByEvent,
    receiptsByPi,
    clientPaidStatus,
    get saveCalls() {
      return saveCalls;
    },
    get markPaidCalls() {
      return markPaidCalls;
    },
    findReceiptByEventId: async (id) => receiptsByEvent.get(id) || null,
    findReceiptByPaymentIntent: async (id) => receiptsByPi.get(id) || null,
    saveReceipt: async (rcpt) => {
      saveCalls++;
      receiptsByEvent.set(rcpt.stripe_event_id, rcpt);
      receiptsByPi.set(rcpt.stripe_payment_intent_id, rcpt);
      return rcpt;
    },
    markClientDepositPaid: async (clientRef, receiptId) => {
      markPaidCalls++;
      clientPaidStatus.set(clientRef, { paid: true, receiptId });
      return true;
    },
  };
}

function buildCheckoutSessionEvent(overrides = {}) {
  const eventId = overrides.eventId || "evt_test_checkout_complete_001";
  const now = overrides.timestamp || Math.floor(Date.now() / 1000);

  return {
    id: eventId,
    object: "event",
    api_version: "2023-10-16",
    created: now,
    livemode: overrides.livemode ?? false,
    type: "checkout.session.completed",
    data: {
      object: {
        id:
          overrides.sessionId ||
          "cs_test_a104usj0mNzzQ32uJxheMX9YUdUFYzMx2fbf6JCZBSykmaPGjpmRZEpwHf",
        object: "checkout.session",
        amount_total: overrides.amount_total ?? EXPECTED_DEPOSIT_PENCE,
        currency: overrides.currency ?? EXPECTED_CURRENCY,
        customer: "cus_test_rehearsal_001",
        client_reference_id: overrides.client_reference_id ?? TEST_CLIENT_REF,
        payment_status: overrides.payment_status ?? "paid",
        status: overrides.status ?? "complete",
        payment_intent: overrides.payment_intent ?? "pi_3UPflXGev7YjDfff0M01sFmx",
        livemode: overrides.livemode ?? false,
        metadata: {
          fictional: "true",
          milestone: "deposit",
          rehearsal_id: TEST_REHEARSAL_ID,
          ...(overrides.metadata || {}),
        },
      },
    },
  };
}

test("1. Valid signed checkout.session.completed generates exactly one deposit receipt", async () => {
  const storage = createMockStorage();
  const event = buildCheckoutSessionEvent();
  const rawBody = JSON.stringify(event);
  const signatureHeader = await generateTestStripeSignature(
    TEST_WEBHOOK_SECRET,
    rawBody,
    event.created,
  );

  const result = await processStripeWebhook({
    rawBody,
    signatureHeader,
    webhookSecret: TEST_WEBHOOK_SECRET,
    storage,
    allowedLivemode: false,
    nowInSeconds: event.created,
  });

  assert.equal(result.status, "success");
  assert.equal(result.statusCode, 200);
  assert.ok(result.receipt);
  assert.equal(result.receipt.amount_pence, 74750);
  assert.equal(result.receipt.currency, "gbp");
  assert.equal(result.receipt.milestone, "deposit");
  assert.equal(result.receipt.client_reference_id, TEST_CLIENT_REF);
  assert.equal(result.receipt.stripe_payment_intent_id, "pi_3UPflXGev7YjDfff0M01sFmx");

  assert.equal(storage.saveCalls, 1);
  assert.equal(storage.markPaidCalls, 1);
  assert.equal(storage.clientPaidStatus.get(TEST_CLIENT_REF)?.paid, true);
});

test("2. Replay of identical signed event is idempotent and does not create duplicate receipt", async () => {
  const storage = createMockStorage();
  const event = buildCheckoutSessionEvent();
  const rawBody = JSON.stringify(event);
  const signatureHeader = await generateTestStripeSignature(
    TEST_WEBHOOK_SECRET,
    rawBody,
    event.created,
  );

  // First dispatch
  const first = await processStripeWebhook({
    rawBody,
    signatureHeader,
    webhookSecret: TEST_WEBHOOK_SECRET,
    storage,
    allowedLivemode: false,
    nowInSeconds: event.created,
  });
  assert.equal(first.status, "success");
  assert.equal(storage.saveCalls, 1);

  // Duplicate replay
  const second = await processStripeWebhook({
    rawBody,
    signatureHeader,
    webhookSecret: TEST_WEBHOOK_SECRET,
    storage,
    allowedLivemode: false,
    nowInSeconds: event.created,
  });

  assert.equal(second.status, "duplicate");
  assert.equal(second.statusCode, 200);
  assert.equal(second.receipt?.id, first.receipt?.id);
  // Storage was NOT invoked a second time
  assert.equal(storage.saveCalls, 1);
  assert.equal(storage.markPaidCalls, 1);
});

test("3. Invalid signature header is rejected with 401 Unauthorized", async () => {
  const storage = createMockStorage();
  const event = buildCheckoutSessionEvent();
  const rawBody = JSON.stringify(event);
  const signatureHeader = "t=1234567890,v1=bad_signature_digest_0000000000";

  const result = await processStripeWebhook({
    rawBody,
    signatureHeader,
    webhookSecret: TEST_WEBHOOK_SECRET,
    storage,
    allowedLivemode: false,
    nowInSeconds: event.created,
  });

  assert.equal(result.status, "rejected");
  assert.equal(result.statusCode, 401);
  assert.equal(storage.saveCalls, 0);
  assert.equal(storage.clientPaidStatus.size, 0);
});

test("4. Replay attack protection rejects timestamps older than 300 seconds", async () => {
  const storage = createMockStorage();
  const now = Math.floor(Date.now() / 1000);
  const oldTimestamp = now - 305; // 5 minutes 5 seconds ago
  const event = buildCheckoutSessionEvent({ timestamp: oldTimestamp });
  const rawBody = JSON.stringify(event);
  const signatureHeader = await generateTestStripeSignature(
    TEST_WEBHOOK_SECRET,
    rawBody,
    oldTimestamp,
  );

  const result = await processStripeWebhook({
    rawBody,
    signatureHeader,
    webhookSecret: TEST_WEBHOOK_SECRET,
    storage,
    allowedLivemode: false,
    nowInSeconds: now,
  });

  assert.equal(result.status, "rejected");
  assert.equal(result.statusCode, 401);
  assert.match(result.reason, /tolerance window/i);
  assert.equal(storage.saveCalls, 0);
});

test("5. Currency mismatch is rejected and does not mark client paid", async () => {
  const storage = createMockStorage();
  const event = buildCheckoutSessionEvent({ currency: "usd" });
  const rawBody = JSON.stringify(event);
  const signatureHeader = await generateTestStripeSignature(
    TEST_WEBHOOK_SECRET,
    rawBody,
    event.created,
  );

  const result = await processStripeWebhook({
    rawBody,
    signatureHeader,
    webhookSecret: TEST_WEBHOOK_SECRET,
    storage,
    allowedLivemode: false,
    nowInSeconds: event.created,
  });

  assert.equal(result.status, "rejected");
  assert.equal(result.statusCode, 400);
  assert.match(result.reason, /currency mismatch/i);
  assert.equal(storage.saveCalls, 0);
  assert.equal(storage.clientPaidStatus.size, 0);
});

test("6. Amount mismatch is rejected and does not mark client paid", async () => {
  const storage = createMockStorage();
  const event = buildCheckoutSessionEvent({ amount_total: 50000 }); // £500 instead of £747.50
  const rawBody = JSON.stringify(event);
  const signatureHeader = await generateTestStripeSignature(
    TEST_WEBHOOK_SECRET,
    rawBody,
    event.created,
  );

  const result = await processStripeWebhook({
    rawBody,
    signatureHeader,
    webhookSecret: TEST_WEBHOOK_SECRET,
    storage,
    allowedLivemode: false,
    nowInSeconds: event.created,
  });

  assert.equal(result.status, "rejected");
  assert.equal(result.statusCode, 400);
  assert.match(result.reason, /amount mismatch/i);
  assert.equal(storage.saveCalls, 0);
  assert.equal(storage.clientPaidStatus.size, 0);
});

test("7. Incomplete payment status (unpaid) is rejected", async () => {
  const storage = createMockStorage();
  const event = buildCheckoutSessionEvent({ payment_status: "unpaid", status: "open" });
  const rawBody = JSON.stringify(event);
  const signatureHeader = await generateTestStripeSignature(
    TEST_WEBHOOK_SECRET,
    rawBody,
    event.created,
  );

  const result = await processStripeWebhook({
    rawBody,
    signatureHeader,
    webhookSecret: TEST_WEBHOOK_SECRET,
    storage,
    allowedLivemode: false,
    nowInSeconds: event.created,
  });

  assert.equal(result.status, "rejected");
  assert.equal(result.statusCode, 400);
  assert.match(result.reason, /payment not completed/i);
  assert.equal(storage.saveCalls, 0);
  assert.equal(storage.clientPaidStatus.size, 0);
});

test("8. Livemode mismatch is rejected", async () => {
  const storage = createMockStorage();
  const event = buildCheckoutSessionEvent({ livemode: true });
  const rawBody = JSON.stringify(event);
  const signatureHeader = await generateTestStripeSignature(
    TEST_WEBHOOK_SECRET,
    rawBody,
    event.created,
  );

  const result = await processStripeWebhook({
    rawBody,
    signatureHeader,
    webhookSecret: TEST_WEBHOOK_SECRET,
    storage,
    allowedLivemode: false, // strictly sandbox
    nowInSeconds: event.created,
  });

  assert.equal(result.status, "rejected");
  assert.equal(result.statusCode, 400);
  assert.match(result.reason, /livemode mismatch/i);
  assert.equal(storage.saveCalls, 0);
});

test("9. Persistence failure rolls back and returns 500 error", async () => {
  const faultyStorage = {
    findReceiptByEventId: async () => null,
    findReceiptByPaymentIntent: async () => null,
    saveReceipt: async () => {
      throw new Error("Database connection interrupted");
    },
    markClientDepositPaid: async () => true,
  };

  const event = buildCheckoutSessionEvent();
  const rawBody = JSON.stringify(event);
  const signatureHeader = await generateTestStripeSignature(
    TEST_WEBHOOK_SECRET,
    rawBody,
    event.created,
  );

  const result = await processStripeWebhook({
    rawBody,
    signatureHeader,
    webhookSecret: TEST_WEBHOOK_SECRET,
    storage: faultyStorage,
    allowedLivemode: false,
    nowInSeconds: event.created,
  });

  assert.equal(result.status, "rejected");
  assert.equal(result.statusCode, 500);
  assert.match(result.reason, /persistence error/i);
});

test("10. handleStripeIncomingRequest endpoint routes POST /api/stripe/webhook", async () => {
  const storage = createMockStorage();
  const event = buildCheckoutSessionEvent();
  const rawBody = JSON.stringify(event);
  const signatureHeader = await generateTestStripeSignature(
    TEST_WEBHOOK_SECRET,
    rawBody,
    event.created,
  );

  process.env.STRIPE_WEBHOOK_SECRET = TEST_WEBHOOK_SECRET;

  const request = new Request("https://example.com/api/stripe/webhook", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "stripe-signature": signatureHeader,
    },
    body: rawBody,
  });

  const response = await handleStripeIncomingRequest(request, "/api/stripe/webhook", storage);
  assert.ok(response);
  assert.equal(response.status, 200);

  const body = await response.json();
  assert.equal(body.status, "success");
  assert.ok(body.receipt);
  assert.equal(body.receipt.amount_pence, 74750);
});
