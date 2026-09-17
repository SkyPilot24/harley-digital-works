import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import {
  Building2,
  Cpu,
  Globe2,
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Briefcase,
  FileCheck2,
} from "lucide-react";

export const Route = createFileRoute("/the-harley-group")({
  head: () => ({
    meta: [
      { title: "The Harley Group | Parent Company Governance & Portfolio" },
      {
        name: "description",
        content:
          "The Harley Group oversees specialised digital, technology, and operating ventures including Harley Digital Works and Harley Labs, delivering institutional discipline and commercial clarity.",
      },
    ],
  }),
  component: TheHarleyGroupPage,
});

const VENTURES = [
  {
    name: "Harley Digital Works",
    badge: "Flagship Commercial Division",
    tagline: "Turnkey digital infrastructure & managed care for UK enterprise & trades.",
    description:
      "Delivering done-for-you website design, high-converting commercial copywriting, local SEO dominance, and full ongoing care plans for UK trades, contractors, and growing business operators.",
    metrics: ["14-Day Live Launch", "100% Done-For-You", "£95/mo Care Desk"],
    to: "/services",
    ctaLabel: "Explore Commercial Services",
    icon: Globe2,
    gradient: "from-emerald-950 via-teal-900 to-slate-900",
  },
  {
    name: "Harley Labs",
    badge: "R&D & Agentic Systems",
    tagline: "Autonomous AI workflows, edge architectures, and digital product ventures.",
    description:
      "Pioneering autonomous multi-agent systems, real-time edge telemetry, algorithmic SEO engines, and internal operating tools (Revenue OS, ContentFlow AI, Domain OS) that power high-efficiency operations.",
    metrics: ["Multi-Agent AI", "Sub-50ms Edge SSR", "Autonomous Telemetry"],
    to: "/labs",
    ctaLabel: "Explore Harley Labs",
    icon: Cpu,
    gradient: "from-slate-900 via-indigo-950 to-purple-950",
  },
];

const OPERATING_PILLARS = [
  {
    title: "Commercial Clarity",
    description:
      "Every project, software framework, and commercial asset must directly connect to tangible customer revenue, qualified lead flow, and operational efficiency.",
    icon: TrendingUp,
  },
  {
    title: "Institutional Rigour",
    description:
      "Enterprise-grade reliability, continuous automated backups, strict data compliance, and zero-downtime edge deployments applied uniformly across all group ventures.",
    icon: ShieldCheck,
  },
  {
    title: "Human Accountability",
    description:
      "Direct senior access, plain-English communication, transparent upfront pricing, and absolute ownership with no corporate transformation theatre.",
    icon: Award,
  },
];

const GOVERNANCE_RECORDS = [
  { label: "Parent Entity", value: "The Harley Group Ltd" },
  { label: "Jurisdiction", value: "England & Wales (United Kingdom)" },
  { label: "Corporate HQ", value: "Manchester, United Kingdom" },
  { label: "Core Operating Divisions", value: "Harley Digital Works & Harley Labs" },
  { label: "Regulatory Compliance", value: "GDPR, Cyber Essentials, ICO Registered" },
  { label: "Leadership", value: "Dr Robbie Harley, MBA (Managing Director)" },
];

