// Run only against the isolated local Supabase instance; never production.
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createClient } from "@supabase/supabase-js";

const status = JSON.parse(
  await readFile(new URL("../local-evidence/staging-status.json", import.meta.url), "utf8"),
);
assert.equal(status.API_URL, "http://127.0.0.1:54421", "Refuse any non-local API");
const options = { auth: { persistSession: false, autoRefreshToken: false } };
const owner = createClient(status.API_URL, status.SERVICE_ROLE_KEY, options);
const visitor = createClient(status.API_URL, status.ANON_KEY, options);
const run = promisify(execFile);
const results = [];
async function check(name, action) {
  await action();
  results.push({ name, passed: true });
  console.log(`PASS: ${name}`);
}
async function account(role) {
  const email = `domain-${role}-${randomUUID()}@example.invalid`;
  const password = `${randomUUID()}Aa1!`;
  const created = await owner.auth.admin.createUser({ email, password, email_confirm: true });
  assert.equal(created.error, null);
  const id = created.data.user.id;
  assert.match(id, /^[a-f0-9-]{36}$/);
  if (role === "admin") {
    await run(
      process.env.THG_DOCKER_EXE ||
        "C:\\Users\\drrob\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe",
      [
        "exec",
        "supabase_db_thg-domain-portfolio-test",
        "psql",
        "-U",
        "postgres",
        "-d",
        "postgres",
        "-v",
        "ON_ERROR_STOP=1",
        "-c",
        `INSERT INTO public.user_roles(user_id,role) VALUES('${id}','admin') ON CONFLICT DO NOTHING;`,
      ],
    );
  }
  const client = createClient(status.API_URL, status.ANON_KEY, options);
  const signed = await client.auth.signInWithPassword({ email, password });
  assert.equal(signed.error, null);
  assert.equal(signed.data.user.id, id);
  return { client, id };
}
const admin = await account("admin");
const ordinary = await account("ordinary");
const table = "domain_portfolio_inventory";
const domain = `acceptance-${randomUUID()}.test`;
const batch = randomUUID();
const payload = {
  p_id: batch,
  p_source: "Synthetic acceptance fixture",
  p_observed_on: "2026-10-12",
  p_rows: [
    {
      name: domain,
      registrar: "Synthetic",
      contract: "local-only",
      registrar_status: "ACTIVE",
      expires_on: "2026-10-17",
    },
  ],
};
await check("anonymous private reads denied", async () => {
  assert.ok((await visitor.from(table).select("*")).error);
});
await check("ordinary user private reads hidden", async () => {
  const result = await ordinary.client.from(table).select("*");
  assert.equal(result.error, null);
  assert.deepEqual(result.data, []);
});
await check("ordinary user cannot import via direct RPC", async () => {
  assert.ok((await ordinary.client.rpc("import_domain_portfolio", payload)).error);
});
await check("ordinary user cannot promote own role", async () => {
  assert.ok(
    (await ordinary.client.from("user_roles").insert({ user_id: ordinary.id, role: "admin" }))
      .error,
  );
});
await check("admin imports through actual Auth/Data API", async () => {
  const result = await admin.client.rpc("import_domain_portfolio", payload);
  assert.equal(result.error, null);
  assert.equal(result.data, 1);
});
await check("repeat import is idempotent", async () => {
  const result = await admin.client.rpc("import_domain_portfolio", payload);
  assert.equal(result.error, null);
  assert.equal(result.data, 0);
});
await check("admin edits and stale version cannot overwrite", async () => {
  const before = await admin.client.from(table).select("updated_at").eq("name", domain).single();
  assert.equal(before.error, null);
  const saved = await admin.client
    .from(table)
    .update({ notes: "Synthetic private note", purpose: "client" })
    .eq("name", domain)
    .eq("updated_at", before.data.updated_at)
    .select("name");
  assert.equal(saved.error, null);
  assert.equal(saved.data.length, 1);
  const stale = await admin.client
    .from(table)
    .update({ notes: "stale overwrite" })
    .eq("name", domain)
    .eq("updated_at", before.data.updated_at)
    .select("name");
  assert.equal(stale.error, null);
  assert.deepEqual(stale.data, []);
});
await check("ordinary user cannot change private data", async () => {
  const result = await ordinary.client
    .from(table)
    .update({ notes: "unauthorised" })
    .eq("name", domain)
    .select("name");
  assert.equal(result.error, null);
  assert.deepEqual(result.data, []);
});
await check("invalid import rolls back the entire batch", async () => {
  const id = randomUUID();
  const result = await admin.client.rpc("import_domain_portfolio", {
    ...payload,
    p_id: id,
    p_rows: [
      { ...payload.p_rows[0], name: `rollback-${randomUUID()}.test` },
      { name: "bad/path", registrar: "Synthetic", registrar_status: "ACTIVE" },
    ],
  });
  assert.ok(result.error);
  const batchResult = await admin.client.from("domain_portfolio_imports").select("id").eq("id", id);
  assert.equal(batchResult.error, null);
  assert.deepEqual(batchResult.data, []);
});
await check("admin alert acknowledgement persists and reopens", async () => {
  const tableName = "domain_portfolio_alert_acknowledgements";
  const row = { domain_name: domain, expires_on: "2026-10-17", renewal_window: "7" };
  assert.equal((await admin.client.from(tableName).insert(row)).error, null);
  const read = await admin.client.from(tableName).select("domain_name").eq("domain_name", domain);
  assert.equal(read.error, null);
  assert.equal(read.data.length, 1);
  assert.equal((await admin.client.from(tableName).delete().eq("domain_name", domain)).error, null);
});
await check("private edits survive denied and failed requests", async () => {
  const result = await admin.client.from(table).select("notes,purpose").eq("name", domain).single();
  assert.equal(result.error, null);
  assert.deepEqual(result.data, { notes: "Synthetic private note", purpose: "client" });
});
await writeFile(
  new URL("../local-evidence/domain-auth-acceptance.json", import.meta.url),
  JSON.stringify(
    {
      environment: "isolated localhost:54421",
      testedAt: new Date().toISOString(),
      syntheticOnly: true,
      results,
    },
    null,
    2,
  ),
);
console.log(
  `${results.length} real Auth/Data API checks passed. Synthetic fixtures remain only in the isolated test database.`,
);
