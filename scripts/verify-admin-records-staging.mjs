import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { withAdminStaging } from "./lib/admin-staging.mjs";
import {
  loadClientPage,
  loadClientSummary,
  loadProjectPage,
  loadProjectSummary,
  loadCompleteRecords,
  loadNotificationSummary,
} from "../src/lib/admin-records.ts";

await withAdminStaging(async ({ server, owner, anonymous, marker, withBrowser }) => {
  const clientIds = Array.from({ length: 56 }, () => randomUUID());
  const projectIds = Array.from({ length: 56 }, () => randomUUID());
  const beforeClients = await loadClientSummary(owner);
  const beforeProjects = await loadProjectSummary(owner);
  try {
    assert.ifError(
      (
        await owner.from("clients").insert(
          clientIds.map((id, index) => ({
            id,
            name:
              index === 55
                ? `${marker} O'Brien, (test).* client55`
                : `${marker} client${String(index).padStart(2, "0")}`,
            status: index === 55 ? "active" : "lead",
            monthly_value_cents: index === 55 ? 24901 : 999999,
            contact_email: `${marker}@example.invalid`,
            created_at: "2026-01-01T00:00:00Z",
          })),
        )
      ).error,
    );
    assert.ifError(
      (
        await owner.from("projects").insert(
          projectIds.map((id, index) => ({
            id,
            name: `${marker} project${String(index).padStart(2, "0")}`,
            client_id: index === 55 ? clientIds[55] : clientIds[0],
            status: index === 55 ? "on_hold" : "discovery",
            summary: "Fictional staging acceptance only",
            created_at: "2026-01-01T00:00:00Z",
            target_date: null,
          })),
        )
      ).error,
    );
    const clients = await loadClientSummary(owner);
    assert.equal(clients.counts.all, beforeClients.counts.all + 56);
    assert.equal(clients.counts.active, beforeClients.counts.active + 1);
    assert.equal(clients.monthlyValueCents, beforeClients.monthlyValueCents + 24901);
    const projects = await loadProjectSummary(owner);
    assert.equal(projects.all, beforeProjects.all + 56);
    assert.equal(projects.active, beforeProjects.active + 55);
    for (const [load, ids] of [
      [loadClientPage, clientIds],
      [loadProjectPage, projectIds],
    ]) {
      const found = [];
      for (let page = 0; page < 3; page++) {
        const result = await load(owner, { page, status: "all", search: marker });
        assert.equal(result.total, 56);
        assert.equal(result.rows.length, page === 2 ? 6 : 25);
        found.push(...result.rows.map((row) => row.id));
      }
      assert.deepEqual(found.sort(), [...ids].sort());
    }
    assert.equal(
      (
        await loadClientPage(owner, {
          page: 0,
          status: "active",
          search: "O'Brien, (test).* client55",
        })
      ).rows[0].id,
      clientIds[55],
    );
    const linked = await loadCompleteRecords((after) => {
      let query = owner
        .from("projects")
        .select("id", { count: "exact" })
        .eq("client_id", clientIds[0])
        .order("id")
        .limit(7);
      if (after) query = query.gt("id", after);
      return query;
    });
    assert.equal(linked.length, 55);
    await loadNotificationSummary(owner);
    for (const load of [loadClientPage, loadProjectPage]) {
      try {
        assert.equal((await load(anonymous, { page: 0, status: "all", search: marker })).total, 0);
      } catch (error) {
        assert.equal(error.code, "42501");
      }
    }
    console.log(
      "PASS: real staging client/project paging, full counts, pence accuracy, punctuation search, linked records and anonymous denial",
    );
    if (process.env.ADMIN_ACCEPTANCE_PLAYWRIGHT)
      await withBrowser("/admin/clients", async (page, local) => {
        await page.getByRole("heading", { name: "Client 360 & Accounts" }).waitFor();
        await page.getByLabel("Search clients").fill(marker);
        await page.getByRole("status").filter({ hasText: "56 matching clients" }).waitFor();
        for (let number = 2; number <= 3; number++) {
          await page
            .getByRole("navigation", { name: "clients pages" })
            .getByRole("button", { name: "Next", exact: true })
            .click();
          await page
            .getByRole("status")
            .filter({ hasText: `Page ${number}` })
            .waitFor();
        }
        assert.equal(await page.locator("tbody tr").count(), 6);
        await page.getByLabel("Search clients").fill(`${marker} client00`);
        await page.getByRole("status").filter({ hasText: "1 matching clients · Page 1" }).waitFor();
        await page.locator("tbody tr").first().click();
        await page.getByText("Deliverables & Projects (55)", { exact: true }).waitFor();
        await page.getByRole("button", { name: "Close client workspace", exact: true }).click();
        await page.getByLabel("Search clients").fill(`${marker} O'Brien, (test).* client55`);
        await page.getByRole("status").filter({ hasText: "1 matching clients · Page 1" }).waitFor();
        await page.locator("tbody tr").first().click();
        await page.getByRole("button", { name: "Record agreed £149/mo", exact: true }).click();
        await page
          .locator("span.text-2xl.font-bold.text-emerald-950")
          .filter({ hasText: /^£149$/ })
          .waitFor();
        const saved = await owner
          .from("clients")
          .select("monthly_value_cents")
          .eq("id", clientIds[55])
          .single();
        assert.ifError(saved.error);
        assert.equal(saved.data.monthly_value_cents, 14900);
        assert.equal(
          (await loadClientSummary(owner)).monthlyValueCents,
          beforeClients.monthlyValueCents + 14900,
        );
        await page.getByRole("button", { name: "Close client workspace", exact: true }).click();
        await page.setViewportSize({ width: 375, height: 812 });
        assert(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
          "Client view overflows mobile",
        );
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page
          .locator("aside")
          .getByRole("link", { name: "Projects & Delivery", exact: true })
          .click();
        await page.getByLabel("Search projects").fill(marker);
        await page.getByRole("status").filter({ hasText: "56 matching projects" }).waitFor();
        await page
          .getByRole("navigation", { name: "projects pages" })
          .getByRole("button", { name: "Next", exact: true })
          .click();
        await page.getByRole("status").filter({ hasText: "Page 2" }).waitFor();
        await page.getByRole("button", { name: "On hold", exact: true }).click();
        await page
          .getByRole("status")
          .filter({ hasText: "1 matching projects · Page 1" })
          .waitFor();
        await page.setViewportSize({ width: 375, height: 812 });
        assert(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
          "Project view overflows mobile",
        );
        await page.setViewportSize({ width: 1440, height: 1000 });
        let outageCount = 0;
        const pattern = /\/rest\/v1\/projects(?:\?|$)/;
        await page.route(pattern, (route) => {
          outageCount++;
          return route.fulfill({
            status: 503,
            contentType: "application/json",
            body: JSON.stringify({ message: "Synthetic staging outage" }),
          });
        });
        await page.getByRole("button", { name: "Archived", exact: true }).click();
        await page
          .getByRole("button", { name: "Retry projects", exact: true })
          .waitFor({ timeout: 45000 });
        assert(outageCount > 0);
        assert.equal(
          await page.getByRole("heading", { name: "No projects match this filter" }).count(),
          0,
        );
        await page.unroute(pattern);
        await page.getByRole("button", { name: "Retry projects", exact: true }).click();
        await page.getByRole("status").filter({ hasText: "0 matching projects" }).waitFor();
        await page.getByRole("button", { name: "Start New Build", exact: true }).click();
        assert.equal(await page.getByLabel("Client Account", { exact: true }).inputValue(), "");
        assert.equal(await page.getByLabel("Agreed target date (optional)").inputValue(), "");
        await page.getByRole("button", { name: "Close new project", exact: true }).click();
        await page
          .locator("aside")
          .getByRole("link", { name: "Control Centre", exact: true })
          .click();
        await page.getByText("Recorded care value", { exact: true }).waitFor();
        console.log(
          "PASS: browser client/project paging, linked 55-project workspace, filter reset, mobile layout and project failure/retry",
        );
      });
  } finally {
    assert.ifError((await server.from("projects").delete().in("id", projectIds)).error);
    assert.ifError((await server.from("clients").delete().in("id", clientIds)).error);
    for (const [table, ids] of [
      ["projects", projectIds],
      ["clients", clientIds],
    ]) {
      const remaining = await server
        .from(table)
        .select("id", { count: "exact", head: true })
        .in("id", ids);
      assert.ifError(remaining.error);
      assert.equal(remaining.count, 0);
    }
    const afterClients = await loadClientSummary(owner);
    const afterProjects = await loadProjectSummary(owner);
    assert.deepEqual(afterClients, beforeClients);
    assert.deepEqual(afterProjects, beforeProjects);
    console.log(
      "PASS: exact fictional records removed and original client/project totals independently restored",
    );
  }
});
