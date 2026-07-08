import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
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
  status: "ok" | "warning" | "error";
  httpStatus: number | null;
  title: string | null;
  description: string | null;
  canonical: string | null;
  hasCanonical: boolean;
  hasDescription: boolean;
  hasLegacyEmail: boolean;
  checkedAt: string;
  message: string;
};

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

    const checkedAt = new Date().toISOString();
    return Promise.all(
      publicWebsiteRoutes.map(async (route) => {
        const url = `${siteConfig.url}${route.path === "/" ? "" : route.path}`;
        try {
          const response = await fetch(url, {
            headers: { "user-agent": "THG-Control-Centre-Diagnostics/1.0" },
            signal: AbortSignal.timeout(8000),
          });
          const html = await response.text();
          const title = matchContent(html, /<title[^>]*>(.*?)<\/title>/i);
          const description = matchContent(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)
            ?? matchContent(html, /<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
          const canonical = matchContent(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i)
            ?? matchContent(html, /<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
          const hasLegacyEmail = html.includes("hello@thg.digital");
          const hasCanonical = Boolean(canonical);
          const hasDescription = Boolean(description);
          const status = !response.ok
            ? "error"
            : !hasCanonical || !hasDescription || hasLegacyEmail
              ? "warning"
              : "ok";

          return {
            path: route.path,
            label: route.label,
            url,
            adminPath: route.adminPath,
            adminLabel: route.adminLabel,
            status,
            httpStatus: response.status,
            title,
            description,
            canonical,
            hasCanonical,
            hasDescription,
            hasLegacyEmail,
            checkedAt,
            message: diagnosticMessage(response.status, hasCanonical, hasDescription, hasLegacyEmail),
          };
        } catch (error) {
          return {
            path: route.path,
            label: route.label,
            url,
            adminPath: route.adminPath,
            adminLabel: route.adminLabel,
            status: "error",
            httpStatus: null,
            title: null,
            description: null,
            canonical: null,
            hasCanonical: false,
            hasDescription: false,
            hasLegacyEmail: false,
            checkedAt,
            message: error instanceof Error ? error.message : "Route check failed",
          };
        }
      }),
    );
  });

function matchContent(html: string, pattern: RegExp) {
  return pattern.exec(html)?.[1]?.replace(/\s+/g, " ").trim() || null;
}

function diagnosticMessage(httpStatus: number, hasCanonical: boolean, hasDescription: boolean, hasLegacyEmail: boolean) {
  if (httpStatus < 200 || httpStatus >= 400) return `HTTP ${httpStatus}`;
  const issues = [
    !hasCanonical ? "missing canonical" : null,
    !hasDescription ? "missing description" : null,
    hasLegacyEmail ? "legacy thg.digital email found" : null,
  ].filter(Boolean);
  return issues.length > 0 ? issues.join(", ") : "Healthy";
}
