import { useState } from "react";
import {
  Users,
  PoundSterling,
  Building2,
  Gift,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Copy,
  QrCode,
  Download,
  Share2,
  FileCheck2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

interface ReferralRecord {
  id: string;
  contractorName: string;
  trade: string;
  date: string;
  package: string;
  upfrontCommission: number; // £250
  recurringCommission: number; // £19/mo
  status: "lead" | "deposit_paid" | "live" | "payout_ready" | "paid";
}

const SAMPLE_PARTNER_REFERRALS: ReferralRecord[] = [
  {
    id: "ref-1",
    contractorName: "Cheshire Heat & Boiler Co Ltd",
    trade: "Heating & Gas Safe",
    date: "12 Sept 2026",
    package: "Growth Engine (£2,995)",
    upfrontCommission: 250,
    recurringCommission: 19,
    status: "live",
  },
  {
    id: "ref-2",
    contractorName: "Vanguard Electrical & EV",
    trade: "Electrical & Solar",
    date: "14 Sept 2026",
    package: "Launch Plan (£1,495)",
    upfrontCommission: 250,
    recurringCommission: 19,
    status: "payout_ready",
  },
  {
    id: "ref-3",
    contractorName: "Stockport Master Joinery",
    trade: "Builder & Joinery",
    date: "16 Sept 2026",
    package: "Growth Engine (£2,995)",
    upfrontCommission: 250,
    recurringCommission: 19,
    status: "deposit_paid",
  },
];

export function PartnerPortalDesk() {
  const [partnerCode, setPartnerCode] = useState("CEF-MCR-SALFORD");
  const [partnerName, setPartnerName] = useState("City Electrical Factors (Salford Branch)");
  const [referrals, setReferrals] = useState<ReferralRecord[]>(SAMPLE_PARTNER_REFERRALS);
  const [showQrModal, setShowQrModal] = useState(false);

  const referralUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/proposals?ref=${encodeURIComponent(partnerCode)}`
      : `https://harleydigitalworks.com/proposals?ref=${encodeURIComponent(partnerCode)}`;

  const totalEarned = referrals.reduce((acc, r) => acc + r.upfrontCommission, 0);
  const totalMonthlyMRREarned = referrals
    .filter((r) => r.status === "live")
    .reduce((acc, r) => acc + r.recurringCommission, 0);
  const readyForPayout =
    referrals.filter((r) => r.status === "payout_ready" || r.status === "live").length * 250;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    toast.success("Affiliate Partner Link copied to clipboard!", {
      description:
        "Any trade contractor submitting a proposal via this link tracks to your account.",
    });
  };

  const handleClaimPayout = () => {
    toast.success("BACS Payout Remittance statement generated!", {
      description: `£${readyForPayout.toLocaleString()} scheduled for automated transfer to your branch bank account on the 1st of the month.`,
    });
  };

  return (
    <div className="space-y-6 text-white">
      {/* Partner Link & Summary Header */}
      <div className="rounded-3xl border border-gold-500/30 bg-neutral-900/95 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-400">
                Official Trade Affiliate Desk
              </span>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                ACTIVE PARTNER
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              {partnerName}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              Partner Code: <strong className="font-mono text-gold-400">{partnerCode}</strong> •
              £250 upfront commission + 20% recurring monthly care commission per trade client.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-4 py-2.5 text-xs font-semibold text-white transition-all"
            >
              <QrCode className="h-4 w-4 text-gold-400" />
              <span>Trade Counter QR Flyer</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 px-5 py-2.5 text-xs font-bold text-neutral-950 shadow-lg transition-all"
            >
              <Copy className="h-4 w-4" />
              <span>Copy Partner Link</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Strip */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4">
            <div className="text-[11px] font-mono uppercase text-neutral-400">
              Total Referred Trades
            </div>
            <div className="mt-2 text-3xl font-extrabold text-white">{referrals.length}</div>
            <div className="mt-1 text-[11px] text-emerald-400 font-medium">
              100% Qualification Rate
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4">
            <div className="text-[11px] font-mono uppercase text-neutral-400">
              All-Time Commission
            </div>
            <div className="mt-2 text-3xl font-extrabold text-gold-400">
              £{totalEarned.toLocaleString()}
            </div>
            <div className="mt-1 text-[11px] text-neutral-400">£250 per live launch</div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4">
            <div className="text-[11px] font-mono uppercase text-neutral-400">
              Monthly Recurring Care
            </div>
            <div className="mt-2 text-3xl font-extrabold text-emerald-400">
              £{totalMonthlyMRREarned}/mo
            </div>
            <div className="mt-1 text-[11px] text-emerald-400">Passive monthly affiliate cut</div>
          </div>

          <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/40 p-4 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase text-emerald-300">
                Ready for BACS Payout
              </div>
              <div className="mt-1 text-2xl font-black text-white">
                £{readyForPayout.toLocaleString()}
              </div>
            </div>
            <button
              onClick={handleClaimPayout}
              className="mt-3 w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 py-1.5 text-center text-xs font-bold text-neutral-950 transition-colors shadow-sm"
            >
              Generate Remittance
            </button>
          </div>
        </div>
      </div>

      {/* Referrals Pipeline Table */}
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 md:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
          <div>
            <h4 className="text-base font-bold text-white">
              Referred Contractors & Commission Status
            </h4>
            <p className="text-xs text-neutral-400">
              Real-time tracking of referred trade clients and automated commission disbursements.
            </p>
          </div>
          <span className="rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold px-3 py-1 border border-gold-500/30">
            £250 + £19/mo Care
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 font-mono text-[11px]">
                <th className="pb-3">Contractor / Trade</th>
                <th className="pb-3">Referred Date</th>
                <th className="pb-3">Website Package</th>
                <th className="pb-3">Upfront Reward</th>
                <th className="pb-3">Monthly Care Cut</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {referrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="font-bold text-white text-sm">{ref.contractorName}</div>
                    <div className="text-[11px] text-neutral-400">{ref.trade}</div>
                  </td>
                  <td className="py-3.5 pr-4 text-neutral-300 font-mono">{ref.date}</td>
                  <td className="py-3.5 pr-4 text-neutral-200">{ref.package}</td>
                  <td className="py-3.5 pr-4 font-mono font-bold text-gold-400">
                    £{ref.upfrontCommission}
                  </td>
                  <td className="py-3.5 pr-4 font-mono font-bold text-emerald-400">
                    £{ref.recurringCommission}/mo
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ref.status === "live"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : ref.status === "payout_ready"
                            ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{ref.status.replace(/_/g, " ").toUpperCase()}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Trade Counter Flyer Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-gold-500/40 bg-neutral-900 p-6 md:p-8 text-white shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-400 border border-gold-500/30 mb-3">
              <QrCode className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-white">Trade Counter QR Display</h3>
            <p className="text-xs text-neutral-300 mt-1">
              Print and place on your counter. Contractors scan to get £150 off their website and
              earn your branch £250 per launch.
            </p>

            {/* Simulated QR Code Card */}
            <div className="my-6 rounded-2xl bg-white p-6 text-neutral-950 inline-block shadow-xl border-4 border-gold-400">
              <div className="h-44 w-44 mx-auto bg-neutral-900 rounded-xl flex flex-col items-center justify-center text-gold-400 p-4 text-center">
                <QrCode className="h-28 w-28 text-white" />
                <span className="text-[10px] font-mono font-bold text-gold-400 mt-2">
                  SCAN FOR £150 OFF
                </span>
              </div>
              <div className="mt-3 text-xs font-bold text-neutral-950 uppercase tracking-wider">
                {partnerName}
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-5 py-2.5 text-xs font-bold text-neutral-950 shadow-md transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Print Official A4 Counter Flyer</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