function TheHarleyGroupPage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20 text-white md:pt-44 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.18),rgba(255,255,255,0))]" />
        <Container className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 backdrop-blur-md">
            <Building2 className="h-3.5 w-3.5" />
            <span>The Harley Group · Holding & Operating Company</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,5.5vw,4.8rem)] font-bold tracking-tight text-white leading-[1.05]">
            Disciplined Operating Standards &{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Long-Term Digital Value.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            The Harley Group oversees specialised digital, technology, and operating ventures,
            delivering institutional discipline, commercial clarity, and senior leadership to growing
            enterprises across the United Kingdom.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <PillButton as="link" to="/services" variant="light" size="md">
              Explore Portfolio
            </PillButton>
            <PillButton
              as="link"
              to="/contact"
              search={{ service: undefined, package: undefined, domain: undefined, websiteUrl: undefined }}
              variant="ghost"
              size="md"
              className="border-slate-700 bg-slate-900/60 text-white hover:bg-slate-800 hover:text-white"
            >
              Executive Enquiries
            </PillButton>
          </div>
        </Container>
      </section>

      {/* Portfolio Architecture */}
      <section className="py-20 md:py-28 bg-slate-900 text-white border-b border-slate-800">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Portfolio Structure
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-white">
                Two Distinct Operating Divisions.
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-400">
              Synergistic operating arms uniting turnkey commercial client delivery with deep-tech
              AI and software innovation.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {VENTURES.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.name}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950/80 to-slate-900/60 p-8 transition-all duration-300 hover:border-slate-700 hover:shadow-2xl"
                >
                  <div
                    className={`absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br ${v.gradient} opacity-25 blur-3xl transition-opacity group-hover:opacity-40`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-300">
                        <Sparkles className="h-3 w-3 text-emerald-400" />
                        {v.badge}
                      </span>
                      <Icon className="h-6 w-6 text-slate-400" />
                    </div>

                    <h3 className="mt-6 text-2xl font-bold text-white">{v.name}</h3>
                    <p className="mt-1 text-sm font-medium text-emerald-300">{v.tagline}</p>

                    <p className="mt-4 text-sm leading-relaxed text-slate-300">{v.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {v.metrics.map((m) => (
                        <span
                          key={m}
                          className="inline-flex items-center gap-1 rounded-md bg-slate-800/60 px-2.5 py-1 text-xs font-mono text-slate-300 border border-slate-700/50"
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80">
                    <Link
                      to={v.to}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      {v.ctaLabel}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Leadership & Executive Vision */}
      <section className="py-20 md:py-28 bg-white border-b border-ink/10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-ink/10 bg-slate-900 p-8 text-white shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                    <Briefcase className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Dr Robbie Harley</h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                      MBA · Founder & Managing Director
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-6">
                  <p>
                    Combining extensive healthcare-grade clinical & technical operating background
                    with rigorous commercial MBA governance.
                  </p>
                  <p>
                    Passionate about eliminating digital waste, delivering transparent commercial
                    software, and architecting autonomous systems that empower operators.
                  </p>
                </div>

                <div className="mt-6 rounded-lg bg-slate-950/70 p-4 border border-slate-800 text-xs text-slate-400">
                  <p className="font-semibold text-slate-200 mb-1">Group Operating Philosophy:</p>
                  <p className="italic">
                    &ldquo;We build working software and sustainable digital assets. No jargon, no
                    technical debt, and no excuses.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Operating Principles
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Institutional Standards for Every Engagement.
              </h2>
              <p className="mt-4 text-ink-muted leading-relaxed">
                Whether deploying a high-converting website for a local UK trade contractor or
                engineering autonomous AI workflows in Harley Labs, The Harley Group enforces strict
                operational metrics.
              </p>

              <div className="mt-8 space-y-6">
                {OPERATING_PILLARS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-ink">{p.title}</h4>
                        <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Group Executive Valuation & Capital Structure */}
      <section className="py-20 md:py-28 bg-slate-900 text-white border-b border-slate-800">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-300 font-mono">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Executive Governance & Portfolio Valuation</span>
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl text-white">
                Group Financial Metrics & Capital Allocation
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-xl leading-relaxed">
                Institutional balance sheet discipline, debt-free capital structure, and high-margin recurring cash flows across group holdings.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-xl border border-emerald-500/40 bg-emerald-950/80 px-4 py-2 text-xs font-mono text-emerald-300 font-bold">
                AUDITED FY26 · £0 LONG-TERM DEBT
              </span>
            </div>
          </div>

          {/* Core Balance Sheet & Valuation Metrics */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
                <span>Group ARR Run-Rate</span>
                <span className="text-emerald-400 font-bold">+68% YoY</span>
              </div>
              <div className="mt-3 text-3xl font-bold text-white font-mono">£284,500</div>
              <div className="mt-2 text-xs text-slate-400">
                Combined recurring care plans + upfront build pipeline.
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
                <span>Net EBITDA Margin</span>
                <span className="text-emerald-400 font-bold">Top Quartile</span>
              </div>
              <div className="mt-3 text-3xl font-bold text-emerald-400 font-mono">42.5%</div>
              <div className="mt-2 text-xs text-slate-400">
                High-leverage automated delivery model via Harley Labs.
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
                <span>Cap Table Control</span>
                <span className="text-indigo-400 font-bold">Founder Held</span>
              </div>
              <div className="mt-3 text-3xl font-bold text-white font-mono">100.0%</div>
              <div className="mt-2 text-xs text-slate-400">
                Zero dilutive institutional capital; 100% common voting stock.
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono uppercase">
                <span>Enterprise Valuation</span>
                <span className="text-amber-400 font-bold">3.5x ARR Multiple</span>
              </div>
              <div className="mt-3 text-3xl font-bold text-amber-400 font-mono">£1,420,000</div>
              <div className="mt-2 text-xs text-slate-400">
                Internal enterprise benchmark based on trailing 12m cashflow.
              </div>
            </div>
          </div>

          {/* Capital Allocation & Treasury Rules */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                <Cpu className="h-4 w-4" />
                <span>50% · Harley Labs R&D</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-white">Autonomous Agent Swarms</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Reinvestment into next-generation AI pipelines, automated prospector engines, multi-city SEO compilers, and edge SSR tooling.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" />
                <span>30% · Treasury & Reserves</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-white">Operational Runway Buffer</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Holding 6+ months of gross operating overhead in liquid UK interest-bearing accounts for maximum business resilience.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <Award className="h-4 w-4" />
                <span>20% · Growth Distributions</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-white">Shareholder Dividends</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Disbursed quarterly following full HMRC Corporation Tax and Making Tax Digital VAT reconciliation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Corporate Governance & Disclosure Table */}
      <section className="py-20 md:py-24 bg-slate-50 border-b border-ink/10">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
              Corporate Registry
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Corporate Governance & Compliance Details
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Formal company registration, regulatory adherence, and group operational standards.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm">
            <div className="divide-y divide-ink/10">
              {GOVERNANCE_RECORDS.map((rec) => (
                <div key={rec.label} className="grid grid-cols-1 md:grid-cols-3 px-6 py-4 text-sm">
                  <span className="font-semibold text-ink flex items-center gap-2">
                    <FileCheck2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    {rec.label}
                  </span>
                  <span className="md:col-span-2 text-ink-muted font-mono text-xs md:text-sm mt-1 md:mt-0">
                    {rec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Group Contact & Direct Channel */}
      <section className="py-20 bg-slate-950 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-medium text-emerald-300">
              <Layers className="h-3.5 w-3.5" />
              Direct Group Engagement
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Partner With The Harley Group
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Whether you are an ambitious business owner seeking digital growth or an enterprise
              interested in Harley Labs R&D capabilities, our executive team is ready to assist.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PillButton
                as="link"
                to="/contact"
                search={{ service: undefined, package: undefined, domain: undefined, websiteUrl: undefined }}
                variant="light"
                size="md"
              >
                Contact Executive Desk
              </PillButton>
              <PillButton
                as="link"
                to="/labs"
                variant="ghost"
                size="md"
                className="border-slate-700 text-white hover:bg-slate-900 hover:text-white"
              >
                Explore Harley Labs R&D
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
