import { useState } from "react";
import {
  FileText,
  Video,
  Sparkles,
  Download,
  Copy,
  Check,
  Send,
  ExternalLink,
  Zap,
  Gauge,
  ShieldCheck,
  Clock,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

interface PitchDeckProps {
  initialDirector?: string;
  initialCompany?: string;
  initialTrade?: string;
  initialCity?: string;
  initialUrl?: string;
  initialSpeed?: string;
  initialPhone?: string;
}

export function AuditPitchDeckGenerator({
  initialDirector = "Mark Taylor",
  initialCompany = "Cheshire Heat & Power Ltd",
  initialTrade = "Heating & Boiler Specialists",
  initialCity = "Wilmslow",
  initialUrl = "cheshireheat.co.uk",
  initialSpeed = "5.2s",
  initialPhone = "07700900123",
}: PitchDeckProps) {
  const [director, setDirector] = useState(initialDirector);
  const [company, setCompany] = useState(initialCompany);
  const [trade, setTrade] = useState(initialTrade);
  const [city, setCity] = useState(initialCity);
  const [url, setUrl] = useState(initialUrl);
  const [speed, setSpeed] = useState(initialSpeed);
  const [phone, setPhone] = useState(initialPhone);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const cleanUrl = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

  const loomScript = `Hi ${director},

Robbie Harley here from Harley Digital Works in Wilmslow.

I was researching top-tier ${trade.toLowerCase()} across ${city} and pulled up ${cleanUrl}.

Your work and local reputation look stellar, but when I ran your site through our edge diagnostic, your mobile load time clocked in at ${speed}. On mobile 4G/5G, over 53% of local homeowners click back to Google if a site takes more than 3 seconds to load.

In high-margin sectors like ${trade.toLowerCase()}, that bounce rate represents roughly £3,500 to £5,000 every single month in lost boiler installations and quote requests that go straight to your competitors.

We build sub-second V8 edge websites specifically for UK trade contractors that launch in exactly 14 days, with 1-tap quote calculators and instant WhatsApp lead capture.

I've attached our 4-slide speed teardown below. If you'd like to see what a high-speed upgrade looks like for ${company}, let me know and I'll send over a 60-second interactive preview!

Best regards,
Robbie Harley
The Harley Group · Harley Digital Works
0117 214 1357 · harleydigitalworks.com`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`Copied ${key} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const slides = [
    {
      title: "Slide 1: Executive Speed & Revenue Teardown",
      subtitle: `Commercial Opportunity & Mobile Friction Analysis for ${company}`,
      render: (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4">
            <div>
              <span className="rounded-md bg-amber-50 text-amber-700 px-2.5 py-1 text-xs font-semibold border border-amber-200">
                AUDIT FINDING: HIGH BOUNCE RISK
              </span>
              <h3 className="mt-2 text-xl font-bold text-ink">
                {company} · Digital Performance Teardown
              </h3>
            </div>
            <div className="text-right text-xs text-ink-muted">
              Prepared for: <span className="font-bold text-ink">{director}</span>
              <br />
              Target Location: <span className="font-semibold text-ink">{city} & Cheshire</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-red-600">
                <AlertTriangle className="h-4 w-4" />
                <span>Current Mobile Load Speed</span>
              </div>
              <div className="mt-2 text-3xl font-black text-red-700">{speed}</div>
              <p className="mt-1 text-xs text-red-600/80">
                Over 53% of mobile searchers bounce if page takes &gt;3s.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                <TrendingDown className="h-4 w-4" />
                <span>Estimated Monthly Lost Quotes</span>
              </div>
              <div className="mt-2 text-3xl font-black text-amber-700">~6 to 9 Leads</div>
              <p className="mt-1 text-xs text-amber-700/80">
                High-intent homeowners opting for faster local competitors.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                <span>Recoverable Monthly Revenue</span>
              </div>
              <div className="mt-2 text-3xl font-black text-emerald-700">£4,200+</div>
              <p className="mt-1 text-xs text-emerald-700/80">
                Based on average £1,800–£3,200 ticket value in {trade}.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Slide 2: Empirical Speed & Core Web Vitals Benchmark",
      subtitle: `Legacy Stack vs Harley Cloudflare V8 Edge Isolate Architecture`,
      render: (
        <div className="space-y-6">
          <div className="border-b border-ink/10 pb-4">
            <span className="rounded-md bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-semibold border border-emerald-200">
              SPEED & INFRASTRUCTURE COMPARISON
            </span>
            <h3 className="mt-2 text-xl font-bold text-ink">
              Eliminating Server Latency on UK Mobile Networks
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-red-200 bg-red-50/30 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-red-900">Current Website ({cleanUrl})</span>
                <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                  Legacy CMS
                </span>
              </div>
              <div className="space-y-3 text-xs text-ink/80">
                <div className="flex justify-between py-1 border-b border-red-100">
                  <span>Time to First Byte (TTFB):</span>
                  <span className="font-mono font-bold text-red-700">820ms</span>
                </div>
                <div className="flex justify-between py-1 border-b border-red-100">
                  <span>First Contentful Paint (FCP):</span>
                  <span className="font-mono font-bold text-red-700">{speed}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-red-100">
                  <span>Google Lighthouse Performance:</span>
                  <span className="font-mono font-bold text-red-700">38 / 100</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Mobile 4G UX Score:</span>
                  <span className="font-mono font-bold text-red-700">Needs Improvement</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-300 bg-emerald-50/40 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-emerald-950">Harley Edge Upgrade</span>
                <span className="rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                  V8 Edge Isolate
                </span>
              </div>
              <div className="space-y-3 text-xs text-ink/80">
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span>Time to First Byte (TTFB):</span>
                  <span className="font-mono font-bold text-emerald-700">22ms (Sub-30ms)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span>First Contentful Paint (FCP):</span>
                  <span className="font-mono font-bold text-emerald-700">0.45s (Instant)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span>Google Lighthouse Performance:</span>
                  <span className="font-mono font-bold text-emerald-700">100 / 100 Perfect</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Mobile 4G UX Score:</span>
                  <span className="font-mono font-bold text-emerald-700">A+ Instant Render</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Slide 3: High-Converting Trade Modules",
      subtitle: `3 Core Conversion Engines Engineered into Your Deployed Build`,
      render: (
        <div className="space-y-6">
          <div className="border-b border-ink/10 pb-4">
            <span className="rounded-md bg-indigo-50 text-indigo-700 px-2.5 py-1 text-xs font-semibold border border-indigo-200">
              DONE-FOR-YOU CONVERSION STACK
            </span>
            <h3 className="mt-2 text-xl font-bold text-ink">
              Turn Casual Browsers into Paid Customer Inquiries
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-ink/10 bg-surface-sage p-5">
              <div className="h-10 w-10 rounded-xl bg-ink text-white flex items-center justify-center mb-3">
                <Zap className="h-5 w-5 text-gold-400" />
              </div>
              <h4 className="font-bold text-sm text-ink">1-Tap Quote Calculator</h4>
              <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                Homeowners configure their job scope in 3 taps, delivering pre-qualified quote leads
                straight to your phone.
              </p>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-surface-sage p-5">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm text-ink">Floating WhatsApp Desk</h4>
              <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                Captures urgent out-of-hours emergencies directly to your WhatsApp without forcing
                customers to fill long contact forms.
              </p>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-surface-sage p-5">
              <div className="h-10 w-10 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center mb-3">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm text-ink">5-Star Review Engine</h4>
              <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                Automates post-job review collection, funneling 5-star ratings straight to Google
                and Checkatrade.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Slide 4: Commercial Terms & 14-Day Delivery SLA",
      subtitle: `Fixed Investment, 50% Deposit & 100% Done-For-You Delivery`,
      render: (
        <div className="space-y-6">
          <div className="border-b border-ink/10 pb-4">
            <span className="rounded-md bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-semibold border border-emerald-200">
              COMMERCIAL PROPOSAL & GUARANTEE
            </span>
            <h3 className="mt-2 text-xl font-bold text-ink">
              14-Day Turnaround SLA · Zero Homework for {director}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-ink/15 bg-white p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base text-ink">Launch Package</h4>
                  <p className="text-xs text-ink-muted">Turnkey Trade Platform</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-ink">£1,495</div>
                  <div className="text-[10px] text-ink-muted">or £747.50 50% Deposit</div>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-ink-muted border-t border-ink/10 pt-4">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>Custom React 19 + Tailwind Design</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>Interactive 1-Tap Quote Calculator</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>Cloudflare V8 Sub-Second Hosting & SSL</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>14-Day Delivery SLA Guaranteed</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-primary bg-primary/[0.03] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-block rounded bg-primary px-2 py-0.5 text-[10px] font-bold text-white mb-1">
                    RECOMMENDED
                  </div>
                  <h4 className="font-bold text-base text-ink">Growth & Dominance</h4>
                  <p className="text-xs text-ink-muted">Fleet & Local Dominance</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-ink">£2,995</div>
                  <div className="text-[10px] text-ink-muted">or £1,497.50 50% Deposit</div>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-ink/80 border-t border-ink/10 pt-4">
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Everything in Launch Plan</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-primary" />
                  <span>10 Sub-Town Geo Landing Pages</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Automated WhatsApp Review Engine</span>
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Google Map Pack Schema Setup</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Configuration Header */}
      <div className="rounded-3xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-ink/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold border border-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              <span>1-Click Audit Pitch Deck & Loom Script Generator</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold text-ink">
              Turn Prospect Audits into Closed Deals
            </h2>
            <p className="mt-1 text-xs text-ink-muted">
              Auto-generates a 4-slide visual presentation and 60-second video script calibrated to{" "}
              {company}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Hi ${director}, Robbie Harley here from Harley Digital Works. I just recorded a 60-second speed teardown for ${company}: ${url}. Would love to share the 4-slide audit with you.`,
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-sm"
            >
              <Send className="h-3.5 w-3.5" />
              <span>WhatsApp Prospect</span>
            </a>
          </div>
        </div>

        {/* Input Controls */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
              Director Name
            </label>
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-background/50 px-3 py-2 text-ink font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-background/50 px-3 py-2 text-ink font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
              Current Mobile Speed
            </label>
            <input
              type="text"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-background/50 px-3 py-2 text-ink font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-1">
              Hub City / Town
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-background/50 px-3 py-2 text-ink font-medium"
            />
          </div>
        </div>
      </div>

      {/* Main Pitch Deck Viewer (Slide Player) */}
      <div className="rounded-3xl border border-ink/10 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-ink/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-ink-muted">
              SLIDE {currentSlide + 1} OF {slides.length}
            </span>
            <span className="text-xs text-ink font-bold">· {slides[currentSlide].title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="rounded-full border border-ink/15 p-2 text-ink hover:bg-ink/5 disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlide === slides.length - 1}
              className="rounded-full border border-ink/15 p-2 text-ink hover:bg-ink/5 disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Active Slide Body */}
        <div className="min-h-[320px]">{slides[currentSlide].render}</div>

        {/* Slide Pagination Dots */}
        <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? "w-8 bg-primary" : "w-2 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink/5 hover:bg-ink/10 px-3 py-1.5 text-xs font-semibold text-ink border border-ink/10 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Print / Save as PDF Deck</span>
          </button>
        </div>
      </div>

      {/* 60-Second Video / Loom Recording Script */}
      <div className="rounded-3xl border border-ink/10 bg-slate-900 text-white p-6 md:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Video className="h-5 w-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-base text-white">
                60-Second Video / Voice Pitch Script (for Robbie Harley)
              </h3>
              <p className="text-xs text-slate-400">
                Pre-calibrated conversational script with live numbers for recording quick
                personalized Loom audits.
              </p>
            </div>
          </div>

          <button
            onClick={() => copyToClipboard(loomScript, "Loom Video Script")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white transition-colors cursor-pointer shrink-0"
          >
            {copiedKey ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedKey ? "Copied Script!" : "Copy Full Script"}</span>
          </button>
        </div>

        <div className="rounded-2xl bg-slate-950 p-5 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-line border border-slate-800">
          {loomScript}
        </div>
      </div>
    </div>
  );
}
