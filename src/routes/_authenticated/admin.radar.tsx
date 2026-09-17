import { createFileRoute } from "@tanstack/react-router";
import { TradeLeadRadarDesk } from "@/components/admin/TradeLeadRadarDesk";
import { PageHeader } from "./admin.index";

export const Route = createFileRoute("/_authenticated/admin/radar")({
  component: RadarPage,
});

function RadarPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="UK Trade Lead Radar & Slow-Site Prospector"
        subtitle="Live geo-grid scanner identifying slow loading trade websites, estimating lost quote revenue, and dispatching 1-click audit teardowns."
      />
      <TradeLeadRadarDesk />
    </div>
  );
}
