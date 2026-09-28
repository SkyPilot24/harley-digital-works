import test from "node:test";
import {
  clientWorkspaceForLead,
  ensureClientWorkspace,
  recordedActiveMonthlyValue,
} from "../src/lib/client-workspace.ts";
import assert from "node:assert/strict";

const prospect = {
  id: "d0c2f206-bca7-4bb0-8b3c-cd9eb80b9e39",
  name: "Test Prospect",
  email: "prospect@example.com",
  company: "Test Business",
  package: "Launch Website (£1,495)",
  message: "Please discuss my website",
  status: "new",
};
test("package interest never creates an active client or assumed recurring revenue", () => {
  for (const offer of [
    "Launch Website (£1,495)",
    "Growth Website (£2,995)",
    "Pro Platform (£4,995+)",
    "Care £195/mo",
  ]) {
    const result = clientWorkspaceForLead({ ...prospect, package: offer });
    assert.equal(result.monthly_value_cents, 0);
    assert.equal(result.status, "lead");
    assert.equal(result.id, prospect.id);
  }
  assert.equal(prospect.status, "new");
});
test("concurrent workspace requests converge on one record", async () => {
  const records = new Map();
  let inserts = 0;
  const storage = {
    find: async (id) => records.get(id) || null,
    insert: async (payload) => {
      if (records.has(payload.id)) throw { code: "23505" };
      inserts++;
      records.set(payload.id, payload);
      return payload;
    },
  };
  const [first, second] = await Promise.all([
    ensureClientWorkspace(prospect, storage),
    ensureClientWorkspace(prospect, storage),
  ]);
  assert.equal(first.id, second.id);
  assert.equal(inserts, 1);
  assert.equal(records.size, 1);
});
test("retry preserves an existing client's manually recorded agreement values", async () => {
  const existing = {
    ...clientWorkspaceForLead(prospect),
    status: "active",
    monthly_value_cents: 12750,
  };
  const result = await ensureClientWorkspace(prospect, {
    find: async () => existing,
    insert: async () => {
      throw Error("Must not overwrite");
    },
  });
  assert.equal(result.monthly_value_cents, 12750);
  assert.equal(result.status, "active");
});
test("unexpected conflicting records require reconciliation, not overwrite", async () => {
  await assert.rejects(
    () =>
      ensureClientWorkspace(prospect, {
        find: async () => ({ id: prospect.id, notes: "Unrelated existing record" }),
        insert: async () => {
          throw Error("Must not overwrite");
        },
      }),
    /reconciliation/,
  );
});
test("database failures propagate instead of claiming workspace creation", async () => {
  await assert.rejects(
    () =>
      ensureClientWorkspace(prospect, {
        find: async () => null,
        insert: async () => {
          throw Error("Database unavailable");
        },
      }),
    /Database unavailable/,
  );
});
test("recorded monthly totals exclude inactive prospects, paused, archived and invalid values", () => {
  assert.equal(
    recordedActiveMonthlyValue([
      { status: "active", monthly_value_cents: 9500 },
      { status: "active", monthly_value_cents: 19500 },
      { status: "lead", monthly_value_cents: 499500 },
      { status: "paused", monthly_value_cents: 19500 },
      { status: "archived", monthly_value_cents: 9500 },
      { status: "active", monthly_value_cents: -100 },
      { status: "active", monthly_value_cents: null },
      { status: "active", monthly_value_cents: NaN },
    ]),
    29000,
  );
});
import { parseLeadFormData, leadInputSchema } from "../src/lib/lead-schema.ts";
import {
  buildLeadMailto,
  formatLeadMessage,
  resolveEnquiryInterest,
  notifyWithoutFailingReceipt,
} from "../src/lib/lead-details.ts";
import { dispatchAuthorizedEmail } from "../src/lib/email-delivery.ts";
import { deferredServiceForPath } from "../src/lib/launch-scope.ts";

