import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../integrations/supabase/types";

type Client = SupabaseClient<Database>;
type RecordRow = { id: string };
type PageResult<T> = { data: T[] | null; count: number | null; error: unknown };
export const ADMIN_PAGE_SIZE = 25;
export const activeProjectStages = ["discovery", "in_progress", "review"] as const;
export type ClientFilter = "all" | Database["public"]["Enums"]["client_status"];
export type ProjectFilter = "all" | "active" | Database["public"]["Enums"]["project_status"];

function confirmPageLength(rows: unknown[], total: number, page: number) {
  const expected = Math.min(ADMIN_PAGE_SIZE, Math.max(0, total - page * ADMIN_PAGE_SIZE));
  if (rows.length !== expected)
    throw new Error("Page response incomplete. Refresh or check the server row limit.");
}

/** Cursor reads must honour the exact remaining count, even below the requested server limit. */
export async function loadCompleteRecords<T extends RecordRow>(
  read: (after?: string) => PromiseLike<PageResult<T>>,
): Promise<T[]> {
  const rows: T[] = [];
  let after: string | undefined;
  let expected: number | undefined;
  for (;;) {
    const result = await read(after);
    if (result.error) throw result.error;
    if (result.data === null || result.count === null) throw new Error("Record totals unavailable");
    expected ??= result.count;
    if (result.count !== expected - rows.length)
      throw new Error("Records changed while loading. Retry to refresh.");
    if (!result.data.length && rows.length !== expected)
      throw new Error("Incomplete record response");
    for (const row of result.data) {
      if (!row.id || (after !== undefined && row.id <= after))
        throw new Error("Invalid record order");
      rows.push(row);
      after = row.id;
    }
    if (rows.length === expected) return rows;
    if (rows.length > expected) throw new Error("Unexpected record count");
  }
}

export function recordSearchFilter(fields: string[], search: string): string {
  const pattern = JSON.stringify(search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return fields.map((field) => `${field}.imatch.${pattern}`).join(",");
}

async function confirmedCount(query: PromiseLike<{ count: number | null; error: unknown }>) {
  const result = await query;
  if (result.error) throw result.error;
  if (result.count === null) throw new Error("Business totals unavailable");
  return result.count;
}

export async function loadClientSummary(client: Client) {
  const statuses = ["all", "lead", "active", "paused", "archived"] as const;
  const [counts, active] = await Promise.all([
    Promise.all(
      statuses.map(async (status) => {
        let query = client.from("clients").select("id", { count: "exact", head: true });
        if (status !== "all") query = query.eq("status", status);
        return [status, await confirmedCount(query)] as const;
      }),
    ),
    loadCompleteRecords((after) => {
      let query = client
        .from("clients")
        .select("id,monthly_value_cents", { count: "exact" })
        .eq("status", "active")
        .order("id")
        .limit(500);
      if (after) query = query.gt("id", after);
      return query;
    }),
  ]);
  const monthlyValueCents = active.reduce(
    (sum, row) => sum + Math.max(row.monthly_value_cents ?? 0, 0),
    0,
  );
  if (!Number.isSafeInteger(monthlyValueCents))
    throw new Error("Recorded monthly value is out of range");
  return { counts: Object.fromEntries(counts) as Record<ClientFilter, number>, monthlyValueCents };
}

export async function loadProjectSummary(client: Client) {
  const statuses = [
    "all",
    "active",
    "discovery",
    "in_progress",
    "review",
    "launched",
    "on_hold",
    "archived",
  ] as const;
  const entries = await Promise.all(
    statuses.map(async (status) => {
      let query = client.from("projects").select("id", { count: "exact", head: true });
      if (status === "active") query = query.in("status", [...activeProjectStages]);
      else if (status !== "all") query = query.eq("status", status);
      return [status, await confirmedCount(query)] as const;
    }),
  );
  return Object.fromEntries(entries) as Record<ProjectFilter, number>;
}

export async function loadNotificationSummary(client: Client) {
  const base = () =>
    client.from("lead_notification_jobs").select("id", { count: "exact", head: true });
  const [total, outstanding, retrying, accepted] = await Promise.all([
    confirmedCount(base()),
    confirmedCount(base().neq("status", "accepted")),
    confirmedCount(base().neq("status", "accepted").gt("attempts", 0)),
    confirmedCount(base().eq("status", "accepted")),
  ]);
  return { total, outstanding, retrying, accepted };
}

export async function loadClientPage(
  client: Client,
  options: { page: number; status: ClientFilter; search: string; signal?: AbortSignal },
) {
  if (!Number.isSafeInteger(options.page) || options.page < 0) throw new Error("Invalid page");
  let query = client.from("clients").select("*", { count: "exact" });
  if (options.status !== "all") query = query.eq("status", options.status);
  if (options.search.trim())
    query = query.or(
      recordSearchFilter(["name", "contact_name", "contact_email", "website"], options.search),
    );
  if (options.signal) query = query.abortSignal(options.signal);
  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .range(options.page * ADMIN_PAGE_SIZE, (options.page + 1) * ADMIN_PAGE_SIZE - 1);
  if (error) throw error;
  if (data === null || count === null) throw new Error("Client results unavailable");
  confirmPageLength(data, count, options.page);
  return { rows: data, total: count };
}

export async function loadProjectPage(
  client: Client,
  options: { page: number; status: ProjectFilter; search?: string; signal?: AbortSignal },
) {
  if (!Number.isSafeInteger(options.page) || options.page < 0) throw new Error("Invalid page");
  let query = client
    .from("projects")
    .select("*, clients(id, name, contact_name, contact_email, website)", { count: "exact" });
  if (options.status === "active") query = query.in("status", [...activeProjectStages]);
  else if (options.status !== "all") query = query.eq("status", options.status);
  if (options.search?.trim())
    query = query.or(recordSearchFilter(["name", "summary"], options.search));
  if (options.signal) query = query.abortSignal(options.signal);
  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .range(options.page * ADMIN_PAGE_SIZE, (options.page + 1) * ADMIN_PAGE_SIZE - 1);
  if (error) throw error;
  if (data === null || count === null) throw new Error("Project results unavailable");
  confirmPageLength(data, count, options.page);
  return { rows: data, total: count };
}
