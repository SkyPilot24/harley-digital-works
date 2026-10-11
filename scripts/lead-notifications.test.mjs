import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { deliverLeadNotifications } from "../src/lib/lead-notifications.ts";
import { parseLeadFormData } from "../src/lib/lead-schema.ts";
import { formatLeadMessage } from "../src/lib/lead-details.ts";

test("both brands preserve every enquiry field, including long interest when message is edited", () => {
  for (const source of ["contact_form", "group_contact_form"]) {
    const values = {
      source,
      name: "THG field acceptance",
      email: "fields@example.test",
      company: "Synthetic business",
      phone: "+44 7700 900123",
      websiteUrl: "https://example.test",
      package: "See enquiry context",
      enquiryContext: "Domain enquiry: " + "a".repeat(80) + ".example",
      message: "My edited enquiry",
      startedAt: String(Date.now() - 5000),
    };
    const form = new FormData();
    for (const [k, v] of Object.entries(values)) form.set(k, v);
    const parsed = parseLeadFormData(form);
    assert.equal(parsed.success, true);
    const message = formatLeadMessage(parsed.data);
    for (const value of [values.phone, values.websiteUrl, values.enquiryContext, values.message])
      assert.ok(message.includes(value));
    assert.equal(parsed.data.source, source);
    assert.equal(parsed.data.company, values.company);
    form.set("email", "bad");
    assert.equal(parseLeadFormData(form).success, false);
  }
});

test("disabled notifications neither claim nor send; failures are stored without personal data", async () => {
  let calls = 0;
  const job = {
    id: "job",
    lead_id: "lead",
    source: "group_contact_form",
    lease_token: "token",
    attempts: 1,
  };
  const receipts = [];
  const options = {
    enabled: false,
    webhookUrl: "https://hooks.slack.com/services/test/fixture/secret",
    claim: async () => {
      calls++;
      return [job];
    },
    finish: async (j, ok, error) => receipts.push({ ok, error }),
    fetch: async () => {
      throw Error("secret should never be logged");
    },
  };
  await deliverLeadNotifications(options);
  assert.equal(calls, 0);
  await deliverLeadNotifications({ ...options, enabled: true });
  assert.equal(receipts[0].ok, false);
  assert.ok(!receipts[0].error.includes("secret"));
  let payload;
  await deliverLeadNotifications({
    ...options,
    enabled: true,
    fetch: async (url, init) => {
      payload = JSON.parse(init.body);
      return new Response("ok");
    },
  });
  assert.equal(receipts[1].ok, true);
  assert.match(payload.text, /The Harley Group/);
  assert.match(payload.text, /Reference: lead/);
  await deliverLeadNotifications({
    ...options,
    enabled: true,
    fetch: async () => new Response("invalid_payload", { status: 400 }),
  });
  assert.equal(receipts[2].ok, false);
});

