import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const rulesPath = path.join(__dirname, "claims-rules.json");
const rulesConfig = JSON.parse(fs.readFileSync(rulesPath, "utf8"));

function getFilesRecursively(dir, filterFn) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const dirent of list) {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, filterFn));
    } else if (filterFn(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

test("claims guard: scans customer-facing surfaces and fails on forbidden marketing claims", () => {
  const targetDirs = [
    path.join(rootDir, "src", "routes"),
    path.join(rootDir, "src", "components", "site"),
    path.join(rootDir, "src", "components", "portal"),
  ];

  const targetSpecificFiles = [
    path.join(rootDir, "src", "lib", "agency-content.ts"),
    path.join(rootDir, "src", "lib", "trade-data.ts"),
    path.join(rootDir, "src", "lib", "site-config.ts"),
  ];

  const candidateFiles = [
    ...targetDirs.flatMap((d) =>
      getFilesRecursively(d, (p) => {
        // Skip authenticated admin management screens
        if (p.includes(`${path.sep}_authenticated${path.sep}`)) return false;
        return p.endsWith(".ts") || p.endsWith(".tsx") || p.endsWith(".html") || p.endsWith(".md");
      }),
    ),
    ...targetSpecificFiles.filter((p) => fs.existsSync(p)),
  ];

  const violations = [];

  for (const filePath of candidateFiles) {
    const relPath = path.relative(rootDir, filePath).replace(/\\/g, "/");
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    for (const rule of rulesConfig.rules) {
      const isAllowlisted = (rule.allowlist || []).some((allowed) => relPath.startsWith(allowed));
      if (isAllowlisted) continue;

      const regex = new RegExp(`\\b(${rule.pattern})\\b`, "i");

      lines.forEach((lineText, idx) => {
        if (regex.test(lineText)) {
          violations.push({
            ruleId: rule.id,
            reason: rule.reason,
            file: relPath,
            line: idx + 1,
            content: lineText.trim(),
          });
        }
      });
    }
  }

  if (violations.length > 0) {
    console.error(`\n❌ Claims Guard detected ${violations.length} forbidden marketing claim(s):`);
    for (const v of violations) {
      console.error(
        `  - [${v.ruleId}] ${v.file}:${v.line} -> "${v.content}"\n    Reason: ${v.reason}`,
      );
    }
  }

  assert.equal(
    violations.length,
    0,
    `Claims Guard found ${violations.length} forbidden claim(s). See output above for details.`,
  );
});
