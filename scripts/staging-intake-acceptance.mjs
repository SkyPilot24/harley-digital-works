// Run only against a separately provisioned, explicitly named disposable backend.
// Uses real Auth and PostgREST; never forge a JWT or use the service key as a user.
import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const ref = process.env.ACCEPTANCE_PROJECT_REF;
assert(
  ref && !["sprljifjcpbnagsxefrp", "worzpzbutngugwzhlvtj", "stqoqiwixhcnfxrpfbde"].includes(ref),
  "An explicitly isolated staging project is required",
);
const url = `https://${ref}.supabase.co`;
assert.equal(process.env.SUPABASE_URL, url);
assert.equal(process.env.VITE_SUPABASE_URL, url);
assert.equal(process.env.LEAD_NOTIFICATIONS_ENABLED, "false");
assert.equal(process.env.TRANSACTIONAL_EMAIL_ENABLED, "false");
assert(
  !process.env.SLACK_WEBHOOK_URL && !process.env.RESEND_API_KEY,
  "Outbound credentials must be absent",
);
const publicKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
assert(publicKey && secret, "Staging credentials required; never print them");
const options = { auth: { persistSession: false, autoRefreshToken: false } };
function stagingClient(key) {
  return createClient(url, key, {
    ...options,
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("authorization") === `Bearer ${key}`)
          headers.delete("authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}
const server = stagingClient(secret);
const anonymous = stagingClient(publicKey);
const marker = `thg-qa-${randomUUID()}`;
const results = [];
async function check(name, run) {
  try {
    await run();
    results.push({ name, status: "PASS" });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({ name, status: "FAIL", detail: error.message });
    throw error;
  }
}
async function fixture(role) {
  const email = `${marker}-${role}@example.test`;
  const password = randomBytes(32).toString("base64url");
  // Admin provisioning confirms the synthetic address without sending email.
  const { data, error } = await server.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  assert.ifError(error);
  const client = stagingClient(publicKey);
  const login = await client.auth.signInWithPassword({ email, password });
  assert.ifError(login.error);
  assert(login.data.session?.access_token);
  return { client, userId: data.user.id };
}
const lead = {
  name: "THG acceptance fixture",
  email: `${marker}@example.test`,
  message: marker,
  source: "contact_form",
};
const rpc = (fingerprint, payload = lead, startedAt = Date.now() - 5000) =>
  server.rpc("submit_public_lead", {
    p_fingerprint: fingerprint,
    p_started_at: startedAt,
    p_lead: payload,
  });
try {
  const ordinary = await fixture("ordinary");
  const owner = await fixture("owner");
  await check("signup cannot grant admin", async () => {
    const { data, error } = await server
      .from("user_roles")
      .select("role")
      .in("user_id", [ordinary.userId, owner.userId]);
    assert.ifError(error);
    assert.equal(data.length, 0);
  });
  const grant = await server.from("user_roles").insert({ user_id: owner.userId, role: "admin" });
  assert.ifError(grant.error);
  await check("concurrent duplicates across fingerprints persist once", async () => {
    const requests = await Promise.all(
      Array.from({ length: 12 }, () => rpc(randomBytes(32).toString("hex"))),
    );
    requests.forEach((r) => assert.ifError(r.error));
    assert.equal(requests.filter((r) => r.data === "saved").length, 1);
    assert.equal(requests.filter((r) => r.data === "duplicate").length, 11);
    const { count, error } = await server
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("email", lead.email);
    assert.ifError(error);
    assert.equal(count, 1);
  });
  await check("concurrent rate boundary admits only five", async () => {
    const fingerprint = randomBytes(32).toString("hex");
    const requests = await Promise.all(
      Array.from({ length: 12 }, (_, n) =>
        rpc(fingerprint, { ...lead, email: `${marker}-${n}@example.test` }),
      ),
    );
    requests.forEach((r) => assert.ifError(r.error));
    assert.equal(requests.filter((r) => r.data === "saved").length, 5);
    assert.equal(requests.filter((r) => r.data === "rate_limited").length, 7);
  });
  for (const [actor, client] of [
    ["anonymous", anonymous],
    ["ordinary", ordinary.client],
  ]) {
    await check(`${actor} cannot read leads`, async () => {
      const { data, error } = await client.from("leads").select("id");
      assert(error || data.length === 0);
    });
    await check(`${actor} cannot bypass intake`, async () => {
      assert((await client.from("leads").insert(lead)).error);
      assert(
        (
          await client.rpc("submit_public_lead", {
            p_fingerprint: "a".repeat(64),
            p_started_at: Date.now() - 5000,
            p_lead: lead,
          })
        ).error,
      );
    });
  }
  await check("ordinary user cannot self-promote via API or metadata", async () => {
    assert(
      (await ordinary.client.from("user_roles").insert({ user_id: ordinary.userId, role: "admin" }))
        .error,
    );
    const edit = await ordinary.client.auth.updateUser({ data: { role: "admin" } });
    assert.ifError(edit.error);
    const { data, error } = await ordinary.client.from("leads").select("id");
    assert(error || data.length === 0);
  });
  await check("genuinely signed-in staging administrator retrieves saved enquiry", async () => {
    const verified = await owner.client.auth.getUser();
    assert.ifError(verified.error);
    assert.equal(verified.data.user.id, owner.userId);
    const { data, error } = await owner.client
      .from("leads")
      .select("id,email")
      .eq("email", lead.email);
    assert.ifError(error);
    assert.equal(data.length, 1);
  });
  await check("administrator retains manual intake", async () => {
    const { error } = await owner.client
      .from("leads")
      .insert({ ...lead, email: `${marker}-manual@example.test` });
    assert.ifError(error);
  });
  await check("owner logout removes client lead access", async () => {
    const logout = await owner.client.auth.signOut();
    assert.ifError(logout.error);
    const { data, error } = await owner.client.from("leads").select("id");
    assert(error || data.length === 0);
  });
} finally {
  // Keep fixtures for review: never silently delete accounts or records.
  await writeFile(
    "docs/evidence/staging-api-acceptance.json",
    JSON.stringify(
      {
        date: new Date().toISOString(),
        project: ref,
        marker,
        results,
        limits: [
          "API test; browser owner journey and server form still require acceptance",
          "Logout does not prove immediate revocation of a previously copied access token",
        ],
      },
      null,
      2,
    ),
  );
}
