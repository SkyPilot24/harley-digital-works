import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import { UK_LOCATIONS } from "@/lib/location-data";
import { MapPin, ArrowRight, ShieldCheck, CheckCircle2, PhoneCall, Sparkles } from "lucide-react";
import { PillButton } from "@/components/site/PillButton";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "UK Service Areas & Regional Trade Web Design | Harley Digital Works" },
      {
        name: "description",
        content:
          "Explore our regional service areas across the UK. Done-For-You websites with copywriting, local SEO, and monthly care for trades in Manchester, Birmingham, Leeds, London, Cheshire, and Bristol.",
      },
      {
        property: "og:title",
        content: "UK Service Areas & Regional Trade Web Design | Harley Digital Works",
      },
    ],
  }),
  component: LocationsDirectoryPage,
});

function LocationsDirectoryPage() {
  const locationsList = Object.values(UK_LOCATIONS);

  return (
    <PageShell>
      {/* Header */}
      <section className="relative pt-12 pb-8 md:pt-16 md:pb-12 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900/60 via-neutral-950 to-neutral-950">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <TagChip tone="dark">UK Coverage & Regional Hubs</TagChip>
              <span className="text-xs text-neutral-400">Local SEO Ready</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Done-For-You Websites for Trades <br />
              <span className="text-gold-400">Across the United Kingdom.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6">
              We help local trade contractors and small businesses win their regional markets. Every website is built with
              custom localized copy, area-specific Schema.org data, and instant quote capture.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>14-Day Delivery Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Local Postcode Targeting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>£95/mo Managed Care</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Locations Grid */}
      <section className="py-12 md:py-16 bg-neutral-950">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationsList.map((loc) => (
              <div
                key={loc.slug}
                className="group rounded-3xl border border-neutral-800 bg-neutral-900/60 hover:border-gold-500/50 hover:bg-neutral-900/90 transition-all p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gold-400" />
                      <h2 className="text-xl font-bold text-white tracking-tight">{loc.cityName}</h2>
                    </div>
                    <span className="text-xs text-gold-400 font-semibold bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/20">
                      {loc.stats.tradeSitesLaunched} Sites Live
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 font-medium mb-3">{loc.regionName}</p>
                  <p className="text-sm text-neutral-300 line-clamp-2 mb-5 leading-relaxed">{loc.subheadline}</p>

                  {/* Boroughs Badges */}
                  <div className="mb-6">
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Key Areas:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.boroughs.slice(0, 4).map((b) => (
                        <span
                          key={b}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300"
                        >
                          {b}
                        </span>
                      ))}
                      {loc.boroughs.length > 4 && (
                        <span className="text-[11px] px-2 py-1 text-neutral-500">+{loc.boroughs.length - 4} more</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <div className="text-xs text-neutral-400 font-mono">
                    📞 {loc.localPhone}
                  </div>
                  <Link
                    to="/locations/$slug"
                    params={{ slug: loc.slug }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 group-hover:text-gold-300 transition-colors"
                  >
                    <span>View {loc.cityName} Hub</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Callout */}
      <section className="py-12 border-t border-neutral-800 bg-neutral-900/30">
        <Container>
          <div className="rounded-3xl border border-gold-500/30 bg-gradient-to-r from-neutral-900 to-neutral-950 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
                <Sparkles className="h-4 w-4" />
                <span>Don't see your specific town?</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">We build websites for trades all across the UK.</h3>
              <p className="text-sm text-neutral-400 mt-1 max-w-xl">
                We configure your website with your exact radius, coverage postcodes, and Google Business Profile schema.
              </p>
            </div>
            <PillButton as="link" to="/contact" variant="dark" size="md">
              Get a Free Trade Quote
            </PillButton>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
