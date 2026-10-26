import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const BANNED_WORDS = [
  "delve",
  "foster",
  "leverage",
  "utilize",
  "facilitate",
  "empower",
  "streamline",
  "robust",
  "cutting-edge",
  "paradigm shift",
  "game changer",
  "this is huge",
  "this changes everything",
  "tapestry",
  "realm",
  "beacon",
  "multifaceted",
  "meticulous",
  "intricate",
  "paramount",
  "transformative",
  "elevate",
  "embark",
  "supercharge",
  "harness",
  "ever-evolving",
  "seamless",
];

const EMPTY_PHRASES = [
  "it's worth noting",
  "it's important to note",
  "at the end of the day",
  "when it comes to",
  "at its core",
  "in today's world",
  "in the age of",
  "in the world of",
  "the reality is",
  "the truth is",
  "in terms of",
  "with regard to",
  "in order to",
  "going forward",
  "let's dive in",
];

const THROAT_CLEARING = [
  "here's the thing",
  "here's what",
  "let me be clear",
  "i'll be honest",
  "the uncomfortable truth is",
  "what most people get wrong",
  "here's what nobody tells you",
  "the part everyone misses",
  "stands as a testament",
  "marks a pivotal moment",
  "plays a vital role",
  "solidifies its position",
  "underscores its significance",
];

const BINARY_CONTRASTS = ["not just", "isn't just", "not only"];

const EMPTY_ADVERBS = [
  "literally",
  "honestly",
  "actually",
  "truly",
  "fundamentally",
  "crucially",
  "inherently",
  "inevitably",
];

function getFilesRecursively(dir, filterFn) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const dirent of list) {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      if (dirent.name !== "node_modules" && dirent.name !== ".git") {
        results = results.concat(getFilesRecursively(fullPath, filterFn));
      }
    } else if (filterFn(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

// Target public customer-facing routes and components
const targetDirs = [
  path.join(rootDir, "src", "routes"),
  path.join(rootDir, "src", "components", "site"),
  path.join(rootDir, "src", "components", "demos"),
];

const candidateFiles = [
  ...targetDirs.flatMap((d) =>
    getFilesRecursively(d, (p) => {
      if (p.includes(`${path.sep}_authenticated${path.sep}`)) return false;
      if (p.includes(".test.") || p.includes(".spec.")) return false;
      return p.endsWith(".ts") || p.endsWith(".tsx");
    }),
  ),
  path.join(rootDir, "src", "lib", "portfolio-data.ts"),
  path.join(rootDir, "src", "lib", "agency-content.ts"),
  path.join(rootDir, "src", "lib", "trade-data.ts"),
].filter((f) => fs.existsSync(f));

const findings = [];

for (const filePath of candidateFiles) {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, "/");
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) return;

    for (const w of BANNED_WORDS) {
      const reg = new RegExp(`\\b${w}[a-z]*\\b`, "i");
      if (reg.test(line)) {
        findings.push({ file: relPath, line: idx + 1, type: "BANNED_WORD: " + w, text: trimmed });
      }
    }

    for (const ep of EMPTY_PHRASES) {
      const escaped = ep.replace("'", "['']");
      const reg = new RegExp(`\\b${escaped}\\b`, "i");
      if (reg.test(line)) {
        findings.push({ file: relPath, line: idx + 1, type: "EMPTY_PHRASE: " + ep, text: trimmed });
      }
    }

    for (const tc of THROAT_CLEARING) {
      const escaped = tc.replace("'", "['']");
      const reg = new RegExp(`\\b${escaped}\\b`, "i");
      if (reg.test(line)) {
        findings.push({
          file: relPath,
          line: idx + 1,
          type: "THROAT_CLEARING: " + tc,
          text: trimmed,
        });
      }
    }

    for (const bc of BINARY_CONTRASTS) {
      const escaped = bc.replace("'", "['']");
      const reg = new RegExp(`\\b${escaped}\\b`, "i");
      if (reg.test(line)) {
        findings.push({
          file: relPath,
          line: idx + 1,
          type: "BINARY_CONTRAST: " + bc,
          text: trimmed,
        });
      }
    }

    for (const adv of EMPTY_ADVERBS) {
      const reg = new RegExp(`\\b${adv}\\b`, "i");
      if (reg.test(line)) {
        findings.push({
          file: relPath,
          line: idx + 1,
          type: "EMPTY_ADVERB: " + adv,
          text: trimmed,
        });
      }
    }

    // Check emojis in customer-facing files
    const emojiMatch = line.match(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu);
    if (emojiMatch) {
      // Exclude checkmark and cross symbols if used purely as status markers
      const nonStatus = emojiMatch.filter((e) => e !== "✓" && e !== "✕");
      if (nonStatus.length > 0) {
        findings.push({
          file: relPath,
          line: idx + 1,
          type: "EMOJI: " + nonStatus.join(" "),
          text: trimmed.slice(0, 100),
        });
      }
    }
  });
}

fs.writeFileSync(
  path.join(rootDir, "scripts", "slop-findings.json"),
  JSON.stringify(findings, null, 2),
);
console.log(`Scan complete. Found ${findings.length} customer-facing items to review.`);
for (const f of findings) {
  console.log(`${f.file}:${f.line} [${f.type}] -> ${f.text}`);
}
