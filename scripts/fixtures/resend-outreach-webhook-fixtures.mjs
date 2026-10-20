// Synthetic fixtures only: no live recipients, provider data or signing secret.
// Svix signs `${svix-id}.${svix-timestamp}.${rawBody}` with HMAC-SHA256 using
// the base64 part of a whsec_ signing secret.

import { createHmac } from "node:crypto";

export const SVIX_TEST_SECRET = `whsec_${Buffer.from(
  "synthetic-resend-webhook-test-secret",
).toString("base64")}`;

export const RESEND_EMAIL_ID = "1e3d05ce-1d6a-4fe4-a956-f31c17880eb9";
export const SVIX_MESSAGE_ID = "msg_test_outreach_0001";
export const WEBHOOK_URL = "https://local.example.test/api/webhooks/resend";

export const resendPayloads = {
  sent: {
    type: "email.sent",
    created_at: "2026-10-17T19:00:00.000Z",
    data: {
      email_id: RESEND_EMAIL_ID,
      to: ["prospect@example.test"],
      from: "Harley Digital Works <outreach@example.test>",
      subject: "Synthetic outreach test",
      message_id: "<synthetic-sent@example.test>",
      tags: { workflow: "outreach-test" },
    },
  },
  delivered: {
    type: "email.delivered",
    created_at: "2026-10-17T19:01:00.000Z",
    data: {
      email_id: RESEND_EMAIL_ID,
      to: ["prospect@example.test"],
      from: "Harley Digital Works <outreach@example.test>",
      subject: "Synthetic outreach test",
      message_id: "<synthetic-delivered@example.test>",
    },
  },
  bounced: {
    type: "email.bounced",
    created_at: "2026-10-17T19:02:00.000Z",
    data: {
      email_id: RESEND_EMAIL_ID,
      to: ["prospect@example.test"],
      bounce: { type: "Permanent", subType: "Suppressed", message: "Synthetic bounce" },
    },
  },
  complained: {
    type: "email.complained",
    created_at: "2026-10-17T19:03:00.000Z",
    data: { email_id: RESEND_EMAIL_ID, to: ["prospect@example.test"] },
  },
  suppressed: {
    type: "email.suppressed",
    created_at: "2026-10-17T19:04:00.000Z",
    data: { email_id: RESEND_EMAIL_ID, to: ["prospect@example.test"] },
  },
};

export function createSvixHeaders({
  rawBody,
  secret = SVIX_TEST_SECRET,
  svixId = SVIX_MESSAGE_ID,
  timestamp = String(Math.floor(Date.now() / 1000)),
  signatureOverride,
} = {}) {
  const secretBytes = Buffer.from(secret.split("_")[1], "base64");
  const signature = createHmac("sha256", secretBytes)
    .update(`${svixId}.${timestamp}.${rawBody}`)
    .digest("base64");

  return {
    "svix-id": svixId,
    "svix-timestamp": timestamp,
    "svix-signature": signatureOverride ?? `v1,${signature}`,
  };
}

export function createSignedResendRequest({
  payload = resendPayloads.delivered,
  svixId = SVIX_MESSAGE_ID,
  timestamp,
  signatureOverride,
  secret = SVIX_TEST_SECRET,
  url = WEBHOOK_URL,
} = {}) {
  const rawBody = typeof payload === "string" ? payload : JSON.stringify(payload);
  return new Request(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...createSvixHeaders({ rawBody, svixId, timestamp, signatureOverride, secret }),
    },
    body: rawBody,
  });
}

export function clonePayload(payload) {
  return JSON.parse(JSON.stringify(payload));
}
