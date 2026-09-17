import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailLayout } from "@/components/site/ServiceDetailLayout";

export const Route = createFileRoute("/services_/launch-plan")({
  head: () => ({
    meta: [
      { title: "14-Day Launch Website Plan — Harley Digital Works" },
      {
        name: "description",
        content:
          "From kickoff call to live Google launch in 14 days. 100% written and built for you at a fixed price of £1,495 + VAT.",
      },
    ],
  }),
  component: () => (
    <ServiceDetailLayout
      eyebrow="14-Day Launch Plan"
      title="From kickoff call to live on Google in 14 days."
      intro="Our fast-track, done-for-you package for trades and small businesses that need a clean, professional, high-converting digital presence without the long delays."
      priceTag="Fixed Investment"
      price="£1,495 + VAT"
      deliverables={[
        {
          tag: "Full Copywriting",
          title:
            "We write all 5 pages of sales copy tailored to your trade and local service area.",
          surface: "sage",
        },
        {
          tag: "5 Custom Pages",
          title: "Home, Services, About, Project Gallery, and High-Converting Contact/Quote Page.",
          surface: "stone",
        },
        {
          tag: "Mobile-First Build",
          title:
            "Engineered for fast loading on iPhones and Androids with 1-tap calling & WhatsApp.",
          surface: "mist",
        },
        {
          tag: "Local Google SEO",
          title: "Google Business Profile mapping, local schema markup, and meta tag setup.",
          surface: "cream",
        },
        {
          tag: "Instant Lead Alerts",
          title: "Enquiries routed straight to your phone and email the second a customer submits.",
          surface: "sage",
        },
        {
          tag: "30 Days Free Care",
          title: "Includes your first month of managed hosting, daily backups, and free updates.",
          surface: "stone",
        },
      ]}
      processTitle="Our 14-Day Delivery Rhythm"
      processIntro="Predictable, transparent, and requiring less than 45 minutes of your total time."
      process={[
        {
          step: "Day 01–03",
          title: "15-Min Intro & Copywriting",
          body: "We learn about your services, target jobs, and service areas. Our team writes all sales copy.",
        },
        {
          step: "Day 04–09",
          title: "Design & Engineering",
          body: "We build your mobile-optimised website, curate high-res imagery, and configure lead routing.",
        },
        {
          step: "Day 10–12",
          title: "Preview & Tweaks",
          body: "We share a private working link for your review. We apply any changes you want within 24 hours.",
        },
        {
          step: "Day 13–14",
          title: "Live Launch to Google",
          body: "We connect your domain, configure SSL security, map Google Business, and go live to the world.",
        },
      ]}
    />
  ),
});
