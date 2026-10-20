import assert from "node:assert/strict";
import test from "node:test";
import {
  AdminWriteError,
  adminErrorMessage,
  deleteRecord,
  insertRecord,
  invalidateAdminData,
  requireRows,
  updateRecord,
} from "../src/lib/admin-writes.ts";
import { AdminValidationError } from "../src/lib/admin-validation.ts";
import { grantRole, revokeRole, roleErrorMessage } from "../src/lib/admin-users.ts";

const ID = "123e4567-e89b-12d3-a456-426614174000";

// Fake Supabase client: every builder call is recorded and the chain resolves to `result`.
function fakeClient(result) {
  const calls = [];
  const chain = new Proxy(
    {},
    {
      get(_t, prop) {
        if (prop === "then") return (resolve) => resolve(result);
        return (...args) => {
          calls.push([prop, ...args]);
          return chain;
        };
      },
    },
  );
  return { client: { from: (t) => (calls.push(["from", t]), chain) }, calls };
}

test("zero-row update, delete and insert never report success", async () => {
  const { client } = fakeClient({ data: [], error: null });
  await assert.rejects(updateRecord(client, "leads", ID, { status: "won" }), AdminWriteError);
  await assert.rejects(deleteRecord(client, "clients", ID), AdminWriteError);
  await assert.rejects(insertRecord(client, "projects", { name: "x" }), AdminWriteError);
});

test("null data is treated as zero rows", () => {
  assert.throws(() => requireRows({ data: null, error: null }, 1, "f"), AdminWriteError);
});

test("more rows than expected is rejected", () => {
  assert.throws(() => requireRows({ data: [{}, {}], error: null }, 1, "f"), AdminWriteError);
});

test("successful writes return the stored row", async () => {
  const { client, calls } = fakeClient({ data: [{ id: ID, status: "won" }], error: null });
  const row = await updateRecord(client, "leads", ID, { status: "won" });
  assert.equal(row.status, "won");
  assert.deepEqual(
    calls.find((c) => c[0] === "eq"),
    ["eq", "id", ID],
  );
});

test("a malformed id is rejected before any database call", async () => {
  const { client, calls } = fakeClient({ data: [{}], error: null });
  await assert.rejects(updateRecord(client, "leads", "1 or 1=1", {}), AdminValidationError);
  await assert.rejects(deleteRecord(client, "leads", ""), AdminValidationError);
  assert.equal(calls.length, 0);
});

test("ordinary user: RLS denial is a permission message, not a success or raw error", async () => {
  const denied = {
    data: null,
    error: {
      code: "42501",
      message: 'new row violates row-level security policy for table "leads"',
    },
  };
  const { client } = fakeClient(denied);
  await assert.rejects(insertRecord(client, "leads", { name: "x", email: "x@y.co" }), (e) => {
    assert.equal(e.message, "You do not have permission to make this change.");
    assert.doesNotMatch(e.message, /row-level|leads/i);
    return true;
  });
  // RLS filtering a row away from a non-admin yields zero rows, which must also fail.
  const { client: filtered } = fakeClient({ data: [], error: null });
  await assert.rejects(
    updateRecord(filtered, "clients", ID, { name: "x" }),
    /No record was changed/,
  );
});

test("partial backend failure surfaces a safe error", async () => {
  const { client } = fakeClient({
    data: null,
    error: {
      code: "XX000",
      message: 'connection to server at "10.0.0.5" failed; password=hunter2',
    },
  });
  await assert.rejects(deleteRecord(client, "clients", ID), (e) => {
    assert.doesNotMatch(e.message, /10\.0\.0\.5|hunter2|password/);
    assert.match(e.message, /Nothing was confirmed as saved/);
    return true;
  });
});

