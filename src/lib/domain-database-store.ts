import { supabase } from "@/integrations/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  emptyInventory,
  validateSnapshot,
  type InventoryDomain,
  type InventorySnapshot,
  type ImportPreview,
} from "./domain-inventory";

type DomainRow = {
  name: string;
  registrar: string;
  contract: string;
  registrar_status: string;
  expires_on: string | null;
  observed_on: string;
  auto_renew: InventoryDomain["autoRenew"];
  annual_cost_pence: number | null;
  purpose: InventoryDomain["purpose"];
  notes: string;
  import_id: string;
  updated_at: string;
};
type BatchRow = {
  id: string;
  source_name: string;
  observed_on: string;
  row_count: number;
  created_by: string;
  created_at: string;
};
type AckRow = {
  domain_name: string;
  expires_on: string;
  renewal_window: string;
  acknowledged_by: string;
  acknowledged_at: string;
};
type Table<Row> = { Row: Row; Insert: Partial<Row>; Update: Partial<Row>; Relationships: [] };
type PortfolioDatabase = {
  public: {
    Tables: {
      domain_portfolio_inventory: Table<DomainRow>;
      domain_portfolio_imports: Table<BatchRow>;
      domain_portfolio_alert_acknowledgements: Table<AckRow>;
    };
    Views: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
    Functions: {
      import_domain_portfolio: {
        Args: { p_id: string; p_source: string; p_observed_on: string; p_rows: unknown };
        Returns: number;
      };
    };
  };
};
// Same existing user-authenticated client. Database RLS/RPC enforce the trusted admin role.
const db = supabase as unknown as SupabaseClient<PortfolioDatabase>;
async function readPages<T>(
  query: (start: number, end: number) => PromiseLike<{ data: T[] | null; error: unknown }>,
): Promise<T[]> {
  const rows: T[] = [];
  for (let start = 0; start < 50000; start += 500) {
    const result = await query(start, start + 499);
    if (result.error)
      throw new Error(
        "Unable to load the private portfolio. Check your admin access and database setup.",
      );
    rows.push(...(result.data || []));
    if ((result.data || []).length < 500) return rows;
  }
  throw new Error("Portfolio exceeds the loading limit. No partial inventory has been shown.");
}
export async function loadDatabaseInventory(): Promise<InventorySnapshot> {
  const [domains, batches, acks] = await Promise.all([
    readPages<DomainRow>((start, end) =>
      db.from("domain_portfolio_inventory").select("*").order("name").range(start, end),
    ),
    readPages<BatchRow>((start, end) =>
      db
        .from("domain_portfolio_imports")
        .select("*")
        .order("created_at")
        .order("id")
        .range(start, end),
    ),
    readPages<AckRow>((start, end) =>
      db
        .from("domain_portfolio_alert_acknowledgements")
        .select("*")
        .order("domain_name")
        .order("expires_on")
        .order("renewal_window")
        .range(start, end),
    ),
  ]);
  const state: InventorySnapshot = {
    ...emptyInventory(),
    domains: domains.map((row) => ({
      name: row.name,
      registrar: row.registrar,
      contract: row.contract,
      registrarStatus: row.registrar_status,
      expiresOn: row.expires_on,
      observedOn: row.observed_on,
      autoRenew: row.auto_renew,
      annualCostPence: row.annual_cost_pence,
      purpose: row.purpose,
      notes: row.notes,
      updatedAt: row.updated_at,
    })),
    imports: batches.map((row) => ({
      id: row.id,
      source: row.source_name,
      observedOn: row.observed_on,
      count: row.row_count,
    })),
    acknowledgements: acks.map(
      (row) => `${row.domain_name}:${row.expires_on}:${row.renewal_window}`,
    ),
  };
  validateSnapshot(state);
  return state;
}
export async function importDatabaseInventory(
  preview: ImportPreview,
  source: string,
  observedOn: string,
  identity: string,
): Promise<InventorySnapshot> {
  if (preview.errors.length || !preview.rows.length)
    throw new Error("Resolve import errors before saving.");
  const bytes = new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(identity)),
  );
  const hex = Array.from(bytes.slice(0, 16), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const id = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  const { error } = await db.rpc("import_domain_portfolio", {
    p_id: id,
    p_source: source,
    p_observed_on: observedOn,
    p_rows: preview.rows.map((row) => ({
      name: row.name,
      registrar: row.registrar,
      contract: row.contract,
      registrar_status: row.registrarStatus,
      expires_on: row.expiresOn,
    })),
  });
  if (error)
    throw new Error(
      "Import was not saved. Review conflicting observations or your admin access, then refresh and retry.",
    );
  return loadDatabaseInventory();
}
export async function saveDatabaseInventory(
  previous: InventorySnapshot,
  next: InventorySnapshot,
): Promise<InventorySnapshot> {
  validateSnapshot(next);
  const changed = next.domains.filter(
    (row) =>
      JSON.stringify(row) !== JSON.stringify(previous.domains.find((old) => old.name === row.name)),
  );
  const added = next.acknowledgements.filter((key) => !previous.acknowledgements.includes(key));
  const removed = previous.acknowledgements.filter((key) => !next.acknowledgements.includes(key));
  if (changed.length + added.length + removed.length === 0) return loadDatabaseInventory();
  if (changed.length + added.length + removed.length !== 1)
    throw new Error("Save one reviewed change at a time.");
  if (changed.length) {
    const row = changed[0];
    const old = previous.domains.find((domain) => domain.name === row.name);
    if (!old?.updatedAt) throw new Error("Refresh the portfolio before saving.");
    const { data, error } = await db
      .from("domain_portfolio_inventory")
      .update({
        auto_renew: row.autoRenew,
        annual_cost_pence: row.annualCostPence,
        purpose: row.purpose,
        notes: row.notes,
      })
      .eq("name", row.name)
      .eq("updated_at", old.updatedAt)
      .select("name");
    if (error || !data?.length)
      throw new Error("This domain changed or access was denied. Refresh before saving.");
  } else {
    const [name, expiry, window] = (added[0] || removed[0]).split(":");
    const result = added.length
      ? await db
          .from("domain_portfolio_alert_acknowledgements")
          .insert({ domain_name: name, expires_on: expiry, renewal_window: window })
      : await db
          .from("domain_portfolio_alert_acknowledgements")
          .delete()
          .eq("domain_name", name)
          .eq("expires_on", expiry)
          .eq("renewal_window", window);
    if (result.error) throw new Error("Unable to update alert acknowledgement. Refresh and retry.");
  }
  return loadDatabaseInventory();
}
