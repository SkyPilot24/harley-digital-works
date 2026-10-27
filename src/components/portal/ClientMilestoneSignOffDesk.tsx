import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Send,
  MessageSquare,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  AlertCircle,
  FileCheck,
  CreditCard,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import type { ClientTrackProject } from "@/lib/project-tracker-data";

interface ClientMilestoneSignOffDeskProps {
  project: ClientTrackProject;
}

interface StagingFeedback {
  id: string;
  category: "copy" | "photos" | "prices" | "design" | "other";
  comment: string;
  timestamp: string;
  status: "submitted" | "in_progress" | "implemented";
}

export function ClientMilestoneSignOffDesk({ project }: ClientMilestoneSignOffDeskProps) {
  const [feedbackList, setFeedbackList] = useState<StagingFeedback[]>([
    {
      id: "fb-1",
      category: "copy",
      comment: "Please highlight our 10-year NICEIC workmanship warranty on the EV charging page.",
      timestamp: "Yesterday at 14:20",
      status: "implemented",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState<StagingFeedback["category"]>("copy");
  const [isApproved, setIsApproved] = useState(false);
  const [signerName, setSignerName] = useState(project.clientName);
  const [showSignModal, setShowSignModal] = useState(false);

  const stagingUrl = `/demos?company=${encodeURIComponent(project.companyName)}&trade=electrical`;

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Please enter your feedback or change request.");
      return;
    }

    const item: StagingFeedback = {
      id: `fb-${Date.now()}`,
      category: feedbackCategory,
      comment: newComment.trim(),
      timestamp: "Just now",
      status: "submitted",
    };

    setFeedbackList([item, ...feedbackList]);
    setNewComment("");
    toast.success("Feedback sent directly to your assigned web producer!", {
      description: "Our team will implement the tweaks within 12 hours.",
    });
  };

  const handleSignOff = () => {
    if (!signerName.trim()) {
      toast.error("Please type your full name to sign off.");
      return;
    }

    setIsApproved(true);
    setShowSignModal(false);
    toast.success(`Staging Build Approved by ${signerName}!`, {
      description: "Final 50% balance invoice unlocked and DNS switchover initiated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Interactive Staging Review Strip */}
      <div className="rounded-3xl border border-gold-500/30 bg-neutral-900/95 p-6 md:p-8 backdrop-blur-xl shadow-xl text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-400">
                Milestone 4 Client Sandbox
              </span>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                STAGING LINK LIVE
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Interactive Staging Review & 1-Click Approval
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              Test your bespoke website on your smartphone or desktop before we point your official
              live domain.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={stagingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 px-4 py-2.5 text-xs font-semibold text-white border border-neutral-700 transition-all"
            >
              <ExternalLink className="h-4 w-4 text-gold-400" />
              <span>Open Fullscreen Staging</span>
            </a>

            {!isApproved ? (
              <button
                onClick={() => setShowSignModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 hover:bg-gold-400 px-5 py-2.5 text-xs font-bold text-neutral-950 shadow-lg transition-all"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Approve & Authorize Launch</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 px-4 py-2.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>APPROVED & SIGNED OFF</span>
              </div>
            )}
          </div>
        </div>

        {/* Approval Status Card */}
        {isApproved && (
          <div className="mt-6 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 p-5 text-emerald-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">
                <FileCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Staging Approved by {signerName}</div>
                <div className="text-xs text-emerald-300">
                  Signed on {new Date().toLocaleDateString("en-GB")} • 50% Completion Balance
                  Unlocked • DNS Cutover Underway
                </div>
              </div>
            </div>

            <a
              href="/admin/invoices"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-bold text-neutral-950 transition-colors shadow-md"
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>Pay 50% Completion Balance (£1,497.50)</span>
            </a>
          </div>
        )}

        {/* Grid: Feedback Form vs Active Feedback Log */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Request a Tweak Form */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-5">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-gold-400" />
              <h4 className="text-sm font-bold text-white">Request a Tweak or Change</h4>
            </div>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Notice anything you'd like changed? Drop your request below. We include unlimited
              minor revisions before go-live.
            </p>

            <form onSubmit={handleSubmitFeedback} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Category
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      { id: "copy", label: "Text / Copy" },
                      { id: "photos", label: "Photos / Gallery" },
                      { id: "prices", label: "Pricing / Calculator" },
                      { id: "design", label: "Colors / Layout" },
                      { id: "other", label: "Other" },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFeedbackCategory(cat.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        feedbackCategory === cat.id
                          ? "bg-gold-500 text-neutral-950"
                          : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Change Request Details
                </label>
                <textarea
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="e.g. Please update our phone number to 0161 496 0123 on the contact footer..."
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 px-4 py-2 text-xs font-bold text-neutral-950 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Change Request</span>
              </button>
            </form>
          </div>

          {/* Right: Change Request Feed */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-5">
            <div className="flex items-center justify-between mb-3 border-b border-neutral-800 pb-2">
              <h4 className="text-sm font-bold text-white">Client Change Log</h4>
              <span className="text-[11px] font-mono text-neutral-400">
                {feedbackList.length} Revisions Logged
              </span>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {feedbackList.map((fb) => (
                <div
                  key={fb.id}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-gold-400">
                      [{fb.category}]
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        fb.status === "implemented"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {fb.status === "implemented" ? "✓ Implemented" : "⏳ In Progress"}
                    </span>
                  </div>
                  <p className="text-neutral-200 leading-relaxed">{fb.comment}</p>
                  <div className="mt-1 text-[10px] text-neutral-500">{fb.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Digital Sign-off Modal */}
      {showSignModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
          onClick={() => setShowSignModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-gold-500/40 bg-neutral-900 p-6 md:p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/30">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Authorize Official Go-Live</h3>
                <p className="text-xs text-neutral-400">Milestone 4 Final Sign-Off</p>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-xs text-neutral-300">
              <p className="leading-relaxed">
                By approving this staging build, you authorize Harley Digital Works to initiate DNS
                cutover to make <strong className="text-white">{project.domain.url}</strong> live to
                the public.
              </p>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Company:</span>
                  <span className="font-bold text-white">{project.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Live Domain:</span>
                  <span className="font-mono text-emerald-400">{project.domain.url}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Remaining Balance (50%):</span>
                  <span className="font-bold text-white">£747.50</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Full Name (Digital Signature) *
                </label>
                <input
                  type="text"
                  required
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-neutral-800 pt-4">
              <button
                type="button"
                onClick={() => setShowSignModal(false)}
                className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSignOff}
                className="rounded-xl bg-gold-500 hover:bg-gold-400 px-5 py-2 text-xs font-bold text-neutral-950 shadow-lg transition-colors"
              >
                Confirm & Launch Site
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