test("error mapping: constraints, sessions and launch gate", () => {
  assert.match(
    adminErrorMessage({ code: "23505", message: "dup key lead_email" }, "f"),
    /already exists/,
  );
  assert.match(adminErrorMessage({ code: "23503", message: "fk" }, "f"), /linked record/);
  assert.match(adminErrorMessage({ code: "23514", message: "chk" }, "f"), /invalid/);
  assert.match(
    adminErrorMessage({ code: "PGRST301", message: "JWT expired" }, "f"),
    /session has expired/,
  );
  assert.equal(
    adminErrorMessage({ code: "P0001", message: "Launch requires a verified release" }, "f"),
    "Launch requires a verified release",
  );
  assert.doesNotMatch(
    adminErrorMessage({ code: "P0001", message: "internal secret detail" }, "f"),
    /secret/,
  );
  assert.match(adminErrorMessage("weird", "Could not save."), /^Could not save\./);
});

test("invalidation covers every query family that can show the record", () => {
  const seen = (kind) => {
    const keys = [];
    invalidateAdminData({ invalidateQueries: ({ queryKey }) => keys.push(queryKey[0]) }, kind);
    return keys;
  };
  assert.deepEqual(seen("lead").sort(), ["admin", "lead-notification", "leads"]);
  assert.deepEqual(seen("project").sort(), ["admin", "clients", "projects"]);
  assert.deepEqual(seen("client").sort(), ["admin", "clients", "leads", "projects"]);
});

// ---- role management (server-side) ----
function roleDb({
  users = [ID],
  admins = [ID],
  insertError = null,
  deleteRows,
  selectError = null,
}) {
  const state = { deleted: 0, inserted: [] };
  return {
    state,
    auth: {
      admin: {
        getUserById: async (id) =>
          users.includes(id)
            ? { data: { user: { id } }, error: null }
            : { data: { user: null }, error: { message: "nf" } },
      },
    },
    from: () => ({
      insert: async (v) => (state.inserted.push(v), { error: insertError }),
      select: () => ({
        eq: async () => ({
          data: selectError ? null : admins.map((user_id) => ({ user_id })),
          error: selectError,
        }),
      }),
      delete: () => ({
        eq: () => ({
          eq: () => ({
            select: async () => {
              state.deleted++;
              return { data: deleteRows ?? [{ user_id: ID }], error: null };
            },
          }),
        }),
      }),
    }),
  };
}

test("grant: unknown user is rejected and nothing is inserted", async () => {
  const db = roleDb({ users: [] });
  await assert.rejects(grantRole(db, ID, "admin"), /does not exist/);
  assert.equal(db.state.inserted.length, 0);
});

test("grant: duplicate is idempotent; other database errors are not leaked", async () => {
  await grantRole(roleDb({ insertError: { code: "23505", message: "dup" } }), ID, "user");
  await assert.rejects(
    grantRole(roleDb({ insertError: { code: "XX", message: "secret table detail" } }), ID, "user"),
    (e) => {
      assert.doesNotMatch(roleErrorMessage(e, "fallback"), /secret/);
      return true;
    },
  );
});

test("revoke: last admin is protected, and the delete is not attempted", async () => {
  const db = roleDb({ admins: [ID] });
  await assert.rejects(revokeRole(db, ID, "admin"), /last admin/);
  assert.equal(db.state.deleted, 0);
});

test("revoke: target that does not hold admin is rejected even if one admin exists", async () => {
  const other = "223e4567-e89b-12d3-a456-426614174000";
  const db = roleDb({ admins: [other] });
  await assert.rejects(revokeRole(db, ID, "admin"), /does not hold this role/);
  assert.equal(db.state.deleted, 0);
});

test("revoke: zero rows deleted is an error, not ok", async () => {
  await assert.rejects(
    revokeRole(roleDb({ deleteRows: [] }), ID, "user"),
    /does not hold this role/,
  );
  await assert.rejects(
    revokeRole(
      roleDb({ admins: [ID, "223e4567-e89b-12d3-a456-426614174000"], deleteRows: [] }),
      ID,
      "admin",
    ),
    /does not hold this role/,
  );
});

test("revoke: succeeds when another admin exists; unconfirmed admin count fails closed", async () => {
  const db = roleDb({ admins: [ID, "223e4567-e89b-12d3-a456-426614174000"] });
  await revokeRole(db, ID, "admin");
  assert.equal(db.state.deleted, 1);
  await assert.rejects(
    revokeRole(roleDb({ selectError: { message: "boom" } }), ID, "admin"),
    /administrator count/,
  );
});
