import { readFile, writeFile, access, unlink } from "node:fs/promises";
import { parseEnv } from "node:util";
import { randomBytes, randomUUID } from "node:crypto";
import assert from "node:assert/strict";
import { toJSONAsync, fromCrossJSON } from "seroval";

const config = parseEnv(await readFile(new URL("../.env.local", import.meta.url), "utf8"));
const stage = "https://mfpnfxpgkfuqtedbcxvp.supabase.co";
assert.equal(config.SUPABASE_URL, stage);
assert.equal(config.VITE_SUPABASE_URL, stage);
const local = "http://127.0.0.1:5178";
const secret = config.SUPABASE_SERVICE_ROLE_KEY;
const publicKey = config.SUPABASE_PUBLISHABLE_KEY;
const registry = { projectId: randomUUID(), users: [] };
const registryPath = new URL("../.env.h50-delivery-fixture", import.meta.url);
try {
  await access(registryPath);
  throw new Error(
    "Prior fixture registry exists; complete audited cleanup before another rehearsal",
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
// Only fixture IDs are retained for cleanup, never credentials or tokens.
// The temporary staging-only cleanup helper must be installed first and removed
// after the rehearsal. Empty identities are deliberately rejected without writes.
const cleanupReady = await fetch(stage + "/rest/v1/rpc/h50_cleanup_delivery_rehearsal", {
  method: "POST",
  headers: {
    apikey: secret,
    "content-type": "application/json",
    ...(secret.startsWith("sb_") ? {} : { Authorization: `Bearer ${secret}` }),
  },
  body: JSON.stringify({ p_project: registry.projectId, p_users: [] }),
});
assert.equal(
  cleanupReady.status,
  400,
  "Scoped staging cleanup helper unavailable; no fixtures created",
);
await writeFile(registryPath, JSON.stringify(registry));
async function api(path, body, key = secret, token, method = "POST") {
  const r = await fetch(stage + path, {
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
  if (!r.ok) throw new Error(`Staging request rejected: ${r.status}`);
  return r.status === 204 || r.headers.get("content-length") === "0"
    ? null
    : r.text().then((s) => (s ? JSON.parse(s) : null));
}
async function identity(label) {
  const email = `h50-${label}-${randomUUID()}@example.invalid`;
  const password = randomBytes(32).toString("base64url");
  const user = await api("/auth/v1/admin/users", { email, password, email_confirm: true });
  registry.users.push(user.id);
  await writeFile(registryPath, JSON.stringify(registry));
  const session = await api("/auth/v1/token?grant_type=password", { email, password }, publicKey);
  return { id: user.id, token: session.access_token };
}
const compiled = await (await fetch(local + "/src/lib/delivery-approval.functions.ts")).text();
const functions = new Map(
  [...compiled.matchAll(/export const (\w+) = .*?createClientRpc\("([^"]+)"\)/g)].map((m) => [
    m[1],
    m[2],
  ]),
);
async function call(name, method, data, token) {
  assert.ok(functions.has(name), "Local compiled server function missing");
  const payload = JSON.stringify(await toJSONAsync({ data }));
  const endpoint = local + "/_serverFn/" + functions.get(name);
  const raw = await fetch(
    method === "GET" ? endpoint + "?payload=" + encodeURIComponent(payload) : endpoint,
    {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Origin: local,
        "x-tsr-serverFn": "true",
        "content-type": "application/json",
        accept: "application/json",
      },
      body: method === "POST" ? payload : undefined,
    },
  );
  if (!raw.ok) throw new Error(`Application rejected operation: ${raw.status}`);
  const response = fromCrossJSON(await raw.json(), {});
  if (response.error) throw response.error;
  return response.result;
}
try {
  const admin = await identity("publisher");
  const customer = await identity("customer");
  await api("/rest/v1/user_roles", { user_id: admin.id, role: "admin" });
  await api("/rest/v1/projects", {
    id: registry.projectId,
    client_id: "e0403bcb-2a18-4a68-a9f6-130ce14f12bc",
    name: "H50 fictional approval runtime rehearsal",
    status: "review",
  });
  const projectId = registry.projectId;
  await call(
    "setDeliveryProjectAccess",
    "POST",
    { projectId, userId: customer.id, active: true },
    admin.token,
  );
  const published = await call(
    "publishDeliveryReview",
    "POST",
    {
      projectId,
      kind: "proposal",
      reviewText: "Fictional staging review only. No commercial agreement or launch authorization.",
      sourceCommit: null,
      expectedRevision: 0,
    },
    admin.token,
  );
  assert.ok(published);
  console.log("PASS: Authenticated administrator publishes through application");
  const review = await call(
    "getDeliveryReview",
    "GET",
    { projectId, kind: "proposal" },
    customer.token,
  );
  assert.equal(review.revision, 1);
  assert.equal(review.approved, false);
  console.log("PASS: Invited customer retrieves exact published revision");
  const approved = await call(
    "approveDeliveryRevision",
    "POST",
    {
      projectId,
      revisionId: review.id,
      contentSha256: review.content_sha256,
      confirmed: true,
    },
    customer.token,
  );
  assert.ok(approved.approvalId);
  assert.equal(
    (await call("getDeliveryReview", "GET", { projectId, kind: "proposal" }, customer.token))
      .approved,
    true,
  );
  console.log("PASS: Explicit customer approval persists and reads back through application");
  await call(
    "setDeliveryProjectAccess",
    "POST",
    { projectId, userId: customer.id, active: false },
    admin.token,
  );
  await assert.rejects(
    call(
      "approveDeliveryRevision",
      "POST",
      {
        projectId,
        revisionId: review.id,
        contentSha256: review.content_sha256,
        confirmed: true,
      },
      customer.token,
    ),
    /Application rejected operation: 409/,
  );
  console.log("PASS: Revoked project access rejects approval retry");
  await api("/auth/v1/logout?scope=global", undefined, publicKey, customer.token);
  await assert.rejects(
    call("getDeliveryReview", "GET", { projectId, kind: "proposal" }, customer.token),
    /Application rejected operation: 401/,
  );
  console.log("PASS: Logged-out customer rejected by running application");
  await api("/auth/v1/logout?scope=global", undefined, publicKey, admin.token);
} finally {
  if (registry.users.length) {
    assert.equal(
      await api("/rest/v1/rpc/h50_cleanup_delivery_rehearsal", {
        p_project: registry.projectId,
        p_users: registry.users,
      }),
      true,
      "Scoped fixture cleanup failed",
    );
    for (const id of registry.users)
      await api(`/auth/v1/admin/users/${id}`, undefined, secret, undefined, "DELETE");
  }
  await unlink(registryPath);
  console.log(
    "PASS: All fictional records, admin grants and accounts removed; credentials discarded",
  );
}
