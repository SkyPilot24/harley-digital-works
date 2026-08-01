import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { TablesInsert } from "@/integrations/supabase/types";
import { publicWebsiteRoutes, siteConfig } from "@/lib/site-config";

export type AuthTrigger = {
  trigger_name: string;
  function_name: string;
  enabled: boolean;
  timing: string;
  event: string;
};

export type WebsiteDiagnostic = {
  path: string;
  label: string;
  url: string;
  adminPath: string;
  adminLabel: string;
  owner: string;
  diagnosticGroup: string;
  leadCapturePath: string;
  routePriority: "High" | "Medium" | "Low";
  status: "ok" | "warning" | "error";
  httpStatus: number | null;
  title: string | null;
  description: string | null;
  canonical: string | null;
  hasCanonical: boolean;
  hasDescription: boolean;
  hasLegacyEmail: boolean;
  hasLeadCaptureLink: boolean;
  hasLeadForm: boolean | null;
  hasSitemapEntry: boolean;
  checkedAt: string;
  message: string;
};

export type DiagnosticTaskResult = {
  created: number;
  skipped: number;
  checked: number;
  message: string;
};

type DiagnosticTaskPayload = Omit<
  Pick<
    TablesInsert<"revenue_os_tasks">,
    | "title"
    | "category"
    | "priority"
    | "due_date"
    | "source_asset_id"
    | "source_asset_name"
    | "done"
  >,
  "source_asset_name"
> & {
  source_asset_name: string;
};

const LEGACY_CONTACT_EMAILS = ["hello@thg.digital", "hello@theharleygroup.org"];

async function requireAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: role, error: roleErr } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (roleErr) throw new Error(roleErr.message);
  if (!role) throw new Response("Forbidden", { status: 403 });
}

export const getAuthUserTriggers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AuthTrigger[]> => {
    await requireAdmin(context.userId);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.rpc("get_auth_user_triggers");
    if (error) throw new Error(error.message);
    return (data ?? []) as AuthTrigger[];
  });

export const getWebsiteDiagnostics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<WebsiteDiagnostic[]> => {
    await requireAdmin(context.userId);
    return runWebsiteDiagnostics();
  });

export const createWebsiteDiagnosticTasks = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<DiagnosticTaskResult> => {
    await requireAdmin(context.userId);

    const diagnostics = await runWebsiteDiagnostics();
    const actionable = diagnostics.filter((check) => check.status !== "ok");
    if (actionable.length === 0) {
      return {
        created: 0,
        skipped: 0,
        checked: diagnostics.length,
        message: "No website diagnostic tasks needed.",
      };
    }

    const candidateTasks = actionable.map(toDiagnosticTaskPayload);
    const sourceNames = candidateTasks.map((task) => task.source_asset_name);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing, error: existingError } = await supabaseAdmin
      .from("revenue_os_tasks")
      .select("title, source_asset_name")
      .eq("done", false)
      .eq("category", "Revenue OS")
      .in("source_asset_name", sourceNames);
    if (existingError) throw new Error(existingError.message);

    const existingKeys = new Set(
      (existing ?? []).map((task) => `${task.source_asset_name}::${task.title}`),
    );
    const newTasks = candidateTasks.filter(
      (task) => !existingKeys.has(`${task.source_asset_name}::${task.title}`),
    );
    if (newTasks.length > 0) {
      const { error } = await supabaseAdmin.from("revenue_os_tasks").insert(newTasks);
      if (error) throw new Error(error.message);
    }

    const skipped = candidateTasks.length - newTasks.length;
    return {
      created: newTasks.length,
      skipped,
      checked: diagnostics.length,
      message: `Created ${newTasks.length} website diagnostic task${newTasks.length === 1 ? "" : "s"}${skipped ? `, skipped ${skipped} existing` : ""}.`,
    };
  });

