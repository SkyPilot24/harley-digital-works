import { readFile } from "node:fs/promises";
import { parseEnv } from "node:util";
import { randomBytes, randomUUID } from "node:crypto";
import assert from "node:assert/strict";
import { toJSONAsync } from "seroval";

// Isolated synthetic Auth rehearsal. Credentials stay in process memory.
const config = parseEnv(await readFile(new URL("../.env.local", import.meta.url), "utf8"));
const url = "https://mfpnfxpgkfuqtedbcxvp.supabase.co";
assert.equal(config.SUPABASE_URL, url);
assert.equal(config.VITE_SUPABASE_URL, url);
assert.equal(config.TRANSACTIONAL_EMAIL_ENABLED, "false");
const secret = config.SUPABASE_SERVICE_ROLE_KEY;
assert.ok(secret?.trim(), "Private staging key missing");
const publishable = config.SUPABASE_PUBLISHABLE_KEY;
const email = `h50-auth-${randomUUID()}@example.invalid`;
const password = randomBytes(32).toString("base64url");
let userId;
async function request(path, key, body, token, method = "POST") {
  return fetch(url + path, {
    method,
    headers: {
      apikey: key,
      "content-type": "application/json",
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : key.startsWith("sb_")
          ? {}
          : { Authorization: `Bearer ${key}` }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
try {
  const created = await request("/auth/v1/admin/users", secret, {
    email,
    password,
    email_confirm: true,
  });
  assert.equal(created.status, 200, "Synthetic staging user creation failed");
  userId = (await created.json()).id;
  assert.ok(userId);
  const signed = await request("/auth/v1/token?grant_type=password", publishable, {
    email,
    password,
  });
  assert.equal(signed.status, 200, "Real Auth sign-in failed");
  const session = await signed.json();
  const claims = JSON.parse(Buffer.from(session.access_token.split(".")[1], "base64url"));
  assert.equal(claims.sub, userId);
  assert.ok(claims.session_id);
  const active = async () => {
    const response = await request("/rest/v1/rpc/delivery_session_active", secret, {
      p_user_id: userId,
      p_session_id: claims.session_id,
    });
    assert.equal(response.status, 200);
    return response.json();
  };
  assert.equal(await active(), true);
  console.log("PASS: Real staging Auth session recognized");
  const guardedApproval = () =>
    request("/rest/v1/rpc/approve_delivery_revision_session", secret, {
      p_project_id: randomUUID(),
      p_user_id: userId,
      p_session_id: claims.session_id,
      p_revision_id: randomUUID(),
      p_content_sha256: "a".repeat(64),
    });
  const activeApproval = await guardedApproval();
  assert.equal(activeApproval.status, 400);
  assert.equal((await activeApproval.json()).message, "Project access denied");
  console.log(
    "PASS: Atomic approval recognises live session and still enforces project membership",
  );
  if (process.argv.includes("--local-disabled-runtime")) {
    const local = "http://127.0.0.1:5178";
    const compiled = await (await fetch(local + "/src/lib/delivery-approval.functions.ts")).text();
    const id = compiled.match(/getDeliveryReview = .*?createClientRpc\("([^"]+)"\)/)?.[1];
    assert.ok(id);
    const payload = JSON.stringify(
      await toJSONAsync({ data: { projectId: randomUUID(), kind: "proposal" } }),
    );
    const response = await fetch(
      local + "/_serverFn/" + id + "?payload=" + encodeURIComponent(payload),
      {
        headers: {
          Origin: local,
          "x-tsr-serverFn": "true",
          Authorization: `Bearer ${session.access_token}`,
        },
      },
    );
    assert.equal(response.status, 503);
    assert.equal(await response.text(), "Review unavailable");
    console.log(
      "PASS: Same-origin real authenticated request passes CSRF/Auth and reaches disabled feature gate",
    );
  }
  const wrongUser = await request("/rest/v1/rpc/delivery_session_active", secret, {
    p_user_id: randomUUID(),
    p_session_id: claims.session_id,
  });
  assert.equal(wrongUser.status, 200);
  assert.equal(await wrongUser.json(), false);
  console.log("PASS: Session cannot be used for another user identity");
  const denied = await request(
    "/rest/v1/rpc/delivery_session_active",
    publishable,
    {
      p_user_id: userId,
      p_session_id: claims.session_id,
    },
    session.access_token,
  );
  assert.equal(denied.status, 403);
  console.log("PASS: Ordinary signed-in user cannot call private session RPC");
  const approvalDenied = await request(
    "/rest/v1/rpc/approve_delivery_revision",
    publishable,
    {
      p_project_id: randomUUID(),
      p_user_id: userId,
      p_revision_id: randomUUID(),
      p_content_sha256: "a".repeat(64),
    },
    session.access_token,
  );
  assert.equal(approvalDenied.status, 403);
  console.log("PASS: Ordinary user cannot bypass application approval verification");
  const logout = await request(
    "/auth/v1/logout?scope=global",
    publishable,
    undefined,
    session.access_token,
  );
  assert.equal(logout.status, 204);
  assert.equal(await active(), false);
  const loggedOutApproval = await guardedApproval();
  assert.equal(loggedOutApproval.status, 400);
  assert.equal((await loggedOutApproval.json()).message, "Active delivery session required");
  console.log("PASS: Approval transaction rejects logged-out session before project lookup");
  console.log("PASS: Logged-out session rejected while old access token still exists");
} finally {
  if (userId) {
    const removed = await request(
      `/auth/v1/admin/users/${userId}`,
      secret,
      undefined,
      undefined,
      "DELETE",
    );
    assert.equal(removed.status, 200, "Synthetic Auth fixture cleanup failed");
    console.log("PASS: Synthetic Auth fixture removed; no credentials retained");
  }
}
