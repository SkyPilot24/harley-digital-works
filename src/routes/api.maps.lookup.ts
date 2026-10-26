import { createFileRoute } from "@tanstack/react-router";
import {
  geocodeUkAddress,
  searchGoogleBusinessPlace,
  generateStaticMapUrl,
} from "@/lib/maps/google-maps.server";

export const Route = createFileRoute("/api/maps/lookup")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          JSON.stringify({ status: "online", service: "Google Maps Platform Service" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            action: "geocode" | "place" | "static-map";
            query?: string;
            businessName?: string;
            location?: string;
            center?: string;
            zoom?: number;
          };

          if (body.action === "geocode") {
            if (!body.query) {
              return new Response(JSON.stringify({ error: "Query is required for geocoding" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
              });
            }
            const result = await geocodeUkAddress(body.query);
            return new Response(JSON.stringify({ success: true, data: result }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (body.action === "place") {
            if (!body.businessName) {
              return new Response(JSON.stringify({ error: "businessName is required for place" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
              });
            }
            const result = await searchGoogleBusinessPlace(
              body.businessName,
              body.location || "UK",
            );
            return new Response(JSON.stringify({ success: true, data: result }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (body.action === "static-map") {
            const center = body.center || "Bradley Stoke, Bristol";
            const mapUrl = generateStaticMapUrl({
              center,
              zoom: body.zoom || 11,
            });
            return new Response(JSON.stringify({ success: true, mapUrl }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ error: "Invalid action" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          return new Response(
            JSON.stringify({
              error: err instanceof Error ? err.message : "Maps service failed",
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});
