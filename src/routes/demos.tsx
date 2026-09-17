import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import { TagChip } from "@/components/site/TagChip";
import { TradeDemoViewer } from "@/components/demos/TradeDemoViewer";
import { TradeGoogleReviewsWidget } from "@/components/site/TradeGoogleReviewsWidget";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";
import { CheckCircle2, ShieldCheck, Zap, Sparkles, Clock, PhoneCall } from "lucide-react";

const demosSearchSchema = z.object({
  trade: z.enum(["electrical", "roofing", "heating", "commercial"]).optional(),
});

export const Route = createFileRoute("/demos")({
  validateSearch: (search) => demosSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Live Interactive Trade Website Demos | Harley Digital Works" },
      {
        name: "description",
        content:
          "Test live interactive website demos built specifically for UK electricians, roofers, and heating engineers. Features instant price calculators, before/after sliders, and WhatsApp dispatch.",
      },
      {
        property: "og:title",
        content: "Live Interactive Trade Website Demos | Harley Digital Works",
      },
    ],
  }),
  component: TradeDemosPage,
});

function TradeDemosPage() {
  const search = Route.useSearch();
  const initialTrade = search.trade || "electrical";

  return (
    <PageShell>
      {/* Top Header Section */}
      <section className="relative pt-12 pb-8 md:pt-16 md:pb-12 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900/60 via-neutral-950 to-neutral-950">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <TagChip tone="dark">Live Interactive Showcase</TagChip>
              <span className="text-xs text-neutral-400">100% Done-For-You Websites</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Test Real Trade Websites <br />
              <span className="text-gold-400">Built to Win Local Enquiries.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6">
              Don't guess what your website will look like. Click around our live trade demos below. Every demo includes
              instant price estimators, mobile click-to-WhatsApp, verified accreditation badges, and before/after job galleries.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>14-Day Delivery Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Zero Writing Required (We Write It All)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>£95/mo Ongoing Care Plan Option</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Demo Showcase Section */}
      <section className="py-8 md:py-12 bg-neutral-950">
        <Container>
          <TradeDemoViewer initialTrade={initialTrade} />
        </Container>
      </section>

      {/* Why Trade Businesses Choose Harley Digital Works */}
      <section className="py-16 border-t border-neutral-800/80 bg-neutral-900/40">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <TagChip tone="dark">The Done-For-You Difference</TagChip>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
              Why UK trades choose our 14-day turnkey websites
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 mb-4 font-bold text-lg">
                ✍️
              </div>
              <h3 className="text-lg font-bold text-white mb-2">We Write Every Word For You</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                You don't have to write descriptions of your services. We research your trade certifications, write persuasive copy that sells your quality, and organize your coverage locations.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 mb-4 font-bold text-lg">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant WhatsApp & Phone Leads</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Homeowners want fast answers. Your website comes pre-wired with click-to-WhatsApp, emergency status banners, and instant ballpark job estimators that pipe leads directly to your pocket.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 mb-4 font-bold text-lg">
                🛡️
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Managed Monthly Care (£95/mo)</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Never worry about hosting, WordPress plugins crashing, or SSL certificates expiring. We host it, update your photos/reviews on demand, and monitor it 24/7.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Verified Trade Reviews */}
      <TradeGoogleReviewsWidget
        title="Verified Reviews from UK Contractors"
        subtitle="See how real trade businesses across Manchester, Birmingham, Leeds, and London grow their monthly revenue."
      />
    </PageShell>
  );
}
