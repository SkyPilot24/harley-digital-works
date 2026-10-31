export interface GeocodedLocation {
  formattedAddress: string;
  lat: number;
  lng: number;
  postalCode?: string;
  city?: string;
}

export interface GooglePlaceResult {
  placeId: string;
  name: string;
  formattedAddress: string;
  rating?: number;
  userRatingsTotal?: number;
  businessStatus?: string;
  lat: number;
  lng: number;
}

/**
 * Returns Google Maps API Key from environment
 */
export function getGoogleMapsApiKey(): string | null {
  return process.env.GOOGLE_MAPS_API_KEY || null;
}

/**
 * Geocodes a UK postcode or address string to lat/lng and formatted address
 */
export async function geocodeUkAddress(query: string): Promise<GeocodedLocation | null> {
  const apiKey = getGoogleMapsApiKey();
  if (!apiKey || !query.trim()) return null;

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      query.trim(),
    )}&components=country:GB&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) return null;

    const data = (await res.json()) as {
      status: string;
      results?: Array<{
        formatted_address: string;
        geometry: { location: { lat: number; lng: number } };
        address_components?: Array<{ long_name: string; short_name: string; types: string[] }>;
      }>;
    };

    if (data.status !== "OK" || !data.results?.[0]) return null;

    const first = data.results[0];
    const postalCode = first.address_components?.find((c) =>
      c.types.includes("postal_code"),
    )?.long_name;
    const city = first.address_components?.find(
      (c) => c.types.includes("postal_town") || c.types.includes("locality"),
    )?.long_name;

    return {
      formattedAddress: first.formatted_address,
      lat: first.geometry.location.lat,
      lng: first.geometry.location.lng,
      postalCode,
      city,
    };
  } catch {
    return null;
  }
}

/**
 * Searches for a UK trade business on Google Places to pull verified reviews and location
 */
export async function searchGoogleBusinessPlace(
  businessName: string,
  location: string,
): Promise<GooglePlaceResult | null> {
  const apiKey = getGoogleMapsApiKey();
  if (!apiKey || !businessName.trim()) return null;

  try {
    const query = `${businessName} ${location}`.trim();
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query,
    )}&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) return null;

    const data = (await res.json()) as {
      status: string;
      results?: Array<{
        place_id: string;
        name: string;
        formatted_address: string;
        rating?: number;
        user_ratings_total?: number;
        business_status?: string;
        geometry?: { location?: { lat: number; lng: number } };
      }>;
    };

    if (data.status !== "OK" || !data.results?.[0]) return null;

    const first = data.results[0];
    return {
      placeId: first.place_id,
      name: first.name,
      formattedAddress: first.formatted_address,
      rating: first.rating,
      userRatingsTotal: first.user_ratings_total,
      businessStatus: first.business_status,
      lat: first.geometry?.location?.lat || 0,
      lng: first.geometry?.location?.lng || 0,
    };
  } catch {
    return null;
  }
}

/**
 * Generates an industrial dark-themed Static Map URL centered on a trade contractor's coverage area
 */
export function generateStaticMapUrl(params: {
  center: string;
  zoom?: number;
  width?: number;
  height?: number;
}): string {
  const apiKey = getGoogleMapsApiKey();
  const { center, zoom = 11, width = 600, height = 300 } = params;

  if (!apiKey) return "";

  // Dark industrial styling matching Harley Digital Works Midnight Navy (#081B30)
  const styles = [
    "style=element:geometry%7Ccolor:0x081b30",
    "style=feature:water%7Ccolor:0x051323",
    "style=feature:landscape%7Ccolor:0x0a223c",
    "style=feature:road%7Celement:geometry%7Ccolor:0x1b3552",
    "style=feature:road.highway%7Celement:geometry%7Ccolor:0x224263",
    "style=feature:poi%7Cvisibility:off",
    "style=feature:transit%7Cvisibility:off",
    "style=element:labels.text.fill%7Ccolor:0x94a3b8",
    "style=element:labels.text.stroke%7Ccolor:0x081b30",
  ].join("&");

  // Marker with amber color
  const marker = `markers=color:0xf59e0b%7C${encodeURIComponent(center)}`;

  return `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    center,
  )}&zoom=${zoom}&size=${width}x${height}&scale=2&${styles}&${marker}&key=${apiKey}`;
}

/** Public callers receive only our same-origin proxy path, never the provider key. */
export function generateStaticMapProxyUrl(params: { center: string; zoom?: number }): string {
  const query = new URLSearchParams({
    center: params.center.trim().slice(0, 160),
    zoom: String(params.zoom || 11),
  });
  return "/api/maps/static?" + query.toString();
}
