import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import { TradeRoiCalculator } from "@/components/site/TradeRoiCalculator";
import { CheckCircle2, TrendingUp, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Trade Website ROI & Revenue Calculator | Harley Digital Works" },
      {
        name: "description",
        content:
          "Calculate your estimated return on investment. See how just 1 to 3 additional trade enquiries per month generates £20,000 to £100,000+ in extra annual turnover.",
      },
      {
        property: "og:title",
        content: "Trade Website ROI & Revenue Calculator | Harley Digital Works",
      },
    ],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  return (
    <PageShell>
      {/* Header */}
      <section className="relative pt-12 pb-8 md:pt-16 md:pb-12 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900/60 via-neutral-950 to-neutral-950">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <TagChip tone="dark">Trade Financial Projection</TagChip>
              <span className="text-xs text-neutral-400">Zero Fluff • Hard Numbers</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              How Much Revenue Is Your <br />
              <span className="text-gold-400">Current Website Costing You?</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6">
              When a website looks outdated or hard to navigate on mobile, homeowners and commercial
              clients move on to the next contractor on Google. Use our calculator below to see the
              commercial impact of a high-converting trade website.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Average Payback Under 30 Days</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>100% Fixed Price (£1,495 / £2,995)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>£95/mo Rolling Care Plan</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Calculator Section */}
      <section className="py-10 md:py-16 bg-neutral-950">
        <Container>
          <TradeRoiCalculator />
        </Container>
      </section>
    </PageShell>
  );
}
