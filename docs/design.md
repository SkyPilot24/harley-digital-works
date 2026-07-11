# THG Digital — Landing Page Design System & Animation Specifications

This document defines the high-fidelity visual and animation design rules for the **THG Digital** marketing website. These specifications are locked to prevent design drift during future development.

---

## 1. Aesthetic Identity ("Poster OS")
The site design follows a bold, episodic, high-contrast print-poster aesthetic.
*   **Background Color**: `#050505` (Deep Black)
*   **Surface Color**: `#f4efe7` (Warm Cream / Paper)
*   **Accent Palette**:
    *   **Indigo**: `#4F46E5`
    *   **Emerald**: `#10B981`
    *   **Rose**: `#F43F5E`
*   **Stacking Index (z-index)**:
    *   Loader: `z-[9999]` (topmost layer)
    *   Floating/Fixed CTAs: `z-65`
    *   Navigation Bar: `z-50` (using `mix-blend-difference` to contrast with dynamic slide backgrounds)
    *   Grid Dividers: `z-30`

---

## 2. Typography Rules
Do not substitute the following fonts under any circumstances.
*   **Display / Header Font**: `Anton` (loaded from Google Fonts).
    *   *Usage*: All large, high-impact titles, uppercase headings, and scrambled words. Apply using the `.display` class.
*   **Body Copy Font**: `Inter` (loaded from Google Fonts).
    *   *Usage*: Standard paragraphs, labels, form input descriptions. Apply via global `font-sans` rules.
*   **Handwritten / Wordmark Font**: `Caveat` (loaded from Google Fonts).
    *   *Usage*: Annotations, founder signatures, arrows, and micro-notes. Apply using the `.hand` class.

---

## 3. Layout Grid Pattern
*   **Pattern**: Grid lines mapping a `5-column x 4-row` grid overlay (`20vw` x `25vh` per grid cell).
*   **Style**: Fixed full-screen container with thin borders and low opacity (`opacity-[0.05]`) using color `#f4efe7`.
*   **Markup**:
    ```typescript
    <div className="fixed inset-0 pointer-events-none z-30 opacity-[0.05]">
      <div className="grid h-full w-full grid-cols-5 grid-rows-4 border-l border-t border-[#f4efe7]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="border-r border-b border-[#f4efe7]" />
        ))}
      </div>
    </div>
    ```

---

## 4. Animation Fidelity & GSAP Specifications
All page transitions are episodic, utilizing GSAP's `ScrollTrigger` plugin with `scrub: 1` and `pin: true` on full-screen container sections to prevent traditional browser scrolling.

### A. Initial Loader Sequence
1.  **Lock State**: `body.is-loading` class blocks scroll overflow.
2.  **Wave Draw**: Draw twin wave paths inside SVG `viewBox="0 0 42 18"` (Paths: `M3 9C8 1.8 14 1.8 21 9C28 16.2 34 16.2 39 9` and `M3 9C8 16.2 14 16.2 21 9C28 1.8 34 1.8 39 9`) using `strokeDashoffset: 100` -> `0` over `1.2s`.
3.  **Letter Rise**: Letters in `"THG DIGITAL"` translate up from `yPercent: 100` with `stagger: 0.05` and back-out ease.
4.  **Color Strips**: Staggered color panels (`.loader-strip` in Indigo, Rose, Emerald, and Cream) scale from bottom to top (`scaleY(1)`).
5.  **Loader Out**: Loader panel translates out (`yPercent: -100` over `0.8s`), the main container fades/scales in, and `is-loading` is removed.
6.  **Refresh**: Trigger `ScrollTrigger.refresh()` after the loader clears.

### B. Pinned Hero Section
*   **Cards Containment**: Cards are stacked inside a 3D perspective wrapper (`[perspective:1400px]`).
*   **Timeline Scrubbing**:
    *   **Left Card (Launch Plan)**: Translates to `xPercent: -90, yPercent: 30, rotation: -14`.
    *   **Right Card (Care Plans)**: Translates to `xPercent: 90, yPercent: -30, rotation: 14`.
    *   **Center Card (Applied AI)**: Scales to `1.08` with deep drop-shadows.
*   **Idle Animation**: When scroll is stationary, the center card floats vertically (`y: "+=12"`, yoyo repeat, duration `2.2s`, ease `sine.inOut`).

### C. Scattered Manifesto Words
*   Manifesto words start scattered at randomized initial offsets (e.g. `x` range `[-400, 400]`, `y` range `[-300, 300]`, rotation range `[-60, 60]`, `opacity: 0`).
*   Scroll scrubbing triggers a staggered assembly (`stagger: 0.04`, from `"random"`) to snap words into a clean, legible sentence: *"We build useful websites, content, and automations for purpose-led teams with plain English and NHS-grade reliability."*

### D. Community Board Snapping
*   A grid of four client metrics/testimonial blocks starts scattered and snaps back into place on scroll (`stagger: 0.08` with a springy `back.out(1.2)` ease).
*   Background dotted path vectors (`stroke-dasharray="6 10"`) animate continuously with negative `strokeDashoffset` translation.

### E. Concluding Sweep Wipes
*   Full-screen wipes slide in sequentially to transition between key visual prompts:
    1.  **Rose Sheet**: Slides up from bottom (`yPercent: 0`), reveals display title: `"NO COMPLEX RETROFITS."`
    2.  **Emerald Sheet**: Slides in from left (`xPercent: 0`), reveals display title: `"JUST THE WORK."`
    3.  **Black Sheet**: Slides up from bottom (`yPercent: 0`), reveals display title `"TALK THROUGH A PROJECT."` alongside a high-fidelity contact inquiry form.
