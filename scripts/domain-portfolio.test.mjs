import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import * as XLSX from "xlsx";
import { PGlite } from "@electric-sql/pglite";
import {
  emptyInventory,
  applyImport,
  updateDomain,
  renewalAlerts,
  normaliseDomain,
  validateSnapshot,
} from "../src/lib/domain-inventory.ts";
import { parseDomainExport } from "../src/lib/domain-import.ts";
const row = (name = "example.co.uk", expiresOn = "2026-10-19", observedOn = "2026-10-12") => ({
  name,
  expiresOn,
  observedOn,
  registrar: "IONOS",
  contract: "synthetic",
  registrarStatus: "ACTIVE",
});
const workbook = (rows, options = {}) => {
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet(rows), "Domains");
  book.Workbook = { WBProps: options };
  return XLSX.write(book, { type: "array", bookType: "xls" });
};
test("BIFF XLS numeric dates, unknown fields and IDNs", () => {
  const result = parseDomainExport(
    workbook([
      ["DomainName", "Status", "ExpirationDate"],
      ["EXAMPLE.CO.UK", "ACTIVE", 46312.75],
    ]),
    "2026-10-12",
  );
  assert.equal(result.errors.length, 0);
  assert.equal(result.rows[0].expiresOn, "2026-10-17");
  assert.equal(normaliseDomain("bücher.de"), "xn--bcher-kva.de");
  const state = applyImport(emptyInventory(), result, "synthetic.xls", "2026-10-12", "batch1");
  assert.equal(state.domains[0].autoRenew, "unknown");
  assert.equal(state.domains[0].annualCostPence, null);
});
test("1904 workbook and quoted CSV dates are interpreted without locale guesses", () => {
  const result = parseDomainExport(
    workbook(
      [
        ["DomainName", "Status", "ExpirationDate"],
        ["example.com", "ACTIVE", 44850],
      ],
      { date1904: true },
    ),
    "2026-10-12",
  );
  assert.equal(result.rows[0].expiresOn, "2026-10-17");
  const csv = new TextEncoder().encode(
    'DomainName,Status,ExpirationDate\r\n"example.com","ACTIVE","2026-10-17"\r\n',
  );
  assert.equal(parseDomainExport(csv.buffer, "2026-10-12").rows[0].expiresOn, "2026-10-17");
});
test("corrupt working-copy costs, duplicate domains and revisions fail validation", () => {
  const state = applyImport(
    emptyInventory(),
    { rows: [row()], errors: [] },
    "test",
    "2026-10-12",
    "a",
  );
  assert.doesNotThrow(() => validateSnapshot(state));
  assert.throws(() => validateSnapshot({ ...state, revision: -1 }));
  assert.throws(() =>
    validateSnapshot({ ...state, domains: [state.domains[0], state.domains[0]] }),
  );
  assert.throws(() =>
    validateSnapshot({ ...state, domains: [{ ...state.domains[0], annualCostPence: -1 }] }),
  );
});
test("duplicate, formula, ambiguous, invalid and oversized imports fail closed", () => {
  const duplicate = parseDomainExport(
    workbook([
      ["DomainName", "Status", "ExpirationDate"],
      ["example.com", "ACTIVE", 46312],
      ["EXAMPLE.COM", "ACTIVE", 46312],
    ]),
    "2026-10-12",
  );
  assert.equal(duplicate.errors.length, 1);
  assert.throws(() => applyImport(emptyInventory(), duplicate, "test", "2026-10-12", "a"));
  const bad = parseDomainExport(
    workbook([
      ["DomainName", "Status", "ExpirationDate"],
      ["example.com", "ACTIVE", "12/10/2026"],
    ]),
    "2026-10-12",
  );
  assert.equal(bad.errors.length, 1);
  assert.throws(() => parseDomainExport(new ArrayBuffer(2097153), "2026-10-12"));
  assert.throws(() => normaliseDomain("https://example.com"));
  assert.throws(() => normaliseDomain("127.0.0.1"));
  const book = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet([
    ["DomainName", "Status", "ExpirationDate"],
    ["example.com", "ACTIVE", 46312],
  ]);
  sheet.C2.f = "1+1";
  XLSX.utils.book_append_sheet(book, sheet, "Domains");
  assert.throws(
    () => parseDomainExport(XLSX.write(book, { type: "array", bookType: "xlsx" }), "2026-10-12"),
    /Formula/,
  );
});
test("imports preserve private fields and absent rows; stale conflicts are atomic", () => {
  let state = applyImport(
    emptyInventory(),
    { rows: [row(), row("absent.com")], errors: [] },
    "one",
    "2026-10-12",
    "a",
  );
  state = updateDomain(state, {
    ...state.domains.find((d) => d.name === "example.co.uk"),
    purpose: "client",
    annualCostPence: 1800,
    autoRenew: "on",
    notes: "Protected",
  });
  const next = applyImport(
    state,
    { rows: [row("example.co.uk", "2027-10-19", "2026-10-13")], errors: [] },
    "two",
    "2026-10-13",
    "b",
  );
  assert.equal(next.domains.length, 2);
  assert.equal(next.domains.find((d) => d.name === "example.co.uk").notes, "Protected");
  assert.equal(next.domains.find((d) => d.name === "example.co.uk").annualCostPence, 1800);
  assert.throws(
    () =>
      applyImport(next, { rows: [row("new.com"), row()], errors: [] }, "older", "2026-10-12", "c"),
    /conflict/i,
  );
  assert.equal(next.domains.length, 2);
  assert.equal(applyImport(next, { rows: [row()], errors: [] }, "repeat", "2026-10-12", "b"), next);
});
test("renewal UTC date boundaries and expiry-scoped acknowledgement", () => {
  const state = applyImport(
    emptyInventory(),
    {
      rows: [
        row("seven.com", "2026-10-19"),
        row("today.com", "2026-10-12"),
        row("expired.com", "2026-10-11"),
        row("ninety.com", "2027-01-10"),
        row("outside.com", "2027-01-11"),
        row("unknown.com", null),
      ],
      errors: [],
    },
    "dates",
    "2026-10-12",
    "a",
  );
  const alerts = renewalAlerts(state.domains, "2026-10-12", ["seven.com:2026-10-19:7"]);
  assert.equal(alerts.length, 4);
  assert.equal(alerts[0].severity, "Expired");
  assert.equal(alerts.find((a) => a.days === 7).acknowledged, true);
  assert.equal(alerts.find((a) => a.days === 90).severity, "Within 90 days");
  assert.equal(
    renewalAlerts(
      [{ ...state.domains.find((d) => d.name === "seven.com"), expiresOn: "2026-10-20" }],
      "2026-10-12",
      ["seven.com:2026-10-19:7"],
    )[0].acknowledged,
    false,
  );
});
test("private migration denies visitors/nonadmins; atomic import and public data preserved", async (t) => {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(
    `CREATE ROLE anon;CREATE ROLE authenticated;CREATE SCHEMA auth;CREATE SCHEMA app_private;CREATE TYPE public.app_role AS ENUM('admin','client');CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql AS $$ SELECT nullif(current_setting('test.uid',true),'')::uuid $$;CREATE FUNCTION app_private.has_role(uuid,public.app_role) RETURNS boolean LANGUAGE sql AS $$ SELECT $1='00000000-0000-4000-8000-000000000001'::uuid AND $2='admin'::public.app_role $$;GRANT USAGE ON SCHEMA auth,app_private TO authenticated;CREATE TABLE public.domain_listings(name text);INSERT INTO public.domain_listings VALUES('preserve.com');`,
  );
  await db.exec(
    await readFile(
      new URL(
        "../supabase/migrations/20261012155701_domain_portfolio_inventory.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.exec("SET ROLE anon");
  await assert.rejects(
    db.query("SELECT * FROM public.domain_portfolio_inventory"),
    /permission denied/,
  );
  await db.exec(
    "RESET ROLE;SET ROLE authenticated;SET test.uid='00000000-0000-4000-8000-000000000002'",
  );
  assert.equal((await db.query("SELECT * FROM public.domain_portfolio_inventory")).rows.length, 0);
  const batch = "00000000-0000-4000-8000-000000000011";
  const payload = JSON.stringify([
    {
      name: "example.com",
      registrar: "IONOS",
      contract: "synthetic",
      registrar_status: "ACTIVE",
      expires_on: "2026-10-17",
    },
  ]);
  await assert.rejects(
    db.query("SELECT public.import_domain_portfolio($1,'test','2026-10-12',$2::jsonb)", [
      batch,
      payload,
    ]),
    /Administrator/,
  );
  await db.exec("SET test.uid='00000000-0000-4000-8000-000000000001'");
  assert.equal(
    (
      await db.query(
        "SELECT public.import_domain_portfolio($1,'test','2026-10-12',$2::jsonb) AS n",
        [batch, payload],
      )
    ).rows[0].n,
    1,
  );
  assert.equal(
    (
      await db.query(
        "SELECT public.import_domain_portfolio($1,'test','2026-10-12',$2::jsonb) AS n",
        [batch, payload],
      )
    ).rows[0].n,
    0,
  );
  await db.exec("UPDATE public.domain_portfolio_inventory SET notes='preserved',purpose='client'");
  const originalTimestamp = (
    await db.query(
      "SELECT updated_at::text AS updated_at FROM public.domain_portfolio_inventory WHERE name='example.com'",
    )
  ).rows[0].updated_at;
  await db.exec(
    "UPDATE public.domain_portfolio_inventory SET notes='preserved',updated_at='2000-01-01'",
  );
  const currentTimestamp = (
    await db.query(
      "SELECT updated_at::text AS updated_at FROM public.domain_portfolio_inventory WHERE name='example.com'",
    )
  ).rows[0].updated_at;
  assert.notEqual(String(currentTimestamp), String(originalTimestamp));
  assert.equal(
    (
      await db.query(
        "UPDATE public.domain_portfolio_inventory SET notes='stale overwrite' WHERE name='example.com' AND updated_at=$1 RETURNING name",
        [originalTimestamp],
      )
    ).rows.length,
    0,
  );
  const invalid = JSON.stringify([
    { name: "new.com", registrar: "IONOS", registrar_status: "ACTIVE", expires_on: "2026-10-17" },
    { name: "bad/path", registrar: "IONOS", registrar_status: "ACTIVE" },
  ]);
  await assert.rejects(
    db.query("SELECT public.import_domain_portfolio($1,'bad','2026-10-13',$2::jsonb)", [
      "00000000-0000-4000-8000-000000000012",
      invalid,
    ]),
  );
  assert.equal(
    (await db.query("SELECT count(*)::int AS n FROM public.domain_portfolio_inventory")).rows[0].n,
    1,
  );
  await db.exec("RESET ROLE");
  assert.equal(
    (await db.query("SELECT name FROM public.domain_listings")).rows[0].name,
    "preserve.com",
  );
  assert.equal(
    (await db.query("SELECT notes FROM public.domain_portfolio_inventory")).rows[0].notes,
    "preserved",
  );
});
