import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  component: () => (
    <ResourceManager
      title="Testimonials (CMS)"
      table="cms_testimonials"
      orderBy={{ column: "sort_order", ascending: true }}
      fields={[
        { name: "quote", label: "Quote", type: "textarea", required: true },
        { name: "author_name", label: "Author", required: true },
        { name: "author_title", label: "Role" },
        { name: "company", label: "Company" },
        { name: "avatar_url", label: "Avatar URL", type: "url", hideInTable: true },
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  ),
});
