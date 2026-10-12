import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const approvalSchema = z
  .object({
    projectId: z.string().uuid(),
    revisionId: z.string().uuid(),
    contentSha256: z.string().regex(/^[0-9a-f]{64}$/),
    confirmed: z.literal(true),
  })
  .strict();

export const approveDeliveryRevision = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => approvalSchema.parse(data))
  .handler(async ({ data, context }) => {
    if (process.env.DELIVERY_APPROVAL_ENABLED !== "true")
      throw new Response("Approval unavailable", { status: 503 });
    // Validate the user with Auth; never trust a submitted user ID.
    const { data: auth, error: authError } = await context.supabase.auth.getUser();
    if (authError || !auth.user || auth.user.id !== context.userId)
      throw new Response("Unauthorized", { status: 401 });
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const db = supabaseAdmin as unknown as SupabaseClient;
    const { requireDeliverySession } = await import("./delivery-session.server");
    const sessionId = await requireDeliverySession(db, auth.user.id, context.claims);
    const { data: approvalId, error } = await db.rpc("approve_delivery_revision_session", {
      p_project_id: data.projectId,
      p_user_id: auth.user.id,
      p_session_id: sessionId,
      p_revision_id: data.revisionId,
      p_content_sha256: data.contentSha256,
    });
    if (error || typeof approvalId !== "string")
      throw new Response("Approval could not be recorded", { status: 409 });
    return { approvalId, revisionId: data.revisionId };
  });

const accessSchema = z
  .object({
    projectId: z.string().uuid(),
    userId: z.string().uuid(),
    active: z.boolean(),
  })
  .strict();

const paymentLinkSchema = z
  .object({
    projectId: z.string().uuid(),
    sessionId: z
      .string()
      .min(4)
      .max(200)
      .regex(/^cs_[A-Za-z0-9_]+$/),
  })
  .strict();
export const bindPaymentProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => paymentLinkSchema.parse(data))
  .handler(async ({ data, context }) => {
    if (process.env.DELIVERY_APPROVAL_ENABLED !== "true")
      throw new Response("Payment linking unavailable", { status: 503 });
    const { data: auth, error: authError } = await context.supabase.auth.getUser();
    if (authError || !auth.user || auth.user.id !== context.userId)
      throw new Response("Unauthorized", { status: 401 });
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const db = supabaseAdmin as unknown as SupabaseClient;
    const { requireDeliverySession } = await import("./delivery-session.server");
    await requireDeliverySession(db, auth.user.id, context.claims);
    const { data: result, error } = await db.rpc("bind_payment_project", {
      p_session_id: data.sessionId,
      p_project_id: data.projectId,
      p_user_id: auth.user.id,
    });
    if (error || result !== "linked")
      throw new Response("Payment could not be linked", { status: 409 });
    return { projectId: data.projectId, sessionId: data.sessionId };
  });

const publicationSchema = z
  .object({
    projectId: z.string().uuid(),
    kind: z.enum(["proposal", "preview"]),
    reviewText: z.string().min(1).max(65536),
    sourceCommit: z
      .string()
      .regex(/^[0-9a-f]{40}$/)
      .nullable(),
    expectedRevision: z.number().int().min(0),
  })
  .strict()
  .refine(
    (data) => data.kind !== "preview" || data.sourceCommit !== null,
    "Preview source version is required",
  );

export const publishDeliveryReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => publicationSchema.parse(data))
  .handler(async ({ data, context }) => {
    if (process.env.DELIVERY_APPROVAL_ENABLED !== "true")
      throw new Response("Review unavailable", { status: 503 });
    const { data: auth, error: authError } = await context.supabase.auth.getUser();
    if (authError || !auth.user || auth.user.id !== context.userId)
      throw new Response("Unauthorized", { status: 401 });
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { requireDeliverySession } = await import("./delivery-session.server");
    await requireDeliverySession(
      supabaseAdmin as unknown as SupabaseClient,
      auth.user.id,
      context.claims,
    );
    const { data: revisionId, error } = await (supabaseAdmin as unknown as SupabaseClient).rpc(
      "publish_delivery_review",
      {
        p_project_id: data.projectId,
        p_user_id: auth.user.id,
        p_kind: data.kind,
        p_review_text: data.reviewText,
        p_source_commit: data.sourceCommit,
        p_expected_revision: data.expectedRevision,
      },
    );
    if (error || typeof revisionId !== "string")
      throw new Response("Review could not be published; reload and check your access", {
        status: 409,
      });
    return { revisionId };
  });

