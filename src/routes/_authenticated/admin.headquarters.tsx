import { createFileRoute } from "@tanstack/react-router";
import { GroupHeadquarters } from "@/components/admin/GroupHeadquarters";

export const Route = createFileRoute("/_authenticated/admin/headquarters")({
  component: GroupHeadquarters,
});
