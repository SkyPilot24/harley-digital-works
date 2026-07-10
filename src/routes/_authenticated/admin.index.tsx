import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  generateExecutionTasks,
  priorityScore,
  rankedRevenueAssets,
  revenueAssets,
} from "@/lib/revenue-os";
import { publicWebsiteRoutes, siteConfig, websiteAuditSuggestions } from "@/lib/site-config";
import {
  ArrowUpRight,
  Briefcase,
  ClipboardList,
  ExternalLink,
  Globe2,
  Inbox,
  TrendingUp,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: DashboardPage,
});
const socialPlatformStrategy = [
  {
    platform: "LinkedIn",
    role: "Primary sales and authority channel",
    guidance:
      "Use LinkedIn for useful posts, founder-led authority, warm conversations, and enquiries. This is where small business owners and community leaders are most likely to make buying decisions.",
  },
  {
    platform: "Instagram",
    role: "Credibility and visual proof channel",
    guidance:
      "Use Instagram to show the work: before/after website reveals, short videos, behind-the-scenes progress, domain highlights, and simple proof that the agency is active.",
  },
  {
    platform: "TikTok / YouTube Shorts",
    role: "Future optional channels",
    guidance:
      "Do not spread thin at launch. Add short-form video channels later, once LinkedIn and Instagram have a steady weekly rhythm.",
  },
] as const;

const contentIdeas = [
  "Website tips",
  "Before/after website reveals",
  "Founder story posts",
  "Client wins",
  "Common website mistakes",
  "Domain name highlights",
  "Behind-the-scenes content",
  "Rate my website prompts",
  "Educational carousel ideas",
] as const;

const weeklyPlanner = [
  {
    day: "Monday",
    type: "Authority post",
    prompt:
      "Name a problem your audience has, explain why it matters, then show the simple fix you offer.",
  },
  {
    day: "Wednesday",
    type: "Value post",
    prompt: "Share a tip, checklist, mistake, tutorial, or carousel someone can use immediately.",
  },
  {
    day: "Friday",
    type: "Personal/story post",
    prompt:
      "Show the person behind the work: process, lessons learned, client win, community story, or behind the scenes.",
  },
] as const;

const launchTemplates = [
  {
    title: "Launch post",
    template:
      "Introducing [business name]. We help [audience] with [offer] so they can [outcome]. If your current [website/content/workflow] is holding you back, send a message or book a call.",
  },
  {
    title: "Problem post",
    template:
      "Most [audience] websites have the same problem: [problem 1], [problem 2], and [problem 3]. The fix is simpler than it looks: [solution]. Want a quick view on yours? Drop the link.",
  },
  {
    title: "Value carousel",
    template:
      "Carousel idea: 5 signs your website is losing enquiries. End with: If any of these feel familiar, start with one clear page, one clear offer, and one clear next step.",
  },
  {
    title: "Credibility post",
    template:
      "Why work with a small specialist? You get direct attention, faster decisions, plain language, and a build shaped around what you actually need.",
  },
  {
    title: "Personal founder story",
    template:
      "I started [business name] because I kept seeing [audience] struggle with [problem]. The skill was there. The service was there. The digital presence was not. That is the gap we fill.",
  },
] as const;

const profileSetup = [
  {
    title: "Instagram bio",
    guidance:
      "Keep it short: Websites. Domains. Content. Built with AI. Delivered fast. Add Bristol/UK location and one clear link to book a call.",
  },
  {
    title: "LinkedIn personal profile",
    guidance:
      "Use Robbie's profile as the primary sales asset. Headline should say who you help and what you build. Pin the website in Featured.",
  },
  {
    title: "LinkedIn company page",
    guidance:
      "Use a clear tagline, short about section, website link, Bristol location, THG logo, and invite relevant connections to follow.",
  },
  {
    title: "Story Highlights",
    guidance:
      "Create Highlights for Our Work, Services, Domains, and Book a Call so visitors can understand the offer quickly.",
  },
  {
    title: "Profile images",
    guidance:
      "Use a professional headshot for Robbie's personal LinkedIn profile. Use the THG logo mark for company and Instagram profiles.",
  },
] as const;

const engagementRules = [
  "Reply to every comment quickly, especially during the first 30 minutes after posting.",
  "Comment on 5 posts per day from small business owners, local brands, solo founders, and community leaders.",
  "Send friendly DMs to people who engage with launch or offer posts. Keep it helpful, not pushy.",
  "Never post and ghost. Stay online, reply, and engage with other people in the same window.",
] as const;

const contentPrompt = `Act as a social media strategist for a small business. Create 5 LinkedIn post ideas and 5 Instagram content ideas based on this business: [describe business]. Focus on content that builds trust, explains the offer clearly, and encourages enquiries. Format the output as a table with post type, topic, hook, caption idea, and CTA.`;

