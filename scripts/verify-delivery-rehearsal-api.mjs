import { readFile, writeFile } from "node:fs/promises";
import { parseEnv } from "node:util";
import assert from "node:assert/strict";
import { toJSONAsync } from "seroval";

// Explicit disposable staging fixture only; never part of the automatic unit suite.
const fixture = JSON.parse(
  await readFile(new URL("../../h50-delivery-fixture-private.json", import.meta.url), "utf8"),
);
const config = parseEnv(await readFile(new URL("../.env.local", import.meta.url), "utf8"));
const stage = "https://mfpnfxpgkfuqtedbcxvp.supabase.co";
assert.equal(config.SUPABASE_URL, stage);
const local = process.env.H50_LOCAL_BASE_URL || "http://127.0.0.1:4183";
assert.match(local, /^http:\/\/(127\.0\.0\.1|localhost):\d+$/);
assert.match(fixture.email, /^h50-browser-[a-f0-9-]+@example\.invalid$/);
const signed = await fetch(stage + "/auth/v1/token?grant_type=password", {
  method: "POST",
  headers: { apikey: config.SUPABASE_PUBLISHABLE_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ email: fixture.email, password: fixture.password }),
});
assert.equal(signed.status, 200);
const session = await signed.json();
assert.equal(session.user.id, fixture.userId, "Fictional Auth identity mismatch");
const projectResponse = await fetch(
  stage + "/rest/v1/projects?id=eq." + fixture.projectId + "&select=id,name,summary,client_id",
  { headers: { apikey: config.SUPABASE_SERVICE_ROLE_KEY } },
);
assert.equal(projectResponse.status, 200);
const projects = await projectResponse.json();
assert.equal(projects.length, 1);
assert.equal(projects[0].name, "H50 fictional browser approval rehearsal 20261014");
assert.equal(projects[0].summary, "Disposable staging fixture; no customer, contract or revenue");
assert.equal(projects[0].client_id, "e0403bcb-2a18-4a68-a9f6-130ce14f12bc");
const compiled = await (await fetch(local + "/src/lib/delivery-approval.functions.ts")).text();
const id = compiled.match(/approveDeliveryRevision = .*?createClientRpc\("([^"]+)"\)/)?.[1];
assert.ok(id, "Compiled approval endpoint identity missing");
const checks = [];
async function call(label, revisionId, contentSha256, expected) {
  const r = await fetch(local + "/_serverFn/" + id, {
    method: "POST",
    headers: {
      Origin: local,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      "x-tsr-serverFn": "true",
    },
    body: JSON.stringify(
      await toJSONAsync({
        data: { projectId: fixture.projectId, revisionId, contentSha256, confirmed: true },
      }),
    ),
  });
  checks.push({ label, status: r.status, expected });
  assert.equal(r.status, expected, label);
  console.log(`PASS: ${label} (${r.status})`);
}
const rowsResponse = await fetch(
  stage +
    "/rest/v1/delivery_revisions?project_id=eq." +
    fixture.projectId +
    "&select=id,revision,kind,content_sha256",
  { headers: { apikey: config.SUPABASE_SERVICE_ROLE_KEY } },
);
assert.equal(rowsResponse.status, 200);
const rows = await rowsResponse.json();
const old = rows.find((r) => r.kind === "proposal" && r.revision === 2);
const current = rows.find((r) => r.kind === "proposal" && r.revision === 3);
assert.ok(old && current);
await call(
  "superseded version refused through active authenticated application",
  old.id,
  old.content_sha256,
  409,
);
await call("altered digest refused through application", current.id, "0".repeat(64), 409);
await call("latest approved version retry succeeds", current.id, current.content_sha256, 200);
async function membership(active) {
  const r = await fetch(
    stage +
      "/rest/v1/delivery_project_access?project_id=eq." +
      fixture.projectId +
      "&user_id=eq." +
      fixture.userId,
    {
      method: "PATCH",
      headers: { apikey: config.SUPABASE_SERVICE_ROLE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ active }),
    },
  );
  assert.equal(r.status, 204, "Fictional membership update failed");
}
try {
  await membership(false);
  await call(
    "revoked project membership refuses even prior approved-version retry",
    current.id,
    current.content_sha256,
    409,
  );
} finally {
  await membership(true);
}
await call(
  "restored fictional membership recovers approval retry",
  current.id,
  current.content_sha256,
  200,
);
const launch = await fetch(stage + "/rest/v1/projects?id=eq." + fixture.projectId, {
  method: "PATCH",
  headers: { apikey: config.SUPABASE_SERVICE_ROLE_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ status: "launched" }),
});
if (launch.ok) {
  await fetch(stage + "/rest/v1/projects?id=eq." + fixture.projectId, {
    method: "PATCH",
    headers: { apikey: config.SUPABASE_SERVICE_ROLE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ status: "review" }),
  });
  throw new Error("Fictional project bypassed launch guard");
}
assert.equal(launch.status, 400);
assert.equal((await launch.json()).message, "Launch requires matching verified release evidence");
checks.push({
  label: "approved fictional review cannot bypass required release evidence",
  status: 400,
  expected: 400,
});
console.log("PASS: Approved fictional review does not establish launch readiness (400)");
await writeFile(
  new URL("../../../outputs/Harley-delivery-rehearsal-api-checks-2026-10-14.json", import.meta.url),
  JSON.stringify(
    {
      date: "2026-10-14",
      source: "c7f0e05951753ea371d42501b97646845416eb1a",
      environment: "localhost against isolated staging",
      checks,
    },
    null,
    2,
  ) + "\n",
);
