import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { PartnerPortalDesk } from "@/components/partners/PartnerPortalDesk";
import {
  Users,
  PoundSterling,
  Building2,
  Gift,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Calculator,
  PhoneCall,
  FileCheck2,
  QrCode,
} from "lucide-react";
import { toast } from "sonner";
import { buildPageSeoHead } from "@/lib/site-config";

export const Route = createFileRoute("/partners")({
  head: () =>
    buildPageSeoHead({
      title: "Trade Partner & Referral Network | Harley Digital Works",
      description:
        "Earn £250 commission per referral introducing UK trade contractors to Harley Digital Works 100% done-for-you website systems.",
      path: "/partners",
    }),
  component: PartnersPage,
});

const PARTNER_BENEFITS = [
  {
    icon: PoundSterling,
    title: "£250 Cash Referral Reward",
    description:
      "Paid directly to your company or personal bank account via BACS on the 1st of every month for every confirmed website build.",
  },
  {
    icon: Gift,
    title: "£150 Client Voucher",
    description:
      "Your referred trade contractors receive an exclusive £150 discount on their Launch (£1,495) or Growth (£2,995) package.",
  },
  {
    icon: ShieldCheck,
    title: "14-Day Delivery SLA Guarantee",
    description:
      "We handle 100% of the copywriting, design, and tech so your contractors enjoy a flawless experience that reflects brilliantly on you.",
  },
  {
    icon: Building2,
    title: "Co-Branded Marketing Collateral",
    description:
      "We supply ready-to-print trade counter leaflets, counter display cards, and digital email snippets customized for your branch.",
  },
];

const TARGET_PARTNER_TYPES = [
  {
    type: "Electrical & Plumbing Wholesalers",
    examples: "CEF, Rexel, Edmundsons, Plumbase, City Plumbing",
    role: "Help your trade counter customers establish a professional online presence to win higher-margin domestic and commercial work.",
  },
  {
    type: "Construction & Trade Accountants",
    examples: "CIS accountants, trade bookkeepers, SME tax advisers",
    role: "Give your clients the marketing infrastructure they need to scale revenue, improve cash flow, and justify premium hourly rates.",
  },
  {
    type: "Trade Federations & Associations",
    examples: "NICEIC, Gas Safe, FMB, NAPIT, Checkatrade members",
    role: "Empower members with high-speed websites that prominently display their mandatory badges and compliance certificates.",
  },
];

