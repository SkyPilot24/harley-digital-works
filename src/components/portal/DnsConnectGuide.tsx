import { useState } from "react";
import { Globe, Copy, Check, ExternalLink, HelpCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import type { ClientTrackProject } from "@/lib/project-tracker-data";

interface DnsConnectGuideProps {
  domain: ClientTrackProject["domain"];
}

export function DnsConnectGuide({ domain }: DnsConnectGuideProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/80 p-6 md:p-8 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
          <Globe className="h-5 w-5" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">Domain & DNS Setup</span>
          <h3 className="text-xl font-bold text-white tracking-tight">Connect Your Website Domain ({domain.url})</h3>
        </div>
      </div>
      <p className="text-xs md:text-sm text-neutral-400 mb-6">
        When we are ready for launch (Day 13), your domain will point to our high-speed UK cloud hosting. You don't need to transfer your domain away from your registrar ({domain.registrar}).
      </p>

      {/* DNS Records Box */}
      <div className="rounded-2xl border border-neutral-700 bg-neutral-950 p-5 mb-6 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-neutral-300">
          Target DNS Records for {domain.url}:
        </div>

        {/* A Record */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-900/90 p-3.5 rounded-xl border border-neutral-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20 mr-2">
              Type A
            </span>
            <span className="text-xs font-mono text-neutral-400">Host: <strong>@</strong></span>
            <div className="text-xs sm:text-sm font-mono text-white mt-1">{domain.aRecordValue}</div>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(domain.aRecordValue, "A Record")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 text-xs text-white transition-all self-start sm:self-auto"
          >
            {copiedField === "A Record" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-neutral-400" />}
            <span>{copiedField === "A Record" ? "Copied" : "Copy Value"}</span>
          </button>
        </div>

        {/* CNAME Record */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-900/90 p-3.5 rounded-xl border border-neutral-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20 mr-2">
              Type CNAME
            </span>
            <span className="text-xs font-mono text-neutral-400">Host: <strong>www</strong></span>
            <div className="text-xs sm:text-sm font-mono text-white mt-1">{domain.cnameValue}</div>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(domain.cnameValue, "CNAME Record")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 text-xs text-white transition-all self-start sm:self-auto"
          >
            {copiedField === "CNAME Record" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-neutral-400" />}
            <span>{copiedField === "CNAME Record" ? "Copied" : "Copy Value"}</span>
          </button>
        </div>
      </div>

      {/* Done-For-You Alternative */}
      <div className="rounded-2xl border border-gold-500/30 bg-gold-500/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4 text-gold-400" />
            <span>Prefer us to handle this for you?</span>
          </div>
          <p className="text-xs text-neutral-300 mt-0.5">
            Simply send temporary delegated access to your registrar, and our technical team will configure your DNS and SSL certificates at zero extra charge.
          </p>
        </div>
      </div>
    </div>
  );
}
