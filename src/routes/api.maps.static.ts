import { createFileRoute } from "@tanstack/react-router";
import { generateStaticMapUrl } from "@/lib/maps/google-maps.server";

export const Route = createFileRoute("/api/maps/static")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const center = url.searchParams.get("center") || "Bradley Stoke, Bristol";
        const zoom = parseInt(url.searchParams.get("zoom") || "11", 10);
        const width = Math.min(parseInt(url.searchParams.get("width") || "640", 10), 1280);
        const height = Math.min(parseInt(url.searchParams.get("height") || "320", 10), 800);

        const mapUrl = generateStaticMapUrl({ center, zoom, width, height });
        if (!mapUrl) {
          return new Response("Google Maps API key not configured", { status: 503 });
        }

        try {
          const res = await fetch(mapUrl);
          if (!res.ok) {
            return new Response(`Google Maps API error: ${res.status}`, { status: res.status });
          }

          const imageBuffer = await res.arrayBuffer();
          return new Response(imageBuffer, {
            status: 200,
            headers: {
              "Content-Type": "image/png",
              "Cache-Control": "public, max-age=86400, s-maxage=604800",
            },
          });
        } catch (err) {
          return new Response(
            err instanceof Error ? err.message : "Failed to load Google Static Map",
            { status: 500 },
          );
        }
      },
    },
  },
});
