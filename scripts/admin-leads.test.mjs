import test from "node:test";
import assert from "node:assert/strict";
import { createClient } from "@supabase/supabase-js";
import { loadLeadPage, loadLeadCounts, leadSearchFilter } from "../src/lib/admin-leads.ts";

function fixture(respond) {
  return createClient("https://fixture.invalid", "test-key", {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: async (url, init) => respond(new URL(url), init) },
  });
}
test("page requests apply status, stable order, offset and exact count on the server", async () => {
  const client = fixture((url, init) => {
    assert.equal(url.searchParams.get("offset"), "50");
    assert.equal(url.searchParams.get("limit"), "25");
    assert.equal(url.searchParams.get("status"), "eq.contacted");
    assert.equal(url.searchParams.get("order"), "created_at.desc,id.desc");
    assert.equal(new Headers(init.headers).get("prefer"), "count=exact");
    return new Response(JSON.stringify([{ id: "record-beyond-first-page" }]), {
      headers: { "content-range": "50-50/51", "content-type": "application/json" },
    });
  });
  const page = await loadLeadPage(client, { page: 2, status: "contacted", search: "" });
  assert.equal(page.total, 51);
  assert.equal(page.rows[0].id, "record-beyond-first-page");
});
test("reserved characters remain quoted inside all search values", () => {
  const search = 'O\'Brien, (test)."quote"\\100%_';
  const pattern = JSON.stringify(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  assert.equal(
    leadSearchFilter(search),
    ["name", "email", "company", "package"].map((field) => `${field}.imatch.${pattern}`).join(","),
  );
});
test("missing totals and API errors never appear as empty results", async () => {
  const missing = fixture(
    () => new Response("[]", { headers: { "content-type": "application/json" } }),
  );
  await assert.rejects(
    loadLeadPage(missing, { page: 0, status: "all", search: "" }),
    /could not be confirmed/,
  );
  await assert.rejects(loadLeadCounts(missing), /could not be confirmed/);
  await assert.rejects(
    loadLeadPage(missing, { page: -1, status: "all", search: "" }),
    /Invalid page/,
  );
  const denied = fixture(
    () =>
      new Response(JSON.stringify({ message: "Access denied", code: "42501" }), {
        status: 403,
        headers: { "content-type": "application/json" },
      }),
  );
  await assert.rejects(loadLeadPage(denied, { page: 0, status: "all", search: "" }), {
    message: "Access denied",
  });
});
test("totals use exact head queries for every status, including contacted", async () => {
  const seen = [];
  const client = fixture((url, init) => {
    assert.equal(init.method, "HEAD");
    const status = url.searchParams.get("status") ?? "all";
    seen.push(status);
    return new Response(null, { headers: { "content-range": "*/1205" } });
  });
  const counts = await loadLeadCounts(client);
  assert.equal(counts.all, 1205);
  assert.equal(counts.contacted, 1205);
  assert.equal(seen.length, 6);
});
