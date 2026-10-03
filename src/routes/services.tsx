import { createFileRoute } from "@tanstack/react-router";
import { ManagedServicePage } from "@/components/site/ManagedServicePage";
import { buildPageSeoHead } from "@/lib/site-config";

export const Route = createFileRoute("/services")({
  head: () =>
    buildPageSeoHead({
      title: "Managed websites for trades | Harley Digital Works",
      description:
        "Website design, clear copy and ongoing digital care for UK trades. An initial build fee and monthly subscription, with scope and timing agreed before work begins.",
      path: "/services",
    }),
  component: () => <ManagedServicePage kind="website" />,
});
