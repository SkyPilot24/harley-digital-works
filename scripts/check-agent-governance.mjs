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

// Keep tool entry points routed to the same maintained guide.
for (const file of [
  "AGENTS.md",
  "GEMINI.md",
  ".github/copilot-instructions.md",
  ".agents/rules/thg-shared-skills.md",
]) {
  assert(
    read(file).includes("docs/CURRENT_OPERATING_BRIEF.md"),
    file + " must point to the current brief",
  );
}
for (const file of ["docs/CURRENT_OPERATING_BRIEF.md", "docs/AGENT_SESSION_WORKFLOW.md"])
  assert(read(file).trim(), file + " missing");
assert(
  !read("docs/BUSINESS_OS_INDEX.md").includes("1sGcm_svP0v9WRrxRLSg33hq5G9BlkSx_"),
  "Current index must not route to the 2 October proposal",
);
assert(
  read("docs/daily-agency-playbook.md").startsWith("# Historical reference"),
  "Old daily checklist must be explicitly historical",
);
const rules = read(".agents/rules/harley-digital-works-standards.md");
assert(
  !/Zero VAT|£1,495|Core USP:/i.test(rules),
  "Always-on rules must not duplicate stale commercial claims",
);
assert(
  !read(".github/copilot-instructions.md").includes("This private repository"),
  "Repository visibility guidance is stale",
);
console.log("PASS: current guide, historical labels and policy pointers are consistent");
