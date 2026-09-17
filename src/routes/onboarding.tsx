import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { TagChip } from "@/components/site/TagChip";
import { ContractorOnboardingWizard } from "@/components/portal/ContractorOnboardingWizard";
import { CheckCircle2, ShieldCheck, Clock, Zap, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Fast-Track Client Onboarding (3 Mins) | Harley Digital Works" },
      {
        name: "description",
        content:
          "Fast 3-minute onboarding intake for new trade clients. Pick your services, select accreditations, drop your logo or van photos, and start your 14-day build sprint.",
      },
      { property: "og:title", content: "Fast-Track Client Onboarding | Harley Digital Works" },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  return (
    <PageShell>
      {/* Top Header */}
      <section className="pt-28 pb-8 md:pt-36 md:pb-12 bg-neutral-950 border-b border-neutral-800 text-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <TagChip tone="dark">14-Day Delivery Sprint</TagChip>
              <span className="text-xs text-neutral-400">Zero Homework Required</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Fast-Track Client <br />
              <span className="text-gold-400">Project Onboarding.</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-lg mx-auto">
              Take 3 minutes to tell us about your coverage areas, accreditations, and key services. We handle 100% of the copywriting and code.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>14-Day Guaranteed Launch</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>50% Deposit / 50% on Launch</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-gold-400" />
                <span>£95/mo Managed Care</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Onboarding Form Section */}
      <section className="py-12 md:py-20 bg-neutral-950">
        <Container>
          <ContractorOnboardingWizard />
        </Container>
      </section>
    </PageShell>
  );
}
