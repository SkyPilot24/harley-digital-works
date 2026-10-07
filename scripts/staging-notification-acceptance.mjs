import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
assert.equal(process.env.ACCEPTANCE_PROJECT_REF, "mfpnfxpgkfuqtedbcxvp");
assert.equal(process.env.LEAD_NOTIFICATIONS_ENABLED, "false");
assert.ok(!process.env.SLACK_WEBHOOK_URL);
const url = process.env.SUPABASE_URL;
function client(key) {
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
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
const server = client(process.env.SUPABASE_SERVICE_ROLE_KEY),
  anon = client(process.env.VITE_SUPABASE_PUBLISHABLE_KEY);
const marker = `notification-qa-${randomUUID()}`;
const lead = {
  name: marker,
  email: marker + "@example.test",
  source: "group_contact_form",
  message: "Synthetic staging notification retry acceptance. No outbound credentials.",
};
const intake = await server.rpc("submit_public_lead", {
  p_fingerprint: randomBytes(32).toString("hex"),
  p_started_at: Date.now() - 5000,
  p_lead: lead,
});
assert.ifError(intake.error);
assert.equal(intake.data, "saved");
const saved = await server.from("leads").select("id").eq("email", lead.email).single();
assert.ifError(saved.error);
const find = () =>
  server.from("lead_notification_jobs").select("*").eq("lead_id", saved.data.id).single();
const before = await find();
assert.ifError(before.error);
assert.equal(before.data.attempts, 0);
const duplicate = await server.rpc("submit_public_lead", {
  p_fingerprint: randomBytes(32).toString("hex"),
  p_started_at: Date.now() - 5000,
  p_lead: lead,
});
assert.equal(duplicate.data, "duplicate");
let target;
// Existing staging fixtures are synthetic. Claim and release them as failed test attempts;
// no provider is contacted, and no credentials leave this process.
for (let round = 0; round < 20 && !target; round++) {
  const claims = await Promise.all([
    server.rpc("claim_lead_notifications"),
    server.rpc("claim_lead_notifications"),
  ]);
  const jobs = claims.flatMap((r) => {
    assert.ifError(r.error);
    return r.data;
  });
  assert.equal(
    new Set(jobs.map((j) => j.id)).size,
    jobs.length,
    "No job is leased to both workers",
  );
  for (const job of jobs) {
    if (job.lead_id === saved.data.id) target = job;
    const done = await server.rpc("finish_lead_notification", {
      p_id: job.id,
      p_lease_token: job.lease_token,
      p_accepted: false,
      p_error: "Synthetic staging provider failure; no external send.",
    });
    assert.ifError(done.error);
    assert.equal(done.data, true);
  }
  if (!jobs.length) break;
}
assert.ok(target);
const failed = await find();
assert.equal(failed.data.status, "pending");
assert.equal(failed.data.attempts, 1);
assert.ok(Date.parse(failed.data.next_attempt_at) > Date.now());
await server
  .from("lead_notification_jobs")
  .update({ next_attempt_at: new Date(Date.now() - 60000).toISOString() })
  .eq("id", target.id);
const retry = await server.rpc("claim_lead_notifications");
assert.ifError(retry.error);
const second = retry.data.find((j) => j.id === target.id);
assert.ok(second);
assert.equal(second.attempts, 2);
const stale = await server.rpc("finish_lead_notification", {
  p_id: target.id,
  p_lease_token: target.lease_token,
  p_accepted: true,
  p_error: null,
});
assert.equal(stale.data, false);
const accepted = await server.rpc("finish_lead_notification", {
  p_id: second.id,
  p_lease_token: second.lease_token,
  p_accepted: true,
  p_error: null,
});
assert.ifError(accepted.error);
assert.equal(accepted.data, true);
assert.equal((await find()).data.status, "accepted");
assert.ok((await anon.rpc("claim_lead_notifications")).error);
assert.ok((await anon.from("lead_notification_jobs").select("*")).error);
const results = [
  "Atomic lead and alert persistence",
  "Duplicate has exactly one alert",
  "Concurrent workers have disjoint leases",
  "Transient failure schedules a retry",
  "Second attempt records simulated acknowledgement",
  "Stale acknowledgement rejected",
  "Anonymous read and claim denied",
];
await writeFile(
  "docs/evidence/staging-notification-acceptance.json",
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      project: process.env.ACCEPTANCE_PROJECT_REF,
      environment: "isolated staging",
      outboundNotifications: false,
      acknowledgement: "simulated; no Slack delivery claimed",
      checks: results.map((name) => ({ name, status: "PASS" })),
    },
    null,
    2,
  ) + "\n",
);
for (const r of results) console.log("PASS " + r);
