import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "./admin.index";
import {
  BookOpen,
  Search,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Sparkles,
  Zap,
  FileText,
  Users,
  ShieldCheck,
  Globe,
  MessageSquare,
  Building2,
  Cpu,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/knowledge-base")({
  component: KnowledgeBasePage,
});

export type GuideCategory =
  | "all"
  | "sales"
  | "onboarding"
  | "care"
  | "tools"
  | "partners"
  | "tech"
  | "group";

export interface KnowledgeArticle {
  id: string;
  category: GuideCategory;
  title: string;
  summary: string;
  badge: string;
  readTime: string;
  quickAction?: { label: string; to: string };
  steps: {
    title: string;
    description: string;
    tips?: string[];
  }[];
  faq?: { q: string; a: string }[];
}

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "proposals-closing",
    category: "sales",
    title: "How to Issue Interactive Client Proposals & Close Deals",
    summary:
      "Step-by-step procedure for generating bespoke trade proposals, configuring add-ons, and securing 50% upfront deposits via the Interactive Proposal Desk.",
    badge: "Commercial Workflow",
    readTime: "3 min read",
    quickAction: { label: "Open Proposal Desk", to: "/proposals" },
    steps: [
      {
        title: "1. Gather Client Trade & Scope Requirements",
        description:
          "Open the Inbound Leads desk (/admin/leads). Review the prospective contractor's trade sector, target geography, existing website URL, and primary pain points (e.g. no Google presence, low-ticket boiler quotes).",
        tips: [
          "Check whether the client is a sole trader (£1,495 Launch Plan) or multi-van fleet (£2,995 Growth Plan).",
          "Identify if they need local SEO dominance or automated review capture as add-on modules.",
        ],
      },
      {
        title: "2. Generate Bespoke Proposal URL",
        description:
          "Navigate to /proposals. Configure the client's business name, trade category, selected package, and recommended add-ons (Care Plan Plus, Map-Pack Booster, Review Engine).",
        tips: [
          "Copy the unique client link and send via WhatsApp or email alongside a personalized 60-second voice note.",
        ],
      },
      {
        title: "3. Digital Sign-Off & Deposit Intake",
        description:
          "When the client reviews the interactive proposal and taps 'Accept & Sign', an automatic confirmation is dispatched. Collect the 50% deposit via bank transfer / Stripe to lock their 14-day build slot.",
      },
    ],
    faq: [
      {
        q: "Can clients customize their add-on modules on the live proposal?",
        a: "Yes! The interactive proposal allows clients to toggle modules dynamically and see real-time price adjustments before signing.",
      },
    ],
  },
  {
    id: "fourteen-day-delivery",
    category: "onboarding",
    title: "14-Day Delivery SLA: From Intake to Live Launch",
    summary:
      "The standardized operating protocol to execute a 100% done-for-you website launch in exactly 14 days without client homework.",
    badge: "Core Operations",
    readTime: "4 min read",
    quickAction: { label: "View Build Tracker", to: "/track" },
    steps: [
      {
        title: "Day 1-2: Fast-Track Client Intake & Token Generation",
        description:
          "Client completes the 3-minute Onboarding Form (/onboarding). The system generates a dedicated tracking token (e.g., HDW-4921) and registers their project in /admin/projects.",
        tips: ["Verify domain DNS access or initiate domain registration via Domain OS."],
      },
      {
        title: "Day 3-5: Technical Copywriting & Wireframe Generation",
        description:
          "Generate high-converting trade sales copy using ContentFlow AI, calibrated to their specific accreditations (Gas Safe, NICEIC, FMB, CHAS).",
      },
      {
        title: "Day 6-9: High-Speed Web Build & Mobile Optimization",
        description:
          "Assemble responsive pages, interactive quote calculators, review booster widgets, and Google Map Pack schema.",
      },
      {
        title: "Day 10-12: Client 1-Click Review & Revisions",
        description:
          "Issue staging preview link. Execute any minor copy or photo adjustments within 24 hours.",
      },
      {
        title: "Day 13-14: DNS Switch, SSL & Google Search Console Verification",
        description:
          "Point A-records to Cloudflare edge isolates, verify SSL certs, submit sitemap to Google Search Console, and issue the final launch certificate.",
      },
    ],
  },
  {
    id: "care-desk-updates",
    category: "care",
    title: "Managing the £95/mo Care Desk & 1-Tap Client Requests",
    summary:
      "How to fulfill incoming client updates, maintenance tasks, automated weekly backups, and security patching.",
    badge: "Client Retention",
    readTime: "3 min read",
    quickAction: { label: "Open Care Desk", to: "/care-desk" },
    steps: [
      {
        title: "1. Monitor Care Desk Queue",
        description:
          "Incoming client requests submitted via /care-desk appear with priority badges (Urgent, Standard, Content Update).",
      },
      {
        title: "2. 24-Hour Execution SLA",
        description:
          "Apply requested text changes, photo gallery uploads, team additions, or service price adjustments. Push to production with zero downtime.",
      },
      {
        title: "3. Automated Telemetry & Performance Reports",
        description:
          "Every month, dispatch the automated Google Core Web Vitals and security audit scorecard to the client.",
      },
    ],
  },
  {
    id: "partner-referral-program",
    category: "partners",
    title: "Trade Merchant & Accountant Referral Network Guide",
    summary:
      "Administering the £250 referral commission program for UK trade suppliers, electrical/plumbing wholesalers, and accountants.",
    badge: "Partner Channel",
    readTime: "3 min read",
    quickAction: { label: "View Partner Hub", to: "/partners" },
    steps: [
      {
        title: "1. Partner Recruitment & Wholesaler Outreach",
        description:
          "Connect with branch managers at electrical/plumbing merchants, trade tool suppliers, and construction accountants. Share the /partners portal.",
      },
      {
        title: "2. Issue Unique Partner Referral Code",
        description:
          "Assign custom partner tracking tokens. When their contractor members sign up for a Launch or Growth website, the referral is automatically attributed.",
      },
      {
        title: "3. Commission Payout Protocol",
        description:
          "Upon client project deposit confirmation, credit £250 to the partner's account via direct BACS transfer on the 1st of the following month.",
      },
    ],
  },
  {
    id: "local-seo-radar",
    category: "tools",
    title: "Operating the Local SEO Inspector & Google Review Booster",
    summary:
      "How to run free diagnostic audits for prospective contractors to demonstrate rank gaps and close sales.",
    badge: "Sales Engineering",
    readTime: "3 min read",
    quickAction: { label: "Local SEO Inspector", to: "/tools/seo-inspector" },
    steps: [
      {
        title: "1. Run Competitor Proximity Scan",
        description:
          "Enter prospect trade and town (e.g., 'Emergency Plumber Stockport') into /tools/seo-inspector to calculate Google Map Pack visibility score.",
      },
      {
        title: "2. Present Review Velocity Deficit",
        description:
          "Show how the Review Booster tool (/tools/review-booster) automates SMS review dispatch to capture 15-20 new 5-star Google reviews per month.",
      },
    ],
  },
  {
    id: "edge-ssr-tech-stack",
    category: "tech",
    title: "Technical Architecture: TanStack Start, Nitro & Edge Cloud",
    summary:
      "Comprehensive technical overview of the sub-50ms SSR edge stack, Cloudflare isolate compilation, and CI/CD pipelines.",
    badge: "Engineering Runbook",
    readTime: "5 min read",
    quickAction: { label: "System Diagnostics", to: "/admin/diagnostics" },
    steps: [
      {
        title: "1. Architecture Overview",
        description:
          "Built on TanStack Router + TanStack Start, bundled by Vite and served via Nitro with the 'cloudflare-module' preset for sub-30ms global TTFB.",
      },
      {
        title: "2. Verification Commands",
        description:
          "Run 'npm run typecheck' to verify zero TypeScript errors, followed by 'npm run build' to generate the Cloudflare worker bundle in .output/server/index.mjs.",
      },
    ],
  },
  {
    id: "the-harley-group-governance",
    category: "group",
    title: "The Harley Group Holding Governance & Harley Labs Protocol",
    summary:
      "Corporate brand architecture, executive operating standards, and research vector guidelines for group entities.",
    badge: "Governance",
    readTime: "4 min read",
    quickAction: { label: "Group Portal", to: "/the-harley-group" },
    steps: [
      {
        title: "1. Group Entity Structure",
        description:
          "The Harley Group Ltd oversees Harley Digital Works (commercial agency) and Harley Labs (R&D / Agentic Systems) under the executive direction of Dr Robbie Harley, MBA.",
      },
      {
        title: "2. Brand Compliance & Tone",
        description:
          "All public communications must maintain commercial clarity, zero jargon, and rigorous accountability.",
      },
    ],
  },
];

