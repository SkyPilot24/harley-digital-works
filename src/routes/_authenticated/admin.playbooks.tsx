import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, BookOpen } from "lucide-react";
import { PageHeader } from "./admin.index";
import { DeliveryPlaybook } from "@/components/admin/CurrentStrategy";
import { ContentFlowStudio } from "@/components/admin/ContentFlowStudio";

export const Route = createFileRoute("/_authenticated/admin/playbooks")({
  component: PlaybooksPage,
});

function PlaybooksPage() {
  const [activeTab, setActiveTab] = useState<"contentflow" | "delivery">("contentflow");

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Playbooks & AI Studios"
          subtitle="Harley Labs automated content engines and verified client delivery standard operating procedures."
        />
        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("contentflow")}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "contentflow"
                ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            ContentFlow AI Studio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("delivery")}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "delivery"
                ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-slate-500" />
            Delivery Playbook
          </button>
        </div>
      </div>

      {activeTab === "contentflow" ? <ContentFlowStudio /> : <DeliveryPlaybook />}
    </div>
  );
}