function form(overrides = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    name: "Test Enquiry",
    email: "test@example.com",
    phone: "+44 7700 900123",
    message: "Please discuss a website.",
    startedAt: Date.now() - 5000,
    ...overrides,
  }))
    data.set(key, String(value));
  return data;
}
test("phone survives parsing, CRM message formatting and email fallback", () => {
  const result = parseLeadFormData(form());
  assert.equal(result.success, true);
  assert.equal(result.data.phone, "+44 7700 900123");
  assert.match(formatLeadMessage(result.data), /Phone: \+44 7700 900123/);
  const body = new URL(buildLeadMailto(result.data, "hello@example.com")).searchParams.get("body");
  assert.match(body, /Phone: \+44 7700 900123/);
});
test("corporate source is retained and unknown source values are rejected", () => {
  assert.equal(
    parseLeadFormData(form({ source: "group_contact_form" })).data.source,
    "group_contact_form",
  );
  assert.equal(parseLeadFormData(form({ source: "untrusted" })).success, false);
});
test("old submissions without phone or source remain valid", () => {
  assert.equal(
    leadInputSchema.safeParse({
      name: "Test",
      email: "test@example.com",
      message: "New website please",
      startedAt: Date.now(),
    }).success,
    true,
  );
});
test("oversized phone and malformed emails fail validation", () => {
  assert.equal(parseLeadFormData(form({ phone: "1".repeat(41) })).success, false);
  assert.equal(parseLeadFormData(form({ email: "not-email" })).success, false);
});
test("legacy Pro CTA, domain and service links select actual form options", () => {
  assert.equal(
    resolveEnquiryInterest({ package: "Pro / Custom (£4,995+)" }),
    "Pro Platform (£4,995+)",
  );
  assert.equal(resolveEnquiryInterest({ domain: "example.com" }), "Domain purchase / enquiry");
  assert.equal(
    resolveEnquiryInterest({ service: "Care plans" }),
    "Website Care Plan & Hosting (£95/mo)",
  );
  assert.equal(
    resolveEnquiryInterest({ service: "Free Website Health Check Consultation" }),
    "Free Website Health Check Consultation",
  );
});
test("Slack failure cannot reject a successful lead receipt", async () => {
  let failures = 0;
  assert.equal(
    await notifyWithoutFailingReceipt(
      async () => {
        throw Error("network");
      },
      () => {
        failures++;
      },
    ),
    false,
  );
  assert.equal(failures, 1);
  assert.equal(
    await notifyWithoutFailingReceipt(
      async () => {},
      () => {
        throw Error("unexpected");
      },
    ),
    true,
  );
});

const email = {
  recipientEmail: "test@example.com",
  recipientName: "Test",
  subject: "Website proposal",
  templateType: "proposal",
  plainTextBody: "This is a test proposal.",
};
const config = {
  enabled: true,
  apiKey: "test-only",
  senderEmail: "hello@example.com",
  authorize: async () => {},
};
test("denied authorization prevents all provider requests", async () => {
  let requests = 0;
  await assert.rejects(
    () =>
      dispatchAuthorizedEmail(email, {
        ...config,
        authorize: async () => {
          throw Error("Forbidden");
        },
        fetch: async () => {
          requests++;
          return Response.json({ id: "receipt" });
        },
      }),
    /Forbidden/,
  );
  assert.equal(requests, 0);
});
test("disabled sending only prepares a draft", async () => {
  const result = await dispatchAuthorizedEmail(email, {
    ...config,
    enabled: false,
    fetch: async () => {
      throw Error("Must not send");
    },
  });
  assert.equal(result.status, "prepared");
  assert.equal(result.accepted, false);
  assert.equal(result.delivered, false);
});
test("missing credentials do not imply an email was sent", async () => {
  const result = await dispatchAuthorizedEmail(email, {
    ...config,
    apiKey: undefined,
    fetch: async () => {
      throw Error("Must not send");
    },
  });
  assert.equal(result.status, "prepared");
});
test("provider receipt means accepted, never confirmed delivery", async () => {
  const result = await dispatchAuthorizedEmail(email, {
    ...config,
    fetch: async () => Response.json({ id: "receipt-123" }),
  });
  assert.equal(result.accepted, true);
  assert.equal(result.delivered, false);
  assert.equal(result.providerId, "receipt-123");
});
test("provider rejection does not silently fall back to a duplicate draft send", async () => {
  await assert.rejects(
    () =>
      dispatchAuthorizedEmail(email, {
        ...config,
        fetch: async () => new Response("", { status: 429 }),
      }),
    /did not confirm/,
  );
});
test("empty provider receipt is not accepted as success", async () => {
  await assert.rejects(
    () => dispatchAuthorizedEmail(email, { ...config, fetch: async () => Response.json({}) }),
    /no receipt/,
  );
});
test("oversized payload is rejected before contacting provider", async () => {
  await assert.rejects(() =>
    dispatchAuthorizedEmail(
      { ...email, subject: "x".repeat(201) },
      {
        ...config,
        fetch: async () => {
          throw Error("Must not send");
        },
      },
    ),
  );
});
test("unfinished public workflows route to a real enquiry path", () => {
  for (const url of [
    "/audit",
    "/tools/seo-inspector",
    "/tools/review-booster",
    "/care-desk",
    "/onboarding",
    "/partners",
    "/proposals",
    "/track",
    "/track/unknown",
    "/track/HDW-APEX-2026/",
  ])
    assert.ok(deferredServiceForPath(url), url);
});
test("launch pages and admin paths remain accessible", () => {
  for (const url of [
    "/",
    "/contact",
    "/the-harley-group",
    "/work",
    "/demos",
    "/admin/leads",
    "/auth",
    "/tracking-other",
  ])
    assert.equal(deferredServiceForPath(url), undefined, url);
});