const CATEGORIES: { id: GuideCategory; label: string; icon: typeof BookOpen }[] = [
  { id: "all", label: "All Runbooks", icon: BookOpen },
  { id: "sales", label: "Sales & Proposals", icon: FileText },
  { id: "onboarding", label: "14-Day Delivery", icon: Zap },
  { id: "care", label: "Care Desk", icon: ShieldCheck },
  { id: "partners", label: "Trade Partners", icon: Users },
  { id: "tools", label: "SEO & Free Tools", icon: Globe },
  { id: "tech", label: "Tech Stack & Edge", icon: Cpu },
  { id: "group", label: "The Harley Group", icon: Building2 },
];

function KnowledgeBasePage() {
  const [selectedCat, setSelectedCat] = useState<GuideCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<KnowledgeArticle | null>(
    KNOWLEDGE_ARTICLES[0]
  );

  const filteredArticles = KNOWLEDGE_ARTICLES.filter((art) => {
    const matchesCat = selectedCat === "all" || art.category === selectedCat;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.steps.some(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Knowledge Base & How-To Runbooks"
        subtitle="Comprehensive operational guides, standard operating procedures (SOPs), and administration workflows for every module of The Harley Group platform."
      />

      {/* Top Search & Filter Bar */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SOPs, workflows, tools, or procedures..."
              className="w-full rounded-xl border border-ink/15 bg-background/50 pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>{filteredArticles.length} Operational Guides Available</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-ink/10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-ink text-white"
                    : "bg-ink/5 text-ink-muted hover:bg-ink/10 hover:text-ink"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Knowledge Viewer */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Article List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredArticles.map((art) => {
            const isSelected = activeArticle?.id === art.id;
            return (
              <button
                key={art.id}
                onClick={() => setActiveArticle(art)}
                className={`w-full text-left rounded-xl p-4 transition-all duration-200 border ${
                  isSelected
                    ? "bg-white border-primary ring-1 ring-primary shadow-sm"
                    : "bg-white/80 border-ink/10 hover:bg-white hover:border-ink/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-ink-muted">
                    {art.badge}
                  </span>
                  <span className="text-[11px] text-ink-muted">{art.readTime}</span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-ink leading-snug">
                  {art.title}
                </h4>
                <p className="mt-1 text-xs text-ink-muted line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs font-medium text-primary">
                  <span>View Full SOP</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </button>
            );
          })}

          {filteredArticles.length === 0 && (
            <div className="rounded-xl border border-dashed border-ink/20 bg-white p-8 text-center text-ink-muted">
              <HelpCircle className="mx-auto h-8 w-8 opacity-40" />
              <p className="mt-2 text-sm font-medium">No runbooks match your search</p>
              <p className="text-xs">Try searching for keywords like 'leads', 'proposals', or 'DNS'.</p>
            </div>
          )}
        </div>

        {/* Right Column: Active Article Detail */}
        <div className="lg:col-span-7">
          {activeArticle ? (
            <div className="rounded-2xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
                <div>
                  <span className="rounded-md bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-semibold border border-emerald-200">
                    {activeArticle.badge}
                  </span>
                  <span className="ml-2 text-xs text-ink-muted">
                    {activeArticle.readTime}
                  </span>
                </div>
                {activeArticle.quickAction && (
                  <Link
                    to={activeArticle.quickAction.to}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-white hover:bg-ink/85 transition-colors"
                  >
                    <span>{activeArticle.quickAction.label}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>

              <h2 className="mt-4 text-2xl font-bold text-ink">
                {activeArticle.title}
              </h2>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {activeArticle.summary}
              </p>

              {/* Step By Step Instructions */}
              <div className="mt-8 space-y-6">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted">
                  Standard Operating Steps
                </h3>
                {activeArticle.steps.map((step, idx) => (
                  <div key={step.title} className="rounded-xl border border-ink/10 bg-slate-50/70 p-5">
                    <h4 className="text-sm font-bold text-ink flex items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white text-[11px] font-mono">
                        {idx + 1}
                      </span>
                      {step.title}
                    </h4>
                    <p className="mt-2 text-xs md:text-sm text-ink-muted leading-relaxed pl-7">
                      {step.description}
                    </p>
                    {step.tips && step.tips.length > 0 && (
                      <div className="mt-3 pl-7 space-y-1.5">
                        {step.tips.map((tip) => (
                          <div key={tip} className="flex items-start gap-1.5 text-xs text-ink-muted">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* FAQs / Pro-tips */}
              {activeArticle.faq && activeArticle.faq.length > 0 && (
                <div className="mt-8 border-t border-ink/10 pt-6">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-muted mb-4">
                    Frequently Asked Questions & Edge Cases
                  </h3>
                  <div className="space-y-3">
                    {activeArticle.faq.map((item) => (
                      <div key={item.q} className="rounded-lg bg-ink/5 p-4 text-xs">
                        <p className="font-semibold text-ink">{item.q}</p>
                        <p className="mt-1 text-ink-muted leading-relaxed">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-ink/10 bg-white p-12 text-center text-ink-muted">
              Select an operational guide from the list to view its complete SOP.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
