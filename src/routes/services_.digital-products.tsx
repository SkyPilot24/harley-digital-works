import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services_/digital-products")({
  beforeLoad: () => {
    throw redirect({ to: "/services", replace: true });
  },
});
