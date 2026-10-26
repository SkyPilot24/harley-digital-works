import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import { SAMPLE_PROJECTS, type ClientTrackProject } from "@/lib/project-tracker-data";
import { MilestoneTimeline } from "@/components/portal/MilestoneTimeline";
import { MobileAssetDropzone } from "@/components/portal/MobileAssetDropzone";
import { DnsConnectGuide } from "@/components/portal/DnsConnectGuide";
import { ClientMilestoneSignOffDesk } from "@/components/portal/ClientMilestoneSignOffDesk";
import { PhoneCall, Send, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/track_/$token")({
  loader: ({ params }) => {
    const project = SAMPLE_PROJECTS[params.token.toUpperCase()];
    if (!project) {
      // Return default sample project if token not found
      return SAMPLE_PROJECTS["HDW-APEX-2026"];
    }
    return project;
  },
  head: ({ loaderData }) => {
    const proj = loaderData as ClientTrackProject;
    return {
      meta: [
        { title: `${proj.companyName} — Client Website Build Tracker | Harley Digital Works` },
        {
          name: "description",
          content: `Live milestone tracking, mobile photo dropzone, and DNS status for ${proj.companyName}.`,
        },
      ],
    };
  },
  component: DynamicTrackPage,
});

function DynamicTrackPage() {
  const project = Route.useLoaderData() as ClientTrackProject;

  return (
    <PageShell>
      {/* Tracker Hero */}
      <section className="relative pt-12 pb-8 md:pt-16 md:pb-12 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900/60 via-neutral-950 to-neutral-950">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <TagChip tone="dark">Client Delivery Portal</TagChip>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Day {project.currentDay} of {project.totalDays}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              {project.companyName} <br />
              <span className="text-gold-400">Milestone Delivery Portal.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-4">
              Review live progress milestones, upload on-site job photos, and track DNS cutover.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Body */}
      <section className="py-10 md:py-16 bg-neutral-950">
        <Container>
          {/* Project Summary Header Strip */}
          <div className="rounded-3xl border border-gold-500/30 bg-neutral-900/90 p-6 md:p-8 backdrop-blur-xl mb-8 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
                  Active Build Project
                </div>
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
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
                    Assigned Web Producer
                  </div>
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

          {/* Interactive Staging Review & Milestone 4 Approval Desk */}
          <div className="mb-8">
            <ClientMilestoneSignOffDesk project={project} />
          </div>

          {/* Grid Layout: Timeline + Dropzone & DNS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-8">
              <MilestoneTimeline
                milestones={project.milestones}
                currentDay={project.currentDay}
                totalDays={project.totalDays}
              />
            </div>

            <div className="lg:col-span-5 space-y-8">
              <MobileAssetDropzone companyName={project.companyName} token={project.token} />

              <DnsConnectGuide domain={project.domain} />
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
