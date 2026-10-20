import { publicWebsiteRoutes, siteConfig } from "@/lib/site-config";
import type { TablesInsert } from "@/integrations/supabase/types";

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

export type DiagnosticTaskPayload = Omit<
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

export function toDiagnosticTaskPayload(check: WebsiteDiagnostic): DiagnosticTaskPayload {
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

export function extractSitemapPath(value: string): string {
  try {
    const parsed = new URL(value);
    const path = parsed.pathname.replace(/\/+$/, "");
    return path === "" ? "/" : path;
  } catch {
    const cleaned = value.replace(/^https?:\/\/[^/]+/i, "").replace(/\/+$/, "");
    return cleaned === "" ? "/" : cleaned;
  }
}

export async function fetchSitemapEntries(baseUrl: string): Promise<Set<string>> {
  try {
    const response = await fetch(`${baseUrl}/sitemap.xml`, {
      headers: { "user-agent": "THG-Control-Centre-Diagnostics/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return new Set<string>();
    const xml = await response.text();
    return new Set(
      Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/gi)).map((match) =>
        extractSitemapPath(match[1] ?? ""),
      ),
    );
  } catch {
    return new Set<string>();
  }
}

export function hasRouteLink(html: string, path: string, baseUrl?: string) {
  const escapedPath = escapeRegExp(path);
  const base = baseUrl || siteConfig.url;
  return new RegExp(
    `href=["'](?:${escapeRegExp(base)})?${escapedPath}/?(?:[?#][^"']*)?["']`,
    "i",
  ).test(html);
}

export function hasContactForm(html: string) {
  return ["name", "email", "message"].every((field) =>
    new RegExp(`name=["']${field}["']`, "i").test(html),
  );
}

export function matchContent(html: string, pattern: RegExp) {
  return pattern.exec(html)?.[1]?.replace(/\s+/g, " ").trim() || null;
}

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function diagnosticMessage({
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

export async function runWebsiteDiagnostics(baseUrl?: string): Promise<WebsiteDiagnostic[]> {
  const effectiveBase = (baseUrl || siteConfig.url).replace(/\/+$/, "");
  const checkedAt = new Date().toISOString();
  const sitemapEntries = await fetchSitemapEntries(effectiveBase);

  return Promise.all(
    publicWebsiteRoutes.map(async (route) => {
      const url = `${effectiveBase}${route.path === "/" ? "" : route.path}`;
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
          route.path === route.leadCapturePath ||
          hasRouteLink(html, route.leadCapturePath, effectiveBase);
        const hasLeadForm = route.path === route.leadCapturePath ? hasContactForm(html) : null;
        const normalizedRoutePath = route.path === "/" ? "/" : route.path.replace(/\/+$/, "");
        const hasSitemapEntry = sitemapEntries.has(normalizedRoutePath);
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
        const normalizedRoutePath = route.path === "/" ? "/" : route.path.replace(/\/+$/, "");
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
          hasSitemapEntry: sitemapEntries.has(normalizedRoutePath),
          message: error instanceof Error ? error.message : "Route check failed",
        };
      }
    }),
  );
}
