import test from "node:test";
import assert from "node:assert/strict";
import { requireSuccessfulQueries, requireCompleteRows } from "../src/lib/admin-query-results.ts";

test("every operational source must succeed, including counts and notification jobs", () => {
  for (let failedIndex = 0; failedIndex < 10; failedIndex++) {
    const failure = new Error(`Source ${failedIndex} unavailable`);
    const results = Array.from({ length: 10 }, (_, index) => ({
      error: index === failedIndex ? failure : null,
    }));
    assert.throws(
      () => requireSuccessfulQueries(results),
      (error) => error === failure,
    );
  }
  assert.doesNotThrow(() =>
    requireSuccessfulQueries(Array.from({ length: 10 }, () => ({ error: null }))),
  );
});

test("empty data is valid only when confirmed, and capped data cannot become a total", () => {
  assert.doesNotThrow(() => requireCompleteRows({ data: [], count: 0 }));
  assert.doesNotThrow(() => requireCompleteRows({ data: [{}], count: 1 }));
  for (const result of [
    { data: [{}], count: 2 },
    { data: [], count: null },
    { data: null, count: 0 },
  ]) {
    assert.throws(() => requireCompleteRows(result), /incomplete/);
  }
});
