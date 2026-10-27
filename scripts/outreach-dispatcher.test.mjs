import test from "node:test";
import assert from "node:assert/strict";
import { processOutreachBatch } from "../src/lib/outreach-dispatcher.ts";
import { dispatchAuthorizedEmail } from "../src/lib/email-delivery.ts";

const complianceFooter = `\n\n---\nHarley Digital Works\n[TODO: Registered Office Address / Trading Address, Bristol, UK]\nreply STOP and I won't contact you again\nPrivacy Policy: https://harleydigitalworks.com/privacy`;

const sampleProspect = {
  id: "P01",
  businessName: "RG Electrical Bristol Limited",
  area: "Bradley Stoke / Bristol",
  website: "https://www.rg-electrical.com/",
  recipientEmail: "office@rg-electrical.com",
  recipientName: "RG Electrical Team",
  companyNumber: "10082511",
  accreditationEvidence: "NICEIC verified via TrustMark 421650",
  observationSummary: "Projects section indicates portfolio forthcoming",
  subject: "A small improvement to your project portfolio",
  plainTextBody:
    "Hello RG Electrical team,\n\nI noticed your website's project section says the full portfolio is coming soon.\n\nRobbie" +
    complianceFooter,
  approvedForSending: true,
};

test("processOutreachBatch pauses dispatch when active builds reach concurrency limit", async () => {
  const results = await processOutreachBatch({
    prospects: [sampleProspect],
    enabled: true,
    apiKey: "test_key",
    senderEmail: "hello@harleydigitalworks.com",
    activeBuildsCount: 2,
    maxConcurrentBuilds: 2,
    alreadyContactedIds: new Set(),
    recordSent: async () => {},
    fetch: async () => {
      throw new Error("Must not send when concurrency limit is hit");
    },
  });

  assert.equal(results.length, 1);
  assert.equal(results[0].status, "skipped_concurrency_limit");
});

test("processOutreachBatch skips unapproved prospects", async () => {
  const unapproved = { ...sampleProspect, approvedForSending: false };
  const results = await processOutreachBatch({
    prospects: [unapproved],
    enabled: true,
    apiKey: "test_key",
    senderEmail: "hello@harleydigitalworks.com",
    activeBuildsCount: 0,
    maxConcurrentBuilds: 2,
    alreadyContactedIds: new Set(),
    recordSent: async () => {},
    fetch: async () => {
      throw new Error("Must not send for unapproved candidate");
    },
  });

  assert.equal(results.length, 1);
  assert.equal(results[0].status, "skipped_not_approved");
});

test("processOutreachBatch deduplicates and skips already-contacted candidates", async () => {
  const results = await processOutreachBatch({
    prospects: [sampleProspect],
    enabled: true,
    apiKey: "test_key",
    senderEmail: "hello@harleydigitalworks.com",
    activeBuildsCount: 0,
    maxConcurrentBuilds: 2,
    alreadyContactedIds: new Set(["P01"]),
    recordSent: async () => {},
    fetch: async () => {
      throw new Error("Must not send to already contacted prospect");
    },
  });

  assert.equal(results.length, 1);
  assert.equal(results[0].status, "already_contacted");
});

test("processOutreachBatch successfully dispatches via Resend provider when enabled", async () => {
  let recordedReceipt = null;
  let slackNotified = false;

  const results = await processOutreachBatch({
    prospects: [sampleProspect],
    enabled: true,
    apiKey: "re_mock_test_key",
    senderEmail: "hello@harleydigitalworks.com",
    activeBuildsCount: 1,
    maxConcurrentBuilds: 2,
    alreadyContactedIds: new Set(),
    recordSent: async (id, receipt) => {
      recordedReceipt = { id, receipt };
    },
    notifySlack: async (msg) => {
      slackNotified = true;
    },
    fetch: async (url, init) => {
      assert.equal(url, "https://api.resend.com/emails");
      const body = JSON.parse(init.body);
      assert.equal(body.to[0], "office@rg-electrical.com");
      assert.equal(body.subject, "A small improvement to your project portfolio");
      assert.ok(body.headers, "Expected email headers to be present");
      assert.equal(
        body.headers["List-Unsubscribe"],
        "<mailto:unsubscribe@harleydigitalworks.com?subject=unsubscribe>",
      );
      return Response.json({ id: "re_mock_receipt_12345" });
    },
  });

  assert.equal(results.length, 1);
  assert.equal(results[0].status, "dispatched");
  assert.equal(results[0].providerId, "re_mock_receipt_12345");
  assert.ok(recordedReceipt);
  assert.equal(recordedReceipt.receipt.providerId, "re_mock_receipt_12345");
  assert.equal(slackNotified, true);
});

test("dispatchAuthorizedEmail refuses outreach email without compliant sender-identity footer", async () => {
  const badInput = {
    recipientEmail: "client@test.co.uk",
    recipientName: "Test Client",
    subject: "Missing Footer Outreach",
    templateType: "outreach",
    plainTextBody: "Hello, this email does not contain the required legal sender-identity footer.",
  };

  await assert.rejects(
    async () => {
      await dispatchAuthorizedEmail(badInput, {
        authorize: async () => {},
        enabled: true,
        apiKey: "test_key",
        senderEmail: "hello@harleydigitalworks.com",
        fetch: async () => {
          throw new Error("Fetch must not be called when footer is missing");
        },
      });
    },
    {
      name: "Error",
      message:
        "Outreach email body must contain a compliant sender-identity footer (trading name, contact address placeholder, 'reply STOP and I won't contact you again', and privacy link).",
    },
  );
});

test("dispatchAuthorizedEmail sends outreach email with compliant footer and List-Unsubscribe header", async () => {
  let capturedHeaders = null;
  const goodInput = {
    recipientEmail: "client@test.co.uk",
    recipientName: "Test Client",
    subject: "Compliant Outreach",
    templateType: "outreach",
    plainTextBody:
      "Hello, this email contains all required legal compliance elements." + complianceFooter,
  };

  const res = await dispatchAuthorizedEmail(goodInput, {
    authorize: async () => {},
    enabled: true,
    apiKey: "test_key",
    senderEmail: "hello@harleydigitalworks.com",
    fetch: async (_url, init) => {
      const parsed = JSON.parse(init.body);
      capturedHeaders = parsed.headers;
      return Response.json({ id: "re_good_outreach_123" });
    },
  });

  assert.equal(res.status, "accepted");
  assert.equal(res.providerId, "re_good_outreach_123");
  assert.ok(capturedHeaders);
  assert.equal(
    capturedHeaders["List-Unsubscribe"],
    "<mailto:unsubscribe@harleydigitalworks.com?subject=unsubscribe>",
  );
});

test("processOutreachBatch returns prepared status when disabled", async () => {
  const results = await processOutreachBatch({
    prospects: [sampleProspect],
    enabled: false,
    apiKey: undefined,
    senderEmail: undefined,
    activeBuildsCount: 0,
    maxConcurrentBuilds: 2,
    alreadyContactedIds: new Set(),
    recordSent: async () => {},
    fetch: async () => {
      throw new Error("Fetch should not be called when disabled");
    },
  });

  assert.equal(results.length, 1);
  assert.equal(results[0].status, "prepared");
});
