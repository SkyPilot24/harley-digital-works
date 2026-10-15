import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parseEnv } from "node:util";
import { randomBytes, randomUUID } from "node:crypto";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import { createClient } from "@supabase/supabase-js";

/** Explicit isolated Auth/API/browser harness; credentials remain in memory. */
export async function withAdminStaging(run) {
  assert(process.env.ADMIN_ACCEPTANCE_CONFIG, "Explicit staging configuration required");
  const config = parseEnv(await readFile(process.env.ADMIN_ACCEPTANCE_CONFIG, "utf8"));
  const url = "https://mfpnfxpgkfuqtedbcxvp.supabase.co";
  assert.equal(config.SUPABASE_URL, url);
  assert.equal(config.VITE_SUPABASE_URL, url);
  assert.equal(config.LEAD_NOTIFICATIONS_ENABLED, "false");
  assert.equal(config.TRANSACTIONAL_EMAIL_ENABLED, "false");
  const key = config.VITE_SUPABASE_PUBLISHABLE_KEY || config.SUPABASE_PUBLISHABLE_KEY;
  assert(key && config.SUPABASE_SERVICE_ROLE_KEY, "Staging credentials required");
  function client(apiKey) {
    return createClient(url, apiKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (apiKey.startsWith("sb_") && headers.get("authorization") === `Bearer ${apiKey}`)
            headers.delete("authorization");
          headers.set("apikey", apiKey);
          return fetch(input, { ...init, headers });
        },
      },
    });
  }
  const server = client(config.SUPABASE_SERVICE_ROLE_KEY);
  const owner = client(key);
  const marker = `admin-records-${randomUUID()}`;
  const email = `${marker}@example.invalid`;
  const password = randomBytes(32).toString("base64url");
  let userId;
  try {
    const created = await server.auth.admin.createUser({ email, password, email_confirm: true });
    assert.ifError(created.error);
    userId = created.data.user.id;
    assert.ifError(
      (await server.from("user_roles").insert({ user_id: userId, role: "admin" })).error,
    );
    assert.ifError((await owner.auth.signInWithPassword({ email, password })).error);
    async function withBrowser(startPath, inspect) {
      assert(process.env.ADMIN_ACCEPTANCE_PLAYWRIGHT, "Explicit Playwright module required");
      const { chromium } = await import(
        pathToFileURL(process.env.ADMIN_ACCEPTANCE_PLAYWRIGHT).href
      );
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
            SUPABASE_SERVICE_ROLE_KEY: "",
            RESEND_API_KEY: "",
            STRIPE_SECRET_KEY: "",
            STRIPE_WEBHOOK_SECRET: "",
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
          assert.equal(runtime.exitCode, null, "Local acceptance server exited");
          try {
            ready = (await fetch(local + "/auth", { signal: AbortSignal.timeout(5000) })).ok;
          } catch {}
          if (ready) break;
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        assert(ready, "Local acceptance server unavailable");
        browser = await chromium.launch({ channel: "msedge", headless: true });
        const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
        await page.goto(local + "/auth?redirect=" + encodeURIComponent(startPath));
        await page.waitForFunction(
          () => document.querySelector('button[type="submit"]')?.disabled === false,
        );
        await page.getByLabel("Email", { exact: true }).fill(email);
        await page.getByLabel("Password", { exact: true }).fill(password);
        await page.getByRole("button", { name: "Sign in", exact: true }).click();
        await page.waitForURL(local + startPath);
        await inspect(page, local);
      } finally {
        await browser?.close();
        runtime.kill();
        await new Promise((resolve) =>
          runtime.exitCode !== null ? resolve() : runtime.once("exit", resolve),
        );
      }
    }
    await run({ server, owner, anonymous: client(key), marker, withBrowser });
  } finally {
    if (userId) {
      assert.ifError((await server.auth.admin.deleteUser(userId)).error);
      const roles = await server.from("user_roles").select("user_id").eq("user_id", userId);
      assert.ifError(roles.error);
      assert.equal(roles.data.length, 0);
    }
    console.log("PASS: temporary staging administrator removed");
  }
}
