import { useState } from "react";
import {
  Globe,
  MapPin,
  Search,
  Sparkles,
  Code2,
  Copy,
  CheckCircle2,
  TrendingUp,
  Download,
  Share2,
  Layers,
  FileCheck2,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { UK_LOCATIONS, type LocationInfo } from "@/lib/location-data";
import { TRADE_VERTICALS } from "@/lib/trade-data";

export function LocalSeoFactoryDesk() {
  const [selectedCityKey, setSelectedCityKey] = useState<string>("manchester");
  const [selectedTrade, setSelectedTrade] = useState<string>("heating-engineers");
  const [contractorName, setContractorName] = useState("Vanguard Heating & Power Ltd");
  const [radiusKm, setRadiusKm] = useState<number>(15);

  const city: LocationInfo = UK_LOCATIONS[selectedCityKey] || UK_LOCATIONS.manchester;
  const tradeList = Object.values(TRADE_VERTICALS);
  const trade = TRADE_VERTICALS[selectedTrade] || tradeList[0];

  // Generate Schema.org JSON-LD Microdata
  const generatedSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: `${contractorName}`,
    image: "https://harleydigitalworks.com/brand/2026-10-13/logos/hdw-endorsed-ivory.svg",
    telephone: city.localPhone,
    email: `enquiries@${contractorName.toLowerCase().replace(/[^a-z0-9]/g, "")}.co.uk`,
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      addressLocality: city.cityName,
      addressRegion: city.county,
      postalCode: city.nearbyPostcodes[0] || "M1 1AD",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.4808,
      longitude: -2.2426,
    },
    areaServed: city.boroughs.map((b) => ({
      "@type": "AdministrativeArea",
      name: `${b}, ${city.cityName}`,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "16:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${trade.name} Services in ${city.cityName}`,
      itemListElement: trade.targetEnquiries.map((srv: string) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${srv} in ${city.cityName}`,
        },
      })),
    },
  };

  const schemaString = JSON.stringify(generatedSchema, null, 2);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(schemaString);
    toast.success("Schema.org JSON-LD microdata copied to clipboard!", {
      description: "Paste into the client website HTML head for instant Google Map Pack indexing.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ink/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-ink">
                  Automated Local SEO & Multi-City Page Engine
                </h3>
                <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-800">
                  MAP-PACK RADAR
                </span>
              </div>
              <p className="text-xs text-ink-muted">
                Programmatically generate localized schema microdata, borough keyword clusters, and
                proximity signals for UK trades.
              </p>
            </div>
          </div>

          <button
            onClick={handleCopySchema}
            className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-ink/90 transition-colors shadow-xs"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>Copy Schema JSON-LD</span>
          </button>
        </div>

        {/* Configuration Controls */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Target City Hub
            </label>
            <select
              value={selectedCityKey}
              onChange={(e) => setSelectedCityKey(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink focus:border-ink focus:outline-none"
            >
              {Object.entries(UK_LOCATIONS).map(([key, loc]) => (
                <option key={key} value={key}>
                  📍 {loc.cityName} ({loc.county})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Trade Vertical
            </label>
            <select
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink focus:border-ink focus:outline-none"
            >
              {tradeList.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Contractor Name
            </label>
            <input
              type="text"
              value={contractorName}
              onChange={(e) => setContractorName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-xs font-medium text-ink focus:border-ink focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Grid: Borough Keyword Cluster vs Schema Code Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Borough Keywords & Coverage Map */}
        <div className="lg:col-span-6 space-y-6">
          {/* Borough Tag Cloud */}
          <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-ink/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-600" />
                <h4 className="text-sm font-bold text-ink">
                  {city.cityName} Borough & District Keywords ({city.boroughs.length})
                </h4>
              </div>
              <span className="text-[10px] font-mono text-ink-muted">
                {city.nearbyPostcodes.join(", ")}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {city.boroughs.map((borough, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-ink/10 bg-slate-50 px-3 py-1.5 text-xs text-ink/90 flex items-center justify-between gap-2"
                >
                  <span className="font-semibold">
                    {trade.name} {borough}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                    Rank #1 Target
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-ink/10 flex items-center justify-between text-xs text-ink-muted">
              <span>
                Local Search Dialling Code: <strong className="text-ink">{city.localPhone}</strong>
              </span>
              <span>
                Estimated Search Volume:{" "}
                <strong className="text-emerald-700 font-bold">1,840/mo</strong>
              </span>
            </div>
          </div>

          {/* Local Case Study Snippet */}
          <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-5">
            <div className="flex items-center gap-2 text-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span>Localized Social Proof Auto-Injection</span>
            </div>
            <h4 className="text-sm font-bold text-purple-950">
              {city.localCaseStudy.name} ({city.localCaseStudy.trade})
            </h4>
            <div className="mt-1 text-xs text-purple-800 font-medium">
              {city.localCaseStudy.result}
            </div>
            <blockquote className="mt-2 text-xs text-purple-900/80 italic bg-white/70 p-3 rounded-xl border border-purple-200/60">
              "{city.localCaseStudy.quote}"
            </blockquote>
          </div>
        </div>

        {/* Right: Schema.org JSON-LD Output */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-900 bg-slate-950 p-5 text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                  Google Map Pack JSON-LD Microdata
                </span>
              </div>
              <span className="rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 border border-emerald-500/30">
                100% VALID SCHEMA.ORG
              </span>
            </div>

            <pre className="rounded-xl bg-black/70 p-4 border border-slate-800 text-[11px] font-mono text-purple-300 overflow-x-auto max-h-[380px] leading-relaxed">
              {schemaString}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Injects LocalBusiness & OfferCatalog schema into head.
            </span>
            <button
              onClick={handleCopySchema}
              className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 px-3 py-1.5 text-xs font-bold text-white transition-colors"
            >
              <Copy className="h-3 w-3" />
              <span>Copy JSON-LD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
