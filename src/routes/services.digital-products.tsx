import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailLayout } from "@/components/site/ServiceDetailLayout";

export const Route = createFileRoute("/services/digital-products")({
  head: () => ({
    meta: [
      { title: "Digital Products — THG Digital Agency" },
      {
        name: "description",
        content:
          "Templates, prompt packs and playbooks — small DIY tools for solo operators who want to move fast.",
      },
    ],
  }),
  component: () => (
    <ServiceDetailLayout
      eyebrow="Digital Products"
      title="Small tools. Sharp defaults. Fair prices."
      intro="A growing library of templates, prompt packs and playbooks — the same tools we use internally, packaged for solo operators to run themselves."
      priceTag="From"
      price="£29"
      deliverables={[
        { tag: "Templates", title: "Ready-to-edit templates for briefs, quotes, contracts and content calendars.", surface: "sage" },
        { tag: "Prompt packs", title: "Curated prompt packs for common tasks — content, research, admin, planning.", surface: "stone" },
        { tag: "Playbooks", title: "Short, opinionated playbooks on things we've learned the hard way.", surface: "mist" },
        { tag: "Updates", title: "Free updates for the lifetime of each product — buy once, keep the improvements.", surface: "cream" },
      ]}
      processTitle="How we build products"
      processIntro="Every product is something we tested on real work first — nothing theoretical."
      process={[
        { step: "01", title: "Battle-tested", body: "Every template or playbook starts as an internal tool we've used on 3+ real client projects." },
        { step: "02", title: "Packaged fairly", body: "Priced to be a no-brainer — most products under £100, all with lifetime updates." },
        { step: "03", title: "Community-driven", body: "Feedback goes into the next version. Buyers get first look at anything we ship." },
      ]}
    />
  ),
});
