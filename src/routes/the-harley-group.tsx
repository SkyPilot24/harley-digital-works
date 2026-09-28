import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  Building2,
  Globe2,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Lock,
  FileText,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { HarleyGroupHeader } from "@/components/site/HarleyGroupHeader";
import { HarleyGroupFooter } from "@/components/site/HarleyGroupFooter";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/lead-intake.functions";
import { parseLeadFormData } from "@/lib/lead-schema";
import { buildLeadMailto } from "@/lib/lead-details";
import { leadCaptureConfigured, siteConfig } from "@/lib/site-config";
import { toast } from "sonner";

export const Route = createFileRoute("/the-harley-group")({
  head: () => ({
    meta: [
      { title: "The Harley Group | Corporate Holding Company & Operating Portfolio — Bristol, UK" },
      {
        name: "description",
        content:
          "The Harley Group is an independent UK corporate holding company based in Bristol, overseeing specialized digital, technology, and operating ventures including Harley Digital Works and Harley Labs.",
      },
      {
        property: "og:title",
        content: "The Harley Group | Corporate Holding Company & Operating Portfolio — Bristol, UK",
      },
      {
        property: "og:description",
        content:
          "Institutional discipline, long-term capital allocation, and executive governance across specialized UK technology and digital operating companies in Bristol, UK.",
      },
    ],
  }),
  component: TheHarleyGroupPage,
});

const STATS = [
  { label: "Operating Divisions", value: "02", detail: "Digital Works & Harley Labs" },
  { label: "Deployment Standard", value: "Sub-50ms", detail: "Zero-Cold-Start Edge Architecture" },
  { label: "Governance Compliance", value: "100%", detail: "ICO Registered & GDPR Compliant" },
  { label: "Base Location", value: "Bristol, UK", detail: "United Kingdom Headquarters" },
];

const VENTURES = [
  {
    number: "01",
    name: "Harley Digital Works",
    kicker: "FLAGSHIP COMMERCIAL DIVISION",
    tagline:
      "Turnkey web design, sales copywriting & managed monthly care for UK trades & services.",
    description:
      "Delivering done-for-you website builds, high-converting commercial sales copy, local Google SEO alignment, and full ongoing care plans for UK trades, contractors, and growing business operators.",
    metrics: ["14-Day Turnaround", "100% Done-For-You", "Managed SLA Care"],
    to: "/services",
    ctaLabel: "Explore Digital Works",
    image: "/images/home/architecture.jpg",
    status: "Active Operating Division",
  },
  {
    number: "02",
    name: "Harley Labs",
    kicker: "ENGINEERING & R&D DIVISION",
    tagline: "High-performance edge architectures & proprietary operational tooling.",
    description:
      "Engineering zero-cold-start edge rendering systems, algorithmic local search diagnostics, and internal operating tools (Revenue OS, Domain OS) that power high-efficiency digital workflows.",
    metrics: ["Sub-50ms Edge SSR", "Revenue OS Tooling", "Domain Infrastructure"],
    to: "/labs",
    ctaLabel: "Explore Harley Labs",
    image: "/images/robbie/09-labs-thought-leadership.jpg",
    status: "Active R&D Division",
  },
  {
    number: "03",
    name: "Venture Incubation Slot",
    kicker: "FUTURE EXPANSION PIPELINE",
    tagline:
      "Structured capital allocation for niche technology & specialized service acquisitions.",
    description:
      "Reserving capital and operational governance bandwidth to incubate or acquire complementary digital operating companies that fit our high-margin, recurring revenue focus.",
    metrics: ["Capital Discipline", "Operational Integration", "Long-term Focus"],
    to: "/contact",
    ctaLabel: "Corporate Acquisition Enquiries",
    image: "/images/home/interior.jpg",
    status: "Active Incubation Pipeline",
  },
];

