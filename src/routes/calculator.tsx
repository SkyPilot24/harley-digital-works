import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import { TradeRoiCalculator } from "@/components/site/TradeRoiCalculator";
import { CheckCircle2 } from "lucide-react";
import { buildPageSeoHead } from "@/lib/site-config";

export const Route = createFileRoute("/calculator")({
  head: () =>
    buildPageSeoHead({
      title: "Trade Website ROI & Revenue Calculator | Harley Digital Works",
      description:
        "Calculate your estimated return on investment. See how just 1 to 3 additional trade enquiries per month generates £20,000 to £100,000+ in extra annual turnover.",
      path: "/calculator",
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
                <span>Illustrative Scenario Modeling</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Ratified Setup (£1,495 · Zero VAT)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>£249/mo Managed Care Plan</span>
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
