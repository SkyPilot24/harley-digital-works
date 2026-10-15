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
