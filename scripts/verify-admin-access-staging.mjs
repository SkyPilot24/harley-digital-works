import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { withAdminStaging } from "./lib/admin-staging.mjs";

function denied(result) {
  if (result.error) assert.equal(result.error.code, "42501");
  else assert.equal(result.data.length, 0);
}
await withAdminStaging(async ({ server, owner, anonymous, marker, withBrowser }) => {
  const leadId = randomUUID();
  const leadName = `Private access fixture ${marker}`;
  const ownerResult = await owner.auth.getUser();
  assert.ifError(ownerResult.error);
  const ownerId = ownerResult.data.user.id;
  let plainId;
  try {
    assert.ifError(
      (
        await owner.from("leads").insert({
          id: leadId,
          name: leadName,
          email: `${marker}@example.invalid`,
          message: "Fictional access acceptance only",
          source: "admin_manual",
          status: "new",
        })
      ).error,
    );
    denied(await anonymous.from("leads").select("id").eq("id", leadId));
    const plainEmail = `${marker}-ordinary@example.invalid`;
    const password = randomBytes(32).toString("base64url");
    const created = await server.auth.admin.createUser({
      email: plainEmail,
      password,
      email_confirm: true,
      user_metadata: { role: "admin" },
    });
    assert.ifError(created.error);
    plainId = created.data.user.id;
    assert.ifError(
      (await anonymous.auth.signInWithPassword({ email: plainEmail, password })).error,
    );
    const roles = await server.from("user_roles").select("role").eq("user_id", plainId);
    assert.ifError(roles.error);
    assert.equal(roles.data.length, 0, "Signup metadata must not grant a role");
    denied(await anonymous.from("leads").select("id").eq("id", leadId));
    assert(
      (await anonymous.from("user_roles").insert({ user_id: plainId, role: "admin" })).error,
      "Self-promotion must fail",
    );
    console.log(
      "PASS: real admin read/write, anonymous/ordinary denial and metadata/self-promotion rejection",
    );

    if (process.env.ADMIN_ACCEPTANCE_PLAYWRIGHT)
      await withBrowser("/admin/leads", async (page, local) => {
        await page.getByLabel("Search enquiries").fill(leadName);
        await page.getByText(leadName, { exact: true }).waitFor();
        // Leave the warmed role/private query cache mounted in the same application.
        await page.locator('aside a[href="/"]').click();
        const rolePattern = /\/rest\/v1\/user_roles(?:\?|$)/;
        let roleFailures = 0;
        await page.route(rolePattern, (route) => {
          roleFailures++;
          return route.fulfill({
            status: 503,
            contentType: "application/json",
            body: JSON.stringify({ message: "Synthetic role outage" }),
          });
        });
        await page.locator('a[href="/admin"]').first().click();
        await page
          .getByRole("heading", { name: "Permissions could not be checked", exact: true })
          .waitFor({ timeout: 45000 });
        assert(roleFailures > 0);
        assert.equal(await page.getByText(leadName, { exact: true }).count(), 0);
        assert.equal(
          await page.getByRole("heading", { name: "Access denied", exact: true }).count(),
          0,
        );
        await page.unroute(rolePattern);
        await page.getByRole("button", { name: "Retry permissions", exact: true }).click();
        await page.getByRole("heading", { name: "Control Centre", exact: true }).waitFor();
        console.log(
          "PASS: cached-role outage hides private content, reports uncertainty and recovers through retry",
        );

        assert.ifError(
          (await server.from("user_roles").delete().eq("user_id", ownerId).eq("role", "admin"))
            .error,
        );
        denied(await owner.from("leads").select("id").eq("id", leadId));
        await page.reload();
        await page.getByRole("heading", { name: "Access denied", exact: true }).waitFor();
        assert.equal(await page.getByText(leadName, { exact: true }).count(), 0);
        assert.ifError(
          (await server.from("user_roles").insert({ user_id: ownerId, role: "admin" })).error,
        );
        await page.reload();
        await page.getByRole("heading", { name: "Control Centre", exact: true }).waitFor();
        console.log(
          "PASS: revoking only the temporary administrator denies real Data API access and browser access; restoring it recovers",
        );

        const logoutPattern = /\/auth\/v1\/logout(?:\?|$)/;
        await page.route(logoutPattern, (route) =>
          route.fulfill({
            status: 503,
            contentType: "application/json",
            body: JSON.stringify({ message: "Synthetic sign-out outage" }),
          }),
        );
        await page.locator("aside").getByRole("button", { name: "Sign out", exact: true }).click();
        await page
          .getByRole("heading", { name: "Sign-out could not be confirmed", exact: true })
          .waitFor({ timeout: 45000 });
        assert.equal(await page.getByText(leadName, { exact: true }).count(), 0);
        await page.unroute(logoutPattern);
        await page.getByRole("button", { name: "Retry sign-out", exact: true }).click();
        await page.getByRole("heading", { name: "Sign in", exact: true }).waitFor();
        await page.goto(local + "/admin/leads");
        await page.waitForURL((url) => url.pathname === "/auth");
        assert.equal(new URL(page.url()).searchParams.get("redirect"), "/admin/leads");
        assert.equal(await page.getByText(leadName, { exact: true }).count(), 0);
        console.log(
          "PASS: sign-out failure is visible with private data hidden; retry signs out and protected deep links retain their destination",
        );
      });
  } finally {
    assert.ifError((await server.from("leads").delete().eq("id", leadId)).error);
    const remaining = await server.from("leads").select("id").eq("id", leadId);
    assert.ifError(remaining.error);
    assert.equal(remaining.data.length, 0);
    if (plainId) {
      assert.ifError((await server.auth.admin.deleteUser(plainId)).error);
      assert.equal((await server.auth.admin.getUserById(plainId)).error?.status, 404);
      const roles = await server.from("user_roles").select("user_id").eq("user_id", plainId);
      assert.ifError(roles.error);
      assert.equal(roles.data.length, 0);
    }
    console.log("PASS: exact access fixture and ordinary test account removed");
  }
});
