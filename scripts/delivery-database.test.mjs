import { PGlite } from "@electric-sql/pglite";
import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
const reviewText = "Fictional preview scope: approved facts and contact workflow.";
const digest = createHash("sha256").update(reviewText).digest("hex");

const migration = await readFile(
  new URL("../supabase/migrations/20261012100245_client_delivery_gates.sql", import.meta.url),
  "utf8",
);
const project = "00000000-0000-4000-8000-000000000001";
const other = "00000000-0000-4000-8000-000000000002";
const user = "00000000-0000-4000-8000-000000000003";
test("approval transaction requires the matching live session, including idempotent retries", async (t) => {
  const db = await setup(t);
  await db.exec("RESET ROLE");
  await db.exec(
    await readFile(
      new URL(
        "../supabase/migrations/20261012114111_atomic_delivery_session_approval.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.exec("SET ROLE service_role");
  const id = await revision(db);
  await db.query("INSERT INTO delivery_project_access(project_id,user_id) VALUES($1,$2)", [
    project,
    user,
  ]);
  const session = "00000000-0000-4000-8000-000000000004";
  const save = () =>
    db.query("SELECT approve_delivery_revision_session($1,$2,$3,$4,$5) id", [
      project,
      user,
      session,
      id,
      digest,
    ]);
  await assert.rejects(save(), /Active delivery session/);
  await db.exec("RESET ROLE");
  await db.query("INSERT INTO auth.sessions VALUES($1,$2,now()-interval '1 minute')", [
    session,
    user,
  ]);
  await db.exec("SET ROLE service_role");
  await assert.rejects(save(), /Active delivery session/);
  await db.exec("RESET ROLE");
  await db.query("UPDATE auth.sessions SET not_after=NULL WHERE id=$1", [session]);
  await db.exec("SET ROLE service_role");
  const approved = (await save()).rows[0].id;
  assert.equal((await save()).rows[0].id, approved);
  await db.exec("RESET ROLE");
  await db.query("DELETE FROM auth.sessions WHERE id=$1", [session]);
  await db.exec("SET ROLE service_role");
  await assert.rejects(save(), /Active delivery session/);
  await db.exec("SET ROLE authenticated");
  await assert.rejects(save(), /permission denied/);
});
async function setup(t) {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;
 CREATE SCHEMA auth; CREATE TABLE auth.users(id uuid PRIMARY KEY);
 CREATE TABLE auth.sessions(id uuid PRIMARY KEY,user_id uuid REFERENCES auth.users(id),not_after timestamptz);
 CREATE TABLE public.projects(id uuid PRIMARY KEY);
 CREATE TABLE public.user_roles(user_id uuid,role text);
 INSERT INTO public.user_roles VALUES('${user}','admin');
 INSERT INTO auth.users VALUES('${user}'); INSERT INTO public.projects VALUES('${project}'),('${other}');`);
  await db.exec(migration);
  await db.exec(
    await readFile(
      new URL(
        "../supabase/migrations/20261012101334_authenticated_delivery_approval.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.exec(
    await readFile(
      new URL(
        "../supabase/migrations/20261012101923_delivery_review_artifacts.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.exec(
    await readFile(
      new URL("../supabase/migrations/20261012102546_publish_delivery_review.sql", import.meta.url),
      "utf8",
    ),
  );
  await db.exec(
    await readFile(
      new URL(
        "../supabase/migrations/20261012103020_delivery_session_verification.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.exec(
    "GRANT SELECT ON public.user_roles TO service_role; GRANT SELECT,UPDATE ON public.projects TO service_role; SET ROLE service_role",
  );
  return db;
}

async function authenticatedApproval(db, id, hash = digest) {
  return db.query("SELECT public.approve_delivery_revision($1,$2,$3,$4) id", [
    project,
    user,
    id,
    hash,
  ]);
}

test("session lookup rejects missing, other-user, expired and signed-out sessions", async (t) => {
  const db = await setup(t);
  const session = "00000000-0000-4000-8000-000000000004";
  const active = async (id = user) =>
    (await db.query("SELECT public.delivery_session_active($1,$2) active", [id, session])).rows[0]
      .active;
  assert.equal(await active(), false);
  await db.exec(
    `RESET ROLE; INSERT INTO auth.sessions VALUES('${session}','${user}',NULL); SET ROLE service_role`,
  );
  assert.equal(await active(), true);
  assert.equal(await active(other), false);
  await db.exec(
    "RESET ROLE; UPDATE auth.sessions SET not_after=now()-interval '1 second'; SET ROLE service_role",
  );
  assert.equal(await active(), false);
  await db.exec("RESET ROLE; DELETE FROM auth.sessions; SET ROLE service_role");
  assert.equal(await active(), false);
  for (const role of ["anon", "authenticated"]) {
    await db.exec(`RESET ROLE; SET ROLE ${role}`);
    await assert.rejects(active(), /permission denied/);
    await assert.rejects(db.query("SELECT * FROM auth.sessions"), /permission denied/);
  }
});

test("publication is atomic, admin-only and retry-safe without overwriting a newer version", async (t) => {
  const db = await setup(t);
  const publish = (text = reviewText, expected = 0, kind = "proposal", commit = null) =>
    db.query("SELECT public.publish_delivery_review($1,$2,$3,$4,$5,$6) id", [
      project,
      user,
      kind,
      text,
      commit,
      expected,
    ]);
  const first = (await publish()).rows[0].id;
  assert.equal((await publish()).rows[0].id, first);
  await assert.rejects(publish("Changed content", 0), /Review changed/);
  const second = (await publish("Changed content", 1)).rows[0].id;
  assert.notEqual(second, first);
  await assert.rejects(publish(reviewText, 0), /Review changed/);
  await assert.rejects(publish(reviewText, 0, "preview"), /check constraint/);
  assert.equal(
    (await db.query("SELECT count(*)::int n FROM public.delivery_revisions WHERE kind='preview'"))
      .rows[0].n,
    0,
  );
  await db.exec("RESET ROLE; DELETE FROM public.user_roles; SET ROLE service_role");
  await assert.rejects(publish("Other content", 2), /Administrator required/);
});

test("artifact failure rolls publication back and a retry creates one complete version", async (t) => {
  const db = await setup(t);
  await db.exec(
    "RESET ROLE; CREATE FUNCTION public.fail_artifact() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'Injected artifact failure'; END; $$; CREATE TRIGGER fail_artifact BEFORE INSERT ON public.delivery_review_artifacts FOR EACH ROW EXECUTE FUNCTION public.fail_artifact(); SET ROLE service_role",
  );
  const publish = () =>
    db.query("SELECT public.publish_delivery_review($1,$2,'proposal',$3,NULL,0) id", [
      project,
      user,
      reviewText,
    ]);
  await assert.rejects(publish(), /Injected artifact failure/);
  assert.equal(
    (await db.query("SELECT count(*)::int n FROM public.delivery_revisions")).rows[0].n,
    0,
  );
  await db.exec(
    "RESET ROLE; DROP TRIGGER fail_artifact ON public.delivery_review_artifacts; SET ROLE service_role",
  );
  await publish();
  assert.equal(
    (await db.query("SELECT count(*)::int n FROM public.delivery_review_artifacts")).rows[0].n,
    1,
  );
});
test("server approval requires active project access and exact current content", async (t) => {
  const db = await setup(t);
  const id = await revision(db);
  await assert.rejects(authenticatedApproval(db, id), /access denied/);
  await db.query("INSERT INTO public.delivery_project_access(project_id,user_id) VALUES($1,$2)", [
    project,
    user,
  ]);
  await assert.rejects(authenticatedApproval(db, id, "c".repeat(64)), /Revision mismatch/);
  const approved = (await authenticatedApproval(db, id)).rows[0].id;
  assert.equal((await authenticatedApproval(db, id)).rows[0].id, approved);
  assert.equal(
    (await db.query("SELECT count(*)::int n FROM public.delivery_identity_evidence")).rows[0].n,
    1,
  );
  await revision(db, 2);
  await assert.rejects(authenticatedApproval(db, id), /superseded/);
  await db.query("UPDATE public.delivery_project_access SET active=false");
  await assert.rejects(authenticatedApproval(db, id), /access denied/);
});
test("ordinary users cannot invoke approval with a forged user ID", async (t) => {
  const db = await setup(t);
  const id = await revision(db);
  for (const role of ["anon", "authenticated"]) {
    await db.exec(`RESET ROLE; SET ROLE ${role}`);
    await assert.rejects(authenticatedApproval(db, id), /permission denied/);
  }
});
async function revision(db, number = 1) {
  const id = (
    await db.query(
      "INSERT INTO public.delivery_revisions(project_id,kind,revision,content_sha256,source_commit) VALUES($1,'preview',$2,$3,$4) RETURNING id",
      [project, number, digest, "b".repeat(40)],
    )
  ).rows[0].id;
  await db.query(
    "INSERT INTO public.delivery_review_artifacts(revision_id,content_sha256,review_text) VALUES($1,$2,$3)",
    [id, digest, reviewText],
  );
  return id;
}

test("review reads only current member content and rejects altered artifacts", async (t) => {
  const db = await setup(t);
  const id = await revision(db);
  const read = () =>
    db.query("SELECT * FROM public.get_delivery_review($1,$2,'preview')", [project, user]);
  assert.equal((await read()).rows.length, 0);
  await db.query("INSERT INTO public.delivery_project_access(project_id,user_id) VALUES($1,$2)", [
    project,
    user,
  ]);
  assert.equal((await read()).rows[0].review_text, reviewText);
  await db.query(
    "INSERT INTO public.delivery_revisions(project_id,kind,revision,content_sha256,source_commit) VALUES($1,'preview',2,$2,$3)",
    [project, digest, "b".repeat(40)],
  );
  assert.equal((await read()).rows.length, 0);
  await assert.rejects(
    db.query(
      "INSERT INTO public.delivery_review_artifacts(revision_id,content_sha256,review_text) SELECT id,content_sha256,'altered' FROM public.delivery_revisions WHERE revision=2",
    ),
    /check constraint/,
  );
  const next = (await db.query("SELECT id FROM public.delivery_revisions WHERE revision=2")).rows[0]
    .id;
  await assert.rejects(authenticatedApproval(db, next), /artifact required/);
  assert.equal(
    (await db.query("SELECT count(*)::int n FROM public.delivery_identity_evidence")).rows[0].n,
    0,
  );
  await assert.rejects(
    db.query(
      "UPDATE public.delivery_review_artifacts SET review_text='altered' WHERE revision_id=$1",
      [id],
    ),
    /permission denied/,
  );
});
async function identity(db, owner = project) {
  return (
    await db.query(
      "INSERT INTO public.delivery_identity_evidence(project_id,user_id) VALUES($1,$2) RETURNING id",
      [owner, user],
    )
  ).rows[0].id;
}
async function approve(db, id, evidence, owner = project) {
  return db.query(
    "INSERT INTO public.delivery_approvals(revision_id,project_id,approver_user_id,identity_evidence_id) VALUES($1,$2,$3,$4)",
    [id, owner, user, evidence],
  );
}
test("approval stays attached to the exact version; a new preview is unapproved", async (t) => {
  const db = await setup(t);
  const first = await revision(db);
  const evidence = await identity(db);
  await approve(db, first, evidence);
  const next = await revision(db, 2);
  assert.equal(
    (
      await db.query("SELECT count(*)::int n FROM public.delivery_approvals WHERE revision_id=$1", [
        next,
      ])
    ).rows[0].n,
    0,
  );
  await assert.rejects(approve(db, first, evidence), /unique/);
});
test("approval cannot cross project boundaries or use another project's identity evidence", async (t) => {
  const db = await setup(t);
  const id = await revision(db);
  const evidence = await identity(db);
  await assert.rejects(approve(db, id, evidence, other), /foreign key/);
  await assert.rejects(approve(db, id, await identity(db, other)), /foreign key/);
});
test("preview evidence requires a complete source commit and content digest", async (t) => {
  const db = await setup(t);
  await assert.rejects(
    db.query(
      "INSERT INTO public.delivery_revisions(project_id,kind,revision,content_sha256) VALUES($1,'preview',1,$2)",
      [project, "a".repeat(64)],
    ),
    /check constraint/,
  );
  await assert.rejects(
    db.query(
      "INSERT INTO public.delivery_revisions(project_id,kind,revision,content_sha256) VALUES($1,'proposal',1,'fake')",
      [project],
    ),
    /check constraint/,
  );
});
test("browser roles cannot read or approve and service records cannot be rewritten", async (t) => {
  const db = await setup(t);
  const id = await revision(db);
  const evidence = await identity(db);
  await approve(db, id, evidence);
  for (const table of ["delivery_revisions", "delivery_approvals", "delivery_identity_evidence"]) {
    await assert.rejects(db.query(`UPDATE public.${table} SET id=id`), /permission denied/);
    await assert.rejects(db.query(`DELETE FROM public.${table}`), /permission denied/);
  }
  for (const role of ["anon", "authenticated"]) {
    await db.exec(`RESET ROLE; SET ROLE ${role}`);
    await assert.rejects(approve(db, id, evidence), /permission denied/);
    await assert.rejects(db.query("SELECT * FROM public.delivery_approvals"), /permission denied/);
  }
});
