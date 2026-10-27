import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  X,
  Sparkles,
  Download,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if previously dismissed in this session
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem("hdw_exit_intent_dismissed");
    if (dismissed) return;

    // Trigger only on genuine mouse leave near top of viewport (exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !sessionStorage.getItem("hdw_exit_intent_dismissed")) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hdw_exit_intent_dismissed", "true");
    }
  };

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setHasDownloaded(true);
      toast.success("Thank you for your interest.");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("hdw_exit_intent_dismissed", "true");
      }
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-950 p-6 md:p-8 text-white shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          aria-label="Close modal"
          className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!hasDownloaded ? (
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Trade Contractor Resources</span>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-white leading-snug">
              UK Trade Website & Local Presence Guide
            </h3>

            <p className="mt-2 text-xs md:text-sm text-slate-300 leading-relaxed">
              Straightforward guidelines for UK trade contractors looking to present their
              accreditations and improve local enquiry flow.
            </p>

            <div className="mt-4 rounded-xl bg-slate-900 p-3.5 border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Google Business Profile essential setup steps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Collecting authentic customer reviews on your Google profile</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Mobile enquiry and click-to-call checklist</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/resources"
                onClick={handleDismiss}
                className="w-full rounded-full bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-lg hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 text-center"
              >
                <span>View Free Trade Guides</span>
              </Link>
              <button
                onClick={handleDismiss}
                className="text-[11px] text-slate-500 hover:text-slate-400 underline text-center"
              >
                No thanks, I'll continue browsing
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-emerald-600 text-white mb-3">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Explore Trade Resources</h3>
            <p className="mt-2 text-xs text-slate-300">
              Take a look through our guides or get in touch with Robbie directly.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                to="/resources"
                onClick={handleDismiss}
                className="rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500"
              >
                Explore Free Trade Guides →
              </Link>
              <button
                onClick={handleDismiss}
                className="text-xs text-slate-400 hover:text-white mt-2"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
