import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/_authenticated")({
  component: () => (
    <AdminShell>
      <Outlet />
    </AdminShell>
  ),
});
