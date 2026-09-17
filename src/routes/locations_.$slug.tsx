import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import { PillButton } from "@/components/site/PillButton";
import { UK_LOCATIONS, type LocationInfo } from "@/lib/location-data";
import { WebsitePackagesSection } from "@/components/site/WebsitePackagesSection";
import {
  MapPin,
  CheckCircle2,
  PhoneCall,
  Star,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/locations_/$slug")({
  loader: ({ params }) => {
    const loc = UK_LOCATIONS[params.slug];
    if (!loc) {
      throw notFound();
    }
    return loc;
  },
  head: ({ loaderData }) => {
    const loc = loaderData as LocationInfo;
    const title = `Web Design & Lead Generation for ${loc?.cityName || "UK"} Trades | Harley Digital Works`;
    const description = `Done-For-You websites for electricians, plumbers, roofers and contractors in ${loc?.cityName || "UK"} & ${loc?.regionName || "surrounding areas"}. Written and launched in 14 days with £95/mo care plans.`;

    const schemaJson = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `Harley Digital Works - ${loc?.cityName || "UK"}`,
      parentOrganization: {
        "@type": "Organization",
        name: "The Harley Group",
        url: "https://harleydigitalworks.com",
      },
      url: `https://harleydigitalworks.com/locations/${loc?.slug || "uk"}`,
      telephone: loc?.localPhone || "+44-161-820-4910",
      priceRange: "££",
      address: {
        "@type": "PostalAddress",
        addressLocality: loc?.cityName || "Manchester",
        addressRegion: loc?.county || "Greater Manchester",
        addressCountry: "GB",
      },
      areaServed: loc?.boroughs.map((b) => ({ "@type": "City", name: b })) || [],
      knowsAbout: [
        "Trade Website Design",
        "Local SEO for Tradespeople",
        "Website Hosting & Care Plans",
        "Lead Generation for Contractors",
      ],
    });

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: schemaJson,
        },
      ],
    };
  },
  component: LocationDetailPage,
});

function LocationDetailPage() {
  const loc = Route.useLoaderData() as LocationInfo;

  return (
    <PageShell>
      {/* Localized Hero */}
      <section className="relative pt-12 pb-12 md:pt-16 md:pb-20 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900/70 via-neutral-950 to-neutral-950">
        <Container>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <TagChip tone="dark">
                <MapPin className="h-3 w-3 mr-1 inline text-gold-400" />
                {loc.cityName} & {loc.regionName}
              </TagChip>
              <span className="text-xs text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                🟢 Local Trade Website Specialists
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
              {loc.headline}
            </h1>

            <p className="text-base sm:text-xl text-neutral-300 leading-relaxed mb-8 max-w-3xl">
              {loc.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <PillButton
                as="link"
                to="/contact"
                search={{
                  package: "launch",
                  service: `Trade Website (${loc.cityName})`,
                  domain: undefined,
                  websiteUrl: undefined,
                }}
                variant="dark"
                size="md"
              >
                <span>Get a Free {loc.cityName} Trade Quote</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </PillButton>

              <a
                href={`tel:${loc.localPhone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:border-gold-500 hover:text-gold-400 transition-all"
              >
                <PhoneCall className="h-4 w-4 text-gold-400" />
                <span>Call Local Desk: {loc.localPhone}</span>
              </a>
            </div>

            {/* Coverage Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-800/80">
              <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-2xl">
                <div className="text-2xl font-extrabold text-white tracking-tight">{loc.stats.tradeSitesLaunched}+</div>
                <div className="text-xs text-neutral-400 mt-0.5">Live {loc.cityName} Trade Websites</div>
              </div>
              <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-2xl">
                <div className="text-2xl font-extrabold text-gold-400 tracking-tight">{loc.stats.avgTurnaroundDays} Days</div>
                <div className="text-xs text-neutral-400 mt-0.5">Turnaround Time (Ready to Launch)</div>
              </div>
              <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-2xl col-span-2 sm:col-span-1">
                <div className="text-2xl font-extrabold text-emerald-400 tracking-tight">£95/mo</div>
                <div className="text-xs text-neutral-400 mt-0.5">Managed Hosting & Care Plan</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Local Coverage Areas */}
      <section className="py-12 border-b border-neutral-800 bg-neutral-950">
        <Container>
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-400" />
              <span>Coverage Areas Across {loc.cityName} & {loc.county}</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mb-4">
              We configure your website with precise Schema.org geo-targeting and service radius for all surrounding boroughs and postcodes:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {loc.boroughs.map((b) => (
                <span
                  key={b}
                  className="px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-200"
                >
                  📍 {b}
                </span>
              ))}
            </div>
            <div className="text-xs text-neutral-500 font-mono">
              Targeted Postcodes: {loc.nearbyPostcodes.join(", ")}
            </div>
          </div>
        </Container>
      </section>

      {/* Regional Case Study Highlight */}
      <section className="py-12 md:py-16 bg-neutral-900/40 border-b border-neutral-800">
        <Container>
          <div className="max-w-4xl mx-auto rounded-3xl border border-gold-500/30 bg-neutral-900/90 p-6 md:p-10 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 mb-3">
              <TrendingUp className="h-4 w-4" />
              <span>Local Client Spotlight • {loc.cityName}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              {loc.localCaseStudy.name}
            </h3>
            <div className="text-sm font-semibold text-emerald-400 mb-4">{loc.localCaseStudy.result}</div>

            <blockquote className="text-base text-neutral-200 italic border-l-2 border-gold-500 pl-4 my-4 leading-relaxed">
              "{loc.localCaseStudy.quote}"
            </blockquote>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
              <span>{loc.localCaseStudy.trade} • {loc.localCaseStudy.location}</span>
              <Link
                to="/demos"
                search={{ trade: "electrical" }}
                className="text-gold-400 hover:text-gold-300 font-semibold inline-flex items-center gap-1"
              >
                <span>Test Live Demo Website</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Transparent Pricing Packages */}
      <section className="py-12 md:py-20 bg-neutral-950">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <TagChip tone="dark">Fixed Turnkey Pricing</TagChip>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-3">
              Simple, Transparent Packages for {loc.cityName} Businesses
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              No hidden fees, no tech headaches. 100% written, built, and launched for you.
            </p>
          </div>

          <WebsitePackagesSection />
        </Container>
      </section>
    </PageShell>
  );
}
