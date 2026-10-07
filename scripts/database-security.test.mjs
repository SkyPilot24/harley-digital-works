import { PGlite } from "@electric-sql/pglite";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

// An ephemeral PostgreSQL engine: no URL, credentials or network database access.
// Auth functions model JWT claims; GoTrue/PostgREST and concurrency need staging tests.
const migrationsDir = new URL("../supabase/migrations/", import.meta.url);
const hardening = "20261003090748_restrict_signup_admin_and_public_intake.sql";
const owner = "00000000-0000-4000-8000-000000000001";
const ordinary = "00000000-0000-4000-8000-000000000002";

test("database security across migration upgrade and clean signup", async (t) => {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(`
    CREATE ROLE anon NOLOGIN;
    CREATE ROLE authenticated NOLOGIN;
    CREATE ROLE service_role NOLOGIN BYPASSRLS;
    CREATE SCHEMA auth;
    CREATE TABLE auth.users (id uuid PRIMARY KEY, email text);
    CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS
      $$ SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
    CREATE FUNCTION auth.jwt() RETURNS jsonb LANGUAGE sql STABLE AS
      $$ SELECT coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb $$;
    GRANT USAGE ON SCHEMA public, auth TO anon, authenticated, service_role;
  `);
  const files = (await readdir(migrationsDir)).filter((f) => f.endsWith(".sql")).sort();
  for (const file of files.filter((f) => f < hardening)) {
    await db.exec(await readFile(new URL(file, migrationsDir), "utf8"));
  }
  // Reproduce the old behaviour, then verify that the migration preserves this owner.
  // Mirror broad grants observed in the provider database, including non-RLS operations.
  await db.exec("GRANT ALL ON public.leads, public.user_roles TO anon, authenticated");
  await db.query("INSERT INTO auth.users (id,email) VALUES ($1,'owner@example.test')", [owner]);
  assert.equal(
    (await db.query("SELECT count(*)::int AS n FROM public.user_roles WHERE role='admin'")).rows[0]
      .n,
    1,
  );
  for (const file of files.filter((f) => f >= hardening)) {
    await db.exec(await readFile(new URL(file, migrationsDir), "utf8"));
  }
  await db.query("INSERT INTO auth.users (id,email) VALUES ($1,'ordinary@example.test')", [
    ordinary,
  ]);

  async function asRole(role, userId, action) {
    await db.exec("BEGIN");
    try {
      await db.query("SELECT set_config('request.jwt.claim.sub', $1, true)", [userId || ""]);
      await db.exec(`SET LOCAL ROLE ${role}`);
      return await action();
    } finally {
      await db.exec("ROLLBACK");
    }
  }
  const insertLead = () =>
    db.query(
      "INSERT INTO public.leads (name,email,message) VALUES ('QA','qa@example.test','Test enquiry') RETURNING id",
    );

  await t.test("existing owner is preserved and later signup receives no admin role", async () => {
    const roles = (await db.query("SELECT user_id,role FROM public.user_roles")).rows;
    assert.deepEqual(roles, [{ user_id: owner, role: "admin" }]);
  });
  await t.test("anonymous and authenticated roles have no non-RLS table privileges", async () => {
    for (const role of ["anon", "authenticated"])
      for (const table of ["leads", "user_roles"]) {
        for (const privilege of ["TRUNCATE", "TRIGGER", "REFERENCES"]) {
          assert.equal(
            (
              await db.query("SELECT has_table_privilege($1,$2,$3) AS allowed", [
                role,
                `public.${table}`,
                privilege,
              ])
            ).rows[0].allowed,
            false,
          );
        }
      }
  });
  await t.test("zero-admin environment does not promote the next signup", async () => {
    await db.exec("BEGIN");
    try {
      await db.exec("DELETE FROM public.user_roles");
      await db.exec(
        "INSERT INTO auth.users (id,email) VALUES ('00000000-0000-4000-8000-000000000003','new@example.test')",
      );
      assert.equal(
        (await db.query("SELECT count(*)::int AS n FROM public.user_roles")).rows[0].n,
        0,
      );
    } finally {
      await db.exec("ROLLBACK");
    }
  });
  for (const [role, id] of [
    ["anon", null],
    ["authenticated", ordinary],
  ]) {
    await t.test(`public role-probing RPC denied for ${role}`, async () => {
      await assert.rejects(
        asRole(role, id, () => db.query("SELECT public.has_role($1,'admin')", [owner])),
        { code: "42501" },
      );
    });
    await t.test(`direct lead insertion denied for ${role}/${id || "signed-out"}`, async () => {
      await assert.rejects(asRole(role, id, insertLead), { code: "42501" });
    });
  }
  await t.test("existing admin can manually create a lead", async () => {
    assert.equal((await asRole("authenticated", owner, insertLead)).rows.length, 1);
  });
  await t.test("service role can persist a lead", async () => {
    const result = await asRole("service_role", null, insertLead);
    assert.equal(result.rows.length, 1);
  });
  await db.exec(
    "INSERT INTO public.leads(name,email,message) VALUES ('Existing','existing@example.test','Preserved enquiry')",
  );
  await t.test("admin reads existing leads, ordinary user cannot", async () => {
    assert.equal(
      (await asRole("authenticated", owner, () => db.query("SELECT * FROM public.leads"))).rows
        .length,
      1,
    );
    assert.equal(
      (await asRole("authenticated", ordinary, () => db.query("SELECT * FROM public.leads"))).rows
        .length,
      0,
    );
    await assert.rejects(
      asRole("anon", null, () => db.query("SELECT * FROM public.leads")),
      { code: "42501" },
    );
  });
  await t.test("ordinary user cannot self-promote", async () => {
    await assert.rejects(
      asRole("authenticated", ordinary, () =>
        db.query("INSERT INTO public.user_roles(user_id,role) VALUES ($1,'admin')", [ordinary]),
      ),
      { code: "42501" },
    );
  });
  await t.test("rate-limit storage is available only to the service role", async () => {
    const recordAttempt = () =>
      db.query("INSERT INTO public.lead_submission_attempts(fingerprint) VALUES ($1)", [
        "a".repeat(64),
      ]);
    await asRole("service_role", null, recordAttempt);
    for (const role of ["anon", "authenticated"])
      await assert.rejects(asRole(role, ordinary, recordAttempt), { code: "42501" });
  });
  await t.test("hardening can be rechecked without altering existing records", async () => {
    await db.exec(await readFile(new URL(hardening, migrationsDir), "utf8"));
    assert.equal((await db.query("SELECT count(*)::int AS n FROM public.leads")).rows[0].n, 1);
    assert.equal(
      (await db.query("SELECT count(*)::int AS n FROM public.user_roles WHERE role='admin'"))
        .rows[0].n,
      1,
    );
  });

  const payload = {
    name: "Acceptance fixture",
    email: "qa@example.test",
    message: "Synthetic acceptance enquiry",
    source: "contact_form",
  };
  async function intake(fingerprint, lead = payload, startedAt = Date.now() - 5000) {
    await db.exec("SET ROLE service_role");
    try {
      return (
        await db.query("SELECT public.submit_public_lead($1,$2,$3::jsonb) AS result", [
          fingerprint,
          startedAt,
          JSON.stringify(lead),
        ])
      ).rows[0].result;
    } finally {
      await db.exec("RESET ROLE");
    }
  }
  for (const [role, id] of [
    ["anon", null],
    ["authenticated", ordinary],
    ["authenticated", owner],
  ]) {
    await t.test(`atomic intake RPC denied for ${role}/${id || "signed-out"}`, async () => {
      await assert.rejects(
        asRole(role, id, () =>
          db.query("SELECT public.submit_public_lead($1,$2,$3::jsonb)", [
            "b".repeat(64),
            Date.now() - 5000,
            JSON.stringify(payload),
          ]),
        ),
        { code: "42501" },
      );
    });
  }
  await t.test("trusted intake persists once and owner can retrieve it", async () => {
    assert.equal(await intake("b".repeat(64)), "saved");
    assert.equal(await intake("c".repeat(64)), "duplicate");
    assert.equal(
      (
        await asRole("authenticated", owner, () =>
          db.query("SELECT count(*)::int AS n FROM public.leads WHERE email='qa@example.test'"),
        )
      ).rows[0].n,
      1,
    );
    assert.equal(
      (
        await asRole("authenticated", ordinary, () =>
          db.query("SELECT count(*)::int AS n FROM public.leads WHERE email='qa@example.test'"),
        )
      ).rows[0].n,
      0,
    );
  });
  await t.test("timing rejection consumes quota and the sixth attempt is denied", async () => {
    for (let n = 0; n < 5; n++)
      assert.equal(await intake("d".repeat(64), payload, Date.now() + 30000), "too_fast");
    assert.equal(await intake("d".repeat(64)), "rate_limited");
    assert.equal(
      (
        await db.query(
          "SELECT count(*)::int AS n FROM public.lead_submission_attempts WHERE fingerprint=$1",
          ["d".repeat(64)],
        )
      ).rows[0].n,
      5,
    );
  });
  await t.test("failed persistence rolls back intake and retry recovers", async () => {
    await db.exec(
      "ALTER TABLE public.leads ADD CONSTRAINT acceptance_failure CHECK(email <> 'failure@example.test')",
    );
    await assert.rejects(intake("e".repeat(64), { ...payload, email: "failure@example.test" }), {
      code: "23514",
    });
    assert.equal(
      (
        await db.query(
          "SELECT count(*)::int AS n FROM public.lead_submission_attempts WHERE fingerprint=$1",
          ["e".repeat(64)],
        )
      ).rows[0].n,
      0,
    );
    await db.exec("ALTER TABLE public.leads DROP CONSTRAINT acceptance_failure");
    assert.equal(
      await intake("e".repeat(64), { ...payload, email: "failure@example.test" }),
      "saved",
    );
  });
  await t.test(
    "retention cleanup works without new enquiries and cannot be called by users",
    async () => {
      await db.query(
        "INSERT INTO public.lead_submission_attempts(fingerprint,created_at) VALUES($1,now()-interval '25 hours')",
        ["f".repeat(64)],
      );
      for (const role of ["anon", "authenticated"])
        await assert.rejects(
          asRole(role, ordinary, () => db.query("SELECT public.prune_lead_submission_attempts()")),
          { code: "42501" },
        );
      await db.exec(
        "SET ROLE service_role; SELECT public.prune_lead_submission_attempts(); RESET ROLE",
      );
      assert.equal(
        (
          await db.query(
            "SELECT count(*)::int AS n FROM public.lead_submission_attempts WHERE fingerprint=$1",
            ["f".repeat(64)],
          )
        ).rows[0].n,
        0,
      );
    },
  );
});