function PartnersPage() {
  const [viewMode, setViewMode] = useState<"overview" | "portal">("overview");
  const [referralsPerMonth, setReferralsPerMonth] = useState(4);
  const [partnerName, setPartnerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [partnerType, setPartnerType] = useState("wholesaler");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const monthlyCommission = referralsPerMonth * 250;
  const annualCommission = monthlyCommission * 12;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setHasApplied(true);
      toast.success(
        "Partner application received! Our partnership director will contact you within 24 hours.",
      );
    }, 900);
  };

  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-12 text-white md:pt-40 md:pb-16 border-b border-emerald-950/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.18),rgba(255,255,255,0))]" />

        <Container className="relative z-10">
          {/* Top Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <button
              onClick={() => setViewMode("overview")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                viewMode === "overview"
                  ? "bg-emerald-500 text-neutral-950 shadow-md"
                  : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>Partner Program Overview</span>
            </button>

            <button
              onClick={() => setViewMode("portal")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                viewMode === "portal"
                  ? "bg-emerald-500 text-neutral-950 shadow-md"
                  : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800"
              }`}
            >
              <QrCode className="h-3.5 w-3.5" />
              <span>Live Partner Affiliate Desk</span>
              <span className="ml-1 rounded bg-emerald-400/20 px-1.5 py-0.5 text-[10px] font-mono font-bold text-emerald-300">
                ACTIVE PORTAL
              </span>
            </button>
          </div>

          {viewMode === "portal" ? (
            <div className="pt-4">
              <PartnerPortalDesk />
            </div>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 backdrop-blur-md">
                <Users className="h-3.5 w-3.5" />
                <span>UK Trade Merchant & Accountant Partner Program</span>
              </div>

              <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,5.5vw,4.8rem)] font-bold tracking-tight text-white leading-[1.05]">
                Earn <span className="text-emerald-400">£250 for Every UK Trade Contractor</span>{" "}
                You Introduce.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                Join the official Harley Digital Works Partner Network. Whether you manage a trade
                counter, run an accounting practice, or supply construction tools, earn recurring
                commission while helping your contractors scale.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <PillButton
                  as="button"
                  onClick={() => {
                    const el = document.getElementById("partner-form");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variant="light"
                  size="md"
                >
                  Apply to Partner Network
                </PillButton>
                <PillButton
                  as="button"
                  onClick={() => setViewMode("portal")}
                  variant="ghost"
                  size="md"
                  className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/60"
                >
                  Open Live Affiliate Desk
                </PillButton>
                <PillButton
                  as="button"
                  onClick={() => {
                    const el = document.getElementById("commission-calculator");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variant="ghost"
                  size="md"
                  className="border-slate-700 text-white hover:bg-slate-900 hover:text-white"
                >
                  Calculate Earnings
                </PillButton>
              </div>
            </>
          )}
        </Container>
      </section>

      {/* Interactive Partner Earnings Calculator */}
      <section
        id="commission-calculator"
        className="py-20 md:py-24 bg-slate-900 text-white border-b border-slate-800"
      >
        <Container>
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-950 p-8 md:p-12 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Revenue Model
                </span>
                <h2 className="text-2xl font-bold text-white">
                  Monthly Referral Earnings Calculator
                </h2>
              </div>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-12 items-center">
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <label className="text-slate-300 font-medium">
                      Referred Contractors per Month:
                    </label>
                    <span className="text-2xl font-mono font-bold text-emerald-400">
                      {referralsPerMonth} {referralsPerMonth === 1 ? "trade" : "trades"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={referralsPerMonth}
                    onChange={(e) => setReferralsPerMonth(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                    <span>1 referral</span>
                    <span>10 referrals</span>
                    <span>20 referrals</span>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900 p-4 text-xs text-slate-300 space-y-2 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>
                      Commission rate: <strong>£250 per completed build</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>
                      Payout schedule: <strong>1st of every month via direct BACS</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>
                      Client discount: <strong>£150 co-branded voucher for each trade</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-6 text-center">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 block">
                  Estimated Partner Payout
                </span>
                <div className="mt-3 text-4xl font-extrabold text-emerald-400 font-mono">
                  £{monthlyCommission.toLocaleString()}
                </div>
                <span className="text-xs text-slate-400">per month</span>

                <div className="mt-6 border-t border-emerald-900/60 pt-4">
                  <span className="text-xs text-slate-400 block font-mono">
                    Annualized Commission:
                  </span>
                  <span className="text-xl font-bold text-white font-mono">
                    £{annualCommission.toLocaleString()} / year
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Partner Benefits Grid */}
      <section className="py-20 bg-white border-b border-ink/10">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Partner Advantages
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Why UK Trade Suppliers & Accountants Partner With Us.
            </h2>
            <p className="mt-3 text-sm text-ink-muted">
              We protect your commercial reputation with strict 14-day delivery and senior operating
              governance.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNER_BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-2xl border border-ink/10 bg-slate-50/60 p-6 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-ink">{b.title}</h3>
                    <p className="mt-2 text-xs text-ink-muted leading-relaxed">{b.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Target Partner Profiles */}
      <section className="py-20 bg-slate-50 border-b border-ink/10">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
              Partner Categories
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Tailored Programs by Industry Sector
            </h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {TARGET_PARTNER_TYPES.map((t) => (
              <div key={t.type} className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-ink">{t.type}</h3>
                <p className="mt-1 text-[11px] font-mono text-emerald-700">{t.examples}</p>
                <p className="mt-4 text-xs text-ink-muted leading-relaxed">{t.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partner Application Form */}
      <section id="partner-form" className="py-20 bg-slate-950 text-white">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 text-xs font-medium text-emerald-300">
                <FileCheck2 className="h-3.5 w-3.5" />
                Partner Accreditation
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Register as an Official Trade Partner
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Receive your unique partner referral code, co-branded marketing pack, and dedicated
                WhatsApp support channel.
              </p>
            </div>

            {!hasApplied ? (
              <form
                onSubmit={handleSubmit}
                className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl space-y-5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      placeholder="e.g. Mark Robinson"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Company / Branch Name
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. City Electrical Factors (Cheshire)"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Partner Category
                  </label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="wholesaler">Trade Merchant / Wholesaler Branch</option>
                    <option value="accountant">Trade Accountant / Bookkeeper</option>
                    <option value="federation">Trade Association / Federation</option>
                    <option value="supplier">Tool / Equipment Supplier</option>
                    <option value="other">Other Commercial Partner</option>
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. mark@cef-manchester.co.uk"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Direct Mobile / Telephone
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07700 900123"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-lg hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    "Processing Registration..."
                  ) : (
                    <>
                      <span>Submit Partner Application</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="mt-10 rounded-2xl border border-emerald-500 bg-emerald-950/60 p-8 text-center">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-emerald-600 text-white mb-3">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Application Received</h3>
                <p className="mt-2 text-xs text-emerald-200 leading-relaxed">
                  Thank you, <strong>{partnerName}</strong>. Your application for{" "}
                  <strong>{companyName}</strong> has been registered. Our partnership director will
                  contact you via {email} with your partner referral code and marketing assets.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
