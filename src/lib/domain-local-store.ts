import { emptyInventory, validateSnapshot, type InventorySnapshot } from "./domain-inventory";
const KEY = "thg.domain-portfolio.local.v1";
export function assertLocalPortfolio(): void {
  if (
    !import.meta.env.DEV ||
    !["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname)
  )
    throw new Error("Domain portfolio local preview is available on this computer only.");
}
export function loadLocalInventory(): InventorySnapshot {
  assertLocalPortfolio();
  const raw = localStorage.getItem(KEY);
  if (!raw) return emptyInventory();
  const value = JSON.parse(raw) as InventorySnapshot;
  if (
    value.version !== 1 ||
    !Number.isSafeInteger(value.revision) ||
    !Array.isArray(value.domains) ||
    !Array.isArray(value.imports) ||
    !Array.isArray(value.acknowledgements)
  )
    throw new Error("Local portfolio data needs recovery; existing data has been preserved.");
  validateSnapshot(value);
  return value;
}
export function saveLocalInventory(next: InventorySnapshot, previousRevision: number): void {
  assertLocalPortfolio();
  validateSnapshot(next);
  const current = loadLocalInventory();
  if (current.revision !== previousRevision)
    throw new Error("Another tab changed this portfolio. Reload before saving.");
  localStorage.setItem(KEY, JSON.stringify(next));
}
