import { createFileRoute } from "@tanstack/react-router";
import { CapabilityPage } from "@/components/site/CapabilityPage";
export const Route = createFileRoute("/services_/ai-automation")({
  head: () => ({
    meta: [
      { title: "AI & Automation | Harley Digital Works" },
      {
        name: "description",
        content:
          "Practical AI workflows and automation that reduce manual work and improve consistent delivery.",
      },
    ],
  }),
  component: Page,
});
function Page() {
  return (
    <CapabilityPage
      data={{
        eyebrow: "AI & automation",
        title: "Less repetitive work. More useful time.",
        intro:
          "We find the manual steps worth removing, connect the tools you already use and introduce AI with appropriate human review.",
        problems: [
          "Teams copy the same information between systems and spreadsheets.",
          "Routine enquiries, reporting or content work depends on manual chasing.",
          "AI experiments exist, but they are not governed or connected to real work.",
        ],
        deliverables: [
          "Workflow and opportunity audit",
          "Automation roadmap",
          "System integrations",
          "AI-assisted content workflows",
          "Human review and exception paths",
          "Documentation and team enablement",
        ],
        outcomes: [
          "Shorter turnaround and fewer avoidable hand-off errors",
          "Consistent processes with clear human accountability",
          "A practical foundation that can expand safely",
        ],
        related: [
          { label: "Explore digital transformation", to: "/services/digital-transformation" },
          { label: "Discuss an automation", to: "/contact" },
        ],
      }}
    />
  );
}
