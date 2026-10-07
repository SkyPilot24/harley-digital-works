import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.index";
import { StrategySources } from "@/components/admin/CurrentStrategy";
import {
  KNOWLEDGE_BASE_ARTICLES,
  KNOWLEDGE_CATEGORIES,
  type KnowledgeArticle,
} from "@/lib/knowledge-base";
import {
  Search,
  BookOpen,
  Server,
  PoundSterling,
  ClipboardList,
  ShieldAlert,
  Wrench,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/knowledge-base")({
  component: KnowledgeBasePage,
});

function KnowledgeBasePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({});

  const filteredArticles = useMemo(() => {
    return KNOWLEDGE_BASE_ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.operationalDetails.toLowerCase().includes(q) ||
        article.keyPoints.some((kp) => kp.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  function toggleExpand(id: string) {
    setExpandedArticles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  function getCategoryIcon(cat: KnowledgeArticle["category"]) {
    switch (cat) {
      case "architecture":
        return Server;
      case "commercial":
        return PoundSterling;
      case "playbooks":
        return ClipboardList;
      case "governance":
        return ShieldAlert;
      case "support":
        return Wrench;
      case "records":
        return BookOpen;
      default:
        return BookOpen;
    }
  }

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Knowledge Base & Operations"
        subtitle="Operational architecture, ratified commercial terms, delivery workflows, governance boundaries, and central records."
      />

      {/* Hero Overview */}
      <div className="rounded-2xl bg-ink p-6 sm:p-8 text-white space-y-3 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/80">
            <Sparkles size={12} className="text-amber-400" />
            Operational Source of Truth · October 2026
          </span>
          <span className="text-xs text-white/70">Verified Build & Systems State</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Harley Digital Works Operational Knowledge Base
        </h2>
        <p className="text-sm text-white/85 max-w-3xl leading-relaxed">
          Comprehensive reference guide for agency operators, administrators, and contributors.
          Contains live infrastructure configurations, commercial boundaries, 8-step delivery SOPs,
          Slack alert mechanics, and statutory accounting rules.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="text"
              placeholder="Search knowledge base (e.g. VAT, Cloudflare, Slack, SLAs, deposit)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-white pl-10 pr-4 py-2.5 text-xs font-medium text-ink placeholder:text-ink-muted focus:border-ink focus:outline-hidden"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-xs font-semibold text-ink hover:bg-ink/5"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-1.5 pb-1 border-b border-ink/10">
          {KNOWLEDGE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? "bg-ink text-white font-bold"
                  : "bg-white text-ink-muted hover:bg-ink/5 hover:text-ink border border-ink/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-ink-muted font-semibold">
          <span>Showing {filteredArticles.length} operational articles</span>
          {selectedCategory !== "all" && (
            <span className="capitalize">Category: {selectedCategory}</span>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredArticles.map((article) => {
            const Icon = getCategoryIcon(article.category);
            const isExpanded = expandedArticles[article.id];

            return (
              <div
                key={article.id}
                className="flex flex-col justify-between rounded-xl border border-ink/10 bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/[0.04] border border-ink/10 px-2.5 py-0.5 text-[10px] font-bold text-ink uppercase tracking-wider">
                      <Icon size={12} className="text-ink-muted" />
                      {article.category}
                    </span>
                    {article.statusBadge && (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                        {article.statusBadge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-ink leading-snug">{article.title}</h3>
                    <p className="mt-1 text-xs text-ink-muted leading-relaxed">{article.summary}</p>
                  </div>

                  {/* Key Takeaways */}
                  <div className="rounded-lg bg-ink/[0.02] border border-ink/5 p-3.5 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ink block">
                      Key Operational Rules:
                    </span>
                    <ul className="space-y-1.5 text-xs text-ink-muted">
                      {article.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span className="leading-tight">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Operational Detail */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-ink/10 text-xs text-ink/80 leading-relaxed bg-amber-50/40 p-3 rounded-lg border border-amber-200/50">
                      <div className="font-bold text-ink text-[11px] uppercase tracking-wider mb-1">
                        Technical Execution & Implementation Notes:
                      </div>
                      <p>{article.operationalDetails}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-ink/5">
                  <span className="text-[10px] text-ink-muted">Updated {article.lastUpdated}</span>
                  <button
                    onClick={() => toggleExpand(article.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-ink/80"
                  >
                    {isExpanded ? (
                      <>
                        <span>Show less</span>
                        <ChevronUp size={14} />
                      </>
                    ) : (
                      <>
                        <span>Detailed notes</span>
                        <ChevronDown size={14} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Governing Business OS Records Section */}
      <div className="pt-6 border-t border-ink/10 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-ink">Authoritative Business OS Records</h2>
          <p className="text-xs text-ink-muted">
            The canonical Google Drive mirrors governing commercial authority, legal status, and
            task tracking.
          </p>
        </div>
        <StrategySources />
      </div>
    </div>
  );
}
