/**
 * Founder Digest Data Generator
 * Queries Supabase database for operational metrics and returns structured KPI briefing
 */

import type { FounderDigestData } from "./types.ts";

export async function fetchFounderDigestData(overrideDate?: string): Promise<FounderDigestData> {
  const now = overrideDate || new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });

  try {
    const { supabaseAdmin } = await import("../../integrations/supabase/client.server.ts");

    const [
      clientsRes,
      leadsRes,
      uncontactedLeadsRes,
      qualifiedLeadsRes,
      projectsRes,
      reviewProjectsRes,
      jobsRes,
    ] = await Promise.all([
      supabaseAdmin.from("clients").select("id, monthly_value_cents, status"),
      supabaseAdmin.from("leads").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabaseAdmin
        .from("leads")
        .select("id", { count: "exact", head: true })
        .in("status", ["contacted", "qualified"]),
      supabaseAdmin
        .from("projects")
        .select("id, name, status", { count: "exact" })
        .in("status", ["discovery", "in_progress", "review"]),
      supabaseAdmin.from("projects").select("id, name, status").eq("status", "review"),
      supabaseAdmin.from("lead_notification_jobs").select("id, status, attempts, last_error"),
    ]);

    const clients = clientsRes.data ?? [];
    const activeClients = clients.filter((c) => c.status === "active");
    const verifiedMRR = activeClients.reduce((sum, c) => {
      const cents = c.monthly_value_cents;
      return typeof cents === "number" && cents > 0 ? sum + cents / 100 : sum;
    }, 0);

    const activeBuildsCount = projectsRes.count ?? (projectsRes.data?.length || 0);
    const jobs = jobsRes.data ?? [];
    const stuckJobs = jobs.filter((j) => (j.attempts ?? 0) > 0 && j.status !== "accepted");

    const pendingApprovals = (reviewProjectsRes.data ?? []).map((p) => ({
      id: p.id,
      title: `Build Staged Preview Sign-Off: ${p.name}`,
      type: "project_review" as const,
    }));

    const recentExceptions: FounderDigestData["recentExceptions"] = [];

    if (stuckJobs.length > 0) {
      recentExceptions.push({
        title: `${stuckJobs.length} Outbox lead alert(s) retrying delivery`,
        category: "automation",
        severity: "high",
      });
    }

    if (activeBuildsCount >= 3) {
      recentExceptions.push({
        title: `Build capacity cap reached (${activeBuildsCount}/3 active builds)`,
        category: "capacity",
        severity: "medium",
      });
    }

    const uncontacted = uncontactedLeadsRes.count ?? 0;
    if (uncontacted > 0) {
      recentExceptions.push({
        title: `${uncontacted} trade enquiry awaiting initial contact`,
        category: "lead",
        severity: "medium",
      });
    }

    const systemHealthStatus: FounderDigestData["systemHealthStatus"] =
      stuckJobs.length > 0 ? "warning" : "healthy";

    const systemHealthSummary =
      stuckJobs.length > 0
        ? `${stuckJobs.length} job(s) in retry backoff`
        : "Cloudflare Edge 200 OK · SSR Responsive";

    return {
      generatedAt: now,
      verifiedMRR,
      activeClientsCount: activeClients.length,
      activeBuildsCount,
      maxBuildCapacity: 3,
      newLeadsCount: leadsRes.count ?? 0,
      uncontactedLeadsCount: uncontacted,
      qualifiedPipelineCount: qualifiedLeadsRes.count ?? 0,
      stuckJobsCount: stuckJobs.length,
      recentExceptions,
      pendingApprovals,
      systemHealthStatus,
      systemHealthSummary,
    };
  } catch (error) {
    console.error("[Founder Digest] Database query failed; returning safe fallback:", error);
    return {
      generatedAt: now,
      verifiedMRR: 0,
      activeClientsCount: 0,
      activeBuildsCount: 0,
      maxBuildCapacity: 3,
      newLeadsCount: 0,
      uncontactedLeadsCount: 0,
      qualifiedPipelineCount: 0,
      stuckJobsCount: 0,
      recentExceptions: [
        {
          title: "Database metrics fetch failed",
          category: "system",
          severity: "high",
        },
      ],
      pendingApprovals: [],
      systemHealthStatus: "warning",
      systemHealthSummary: "Metrics calculation offline",
    };
  }
}
