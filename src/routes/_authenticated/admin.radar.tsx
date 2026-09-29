import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/_authenticated/admin/radar")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/revenue-os", replace: true });
  },
});
