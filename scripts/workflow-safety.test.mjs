import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const workflow = fs.readFileSync(
  new URL("../.github/workflows/deploy.yml", import.meta.url),
  "utf8",
);
test("release has one trigger, pinned checkouts, build-before-test and audit", () => {
  assert.doesNotMatch(workflow, /workflow_run:/);
  assert.match(workflow, /concurrency:/);
  const gate = workflow.slice(
    workflow.indexOf("  verify-quality-and-security:"),
    workflow.indexOf("  deploy-staging:"),
  );
  assert(gate.indexOf("run: npm run build") < gate.indexOf("run: npm test"));
  assert(gate.includes("run: npm audit --audit-level=high"));
  assert.equal(workflow.split("ref: " + "$" + "{{ github.sha }}").length - 1, 3);
  assert.equal((workflow.match(/name: Reject a superseded release revision/g) || []).length, 2);
});
