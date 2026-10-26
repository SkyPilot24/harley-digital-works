import fs from "node:fs";
import path from "node:path";

/**
 * Utility script to audit and sanitize customer-facing em-dashes across routes and components.
 */
const targets = [
  "src/routes/index.tsx",
  "src/routes/work.tsx",
  "src/routes/about.tsx",
  "src/routes/demos.tsx",
  "src/routes/demos_.rg-electrical.tsx",
  "src/routes/brand.tsx",
  "src/routes/contact.tsx",
];

let totalReplacements = 0;

for (const relPath of targets) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    continue;
  }

  let content = fs.readFileSync(fullPath, "utf8");
  const original = content;

  // Replace common em-dash patterns with clean hyphens, colons, or sentence breaks
  content = content.replace(/\s*—\s*/g, " - ");

  if (content !== original) {
    fs.writeFileSync(fullPath, content, "utf8");
    totalReplacements++;
    console.log(`Sanitized: ${relPath}`);
  }
}

console.log(`Finished sanitation. Modified ${totalReplacements} files.`);
