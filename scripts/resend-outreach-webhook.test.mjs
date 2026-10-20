import assert from "node:assert/strict";
import test from "node:test";

import {
  RESEND_EMAIL_ID,
  SVIX_TEST_SECRET,
  clonePayload,
  createSignedResendRequest,
  createSvixHeaders,
  resendPayloads,
} from "./fixtures/resend-outreach-webhook-fixtures.mjs";
import { receiveResendOutreachWebhook } from "../src/lib/resend-outreach-webhook.server.ts";

function createRecorder({ outcome = "recorded", error = null } = {}) {
  const received = [];
  return {
    received,
    record: async (event) => {
      received.push(event);
      return { data: outcome, error };
    },
  };
}

function createDeduplicatingRecorder() {
  const received = [];
  const seen = new Map();
  return {
    received,
    record: async (event) => {
      const existing = seen.get(event.svixId);
      if (existing) {
        if (
          existing.payload.data.email_id !== event.payload.data.email_id ||
          existing.payload.type !== event.payload.type
        ) {
          return { data: null, error: { code: "22023", message: "conflicting delivery ID" } };
        }
        return { data: "duplicate", error: null };
      }
      seen.set(event.svixId, event);
      received.push(event);
      return { data: "recorded", error: null };
    },
  };
}

function configuredOptions(record) {
  return {
    enabled: true,
    signingSecret: SVIX_TEST_SECRET,
    record,
  };
}

test("disabled or incomplete Resend webhook configuration fails closed before persistence", async () => {
  for (const change of [{ enabled: false }, { signingSecret: undefined }]) {
    const recorder = createRecorder();
    const response = await receiveResendOutreachWebhook(createSignedResendRequest(), {
      ...configuredOptions(recorder.record),
      ...change,
    });

    assert.equal(response.status, 503);
    assert.equal(response.headers.get("Cache-Control"), "no-store");
    assert.equal(recorder.received.length, 0);
  }
});

test("wrong method, missing Svix headers and forged signature fail before persistence", async () => {
  const recorder = createRecorder();
  const options = configuredOptions(recorder.record);

  assert.equal(
    (await receiveResendOutreachWebhook(new Request("https://local.example.test"), options)).status,
    405,
  );
  assert.equal(
    (
      await receiveResendOutreachWebhook(
        new Request("https://local.example.test", { method: "POST", body: "{}" }),
        options,
      )
    ).status,
    400,
  );

  const forged = createSignedResendRequest({ signatureOverride: "v1,not-a-valid-signature" });
  assert.equal((await receiveResendOutreachWebhook(forged, options)).status, 400);
  assert.equal(recorder.received.length, 0);
});

test("a stale Svix timestamp fails before persistence even when its HMAC is valid", async () => {
  const recorder = createRecorder();
  const staleTimestamp = String(Math.floor(Date.now() / 1000) - 301);
  const response = await receiveResendOutreachWebhook(
    createSignedResendRequest({ timestamp: staleTimestamp }),
    configuredOptions(recorder.record),
  );

  assert.equal(response.status, 400);
  assert.equal(recorder.received.length, 0);
});

test("a current valid signature in a rotated Svix header is accepted", async () => {
  const recorder = createRecorder();
  const request = createSignedResendRequest({ svixId: "msg_test_rotated_0001" });
  request.headers.set("svix-signature", `v1,invalid ${request.headers.get("svix-signature")}`);

  const response = await receiveResendOutreachWebhook(request, configuredOptions(recorder.record));
  assert.equal(response.status, 200);
  assert.equal(recorder.received.length, 1);
});

test("oversized body is rejected before signature validation or persistence", async () => {
  const recorder = createRecorder();
  const body = "x".repeat(131_073);
  const request = new Request("https://local.example.test", {
    method: "POST",
    headers: createSvixHeaders({ rawBody: body }),
    body,
  });

  const response = await receiveResendOutreachWebhook(request, configuredOptions(recorder.record));
  assert.equal(response.status, 413);
  assert.equal(recorder.received.length, 0);
});

