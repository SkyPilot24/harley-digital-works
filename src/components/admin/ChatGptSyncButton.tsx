import { useState } from "react";
import { Copy, Check, Sparkles, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const CHATGPT_HANDOVER_BRIEF = `=== THE HARLEY GROUP · CHATGPT HANDOVER BRIEF ===
Commit: 670869c (on origin/main)
Repo: https://github.com/SkyPilot24/harley-digital-works
Date: 25 October 2026

CURRENT VERIFIED STATE:
1. No-AI-Slop & Photography: Sourced and embedded real 18th Edition Hager consumer unit photos, Victorian downlight rewires, and commercial trade vans across /demos/rg-electrical and all demo components.
2. Verified Quality: All 205 automated tests passing (25 test suites + service worker + legal claims guard). 0 TypeScript errors. 100% Prettier compliant.
3. Outbound Readiness: RG Electrical Bristol candidate page (/demos/rg-electrical) reviewed; email & WhatsApp pitches ready for Robbie to dispatch.

COMMERCIAL RULES FOR CHATGPT:
- Parent: The Harley Group Ltd. Customer Brand: Harley Digital Works.
- Core Offer: £1,495 setup (50% deposit / 50% approval) + £249/mo ongoing care.
- Tax: No VAT charged (The Harley Group is not VAT registered; never quote "+ VAT").
- Delivery: Agreed milestone schedule (never guarantee 14 days). Max 2 active client builds.
- Primary Territory: Bristol, Bath & M4 corridor (Electrical & building contractors).
- Division of Labour: ChatGPT is Chief of Staff (strategy, sales copy, daily priorities). Antigravity handles local code, tests, and Git commits.
=================================================`;

interface ChatGptSyncButtonProps {
  variant?: "sidebar" | "compact" | "banner";
  className?: string;
}

export function ChatGptSyncButton({ variant = "sidebar", className }: ChatGptSyncButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CHATGPT_HANDOVER_BRIEF);
      setCopied(true);
      toast.success("Handover brief copied! Paste into ChatGPT (Ctrl+V)");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Could not copy automatically. Please try again.");
    }
  };

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm",
          copied
            ? "bg-emerald-600 text-white"
            : "bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40",
          className,
        )}
        title="Copy verified project brief for ChatGPT"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-white" />
            <span>Copied to Clipboard!</span>
          </>
        ) : (
          <>
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>1-Click ChatGPT Sync</span>
          </>
        )}
      </button>
    );
  }

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-100 text-xs",
          className,
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div>
            <strong className="text-white block">ChatGPT Handover Synchroniser</strong>
            <span className="text-emerald-300/80 text-[11px]">
              Instantly bridges Antigravity's latest commit (670869c) to ChatGPT without token
              waste.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold text-xs transition-all shadow-md",
              copied
                ? "bg-emerald-500 text-slate-950"
                : "bg-emerald-600 hover:bg-emerald-500 text-white",
            )}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied for ChatGPT!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy 1-Click Brief</span>
              </>
            )}
          </button>
          <a
            href="https://chatgpt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Open ChatGPT in new tab"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Open ChatGPT</span>
          </a>
        </div>
      </div>
    );
  }

  // Default "sidebar" variant
  return (
    <div
      className={cn(
        "rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-3 space-y-2",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-400 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ChatGPT Sync
        </span>
        <span className="text-[10px] font-mono text-emerald-500/70">670869c</span>
      </div>

      <p className="text-[11px] text-ink-muted leading-tight">
        Copy latest verified state & commercial rules for ChatGPT.
      </p>

      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer",
          copied
            ? "bg-emerald-600 text-white"
            : "bg-[#081B30] hover:bg-[#0E2744] text-white border border-emerald-500/30",
        )}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-200" />
            <span>Copied! (Ctrl+V)</span>
          </>
        ) : (
          <>
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>1-Click ChatGPT Brief</span>
          </>
        )}
      </button>
    </div>
  );
}
