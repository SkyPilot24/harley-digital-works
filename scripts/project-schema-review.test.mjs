import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
const draft = await readFile(
  new URL(
    "../docs/release-package/2026-10-17/projects-reconciliation-review-draft.sql",
    import.meta.url,
  ),
  "utf8",
);
const base = `CREATE ROLE anon;CREATE ROLE authenticated;CREATE ROLE service_role BYPASSRLS;CREATE SCHEMA auth;CREATE SCHEMA app_private;CREATE TYPE public.app_role AS ENUM('admin','staff');
CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
CREATE FUNCTION auth.jwt() RETURNS jsonb LANGUAGE sql STABLE AS $$SELECT coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb$$;
CREATE FUNCTION app_private.has_role(uid uuid,role public.app_role) RETURNS boolean LANGUAGE sql STABLE AS $$SELECT uid='00000000-0000-4000-8000-000000000001'::uuid AND role='admin'::public.app_role$$;
GRANT USAGE ON SCHEMA auth,app_private TO authenticated;
CREATE TABLE public.clients(id uuid PRIMARY KEY,name text,contact_email text);ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;GRANT SELECT,INSERT,UPDATE,DELETE ON public.clients TO authenticated;GRANT ALL ON public.clients TO service_role;CREATE POLICY admin_clients ON public.clients FOR ALL TO authenticated USING(app_private.has_role(auth.uid(),'admin')) WITH CHECK(app_private.has_role(auth.uid(),'admin'));
CREATE TABLE public.projects(id uuid PRIMARY KEY,client_name text,status text);ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;GRANT SELECT,INSERT,UPDATE,DELETE ON public.projects TO authenticated;GRANT ALL ON public.projects TO service_role;CREATE POLICY admin_projects ON public.projects FOR ALL TO authenticated USING(app_private.has_role(auth.uid(),'admin')) WITH CHECK(app_private.has_role(auth.uid(),'admin'));
CREATE TABLE public.project_tasks(id uuid PRIMARY KEY,project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,title text);GRANT ALL ON public.project_tasks TO service_role;`;
async function database() {
  const db = new PGlite();
  await db.exec(base);
  return db;
}
test("review draft creates admin projects and rebinds the production task dependency", async () => {
  const db = await database();
  try {
    await db.exec(draft);
    assert.equal(
      (
        await db.query(
          "SELECT confrelid::regclass::text AS target FROM pg_constraint WHERE conrelid='public.project_tasks'::regclass AND contype='f'",
        )
      ).rows[0].target,
      "projects",
    );
    await db.exec(
      "SET ROLE service_role;INSERT INTO public.clients VALUES('00000000-0000-4000-8000-000000000010','Fictional','customer@example.invalid');INSERT INTO public.projects(id,client_id,name)VALUES('00000000-0000-4000-8000-000000000020','00000000-0000-4000-8000-000000000010','Fictional');INSERT INTO public.project_tasks VALUES('00000000-0000-4000-8000-000000000030','00000000-0000-4000-8000-000000000020','Task');RESET ROLE;",
    );
    await db.exec(draft);
    assert.equal(
      (await db.query("SELECT count(*)::int AS n FROM public.project_tasks")).rows[0].n,
      1,
    );
  } finally {
    await db.close();
  }
});
test("review draft preserves admin CRUD and denies ordinary matched-email access", async () => {
  const db = await database();
  try {
    await db.exec(draft);
    await db.exec(
      "SELECT set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000001',false);SET ROLE authenticated;INSERT INTO public.clients VALUES('00000000-0000-4000-8000-000000000010','Fictional','customer@example.invalid');INSERT INTO public.projects(id,client_id,name)VALUES('00000000-0000-4000-8000-000000000020','00000000-0000-4000-8000-000000000010','Fictional');UPDATE public.projects SET summary='Admin saved';",
    );
    assert.equal((await db.query("SELECT count(*)::int AS n FROM public.projects")).rows[0].n, 1);
    await db.exec(
      "RESET ROLE;SELECT set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000002',false);SELECT set_config('request.jwt.claims','{\"email\":\"customer@example.invalid\"}',false);SET ROLE authenticated;",
    );
    assert.equal((await db.query("SELECT count(*)::int AS n FROM public.projects")).rows[0].n, 0);
    assert.equal(
      (await db.query("UPDATE public.projects SET name='Forbidden' RETURNING id")).rows.length,
      0,
    );
    await assert.rejects(
      db.exec("INSERT INTO public.projects(name)VALUES('Forbidden')"),
      (e) => e.code === "42501",
    );
    await db.exec("RESET ROLE;SET ROLE anon;");
    await assert.rejects(db.query("SELECT * FROM public.projects"), (e) => e.code === "42501");
  } finally {
    await db.close();
  }
});
test("review draft aborts without renaming a populated legacy projects table", async () => {
  const db = await database();
  try {
    await db.exec(
      "INSERT INTO public.projects VALUES('00000000-0000-4000-8000-000000000090','Preserve me','discovery')",
    );
    await assert.rejects(db.exec(draft), /Legacy projects table has/);
    await db.exec("ROLLBACK");
    assert.equal((await db.query("SELECT count(*)::int AS n FROM public.projects")).rows[0].n, 1);
    assert.equal(
      (await db.query("SELECT to_regclass('public.projects_legacy') AS legacy")).rows[0].legacy,
      null,
    );
  } finally {
    await db.close();
  }
});
test("review draft aborts an unexpected foreign-key shape without replacing it", async () => {
  const db = await database();
  try {
    await db.exec("ALTER TABLE public.project_tasks DROP CONSTRAINT project_tasks_project_id_fkey");
    await assert.rejects(db.exec(draft), /Expected task FK is absent/);
    await db.exec("ROLLBACK");
    assert.equal(
      (await db.query("SELECT to_regclass('public.projects_legacy') AS legacy")).rows[0].legacy,
      null,
    );
  } finally {
    await db.close();
  }
});