async function runWebsiteDiagnostics(): Promise<WebsiteDiagnostic[]> {
  const checkedAt = new Date().toISOString();
  const sitemapEntries = await fetchSitemapEntries();

  return Promise.all(
    publicWebsiteRoutes.map(async (route) => {
      const url = `${siteConfig.url}${route.path === "/" ? "" : route.path}`;
      const baseDiagnostic = {
        path: route.path,
        label: route.label,
        url,
        adminPath: route.adminPath,
        adminLabel: route.adminLabel,
        owner: route.owner,
        diagnosticGroup: route.diagnosticGroup,
        leadCapturePath: route.leadCapturePath,
        routePriority: route.priority,
        checkedAt,
      };

      try {
        const response = await fetch(url, {
          headers: { "user-agent": "THG-Control-Centre-Diagnostics/1.0" },
          signal: AbortSignal.timeout(8000),
        });
        const html = await response.text();
        const title = matchContent(html, /<title[^>]*>(.*?)<\/title>/i);
        const description =
          matchContent(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ??
          matchContent(html, /<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
        const canonical =
          matchContent(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ??
          matchContent(html, /<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
        const hasLegacyEmail = LEGACY_CONTACT_EMAILS.some((email) => html.includes(email));
        const hasCanonical = Boolean(canonical);
        const hasDescription = Boolean(description);
        const hasLeadCaptureLink =
          route.path === route.leadCapturePath || hasRouteLink(html, route.leadCapturePath);
        const hasLeadForm = route.path === route.leadCapturePath ? hasContactForm(html) : null;
        const hasSitemapEntry = sitemapEntries.has(normalizeUrlForSitemap(url));
        const status = !response.ok
          ? "error"
          : !hasCanonical ||
              !hasDescription ||
              hasLegacyEmail ||
              !hasLeadCaptureLink ||
              hasLeadForm === false ||
              !hasSitemapEntry
            ? "warning"
            : "ok";

        return {
          ...baseDiagnostic,
          status,
          httpStatus: response.status,
          title,
          description,
          canonical,
          hasCanonical,
          hasDescription,
          hasLegacyEmail,
          hasLeadCaptureLink,
          hasLeadForm,
          hasSitemapEntry,
          message: diagnosticMessage({
            httpStatus: response.status,
            hasCanonical,
            hasDescription,
            hasLegacyEmail,
            hasLeadCaptureLink,
            hasLeadForm,
            hasSitemapEntry,
          }),
        };
      } catch (error) {
        return {
          ...baseDiagnostic,
          status: "error",
          httpStatus: null,
          title: null,
          description: null,
          canonical: null,
          hasCanonical: false,
          hasDescription: false,
          hasLegacyEmail: false,
          hasLeadCaptureLink: false,
          hasLeadForm: route.path === route.leadCapturePath ? false : null,
          hasSitemapEntry: sitemapEntries.has(normalizeUrlForSitemap(url)),
          message: error instanceof Error ? error.message : "Route check failed",
        };
      }
    }),
  );
}

function toDiagnosticTaskPayload(check: WebsiteDiagnostic): DiagnosticTaskPayload {
  const dueDate = new Date();
  dueDate.setDate(
    dueDate.getDate() + (check.status === "error" || check.routePriority === "High" ? 1 : 3),
  );

  return {
    title: `Fix ${check.label} website diagnostic (${check.owner}): ${check.message}`,
    category: "Revenue OS",
    priority: check.status === "error" || check.routePriority === "High" ? "High" : "Medium",
    due_date: dueDate.toISOString().slice(0, 10),
    source_asset_id: null,
    source_asset_name: `Website diagnostics: ${check.diagnosticGroup} / ${check.path} -> ${check.leadCapturePath}`,
    done: false,
  };
}

async function fetchSitemapEntries() {
  try {
    const response = await fetch(`${siteConfig.url}/sitemap.xml`, {
      headers: { "user-agent": "THG-Control-Centre-Diagnostics/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return new Set<string>();
    const xml = await response.text();
    return new Set(
      Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/gi)).map((match) =>
        normalizeUrlForSitemap(match[1] ?? ""),
      ),
    );
  } catch {
    return new Set<string>();
  }
}

function normalizeUrlForSitemap(value: string) {
  return value.replace(/\/$/, "");
}

function hasRouteLink(html: string, path: string) {
  const escapedPath = escapeRegExp(path);
  return new RegExp(
    `href=["'](?:${escapeRegExp(siteConfig.url)})?${escapedPath}/?(?:[?#][^"']*)?["']`,
    "i",
  ).test(html);
}

function hasContactForm(html: string) {
  return ["name", "email", "message"].every((field) =>
    new RegExp(`name=["']${field}["']`, "i").test(html),
  );
}

function matchContent(html: string, pattern: RegExp) {
  return pattern.exec(html)?.[1]?.replace(/\s+/g, " ").trim() || null;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function diagnosticMessage({
  httpStatus,
  hasCanonical,
  hasDescription,
  hasLegacyEmail,
  hasLeadCaptureLink,
  hasLeadForm,
  hasSitemapEntry,
}: {
  httpStatus: number;
  hasCanonical: boolean;
  hasDescription: boolean;
  hasLegacyEmail: boolean;
  hasLeadCaptureLink: boolean;
  hasLeadForm: boolean | null;
  hasSitemapEntry: boolean;
}) {
  if (httpStatus < 200 || httpStatus >= 400) return `HTTP ${httpStatus}`;
  const issues = [
    !hasCanonical ? "missing canonical" : null,
    !hasDescription ? "missing description" : null,
    hasLegacyEmail ? "legacy contact email found" : null,
    !hasLeadCaptureLink ? "missing lead-capture link" : null,
    hasLeadForm === false ? "contact form fields missing" : null,
    !hasSitemapEntry ? "missing sitemap entry" : null,
  ].filter(Boolean);
  return issues.length > 0 ? issues.join(", ") : "Healthy";
}
