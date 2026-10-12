import { PGlite } from "@electric-sql/pglite";
import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";
const project = "00000000-0000-4000-8000-000000000001";
const client = "00000000-0000-4000-8000-000000000002";
const user = "00000000-0000-4000-8000-000000000003";
const commit = "a".repeat(40);
async function setup(t) {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;
 CREATE SCHEMA auth; CREATE TABLE auth.users(id uuid PRIMARY KEY);
 CREATE TABLE public.clients(id uuid PRIMARY KEY);
 CREATE TABLE public.projects(id uuid PRIMARY KEY,client_id uuid REFERENCES public.clients(id),status text DEFAULT 'review');
 CREATE TABLE public.user_roles(user_id uuid,role text);
 INSERT INTO auth.users VALUES('${user}'); INSERT INTO clients VALUES('${client}');
 INSERT INTO projects(id,client_id) VALUES('${project}','${client}');
 INSERT INTO user_roles VALUES('${user}','admin');`);
  for (const file of [
    "20261012095358_durable_payment_receipts.sql",
    "20261012100245_client_delivery_gates.sql",
    "20261012101334_authenticated_delivery_approval.sql",
    "20261012101923_delivery_review_artifacts.sql",
    "20261012102546_publish_delivery_review.sql",
    "20261012104200_project_launch_guard.sql",
    "20261012104851_freeze_verified_payment_contracts.sql",
    "20261012105638_payment_adverse_events.sql",
  ])
    await db.exec(
      await readFile(new URL(`../supabase/migrations/${file}`, import.meta.url), "utf8"),
    );
  return db;
}
const launch = (db) =>
  db.query("UPDATE public.projects SET status='launched' WHERE id=$1", [project]);

test("financial holds survive receipt ordering and older dispute replay cannot undo resolution", async (t) => {
  const db = await setup(t);
  const adverse = (id, intent, kind, status, created, object = "du_one") =>
    db.query("SELECT record_payment_adverse_event($1,$2,$3,$4,$5,1000,'gbp',true,$6) result", [
      id,
      intent,
      object,
      kind,
      status,
      created,
    ]);
  assert.equal(
    (await adverse("evt_open", "pi_deposit", "dispute", "needs_response", 100)).rows[0].result,
    "recorded",
  );
  assert.equal(
    (await adverse("evt_open", "pi_deposit", "dispute", "needs_response", 100)).rows[0].result,
    "duplicate",
  );
  await assert.rejects(
    adverse("evt_open", "pi_balance", "dispute", "needs_response", 100),
    /Conflicting/,
  );
  const blocked = async () =>
    (await db.query("SELECT payment_intent_blocked('pi_deposit',true) blocked")).rows[0].blocked;
  assert.equal(await blocked(), true);
  const id = await preview(db);
  await evidence(db, id);
  await pay(db, "deposit");
  await pay(db, "balance");
  await assert.rejects(launch(db), /refund or unresolved dispute/);
  await adverse("evt_won", "pi_deposit", "dispute", "won", 200);
  await adverse("evt_old", "pi_deposit", "dispute", "under_review", 150);
  assert.equal(await blocked(), false);
  await adverse("evt_refund", "pi_deposit", "refund", "refunded", 300, "ch_one");
  assert.equal(await blocked(), true);
  await assert.rejects(launch(db), /refund or unresolved dispute/);
});

test("unmatched live exceptions hold launch and browser roles cannot alter financial history", async (t) => {
  const db = await setup(t);
  await db.query(
    "SELECT record_payment_adverse_event('evt_unmatched',NULL,'ch_unknown','refund','refunded',1,'gbp',true,100)",
  );
  assert.equal(
    (await db.query("SELECT payment_intent_blocked('pi_other',true) blocked")).rows[0].blocked,
    true,
  );
  assert.equal(
    (await db.query("SELECT payment_intent_blocked('pi_other',false) blocked")).rows[0].blocked,
    false,
  );
  for (const role of ["anon", "authenticated"]) {
    await db.exec(`SET ROLE ${role}`);
    await assert.rejects(db.query("DELETE FROM payment_adverse_events"), /permission denied/);
    await assert.rejects(
      db.query("SELECT payment_intent_blocked('pi_other',true)"),
      /permission denied/,
    );
    await db.exec("RESET ROLE");
  }
});
async function preview(db, version = 0) {
  const id = (
    await db.query(
      "SELECT public.publish_delivery_review($1,$2,'preview','Fictional reviewed website',$3,$4) id",
      [project, user, commit, version],
    )
  ).rows[0].id;
  await db.query(
    "INSERT INTO public.delivery_project_access(project_id,user_id) VALUES($1,$2) ON CONFLICT DO NOTHING",
    [project, user],
  );
  const digest = (
    await db.query("SELECT content_sha256 FROM public.delivery_revisions WHERE id=$1", [id])
  ).rows[0].content_sha256;
  await db.query("SELECT public.approve_delivery_revision($1,$2,$3,$4)", [
    project,
    user,
    id,
    digest,
  ]);
  return id;
}

test("payment terms, verified state and project links cannot be rewritten", async (t) => {
  const db = await setup(t);
  await db.exec(
    "GRANT SELECT ON public.projects,public.user_roles TO service_role; SET ROLE service_role",
  );
  await pay(db, "deposit");
  for (const change of [
    "amount_pence=1",
    "reference='replacement'",
    "status='unpaid'",
    "paid_at=now()+interval '1 day'",
    "project_id=NULL",
  ])
    await assert.rejects(
      db.query(`UPDATE payment_contracts SET ${change} WHERE session_id='cs_deposit'`),
      /immutable/,
    );
  await db.query(
    "INSERT INTO payment_contracts(session_id,reference,client_id,milestone,amount_pence,currency,livemode) VALUES('cs_unlinked','unlinked',$1,'balance',74750,'gbp',true)",
    [client],
  );
  await assert.rejects(
    db.query("UPDATE payment_contracts SET status='paid' WHERE session_id='cs_unlinked'"),
    /receipt required/,
  );
  await db.query(
    "SELECT record_payment_receipt('cs_unlinked','evt_unlinked','pi_unlinked','unlinked',74750,'gbp',true)",
  );
  const bind = () =>
    db.query("SELECT bind_payment_project('cs_unlinked',$1,$2) result", [project, user]);
  assert.equal((await bind()).rows[0].result, "linked");
  assert.equal((await bind()).rows[0].result, "linked");
  await db.exec("RESET ROLE; DELETE FROM user_roles; SET ROLE service_role");
  await assert.rejects(bind(), /Administrator required/);
});
async function evidence(db, id, source = commit) {
  await db.query(
    "INSERT INTO public.delivery_launch_evidence(project_id,revision_id,source_commit,live_url,deployment_id,onboarding_evidence,qa_evidence,dns_email_evidence,rollback_evidence,reviewed_by) VALUES($1,$2,$3,'https://fictional.example.test','test-deployment','test-onboarding','test-qa','test-dns','test-rollback',$4)",
    [project, id, source, user],
  );
}
async function pay(db, milestone, live = true) {
  await db.query(
    "INSERT INTO public.payment_contracts(session_id,reference,client_id,project_id,milestone,amount_pence,currency,livemode) VALUES($1,$2,$3,$4,$2,74750,'gbp',$5)",
    [`cs_${milestone}`, milestone, client, project, live],
  );
  await db.query("SELECT public.record_payment_receipt($1,$2,$3,$4,74750,'gbp',$5)", [
    `cs_${milestone}`,
    `evt_${milestone}`,
    `pi_${milestone}`,
    milestone,
    live,
  ]);
}
test("direct status writes require latest approval, release evidence and both live receipts", async (t) => {
  const db = await setup(t);
  await assert.rejects(launch(db), /latest website version/);
  await db.exec("GRANT SELECT,UPDATE ON public.projects TO authenticated; SET ROLE authenticated");
  await assert.rejects(launch(db), /latest website version/);
  await db.exec("RESET ROLE");
  const id = await preview(db);
  await assert.rejects(launch(db), /release evidence/);
  await evidence(db, id);
  await assert.rejects(launch(db), /live deposit and balance/);
  await pay(db, "deposit");
  await assert.rejects(launch(db), /live deposit and balance/);
  await pay(db, "balance");
  await launch(db);
  assert.equal(
    (await db.query("SELECT status FROM projects WHERE id=$1", [project])).rows[0].status,
    "launched",
  );
});
test("sandbox payments cannot launch a project and stale release evidence cannot approve a new version", async (t) => {
  const db = await setup(t);
  const id = await preview(db);
  await evidence(db, id);
  await pay(db, "deposit", false);
  await pay(db, "balance", false);
  await assert.rejects(launch(db), /live deposit and balance/);
  await preview(db, 1);
  await assert.rejects(launch(db), /matching verified release evidence/);
});
test("wrong deployed commit and ordinary-user evidence writes are rejected", async (t) => {
  const db = await setup(t);
  const id = await preview(db);
  await evidence(db, id, "b".repeat(40));
  await assert.rejects(launch(db), /matching verified release evidence/);
  await evidence(db, id);
  await pay(db, "deposit");
  await pay(db, "balance");
  await launch(db);
  for (const role of ["anon", "authenticated"]) {
    await db.exec(`SET ROLE ${role}`);
    await assert.rejects(db.query("DELETE FROM delivery_launch_evidence"), /permission denied/);
    await assert.rejects(db.query("SELECT * FROM delivery_launch_evidence"), /permission denied/);
    await db.exec("RESET ROLE");
  }
});
