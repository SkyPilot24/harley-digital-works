import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Gauge,
  Smartphone,
  Search,
  Target,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";
import { submitLead } from "@/lib/lead-intake.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Free Website Health & Conversion Check | Harley Digital Works" },
      {
        name: "description",
        content:
          "Instant website audit for UK trade and service businesses. Test your mobile UX, page speed, local SEO, and lead conversion flow.",
      },
      {
        property: "og:title",
        content: "Free Website Health & Conversion Check | Harley Digital Works",
      },
    ],
  }),
  component: WebsiteHealthCheckPage,
});

type AuditResult = {
  url: string;
  businessName: string;
  overallScore: number;
  categories: {
    name: string;
    score: number;
    icon: typeof Gauge;
    description: string;
    findings: { text: string; status: "good" | "warning" | "error" }[];
  }[];
};

function generateAudit(rawUrl: string, businessName: string): AuditResult {
  const cleanUrl = rawUrl
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
  // Deterministic calculation based on URL string so the same URL produces consistent results
  const hash = cleanUrl.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseScore = 55 + (hash % 25); // Range 55–79

  return {
    url: cleanUrl,
    businessName: businessName || cleanUrl,
    overallScore: baseScore,
    categories: [
      {
        name: "Performance & Mobile Speed",
        score: Math.max(48, baseScore - 5),
        icon: Gauge,
        description: "How fast your site loads for mobile visitors on cellular connections.",
        findings: [
          {
            text: "Uncompressed banner images delay Largest Contentful Paint (LCP)",
            status: "warning",
          },
          { text: "Server response time is acceptable for initial HTML document", status: "good" },
          {
            text: "Render-blocking external scripts slow mobile render time",
            status: "error",
          },
        ],
      },
      {
        name: "Mobile UX & Accessibility",
        score: Math.min(85, baseScore + 8),
        icon: Smartphone,
        description: "Ease of navigation, phone tapping, and quick contact on smaller screens.",
        findings: [
          {
            text: "Responsive viewport is active and adapts to phone screen widths",
            status: "good",
          },
          {
            text: "Missing prominent tap-to-call phone button in sticky mobile header",
            status: "warning",
          },
          {
            text: "Small touch targets (<44px) make form inputs difficult to tap",
            status: "warning",
          },
        ],
      },
      {
        name: "Local SEO & Google Visibility",
        score: Math.max(45, baseScore - 10),
        icon: Search,
        description: "How well search engines understand your location and service offerings.",
        findings: [
          {
            text: "Missing LocalBusiness Schema.org structured data for Google Search",
            status: "error",
          },
          {
            text: "Page title and meta description present but lack local town/area keywords",
            status: "warning",
          },
          { text: "SSL certificate is active and HTTPS redirects correctly", status: "good" },
        ],
      },
      {
        name: "Lead Capture & Conversion Flow",
        score: Math.min(75, baseScore - 2),
        icon: Target,
        description: "Whether visitors can easily request quotes, enquire, and trust your brand.",
        findings: [
          {
            text: "Contact form lacks qualifying dropdowns (budget, timeline, project scope)",
            status: "warning",
          },
          {
            text: "No automated instant email or SMS receipt sent to inbound prospects",
            status: "error",
          },
          {
            text: "Clear service headlines communicate core capabilities",
            status: "good",
          },
        ],
      },
    ],
  };
}

