import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailLayout } from "@/components/site/ServiceDetailLayout";

export const Route = createFileRoute("/services/content-engine")({
  head: () => ({
    meta: [
      { title: "Content Engine — THG Digital Agency" },
      {
        name: "description",
        content:
          "A 30-day content calendar, AI image prompts and short-video templates — stay consistent without burnout.",
      },
    ],
  }),
  component: () => (
    <ServiceDetailLayout
      eyebrow="Content Engine"
      title="Stay consistent without burning out."
      intro="A 30-day content calendar built around your voice, plus 10 custom AI image prompts and 5 short-video templates. Refreshed every month."
      priceTag="Monthly"
      price="£500 / month"
      deliverables={[
        { tag: "Calendar", title: "30 days of posts scheduled across the platforms you actually use.", surface: "sage" },
        { tag: "Prompts", title: "10 custom AI image prompts tuned to your brand voice and palette.", surface: "stone" },
        { tag: "Templates", title: "5 short-video templates ready to drop your footage into.", surface: "mist" },
        { tag: "Review", title: "Monthly 30-minute review to look at what worked and what didn't.", surface: "cream" },
        { tag: "Voice", title: "A running brand voice guide that gets sharper every month.", surface: "sage" },
        { tag: "Flex", title: "Cancel any time — no lock-in, no minimum term.", surface: "stone" },
      ]}
      processTitle="How it works"
      processIntro="A repeatable rhythm that makes content feel like an operating system, not a scramble."
      process={[
        { step: "01", title: "Voice discovery", body: "We start with a 60-minute call to lock down your voice, audience and non-negotiables." },
        { step: "02", title: "Calendar drop", body: "First calendar and prompt pack land within 5 working days. Everything reviewable in one document." },
        { step: "03", title: "Monthly cadence", body: "New calendar the 25th of each month; review call the 5th. Predictable, unglamorous, effective." },
      ]}
    />
  ),
});
