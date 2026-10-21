import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { DomainPortfolio } from "@/components/admin/DomainPortfolio";
import { StrategicDomainMockups } from "@/components/admin/StrategicDomainMockups";
import { DomainOutboundEngine } from "@/components/admin/DomainOutboundEngine";
import { Sparkles, Database, Send } from "lucide-react";

export const Route = createFileRoute("/domain-portfolio-preview")({
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Domain Portfolio Strategy & Outbound Engine | The Harley Group" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DomainPortfolioPreviewPage,
});

function DomainPortfolioPreviewPage() {
  const [activeTab, setActiveTab] = useState<"outbound" | "mockups" | "inventory">("outbound");

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Navigation Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">
              The Harley Group · Strategic Domain Portfolio
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-[#081B30]">
              Monetisation, Outbound Sales Engine & Control Centre
            </h1>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl bg-slate-200/80 p-1.5 self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab("outbound")}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "outbound"
                  ? "bg-[#081B30] text-white shadow-sm"
                  : "text-slate-600 hover:text-[#081B30]"
              }`}
            >
              <Send
                size={14}
                className={activeTab === "outbound" ? "text-emerald-400" : "text-slate-500"}
              />
              <span>Outbound Deal Engine</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("mockups")}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "mockups"
                  ? "bg-white text-[#081B30] shadow-sm"
                  : "text-slate-600 hover:text-[#081B30]"
              }`}
            >
              <Sparkles size={14} className="text-amber-500" />
              <span>Landing Page Mockups</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("inventory")}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "inventory"
                  ? "bg-white text-[#081B30] shadow-sm"
                  : "text-slate-600 hover:text-[#081B30]"
              }`}
            >
              <Database size={14} className="text-blue-600" />
              <span>Inventory Register</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "outbound" ? (
          <DomainOutboundEngine />
        ) : activeTab === "mockups" ? (
          <StrategicDomainMockups />
        ) : (
          <DomainPortfolio localPreview />
        )}
      </div>
    </div>
  );
}
