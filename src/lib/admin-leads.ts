import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../integrations/supabase/types";

export const LEAD_PAGE_SIZE = 25;
export type LeadFilter = "all" | Database["public"]["Enums"]["lead_status"];
const statuses = ["new", "contacted", "qualified", "won", "lost"] as const;

// PostgREST reserved characters must remain inside a quoted filter value.
export function leadSearchFilter(search: string): string {
  // Escaped regex preserves literal '*' rather than PostgREST's LIKE wildcard alias.
  const literal = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = JSON.stringify(literal);
  return ["name", "email", "company", "package"]
    .map((field) => `${field}.imatch.${pattern}`)
    .join(",");
}

export async function loadLeadPage(
  client: SupabaseClient<Database>,
  options: { page: number; status: LeadFilter; search: string; signal?: AbortSignal },
) {
  if (!Number.isSafeInteger(options.page) || options.page < 0) throw new Error("Invalid page");
  if (options.status !== "all" && !statuses.includes(options.status))
    throw new Error("Invalid status");
  let query = client.from("leads").select("*", { count: "exact" });
  if (options.status !== "all") query = query.eq("status", options.status);
  if (options.search.trim()) query = query.or(leadSearchFilter(options.search));
  query = query.order("created_at", { ascending: false }).order("id", { ascending: false });
  if (options.signal) query = query.abortSignal(options.signal);
  const { data, count, error } = await query.range(
    options.page * LEAD_PAGE_SIZE,
    (options.page + 1) * LEAD_PAGE_SIZE - 1,
  );
  if (error) throw error;
  if (count === null || data === null) throw new Error("Enquiry results could not be confirmed");
  return { rows: data, total: count };
}

export async function loadLeadCounts(client: SupabaseClient<Database>) {
  const filters = ["all", ...statuses] as const;
  const values = await Promise.all(
    filters.map(async (status) => {
      let query = client.from("leads").select("id", { count: "exact", head: true });
      if (status !== "all") query = query.eq("status", status);
      const { count, error } = await query;
      if (error) throw error;
      if (count === null) throw new Error("Enquiry totals could not be confirmed");
      return [status, count] as const;
    }),
  );
  return Object.fromEntries(values) as Record<LeadFilter, number>;
}
