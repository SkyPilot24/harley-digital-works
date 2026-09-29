import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import {
  DynamicStagingGenerator,
  type StagingConfig,
} from "@/components/demos/DynamicStagingGenerator";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";
import { CheckCircle2, ShieldCheck, PenLine, Check } from "lucide-react";

const demosSearchSchema = z.object({
  trade: z.string().optional(),
  company: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().optional(),
  palette: z.enum(["dark-gold", "navy-white", "emerald-slate", "crimson-black"]).optional(),
});

export const Route = createFileRoute("/demos")({
  validateSearch: (search) => demosSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Interactive Trade Website Staging Demos | Harley Digital Works" },
      {
        name: "description",
        content:
          "Test live interactive website staging mockups built specifically for UK trades. Features instant price calculators, before/after sliders, and WhatsApp dispatch.",
      },
      {
        property: "og:title",
        content: "Interactive Trade Website Staging Demos | Harley Digital Works",
      },
      {
        property: "og:description",
        content:
          "Test real trade websites built to win local enquiries. Live interactive staging previews by Harley Digital Works.",
      },
    ],
  }),
  component: TradeDemosPage,
});

function TradeDemosPage() {
  const search = Route.useSearch();

  return (
    <PageShell quiet>
      <div className="studio-home">
        {/* Studio Staging Hero */}
        <section className="studio-hero" aria-labelledby="demos-heading">
          <div className="studio-wrap">
            <div className="max-w-3xl pb-8">
              <p className="studio-kicker">
                <span className="studio-kicker-line" /> INTERACTIVE STAGING BLUEPRINTS · UK
              </p>
              <h1 id="demos-heading" className="text-balance">
                Test real trade websites.
                <br />
                <span>Built to win local jobs.</span>
              </h1>
              <p className="hero-description">
                Don’t guess what your website will look like. Explore our live interactive trade
                blueprints below.
              </p>
              <p className="hero-support">
                Every blueprint includes transparent guide estimators, 1-tap WhatsApp triage,
                verified accreditation badges, and before/after project evidence.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-medium text-ink/80 pt-2">
                <div className="flex items-center gap-1.5 bg-white border border-ink/10 px-3 py-1.5 rounded-full shadow-2xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  <span>14-Day Delivery Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-ink/10 px-3 py-1.5 rounded-full shadow-2xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  <span>Zero Writing Required (We Write It All)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-ink/10 px-3 py-1.5 rounded-full shadow-2xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  <span>Ongoing monthly care</span>
                </div>
              </div>
            </div>
          </div>

          <div className="studio-wrap hero-footnote">
            <span>LIVE INTERACTIVE PREVIEWS</span>
            <span>Test layouts across Electrical, Roofing, and Heating specialisms.</span>
          </div>
        </section>

        {/* Interactive Staging Generator */}
        <section className="py-12 bg-[#12161F] text-white">
          <Container>
            <DynamicStagingGenerator
              initialConfig={{
                company: search.company,
                trade: search.trade as StagingConfig["trade"],
                city: search.city,
                phone: search.phone,
                palette: search.palette,
              }}
            />
          </Container>
        </section>

        {/* Packages Integration */}
        <div className="studio-pricing">
          <WebsitePackagesSection
            title="A clear investment. A better website."
            subtitle="Design and copywriting included. Choose a starting point; we’ll confirm the right scope together."
          />
        </div>

        {/* Final CTA */}
        <section className="studio-final" aria-labelledby="demos-final-heading">
          <div className="studio-wrap">
            <p className="studio-kicker">NEXT STEPS</p>
            <div className="final-layout">
              <h2 id="demos-final-heading">
                Ready for your own
                <br />
                <span>custom website?</span>
              </h2>
              <div>
                <p>
                  Book a quick 15-minute consultation to discuss your trade and territory. We’ll
                  prepare a tailored preview for your business.
                </p>
                <PillButton as="link" to="/contact" variant="light" className="studio-button">
                  Request a website quote
                </PillButton>
                <span className="final-price">
                  Initial build + monthly care · Scope agreed before you commit
                </span>
              </div>
            </div>
            <div className="final-reassurance">
              <span>
                <PenLine size={16} /> Copywriting included
              </span>
              <span>
                <Check size={16} /> Fixed scope agreed upfront
              </span>
              <span>
                <ShieldCheck size={16} /> Ongoing managed care
              </span>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
