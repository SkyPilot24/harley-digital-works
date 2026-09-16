import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailLayout } from "@/components/site/ServiceDetailLayout";

export const Route = createFileRoute("/services_/launch-plan")({
  head: () => ({
    meta: [
      { title: "30-Day Launch Plan — Harley Digital Works" },
      {
        name: "description",
        content:
          "A structured 30-day programme to take you from brief to live and converting. Fixed price, fixed timeline, fully done-with-you.",
      },
    ],
  }),
  component: () => (
    <ServiceDetailLayout
      eyebrow="Launch Plan"
      title="From brief to live in thirty days."
      intro="A structured, done-with-you programme that takes a new brand or offer from a blank page to a live, converting presence — in exactly thirty days."
      priceTag="Fixed"
      price="£3,500"
      deliverables={[
        {
          tag: "Positioning",
          title: "Sharp positioning statement and one-line value proposition, written together.",
          surface: "sage",
        },
        {
          tag: "Website",
          title: "5-page site — home, offer, about, proof, contact — designed and built.",
          surface: "stone",
        },
        {
          tag: "Content",
          title: "First 30-day content calendar plus 3 launch-week posts written for you.",
          surface: "mist",
        },
        {
          tag: "Automation",
          title: "Contact form, lead routing and a simple follow-up sequence live day one.",
          surface: "cream",
        },
        {
          tag: "Launch kit",
          title: "Announcement email, social post pack and a press-ready one-pager.",
          surface: "sage",
        },
        {
          tag: "Handover",
          title: "A 60-minute training session plus written docs — you own everything.",
          surface: "stone",
        },
      ]}
      processTitle="Thirty days, four weeks"
      processIntro="Predictable rhythm. Everything scheduled. No surprises."
      process={[
        {
          step: "Week 1",
          title: "Positioning & discovery",
          body: "Voice, audience, offer and positioning locked. First wireframes reviewed by day five.",
        },
        {
          step: "Week 2",
          title: "Design & build",
          body: "Full design signed off. Development starts on day eight. Content drafts land by day fourteen.",
        },
        {
          step: "Week 3",
          title: "Content & polish",
          body: "Site content in place. Content calendar and launch kit drafted. QA and revisions.",
        },
        {
          step: "Week 4",
          title: "Launch",
          body: "Go live, monitor, announce. Training session on day twenty-nine. Handover day thirty.",
        },
      ]}
    />
  ),
});
