import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailLayout } from "@/components/site/ServiceDetailLayout";

export const Route = createFileRoute("/services_/digital-products")({
  head: () => ({
    meta: [
      { title: "Pro Custom Platforms & Portals — Harley Digital Works & THG Digital" },
      {
        name: "description",
        content:
          "Bespoke trade software, client booking portals, automated quoting engines, and multi-location dispatch systems for established contractors.",
      },
    ],
  }),
  component: () => (
    <ServiceDetailLayout
      eyebrow="Pro Custom Platforms"
      title="Bespoke platforms engineered for high-volume trade businesses."
      intro="When off-the-shelf templates aren't enough: custom customer portals, automated quoting engines, multi-van scheduling, and deep CRM integrations built for established trade operators."
      priceTag="From"
      price="£4,995"
      deliverables={[
        {
          tag: "Customer Portals",
          title: "Self-serve booking, job tracking, invoice payments, and automated client SMS alerts.",
          surface: "sage",
        },
        {
          tag: "Quoting Engines",
          title: "Custom multi-variable price calculators with live material cost feeds and instant quote generation.",
          surface: "stone",
        },
        {
          tag: "CRM & Dispatch",
          title: "Deep synchronization with ServiceM8, HubSpot, Salesforce, Xero, and QuickBooks.",
          surface: "mist",
        },
        {
          tag: "SLA Engineering",
          title: "Dedicated high-throughput architecture, 99.99% uptime SLA, and custom Postgres databases.",
          surface: "cream",
        },
      ]}
      processTitle="Enterprise Engineering Rhythm"
      processIntro="Delivered by THG Digital, the enterprise engineering arm of The Harley Group."
      process={[
        {
          step: "01",
          title: "Architecture & Blueprint",
          body: "We map your operational workflows, data schemas, API connections, and user journeys into an executive blueprint.",
        },
        {
          step: "02",
          title: "Staged Sprint Delivery",
          body: "Full-stack development using TanStack, React, Supabase Postgres, and Cloudflare Edge with weekly milestone previews.",
        },
        {
          step: "03",
          title: "Launch & Priority SLA",
          body: "End-to-end load testing, team training, and 24/7 VIP priority monitoring.",
        },
      ]}
    />
  ),
});
