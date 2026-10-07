# Harley Digital Works — Commercial Launch Offer & Defensible Economics

**Document Version:** 1.0  
**Date:** 7 October 2026  
**Status:** Proposal awaiting founder ratification  
**Governing Context:** [BUSINESS_DEFINITION.md](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/BUSINESS_DEFINITION.md), [docs/REVENUE_WORKFLOW.md](file:///c:/Local%20Data/The%20Harley%20Group/harley-digital-works/docs/REVENUE_WORKFLOW.md), MASTER_BACKLOG H01/H02  

---

## 1. One-Page Sellable Offer: The Managed Digital Presence

### Proposition
**"The Digital Operating System for Established UK Trade Contractors"**  
A 100% done-for-you, professional digital presence that establishes local authority, captures enquiries reliably, and eliminates digital admin — maintained under continuous technical and operational care.

---

### Core Commercial Terms
* **Initial Setup & Build Fee:** **£1,495** *(Proposal; tax presentation subject to VAT status)*
* **Ongoing Monthly Care:** **£249 / month** *(Billed monthly from go-live)*
* **Billing & Payment Milestones:**
  1. **50% Deposit (£747.50):** Due upon proposal acceptance to reserve build slot and initiate discovery/copywriting. Strictly non-refundable once intake audit begins.
  2. **50% Balance (£747.50):** Due upon final client approval of the staged preview, prior to public DNS switch and live launch.
  3. **Monthly Care Subscription (£249/mo):** Initiated via Stripe auto-debit on the go-live date, recurring monthly on a rolling 30-day agreement.

---

### Included Scope (What the Client Gets)

#### Phase 1: Setup & Launch (Days 1–14)
1. **5-Page High-Authority Website Architecture:**
   - **Home:** Authority hero, clear trade value proposition, proof elements, prominent CTA.
   - **About:** Team/founder background, trade accreditations (e.g. NICEIC, Gas Safe), local heritage.
   - **Services:** Core offerings broken down with clear customer benefits.
   - **Selected Work / Gallery:** Curated project showcases with scope and imagery.
   - **Contact & Enquiry Desk:** High-conversion form with server-side validation and anti-spam protection.
2. **Done-For-You Content & Positioning:**
   - Professional trade copywriting written from intake brief and public trade records.
   - Curated, high-resolution imagery and trade-specific iconography.
3. **Robust Lead Routing:**
   - Dual-channel enquiry capture (persisted securely in database + instant staff alert to Slack / email).
4. **Local SEO & Technical Baseline:**
   - Search metadata, OpenGraph cards, Schema.org JSON-LD microdata for local business.
   - Google Business Profile audit and alignment (where access is provided).
5. **Technical Infrastructure & Email Continuity:**
   - Cloudflare edge hosting with HTTPS SSL.
   - Domain DNS connection configured with zero interruption to existing business email (MX records protected).
6. **Client Revisions:**
   - **Two structured revision rounds** included on the staging preview before final balance and deployment.

#### Phase 2: Ongoing Monthly Care (£249/mo)
1. **Edge Hosting & Security:** High-availability Cloudflare edge hosting, automated SSL renewal, daily database backups.
2. **Monthly Edit Allowance:** **One batch of content edits per month (up to 30 minutes)** — covers copy updates, phone/address changes, staff updates, or new project photos *(non-accumulative)*.
3. **Lead Pipeline Health Checks:** Automated and manual checks ensuring enquiry forms and alert webhooks function continuously.
4. **Google Profile Upkeep & Review Workflow:** Guided framework for collecting customer reviews and periodic profile updates.
5. **Monthly Performance Digest & Quarterly Advisory:** Concise monthly reporting on enquiries and traffic, plus a quarterly strategic review.
6. **Support Response Window:** Standard response within **24 business hours** (Monday–Friday, 09:00–17:00 UK time). Critical outage response within **4 business hours**.

---

### Scope Exclusions & Boundary Rules
* **Explicit Exclusions:** Custom web applications, bespoke calculators, ecommerce checkouts, third-party software licensing fees, paid advertising management/ad spend, photo/video site visits, or out-of-hours phone support.
* **Additional Pages:** Billed at **£250 per additional page** (or £450 for multi-location SEO packs).
* **Content Responsibilities:** Harley Digital Works writes all initial text based on the intake interview; the client is responsible for reviewing and confirming technical certifications, pricing, and factual accuracy.
* **Domain Ownership & Asset Control:** The client **always retains 100% legal ownership** of their domain name and brand assets. Harley Digital Works connects to DNS via delegation or shared records.
* **Software Licensing & Export:** The website codebase, CMS layout, and automation logic are licensed to the client during active subscription. Upon cancellation, the client receives a static HTML/CSS/asset export package; proprietary backend workflows remain THG property.
* **Cancellation Policy:** Rolling monthly care cancellable with **30 days written notice**. No long-term lock-in.

---

## 2. Defensible Economics & Unit Economics Model

### Model Overview: Low / Base / High Cost Scenarios

| Cost Element | Low (Favourable) | Base (Expected) | High (Challenged) | Notes & Sensitivity Assumptions |
| :--- | :---: | :---: | :---: | :--- |
| **Setup Revenue** | **£1,495.00** | **£1,495.00** | **£1,495.00** | Fixed launch price proposal. |
| **Build Labour (hrs @ £40/hr)** | 8.0 hrs (£320.00) | 14.0 hrs (£560.00) | 22.0 hrs (£880.00) | Base: 14 hrs (copy: 3h, build: 6h, revisions: 3h, DNS/launch: 2h). |
| **Unsuccessful Preview CAC Overhead** | £85.00 | £150.00 | £220.00 | Base assumes 1:4 conversion (3 unclosed previews @ ~1h ea + API). |
| **AI / Generation Usage** | £10.00 | £25.00 | £45.00 | LLM copy drafting, image optimisation, preview generation. |
| **Stock Imagery & Asset Licenses** | £0.00 | £15.00 | £35.00 | Curated trade assets / graphics. |
| **Payment Processing (Stripe UK)** | £22.63 | £22.63 | £22.63 | 1.5% + £0.20 on £1,495 setup. |
| **Total Upfront Delivery Cost** | **£437.63** | **£772.63** | **£1,202.63** | Fully loaded initial client acquisition & delivery cost. |
| **Net Upfront Contribution (£)** | **+£1,057.37** | **+£722.37** | **+£292.37** | **Cash positive before first subscription payment.** |
| **Upfront Margin (%)** | **70.7%** | **48.3%** | **19.6%** | Even under high friction, setup carries positive margin. |

---

### Monthly Recurring Economics (£249/mo Care)

| Monthly Element | Low (Favourable) | Base (Expected) | High (Challenged) | Notes & Sensitivity Assumptions |
| :--- | :---: | :---: | :---: | :--- |
| **Monthly Revenue** | **£249.00** | **£249.00** | **£249.00** | Billed monthly via auto-debit. |
| **Hosting & Supabase Allocation** | £5.00 | £8.00 | £12.00 | Cloudflare Worker + prorated Supabase DB / storage. |
| **Support Labour (hrs @ £40/hr)** | 0.5 hrs (£20.00) | 1.0 hr (£40.00) | 2.0 hrs (£80.00) | Base: 30-min edit allowance utilized + monitoring. |
| **Payment Processing (Stripe)** | £3.94 | £3.94 | £3.94 | 1.5% + £0.20 on £249. |
| **Incident & Tooling Buffer** | £5.00 | £15.00 | £25.00 | Uptime checks, Slack alerts, edge case triage. |
| **Total Monthly Cost** | **£33.94** | **£66.94** | **£120.94** | Fully loaded monthly servicing cost. |
| **Monthly Net Contribution (£)** | **+£215.06** | **+£182.06** | **+£128.06** | Recurring cash contribution per active account. |
| **Monthly Net Margin (%)** | **86.4%** | **73.1%** | **51.4%** | Highly defensive recurring margin. |

---

### Payback, Retention, and Lifetime Value (LTV)

* **Acquisition Payback Period:** **0 Months (Instant).** Because the setup fee (£1,495) covers both build labour and the sunk cost of 3 unclosed previews (£772.63 Base), customer acquisition cost (CAC) is paid back on Day 0.
* **Customer Lifetime Scenarios (Base Economics):**
  * **3-Month Customer (Early Churn):** Total Revenue = £2,242 | Total Profit = **£1,268.55**
  * **6-Month Customer (Standard):** Total Revenue = £2,989 | Total Profit = **£1,814.73**
  * **12-Month Customer (Good):** Total Revenue = £4,483 | Total Profit = **£2,907.09**
  * **24-Month Customer (Sticky):** Total Revenue = £7,471 | Total Profit = **£5,091.81**

---

### Delivery Capacity & NHS Career Constraints
* **Available Founder / Operator Capacity:** Estimated **10–12 hours/week** allocated to HDW alongside NHS commitments.
* **Automation Lever:** With 70% automated scaffolding (intake parsing, template generation, preview deployment), active touch is reduced to **4–5 hours per build**.
* **Monthly Concurrency Limit:** **Maximum 2 to 3 new client builds per calendar month**.
  * At 3 builds/month: ~15 hours setup labour/month + ~8 hours supporting existing fleet = ~23 hours/month (~5.5 hrs/week). Fits comfortably within part-time capacity.
  * Attempting >3 builds/month without a subcontracted production junior will cause SLA slips.

---

## 3. Business Fact Sheet (Verified vs. Unverified)

| Fact / Attribute | Verified Baseline | Commercial Presentation Rule |
| :--- | :--- | :--- |
| **Parent Entity** | The Harley Group | Holding / umbrella brand. |
| **Trading Brand** | Harley Digital Works | Customer-facing agency brand for trade digital services. |
| **Founder / Leadership** | Dr Robbie Harley, MBA | Use factual executive title. Do not invent external partners. |
| **Trading Style / Entity** | Unconfirmed in governing docs *(Company No. 14820194 in legacy code)* | Present as **The Harley Group** / **Harley Digital Works**. Must confirm whether trading as Limited Co or Sole Trader before issuing contracts. |
| **VAT Registration Status** | Unregistered in governing records | **Do not charge VAT.** Display all prices as: *"£1,495 (VAT not applicable / zero-rated)"*. Do NOT add a 20% VAT line until a valid 9-digit HMRC VAT number is confirmed. |
| **Geography / Offices** | Bristol/Bath pilot area; Manchester historical references | Position as **UK-wide remote digital studio** with pilot focus in South West / Bristol & Bath. Remove conflicting claims of physical multi-city offices. |
| **Contact Channels** | Live web enquiry desk + dedicated email / WhatsApp desk | Monitored Monday–Friday 09:00–17:00 UK time. No 24/7 emergency telephone claims. |
| **Service Standards** | 14-day delivery target from asset receipt; 24h support response | Explicitly label turnaround as business days. Exclude client delay from SLAs. |

---

## 4. Reusable Commercial Governance Rules
*(Enables standard proposals to advance automatically without individual founder approval)*

### Rule Set A: Automatic Proposal Generation
A proposal is automatically generated and issued when:
1. The prospect is an established UK trade business (2–10 staff, verifiable trading presence).
2. The requested scope fits the **Standard 5-Page Architecture** (Home, About, Services, Work, Contact).
3. The pricing matches the ratified standard: **£1,495 setup + £249/mo**.
4. The payment schedule follows the approved 50/50 milestone + monthly subscription.
5. Standard terms are accepted (2 revision rounds, 30-min edit allowance, 30 days notice).

### Rule Set B: Mandatory Founder Escalation Triggers
The automated engine **must halt and alert the founder** if any of the following occur:
1. **Scope Creep:** Request for custom software, login portals, ecommerce, or >7 total pages.
2. **Discount Requests:** Any proposal asking for discounted setup (<£1,495) or waived monthly care.
3. **Delayed Deposit:** Request to start work without the initial 50% upfront payment.
4. **Third-Party / Legal Liabilities:** Bespoke NDA terms, white-label reseller rights, or penalty-backed completion guarantees.
5. **Capacity Breach:** More than 3 active onboarding builds concurrently in the pipeline.

---

## 5. Concise Founder Decision Register (For Robbie's Ratification)

1. [ ] **Confirm Launch Pricing:** Ratify **£1,495 setup + £249/month** for the single Managed launch offer.
2. [ ] **Confirm Legal Entity & VAT:** Confirm whether contracts should be issued under **Harley Digital Works** (Sole Trader) or a registered Limited Company (e.g. 14820194), and confirm that VAT is currently **not charged** (below £90k threshold).
3. [ ] **Confirm Geographic Positioning:** Confirm positioning as a **UK-wide digital studio** with initial pilot campaigns focused on **Bristol & Bath trade contractors**.
4. [ ] **Confirm Concurrency Cap:** Ratify a hard limit of **2 concurrent client onboarding builds** for the initial pilot phase to protect NHS schedule balance.
