import test from "node:test";
import assert from "node:assert/strict";
import { createClient } from "@supabase/supabase-js";
import {
  loadCompleteRecords,
  loadClientSummary,
  loadNotificationSummary,
  loadClientPage,
  loadProjectPage,
  loadProjectSummary,
} from "../src/lib/admin-records.ts";

const rows = Array.from({ length: 1205 }, (_, index) => ({
  id: String(index + 1).padStart(6, "0"),
  monthly_value_cents: 24901,
}));
test("complete reads survive server caps below the requested page size and beyond 1000 records", async () => {
  let calls = 0;
  const result = await loadCompleteRecords(async (after) => {
    calls++;
    const remaining = rows.filter((row) => !after || row.id > after);
    return { data: remaining.slice(0, 37), count: remaining.length, error: null };
  });
  assert.equal(calls, 33);
  assert.deepEqual(result, rows);
});
test("changed totals, capped empty responses, missing counts and non-advancing cursors fail visibly", async () => {
  for (const bad of [
    { data: [], count: 1, error: null },
    { data: [], count: null, error: null },
    { data: [{ id: "a" }, { id: "a" }], count: 2, error: null },
  ])
    await assert.rejects(loadCompleteRecords(async () => bad));
  let calls = 0;
  await assert.rejects(
    loadCompleteRecords(async () =>
      ++calls === 1
        ? { data: [{ id: "a" }], count: 2, error: null }
        : { data: [{ id: "b" }], count: 2, error: null },
    ),
    /changed/,
  );
  const failure = new Error("Unavailable");
  await assert.rejects(
    loadCompleteRecords(async () => ({ data: null, count: null, error: failure })),
    (error) => error === failure,
  );
});
function fixture(respond) {
  return createClient("https://fixture.invalid", "test-key", {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: async (url, init) => respond(new URL(url), init) },
  });
}
test("monthly values retain pence and cover every active client despite capped responses", async () => {
  const client = fixture((url, init) => {
    if (init.method === "HEAD") {
      const status = url.searchParams.get("status");
      return new Response(null, {
        headers: { "content-range": `*/${!status || status === "eq.active" ? rows.length : 0}` },
      });
    }
    assert.equal(url.searchParams.get("status"), "eq.active");
    const after = url.searchParams.get("id")?.slice(3);
    const remaining = rows.filter((row) => !after || row.id > after);
    const page = remaining.slice(0, 37);
    return new Response(JSON.stringify(page), {
      headers: {
        "content-type": "application/json",
        "content-range": `0-${page.length - 1}/${remaining.length}`,
      },
    });
  });
  const summary = await loadClientSummary(client);
  assert.equal(summary.counts.active, 1205);
  assert.equal(summary.monthlyValueCents, 1205 * 24901);
});
test("notification summary uses exact head queries and never downloads a capped job list", async () => {
  const client = fixture((url, init) => {
    assert.equal(init.method, "HEAD");
    const count = url.searchParams.has("attempts")
      ? 17
      : url.searchParams.get("status") === "eq.accepted"
        ? 1200
        : url.searchParams.get("status") === "neq.accepted"
          ? 25
          : 1225;
    return new Response(null, { headers: { "content-range": `*/${count}` } });
  });
  assert.deepEqual(await loadNotificationSummary(client), {
    total: 1225,
    outstanding: 25,
    retrying: 17,
    accepted: 1200,
  });
});
test("client/project pages apply server filters and deterministic paging", async () => {
  const client = fixture((url) => {
    assert.equal(url.searchParams.get("offset"), "25");
    assert.equal(url.searchParams.get("limit"), "25");
    assert.equal(url.searchParams.get("order"), "created_at.desc,id.desc");
    if (url.pathname.endsWith("clients")) {
      assert.equal(url.searchParams.get("status"), "eq.paused");
      assert.match(url.searchParams.get("or"), /contact_email.imatch/);
    } else assert.equal(url.searchParams.get("status"), "in.(discovery,in_progress,review)");
    return new Response("[]", {
      headers: { "content-type": "application/json", "content-range": "*/25" },
    });
  });
  await loadClientPage(client, { page: 1, status: "paused", search: "O'Brien, Ltd" });
  await loadProjectPage(client, { page: 1, status: "active" });
});

test("summary request failures are never converted into healthy zero counts", async () => {
  const denied = fixture(
    () =>
      new Response(JSON.stringify({ code: "42501", message: "Permission denied" }), {
        status: 403,
        headers: { "content-type": "application/json" },
      }),
  );
  for (const load of [loadClientSummary, loadProjectSummary, loadNotificationSummary]) {
    await assert.rejects(load(denied));
  }
});
