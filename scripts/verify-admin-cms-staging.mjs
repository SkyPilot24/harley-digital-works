import assert from "node:assert/strict";
import { withAdminStaging } from "./lib/admin-staging.mjs";

await withAdminStaging(async ({ server, anonymous, marker, withBrowser }) => {
  let fixtureId;
  const title = `CMS acceptance ${marker}`;
  const slug = `cms-acceptance-${marker}`;
  try {
    await withBrowser("/admin/services", async (page, local) => {
      await page.getByRole("heading", { name: "Services (CMS)", exact: true }).waitFor();
      await page.getByRole("button", { name: "New", exact: true }).click();
      await page.getByLabel("Title", { exact: false }).fill(title);
      await page.getByLabel("Slug", { exact: false }).fill(slug);
      await page.getByLabel("Sort order", { exact: true }).fill("7");
      await page.getByRole("button", { name: "Save", exact: true }).click();
      await page.getByText("Saved", { exact: true }).waitFor();
      const stored = await server
        .from("cms_services")
        .select("id,title,sort_order,published")
        .eq("slug", slug);
      assert.ifError(stored.error);
      assert.equal(stored.data.length, 1);
      fixtureId = stored.data[0].id;
      assert.equal(stored.data[0].sort_order, 7);
      assert.equal(stored.data[0].published, false);
      console.log(
        "PASS: real staging CMS create and independent readback; unpublished fixture only",
      );

      const row = page.getByRole("row").filter({ hasText: title.slice(0, 55) });
      await row.getByRole("button", { name: "Edit", exact: true }).click();
      await page.getByLabel("Sort order", { exact: true }).fill("8");
      await page.getByRole("button", { name: "Save", exact: true }).click();
      await page.waitForFunction(() => !document.querySelector('input[name="sort_order"]'));
      const updated = await server
        .from("cms_services")
        .select("sort_order")
        .eq("id", fixtureId)
        .single();
      assert.ifError(updated.error);
      assert.equal(updated.data.sort_order, 8);

      const denied = await anonymous
        .from("cms_services")
        .update({ title: "Forbidden" })
        .eq("id", fixtureId)
        .select("id");
      assert(denied.error || denied.data.length === 0);
      const unchanged = await server
        .from("cms_services")
        .select("title")
        .eq("id", fixtureId)
        .single();
      assert.ifError(unchanged.error);
      assert.equal(unchanged.data.title, title);
      console.log("PASS: staging edit/readback and anonymous mutation denial");

      const cmsPattern = /\/rest\/v1\/cms_services(?:\?|$)/;
      await page.route(cmsPattern, (route) =>
        route.fulfill({
          status: 503,
          contentType: "application/json",
          body: '{"message":"Synthetic outage"}',
        }),
      );
      await page.reload();
      await page
        .getByText("Records could not be loaded.", { exact: false })
        .waitFor({ timeout: 45000 });
      await page.unroute(cmsPattern);
      await page.getByRole("button", { name: "Try again", exact: true }).click();
      await page
        .getByRole("row")
        .filter({ hasText: title.slice(0, 55) })
        .waitFor();
      console.log("PASS: CMS read outage is visible and retry restores real staging rows");

      await page.setViewportSize({ width: 375, height: 900 });
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
      );
      page.once("dialog", (dialog) => dialog.accept());
      await page
        .getByRole("row")
        .filter({ hasText: title.slice(0, 55) })
        .getByRole("button", { name: "Delete", exact: true })
        .click();
      await page.getByText("Deleted", { exact: true }).waitFor();
      const removed = await server.from("cms_services").select("id").eq("id", fixtureId);
      assert.ifError(removed.error);
      assert.equal(removed.data.length, 0);
      console.log("PASS: mobile table and real staging delete independently verified");

      const settingsPattern = /\/rest\/v1\/agency_settings(?:\?|$)/;
      await page.route(settingsPattern, (route) =>
        route.fulfill({
          status: 503,
          contentType: "application/json",
          body: '{"message":"Synthetic outage"}',
        }),
      );
      await page.goto(local + "/admin/settings");
      await page
        .getByRole("alert")
        .filter({ hasText: "Settings are unavailable" })
        .waitFor({ timeout: 45000 });
      assert.equal(
        await page.getByRole("button", { name: "Save changes", exact: true }).count(),
        0,
      );
      await page.unroute(settingsPattern);
      console.log(
        "PASS: settings read failure cannot become a blank writable form; no settings mutation",
      );
    });
  } finally {
    // Exact run-owned slug only, including recovery when browser acknowledgement was lost.
    const cleanup = await server.from("cms_services").delete().eq("slug", slug);
    assert.ifError(cleanup.error);
    const remaining = await server.from("cms_services").select("id").eq("slug", slug);
    assert.ifError(remaining.error);
    assert.equal(remaining.data.length, 0);
    console.log("PASS: exact synthetic CMS fixture cleanup verified");
  }
});