const reviewSchema = z
  .object({ projectId: z.string().uuid(), kind: z.enum(["proposal", "preview"]) })
  .strict();
const reviewResult = z.object({
  id: z.string().uuid(),
  kind: z.enum(["proposal", "preview"]),
  revision: z.number().int().positive(),
  content_sha256: z.string().regex(/^[0-9a-f]{64}$/),
  source_commit: z.string().nullable(),
  review_text: z.string().min(1).max(65536),
  approved: z.boolean(),
});

export const getAdminDeliveryReview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => reviewSchema.parse(data))
  .handler(async ({ data, context }) => {
    setResponseHeader("Cache-Control", "private, no-store");
    if (process.env.DELIVERY_APPROVAL_ENABLED !== "true")
      throw new Response("Review unavailable", { status: 503 });
    const { data: auth, error: authError } = await context.supabase.auth.getUser();
    if (authError || !auth.user || auth.user.id !== context.userId)
      throw new Response("Unauthorized", { status: 401 });
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const db = supabaseAdmin as unknown as SupabaseClient;
    const { requireDeliverySession } = await import("./delivery-session.server");
    await requireDeliverySession(db, auth.user.id, context.claims);
    const { data: role, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", auth.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (roleError || !role) throw new Response("Forbidden", { status: 403 });
    const { data: row, error } = await db
      .from("delivery_revisions")
      .select("id,revision,source_commit")
      .eq("project_id", data.projectId)
      .eq("kind", data.kind)
      .order("revision", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw new Response("Review unavailable", { status: 503 });
    if (!row) return { revision: 0, reviewText: "", sourceCommit: null as string | null };
    const { data: artifact, error: artifactError } = await db
      .from("delivery_review_artifacts")
      .select("review_text")
      .eq("revision_id", row.id)
      .maybeSingle();
    if (artifactError) throw new Response("Review unavailable", { status: 503 });
    return {
      revision: z.number().int().positive().parse(row.revision),
      reviewText: z.string().parse(artifact?.review_text ?? ""),
      sourceCommit: z.string().nullable().parse(row.source_commit),
    };
  });
export const getDeliveryReview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => reviewSchema.parse(data))
  .handler(async ({ data, context }) => {
    setResponseHeader("Cache-Control", "private, no-store");
    if (process.env.DELIVERY_APPROVAL_ENABLED !== "true")
      throw new Response("Review unavailable", { status: 503 });
    const { data: auth, error: authError } = await context.supabase.auth.getUser();
    if (authError || !auth.user || auth.user.id !== context.userId)
      throw new Response("Unauthorized", { status: 401 });
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { requireDeliverySession } = await import("./delivery-session.server");
    await requireDeliverySession(
      supabaseAdmin as unknown as SupabaseClient,
      auth.user.id,
      context.claims,
    );
    const { data: rows, error } = await (supabaseAdmin as unknown as SupabaseClient).rpc(
      "get_delivery_review",
      {
        p_project_id: data.projectId,
        p_user_id: auth.user.id,
        p_kind: data.kind,
      },
    );
    if (error) throw new Response("Review unavailable", { status: 503 });
    if (!Array.isArray(rows) || rows.length !== 1)
      throw new Response("Review unavailable", { status: 404 });
    return reviewResult.parse(rows[0]);
  });

export const setDeliveryProjectAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => accessSchema.parse(data))
  .handler(async ({ data, context }) => {
    if (process.env.DELIVERY_APPROVAL_ENABLED !== "true")
      throw new Response("Approval unavailable", { status: 503 });
    const { data: auth, error: authError } = await context.supabase.auth.getUser();
    if (authError || !auth.user || auth.user.id !== context.userId)
      throw new Response("Unauthorized", { status: 401 });
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { requireDeliverySession } = await import("./delivery-session.server");
    await requireDeliverySession(
      supabaseAdmin as unknown as SupabaseClient,
      auth.user.id,
      context.claims,
    );
    const { data: role, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", auth.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (roleError || !role) throw new Response("Forbidden", { status: 403 });
    const db = supabaseAdmin as unknown as SupabaseClient;
    // UUID foreign keys require an existing project and Auth user. Matching an
    // email address or inserting a client never grants customer project access.
    const { error } = await db.from("delivery_project_access").upsert(
      {
        project_id: data.projectId,
        user_id: data.userId,
        active: data.active,
      },
      { onConflict: "project_id,user_id" },
    );
    if (error) throw new Response("Project access could not be saved", { status: 409 });
    return { projectId: data.projectId, userId: data.userId, active: data.active };
  });