function DashboardPage() {
  const stats = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const [leads, newLeads, clients, activeClients, projects, inProgress] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("clients").select("id", { count: "exact", head: true }),
        supabase
          .from("clients")
          .select("id", { count: "exact", head: true })
          .eq("status", "active"),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase
          .from("projects")
          .select("id", { count: "exact", head: true })
          .eq("status", "in_progress"),
      ]);
      return {
        leads: leads.count ?? 0,
        newLeads: newLeads.count ?? 0,
        clients: clients.count ?? 0,
        activeClients: activeClients.count ?? 0,
        projects: projects.count ?? 0,
        inProgress: inProgress.count ?? 0,
      };
    },
  });

  const recent = useQuery({
    queryKey: ["admin", "recent-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("id, name, email, package, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  const s = stats.data;
  const revenueAssetList = rankedRevenueAssets(revenueAssets);
  const topAsset = revenueAssetList[0];
  const generatedTasks = generateExecutionTasks(revenueAssetList, 5);
  const pipelineTarget = revenueAssetList.reduce((sum, asset) => sum + asset.targetRevenue, 0);
  const highPriorityRoutes = publicWebsiteRoutes.filter(
    (route) => route.priority === "High",
  ).length;

  return (
    <div>
      <PageHeader
        title="Control Centre"
        subtitle="The command layer for revenue, delivery, content, domains, daily execution, and the live website."
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="rounded-2xl border border-ink/10 bg-ink p-6 text-white">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-[12px] uppercase tracking-[0.22em] text-white/50">
                Revenue command centre
              </div>
              <h2 className="mt-2 text-2xl font-semibold">{topAsset.name}</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">{topAsset.nextAction}</p>
            </div>
            <Link
              to="/admin/revenue-os"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-white/90"
            >
              Open Revenue OS
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <CommandMetric label="Priority score" value={`${priorityScore(topAsset.scores)}/35`} />
            <CommandMetric label="Pipeline target" value={`£${pipelineTarget.toLocaleString()}`} />
            <CommandMetric label="Generated tasks" value={generatedTasks.length} />
          </div>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-ink p-2 text-white">
              <Globe2 size={18} />
            </div>
            <div>
              <div className="text-[12px] uppercase tracking-[0.2em] text-ink-muted">
                Live website
              </div>
              <h2 className="mt-1 text-xl font-semibold text-ink">{siteConfig.domain}</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Public routes now have admin owners, revenue roles, and next actions inside the
                Control Centre.
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <CommandMetricLight label="Mapped routes" value={publicWebsiteRoutes.length} />
            <CommandMetricLight label="High priority" value={highPriorityRoutes} />
          </div>
          <a
            href={siteConfig.canonicalUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink hover:bg-ink/5"
          >
            Open live site <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Inbox}
          label="New leads"
          value={s?.newLeads ?? "—"}
          sub={`${s?.leads ?? 0} total`}
        />
        <StatCard
          icon={Users}
          label="Active clients"
          value={s?.activeClients ?? "—"}
          sub={`${s?.clients ?? 0} total`}
        />
        <StatCard
          icon={Briefcase}
          label="Projects in progress"
          value={s?.inProgress ?? "—"}
          sub={`${s?.projects ?? 0} total`}
        />
        <StatCard
          icon={TrendingUp}
          label="Conversion"
          value={s ? `${s.leads ? Math.round((s.activeClients / s.leads) * 100) : 0}%` : "—"}
          sub="leads to clients"
        />
      </div>

      <SocialMediaContentGuide />

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">Public website operations</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Every public route has an admin owner, revenue role, and next action.
            </p>
          </div>
          <a
            href={siteConfig.canonicalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink underline underline-offset-4"
          >
            View website <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {publicWebsiteRoutes.map((route) => (
            <div key={route.path} className="rounded-xl border border-ink/10 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-ink">{route.label}</h3>
                    <StatusBadge status={route.priority.toLowerCase()} />
                  </div>
                  <p className="mt-1 font-mono text-xs text-ink-muted">{route.path}</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Owner: {route.owner} | Group: {route.diagnosticGroup} | Lead:{" "}
                    {route.leadCapturePath}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`${siteConfig.url}${route.path === "/" ? "" : route.path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink hover:bg-ink/5"
                  >
                    View
                  </a>
                  <Link
                    to={route.adminPath as "/admin"}
                    className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-white hover:bg-ink/90"
                  >
                    {route.adminLabel}
                  </Link>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink/75">{route.revenueRole}</p>
              <p className="mt-2 text-sm text-ink-muted">Next: {route.nextAction}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-ink">Website audit actions</h2>
            <Link
              to="/admin/revenue-os"
              className="text-sm font-medium text-ink underline underline-offset-4"
            >
              Turn into tasks
            </Link>
          </div>
          <div className="space-y-3">
            {websiteAuditSuggestions.map((suggestion) => (
              <div key={suggestion.title} className="rounded-xl border border-ink/10 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-ink">{suggestion.title}</h3>
                  <StatusBadge status={suggestion.priority.toLowerCase()} />
                </div>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-muted">
                  Owner: {suggestion.owner}
                </p>
                <p className="mt-2 text-sm text-ink/75">{suggestion.action}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-ink">Recent leads</h2>
            <Link
              to="/admin/leads"
              className="text-sm font-medium text-ink underline underline-offset-4"
            >
              View all
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-ink/[0.03] text-left text-[12px] uppercase tracking-wider text-ink-muted">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Package</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Received</th>
                </tr>
              </thead>
              <tbody>
                {recent.data?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-ink-muted">
                      No leads yet. The Contact page is the intake path and submissions will appear
                      here.
                    </td>
                  </tr>
                )}
                {recent.data?.map((lead) => (
                  <tr key={lead.id} className="border-t border-ink/5">
                    <td className="px-4 py-3">
                      <div className="font-medium text-ink">{lead.name}</div>
                      <div className="text-xs text-ink-muted">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3 text-ink/70">{lead.package ?? "—"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-3 text-ink/60">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function SocialMediaContentGuide() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">Social Media Content Guide</h2>
          <p className="mt-1 max-w-3xl text-sm text-ink-muted">
            A weekly toolkit for planning posts, setting up profiles, generating ideas, and turning
            attention into useful conversations.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
          <ClipboardList size={14} /> Weekly content kit
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <GuidePanel title="Social Media Strategy">
          <div className="space-y-3">
            {socialPlatformStrategy.map((item) => (
              <div key={item.platform} className="rounded-xl bg-ink/[0.03] p-4">
                <div className="text-sm font-semibold text-ink">{item.platform}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-ink-muted">
                  {item.role}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{item.guidance}</p>
              </div>
            ))}
          </div>
        </GuidePanel>

        <GuidePanel title="Content Ideas Library">
          <div className="grid gap-2 sm:grid-cols-2">
            {contentIdeas.map((idea) => (
              <div
                key={idea}
                className="rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink/75"
              >
                {idea}
              </div>
            ))}
          </div>
        </GuidePanel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <GuidePanel title="Weekly Content Planner">
          <div className="space-y-3">
            {weeklyPlanner.map((item) => (
              <div key={item.day} className="rounded-xl border border-ink/10 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-ink">{item.day}</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-ink">
                    {item.type}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.prompt}</p>
              </div>
            ))}
          </div>
        </GuidePanel>

        <GuidePanel title="Social Media Profile Setup">
          <div className="space-y-3">
            {profileSetup.map((item) => (
              <div key={item.title} className="rounded-xl border border-ink/10 bg-white p-4">
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.guidance}</p>
              </div>
            ))}
          </div>
        </GuidePanel>

        <GuidePanel title="Engagement Rules">
          <ul className="space-y-3">
            {engagementRules.map((rule) => (
              <li key={rule} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                <span aria-hidden className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </GuidePanel>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <GuidePanel title="Launch Content Templates">
          <div className="grid gap-3 md:grid-cols-2">
            {launchTemplates.map((item) => (
              <div key={item.title} className="rounded-xl border border-ink/10 bg-white p-4">
                <div className="text-xs uppercase tracking-wider text-ink-muted">
                  Editable template
                </div>
                <h3 className="mt-1 font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{item.template}</p>
              </div>
            ))}
          </div>
        </GuidePanel>

        <GuidePanel title="Content Prompt Generator">
          <p className="text-sm leading-relaxed text-ink-muted">
            Copy this into ChatGPT when you need fresh LinkedIn and Instagram ideas for a client,
            campaign, or weekly planning session.
          </p>
          <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-ink p-4 text-xs leading-relaxed text-white/80">
            {contentPrompt}
          </pre>
        </GuidePanel>
      </div>
    </section>
  );
}

function GuidePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <h3 className="mb-4 text-base font-semibold text-ink">{title}</h3>
      {children}
    </div>
  );
}
export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function CommandMetric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/10 p-4">
      <div className="text-[11px] uppercase tracking-wider text-white/50">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function CommandMetricLight({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-ink/[0.03] p-4">
      <div className="text-[11px] uppercase tracking-wider text-ink-muted">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-ink">{value}</div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Inbox;
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5">
      <div className="flex items-center gap-2 text-ink-muted">
        <Icon size={14} />
        <span className="text-[12px] uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-3 text-3xl font-semibold text-ink">{value}</div>
      {sub && <div className="mt-1 text-xs text-ink-muted">{sub}</div>}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    high: "bg-rose-50 text-rose-700",
    medium: "bg-amber-50 text-amber-700",
    low: "bg-emerald-50 text-emerald-700",
    new: "bg-blue-50 text-blue-700",
    contacted: "bg-amber-50 text-amber-700",
    qualified: "bg-violet-50 text-violet-700",
    won: "bg-emerald-50 text-emerald-700",
    lost: "bg-rose-50 text-rose-700",
    active: "bg-emerald-50 text-emerald-700",
    paused: "bg-amber-50 text-amber-700",
    archived: "bg-neutral-100 text-neutral-600",
    lead: "bg-blue-50 text-blue-700",
    discovery: "bg-blue-50 text-blue-700",
    in_progress: "bg-amber-50 text-amber-700",
    review: "bg-violet-50 text-violet-700",
    launched: "bg-emerald-50 text-emerald-700",
    on_hold: "bg-neutral-100 text-neutral-600",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${map[status] ?? "bg-neutral-100 text-neutral-600"}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
