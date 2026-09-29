import { createFileRoute } from "@tanstack/react-router";
import { ManagedServicePage } from "@/components/site/ManagedServicePage";
export const Route = createFileRoute("/services_/launch-plan")({
  head: () => ({
    meta: [
      { title: "Your website launch plan | Harley Digital Works" },
      {
        name: "description",
        content:
          "Website design, clear copy and ongoing digital care for UK trades. An initial build fee and monthly subscription, with scope and timing agreed before work begins.",
      },
    ],
  }),
  component: () => <ManagedServicePage kind="launch" />,
});
