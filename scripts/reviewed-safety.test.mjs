import test from "node:test";
import assert from "node:assert/strict";
import { handleChatLead } from "../src/lib/chat-lead-handler.ts";
import { persistPublicLead } from "../src/lib/lead-intake-service.ts";
import { generateStaticMapProxyUrl } from "../src/lib/maps/google-maps.server.ts";
import { processReceptionistCall } from "../src/lib/receptionist-agent.ts";

const input = {
  name: "Synthetic visitor",
  email: "audit@example.invalid",
  message: "Please discuss a website",
  startedAt: Date.now() - 6000,
};
const options = (save) => ({
  ip: "192.0.2.1",
  serverUrl: "https://example.supabase.co",
  browserUrl: "https://example.supabase.co",
  secret: "synthetic-test-secret",
  verifyToken: async () => true,
  save,
});
const request = (body) =>
  new Request("https://synthetic.invalid/api/chat/lead-capture", {
    method: "POST",
    headers: { "Content-Type": "application/json", "cf-connecting-ip": "192.0.2.1" },
    body: JSON.stringify(body),
  });

test("chat receipts reject missing backend, RPC error, abuse and unknown results", async () => {
  for (const scenario of ["missing-config", "rpc-error", "rate_limited", "too_fast", "unknown"]) {
    let calls = 0;
    const opts = options(async () => {
      calls++;
      return {
        data: scenario,
        error: scenario === "rpc-error" ? new Error("synthetic private failure") : null,
      };
    });
    if (scenario === "missing-config") opts.serverUrl = undefined;
    const res = await handleChatLead(request(input), opts);
    assert.equal(res.status, ["rate_limited", "too_fast"].includes(scenario) ? 429 : 503);
    const body = await res.json();
    assert.equal(body.ok, false);
    assert.doesNotMatch(body.message, /registered|synthetic private failure/);
    if (scenario === "missing-config") assert.equal(calls, 0);
  }
});

test("chat acknowledges only saved and duplicate results with shared IP fingerprint", async () => {
  const fingerprints = [];
  for (const result of ["saved", "duplicate"]) {
    const res = await handleChatLead(
      request({ ...input, email: result + "@example.invalid", brand: "group" }),
      options(async (args) => {
        fingerprints.push(args.p_fingerprint);
        assert.equal(args.p_started_at, input.startedAt);
        assert.equal(args.p_lead.source, "group_contact_form");
        return { data: result, error: null };
      }),
    );
    assert.equal(res.status, 200);
    assert.equal((await res.json()).ok, true);
  }
  assert.equal(fingerprints[0], fingerprints[1], "changing email must not rotate abuse bucket");
});

test("chat validates payload, real start time and security token before saving", async () => {
  let calls = 0;
  const opts = options(async () => {
    calls++;
    return { data: "saved", error: null };
  });
  for (const body of [
    { ...input, email: "bad" },
    { ...input, startedAt: undefined },
    { ...input, notes: "x".repeat(2001) },
    [],
  ]) {
    const res = await handleChatLead(request(body), opts);
    assert.equal(res.status, 400);
    assert.equal((await res.json()).ok, false);
  }
  const denied = await handleChatLead(request(input), { ...opts, verifyToken: async () => false });
  assert.equal(denied.status, 400);
  const malformed = await handleChatLead(
    new Request("https://synthetic.invalid", { method: "POST", body: "{" }),
    opts,
  );
  assert.equal(malformed.status, 400);
  assert.equal(calls, 0);
});

test("honeypot never touches storage or provider verification", async () => {
  const result = await persistPublicLead(
    { ...input, website: "spam.invalid" },
    {
      ...options(() => {
        throw Error("storage must not run");
      }),
      verifyToken: () => {
        throw Error("provider must not run");
      },
    },
  );
  assert.equal(result.ok, true);
});

test("public map lookup returns only a same-origin proxy without any provider key", () => {
  const original = process.env.GOOGLE_MAPS_API_KEY;
  process.env.GOOGLE_MAPS_API_KEY = "synthetic-private-key";
  try {
    const url = generateStaticMapProxyUrl({ center: "Bristol & Bath?key=attacker", zoom: 11 });
    assert.ok(url.startsWith("/api/maps/static?"));
    assert.doesNotMatch(url, /synthetic-private-key|maps.googleapis.com/);
    const parsed = new URL(url, "https://synthetic.invalid");
    assert.equal(parsed.searchParams.has("key"), false);
    assert.equal(parsed.searchParams.get("center"), "Bristol & Bath?key=attacker");
  } finally {
    if (original === undefined) delete process.env.GOOGLE_MAPS_API_KEY;
    else process.env.GOOGLE_MAPS_API_KEY = original;
  }
});

test("receptionist emergency fallbacks do not claim alerts, callbacks or dispatch", async () => {
  for (const [tenant, message] of [
    ["rg-electrical", "urgent sparks and burning smell"],
    ["apex-heating", "urgent gas leak"],
    ["clifton-roofing", "urgent roof leak"],
  ]) {
    const res = await processReceptionistCall(
      message,
      "synthetic-session",
      tenant,
      "tenant_switchboard",
    );
    assert.equal(res.source, "local_knowledge_engine");
    assert.equal(res.isEmergency, true);
    assert.match(res.replyText, /demonstration/i);
    assert.doesNotMatch(
      res.replyText,
      /I have logged|has received an instant alert|will call your mobile|we can dispatch|teams available/i,
    );
  }
});
