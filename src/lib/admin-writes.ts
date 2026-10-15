import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../integrations/supabase/types";
import { AdminValidationError, parseUuid } from "./admin-validation.ts";

type Tables = Database["public"]["Tables"];
export type AdminTable = "leads" | "clients" | "projects";
export type RecordKind = "lead" | "client" | "project";

type ErrorLike = { code?: unknown; message?: unknown; status?: unknown };

/** Converts any failure into text that is safe to show; raw database detail is never exposed. */
export function adminErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AdminValidationError) return error.message;
  const e = (typeof error === "object" && error !== null ? error : {}) as ErrorLike;
  const code = typeof e.code === "string" ? e.code : "";
  const message = typeof e.message === "string" ? e.message : "";
  if (error instanceof Error && error.name === "AdminWriteError") return error.message;
  if (code === "42501" || e.status === 403 || e.status === 401)
    return "You do not have permission to make this change.";
  if (/^PGRST30[0-9]$/.test(code) || /jwt|not authenticated/i.test(message))
    return "Your session has expired. Sign in again and retry.";
  if (code === "23505") return "A matching record already exists.";
  if (code === "23503") return "A linked record is missing or still in use.";
  if (code === "23502") return "A required value is missing.";
  if (code === "23514" || /^22/.test(code)) return "A value was rejected as invalid.";
  if (code === "P0001" && /^Launch requires /.test(message)) return message;
  if (code === "P0001" && /^This is the last admin/.test(message)) return message;
  return `${fallback} Nothing was confirmed as saved; refresh and try again.`;
}

export class AdminWriteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AdminWriteError";
  }
}

/** Throws unless the write returned exactly the row that was targeted. */
export function requireRows<T>(
  result: { data: T[] | T | null; error: unknown },
  expected: number,
  fallback: string,
): T[] {
  if (result.error) throw new AdminWriteError(adminErrorMessage(result.error, fallback));
  const rows = result.data === null ? [] : Array.isArray(result.data) ? result.data : [result.data];
  if (rows.length === 0)
    throw new AdminWriteError(
      "No record was changed. It may have been removed, or you may not have permission.",
    );
  if (rows.length !== expected)
    throw new AdminWriteError("The change affected an unexpected number of records. Refresh.");
  return rows;
}

type AnyClient = SupabaseClient<Database>;
// Table-generic query building is not expressible in the generated types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const table = (client: AnyClient, name: AdminTable): any => client.from(name);

export async function insertRecord<K extends AdminTable>(
  client: AnyClient,
  name: K,
  values: Tables[K]["Insert"],
): Promise<Tables[K]["Row"]> {
  const result = await table(client, name).insert(values).select("*");
  return requireRows<Tables[K]["Row"]>(result, 1, "The record could not be created.")[0];
}

export async function updateRecord<K extends AdminTable>(
  client: AnyClient,
  name: K,
  id: string,
  values: Tables[K]["Update"],
): Promise<Tables[K]["Row"]> {
  const safeId = parseUuid(id, "Record");
  const result = await table(client, name).update(values).eq("id", safeId).select("*");
  return requireRows<Tables[K]["Row"]>(result, 1, "The record could not be updated.")[0];
}

export async function deleteRecord(client: AnyClient, name: AdminTable, id: string) {
  const safeId = parseUuid(id, "Record");
  const result = await table(client, name).delete().eq("id", safeId).select("id");
  requireRows<{ id: string }>(result, 1, "The record could not be deleted.");
}

const families: Record<RecordKind, string[]> = {
  lead: ["leads", "lead-notification", "admin"],
  client: ["clients", "projects", "leads", "admin"],
  project: ["projects", "clients", "admin"],
};

/** Every cached view that can display a record of this kind must be refetched after a mutation. */
export function invalidateAdminData(
  qc: { invalidateQueries: (filters: { queryKey: string[] }) => unknown },
  kind: RecordKind,
) {
  for (const key of families[kind]) qc.invalidateQueries({ queryKey: [key] });
}
