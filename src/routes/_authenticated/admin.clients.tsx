import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { StatusBadge } from "./admin.index";

export const Route = createFileRoute("/_authenticated/admin/clients")({
  component: () => (
    <ResourceManager
      title="Clients"
      table="clients"
      orderBy={{ column: "created_at", ascending: false }}
      fields={[
        { name: "name", label: "Client name", required: true },
        { name: "contact_name", label: "Contact name" },
        { name: "contact_email", label: "Contact email", type: "email" },
        { name: "contact_phone", label: "Phone" },
        { name: "website", label: "Website", type: "url", hideInTable: true },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["lead", "active", "paused", "archived"],
          render: (v) => <StatusBadge status={v} />,
        },
        { name: "monthly_value_cents", label: "Monthly value (cents)", type: "number", hideInTable: true },
        { name: "notes", label: "Notes", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});