test("durable outbox is atomic, private, leased, bounded and recoverable", async (t) => {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;
    CREATE SCHEMA app_private; CREATE SCHEMA auth; CREATE TYPE public.app_role AS ENUM ('admin','user');
    CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql AS $$ SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
    CREATE FUNCTION app_private.has_role(uuid,public.app_role) RETURNS boolean LANGUAGE sql AS $$ SELECT $1='00000000-0000-4000-8000-000000000001'::uuid $$;
    GRANT USAGE ON SCHEMA public,app_private,auth TO anon,authenticated,service_role;
    CREATE TABLE public.leads(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),source text NOT NULL);
    GRANT ALL ON public.leads TO service_role;`);
  await db.exec(
    await readFile(
      new URL(
        "../supabase/migrations/20261007110303_durable_lead_notifications.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.exec(
    `SET ROLE service_role; INSERT INTO public.leads(source) VALUES('group_contact_form');`,
  );
  assert.equal(
    (await db.query("SELECT count(*)::int AS n FROM public.lead_notification_jobs")).rows[0].n,
    1,
  );
  const job = (await db.query("SELECT * FROM public.claim_lead_notifications()")).rows[0];
  assert.equal(job.attempts, 1);
  assert.equal((await db.query("SELECT * FROM public.claim_lead_notifications()")).rows.length, 0);
  assert.equal(
    (
      await db.query("SELECT public.finish_lead_notification($1,$2,false,$3) AS ok", [
        job.id,
        job.lease_token,
        "Transient failure",
      ])
    ).rows[0].ok,
    true,
  );
  assert.equal((await db.query("SELECT * FROM public.claim_lead_notifications()")).rows.length, 0);
  await db.exec(
    "UPDATE public.lead_notification_jobs SET next_attempt_at=now()-interval '1 minute'",
  );
  const second = (await db.query("SELECT * FROM public.claim_lead_notifications()")).rows[0];
  assert.equal(second.attempts, 2);
  assert.equal(
    (
      await db.query("SELECT public.finish_lead_notification($1,$2,true,NULL) AS ok", [
        job.id,
        job.lease_token,
      ])
    ).rows[0].ok,
    false,
  );
  assert.equal(
    (
      await db.query("SELECT public.finish_lead_notification($1,$2,true,NULL) AS ok", [
        second.id,
        second.lease_token,
      ])
    ).rows[0].ok,
    true,
  );
  assert.equal(
    (await db.query("SELECT status,last_error FROM public.lead_notification_jobs")).rows[0].status,
    "accepted",
  );
  await db.exec("INSERT INTO public.leads(source) VALUES('contact_form')");
  for (let i = 1; i <= 5; i++) {
    const next = (await db.query("SELECT * FROM public.claim_lead_notifications()")).rows[0];
    assert.equal(next.attempts, i);
    await db.query("SELECT public.finish_lead_notification($1,$2,false,$3)", [
      next.id,
      next.lease_token,
      "Failure",
    ]);
    await db.exec(
      "UPDATE public.lead_notification_jobs SET next_attempt_at=now()-interval '1 minute' WHERE status='pending'",
    );
  }
  assert.equal((await db.query("SELECT * FROM public.claim_lead_notifications()")).rows.length, 0);
  assert.equal(
    (
      await db.query(
        "SELECT count(*)::int AS n FROM public.lead_notification_jobs WHERE status='failed'",
      )
    ).rows[0].n,
    1,
  );
  await db.exec("INSERT INTO public.leads(source) VALUES('contact_form')");
  const expired = (await db.query("SELECT * FROM public.claim_lead_notifications()")).rows[0];
  await db.exec(
    "UPDATE public.lead_notification_jobs SET lease_until=now()-interval '1 minute' WHERE status='processing'",
  );
  const recovered = (await db.query("SELECT * FROM public.claim_lead_notifications()")).rows[0];
  assert.notEqual(recovered.lease_token, expired.lease_token);
  await db.exec(
    "UPDATE public.lead_notification_jobs SET attempts=5,lease_until=now()-interval '1 minute' WHERE status='processing'",
  );
  await db.query("SELECT * FROM public.claim_lead_notifications()");
  assert.equal(
    (
      await db.query(
        "SELECT count(*)::int AS n FROM public.lead_notification_jobs WHERE status='failed'",
      )
    ).rows[0].n,
    2,
  );
  await db.exec(
    "RESET ROLE; BEGIN; SET LOCAL ROLE service_role; INSERT INTO public.leads(source) VALUES('contact_form'); ROLLBACK;",
  );
  assert.equal(
    (await db.query("SELECT count(*)::int AS n FROM public.lead_notification_jobs")).rows[0].n,
    3,
  );
  for (const role of ["anon", "authenticated"]) {
    await db.exec("SET ROLE " + role);
    await assert.rejects(
      db.query("SELECT * FROM public.claim_lead_notifications()"),
      /permission denied/,
    );
    await assert.rejects(
      db.query("UPDATE public.lead_notification_jobs SET status='accepted'"),
      /permission denied/,
    );
    if (role === "anon")
      await assert.rejects(
        db.query("SELECT * FROM public.lead_notification_jobs"),
        /permission denied/,
      );
    else
      assert.equal((await db.query("SELECT * FROM public.lead_notification_jobs")).rows.length, 0);
    await db.exec("RESET ROLE");
  }
  await db.exec(
    "SET ROLE authenticated; SELECT set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000001',false)",
  );
  assert.equal((await db.query("SELECT * FROM public.lead_notification_jobs")).rows.length, 3);
});