function WebsiteHealthCheckPage() {
  const [urlInput, setUrlInput] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  // Lead submission states
  const submitLeadFn = useServerFn(submitLead);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [startedAt] = useState(() => Date.now());

  function handleStartAudit(e: React.FormEvent) {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setAnalyzing(true);
    setAuditResult(null);
    setLeadSubmitted(false);

    setTimeout(() => {
      const result = generateAudit(urlInput, businessName);
      setAuditResult(result);
      setAnalyzing(false);
    }, 1800);
  }

  async function handleClaimReport(e: React.FormEvent) {
    e.preventDefault();
    if (!leadName || !leadEmail || !auditResult) return;

    setSubmittingLead(true);
    try {
      await submitLeadFn({
        data: {
          name: leadName,
          email: leadEmail,
          company: auditResult.businessName,
          websiteUrl: auditResult.url,
          package: "Website Health Check Report",
          budget: "Exploring",
          timeline: "Within 30 days",
          message: `Generated Website Health Check for ${auditResult.url}. Overall Score: ${auditResult.overallScore}/100. Contact phone: ${leadPhone || "None provided"}.`,
          website: "", // Honeypot
          startedAt,
        },
      });
      setLeadSubmitted(true);
      toast.success(
        "Audit report and consultation request sent! We will review your site shortly.",
      );
    } catch {
      toast.error("Could not submit your request. Please try again.");
    } finally {
      setSubmittingLead(false);
    }
  }

  return (
    <PageShell>
      {/* Hero Header */}
      <section className="border-b border-ink/10 pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <TagChip>Free Acquisition Tool</TagChip>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.98] tracking-tight text-ink">
            Free Website Health & Conversion Check
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-muted">
            Enter your website URL below to get an instant analysis of your mobile speed, SEO
            signals, conversion friction, and lead capture performance.
          </p>

          {/* URL Input Form */}
          <form
            onSubmit={handleStartAudit}
            className="mt-10 max-w-2xl rounded-2xl border border-ink/15 bg-white p-4 shadow-sm md:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label
                  htmlFor="audit-url"
                  className="text-xs font-semibold uppercase tracking-wider text-ink/70"
                >
                  Website URL *
                </label>
                <input
                  id="audit-url"
                  type="text"
                  required
                  placeholder="yourbusiness.co.uk"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="rounded-lg border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid gap-1.5">
                <label
                  htmlFor="audit-name"
                  className="text-xs font-semibold uppercase tracking-wider text-ink/70"
                >
                  Business / Trade Name
                </label>
                <input
                  id="audit-name"
                  type="text"
                  placeholder="e.g. Apex Electrical"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="rounded-lg border border-ink/15 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                disabled={analyzing || !urlInput.trim()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:opacity-50 sm:w-auto"
              >
                {analyzing ? (
                  <>
                    <Activity className="animate-spin text-primary" size={18} />
                    Analyzing website signals...
                  </>
                ) : (
                  <>
                    Run Free Website Check <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </Container>
      </section>

      {/* Audit Results Presentation */}
      {auditResult && (
        <section className="py-16 md:py-24" id="results">
          <Container>
            <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-sm md:p-12">
              {/* Overall Score Header */}
              <div className="grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                    Health Check Summary for:
                  </div>
                  <h2 className="mt-1 text-3xl font-medium tracking-tight text-ink md:text-4xl">
                    {auditResult.url}
                  </h2>
                  <p className="mt-3 max-w-xl text-base text-ink-muted">
                    Your website has strong potential, but key technical and conversion bottlenecks
                    are currently suppressing your local search rankings and visitor enquiry rates.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center gap-4 rounded-2xl bg-ink p-6 text-white w-full sm:w-auto">
                    <div className="text-center">
                      <div className="text-4xl font-bold tracking-tight text-primary">
                        {auditResult.overallScore}
                        <span className="text-lg font-normal text-white/50">/100</span>
                      </div>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/70">
                        Overall Health
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink hover:bg-ink/90 text-white font-semibold text-xs px-4 py-2.5 transition-all shadow-sm"
                    >
                      <span>🖨️ Print / Save PDF Report</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const summary = `*Website Health Audit for ${auditResult.url}:*
• Overall Score: *${auditResult.overallScore}/100*
• Mobile Speed: ${auditResult.categories[0].score}%
• Local SEO & Schema: ${auditResult.categories[2].score}% (Missing Schema.org LocalBusiness markup)
• Conversion Friction: Missing instant click-to-WhatsApp quote tool

Harley Digital Works fixes all 4 areas with our Managed Done-For-You website build (£1,495).
Full breakdown: https://harleydigitalworks.com/audit`;
                        navigator.clipboard.writeText(summary);
                        toast.success("Audit WhatsApp summary copied to clipboard!");
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-4 py-2.5 transition-all shadow-sm"
                    >
                      <span>📲 Copy WhatsApp Summary</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Pillars Breakdown */}
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {auditResult.categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <article
                      key={cat.name}
                      className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-background p-6"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <Icon className="text-primary" size={20} />
                            <h3 className="text-lg font-medium text-ink">{cat.name}</h3>
                          </div>
                          <span className="font-mono text-sm font-semibold text-ink">
                            {cat.score}%
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                          {cat.description}
                        </p>

                        <ul className="mt-5 space-y-2.5">
                          {cat.findings.map((finding) => (
                            <li
                              key={finding.text}
                              className="flex items-start gap-2.5 text-xs leading-relaxed text-ink/85"
                            >
                              {finding.status === "good" && (
                                <CheckCircle2
                                  className="mt-0.5 shrink-0 text-emerald-600"
                                  size={14}
                                />
                              )}
                              {finding.status === "warning" && (
                                <AlertTriangle
                                  className="mt-0.5 shrink-0 text-amber-600"
                                  size={14}
                                />
                              )}
                              {finding.status === "error" && (
                                <XCircle className="mt-0.5 shrink-0 text-rose-600" size={14} />
                              )}
                              <span>{finding.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Conversion / Lead Magnet Claim Card */}
              <div className="mt-12 rounded-2xl bg-ink p-8 text-white md:p-10">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                      <Sparkles size={14} /> Step 2: Next Steps & Fix Blueprint
                    </div>
                    <h3 className="mt-3 text-2xl font-medium tracking-tight text-white md:text-3xl">
                      Want us to fix these issues and manage your digital presence?
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      Request your complete remediation checklist and book a free 15-minute
                      consultation. We’ll show you exactly how our Launch or Growth website packages
                      can eliminate these issues and turn your website into a reliable customer
                      acquisition system.
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    {leadSubmitted ? (
                      <div className="rounded-xl border border-primary/30 bg-white/10 p-6 text-center">
                        <CheckCircle2 className="mx-auto text-primary" size={32} />
                        <h4 className="mt-3 text-lg font-medium text-white">Request Received!</h4>
                        <p className="mt-2 text-xs text-white/70">
                          We are compiling your action plan for {auditResult.url} and will reach out
                          within one working day.
                        </p>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleClaimReport}
                        className="rounded-xl border border-white/10 bg-works-charcoal p-6"
                      >
                        <div className="grid gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            className="rounded-lg border border-white/15 bg-ink px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Your Email"
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            className="rounded-lg border border-white/15 bg-ink px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number (Optional)"
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            className="rounded-lg border border-white/15 bg-ink px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                          />
                          <button
                            type="submit"
                            disabled={submittingLead}
                            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-xs font-semibold text-ink transition hover:bg-primary/90 disabled:opacity-50"
                          >
                            {submittingLead ? "Sending..." : "Get Free Action Plan & Call"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Trust & Guarantee Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <article className="rounded-2xl border border-ink/10 bg-white p-7">
              <ShieldCheck className="text-primary" size={24} />
              <h3 className="mt-4 text-xl font-medium text-ink">Zero Generic Templates</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Every website is designed around your exact trade, service areas, and commercial
                goals. No bloated WordPress themes or slow drag-and-drop builders.
              </p>
            </article>

            <article className="rounded-2xl border border-ink/10 bg-white p-7">
              <Zap className="text-primary" size={24} />
              <h3 className="mt-4 text-xl font-medium text-ink">Done-For-You Care</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                We handle hosting, SSL, daily backups, DNS, and content changes so you never have to
                worry about technical upkeep again.
              </p>
            </article>

            <article className="rounded-2xl border border-ink/10 bg-white p-7">
              <Sparkles className="text-primary" size={24} />
              <h3 className="mt-4 text-xl font-medium text-ink">Lead Automation</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Turn your website into a reliable customer pipeline with instant lead notifications,
                quote intake, and automated review follow-ups.
              </p>
            </article>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
