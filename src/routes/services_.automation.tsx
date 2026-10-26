import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailLayout } from "@/components/site/ServiceDetailLayout";

export const Route = createFileRoute("/services_/automation")({
  head: () => ({
    meta: [
      { title: "Automation Services | Harley Digital Works" },
      {
        name: "description",
        content:
          "Quiet automations that save you a working day every week: built once, maintained, and documented in plain English.",
      },
    ],
  }),
  component: () => (
    <ServiceDetailLayout
      eyebrow="Automation"
      title="Quiet automations that save you a working day."
      intro="Small, focused automations that do the boring, repetitive parts of running your business, so you get back to the work only you can do."
      priceTag="From"
      price="£1,200 / build"
      deliverables={[
        {
          tag: "Audit",
          title:
            "A tight audit of where time is being spent and where automation delivers measurable time savings.",
          surface: "sage",
        },
        {
          tag: "Build",
          title: "One or more automations built end-to-end and documented in plain English.",
          surface: "stone",
        },
        {
          tag: "Handover",
          title: "A recorded walkthrough plus written docs, so anyone on your team can run it.",
          surface: "mist",
        },
        {
          tag: "Care",
          title: "Optional monthly care plan to monitor and evolve the automations over time.",
          surface: "cream",
        },
      ]}
      processTitle="How we scope automation work"
      processIntro="No huge platform migrations. Small, focused wins that compound."
      process={[
        {
          step: "01",
          title: "Time audit",
          body: "One 60-minute call to map where hours go every week. Most clients find their top three time-sinks in the first session.",
        },
        {
          step: "02",
          title: "Fixed quote",
          body: "Within 48 hours you get a written quote per automation, priced by outcome, not by hour.",
        },
        {
          step: "03",
          title: "Ship & document",
          body: "We build, test, hand over, and give you the docs. If it breaks, we fix it: same day.",
        },
      ]}
    />
  ),
});
