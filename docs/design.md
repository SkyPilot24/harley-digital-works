# Harley Digital Works — Design System & UI/UX Standards

**Governing Standard**: Option 1 — The "Architectural Craft" Hybrid  
**Ratified**: 26 October 2026  
**Parent Brand**: The Harley Group  
**Customer Brand**: Harley Digital Works (HDW)

---

## 1. Aesthetic Identity & Positioning: "British Industrial Craftsmanship"

Harley Digital Works builds high-authority websites for established UK trade contractors (electricians, heating engineers, roofers, commercial facilities). Our design direction reflects **British industrial craftsmanship** (inspired by Festool, DeWalt, JCB, Aston Martin, and Apple hardware precision), positioned firmly against two failure modes:

1. **The Monolithic Dark Wall**: An unbroken `#081B30` full-bleed dark page with neon green borders reads like a crypto, cybersecurity, or SaaS app. Domestic homeowners in Bristol, Bath, and Clifton hiring for £4,000 rewires and £1,200 fuseboards want daylight, cleanliness, and neat plasterwork.
2. **The Generic Agency Template**: Sterile plain white backgrounds with generic Bootstrap borders feel cheap and disposable.

---

## 2. Option 1: The "Architectural Craft" Hybrid Rhythm

The "Architectural Craft" Hybrid solves this through a deliberate, high-contrast **alternating section rhythm**:

| Section                   | Role                         | Surface Color                   | Text / Accent Hierarchy                                   |
| :------------------------ | :--------------------------- | :------------------------------ | :-------------------------------------------------------- |
| **0. Staging Notice**     | Operational Bar              | `#051323` (Deep Blueprint)      | `text-amber-400` with emerald live pulse                  |
| **1. Header**             | Sticky Navigation            | `#081B30`/95 (Frosted Glass)    | `text-white`, amber estimate CTA                          |
| **2. Hero Section**       | High-Impact Technical Anchor | `#081B30` to `#0E2744` Gradient | White heading, amber NICEIC trust pill, amber primary CTA |
| **3. Core Services**      | Warm Architectural Canvas    | `#F6F3ED` (Warm Ivory)          | `text-[#081B30]`, crisp white cards, amber tags           |
| **4. Case Studies**       | Daylight Proof Showcase      | `#F6F3ED` (Warm Ivory)          | High-res photos pop against white cards, amber scope tags |
| **5. Workmanship Slider** | Workshop Proof               | `#ECE8E1` (Warm Stone)          | High-contrast comparison frame, crisp white info cards    |
| **6. Quote Calculator**   | Technical Instrument Cockpit | `#081B30` (Midnight Navy Stage) | Luminous interactive tool, gold accents, amber inputs     |
| **7. Customer Reviews**   | High-Trust Daylight Feedback | `#F6F3ED` (Warm Ivory)          | Crisp white cards, amber 5-star ratings, dark slate text  |
| **8. Coverage Radar**     | Operational Radar            | `#081B30` (Midnight Navy)       | Dark Google Maps satellite radar with 20-mile radius      |
| **9. Emergency Strip**    | High-Impact Dispatch         | Amber/Navy Gradient             | Amber badge, amber phone CTA                              |
| **10. Trade Footer**      | Grounded Foundation          | `#051323` (Deep Blueprint)      | Slate-400 copy, amber verified accreditations             |

---

## 3. The Restrained 4-Token Color System

To maintain agency-grade visual discipline, all trade demo and customer-facing interfaces adhere strictly to four core tokens:

- **Midnight Navy (`#081B30` & `#051323`)**: Technical anchors, headers, calculator stages, radar maps, and footers. Provides weight, engineering authority, and contrast.
- **Warm Architectural Ivory & Stone (`#F6F3ED` & `#ECE8E1`)**: Natural daylight canvas. Makes trade project photos (copper pipework, metal consumer units, architectural LED lighting) pop with authentic contrast.
- **Electrical Amber & Copper (`#D97706` / `#F59E0B`)**: Primary trade accent. Used for NICEIC/TrustMark accreditations, 5-star review ratings, primary instant estimate CTAs, and price tags.
- **Operational Emerald (`#059669`)**: Strictly reserved for WhatsApp dispatch and live status beacon pulses. Never used for generic borders or decorative fills.

---

## 4. Typography Hierarchy

- **Display & Section Headings**: `Manrope` / `Plus Jakarta Sans` with tight tracking (`tracking-tight`, -0.02em to -0.03em) and bold weight (`font-extrabold` / `font-black`).
- **Body & Explanatory Copy**: `Inter` / system sans-serif. Highly legible at 13px–15px on mobile viewports.
- **Technical & Pricing Data**: `DM Mono` for turnaround times (`1 Day Installation`), fixed price ranges (`From £650 fixed`), postcodes (`BS32`), and certification numbers.

---

## 5. Apple-Grade UI/UX Details

1. **Frosted Glass Sticky Header**: Uses `backdrop-filter: blur(16px)` with a smooth transition shrinking from 68px to 58px on scroll (`.studio-header-shrunk`), preserving vertical screen space for trade clients on mobile.
2. **Physical Hardware Framing**: Project photos and interactive mockups use physical rim lighting (`box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 20px 40px -15px rgba(0, 0, 0, 0.4)`), macOS window chrome, and curved corners (16px–24px).
3. **4-Element Hero Stack Discipline**:
   - Element 1: Eyebrow kicker / live status pill.
   - Element 2: Value-focused single `<h1>`.
   - Element 3: 2-sentence commercial subheadline.
   - Element 4: Action button pair (Primary Instant Estimate + Secondary Case Studies).
4. **Editorial Discipline**: Zero AI-slop clichés, zero unrendered em-dashes on customer-facing routes, zero invented reviews or fake accreditation numbers.

---

## 6. Historical Reference: "Poster OS" (Archived)

_The specifications below describe the September 2026 exploratory "Poster OS" design and are retained strictly for provenance. They do not govern active Harley Digital Works branding or trade client builds._

- Surface: `#f4efe7` / `#050505`
- Fonts: `Anton`, `Inter`, `Caveat`
- Grid: 5-column x 4-row layout overlay
- Animation: GSAP ScrollTrigger scrubbed pinning
