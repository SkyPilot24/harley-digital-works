import { spawnSync } from "node:child_process";
import process from "node:process";

const SUITES = [
  {
    name: "Agent guidance consistency",
    command: process.execPath,
    args: ["scripts/check-agent-governance.mjs"],
  },
  {
    name: "Platform Smoke & Integrity",
    command: process.execPath,
    args: ["scripts/verify-platform.mjs"],
  },
  {
    name: "Core Node Test Suites (Integration & Security)",
    command: process.execPath,
    args: [
      "--experimental-strip-types",
      "--test",
      "scripts/revenue-readiness.test.mjs",
      "scripts/portfolio-transformations.test.mjs",
      "scripts/admin-leads.test.mjs",
      "scripts/admin-records.test.mjs",
      "scripts/admin-users.test.mjs",
      "scripts/admin-validation.test.mjs",
      "scripts/admin-writes.test.mjs",
      "scripts/admin-resource-validation.test.mjs",
      "scripts/database-security.test.mjs",
      "scripts/intake-results.test.mjs",
      "scripts/reviewed-safety.test.mjs",
      "scripts/workflow-safety.test.mjs",
      "scripts/lead-notifications.test.mjs",
      "scripts/slack-integration.test.mjs",
      "scripts/payment-receipts.test.mjs",
      "scripts/payment-database.test.mjs",
      "scripts/payment-webhook.test.mjs",
      "scripts/payment-reconciliation.test.mjs",
      "scripts/payment-reconciliation-database.test.mjs",
      "scripts/auth-redirect.test.mjs",
      "scripts/auth-session.test.mjs",
      "scripts/delivery-database.test.mjs",
      "scripts/delivery-session.test.mjs",
      "scripts/project-launch.test.mjs",
      "scripts/stripe-receipt.test.mjs",
      "scripts/session-authorization.test.mjs",
      "scripts/outreach-dispatcher.test.mjs",
      "scripts/project-schema-review.test.mjs",
      "scripts/server-fn-auth.test.mjs",
      "scripts/receptionist-multi-tenant.test.mjs",
      "scripts/ai-chatbots.test.mjs",
    ],
  },
  {
    name: "Service Worker Caching & Offline",
    command: process.execPath,
    args: ["--test", "scripts/verify-service-worker.mjs"],
  },
  {
    name: "Claims Guard (Forbidden Marketing Claims & Phone Verification)",
    command: process.execPath,
    args: ["--test", "scripts/claims-guard.test.mjs"],
  },
  {
    name: "Smoke Test Suite (E2E & Accessibility)",
    command: process.execPath,
    args: ["--test", "scripts/smoke.test.mjs"],
  },
];

console.log("==================================================");
console.log(" Running Complete Test Suite Runner");
console.log("==================================================\n");

const results = [];

for (const suite of SUITES) {
  console.log(`\n>>> Running: ${suite.name}...\n`);
  const start = Date.now();
  const proc = spawnSync(suite.command, suite.args, {
    stdio: "inherit",
    env: process.env,
  });
  const duration = Date.now() - start;

  const passed = proc.status === 0;
  results.push({
    name: suite.name,
    passed,
    exitCode: proc.status,
    duration,
  });
}

console.log("\n==================================================");
console.log(" Test Runner Execution Summary");
console.log("==================================================");

let totalFailed = 0;
for (const res of results) {
  const statusLabel = res.passed ? "PASS" : `FAIL (exit ${res.exitCode})`;
  console.log(`  [${statusLabel}] ${res.name} (${res.duration}ms)`);
  if (!res.passed) totalFailed++;
}

console.log("==================================================");
console.log(
  ` Overall: ${results.length - totalFailed}/${results.length} test suites passed (${totalFailed} failed)\n`,
);

if (totalFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
