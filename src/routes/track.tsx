import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import { PillButton } from "@/components/site/PillButton";
import { SAMPLE_PROJECTS, type ClientTrackProject } from "@/lib/project-tracker-data";
import { MilestoneTimeline } from "@/components/portal/MilestoneTimeline";
import { MobileAssetDropzone } from "@/components/portal/MobileAssetDropzone";
import { DnsConnectGuide } from "@/components/portal/DnsConnectGuide";
import { Search, ShieldCheck, PhoneCall, Sparkles, Send, CheckCircle2, Clock } from "lucide-react";

const trackSearchSchema = z.object({
  token: z.string().optional(),
});

export const Route = createFileRoute("/track")({
  validateSearch: (search) => trackSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Client Website Build Tracker & 14-Day Roadmap | Harley Digital Works" },
      {
        name: "description",
        content:
          "Live 14-day delivery tracker for Harley Digital Works clients. Track your website milestones, upload job photos, and view DNS status.",
      },
    ],
  }),
  component: TrackPage,
});

function TrackPage() {
  const search = Route.useSearch();
  const [inputToken, setInputToken] = useState(search.token || "HDW-APEX-2026");
  const [activeToken, setActiveToken] = useState(search.token || "HDW-APEX-2026");

  const project: ClientTrackProject =
    SAMPLE_PROJECTS[activeToken] || SAMPLE_PROJECTS["HDW-APEX-2026"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputToken.trim().toUpperCase();
    if (SAMPLE_PROJECTS[clean]) {
      setActiveToken(clean);
    } else {
      setActiveToken("HDW-APEX-2026");
    }
  };

  return (
    <PageShell>
      {/* Tracker Hero */}
      <section className="relative pt-12 pb-8 md:pt-16 md:pb-12 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900/60 via-neutral-950 to-neutral-950">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <TagChip tone="dark">Client Delivery Portal</TagChip>
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
                🟢 Production Studio Active
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Track Your 14-Day <br />
              <span className="text-gold-400">Website Build in Real Time.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6">
              Welcome to your dedicated client workspace. Review milestone progress, upload job photos directly from your phone, and connect your domain with zero stress.
            </p>

            {/* Token Switcher */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2 max-w-md">
              <div className="relative w-full">
                <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Enter Project Token (e.g. HDW-APEX-2026)"
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3.5 py-2.5 pl-10 text-xs text-white placeholder-neutral-500 focus:border-gold-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto rounded-xl bg-gold-500 hover:bg-gold-400 px-4 py-2.5 text-xs font-bold text-neutral-950 transition-all shrink-0"
              >
                Track Build
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-[11px] text-neutral-500">Quick Test Demos:</span>
              <button
                type="button"
                onClick={() => {
                  setInputToken("HDW-APEX-2026");
                  setActiveToken("HDW-APEX-2026");
                }}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition-all ${
                  activeToken === "HDW-APEX-2026"
                    ? "bg-gold-500/20 text-gold-300 border-gold-500/40"
                    : "bg-neutral-900 text-neutral-400 border-neutral-800"
                }`}
              >
                Apex Electrical (Day 8)
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputToken("HDW-VANGUARD-2026");
                  setActiveToken("HDW-VANGUARD-2026");
                }}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition-all ${
                  activeToken === "HDW-VANGUARD-2026"
                    ? "bg-gold-500/20 text-gold-300 border-gold-500/40"
                    : "bg-neutral-900 text-neutral-400 border-neutral-800"
                }`}
              >
                Vanguard Roofing (Day 12)
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Tracker Body */}
      <section className="py-10 md:py-16 bg-neutral-950">
        <Container>
          {/* Project Summary Header Strip */}
          <div className="rounded-3xl border border-gold-500/30 bg-neutral-900/90 p-6 md:p-8 backdrop-blur-xl mb-8 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Active Build Project</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                  {project.companyName}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Client Lead: <strong>{project.clientName}</strong> • Trade: {project.trade}
                </p>
                <div className="mt-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-full w-fit">
                  {project.package}
                </div>
              </div>

              {/* Producer Desk Card */}
              <div className="bg-neutral-950/80 border border-neutral-800 p-4 rounded-2xl flex items-center justify-between gap-6">
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">Assigned Web Producer</div>
                  <div className="text-sm font-bold text-white">{project.projectManager.name}</div>
                  <div className="text-[11px] text-neutral-400">{project.projectManager.role}</div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/44${project.projectManager.whatsapp.replace(/^0+/, "").replace(/\s+/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-xs font-bold text-white transition-all shadow-sm"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${project.projectManager.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 px-3 py-2 text-xs font-semibold text-white transition-all border border-neutral-700"
                  >
                    <PhoneCall className="h-3.5 w-3.5 text-gold-400" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Layout: Timeline + Dropzone & DNS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Milestone Progress (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              <MilestoneTimeline
                milestones={project.milestones}
                currentDay={project.currentDay}
                totalDays={project.totalDays}
              />
            </div>

            {/* Right Column: Mobile Dropzone & DNS (5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              <MobileAssetDropzone
                companyName={project.companyName}
                token={project.token}
              />

              <DnsConnectGuide domain={project.domain} />
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
