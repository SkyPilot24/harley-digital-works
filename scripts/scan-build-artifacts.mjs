import fs from "node:fs";
import path from "node:path";

const secretPatterns = [
  { name: "Private Key", regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: "Resend Live API Key", regex: /re_[a-zA-Z0-9]{20,}/ },
  { name: "Stripe Secret Key", regex: /sk_live_[a-zA-Z0-9]{20,}/ },
  { name: "Slack Webhook URL", regex: /https:\/\/hooks\.slack\.com\/services\/T[a-zA-Z0-9_]+\/B[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/ },
  { name: "Raw Supabase Service Role Secret", regex: /service_role_key\s*[:=]\s*["'][a-zA-Z0-9._-]{50,}["']/i },
  { name: "Generic AWS Secret Key", regex: /AKIA[0-9A-Z]{16}/ },
  { name: "Generic Private Token", regex: /ghp_[a-zA-Z0-9]{36}/ }
  {
    name: "Slack Webhook URL",
    regex: /https:\/\/hooks\.slack\.com\/services\/T[a-zA-Z0-9_]+\/B[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/,
  },
  {
    name: "Raw Supabase Service Role Secret",
    regex: /service_role_key\s*[:=]\s*["'][a-zA-Z0-9._-]{50,}["']/i,
  },
  { name: "Generic AWS Secret Key", regex: /AKIA[0-9A-Z]{16}/ },
  { name: "Generic Private Token", regex: /ghp_[a-zA-Z0-9]{36}/ },
];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const findings = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findings.push(...scanDir(fullPath));
    } else if (entry.isFile()) {
      try {
        const content = fs.readFileSync(fullPath, "utf8");
        for (const p of secretPatterns) {
          if (p.regex.test(content)) {
            findings.push({ file: fullPath, pattern: p.name });
          }
        }
      } catch {
        // Skip non-text or binary files
      }
    }
  }
  return findings;
}

if (!fs.existsSync(".output")) {
  console.error("Error: .output directory does not exist.");
  process.exit(1);
}

const results = scanDir(".output");
console.log(`Scanned .output artifacts. Total findings: ${results.length}`);
if (results.length > 0) {
  console.error("FAIL: Potential credentials detected:");
  console.error(JSON.stringify(results, null, 2));
  process.exit(1);
} else {
  console.log("PASS: Zero private credentials or live secrets exposed in build artifacts.");
  process.exit(0);
}
