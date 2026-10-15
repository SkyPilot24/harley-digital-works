import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { parseEnv } from "node:util";

// Generates a separate review target; this script never deploys or writes secrets.
const stage = "https://mfpnfxpgkfuqtedbcxvp.supabase.co";
const config = parseEnv(await readFile(new URL("../.env.local", import.meta.url), "utf8"));
assert.equal(config.SUPABASE_URL, stage);
assert.equal(config.VITE_SUPABASE_URL, stage);
assert.equal(config.SUPABASE_PUBLISHABLE_KEY, config.VITE_SUPABASE_PUBLISHABLE_KEY);
assert.ok(config.SUPABASE_PUBLISHABLE_KEY?.trim());
for (const key of [
  "STRIPE_WEBHOOK_ENABLED",
  "DELIVERY_APPROVAL_ENABLED",
  "LEAD_NOTIFICATIONS_ENABLED",
  "SLACK_NOTIFICATIONS_ENABLED",
  "TRANSACTIONAL_EMAIL_ENABLED",
])
  assert.equal(config[key], "false", "Review features and outbound services must stay disabled");
const path = new URL("../.output/server/wrangler.json", import.meta.url);
const compiled = JSON.parse(await readFile(path, "utf8"));
assert.equal(compiled.account_id, "6ccd86a1ec4535357f9bc51cd05e68cd", "Unexpected account");
const preview = {
  name: "hdw-h50-01a139f2",
  account_id: compiled.account_id,
  compatibility_date: compiled.compatibility_date,
  compatibility_flags: compiled.compatibility_flags,
  main: compiled.main,
  assets: compiled.assets,
  no_bundle: compiled.no_bundle,
  rules: compiled.rules,
  keep_vars: false,
  workers_dev: true,
  routes: [],
  triggers: { crons: [] },
  vars: {
    SUPABASE_URL: stage,
    SUPABASE_PUBLISHABLE_KEY: config.SUPABASE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_MODE: "test",
    STRIPE_WEBHOOK_ENABLED: "false",
    DELIVERY_APPROVAL_ENABLED: "false",
    LEAD_NOTIFICATIONS_ENABLED: "false",
    SLACK_NOTIFICATIONS_ENABLED: "false",
    TRANSACTIONAL_EMAIL_ENABLED: "false",
  },
};
assert.notEqual(preview.name, compiled.name);
await writeFile(
  new URL("wrangler.h50-preview.json", path),
  JSON.stringify(preview, null, 2) + "\n",
);
console.log(
  "Prepared isolated H50 preview configuration; no live routes, cron jobs, secrets or deployment.",
);
