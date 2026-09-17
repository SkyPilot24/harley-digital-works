import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TRADE_VERTICALS, type TradeVertical } from "@/lib/trade-data";
import {
  Wrench,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Award,
  Flame,
  Building2,
  Hammer,
} from "lucide-react";

export const Route = createFileRoute("/trades_/$slug")({
  loader: ({ params }) => {
    const trade = TRADE_VERTICALS[params.slug];
    if (!trade) {
      throw notFound();
    }
    return trade;
  },
  head: ({ loaderData }) => {
    const trade = loaderData as TradeVertical;
    return {
      meta: [
        { title: trade?.metaTitle || "Trade Specialist Websites | Harley Digital Works" },
        { name: "description", content: trade?.metaDescription || "Websites for UK trades." },
      ],
    };
  },
  component: TradeVerticalPage,
});

const TRADE_ICONS: Record<string, typeof Flame> = {
  "heating-engineers": Flame,
  "commercial-contractors": Building2,
  "electricians": Zap,
  "builders": Hammer,
};

function TradeVerticalPage() {
  const trade = Route.useLoaderData() as TradeVertical;
  const Icon = TRADE_ICONS[trade.slug] || Wrench;

  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-20 text-white md:pt-44 md:pb-28 border-b border-emerald-950/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.2),rgba(255,255,255,0))]" />

        <Container className="relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 backdrop-blur-md">
              <Icon className="h-3.5 w-3.5" />
              <span>{trade.badge}</span>
            </div>
            <span className="rounded-full bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs font-mono text-slate-300">
              {trade.accreditationBadge}
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4.6rem)] font-bold tracking-tight text-white leading-[1.05]">
            {trade.heroHeadline}{" "}
            <span className="text-emerald-400">{trade.heroHighlight}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            {trade.heroSubheadline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <PillButton
              as="link"
              to="/contact"
              search={{ service: undefined, package: undefined, domain: undefined, websiteUrl: undefined }}
              variant="light"
              size="md"
            >
              Get Your {trade.name} Quote
            </PillButton>
            <PillButton
              as="link"
              to="/demos"
              search={{ trade: trade.demoTradeKey as "electrical" | "roofing" | "heating" | "commercial" }}
              variant="ghost"
              size="md"
              className="border-slate-700 text-white hover:bg-slate-900 hover:text-white"
            >
              View Live Interactive Demo
            </PillButton>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 pt-8 border-t border-slate-800">
            {trade.stats.map((st) => (
              <div key={st.label} className="rounded-xl bg-slate-900/60 p-4 border border-slate-800/80">
                <div className="text-xl font-bold font-mono text-emerald-400">{st.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{st.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* High-Ticket Enquiries Breakdown */}
      <section className="py-20 bg-white border-b border-ink/10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                Target High-Margin Work
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Capture the Exact Jobs You Actually Want to Do.
              </h2>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                Generic template sites attract low-margin tyre-kickers. We tailor every heading,
                form field, and case study on your site to position your business as the premier
                specialist for {trade.name.toLowerCase()}.
              </p>

              <div className="mt-8 space-y-3">
                {trade.targetEnquiries.map((enq) => (
                  <div key={enq} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 border border-ink/5">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-ink">{enq}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-ink/10 bg-slate-900 p-8 text-white shadow-xl">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  Included In Your 14-Day Build
                </span>
                <h3 className="mt-2 text-xl font-bold text-white">
                  100% Done-For-You Deliverables
                </h3>

                <div className="mt-6 space-y-4">
                  {trade.includedFeatures.map((feat) => (
                    <div key={feat} className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
                      <Sparkles className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-slate-800 pt-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Turnkey Packages From:</span>
                    <span className="text-2xl font-bold text-white">£1,495</span>
                  </div>
                  <PillButton
                    as="link"
                    to="/proposals"
                    variant="light"
                    size="sm"
                  >
                    View Interactive Proposal Desk
                  </PillButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 14-Day Delivery Callout */}
      <section className="py-20 bg-slate-950 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <Clock className="h-3.5 w-3.5" />
              14-Day Live Google Launch Guaranteed
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl text-white">
              Ready to Upgrade Your {trade.name} Website?
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              No homework, no technical jargon. We write all the copy, build the site, connect your
              domain, and manage everything for £95/month.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PillButton
                as="link"
                to="/contact"
                search={{ service: undefined, package: undefined, domain: undefined, websiteUrl: undefined }}
                variant="light"
                size="md"
              >
                Get a Free Quote (No Obligation)
              </PillButton>
              <PillButton
                as="link"
                to="/trades"
                variant="ghost"
                size="md"
                className="border-slate-700 text-white hover:bg-slate-900 hover:text-white"
              >
                View All Trade Sectors
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
