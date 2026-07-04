import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/team")({
  component: () => (
    <ResourceManager
      title="Team members"
      table="team_members"
      orderBy={{ column: "created_at", ascending: false }}
      fields={[
        { name: "full_name", label: "Full name", required: true },
        { name: "email", label: "Email", type: "email" },
        { name: "role_title", label: "Role" },
        { name: "bio", label: "Bio", type: "textarea", hideInTable: true },
        { name: "avatar_url", label: "Avatar URL", type: "url", hideInTable: true },
        { name: "active", label: "Active", type: "checkbox" },
      ]}
    />
  ),
});
