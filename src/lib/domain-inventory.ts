export type InventoryDomain = {
  updatedAt?: string;
  name: string;
  registrar: string;
  contract: string;
  registrarStatus: string;
  expiresOn: string | null;
  observedOn: string;
  autoRenew: "unknown" | "on" | "off";
  annualCostPence: number | null;
  purpose: "review" | "operational" | "client" | "community" | "personal" | "investment";
  notes: string;
};
export type ImportRow = Pick<
  InventoryDomain,
  "name" | "registrar" | "contract" | "registrarStatus" | "expiresOn" | "observedOn"
>;
export type ImportPreview = { rows: ImportRow[]; errors: string[] };
export type InventorySnapshot = {
  version: 1;
  revision: number;
  domains: InventoryDomain[];
  imports: { id: string; source: string; observedOn: string; count: number }[];
  acknowledgements: string[];
};
export const emptyInventory = (): InventorySnapshot => ({
  version: 1,
  revision: 0,
  domains: [],
  imports: [],
  acknowledgements: [],
});

export function normaliseDomain(input: string): string {
  const value = input.trim().toLowerCase().replace(/\.$/, "");
  if (!value || /[\s/:@?#\\]/.test(value))
    throw new Error("Enter a complete domain name without a URL or path.");
  const name = new URL(`https://${value}`).hostname;
  if (
    name.length > 253 ||
    !name.includes(".") ||
    !name.split(".").every((part) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(part)) ||
    /^\d+(\.\d+){3}$/.test(name)
  )
    throw new Error("Invalid domain name.");
  return name;
}
export function isDate(value: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(`${value}T00:00:00Z`)) &&
    new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value
  );
}
export function validateRow(row: ImportRow): void {
  if (
    normaliseDomain(row.name) !== row.name ||
    !isDate(row.observedOn) ||
    (row.expiresOn !== null && !isDate(row.expiresOn))
  )
    throw new Error("Invalid domain or date.");
  for (const field of [row.registrar, row.contract, row.registrarStatus])
    if (
      typeof field !== "string" ||
      field.length > 200 ||
      Array.from(field).some((character) => character.charCodeAt(0) < 32)
    )
      throw new Error("Invalid registrar field.");
}
export function previewChanges(rows: ImportRow[], existing: InventoryDomain[]) {
  const byName = new Map(existing.map((domain) => [domain.name, domain]));
  return rows.map((row) => {
    const previous = byName.get(row.name);
    const conflict =
      previous &&
      (row.observedOn < previous.observedOn ||
        (row.observedOn === previous.observedOn &&
          JSON.stringify([row.contract, row.expiresOn, row.registrarStatus, row.registrar]) !==
            JSON.stringify([
              previous.contract,
              previous.expiresOn,
              previous.registrarStatus,
              previous.registrar,
            ])));
    const changed =
      previous &&
      ["contract", "expiresOn", "registrarStatus", "registrar", "observedOn"].some(
        (key) => row[key as keyof ImportRow] !== previous[key as keyof InventoryDomain],
      );
    return {
      row,
      previous,
      action: conflict ? "conflict" : !previous ? "add" : changed ? "update" : "unchanged",
    } as const;
  });
}
export function applyImport(
  snapshot: InventorySnapshot,
  preview: ImportPreview,
  source: string,
  observedOn: string,
  id: string,
): InventorySnapshot {
  if (
    preview.errors.length ||
    !preview.rows.length ||
    preview.rows.length > 5000 ||
    !isDate(observedOn) ||
    source.length > 200 ||
    !id
  )
    throw new Error("Resolve import errors before saving.");
  const names = new Set<string>();
  for (const row of preview.rows) {
    validateRow(row);
    if (row.observedOn !== observedOn) throw new Error("Import observation dates must match.");
    if (names.has(row.name)) throw new Error("Duplicate domain.");
    names.add(row.name);
  }
  if (snapshot.imports.some((batch) => batch.id === id)) return snapshot;
  const changes = previewChanges(preview.rows, snapshot.domains);
  if (changes.some((change) => change.action === "conflict"))
    throw new Error("Conflicting or older observations require review. No changes saved.");
  const domains = new Map(snapshot.domains.map((domain) => [domain.name, domain]));
  for (const change of changes)
    domains.set(change.row.name, {
      autoRenew: "unknown",
      annualCostPence: null,
      purpose: "review",
      notes: "",
      ...change.previous,
      ...change.row,
    });
  return {
    ...snapshot,
    revision: snapshot.revision + 1,
    domains: [...domains.values()].sort((a, b) => a.name.localeCompare(b.name)),
    imports: [...snapshot.imports, { id, source, observedOn, count: preview.rows.length }],
  };
}
export function renewalAlerts(
  domains: InventoryDomain[],
  today: string,
  acknowledgements: string[] = [],
) {
  if (!isDate(today)) throw new Error("Invalid reporting date.");
  const acknowledged = new Set(acknowledgements);
  return domains
    .flatMap((domain) => {
      if (!domain.expiresOn) return [];
      const days = Math.round(
        (Date.parse(`${domain.expiresOn}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000,
      );
      if (days > 90) return [];
      const window =
        days < 0 ? "expired" : days <= 7 ? "7" : days <= 30 ? "30" : days <= 60 ? "60" : "90";
      const key = `${domain.name}:${domain.expiresOn}:${window}`;
      return [
        {
          domain,
          days,
          key,
          acknowledged: acknowledged.has(key),
          severity:
            days < 0
              ? "Expired"
              : days <= 7
                ? "Urgent"
                : days <= 30
                  ? "Within 30 days"
                  : days <= 60
                    ? "Within 60 days"
                    : "Within 90 days",
        },
      ];
    })
    .sort((a, b) => a.days - b.days || a.domain.name.localeCompare(b.domain.name));
}
export function updateDomain(
  snapshot: InventorySnapshot,
  domain: InventoryDomain,
): InventorySnapshot {
  validateInventoryDomain(domain);
  if (!snapshot.domains.some((item) => item.name === domain.name))
    throw new Error("Domain is not in this inventory.");
  return {
    ...snapshot,
    revision: snapshot.revision + 1,
    domains: snapshot.domains.map((item) => (item.name === domain.name ? domain : item)),
  };
}
function validateInventoryDomain(domain: InventoryDomain): void {
  validateRow(domain);
  if (
    !["unknown", "on", "off"].includes(domain.autoRenew) ||
    !["review", "operational", "client", "community", "personal", "investment"].includes(
      domain.purpose,
    ) ||
    typeof domain.notes !== "string" ||
    domain.notes.length > 2000 ||
    (domain.annualCostPence !== null &&
      (!Number.isSafeInteger(domain.annualCostPence) ||
        domain.annualCostPence < 0 ||
        domain.annualCostPence > 100000000))
  )
    throw new Error("Invalid inventory change.");
}

export function validateSnapshot(snapshot: InventorySnapshot): void {
  if (
    !snapshot ||
    snapshot.version !== 1 ||
    !Number.isSafeInteger(snapshot.revision) ||
    snapshot.revision < 0 ||
    !Array.isArray(snapshot.domains) ||
    !Array.isArray(snapshot.imports) ||
    !Array.isArray(snapshot.acknowledgements)
  )
    throw new Error("Invalid working-copy format.");
  const names = new Set<string>();
  for (const domain of snapshot.domains) {
    validateInventoryDomain(domain);
    if (names.has(domain.name)) throw new Error("Duplicate working-copy domain.");
    names.add(domain.name);
  }
  if (
    snapshot.imports.some(
      (batch) =>
        !batch ||
        typeof batch.id !== "string" ||
        typeof batch.source !== "string" ||
        batch.source.length > 200 ||
        !isDate(batch.observedOn) ||
        !Number.isSafeInteger(batch.count) ||
        batch.count < 1 ||
        batch.count > 5000,
    ) ||
    snapshot.acknowledgements.some((key) => typeof key !== "string" || key.length > 300)
  )
    throw new Error("Invalid working-copy history.");
}
