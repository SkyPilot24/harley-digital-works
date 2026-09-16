import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { StatusBadge } from "./admin.index";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: () => (
    <ResourceManager
      title="Leads"
      table="leads"
      orderBy={{ column: "created_at", ascending: false }}
      emptyHint="No leads yet. Submissions from the public Contact form will appear here."
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "company", label: "Company" },
        { name: "package", label: "Package" },
        { name: "message", label: "Message", type: "textarea", required: true, hideInTable: true },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["new", "contacted", "qualified", "won", "lost"],
          render: (v) => <StatusBadge status={String(v ?? "")} />,
        },
        { name: "notes", label: "Internal notes", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});
