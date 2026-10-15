const MAX_PAGES = 1000;

type PageResult<T> = {
  items: T[];
  nextPage: number | null;
  error: { message: string } | null;
};

/** Reads every page of an Auth-style listing, following the server's next-page pointer. */
export async function loadAllPages<T>(fetchPage: (page: number) => Promise<PageResult<T>>) {
  const all: T[] = [];
  let page = 1;
  for (let i = 0; i < MAX_PAGES; i++) {
    const result = await fetchPage(page);
    if (result.error) throw new Error(result.error.message);
    all.push(...result.items);
    if (result.items.length === 0 || result.nextPage === null || result.nextPage <= page) {
      return all;
    }
    page = result.nextPage;
  }
  throw new Error("User listing exceeded the page safety limit.");
}

type RangeResult<T> = {
  data: T[] | null;
  count: number | null;
  error: { message: string } | null;
};

/** Reads a table in ranges until the exact count is reached, so row caps cannot truncate it. */
export async function loadAllRanges<T>(
  fetchRange: (from: number, to: number) => Promise<RangeResult<T>>,
  pageSize = 1000,
) {
  const all: T[] = [];
  for (let i = 0; i < MAX_PAGES; i++) {
    const from = all.length;
    const { data, count, error } = await fetchRange(from, from + pageSize - 1);
    if (error) throw new Error(error.message);
    if (count === null) throw new Error("Role listing did not return an exact count.");
    const rows = data ?? [];
    all.push(...rows);
    if (all.length >= count) return all;
    if (rows.length === 0) throw new Error("Role listing ended before the reported count.");
  }
  throw new Error("Role listing exceeded the page safety limit.");
}

/** True when revoking this admin role would leave no administrator. */
export function wouldRemoveLastAdmin(role: string, adminCount: number) {
  return role === "admin" && adminCount <= 1;
}

export class RoleChangeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RoleChangeError";
  }
}

type DbError = { code?: string; message?: string } | null;
// Minimal structural view of the service-role client so the logic can be tested with a fake.
export type RoleDb = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from: (table: string) => any;
  auth: {
    admin: {
      getUserById: (id: string) => Promise<{ data: { user: unknown } | null; error: DbError }>;
    };
  };
};

/** Maps a failure to non-sensitive text; raw database messages are never returned. */
export function roleErrorMessage(error: unknown, fallback: string) {
  if (error instanceof RoleChangeError) return error.message;
  return fallback;
}

export async function grantRole(db: RoleDb, userId: string, role: "admin" | "user") {
  const found = await db.auth.admin.getUserById(userId);
  if (found.error || !found.data?.user) throw new RoleChangeError("That user does not exist.");
  const { error } = (await db.from("user_roles").insert({ user_id: userId, role })) as {
    error: DbError;
  };
  if (error && error.code !== "23505") throw new RoleChangeError("The role could not be granted.");
}

export async function revokeRole(db: RoleDb, userId: string, role: "admin" | "user") {
  if (role === "admin") {
    const { data, error } = (await db.from("user_roles").select("user_id").eq("role", "admin")) as {
      data: { user_id: string }[] | null;
      error: DbError;
    };
    if (error || !data) throw new RoleChangeError("Could not confirm the administrator count.");
    if (!data.some((r) => r.user_id === userId))
      throw new RoleChangeError("That user does not hold this role.");
    if (wouldRemoveLastAdmin(role, data.length))
      throw new RoleChangeError("This is the last admin — grant admin to another user first.");
  }
  const { data, error } = (await db
    .from("user_roles")
    .delete()
    .eq("user_id", userId)
    .eq("role", role)
    .select("user_id")) as { data: unknown[] | null; error: DbError };
  if (error) throw new RoleChangeError("The role could not be revoked.");
  if (!data || data.length === 0) throw new RoleChangeError("That user does not hold this role.");
}
