// Explicit staging-only acceptance. Never reads production credentials or sends messages.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parseEnv } from "node:util";
import { randomBytes, randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import { loadLeadPage, loadLeadCounts } from "../src/lib/admin-leads.ts";

assert(process.env.ADMIN_ACCEPTANCE_CONFIG, "Explicit staging configuration path required");
const config = parseEnv(await readFile(process.env.ADMIN_ACCEPTANCE_CONFIG, "utf8"));
const url = "https://mfpnfxpgkfuqtedbcxvp.supabase.co";
assert.equal(config.SUPABASE_URL, url);
assert.equal(config.VITE_SUPABASE_URL, url);
assert.equal(config.LEAD_NOTIFICATIONS_ENABLED, "false");
assert.equal(config.TRANSACTIONAL_EMAIL_ENABLED, "false");
const key = config.VITE_SUPABASE_PUBLISHABLE_KEY || config.SUPABASE_PUBLISHABLE_KEY;
assert(key && config.SUPABASE_SERVICE_ROLE_KEY, "Staging credentials required");
function client(key) {
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("authorization") === `Bearer ${key}`)
          headers.delete("authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}
const server = client(config.SUPABASE_SERVICE_ROLE_KEY);
const owner = client(key);
const marker = `admin-page-${randomUUID()}`;
const ids = Array.from({ length: 56 }, () => randomUUID());
let userId;
try {
  const password = randomBytes(32).toString("base64url");
  const email = `${marker}@example.invalid`;
  const created = await server.auth.admin.createUser({ email, password, email_confirm: true });
  assert.ifError(created.error);
  userId = created.data.user.id;
  assert.ifError(
    (await server.from("user_roles").insert({ user_id: userId, role: "admin" })).error,
  );
  assert.ifError((await owner.auth.signInWithPassword({ email, password })).error);
  const before = await loadLeadCounts(owner);
  const rows = ids.map((id, index) => ({
    id,
    name: `${marker} ${index.toString().padStart(2, "0")}`,
    email,
    message: "Fictional paging acceptance only",
    source: "admin_manual",
    status: index === 55 ? "contacted" : "new",
    company:
      index === 55 ? `${marker} O'Brien, (test)."quoted" 100%_back\\slash literal*star` : marker,
    created_at: "2026-01-01T00:00:00Z",
  }));
  assert.ifError((await server.from("leads").insert(rows)).error);
  const counts = await loadLeadCounts(owner);
  assert.equal(counts.all, before.all + 56);
  assert.equal(counts.contacted, before.contacted + 1);
  const seen = [];
  for (let page = 0; page < 3; page++) {
    const result = await loadLeadPage(owner, { page, status: "all", search: marker });
    assert.equal(result.total, 56);
    assert.equal(result.rows.length, page === 2 ? 6 : 25);
    seen.push(...result.rows.map((row) => row.id));
  }
  assert.equal(new Set(seen).size, 56);
  assert.deepEqual([...seen].sort(), [...ids].sort());
  const contacted = await loadLeadPage(owner, { page: 0, status: "contacted", search: marker });
  assert.equal(contacted.total, 1);
  assert.equal(contacted.rows[0].id, ids[55]);
  for (const search of [
    rows[55].company,
    "O'Brien, (test).",
    '"quoted"',
    "100%_back\\slash",
    "literal*star",
  ]) {
    const result = await loadLeadPage(owner, { page: 0, status: "all", search });
    assert(
      result.rows.some((row) => row.id === ids[55]),
      "Literal punctuation search failed",
    );
  }
  const saved = await owner
    .from("leads")
    .update({ status: "qualified" })
    .eq("id", ids[55])
    .select("id")
    .single();
  assert.ifError(saved.error);
  const readback = await loadLeadPage(owner, { page: 0, status: "qualified", search: marker });
  assert.equal(readback.rows[0].id, ids[55]);
  assert.equal((await loadLeadCounts(owner)).qualified, before.qualified + 1);
  const missing = await owner
    .from("leads")
    .update({ status: "lost" })
    .eq("id", randomUUID())
    .select("id")
    .single();
  assert(missing.error, "Missing record must fail");
  try {
    const anonymous = await loadLeadPage(client(key), { page: 0, status: "all", search: marker });
    assert.equal(anonymous.total, 0);
  } catch (error) {
    assert.equal(error.code, "42501", "Anonymous access must be denied by privilege or RLS");
  }
  console.log(
    "PASS: real staging Auth/RLS, 56-record paging, full counts, contacted filter, punctuation search, update/readback and zero-row rejection",
  );
  if (process.env.ADMIN_ACCEPTANCE_PLAYWRIGHT) {
    const { chromium } = await import(pathToFileURL(process.env.ADMIN_ACCEPTANCE_PLAYWRIGHT).href);
    const local = "http://127.0.0.1:4187";
    const runtime = spawn(
      process.execPath,
      ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1", "--port", "4187", "--strictPort"],
      {
        windowsHide: true,
        stdio: "ignore",
        env: {
          ...process.env,
          SUPABASE_URL: url,
          VITE_SUPABASE_URL: url,
          SUPABASE_PUBLISHABLE_KEY: key,
          VITE_SUPABASE_PUBLISHABLE_KEY: key,
          LEAD_NOTIFICATIONS_ENABLED: "false",
          SLACK_NOTIFICATIONS_ENABLED: "false",
          TRANSACTIONAL_EMAIL_ENABLED: "false",
        },
      },
    );
    let browser;
    try {
      let ready = false;
      for (let attempt = 0; attempt < 60; attempt++) {
        if (runtime.exitCode !== null) throw new Error("Isolated local server exited");
        try {
          ready = (await fetch(local + "/auth")).ok;
        } catch {}
        if (ready) break;
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      assert(ready, "Isolated local server did not start");
      browser = await chromium.launch({ channel: "msedge", headless: true });
      const native = await browser.newPage({ javaScriptEnabled: false });
      await native.goto(local + "/auth");
      assert.equal(await native.locator("form").getAttribute("method"), "post");
      assert(await native.locator('button[type="submit"]').isDisabled());
      await native.close();
      const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
      const failures = [];
      page.on("pageerror", (error) => failures.push(error.message.slice(0, 250)));
      page.on("response", (response) => {
        if (response.status() >= 400)
          failures.push(`${response.status()} ${new URL(response.url()).pathname}`);
      });
      await page.goto(local + "/auth?redirect=%2Fadmin%2Fleads");
      await page.waitForFunction(
        () => document.querySelector('button[type="submit"]')?.disabled === false,
      );
      await page.getByLabel("Email", { exact: true }).fill(email);
      await page.getByLabel("Password", { exact: true }).fill(password);
      await page.getByRole("button", { name: "Sign in", exact: true }).click();
      try {
        await page.getByRole("heading", { name: "Enquiries & qualification" }).waitFor();
      } catch (error) {
        console.log(
          JSON.stringify({
            path: new URL(page.url()).pathname,
            searchKeys: [...new URL(page.url()).searchParams.keys()],
            headings: await page.locator("h1,h2").allTextContents(),
            alerts: await page.getByRole("alert").allTextContents(),
            invalidInputs: await page.locator("input:invalid").count(),
            failures,
          }),
        );
        throw error;
      }
      await page.getByLabel("Search enquiries").fill(marker);
      await page.getByRole("status").filter({ hasText: "56 matching enquiries" }).waitFor();
      assert.equal(await page.locator("tbody tr").count(), 25);
      await page.getByRole("button", { name: "Next", exact: true }).click();
      await page.getByRole("status").filter({ hasText: "Page 2" }).waitFor();
      await page.getByRole("button", { name: "Next", exact: true }).click();
      await page.getByRole("status").filter({ hasText: "Page 3" }).waitFor();
      assert.equal(await page.locator("tbody tr").count(), 6);
      assert(await page.getByRole("button", { name: "Next", exact: true }).isDisabled());
      await page.getByRole("button", { name: /^Qualified \(/ }).click();
      await page.getByRole("status").filter({ hasText: "1 matching enquiries · Page 1" }).waitFor();
      await page.setViewportSize({ width: 375, height: 812 });
      assert(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        "Lead desk overflows mobile viewport",
      );
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.locator("tbody tr").first().click();
      await page.getByRole("button", { name: "lost", exact: true }).click();
      await page.waitForFunction(() =>
        [...document.querySelectorAll("button")].some(
          (button) =>
            button.textContent.trim() === "lost" && button.className.includes("bg-ink text-white"),
        ),
      );
      assert.equal(
        (await loadLeadPage(owner, { page: 0, status: "lost", search: marker })).rows[0].id,
        ids[55],
      );
      await page.mouse.click(500, 100);
      await page.getByRole("status").filter({ hasText: "0 matching enquiries" }).waitFor();
      console.log("PASS: browser sign-in, three enquiry pages, filter reset and mobile width");
      let outages = 0;
      const outagePattern = /\/rest\/v1\/leads(?:\?|$)/;
      await page.route(outagePattern, (route) => {
        outages++;
        return route.fulfill({
          status: 503,
          contentType: "application/json",
          body: JSON.stringify({ message: "Synthetic staging outage" }),
        });
      });
      await page
        .locator("aside")
        .getByRole("link", { name: "Control Centre", exact: true })
        .click();
      try {
        await page.getByRole("button", { name: "Retry business data" }).waitFor({ timeout: 45000 });
      } catch (error) {
        console.log(
          JSON.stringify({
            path: new URL(page.url()).pathname,
            outages,
            headings: await page.locator("h1,h2").allTextContents(),
            failures,
          }),
        );
        throw error;
      }
      assert.equal(await page.getByText("No recorded exceptions", { exact: true }).count(), 0);
      await page.unroute(outagePattern);
      await page.getByRole("button", { name: "Retry business data" }).click();
      await page.getByText("Recorded care value", { exact: true }).waitFor();
      console.log(
        "PASS: browser sign-in, three enquiry pages, filter reset, mobile width, dashboard outage and retry recovery",
      );
    } finally {
      await browser?.close();
      runtime.kill();
      await new Promise((resolve) =>
        runtime.exitCode !== null ? resolve() : runtime.once("exit", resolve),
      );
    }
  }
} finally {
  assert.ifError((await server.from("leads").delete().in("id", ids)).error);
  const remaining = await server
    .from("leads")
    .select("id", { count: "exact", head: true })
    .in("id", ids);
  assert.ifError(remaining.error);
  assert.equal(remaining.count, 0);
  if (userId) {
    assert.ifError((await server.auth.admin.deleteUser(userId)).error);
    const remainingRoles = await server.from("user_roles").select("user_id").eq("user_id", userId);
    assert.ifError(remainingRoles.error);
    assert.equal(remainingRoles.data.length, 0);
  }
  console.log("PASS: exact staging fixture records and temporary administrator removed");
}
