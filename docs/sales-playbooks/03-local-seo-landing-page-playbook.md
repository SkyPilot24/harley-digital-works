# Local SEO & Service Area Landing Page Playbook

This playbook defines the architecture, content templates, and technical standards for launching regional trade landing pages to dominate local organic search.

---

## 1. Regional Landing Page Strategy

To rank for high-intent queries like:
- *"electrician web design Manchester"*
- *"website designer for trades Cheshire"*
- *"builder web design Stockport"*

We create dedicated, high-relevance location pages structured for conversion and search authority.

---

## 2. Standard URL & Meta Blueprint

- **URL Pattern**: `/web-design-[location]` (e.g. `/web-design-manchester`, `/web-design-cheshire`, `/web-design-stockport`)
- **Page Title**: `Done-For-You Websites for Trades in [Location] | Harley Digital Works`
- **Meta Description**: `High-performing, professionally managed websites for trades and small businesses in [Location]. 100% written & built for you in 14 days. Get a free quote!`

---

## 3. Page Structure Blueprint

### A. Hero Section
- **Location Eyebrow**: `UK WEBSITES FOR TRADES & BUSINESSES IN [LOCATION]`
- **Headline**: `The Web Design Partner for [Location] Trades.`
- **Sub-copy**: *We build, write, and manage high-converting websites for electricians, builders, plumbers, and contractors across [Location] & surrounding areas.*
- **CTA**: `Get a Free [Location] Trade Quote`

### B. Local Trust Grid
- Showcase local client case studies from that county/region.
- Google Maps snippet and local coverage badges (e.g. *Serving Central Manchester, Salford, Stockport, Trafford, Altrincham, Wilmslow*).

### C. Package Matrix & 14-Day Delivery
- Embedded Launch (£1,495), Growth (£2,995), and Care Plan (£95/mo) pricing.

---

## 4. JSON-LD LocalBusiness Schema Snippet

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Harley Digital Works - [Location]",
  "parentOrganization": {
    "@type": "Organization",
    "name": "The Harley Group"
  },
  "url": "https://harleydigitalworks.com/web-design-[location]",
  "telephone": "+44-161-706-1420",
  "priceRange": "££",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Manchester",
    "addressRegion": "Greater Manchester",
    "addressCountry": "GB"
  },
  "areaServed": [
    { "@type": "City", "name": "[Location]" },
    { "@type": "AdministrativeArea", "name": "Greater Manchester" }
  ],
  "knowsAbout": [
    "Trade Website Design",
    "Local SEO for Tradespeople",
    "Website Hosting & Care Plans",
    "Lead Generation for Contractors"
  ]
}
```
