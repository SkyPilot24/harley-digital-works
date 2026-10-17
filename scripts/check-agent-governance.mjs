import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

// Static entry-point consistency only; this cannot prove an agent loaded the files.
const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const contract = read("AGENTS.md");
assert(
  contract.startsWith("# The Harley Group"),
  "AGENTS.md must begin with the contract, not pasted chat framing",
);
assert(
  contract.includes("## Mandatory session-start contract"),
  "Shared session-start contract missing",
);
assert(!/^```/m.test(contract), "Remove pasted outer code fences from AGENTS.md");
for (const path of [".agents/rules/thg-shared-skills.md", ".github/copilot-instructions.md"]) {
  const content = read(path);
  assert(content.includes("AGENTS.md"), `${path} must point to root AGENTS.md`);
  assert(content.includes("branch/HEAD"), `${path} must require a source-revision assessment`);
  console.log(`PASS: ${path} references the shared starting contract`);
}
for (const path of [
  "BUSINESS_DEFINITION.md",
  "PROJECT_STATUS.md",
  "MASTER_BACKLOG.md",
  "docs/HANDOVER.md",
])
  assert(read(path).trim(), `${path} is missing or empty`);
console.log("PASS: governing records exist; entry points are consistent");
console.log(
  "LIMIT: static files only; host instruction discovery, checkout freshness and actual agent compliance need observation.",
);