const OPERATIONAL_PILLARS = [
  {
    icon: Building2,
    title: "Commercial Digital Infrastructure",
    subtitle: "High-Converting Client Web Assets",
    description:
      "Designing and deploying lead-generation websites, conversion copy, and brand assets for high-growth regional businesses across Bristol and the United Kingdom.",
  },
  {
    icon: Cpu,
    title: "Proprietary Systems Engineering",
    subtitle: "Internal Operating Software",
    description:
      "Developing internal tools (Revenue OS, Domain OS, Audit Generators) that streamline agency workflows, diagnostic reporting, and margin efficiency.",
  },
  {
    icon: Layers,
    title: "Managed Service Operations",
    subtitle: "SLA-Backed Maintenance & Security",
    description:
      "Delivering ongoing SLA-backed maintenance, continuous security updates, DNS management, and performance monitoring across all group web properties.",
  },
];

const OPERATING_PRINCIPLES = [
  {
    number: "01",
    title: "Commercial Clarity",
    copy: "Every project, software framework, and digital asset must directly connect to tangible customer revenue, qualified lead flow, and operational efficiency. We eliminate vanity metrics and superficial agency noise.",
  },
  {
    number: "02",
    title: "Institutional Rigour",
    copy: "Enterprise-grade reliability, continuous automated backups, strict data security (GDPR & Cyber Essentials), and zero-downtime edge deployments applied uniformly across all group ventures.",
  },
  {
    number: "03",
    title: "Senior Accountability",
    copy: "Direct executive leadership from Dr Robbie Harley, plain-English communication, transparent upfront pricing, and absolute ownership without corporate transformation theatre.",
  },
  {
    number: "04",
    title: "Sustainable Capital Discipline",
    copy: "Operating without external debt or speculative venture pressure. Reinvesting profits into long-term proprietary technology, infrastructure, and team capabilities.",
  },
];

const GOVERNANCE_RECORDS = [
  { label: "Parent Entity", value: "The Harley Group Ltd" },
  { label: "Jurisdiction", value: "England & Wales (United Kingdom)" },
  { label: "Corporate HQ", value: "Bristol, United Kingdom (UK)" },
  { label: "Core Operating Divisions", value: "Harley Digital Works & Harley Labs" },
  { label: "Regulatory Compliance", value: "GDPR, Cyber Essentials Standards, ICO Registered" },
  { label: "Managing Director", value: "Dr Robbie Harley, MBA" },
  { label: "Primary Infrastructure", value: "Cloudflare Edge Engine & Supabase Enterprise" },
];

const ANNOUNCEMENTS = [
  {
    date: "SEPTEMBER 2026",
    category: "INFRASTRUCTURE",
    title: "The Harley Group Consolidates Global Edge Deployment Architecture",
    summary:
      "All group client assets and internal operating systems migrated to zero-cold-start edge rendering, achieving sub-50ms global initial response times.",
  },
  {
    date: "AUGUST 2026",
    category: "PROPRIETARY TOOLING",
    title: "Harley Labs Releases Revenue OS v2.0 for Agency Operations",
    summary:
      "Enhanced lead scoring, automated proposal generation, and real-time margin tracking deployed into active operational service.",
  },
  {
    date: "JULY 2026",
    category: "COMMERCIAL GOVERNANCE",
    title: "Harley Digital Works Expands Managed Care SLA Coverage",
    summary:
      "Introducing guaranteed 24-hour turnaround on priority content updates for Growth and Pro tier care clients across Bristol and the UK.",
  },
];

