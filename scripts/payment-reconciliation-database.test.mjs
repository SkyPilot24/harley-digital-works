import { PGlite } from "@electric-sql/pglite";
import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";
test("reconciliation evidence is append-only, validates holds and rejects concurrent event changes", async (t) => {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;
 CREATE TABLE public.projects(id uuid,client_id uuid,status text);
 CREATE TABLE public.payment_contracts(session_id text,project_id uuid);
 CREATE TABLE public.payment_receipts(session_id text,payment_intent_id text);`);
  for (const name of [
    "20261012105638_payment_adverse_events.sql",
    "20261012111915_payment_reconciliation_observations.sql",
  ])
    await db.exec(
      await readFile(new URL("../supabase/migrations/" + name, import.meta.url), "utf8"),
    );
  await db.exec(`SET ROLE service_role;
 SELECT record_payment_adverse_event('evt_one',NULL,'du_one','dispute','needs_response',1000,'gbp',false,100);`);
  const save = (count = 1, blocked = true, id = "00000000-0000-4000-8000-000000000001") =>
    db.query(
      "SELECT record_payment_reconciliation($1,'evt_one',$2,'ch_one','pi_one','needs_response',1000,0,$3) result",
      [id, count, blocked],
    );
  assert.equal((await save()).rows[0].result, "recorded");
  assert.equal((await save()).rows[0].result, "duplicate");
  assert.equal(
    (await db.query("SELECT payment_intent_blocked('pi_other',false) blocked")).rows[0].blocked,
    true,
  );
  await assert.rejects(save(1, false), /Conflicting/);
  await assert.rejects(save(1, false, "00000000-0000-4000-8000-000000000002"), /hold mismatch/);
  await db.exec(
    "SELECT record_payment_adverse_event('evt_two',NULL,'du_one','dispute','won',1000,'gbp',false,200)",
  );
  await assert.rejects(save(1, true, "00000000-0000-4000-8000-000000000002"), /changed during/);
  assert.equal(
    (await save(2, true, "00000000-0000-4000-8000-000000000002")).rows[0].result,
    "recorded",
  );
  await assert.rejects(
    db.exec("UPDATE payment_reconciliation_observations SET blocked=false"),
    /permission denied/,
  );
  // Storing an observation alone never clears the signed event launch hold.
  assert.equal(
    (await db.query("SELECT payment_intent_blocked('pi_one',false) blocked")).rows[0].blocked,
    false,
  );
  await db.exec("SET ROLE anon");
  await assert.rejects(
    db.query("SELECT * FROM payment_reconciliation_observations"),
    /permission denied/,
  );
  await assert.rejects(save(), /permission denied/);
});
