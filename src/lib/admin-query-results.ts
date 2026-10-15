type QueryResult = { error: unknown };

/** Never turn an unsuccessful operational query into a healthy zero. */
export function requireSuccessfulQueries(results: QueryResult[]): void {
  for (const result of results) {
    if (result.error) throw result.error;
  }
}

/** Aggregating a capped response would understate business totals. */
export function requireCompleteRows(result: {
  data: unknown[] | null;
  count: number | null;
}): void {
  if (result.count === null || result.data === null || result.count !== result.data.length) {
    throw new Error(
      "Complete business totals are unavailable. The returned records are incomplete.",
    );
  }
}