test("missing staging task dependency aborts without changing projects", async () => {
  const db = await database();
  try {
    await db.exec("DROP TABLE public.project_tasks");
    await assert.rejects(db.exec(draft), /Expected public.project_tasks dependency is absent/);
    await db.exec("ROLLBACK");
    assert.equal(
      (await db.query("SELECT to_regclass('public.projects_legacy') AS legacy")).rows[0].legacy,
      null,
    );
  } finally {
    await db.close();
  }
});

test("backup restores migrated synthetic rows, task FK and role permissions separately", async () => {
  const db = await database();
  let restored;
  try {
    await db.exec(draft);
    await db.exec(
      "INSERT INTO public.clients VALUES('00000000-0000-4000-8000-000000000010','Fictional restore','customer@example.invalid');INSERT INTO public.projects(id,client_id,name)VALUES('00000000-0000-4000-8000-000000000020','00000000-0000-4000-8000-000000000010','Fictional restore');INSERT INTO public.project_tasks VALUES('00000000-0000-4000-8000-000000000030','00000000-0000-4000-8000-000000000020','Restore task');",
    );
    const backup = await db.dumpDataDir();
    assert.ok(backup.size > 0);
    await db.exec(
      "DELETE FROM public.project_tasks;DELETE FROM public.projects;DELETE FROM public.clients;",
    );
    restored = new PGlite({ loadDataDir: backup });
    assert.equal(
      (
        await restored.query(
          "SELECT count(*)::int AS n FROM public.project_tasks t JOIN public.projects p ON p.id=t.project_id JOIN public.clients c ON c.id=p.client_id",
        )
      ).rows[0].n,
      1,
    );
    assert.equal(
      (
        await restored.query(
          "SELECT confrelid::regclass::text AS target FROM pg_constraint WHERE conname='project_tasks_project_id_fkey'",
        )
      ).rows[0].target,
      "projects",
    );
    await restored.exec(
      "SELECT set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000002',false);SET ROLE authenticated;",
    );
    assert.equal(
      (await restored.query("SELECT count(*)::int AS n FROM public.projects")).rows[0].n,
      0,
    );
    await restored.exec(
      "RESET ROLE;SELECT set_config('request.jwt.claim.sub','00000000-0000-4000-8000-000000000001',false);SET ROLE authenticated;",
    );
    assert.equal(
      (await restored.query("SELECT count(*)::int AS n FROM public.projects")).rows[0].n,
      1,
    );
    await restored.exec("DELETE FROM public.projects;RESET ROLE;");
    assert.equal(
      (await restored.query("SELECT count(*)::int AS n FROM public.project_tasks")).rows[0].n,
      0,
    );
    assert.equal((await db.query("SELECT count(*)::int AS n FROM public.projects")).rows[0].n, 0);
  } finally {
    if (restored) await restored.close();
    await db.close();
  }
});
