import { readFile } from "node:fs/promises";
import { parseEnv } from "node:util";

const expectedUrl = "https://mfpnfxpgkfuqtedbcxvp.supabase.co";
let config;
try {
  config = parseEnv(await readFile(new URL("../.env.local", import.meta.url), "utf8"));
} catch {
  console.error(
    "Staging configuration unavailable. Create the ignored .env.local from .env.staging.example.",
  );
  process.exit(2);
}
const checks = [
  ["Server targets isolated staging", config.SUPABASE_URL === expectedUrl],
  ["Browser targets the same staging project", config.VITE_SUPABASE_URL === expectedUrl],
  ["Server publishable key present", Boolean(config.SUPABASE_PUBLISHABLE_KEY?.trim())],
  ["Server secret key present", Boolean(config.SUPABASE_SERVICE_ROLE_KEY?.trim())],
  ["Browser publishable key present", Boolean(config.VITE_SUPABASE_PUBLISHABLE_KEY?.trim())],
  [
    "Browser and server publishable keys agree",
    Boolean(config.SUPABASE_PUBLISHABLE_KEY) &&
      config.SUPABASE_PUBLISHABLE_KEY === config.VITE_SUPABASE_PUBLISHABLE_KEY,
  ],
  ["Outbound lead notifications disabled", config.LEAD_NOTIFICATIONS_ENABLED === "false"],
  ["Outbound Slack disabled", config.SLACK_NOTIFICATIONS_ENABLED === "false"],
  ["Outbound email disabled", config.TRANSACTIONAL_EMAIL_ENABLED === "false"],
];
for (const [label, pass] of checks) console.log(`${pass ? "PASS" : "MISSING"}: ${label}`);
console.log(
  "Configuration presence only; this does not verify key ownership, Auth sessions, payment delivery or production readiness.",
);
process.exitCode = checks.every(([, pass]) => pass) ? 0 : 2;
