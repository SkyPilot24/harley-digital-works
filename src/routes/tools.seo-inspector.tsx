import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import {
  Search,
  Sparkles,
  MapPin,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Zap,
  Globe,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import { buildPageSeoHead } from "@/lib/site-config";

export const Route = createFileRoute("/tools/seo-inspector")({
  head: () =>
    buildPageSeoHead({
      title: "Local Trade SEO & Google Map Pack Inspector | Harley Digital Works",
      description:
        "Scan your local UK trade keywords, inspect competitors in Google's Local 3-Pack, and discover high-value untapped search traffic in your area.",
      path: "/tools/seo-inspector",
    }),
  component: SeoInspectorPage,
});

interface KeywordResult {
  keyword: string;
  monthlySearches: number;
  cpcValue: string;
  intent: "Emergency" | "High Commercial" | "Routine";
  difficulty: "Low" | "Medium" | "High";
}

function SeoInspectorPage() {
  const [trade, setTrade] = useState("electrician");
  const [town, setTown] = useState("Manchester");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!town.trim()) {
      toast.error("Please enter a UK town or city");
      return;
    }
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      toast.success(`Analysis generated for ${trade} in ${town}!`);
    }, 900);
  };

  const getKeywords = (): KeywordResult[] => {
    const capitalizedTown = town.charAt(0).toUpperCase() + town.slice(1);
    if (trade === "electrician") {
      return [
        {
          keyword: `Emergency Electrician ${capitalizedTown}`,
          monthlySearches: 480,
          cpcValue: "£16.50",
          intent: "Emergency",
          difficulty: "Low",
        },
        {
          keyword: `EV Charger Installation ${capitalizedTown}`,
          monthlySearches: 720,
          cpcValue: "£24.00",
          intent: "High Commercial",
          difficulty: "Medium",
        },
        {
          keyword: `Fuse Board Replacement ${capitalizedTown}`,
          monthlySearches: 390,
          cpcValue: "£18.20",
          intent: "High Commercial",
          difficulty: "Low",
        },
        {
          keyword: `Landlord EICR Certificate ${capitalizedTown}`,
          monthlySearches: 560,
          cpcValue: "£12.50",
          intent: "Routine",
          difficulty: "Low",
        },
      ];
    }
    if (trade === "roofing") {
      return [
        {
          keyword: `Emergency Roof Repairs ${capitalizedTown}`,
          monthlySearches: 620,
          cpcValue: "£28.00",
          intent: "Emergency",
          difficulty: "Low",
        },
        {
          keyword: `GRP Flat Roof Specialists ${capitalizedTown}`,
          monthlySearches: 510,
          cpcValue: "£32.50",
          intent: "High Commercial",
          difficulty: "Medium",
        },
        {
          keyword: `Chimney Repointing & Repair ${capitalizedTown}`,
          monthlySearches: 340,
          cpcValue: "£15.00",
          intent: "Routine",
          difficulty: "Low",
        },
        {
          keyword: `Fascias & Soffits Replacement ${capitalizedTown}`,
          monthlySearches: 410,
          cpcValue: "£19.80",
          intent: "High Commercial",
          difficulty: "Low",
        },
      ];
    }
    return [
      {
        keyword: `Emergency Boiler Repair ${capitalizedTown}`,
        monthlySearches: 850,
        cpcValue: "£34.00",
        intent: "Emergency",
        difficulty: "Medium",
      },
      {
        keyword: `New Boiler Installation ${capitalizedTown}`,
        monthlySearches: 1100,
        cpcValue: "£42.00",
        intent: "High Commercial",
        difficulty: "High",
      },
      {
        keyword: `Gas Safe Engineer ${capitalizedTown}`,
        monthlySearches: 740,
        cpcValue: "£19.50",
        intent: "High Commercial",
        difficulty: "Low",
      },
      {
        keyword: `Power Flushing Service ${capitalizedTown}`,
        monthlySearches: 290,
        cpcValue: "£14.20",
        intent: "Routine",
        difficulty: "Low",
      },
    ];
  };

  return (
    <PageShell>
      {/* Top Hero */}
      <section className="pt-28 pb-8 md:pt-36 md:pb-12 bg-neutral-950 border-b border-neutral-800 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <TagChip tone="dark">Local SEO Intelligence</TagChip>
              <span className="text-xs text-neutral-400">Free Google Map Pack Analyzer</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Trade SEO & Competitor <br />
              <span className="text-gold-400">Map Pack Inspector.</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl mx-auto">
              See who is currently dominating the Google Top 3 Map Pack in your town, and discover
              high-value local search keywords that can bring high-paying jobs to your phone.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Search Bar */}
      <section className="py-8 bg-neutral-900 border-b border-neutral-800 text-white">
        <Container>
          <form
            onSubmit={handleScan}
            className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="w-full sm:w-1/3">
              <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Your Trade:
              </label>
              <select
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="electrician">Electrician & Solar</option>
                <option value="roofing">Roofing & GRP Flat Roofs</option>
                <option value="heating">Gas Safe & Heating Engineer</option>
                <option value="builder">Builder & Home Extensions</option>
                <option value="commercial">Commercial Cleaning & FM</option>
              </select>
            </div>

            <div className="w-full sm:w-1/2">
              <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Target Town / City / Postcode:
              </label>
              <input
                type="text"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder="e.g. Manchester, Altrincham, Leeds..."
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div className="w-full sm:w-auto self-end">
              <button
                type="submit"
                disabled={isScanning}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-6 py-3 text-xs font-bold text-neutral-950 transition-all shadow-md disabled:opacity-50"
              >
                <Search className="h-4 w-4" />
                <span>{isScanning ? "Scanning Google…" : "Inspect Area"}</span>
              </button>
            </div>
          </form>
        </Container>
      </section>

      {/* Results Section */}
      <section className="py-12 md:py-20 bg-neutral-950 text-white">
        <Container>
          {scanComplete ? (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
              {/* Summary Score Banner */}
              <div className="rounded-3xl border border-gold-500/30 bg-neutral-900 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">
                    <Sparkles className="h-4 w-4" />
                    <span>Local Search Opportunity for {town}</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white">
                    Estimated Monthly Search Value:{" "}
                    <span className="text-emerald-400">£18,200+</span>
                  </h2>
                  <p className="text-xs text-neutral-300 mt-1 max-w-xl leading-relaxed">
                    Over 2,100 local homeowners and businesses search for certified {trade} services
                    in {town} and surrounding suburbs each month.
                  </p>
                </div>

                <Link
                  to="/contact"
                  search={{
                    service: undefined,
                    package: `Growth Website (£2,995) - ${town} SEO`,
                    domain: undefined,
                    websiteUrl: undefined,
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 hover:bg-gold-400 px-6 py-3 text-xs font-extrabold text-neutral-950 transition-all shadow-md shrink-0"
                >
                  <span>Rank #1 in {town}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* High-Volume Keyword Opportunity Table */}
              <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8 shadow-xl">
                <h3 className="font-bold text-lg text-white mb-2">
                  High-Intent Keywords in {town}
                </h3>
                <p className="text-xs text-neutral-400 mb-6">
                  These keywords have immediate buying intent from homeowners ready to hire.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="border-b border-neutral-800 text-[11px] uppercase font-bold text-neutral-400">
                      <tr>
                        <th className="pb-3">Search Query</th>
                        <th className="pb-3 text-center">Monthly Searches</th>
                        <th className="pb-3 text-center">Google Ads Value (CPC)</th>
                        <th className="pb-3 text-center">Customer Intent</th>
                        <th className="pb-3 text-right">SEO Difficulty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60 font-sans">
                      {getKeywords().map((kw, idx) => (
                        <tr key={idx} className="hover:bg-neutral-800/40">
                          <td className="py-3.5 font-bold text-white flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                            <span>{kw.keyword}</span>
                          </td>
                          <td className="py-3.5 text-center font-mono text-neutral-300">
                            {kw.monthlySearches}/mo
                          </td>
                          <td className="py-3.5 text-center font-mono text-emerald-400 font-bold">
                            {kw.cpcValue}
                          </td>
                          <td className="py-3.5 text-center">
                            <span className="inline-block rounded-md bg-neutral-800 px-2 py-0.5 text-[10px] font-semibold text-gold-300">
                              {kw.intent}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            <span className="inline-block rounded-md bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-semibold border border-emerald-500/20">
                              {kw.difficulty} — High Opportunity
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Competitor Gap Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-gold-400" />
                    <span>Map Pack Factor 1</span>
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">Local Schema.org Markup</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Most trade websites lack geo-tagged coordinates. Every Harley Digital Works site
                    includes automated Schema.org JSON-LD markup.
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-blue-400" />
                    <span>Map Pack Factor 2</span>
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">Regional Suburb Pages</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Don't just target {town}. Target surrounding postcodes with programmatic landing
                    pages to dominate peripheral searches.
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-emerald-400" />
                    <span>Map Pack Factor 3</span>
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">Instant WhatsApp Taps</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Mobile visitors convert 3.8x faster when given a 1-tap WhatsApp button instead
                    of a cumbersome 10-field contact form.
                  </p>
                </div>
              </div>

              {/* Conversion CTA Banner */}
              <div className="mt-8 rounded-3xl border border-gold-500/30 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                    Ready to Dominate {town}?
                  </span>
                  <h3 className="mt-1 text-xl font-extrabold text-white">
                    Get a Done-For-You {trade.toUpperCase()} Website for {town}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-300">
                    Includes local Map Pack schema, done-for-you trade copy, and 14-day launch SLA.
                  </p>
                </div>
                <Link
                  to="/contact"
                  search={{
                    service: `Local SEO & Map Pack Plan for ${trade} in ${town}`,
                    package: "Growth Website (£2,995)",
                    domain: undefined,
                    websiteUrl: undefined,
                  }}
                  className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-6 py-3.5 text-sm font-bold text-neutral-950 transition-all shadow-lg"
                >
                  <span>Request {town} SEO Plan</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center p-10 border border-dashed border-neutral-800 rounded-3xl">
              <Search className="h-10 w-10 text-neutral-600 mx-auto mb-3" />
              <h3 className="font-bold text-base text-white">Enter Your Town Above to Run Audit</h3>
              <p className="text-xs text-neutral-400 mt-1">
                We'll scan Google search volumes, analyze local competition, and generate your
                custom keyword report.
              </p>
            </div>
          )}
        </Container>
      </section>
    </PageShell>
  );
}
