import * as XLSX from "xlsx";
import { isDate, normaliseDomain, validateRow, type ImportPreview } from "./domain-inventory.ts";

export const MAX_IMPORT_BYTES = 2 * 1024 * 1024;
export function parseDomainExport(bytes: ArrayBuffer, observedOn: string): ImportPreview {
  if (!isDate(observedOn)) throw new Error("Choose the date the registrar export was obtained.");
  if (!bytes.byteLength || bytes.byteLength > MAX_IMPORT_BYTES)
    throw new Error("Choose a CSV, XLS or XLSX file smaller than 2 MB.");
  const workbook = XLSX.read(bytes, {
    type: "array",
    cellFormula: true,
    cellDates: false,
    sheetRows: 5002,
    bookVBA: false,
    WTF: false,
  });
  if (workbook.SheetNames.length !== 1) throw new Error("Use a single-sheet registrar export.");
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const range = XLSX.utils.decode_range(sheet["!ref"] || "A1");
  if (range.e.r > 5000 || range.e.c > 30)
    throw new Error("Limit the export to 5,000 domains and 31 columns.");
  for (const [address, cell] of Object.entries(sheet))
    if (!address.startsWith("!") && cell && typeof cell === "object" && "f" in cell)
      throw new Error("Formula cells are not accepted. Export values only.");
  const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, raw: true, defval: "" });
  const headers = (matrix.shift() || []).map((cell) => String(cell).trim());
  if (new Set(headers).size !== headers.length) throw new Error("Duplicate column headers.");
  const required = ["DomainName", "Status", "ExpirationDate"];
  if (required.some((header) => !headers.includes(header)))
    throw new Error("Expected IONOS columns: DomainName, Status and ExpirationDate.");
  const errors: string[] = [];
  const rows: ImportPreview["rows"] = [];
  const seen = new Set<string>();
  matrix.forEach((values, index) => {
    if (values.every((value) => value === "" || value === null)) return;
    const get = (name: string) => values[headers.indexOf(name)] ?? "";
    try {
      const name = normaliseDomain(String(get("DomainName")));
      if (seen.has(name)) throw new Error("Duplicate domain");
      seen.add(name);
      const expiry = get("ExpirationDate");
      let expiresOn: string | null = null;
      if (typeof expiry === "number") {
        const date = XLSX.SSF.parse_date_code(expiry, {
          date1904: Boolean(workbook.Workbook?.WBProps?.date1904),
        });
        if (!date || expiry <= 0) throw new Error("Invalid Excel expiry date");
        expiresOn = `${date.y}-${String(date.m).padStart(2, "0")}-${String(date.d).padStart(2, "0")}`;
      } else if (expiry !== "") {
        expiresOn = String(expiry).trim();
        if (!isDate(expiresOn))
          throw new Error(
            "Expiry must be an Excel date or YYYY-MM-DD; ambiguous dates are not accepted",
          );
      }
      const row = {
        name,
        registrar: "IONOS",
        contract: String(get("ContractNumber")),
        registrarStatus: String(get("Status")),
        expiresOn,
        observedOn,
      };
      validateRow(row);
      rows.push(row);
    } catch (error) {
      errors.push(`Row ${index + 2}: ${error instanceof Error ? error.message : "Invalid row"}.`);
    }
  });
  if (!rows.length && !errors.length) errors.push("No domain rows found.");
  return { rows, errors };
}
