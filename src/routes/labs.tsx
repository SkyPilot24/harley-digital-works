import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Container } from "@/components/site/PageShell";
import { PillButton } from "@/components/site/PillButton";
import {
  Cpu,
  Bot,
  Layers,
  ArrowRight,
  Building2,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Code2,
  Workflow,
} from "lucide-react";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Harley Labs | Automation Workflows & Software Prototypes" },
      {
        name: "description",
        content:
          "Harley Labs is the research and software prototyping division of The Harley Group, exploring practical automations, digital tools, and operational prototypes.",
      },
      {
        property: "og:title",
        content: "Harley Labs | Automation Workflows & Software Prototypes",
      },
      {
        property: "og:description",
        content:
          "Harley Labs is the research and software prototyping division of The Harley Group, exploring practical automations, digital tools, and operational prototypes.",
      },
    ],
  }),
  component: HarleyLabsPage,
});

const PROTOTYPES = [
  {
    icon: PhoneCall,
    title: "24/7 Digital Phone Receptionist",
    badge: "Commercial Prototype",
    description:
      "Automated voice triage, emergency dispatch, and instant message transcription built to ensure trade contractors never lose high-value callouts while on site.",
    features: [
      "Immediate emergency callout triage",
      "Instant WhatsApp and email message summaries",
      "Trade-specific FAQ and service answering",
    ],
    actionLink: "/virtual-receptionist",
    actionText: "Explore Phone Receptionist",
  },
  {
    icon: Code2,
    title: "Trade Website Architecture Compiler",
    badge: "Production Engine",
    description:
      "Lightweight, accessible React and Tailwind site structures built specifically for UK trades. Free from slow CMS plugins, complex themes, and maintenance overhead.",
    features: [
      "Semantic HTML5 and mobile-first layouts",
      "Pre-integrated customer enquiry capture",
      "Structured local trade schema markup",
    ],
    actionLink: "/demos",
    actionText: "View Interactive Demos",
  },
  {
    icon: Workflow,
    title: "Operational Workflow Automation",
    badge: "Internal Tooling",
    description:
      "Automated lead intake pipelines, client milestone tracking, and exception management systems engineered to eliminate repetitive administrative work.",
    features: [
      "Durable lead qualification and routing",
      "Real-time milestone visibility for clients",
      "Founder oversight managed by exception",
    ],
    actionLink: "/contact",
    actionText: "Discuss Automation Ideas",
  },
];

function HarleyLabsPage() {
  return (
    <PageShell brand="labs">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f7f5ef] pt-20 pb-16 text-[#252720] md:pt-24 md:pb-20 border-b border-[#e2dec9]">
        <Container className="relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#171C23]/15 bg-white/80 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#171C23] shadow-sm backdrop-blur-md">
              <Cpu className="h-3.5 w-3.5 text-primary" />
              <span>Harley Labs · Practical Automation & Software Prototypes</span>
            </div>
            <Link
              to="/the-harley-group"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#171C23]/10 bg-white/50 px-3 py-1.5 text-xs font-medium text-[#5a5d4e] hover:text-[#171C23] hover:border-[#171C23]/30 transition-colors"
            >
              <Building2 className="h-3 w-3 text-primary" />
              <span>Part of The Harley Group</span>
            </Link>
          </div>

          <div className="mt-8 mb-4 max-w-xs">
            <img
              src="/brand/2026-10-21/HL-Brand-Pack/08-Web-Ready/logo.svg"
              alt="Harley Labs | Part of The Harley Group"
              className="h-14 w-auto object-contain"
            />
          </div>

          <h1
            className="mt-4 max-w-4xl text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-tight text-[#171C23] leading-[1.05]"
            style={{ fontFamily: "Bahnschrift, 'Arial Narrow', Arial, sans-serif" }}
          >
            Ideas into working systems.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5a5d4e]">
            Harley Labs explores practical software automation, digital prototypes, and operational
            workflows. Part of The Harley Group, with a focus on building, testing, and creating
            repeatable systems that save real time.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <PillButton
              as="link"
              to="/contact"
              search={{
                service: "Harley Labs Systems & R&D Enquiry",
                package: undefined,
                domain: undefined,
                websiteUrl: undefined,
              }}
              variant="dark"
              size="md"
            >
              Get in Touch with Robbie
            </PillButton>
            <PillButton as="link" to="/the-harley-group" variant="ghost" size="md">
              The Harley Group Overview
            </PillButton>
          </div>
        </Container>
      </section>

      {/* Real Prototypes Section */}
      <section className="py-16 md:py-24 bg-white text-[#252720] border-b border-[#e2dec9]">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#5a5d4e]">
              Software Prototypes & Systems
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-[#252720]">
              What We Build in Harley Labs
            </h2>
            <p className="mt-3 text-base text-[#5a5d4e] leading-relaxed">
              We focus on software tools and automations that remove operational friction for trade
              businesses and small commercial operations.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {PROTOTYPES.map((proto) => {
              const Icon = proto.icon;
              return (
                <div
                  key={proto.title}
                  className="flex flex-col justify-between rounded-2xl border border-[#e2dec9] bg-[#f7f5ef] p-7 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-[#e2dec9] text-[#252720]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-[#252720]/15 bg-white px-3 py-0.5 text-xs font-mono text-[#252720]">
                        {proto.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-[#252720]">{proto.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a5d4e]">
                      {proto.description}
                    </p>

                    <div className="mt-6 border-t border-[#e2dec9] pt-4">
                      <ul className="space-y-2">
                        {proto.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2 text-xs text-[#252720] font-sans"
                          >
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-[#e2dec9] pt-4">
                    <Link
                      to={proto.actionLink}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#252720] hover:text-primary transition-colors"
                    >
                      <span>{proto.actionText}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Labs Collaboration CTA */}
      <section className="py-16 md:py-24 bg-[#eef0e5] text-[#252720]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#252720]/15 bg-white px-3.5 py-1 text-xs font-medium text-[#252720] font-mono">
              <Sparkles className="h-3.5 w-3.5 text-[#5a5d4e]" />
              Automation & Prototyping
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Collaborate With Harley Labs
            </h2>
            <p className="mt-4 text-base text-[#5a5d4e] leading-relaxed">
              If you run a trade or commercial business with repetitive manual tasks, or you have an
              idea for an automation prototype, we would be pleased to speak with you.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PillButton
                as="link"
                to="/contact"
                search={{
                  service: "Harley Labs Systems & R&D Enquiry",
                  package: undefined,
                  domain: undefined,
                  websiteUrl: undefined,
                }}
                variant="dark"
                size="md"
              >
                Send an Enquiry
              </PillButton>
              <PillButton as="link" to="/the-harley-group" variant="ghost" size="md">
                About The Harley Group
              </PillButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
