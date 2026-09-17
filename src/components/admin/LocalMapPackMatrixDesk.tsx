import { useState } from "react";
import {
  MapPin,
  Globe,
  Sparkles,
  Copy,
  Check,
  Download,
  Code2,
  Layers,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface SuburbPageConfig {
  suburb: string;
  county: string;
  postcodeArea: string;
  landmark: string;
  distanceMiles: number;
}

const DEFAULT_SUBURBS: SuburbPageConfig[] = [
  { suburb: "Wilmslow", county: "Cheshire", postcodeArea: "SK9", landmark: "The Carrs Park & Water Lane", distanceMiles: 0 },
  { suburb: "Alderley Edge", county: "Cheshire", postcodeArea: "SK9", landmark: "London Road & The Edge", distanceMiles: 2 },
  { suburb: "Knutsford", county: "Cheshire", postcodeArea: "WA16", landmark: "Tatton Park & King Street", distanceMiles: 6 },
  { suburb: "Altrincham", county: "Greater Manchester", postcodeArea: "WA14", landmark: "Altrincham Market & Hale Road", distanceMiles: 5 },
  { suburb: "Hale & Bowdon", county: "Greater Manchester", postcodeArea: "WA15", landmark: "Ashley Road & Stamford Park", distanceMiles: 4 },
  { suburb: "Prestbury", county: "Cheshire", postcodeArea: "SK10", landmark: "The Village & St Peter's Church", distanceMiles: 7 },
  { suburb: "Macclesfield", county: "Cheshire", postcodeArea: "SK11", landmark: "Market Place & Silk Museum", distanceMiles: 8 },
  { suburb: "Bramhall", county: "Greater Manchester", postcodeArea: "SK7", landmark: "Bramall Hall & Bramhall Park", distanceMiles: 5 },
  { suburb: "Poynton", county: "Cheshire", postcodeArea: "SK12", landmark: "Park Lane & Anson Engine Museum", distanceMiles: 6 },
  { suburb: "Cheadle & Gatley", county: "Greater Manchester", postcodeArea: "SK8", landmark: "High Street & Bruntwood Park", distanceMiles: 7 },
];

export function LocalMapPackMatrixDesk({
  defaultCompany = "Cheshire Heat & Power Ltd",
  defaultTrade = "Heating, Boiler & Heat Pump Specialists",
  defaultPrimaryTown = "Wilmslow",
}: {
  defaultCompany?: string;
  defaultTrade?: string;
  defaultPrimaryTown?: string;
}) {
  const [companyName, setCompanyName] = useState(defaultCompany);
  const [tradeSector, setTradeSector] = useState(defaultTrade);
  const [primaryTown, setPrimaryTown] = useState(defaultPrimaryTown);
  const [phone, setPhone] = useState("01625 800 120");
  const [selectedSuburb, setSelectedSuburb] = useState<SuburbPageConfig>(DEFAULT_SUBURBS[0]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "schema" | "tsx">("preview");

  const generatePageTitle = (sub: SuburbPageConfig) =>
    `${tradeSector} in ${sub.suburb} (${sub.postcodeArea}) | ${companyName}`;

  const generateMetaDesc = (sub: SuburbPageConfig) =>
    `Looking for trusted ${tradeSector.toLowerCase()} in ${sub.suburb}, ${sub.county}? Fast local response near ${sub.landmark}. Gas Safe & MCS certified. Call ${phone}.`;

  const generateSchemaJson = (sub: SuburbPageConfig) => {
    return JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        name: `${companyName} - ${sub.suburb} Division`,
        description: `Premium ${tradeSector.toLowerCase()} serving ${sub.suburb} and surrounding ${sub.county} areas.`,
        telephone: phone,
        areaServed: {
          "@type": "AdministrativeArea",
          name: `${sub.suburb}, ${sub.county} (${sub.postcodeArea})`,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: sub.suburb,
          addressRegion: sub.county,
          postalCode: sub.postcodeArea,
          addressCountry: "GB",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 53.328,
          longitude: -2.229,
        },
        priceRange: "££",
        openingHours: "Mo-Su 00:00-23:59",
      },
      null,
      2
    );
  };

  const generateTsxCode = (sub: SuburbPageConfig) => {
    return `// Auto-Generated Suburb Landing Page for ${sub.suburb}
// Framework: TanStack Start / React 19 + Tailwind CSS
import { PageShell } from "@/components/site/PageShell";
import { QuoteCalculator } from "@/components/site/QuoteCalculator";
import { MapPin, Phone, ShieldCheck, Clock } from "lucide-react";

export default function ${sub.suburb.replace(/[^a-zA-Z]/g, "")}ServicePage() {
  return (
    <PageShell>
      <div className="bg-neutral-950 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 text-xs text-gold-400 font-semibold mb-6">
            <MapPin className="h-3.5 w-3.5" />
            <span>Local Specialists Serving ${sub.suburb} & ${sub.postcodeArea}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            ${tradeSector} in <span className="text-gold-400">${sub.suburb}</span>
          </h1>
          <p className="mt-4 text-neutral-300 text-base max-w-2xl mx-auto">
            Providing homeowners and commercial properties in ${sub.suburb} with rapid-response, certified installations and 24/7 emergency service near ${sub.landmark}.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="tel:${phone.replace(/\s+/g, "")}" className="rounded-full bg-gold-500 text-neutral-950 font-bold px-8 py-3.5 text-sm shadow-xl">
              Call ${phone}
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto py-16 px-6">
        <QuoteCalculator defaultTown="${sub.suburb}" />
      </div>
    </PageShell>
  );
}`;
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`Copied ${key} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadAllPagesJson = () => {
    const data = DEFAULT_SUBURBS.map((sub) => ({
      suburb: sub.suburb,
      county: sub.county,
      postcode: sub.postcodeArea,
      landmark: sub.landmark,
      title: generatePageTitle(sub),
      metaDescription: generateMetaDesc(sub),
      schema: JSON.parse(generateSchemaJson(sub)),
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${companyName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-suburb-matrix.json`;
    a.click();
    toast.success("10 Sub-Town Matrix Pages JSON downloaded!");
  };

  return (
    <div className="space-y-8 rounded-3xl border border-neutral-800 bg-neutral-900 p-6 md:p-8 text-white shadow-2xl">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 border border-gold-500/30 px-3 py-1 text-xs font-semibold text-gold-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Local Map-Pack Matrix Engine</span>
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white tracking-tight">
            Automated Sub-Town Landing Page Factory
          </h2>
          <p className="mt-1 text-xs md:text-sm text-neutral-400 max-w-2xl">
            Instantly generate 10+ high-ranking geo-targeted landing pages with localized landmarks, Google Map Pack Schema.org JSON-LD, and ready-to-deploy React components.
          </p>
        </div>

        <button
          onClick={downloadAllPagesJson}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 hover:bg-gold-400 px-6 py-3 text-xs font-bold text-neutral-950 transition-all shadow-md cursor-pointer shrink-0"
        >
          <Download className="h-4 w-4" />
          <span>Export All 10 Pages (JSON)</span>
        </button>
      </div>

      {/* Configuration Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
            Contractor Business
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
            Trade & Vertical
          </label>
          <input
            type="text"
            value={tradeSector}
            onChange={(e) => setTradeSector(e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
            Primary Hub City
          </label>
          <input
            type="text"
            value={primaryTown}
            onChange={(e) => setPrimaryTown(e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
            Direct Dispatch Phone
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Main 2-Column Matrix Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Left Suburbs List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
            Target Geo-Suburbs ({DEFAULT_SUBURBS.length})
          </div>
          {DEFAULT_SUBURBS.map((sub) => {
            const isSelected = selectedSuburb.suburb === sub.suburb;
            return (
              <button
                key={sub.suburb}
                onClick={() => setSelectedSuburb(sub)}
                className={`w-full text-left rounded-2xl p-3.5 border transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? "bg-neutral-950 border-gold-500 ring-1 ring-gold-500 shadow-md"
                    : "bg-neutral-950/60 border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{sub.suburb}</span>
                    <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] font-mono text-gold-400">
                      {sub.postcodeArea}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5 truncate max-w-[200px]">
                    Near {sub.landmark}
                  </div>
                </div>
                <div className="text-[10px] font-mono text-neutral-400">{sub.distanceMiles} mi</div>
              </button>
            );
          })}
        </div>

        {/* Right Output View */}
        <div className="lg:col-span-8 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 flex flex-col justify-between">
          <div>
            {/* View Tabs */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "preview"
                      ? "bg-gold-500 text-neutral-950"
                      : "bg-neutral-800 text-neutral-300 hover:text-white"
                  }`}
                >
                  Live SEO Preview
                </button>
                <button
                  onClick={() => setActiveTab("schema")}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "schema"
                      ? "bg-gold-500 text-neutral-950"
                      : "bg-neutral-800 text-neutral-300 hover:text-white"
                  }`}
                >
                  Schema.org JSON-LD
                </button>
                <button
                  onClick={() => setActiveTab("tsx")}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "tsx"
                      ? "bg-gold-500 text-neutral-950"
                      : "bg-neutral-800 text-neutral-300 hover:text-white"
                  }`}
                >
                  React TSX Code
                </button>
              </div>

              <button
                onClick={() => {
                  const content =
                    activeTab === "preview"
                      ? `${generatePageTitle(selectedSuburb)}\n\n${generateMetaDesc(selectedSuburb)}`
                      : activeTab === "schema"
                      ? generateSchemaJson(selectedSuburb)
                      : generateTsxCode(selectedSuburb);
                  copyToClipboard(content, `${selectedSuburb.suburb} ${activeTab.toUpperCase()}`);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 text-xs font-semibold text-white border border-neutral-700 transition-colors cursor-pointer"
              >
                {copiedKey ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Tab 1: Live Preview */}
            {activeTab === "preview" && (
              <div className="space-y-6">
                <div className="rounded-xl bg-neutral-900/90 p-4 border border-neutral-800">
                  <div className="text-[10px] font-mono text-emerald-400 mb-1">
                    https://{companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.co.uk/{selectedSuburb.suburb.toLowerCase()}
                  </div>
                  <h3 className="text-base font-bold text-blue-400 hover:underline cursor-pointer">
                    {generatePageTitle(selectedSuburb)}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
                    {generateMetaDesc(selectedSuburb)}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-xl bg-neutral-900/50 p-4 border border-neutral-800">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                      Local Landmark Anchor
                    </span>
                    <span className="font-semibold text-white">{selectedSuburb.landmark}</span>
                  </div>
                  <div className="rounded-xl bg-neutral-900/50 p-4 border border-neutral-800">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                      Target Postcode Sector
                    </span>
                    <span className="font-semibold text-gold-400">{selectedSuburb.postcodeArea}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-neutral-900/50 p-4 border border-neutral-800 text-xs">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1.5">
                    Automated Local FAQ Anchor
                  </span>
                  <div className="space-y-2">
                    <div>
                      <p className="font-bold text-white">
                        Do you provide emergency {tradeSector.toLowerCase()} in {selectedSuburb.suburb}?
                      </p>
                      <p className="text-neutral-400 text-[11px] mt-0.5">
                        Yes! Our mobile team is regularly deployed near {selectedSuburb.landmark} and guarantees rapid response across {selectedSuburb.postcodeArea}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Schema JSON */}
            {activeTab === "schema" && (
              <pre className="rounded-xl bg-neutral-900 p-4 font-mono text-xs text-gold-300 overflow-x-auto max-h-96 leading-relaxed border border-neutral-800">
                {generateSchemaJson(selectedSuburb)}
              </pre>
            )}

            {/* Tab 3: React TSX */}
            {activeTab === "tsx" && (
              <pre className="rounded-xl bg-neutral-900 p-4 font-mono text-xs text-blue-300 overflow-x-auto max-h-96 leading-relaxed border border-neutral-800">
                {generateTsxCode(selectedSuburb)}
              </pre>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span>Part of the £995 Map-Pack Dominance Booster</span>
            <span className="text-emerald-400 font-semibold">100% Google Schema Validated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
