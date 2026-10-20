import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const prospectMigration = new URL(
  "../supabase/migrations/20261017201000_prospect_contact_suppression_controls.sql",
  import.meta.url,
);
const resendMigration = new URL(
  "../supabase/migrations/20261017201700_resend_outreach_event_listener.sql",
  import.meta.url,
);

async function migrationText(url) {
  return readFile(url, "utf8");
}

function executableSql(sql) {
  return sql
    .split(/\r?\n/)
    .filter((line) => !line.trimStart().startsWith("--"))
    .join("\n");
}

test("prospect-control migration creates a fail-closed service-role eligibility gate", async () => {
  const sql = await migrationText(prospectMigration);

  for (const table of [
    "public.prospects",
    "public.prospect_contacts",
    "public.marketing_suppressions",
    "public.outreach_events",
  ]) {
    assert.match(sql, new RegExp(`CREATE TABLE ${table.replace(".", "\\.")}`));
    assert.match(
      sql,
      new RegExp(`ALTER TABLE ${table.replace(".", "\\.")} ENABLE ROW LEVEL SECURITY`),
    );
  }

  assert.match(sql, /CREATE FUNCTION public\.evaluate_outreach_eligibility\(/);
  assert.match(sql, /SECURITY INVOKER\s+SET search_path = ''/);
  assert.match(
    sql,
    /REVOKE ALL ON FUNCTION public\.evaluate_outreach_eligibility\(uuid,uuid,text,text,uuid\)\s+FROM PUBLIC, anon, authenticated/,
  );
  assert.match(
    sql,
    /GRANT EXECUTE ON FUNCTION public\.evaluate_outreach_eligibility\(uuid,uuid,text,text,uuid\)\s+TO service_role/,
  );
  assert.match(
    sql,
    /CONSTRAINT marketing_suppressions_reason_code_check\s+CHECK \(\s*reason_code IN/,
  );
  assert.match(sql, /CONSTRAINT outreach_events_event_type_check\s+CHECK \(\s*event_type IN/);
  assert.match(sql, /v_reason := 'active_suppression'/);
  assert.doesNotMatch(executableSql(sql), /SECURITY DEFINER/);
});

test("Resend event-listener migration depends on prospect controls and restricts all recorder RPCs", async () => {
  const sql = await migrationText(resendMigration);

  assert.match(sql, /to_regclass\('public\.prospects'\)/);
  assert.match(sql, /outreach_events_resend_provider_event_unique/);
  assert.match(sql, /outreach_events_resend_provider_acceptance_unique/);
  assert.match(sql, /DROP CONSTRAINT outreach_events_event_type_check/);
  assert.match(sql, /DROP CONSTRAINT marketing_suppressions_reason_code_check/);
  assert.doesNotMatch(executableSql(sql), /FROM pg_constraint/);

  for (const functionName of [
    "record_outreach_email_attempt",
    "record_resend_outreach_acceptance",
    "record_resend_outreach_webhook_event",
  ]) {
    assert.match(sql, new RegExp(`CREATE OR REPLACE FUNCTION public\\.${functionName}\\(`));
    assert.match(
      sql,
      new RegExp(
        `REVOKE ALL ON FUNCTION public\\.${functionName}\\([^)]+\\)\\s+FROM PUBLIC, anon, authenticated`,
      ),
    );
    assert.match(
      sql,
      new RegExp(
        `GRANT EXECUTE ON FUNCTION public\\.${functionName}\\([^)]+\\)\\s+TO service_role`,
      ),
    );
  }

  assert.match(sql, /RETURN 'duplicate'/);
  assert.match(sql, /RETURN 'ignored'/);
  assert.match(sql, /WHEN 'email\.bounced' THEN 'hard_bounce'/);
  assert.match(sql, /WHEN 'email\.complained' THEN 'complaint'/);
  assert.match(sql, /WHEN 'email\.suppressed' THEN 'provider_suppressed'/);
  assert.doesNotMatch(executableSql(sql), /SECURITY DEFINER/);
});
