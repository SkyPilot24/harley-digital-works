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

test("phone number guard: ensures phone numbers in customer-facing and demo surfaces match authorized or Ofcom drama ranges", () => {
  const targetDirs = [
    path.join(rootDir, "src", "routes"),
    path.join(rootDir, "src", "components", "site"),
    path.join(rootDir, "src", "components", "portal"),
  ];

  const candidateFiles = targetDirs.flatMap((d) =>
    getFilesRecursively(d, (p) => {
      if (p.includes(`${path.sep}_authenticated${path.sep}`)) return false;
      return p.endsWith(".ts") || p.endsWith(".tsx") || p.endsWith(".html") || p.endsWith(".md");
    }),
  );

  const phoneRegex = /(?:\+44\s?|0)(?:1\d{2,4}|2\d|7\d{3})\s?\d{3,4}\s?\d{3,4}/g;
  const invalidPhones = [];

  const isAllowedPhone = (raw) => {
    const digits = raw.replace(/\D/g, "");
    // Canonical Bristol landline: 0117 214 1357 (or 441172141357)
    if (digits === "01172141357" || digits === "441172141357") return true;
    // Canonical HDW WhatsApp: 07394 041487 (or 447394041487)
    if (digits === "07394041487" || digits === "447394041487") return true;
    // Ofcom UK drama fictional numbers: 01632 960xxx
    if (/^(?:44|0)?1632960\d{3}$/.test(digits)) return true;
    // Ofcom Manchester drama numbers: 0161 496 0xxx
    if (/^(?:44|0)?1614960\d{3}$/.test(digits)) return true;
    // Ofcom Mobile drama numbers: 07700 900xxx
    if (/^(?:44|0)?7700900\d{3}$/.test(digits)) return true;
    // Ofcom London drama numbers: 020 7946 0xxx
    if (/^(?:44|0)?2079460\d{3}$/.test(digits)) return true;
    return false;
  };

  for (const filePath of candidateFiles) {
    const relPath = path.relative(rootDir, filePath).replace(/\\/g, "/");
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    lines.forEach((lineText, idx) => {
      let m;
      while ((m = phoneRegex.exec(lineText)) !== null) {
        const phone = m[0];
        if (!isAllowedPhone(phone)) {
          invalidPhones.push({
            file: relPath,
            line: idx + 1,
            matched: phone,
            content: lineText.trim(),
          });
        }
      }
    });
  }

  if (invalidPhones.length > 0) {
    console.error(
      `\n❌ Phone Number Guard detected ${invalidPhones.length} non-compliant phone number(s):`,
    );
    for (const p of invalidPhones) {
      console.error(`  - ${p.file}:${p.line} -> "${p.matched}" (in: "${p.content}")`);
    }
  }

  assert.equal(
    invalidPhones.length,
    0,
    `Phone Number Guard found ${invalidPhones.length} non-compliant phone number(s). Must use HDW canonical numbers or Ofcom drama ranges.`,
  );
});

test("outreach guard: prospect-facing admin scripts and demos make no delivery guarantees or fake credentials", () => {
  // Admin tools that generate text sent to prospects (email, WhatsApp, pitch decks).
  const outreachFiles = [
    "src/components/admin/OutreachSequenceEngine.tsx",
    "src/components/admin/LeadProspectorAuditDesk.tsx",
    "src/components/admin/AuditPitchDeckGenerator.tsx",
    "src/components/admin/WhatsAppIntakeDesk.tsx",
    "src/components/admin/CaseStudyFactoryDesk.tsx",
  ];
  const outreachPatterns = [
    { id: "fourteen-day-promise", regex: /\b14[- ]day\b|\b14 days\b/i },
    {
      id: "delivery-guarantee",
      regex: /\bguarantee[ds]?\b[^\n]{0,40}\b(launch|live|delivery|turnaround)\b/i,
    },
    { id: "map-pack-ranking-promise", regex: /\bMap Pack ranking\b/i },
  ];

  // Demo/marketing surfaces must not show realistic-looking registration numbers.
  const credentialFiles = [
    ...getFilesRecursively(path.join(rootDir, "src", "routes"), (p) => p.endsWith(".tsx")),
    ...getFilesRecursively(path.join(rootDir, "src", "components", "demos"), (p) =>
      /\.(ts|tsx)$/.test(p),
    ),
  ].map((p) => path.relative(rootDir, p).replace(/\\/g, "/"));
  // Matches e.g. "NICEIC Approved Contractor #D604921" but not Companies House numbers ("Company #...").
  const credentialPattern = /NICEIC(?:(?!Company)[^\n]){0,40}#\s?[A-Z]?\d{5,}/i;

  const violations = [];
  for (const rel of outreachFiles) {
    const full = path.join(rootDir, rel);
    if (!fs.existsSync(full)) continue;
    fs.readFileSync(full, "utf8")
      .split("\n")
      .forEach((line, idx) => {
        for (const p of outreachPatterns) {
          if (p.regex.test(line)) violations.push(`[${p.id}] ${rel}:${idx + 1} -> ${line.trim()}`);
        }
      });
  }
  for (const rel of credentialFiles) {
    if (rel.includes("/_authenticated/")) continue;
    fs.readFileSync(path.join(rootDir, rel), "utf8")
      .split("\n")
      .forEach((line, idx) => {
        if (credentialPattern.test(line))
          violations.push(`[fake-credential-number] ${rel}:${idx + 1} -> ${line.trim()}`);
      });
  }

  if (violations.length > 0)
    console.error(`\nOutreach guard violations:\n  ${violations.join("\n  ")}`);
  assert.equal(violations.length, 0, `Outreach guard found ${violations.length} violation(s).`);
});
