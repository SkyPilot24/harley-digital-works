import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services_/digital-transformation")({
  beforeLoad: () => {
    throw redirect({ to: "/services", replace: true });
  },
});
