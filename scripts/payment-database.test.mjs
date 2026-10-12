import { PGlite } from "@electric-sql/pglite";
import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";

const migration = await readFile(
  new URL("../supabase/migrations/20261012095358_durable_payment_receipts.sql", import.meta.url),
  "utf8",
);
const client = "00000000-0000-4000-8000-000000000001";
async function setup(t) {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;
    CREATE TABLE public.clients(id uuid PRIMARY KEY);
    INSERT INTO public.clients VALUES('${client}');`);
  await db.exec(migration);
  await db.exec(`INSERT INTO public.payment_contracts(session_id,reference,client_id,milestone,amount_pence,currency,livemode)
    VALUES('cs_test_one','H50-deposit','${client}','deposit',74750,'gbp',false),
    ('cs_test_two','H50-balance','${client}','balance',74750,'gbp',false); SET ROLE service_role;`);
  return db;
}
function record(db, session = "cs_test_one", event = "evt_one", intent = "pi_one", amount = 74750) {
  return db.query("SELECT public.record_payment_receipt($1,$2,$3,$4,$5,$6,$7) result", [
    session,
    event,
    intent,
    session === "cs_test_one" ? "H50-deposit" : "H50-balance",
    amount,
    "gbp",
    false,
  ]);
}
test("actual receipt transaction persists once across queued retries and different event IDs", async (t) => {
  const db = await setup(t);
  const results = await Promise.all([record(db), record(db)]);
  assert.deepEqual(results.map((r) => r.rows[0].result).sort(), ["duplicate", "recorded"]);
  assert.equal((await record(db, "cs_test_one", "evt_two")).rows[0].result, "duplicate");
  assert.equal(
    (await db.query("SELECT count(*)::int n FROM public.payment_receipts")).rows[0].n,
    1,
  );
  assert.equal(
    (await db.query("SELECT status FROM public.payment_contracts WHERE session_id='cs_test_one'"))
      .rows[0].status,
    "paid",
  );
});
test("mismatches and reused provider payments cannot mark another milestone paid", async (t) => {
  const db = await setup(t);
  await assert.rejects(record(db, "cs_test_one", "evt_one", "pi_one", 1), /mismatch/);
  await record(db);
  await assert.rejects(record(db, "cs_test_two", "evt_two", "pi_one"), /unique/);
  await assert.rejects(record(db, "cs_test_one", "evt_three", "pi_other"), /Conflicting/);
  assert.equal(
    (await db.query("SELECT status FROM public.payment_contracts WHERE session_id='cs_test_two'"))
      .rows[0].status,
    "unpaid",
  );
});
test("a failed payment-state update rolls receipt insertion back and retry succeeds", async (t) => {
  const db = await setup(t);
  await db.exec("RESET ROLE;");
  await db.exec(`CREATE FUNCTION public.reject_paid() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'Injected storage failure'; END; $$;
    CREATE TRIGGER reject_paid BEFORE UPDATE ON public.payment_contracts FOR EACH ROW EXECUTE FUNCTION public.reject_paid(); SET ROLE service_role;`);
  await assert.rejects(record(db), /Injected storage failure/);
  assert.equal(
    (await db.query("SELECT count(*)::int n FROM public.payment_receipts")).rows[0].n,
    0,
  );
  await db.exec(
    "RESET ROLE; DROP TRIGGER reject_paid ON public.payment_contracts; SET ROLE service_role;",
  );
  assert.equal((await record(db)).rows[0].result, "recorded");
});
test("anonymous and authenticated roles cannot read, mutate or call payment RPC", async (t) => {
  const db = await setup(t);
  for (const role of ["anon", "authenticated"]) {
    await db.exec(`RESET ROLE; SET ROLE ${role};`);
    for (const table of ["payment_contracts", "payment_receipts"]) {
      await assert.rejects(db.query(`SELECT * FROM public.${table}`), /permission denied/);
      await assert.rejects(db.query(`DELETE FROM public.${table}`), /permission denied/);
    }
    await assert.rejects(record(db), /permission denied/);
  }
});
