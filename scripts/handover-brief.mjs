import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

// Helper script to extract the latest handover summary for ChatGPT
const handoverPath = path.resolve(process.cwd(), "docs/HANDOVER.md");
const statusPath = path.resolve(process.cwd(), "PROJECT_STATUS.md");

if (!fs.existsSync(handoverPath)) {
  console.error("docs/HANDOVER.md not found");
  process.exit(1);
}

const handoverContent = fs.readFileSync(handoverPath, "utf-8");
const sections = handoverContent.split(/\n## /);
const latestHandover = sections.length > 1 ? "## " + sections[1] : handoverContent;

// Extract lines up to the next heading or first 30 lines
const handoverLines = latestHandover.split("\n").slice(0, 25).join("\n");

// Get git commit info
let gitCommit = "unknown";
try {
  gitCommit = execSync("git rev-parse --short HEAD", { encoding: "utf-8" }).trim();
} catch (e) {
  // ignore
}

const brief = `=== THE HARLEY GROUP · CHATGPT HANDOVER BRIEF ===
Commit: ${gitCommit} (on origin/main)
Repo: https://github.com/SkyPilot24/harley-digital-works

${handoverLines}

---
RULES FOR CHATGPT:
1. Parent: The Harley Group Ltd. Customer brand: Harley Digital Works.
2. Ratified Managed Package: £1,495 setup + £249/mo care. No VAT (not registered).
3. Delivery: Agreed milestone schedule (do NOT promise 14 days). Max 2 active builds.
4. Role: You are Chief of Staff (strategy, sales copy, founder decisions). 
   Antigravity handles local code, tests, and Git commits.
=================================================`;

console.log(brief);

// Try to copy to Windows clipboard if available
try {
  if (process.platform === "win32") {
    execSync('powershell -NoProfile -Command "Set-Clipboard -Value ([Console]::In.ReadToEnd())"', {
      input: brief,
      stdio: ["pipe", "ignore", "ignore"],
    });
    console.log(
      "\n[Copied automatically to your Windows clipboard! Just press Ctrl+V in ChatGPT.]",
    );
  }
} catch (err) {
  // clipboard copy failed or not supported; console output remains
}
