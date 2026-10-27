import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services_/automation")({
  beforeLoad: () => {
    throw redirect({ to: "/services", replace: true });
  },
});
