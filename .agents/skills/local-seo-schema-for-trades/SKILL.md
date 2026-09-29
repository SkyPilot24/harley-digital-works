---
name: local-seo-schema-for-trades
description: Use for implementing local SEO architectures, Google Business Profile schema markup, JSON-LD structured data, and local postcode landing pages for UK trade clients.
---

# Local SEO & Schema for Trades

## When to Use

- Implementing JSON-LD structured data for trade websites (`LocalBusiness`, `Electrician`, `Plumber`, `RoofingContractor`, `Service`, `Review`, `FAQPage`).
- Designing multi-location or service-area landing pages (e.g. `/services/ev-chargers-manchester`, `/services/ev-chargers-cheshire`).
- Optimizing NAP (Name, Address, Phone), geo-coordinates, opening hours, and service radius.
- Setting up Google Maps integration, rich snippets, and review schema.

## Best Practices

### 1. JSON-LD Structured Data Template

Always inject valid Schema.org JSON-LD in the `<head>` or route meta:

```json
{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "Apex Electrical & Solar",
  "image": "https://apexelectrical.co.uk/brand/og-image.jpg",
  "telephone": "+44-161-706-1420",
  "url": "https://apexelectrical.co.uk",
  "priceRange": "££",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 Bridge Street",
    "addressLocality": "Manchester",
    "postalCode": "M3 2BN",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 53.4808,
    "longitude": -2.2426
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Greater Manchester" },
    { "@type": "AdministrativeArea", "name": "Cheshire" }
  ]
}
```

### 2. Local Service Page Structure

- **URL**: `/[service]-[town-or-city]` (e.g. `/emergency-roof-repair-stockport`)
- **H1**: `[Service] in [Town/City] • Fast Quotes & Emergency Response`
- **Content**: Include specific local landmarks, postcodes served, local case studies, and customer testimonials from that area.
- **Avoid**: Duplicate spun text across different location pages.
