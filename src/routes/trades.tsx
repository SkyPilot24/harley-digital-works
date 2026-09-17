import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TRADE_VERTICALS } from "@/lib/trade-data";
import {
  Wrench,
  Flame,
  Building2,
  Zap,
  Hammer,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/trades")({
  head: () => ({
    meta: [
      { title: "Specialist Websites by Trade Sector | Harley Digital Works" },
      {
        name: "description",
        content:
          "Explore custom websites and digital infrastructure tailored specifically for UK heating engineers, commercial contractors, electricians, and master builders.",
      },
    ],
  }),
  component: TradesIndexPage,
});

const TRADE_ICONS: Record<string, typeof Flame> = {
  "heating-engineers": Flame,
  "commercial-contractors": Building2,
  "electricians": Zap,
  "builders": Hammer,
};

function TradesIndexPage() {
  const verticals = Object.values(TRADE_VERTICALS);

  return (
    <PageShell>
      {/* Hero Section */}
      <section className="bg-slate-950 pt-32 pb-20 text-white md:pt-44 md:pb-28 border-b border-slate-800">
        <Container>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-300">
            <Wrench className="h-3.5 w-3.5" />
            <span>UK Trade Sector Specialisms · Harley Digital Works</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,5.5vw,4.6rem)] font-bold tracking-tight text-white leading-[1.05]">
            Engineered For Your Specific Trade.{" "}
            <span className="text-emerald-400">100% Done-For-You.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            We don't build generic cookie-cutter templates. We write bespoke technical copy,
            embed trade-specific quote calculators, and showcase your exact accreditations
            (Gas Safe, NICEIC, CHAS, FMB) to win premium jobs.
          </p>
        </Container>
      </section>

      {/* Trade Verticals Grid */}
      <section className="py-20 md:py-28 bg-slate-50 border-b border-ink/10">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {verticals.map((trade) => {
              const Icon = TRADE_ICONS[trade.slug] || Wrench;
              return (
                <div
                  key={trade.slug}
                  className="rounded-2xl border border-ink/10 bg-white p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-mono font-semibold text-slate-700">
                        {trade.accreditationBadge}
                      </span>
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-ink">{trade.name}</h2>
                    <p className="mt-2 text-xs font-mono text-emerald-700 font-semibold">
                      Typical Target Deal: {trade.averageJobValue}
                    </p>

                    <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                      {trade.heroSubheadline}
                    </p>

                    <div className="mt-6 border-t border-ink/10 pt-4 space-y-2">
                      <p className="text-xs font-mono uppercase tracking-wider text-ink-muted">
                        High-Ticket Target Jobs:
                      </p>
                      {trade.targetEnquiries.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-ink">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between">
                    <Link
                      to="/trades/$slug"
                      params={{ slug: trade.slug }}
                      className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <span>Explore {trade.name} Blueprint</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      to="/demos"
                      search={{ trade: trade.demoTradeKey as "electrical" | "roofing" | "heating" | "commercial" }}
                      className="text-xs text-ink-muted hover:text-ink underline"
                    >
                      View Live Demo
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Standard SLA Banner */}
      <section className="py-20 bg-slate-900 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              14-Day Delivery SLA
            </span>
            <h3 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Don't see your exact trade vertical?
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              We build high-converting websites for all UK trade contractors including roofers,
              landscapers, carpenters, and commercial glaziers. We write 100% of your copy.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PillButton
                as="link"
                to="/contact"
                search={{ service: undefined, package: undefined, domain: undefined, websiteUrl: undefined }}
                variant="light"
                size="md"
              >
                Get a Free Quote For Your Trade
              </PillButton>
              <PillButton
                as="link"
                to="/demos"
                variant="ghost"
                size="md"
                className="border-slate-700 text-white hover:bg-slate-800 hover:text-white"
              >
                Explore Live Trade Demos
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
