import test from "node:test";
import assert from "node:assert/strict";
import { loadAllPages, loadAllRanges, wouldRemoveLastAdmin } from "../src/lib/admin-users.ts";

const users = Array.from({ length: 451 }, (_, i) => ({ id: `u${i}` }));

test("user listing follows next-page pointers beyond the first 200", async () => {
  const result = await loadAllPages(async (page) => {
    const items = users.slice((page - 1) * 200, page * 200);
    return { items, nextPage: page * 200 < users.length ? page + 1 : null, error: null };
  });
  assert.equal(result.length, 451);
});

test("user listing surfaces provider errors and stalled pointers", async () => {
  await assert.rejects(
    loadAllPages(async () => ({ items: [], nextPage: null, error: { message: "boom" } })),
    /boom/,
  );
  const stalled = await loadAllPages(async (page) => ({
    items: [{ id: "x" }],
    nextPage: page,
    error: null,
  }));
  assert.equal(stalled.length, 1);
});

test("role reads survive a server cap below the page size", async () => {
  const roles = Array.from({ length: 2300 }, (_, i) => ({ user_id: `r${i}`, role: "user" }));
  let calls = 0;
  const result = await loadAllRanges(async (from) => {
    calls++;
    return { data: roles.slice(from, from + 1000), count: roles.length, error: null };
  });
  assert.equal(result.length, 2300);
  assert.equal(calls, 3);
});

test("role reads fail closed on errors, missing count and early end", async () => {
  await assert.rejects(
    loadAllRanges(async () => ({ data: null, count: null, error: { message: "denied" } })),
    /denied/,
  );
  await assert.rejects(
    loadAllRanges(async () => ({ data: [], count: null, error: null })),
    /exact count/,
  );
  await assert.rejects(
    loadAllRanges(async () => ({ data: [], count: 5, error: null })),
    /before the reported count/,
  );
});

test("last administrator cannot be revoked", () => {
  assert.equal(wouldRemoveLastAdmin("admin", 1), true);
  assert.equal(wouldRemoveLastAdmin("admin", 0), true);
  assert.equal(wouldRemoveLastAdmin("admin", 2), false);
  assert.equal(wouldRemoveLastAdmin("user", 1), false);
});
