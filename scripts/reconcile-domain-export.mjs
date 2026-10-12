import { readFile, writeFile, mkdir } from "node:fs/promises";
import * as XLSX from "xlsx";
import { parseDomainExport } from "../src/lib/domain-import.ts";
import { applyImport, emptyInventory, renewalAlerts } from "../src/lib/domain-inventory.ts";
const [exportPath, referencePath, outputPath, observedOn] = process.argv.slice(2);
if (!exportPath || !referencePath || !outputPath || !observedOn)
  throw new Error(
    "Usage: node --experimental-strip-types scripts/reconcile-domain-export.mjs export.xls reference.csv output-directory YYYY-MM-DD",
  );
const bytes = await readFile(exportPath);
const parsed = parseDomainExport(
  bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
  observedOn,
);
if (parsed.errors.length) throw new Error(parsed.errors.join("\n"));
const referenceBytes = await readFile(referencePath);
const referenceBook = XLSX.read(referenceBytes, { type: "buffer" });
const records = XLSX.utils.sheet_to_json(referenceBook.Sheets[referenceBook.SheetNames[0]]);
const nameKey = Object.keys(records[0] || {}).find((key) =>
  /^(domain|domain_name|name)$/i.test(key),
);
if (!nameKey) throw new Error("Reference register has no recognised domain column.");
const reference = new Set(records.map((record) => String(record[nameKey]).toLowerCase().trim()));
const exported = new Set(parsed.rows.map((row) => row.name));
const state = applyImport(
  emptyInventory(),
  parsed,
  "IONOS export",
  observedOn,
  "reconciliation-only",
);
const alerts = renewalAlerts(state.domains, observedOn);
const report = {
  observedOn,
  exportRows: parsed.rows.length,
  referenceRows: records.length,
  overlap: [...exported].filter((name) => reference.has(name)).sort(),
  exportOnly: [...exported].filter((name) => !reference.has(name)).sort(),
  referenceOnly: [...reference].filter((name) => !exported.has(name)).sort(),
  renewals: alerts.map((alert) => ({
    name: alert.domain.name,
    expiresOn: alert.domain.expiresOn,
    days: alert.days,
    severity: alert.severity,
  })),
  inventory: parsed.rows.map((row) => ({
    name: row.name,
    expiresOn: row.expiresOn,
    registrarStatus: row.registrarStatus,
  })),
  limits: [
    "Reference-only does not mean no longer owned. No records deleted.",
    "Registrar export does not establish price, auto-renew or sale status.",
    "Today's separately created portfolio register could not be retrieved; older 45-row reference used.",
    "Database 53-name match was established in prior read-only audit, not refreshed by this script.",
  ],
};
await mkdir(outputPath, { recursive: true });
await writeFile(`${outputPath}/reconciliation.json`, JSON.stringify(report, null, 2));
await writeFile(
  `${outputPath}/reconciliation.md`,
  `# Domain reconciliation — ${observedOn}\n\n${report.exportRows} unique IONOS domains. ${report.overlap.length} overlap with the ${report.referenceRows}-row reference; ${report.exportOnly.length} export-only and ${report.referenceOnly.length} reference-only. All 53 names matched the existing database in the preceding audit. No production data changed.\n\n${alerts.length} known expiries within 90 days.\n\n| Domain | Expiry | Days remaining |\n| --- | --- | --- |\n${alerts.map((alert) => `| ${alert.domain.name} | ${alert.domain.expiresOn} | ${alert.days} |`).join("\n")}\n\n## Reference-only names requiring review\n\n${report.referenceOnly.map((name) => `- ${name}`).join("\n")}\n\n## Evidence limits\n\n${report.limits.map((limit) => `- ${limit}`).join("\n")}\n`,
);
console.log(
  JSON.stringify({
    exportRows: report.exportRows,
    referenceRows: report.referenceRows,
    overlap: report.overlap.length,
    exportOnly: report.exportOnly.length,
    referenceOnly: report.referenceOnly.length,
    dueWithin90: alerts.length,
  }),
);
