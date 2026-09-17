import { useState } from "react";
import {
  ShieldCheck,
  CreditCard,
  FileText,
  Download,
  CheckCircle2,
  Zap,
  ArrowUpRight,
  Receipt,
  HelpCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Plus,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface CarePlanTier {
  id: "essentials" | "growth" | "fleet";
  name: string;
  priceGbp: number;
  cadence: "month";
  tag?: string;
  popular?: boolean;
  features: string[];
}

const CARE_TIERS: CarePlanTier[] = [
  {
    id: "essentials",
    name: "Care Plan Essentials",
    priceGbp: 95,
    cadence: "month",
    features: [
      "Ultra-fast Cloudflare V8 edge hosting & SSL",
      "Unlimited text, phone & pricing updates",
      "24-business-hour SLA turnaround",
      "Daily offsite automated backups",
      "HMRC VAT invoice sent monthly",
    ],
  },
  {
    id: "growth",
    name: "Growth & Local Dominance",
    priceGbp: 195,
    cadence: "month",
    popular: true,
    tag: "Most Popular for UK Trades",
    features: [
      "Everything in Essentials Plan",
      "Monthly Local SEO & Google Map Pack tuning",
      "Automated Google 5-Star Review Booster integration",
      "Priority 12-hour turnaround queue",
      "Quarterly conversion rate & lead audit",
      "Direct WhatsApp access to your Web Producer",
    ],
  },
  {
    id: "fleet",
    name: "Multi-Van Fleet Master",
    priceGbp: 395,
    cadence: "month",
    tag: "Multi-Location & Franchises",
    features: [
      "Everything in Growth & Local Dominance",
      "Up to 10 sub-town landing pages created per quarter",
      "Multi-van quote calculation routing",
      "Same-day 4-hour emergency SLA",
      "Dedicated monthly strategy call with Robbie Harley",
    ],
  },
];

const ADDONS = [
  {
    id: "map-pack",
    name: "Google Map Pack Geotargeting Booster",
    price: "£95/mo",
    desc: "Monthly geo-tagged photo uploads and local citation indexing across Cheshire & Greater Manchester.",
  },
  {
    id: "review-booster",
    name: "Automated WhatsApp Review Engine",
    price: "£49/mo",
    desc: "Automated post-job review request SMS/WhatsApp routing happy clients to Google and Checkatrade.",
  },
  {
    id: "emergency-banner",
    name: "Live Emergency Callout Banner",
    price: "£29/mo",
    desc: "1-tap mobile toggle on your phone to switch your site into 24/7 out-of-hours emergency mode.",
  },
];

const MOCK_INVOICES = [
  {
    id: "INV-2026-0901",
    date: "01 Sep 2026",
    description: "Monthly Care Plan (Growth Tier) - cheshireheat.co.uk",
    amount: "£234.00",
    netAmount: "£195.00",
    vat: "£39.00 (20%)",
    status: "Paid via BACS Direct Debit",
  },
  {
    id: "INV-2026-0801",
    date: "01 Aug 2026",
    description: "Monthly Care Plan (Growth Tier) - cheshireheat.co.uk",
    amount: "£234.00",
    netAmount: "£195.00",
    vat: "£39.00 (20%)",
    status: "Paid via BACS Direct Debit",
  },
  {
    id: "INV-2026-0701",
    date: "01 Jul 2026",
    description: "Monthly Care Plan (Growth Tier) - cheshireheat.co.uk",
    amount: "£234.00",
    netAmount: "£195.00",
    vat: "£39.00 (20%)",
    status: "Paid via BACS Direct Debit",
  },
];

export function CareBillingPortalDesk({
  defaultCompany = "Cheshire Heat & Power Ltd",
  defaultTier = "growth",
}: {
  defaultCompany?: string;
  defaultTier?: "essentials" | "growth" | "fleet";
}) {
  const [selectedTier, setSelectedTier] = useState<"essentials" | "growth" | "fleet">(defaultTier);
  const [activeAddons, setActiveAddons] = useState<string[]>(["map-pack"]);
  const [companyName] = useState(defaultCompany);
  const [vatNumber] = useState("GB 439 2019 44");

  const toggleAddon = (id: string) => {
    setActiveAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleDownloadInvoice = (invId: string) => {
    toast.success(`HMRC Compliant VAT Receipt ${invId} downloaded!`);
  };

  const handleUpdateDirectDebit = () => {
    toast.success("BACS Direct Debit mandate link dispatched to your billing email.");
  };

  const activePlanData = CARE_TIERS.find((t) => t.id === selectedTier)!;

  return (
    <div className="space-y-10">
      {/* Top Header Card */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 md:p-8 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-500/10 border border-gold-500/30 px-3 py-1 text-xs font-semibold text-gold-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Active Protection & Managed Care</span>
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white tracking-tight">
              Subscription & Direct Debit Self-Service
            </h2>
            <p className="mt-1 text-xs md:text-sm text-neutral-400 max-w-xl">
              Manage your Harley Care Plan, download HMRC-compliant VAT receipts, toggle monthly growth modules, or update your BACS Direct Debit guarantee.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleUpdateDirectDebit}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 hover:bg-gold-400 px-5 py-2.5 text-xs font-bold text-neutral-950 transition-all shadow-md cursor-pointer"
            >
              <CreditCard className="h-4 w-4" />
              <span>Update BACS Mandate</span>
            </button>
            <a
              href="https://wa.me/441618204910?text=Hi%20Jack,%20I%20have%20a%20question%20regarding%20my%20Harley%20Care%20Plan%20billing."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-5 py-2.5 text-xs font-semibold text-white transition-all"
            >
              <HelpCircle className="h-4 w-4 text-emerald-400" />
              <span>Billing Support</span>
            </a>
          </div>
        </div>

        {/* Current Plan Quick Summary */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-800">
          <div className="rounded-2xl bg-neutral-950 p-4 border border-neutral-800/80">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Account Company</div>
            <div className="mt-1 text-sm font-bold text-white truncate">{companyName}</div>
            <div className="mt-0.5 text-xs text-neutral-500">VAT: {vatNumber}</div>
          </div>
          <div className="rounded-2xl bg-neutral-950 p-4 border border-neutral-800/80">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Current Active Plan</div>
            <div className="mt-1 text-sm font-bold text-gold-400">
              {activePlanData.name} (£{activePlanData.priceGbp}/mo + VAT)
            </div>
            <div className="mt-0.5 text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Active & Auto-Renewing via Direct Debit</span>
            </div>
          </div>
          <div className="rounded-2xl bg-neutral-950 p-4 border border-neutral-800/80">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">SLA & Turnaround Guarantee</div>
            <div className="mt-1 text-sm font-bold text-white">24-Hour Business SLA</div>
            <div className="mt-0.5 text-xs text-neutral-500">99.99% Cloudflare V8 Uptime</div>
          </div>
        </div>
      </div>

      {/* Plan Selection Tiers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Choose or Upgrade Your Care Plan</h3>
            <p className="text-xs text-neutral-400">Switch tiers at any time with zero penalty or locked-in contracts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARE_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "bg-neutral-900 border-gold-500 ring-2 ring-gold-500/30 shadow-xl"
                    : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-3 py-0.5 text-[10px] font-bold text-neutral-950 uppercase tracking-wide">
                    {tier.tag}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-base">{tier.name}</h4>
                    {isSelected && (
                      <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/40">
                        Current Plan
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white">£{tier.priceGbp}</span>
                    <span className="text-xs text-neutral-400">/ month + VAT</span>
                  </div>

                  <ul className="mt-5 space-y-2.5 text-xs text-neutral-300">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800">
                  <button
                    onClick={() => {
                      setSelectedTier(tier.id);
                      toast.success(`Care Plan switched to ${tier.name}`);
                    }}
                    className={`w-full rounded-full py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gold-500 text-neutral-950 hover:bg-gold-400"
                        : "bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700"
                    }`}
                  >
                    {isSelected ? "Active Tier" : `Switch to ${tier.name}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add-On Growth Modules */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-gold-400" />
          <h3 className="text-lg font-bold text-white">Optional Monthly Growth Add-Ons</h3>
        </div>
        <p className="text-xs text-neutral-400 mb-6">
          Toggle high-ROI add-on modules on or off dynamically. Charges reflect on your next monthly direct debit.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ADDONS.map((addon) => {
            const isActive = activeAddons.includes(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                  isActive
                    ? "bg-neutral-950 border-gold-500/60 shadow-md"
                    : "bg-neutral-950/50 border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-xs text-white leading-snug">{addon.name}</h4>
                  <span className="font-mono text-xs font-bold text-gold-400 shrink-0 ml-2">
                    {addon.price}
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-neutral-400 leading-relaxed">{addon.desc}</p>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-900">
                  <span className={`text-[11px] font-semibold ${isActive ? "text-emerald-400" : "text-neutral-500"}`}>
                    {isActive ? "Enabled on Account" : "Disabled"}
                  </span>
                  <div
                    className={`h-5 w-9 rounded-full transition-colors relative p-0.5 ${
                      isActive ? "bg-gold-500" : "bg-neutral-800"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-neutral-950 transition-transform ${
                        isActive ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoices & VAT Receipts Table */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">VAT Receipts & Billing History</h3>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Download itemized VAT receipts for your UK accountant or HMRC self-assessment / Making Tax Digital.
            </p>
          </div>

          <div className="text-xs text-neutral-400 font-mono">
            HMRC VAT Registered: <span className="text-white font-semibold">GB 439 2019 44</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase tracking-wider font-mono text-[11px]">
                <th className="pb-3 font-semibold">Invoice Ref</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Description</th>
                <th className="pb-3 font-semibold">Net / VAT</th>
                <th className="pb-3 font-semibold">Total</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-3.5 font-mono font-bold text-white">{inv.id}</td>
                  <td className="py-3.5 text-neutral-400">{inv.date}</td>
                  <td className="py-3.5 max-w-xs truncate">{inv.description}</td>
                  <td className="py-3.5 text-neutral-400 font-mono">
                    {inv.netAmount} + {inv.vat}
                  </td>
                  <td className="py-3.5 font-bold text-white font-mono">{inv.amount}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(inv.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 px-2.5 py-1 text-[11px] font-semibold text-white border border-neutral-700 transition-colors cursor-pointer"
                    >
                      <Download className="h-3 w-3" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