export function TheHarleyGroupPage() {
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const submitLeadFn = useServerFn(submitLead);
  const [busy, setBusy] = useState(false);
  const [startedAt] = useState(() => Date.now());

  const handleSubmitEnquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = parseLeadFormData(new FormData(e.currentTarget));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Please check the form.");
      return;
    }
    if (!leadCaptureConfigured) {
      window.location.href = buildLeadMailto(parsed.data, siteConfig.contactEmail);
      toast.info("Your email app is opening. Send the draft to complete your enquiry.");
      return;
    }
    setBusy(true);
    try {
      await submitLeadFn({ data: parsed.data });
      setEnquirySubmitted(true);
    } catch {
      toast.error(
        "Your enquiry could not be submitted. Your details are still here; please retry or email us.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageShell quiet header={<HarleyGroupHeader />} footer={<HarleyGroupFooter />}>
      <div className="studio-home">
        {/* Hero Section */}
        <section
          className="studio-hero border-b border-ink/15 pb-16 pt-8 bg-background"
          id="overview"
          aria-labelledby="thg-heading"
        >
          <div className="studio-wrap hero-layout">
            <div className="hero-copy space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0D0D0D] px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#C89D3C]">
                <ShieldCheck size={14} /> THE HARLEY GROUP · HOLDING & OPERATING COMPANY
              </div>

              <h1
                id="thg-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink font-display leading-[1.1]"
              >
                Institutional
                <br />
                discipline.
                <br />
                <span className="text-[#C89D3C]">Long-term value.</span>
              </h1>

              <p className="hero-description text-lg text-ink font-medium leading-relaxed font-sans max-w-xl">
                The Harley Group is an independent UK corporate holding company based in{" "}
                <strong className="text-ink">Bristol, UK</strong>, overseeing specialized digital,
                technology, and operating ventures.
              </p>

              <p className="hero-support text-sm text-ink-muted leading-relaxed font-sans max-w-xl">
                Combining executive operational leadership, commercial clarity, and software
                engineering to build enduring digital capabilities across operating subsidiaries.
              </p>

              <div className="studio-actions pt-2 flex flex-wrap items-center gap-4">
                <PillButton as="link" to="/services" variant="dark" className="studio-button">
                  Explore Operating Portfolio
                </PillButton>
                <a
                  href="#divisions"
                  className="studio-text-link font-mono text-xs uppercase tracking-wider font-bold text-ink hover:text-[#C89D3C]"
                >
                  Operating Divisions <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="hero-art space-y-4">
              <div className="hero-art-note flex items-center justify-between text-xs font-mono font-bold text-ink-muted uppercase tracking-wider">
                <span>EXECUTIVE LEADERSHIP</span>
                <span>BRISTOL, UK ↘</span>
              </div>

              {/* Clean Executive Photo Box */}
              <div className="founder-photo shadow-2xl rounded-2xl overflow-hidden border border-ink/20 relative group bg-black">
                <img
                  src="/images/robbie/03-thg-cinematic-portrait.jpg"
                  alt="Dr Robbie Harley, Managing Director of The Harley Group"
                  width="1200"
                  height="1600"
                  loading="eager"
                  className="w-full h-auto object-cover max-h-[440px] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C89D3C]">
                    EXECUTIVE GOVERNANCE
                  </span>
                  <span className="text-xl font-bold font-display text-white">
                    DR ROBBIE HARLEY, MBA
                  </span>
                  <span className="text-xs text-white/80 font-mono">
                    Managing Director & Founder · Bristol, UK
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-ink/15 flex items-center justify-between text-xs text-ink font-mono shadow-xs">
                <div>
                  <span className="font-bold text-ink">The Harley Group Ltd</span>
                  <br />
                  <span className="text-ink-muted">Bristol, United Kingdom</span>
                </div>
                <span className="bg-[#0D0D0D] text-[#C89D3C] px-3 py-1.5 rounded text-center text-[10px] font-bold uppercase tracking-wider">
                  BRISTOL · UK
                </span>
              </div>
            </div>
          </div>

          {/* Key Group Metrics */}
          <div className="studio-wrap mt-16 pt-8 border-t border-ink/15">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((stat, i) => (
                <div key={i} className="p-5 rounded-xl bg-white border border-ink/15 shadow-xs">
                  <div className="text-xs font-mono font-bold text-ink-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-ink mt-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-ink/80 mt-1 font-sans">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Overview & Mandate */}
        <section className="studio-section bg-[#FAF9F6] py-20 border-b border-ink/15">
          <div className="studio-wrap space-y-12">
            <div className="max-w-3xl space-y-4">
              <p className="studio-kicker font-mono text-xs font-bold uppercase tracking-wider text-[#C89D3C]">
                01 / CORPORATE MANDATE
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink font-display">
                Building & governing enduring operating ventures.
              </h2>
              <p className="text-base text-ink leading-relaxed font-sans">
                Headquartered in Bristol, UK, The Harley Group operates at the intersection of
                commercial execution and technical innovation. We do not build speculative ventures;
                we create focused, resilient business units designed to deliver measurable
                commercial value to clients and long-term stability to stakeholders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {OPERATIONAL_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-8 rounded-2xl border border-ink/15 shadow-xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#0D0D0D] text-[#C89D3C] flex items-center justify-center">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-ink font-display">{pillar.title}</h3>
                      <p className="text-xs font-mono text-[#C89D3C] font-semibold uppercase">
                        {pillar.subtitle}
                      </p>
                      <p className="text-sm text-ink/85 leading-relaxed font-sans">
                        {pillar.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-ink/10 flex items-center justify-between text-xs font-mono text-ink-muted font-bold">
                      <span>PILLAR 0{idx + 1}</span>
                      <CheckCircle2 size={16} className="text-[#C89D3C]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Operating Divisions & Portfolio */}
        <section
          className="studio-work studio-section py-20 bg-background"
          id="divisions"
          aria-labelledby="divisions-heading"
        >
          <div className="studio-wrap space-y-12">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker font-mono text-xs font-bold uppercase tracking-wider text-[#C89D3C]">
                  02 / PORTFOLIO ARCHITECTURE
                </p>
                <h2
                  id="divisions-heading"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-ink font-display"
                >
                  Group structure &
                  <br />
                  <span className="studio-muted text-ink-muted">operating companies.</span>
                </h2>
              </div>
              <p className="text-sm text-ink font-medium font-sans max-w-md">
                Uniting commercial client delivery with high-performance software engineering and
                structured R&D capabilities based out of Bristol, UK.
              </p>
            </div>

            <div className="space-y-10">
              {VENTURES.map((venture) => (
                <article
                  key={venture.number}
                  className="rounded-3xl border border-ink/15 bg-white p-6 sm:p-10 shadow-xs transition-shadow hover:shadow-md"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-6 space-y-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#0D0D0D] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#C89D3C]">
                          {venture.number} / {venture.kicker}
                        </span>
                        <span className="rounded-full bg-ink/5 px-2.5 py-0.5 font-mono text-[11px] text-ink font-semibold border border-ink/10">
                          {venture.status}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink font-display">
                        {venture.name}
                      </h3>

                      <p className="text-base text-ink font-semibold leading-relaxed">
                        {venture.tagline}
                      </p>

                      <p className="text-sm text-ink/90 leading-relaxed font-sans">
                        {venture.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {venture.metrics.map((metric, i) => (
                          <span
                            key={i}
                            className="bg-[#FAF9F6] border border-ink/15 px-3 py-1 rounded-lg text-xs font-mono font-bold text-ink"
                          >
                            ✓ {metric}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3">
                        <Link
                          to={venture.to}
                          className="studio-text-link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-ink hover:text-[#C89D3C]"
                        >
                          {venture.ctaLabel} <ArrowUpRight size={17} />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-6">
                      <div className="relative rounded-2xl overflow-hidden border border-ink/15 shadow-md group bg-black">
                        <img
                          src={venture.image}
                          alt={venture.name}
                          width="1200"
                          height="800"
                          loading="lazy"
                          className="w-full h-auto object-cover max-h-[360px] transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-3 left-3 bg-[#0D0D0D]/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-xs font-mono font-bold text-[#C89D3C] flex items-center gap-2">
                          <span>{venture.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Investment & Growth Philosophy */}
        <section
          className="studio-section bg-[#0D0D0D] text-white py-20"
          id="investment"
          aria-labelledby="philosophy-heading"
        >
          <div className="studio-wrap space-y-12">
            <div className="max-w-3xl space-y-4">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#C89D3C]">
                03 / INVESTMENT & CAPITAL PHILOSOPHY
              </p>
              <h2
                id="philosophy-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display"
              >
                Long-term capital discipline & operational autonomy.
              </h2>
              <p className="text-base text-white/80 leading-relaxed font-sans">
                The Harley Group allocates capital with a multi-decade orientation. We prioritize
                sustainable unit economics, organic growth, and zero debt reliance over short-term
                expansion metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-[#C89D3C]/10 text-[#C89D3C] flex items-center justify-center font-mono font-bold">
                  01
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  Self-Funded Organic Growth
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Every operating venture is structured to achieve independent profitability,
                  ensuring financial resilience and freedom from external venture capital pressures.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-[#C89D3C]/10 text-[#C89D3C] flex items-center justify-center font-mono font-bold">
                  02
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  Continuous R&D Reinvestment
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Group profits are systematically reinvested into proprietary software tools
                  (Revenue OS, Domain OS) and edge infrastructure that improve client execution
                  velocity.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-[#C89D3C]/10 text-[#C89D3C] flex items-center justify-center font-mono font-bold">
                  03
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  Unified Group Governance
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  While operating divisions retain complete tactical autonomy, all entities adhere
                  to strict group-wide standards for security, data privacy, and executive
                  oversight.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Operating Principles / Core Values */}
        <section
          className="studio-process studio-section py-20 bg-background"
          id="operations"
          aria-labelledby="group-principles-heading"
        >
          <div className="studio-wrap space-y-12">
            <div className="studio-section-heading">
              <div>
                <p className="studio-kicker font-mono text-xs font-bold uppercase tracking-wider text-[#C89D3C]">
                  04 / OPERATING STANDARDS & VALUES
                </p>
                <h2
                  id="group-principles-heading"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-ink font-display"
                >
                  Governed by clear
                  <br />
                  <span className="studio-muted text-ink-muted">operating principles.</span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {OPERATING_PRINCIPLES.map((item) => (
                <div
                  key={item.number}
                  className="p-8 rounded-2xl border border-ink/15 bg-white space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C89D3C] uppercase tracking-wider">
                      PILLAR {item.number}
                    </span>
                    <span className="font-mono text-xs text-ink-muted font-semibold">
                      HARLEY GROUP STANDARD
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-ink font-display">{item.title}</h3>
                  <p className="text-sm text-ink/90 leading-relaxed font-sans">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate Governance & Registration Table */}
        <section
          className="studio-purpose studio-section bg-[#FAF9F6] py-20 border-y border-ink/15"
          id="governance"
          aria-labelledby="gov-heading"
        >
          <div className="studio-wrap grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl overflow-hidden border border-ink/15 shadow-md">
                <img
                  src="/images/home/interior.jpg"
                  alt="Structured architectural governance representation"
                  width="1200"
                  height="801"
                  loading="lazy"
                  className="w-full h-auto object-cover max-h-[380px]"
                />
              </div>
              <div className="p-4 bg-white rounded-xl border border-ink/15 flex items-center justify-between text-xs font-mono text-ink shadow-xs">
                <span className="font-bold">STRUCTURED GOVERNANCE RECORD</span>
                <ShieldCheck size={18} className="text-[#C89D3C]" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="studio-kicker font-mono text-xs font-bold uppercase tracking-wider text-[#C89D3C]">
                  05 / CORPORATE REGISTRATION & COMPLIANCE
                </p>
                <h2
                  id="gov-heading"
                  className="text-3xl font-bold tracking-tight text-ink font-display mt-1"
                >
                  Institutional structure.
                  <br />
                  <span className="text-ink-muted">Transparent corporate backing.</span>
                </h2>
              </div>

              <div className="bg-white rounded-2xl border border-ink/15 p-6 space-y-1 shadow-xs divide-y divide-ink/10">
                {GOVERNANCE_RECORDS.map((rec) => (
                  <div
                    key={rec.label}
                    className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm gap-1"
                  >
                    <span className="font-mono text-xs font-bold text-ink-muted uppercase tracking-wider">
                      {rec.label}
                    </span>
                    <span className="font-semibold text-ink font-sans text-right">{rec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Group Announcements / Latest Updates */}
        <section
          className="studio-section py-20 bg-background"
          id="news"
          aria-labelledby="news-heading"
        >
          <div className="studio-wrap space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="studio-kicker font-mono text-xs font-bold uppercase tracking-wider text-[#C89D3C]">
                  06 / CORPORATE UPDATES & NEWS
                </p>
                <h2
                  id="news-heading"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-ink font-display mt-1"
                >
                  Latest group developments.
                </h2>
              </div>
              <span className="font-mono text-xs text-ink-muted font-bold">
                OFFICIAL ANNOUNCEMENTS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ANNOUNCEMENTS.map((item, idx) => (
                <article
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-ink/15 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#C89D3C]">
                      <span>{item.category}</span>
                      <span className="text-ink-muted">{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-ink font-display leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink/80 leading-relaxed font-sans">{item.summary}</p>
                  </div>
                  <div className="pt-4 border-t border-ink/10 flex items-center text-xs font-mono text-ink font-bold">
                    <span>Group Release</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Contact / Corporate Enquiries */}
        <section
          className="studio-final py-20 bg-[#0D0D0D] text-white"
          id="contact"
          aria-labelledby="thg-final-heading"
        >
          <div className="studio-wrap grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#C89D3C]">
                EXECUTIVE INQUIRIES
              </div>
              <h2
                id="thg-final-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display leading-tight"
              >
                Discuss a venture,
                <br />
                <span className="text-[#C89D3C]">partnership or brief.</span>
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Direct enquiries regarding corporate governance, commercial services across Harley
                Digital Works, or technology R&D partnerships with Harley Labs in Bristol, UK.
              </p>
              <div className="space-y-3 text-xs font-mono text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C89D3C]" /> Direct access to executive
                  management
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C89D3C]" /> Response within 1 business
                  day
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C89D3C]" /> Confidential commercial
                  discussions
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white text-ink p-8 rounded-2xl shadow-xl space-y-6">
                <h3 className="text-xl font-bold font-display text-ink border-b border-ink/10 pb-4">
                  Corporate Contact Form
                </h3>

                {enquirySubmitted ? (
                  <div
                    role="status"
                    className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-center"
                  >
                    <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
                    <h4 className="font-bold text-base font-display">
                      Enquiry Submitted Successfully
                    </h4>
                    <p className="text-xs text-emerald-800">
                      Thank you for contacting The Harley Group. Executive management will review
                      your message and reach out shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                    <input type="hidden" name="startedAt" value={startedAt} />
                    <input type="hidden" name="source" value="group_contact_form" />
                    <div
                      className="absolute left-[-10000px] h-px w-px overflow-hidden"
                      aria-hidden="true"
                    >
                      <label htmlFor="group-website">Leave this field empty</label>
                      <input id="group-website" name="website" tabIndex={-1} autoComplete="off" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="group-name"
                          className="text-xs font-mono font-bold uppercase text-ink-muted"
                        >
                          Your Name *
                        </label>
                        <input
                          id="group-name"
                          name="name"
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-ink/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89D3C]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="group-email"
                          className="text-xs font-mono font-bold uppercase text-ink-muted"
                        >
                          Corporate Email *
                        </label>
                        <input
                          id="group-email"
                          name="email"
                          type="email"
                          required
                          placeholder="e.g. s.jenkins@company.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-ink/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89D3C]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="group-company"
                          className="text-xs font-mono font-bold uppercase text-ink-muted"
                        >
                          Organization / Company
                        </label>
                        <input
                          id="group-company"
                          name="company"
                          type="text"
                          placeholder="e.g. Apex Holdings"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-ink/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89D3C]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="group-package"
                          className="text-xs font-mono font-bold uppercase text-ink-muted"
                        >
                          Enquiry Type
                        </label>
                        <select
                          id="group-package"
                          name="package"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-ink/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89D3C]"
                        >
                          <option>Harley Digital Works Services</option>
                          <option>Harley Labs R&D & Tech</option>
                          <option>Corporate Partnership</option>
                          <option>Acquisition / Venture Enquiry</option>
                          <option>General Governance Enquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="group-message"
                        className="text-xs font-mono font-bold uppercase text-ink-muted"
                      >
                        Message Details *
                      </label>
                      <textarea
                        id="group-message"
                        name="message"
                        minLength={5}
                        maxLength={2000}
                        required
                        rows={4}
                        placeholder="Please outline the nature of your enquiry or commercial brief..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-ink/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89D3C]"
                      />
                    </div>

                    <PillButton
                      type="submit"
                      disabled={busy}
                      variant="dark"
                      className="w-full justify-center studio-button py-3 text-sm"
                    >
                      {busy
                        ? "Sending enquiry…"
                        : leadCaptureConfigured
                          ? "Send enquiry"
                          : "Prepare email draft"}
                    </PillButton>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