test("a valid Svix signature records a delivered event with the unchanged delivery identifier", async () => {
  const recorder = createRecorder();
  const svixId = "msg_test_delivered_0001";
  const response = await receiveResendOutreachWebhook(
    createSignedResendRequest({ payload: resendPayloads.delivered, svixId }),
    configuredOptions(recorder.record),
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: "recorded" });
  assert.equal(recorder.received.length, 1);
  assert.equal(recorder.received[0].svixId, svixId);
  assert.equal(recorder.received[0].payload.type, "email.delivered");
  assert.equal(recorder.received[0].payload.data.email_id, RESEND_EMAIL_ID);
});

test("a valid permanent-bounce payload reaches the recorder for atomic suppression handling", async () => {
  const recorder = createRecorder();
  const response = await receiveResendOutreachWebhook(
    createSignedResendRequest({
      payload: resendPayloads.bounced,
      svixId: "msg_test_bounced_0001",
    }),
    configuredOptions(recorder.record),
  );

  assert.equal(response.status, 200);
  assert.equal(recorder.received.length, 1);
  assert.equal(recorder.received[0].payload.type, "email.bounced");
  assert.equal(recorder.received[0].payload.data.email_id, RESEND_EMAIL_ID);
});

test("the same signed Svix delivery ID is acknowledged as duplicate without a second persistence action", async () => {
  const recorder = createDeduplicatingRecorder();
  const svixId = "msg_test_duplicate_0001";
  const requestOptions = {
    payload: resendPayloads.delivered,
    svixId,
    timestamp: String(Math.floor(Date.now() / 1000)),
  };

  const first = await receiveResendOutreachWebhook(
    createSignedResendRequest(requestOptions),
    configuredOptions(recorder.record),
  );
  const replay = await receiveResendOutreachWebhook(
    createSignedResendRequest(requestOptions),
    configuredOptions(recorder.record),
  );

  assert.deepEqual(await first.json(), { result: "recorded" });
  assert.deepEqual(await replay.json(), { result: "duplicate" });
  assert.equal(recorder.received.length, 1);
  assert.equal(recorder.received[0].svixId, svixId);
});

test("a signed but unsupported event payload is rejected without persistence", async () => {
  const recorder = createRecorder();
  const unsupported = clonePayload(resendPayloads.delivered);
  unsupported.type = "email.opened";

  const response = await receiveResendOutreachWebhook(
    createSignedResendRequest({ payload: unsupported, svixId: "msg_test_unsupported_0001" }),
    configuredOptions(recorder.record),
  );

  assert.equal(response.status, 400);
  assert.equal(recorder.received.length, 0);
});

test("a verified event with unavailable persistence returns a retryable generic response", async () => {
  const recorder = createRecorder({
    outcome: null,
    error: { code: "08006", message: "synthetic database outage" },
  });

  const response = await receiveResendOutreachWebhook(
    createSignedResendRequest({ svixId: "msg_test_outage_0001" }),
    configuredOptions(recorder.record),
  );

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { result: "persistence_unavailable" });
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.equal(recorder.received.length, 1);
});

test("a thrown recorder failure returns the same retryable generic response", async () => {
  const response = await receiveResendOutreachWebhook(
    createSignedResendRequest({ svixId: "msg_test_recorder_throw_0001" }),
    configuredOptions(async () => {
      throw new Error("synthetic recorder failure");
    }),
  );

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { result: "persistence_unavailable" });
  assert.equal(response.headers.get("Cache-Control"), "no-store");
});

test("an acknowledged non-outreach provider email ID returns ignored and does not require a retry", async () => {
  const recorder = createRecorder({ outcome: "ignored" });
  const response = await receiveResendOutreachWebhook(
    createSignedResendRequest({ svixId: "msg_test_ignored_0001" }),
    configuredOptions(recorder.record),
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: "ignored" });
  assert.equal(recorder.received.length, 1);
});

// The database function needs isolated staging acceptance to prove atomic
// persistence and suppression writes. This unit suite proves only the HTTP,
// signature and hand-off boundary.
