# Domain Monetisation, Outbound Pitching & Inbound Deal Runbook

**Authorised Operational Standard — The Harley Group & Harley Digital Works**  
**Ratified Date:** 21 October 2026  
**Document Ref:** `docs/DOMAIN_OUTBOUND_AND_INBOUND_RUNBOOK_2026-10-21.md`  
**Governing Authority:** Robbie Harley, Founder & CEO

---

## 1. Executive Summary & Commercial Strategy

The Harley Group owns an inventory of **53 high-intent commercial domain names** across key UK business sectors (HVAC, electrical, drainage, automotive, and digital services). This portfolio represents an immediate capital-generation and recurring-revenue asset for the group.

### The Numbers at a Glance

- **Immediate Buyout Pipeline:** **£10,380** across primary corporate targets.
- **Lease-to-Own Recurring Potential:** **£935 / month** (generating steady cashflow over 12-month terms).
- **Approved Active Outbound Targets:** 14 pre-screened UK commercial enterprises with verified Companies House registrations, active van fleets, and existing regional marketing investments.

### Why Marketplaces Like eBay Were Rejected

1. **Zero Seller Protection on Digital Goods:** eBay's buyer protection policies explicitly exclude digital assets, domain names, and intangible transfers. Buyers can issue unilateral chargebacks via credit card or PayPal even after the domain transfer has completed.
2. **Low-Intent Bargain Hunters:** eBay attracts hobbyists looking for £10 bargains rather than commercial managing directors who recognise the enterprise value of owning a category-defining brand.
3. **Approved Commercial Rails Only:** All sales and leases are conducted exclusively through **Dan.com** (GoDaddy-backed domain escrow), **Escrow.com** (statutory financial trust), or direct **THG BACS Invoices**.

---

## 2. The Outbound Pitch Engine

The outbound deal flow is managed directly inside the **Admin Control Centre** under the **Domain Portfolio** tab (`src/components/admin/DomainOutboundEngine.tsx`), and previewable locally at `http://localhost:3000/domain-portfolio-preview`.

### The 14 High-Conviction Corporate Targets

| Domain Name                          | Primary Corporate Target    | Target Sector         | Proposed Buyout | Lease-to-Own / Mo | Strategic Value Angle                                        |
| :----------------------------------- | :-------------------------- | :-------------------- | :-------------- | :---------------- | :----------------------------------------------------------- |
| **`gasboilerservices.co.uk`**        | Boilers247 / Help-Link UK   | Heating & Gas         | £1,250          | £115 / mo         | Direct lead generation; beats directory middleman fees.      |
| **`emergencydrainagebristol.co.uk`** | Bristol Drain Solutions Ltd | Emergency Drainage    | £850            | £75 / mo          | Dominates high-urgency unblocking callout search traffic.    |
| **`drainunblockingbristol.co.uk`**   | Drain Doctor Bristol        | Commercial Drainage   | £850            | £75 / mo          | Catches commercial grease-trap and blocked drain intent.     |
| **`commercialroofersbristol.co.uk`** | Western Industrial Roofing  | Industrial Roofing    | £950            | £85 / mo          | Direct inbound for £20k+ industrial warehouse re-roofing.    |
| **`evchargersinstallers.co.uk`**     | Pod Point / Rolec EV        | EV Infrastructure     | £1,200          | £110 / mo         | National category domain for fleet and domestic EV installs. |
| **`bathrenovations.co.uk`**          | Bathrooms of Bath Ltd       | Luxury Bathroom Fit   | £950            | £85 / mo          | Exact geo-match capturing affluent Bath property owners.     |
| **`landscapingbristol.co.uk`**       | Secret Garden Landscaping   | Garden Design         | £750            | £70 / mo          | Captures spring/summer £10k–£30k patio and porcelain builds. |
| **`boilerrepairbath.co.uk`**         | Roman Heating Bath          | Domestic Heating      | £650            | £60 / mo          | Emergency winter breakdown capture in Bath and Somerset.     |
| **`roofrepairbath.co.uk`**           | Bath Heritage Roofing       | Slate & Heritage Roof | £700            | £65 / mo          | Captures Grade-listed Bath stone and slate repair inquiries. |
| **`commercialheatingbristol.co.uk`** | Bristol Commercial FM       | Commercial Facilities | £1,100          | £100 / mo         | Warehouse and school HVAC maintenance contract acquisition.  |
| **`solarinstallersbristol.co.uk`**   | Solarsense UK               | Solar PV & Battery    | £850            | £75 / mo          | Captures commercial solar and battery storage demand.        |
| **`letscarshop.com`**                | Motorpoint / Cazoo Group    | Automotive Digital    | £1,850          | £165 / mo         | Global `.com` consumer brand for digital car sales.          |
| **`harleydigitalworks.co.uk`**       | _Internal Protective Hold_  | Agency Platform       | _Brand Turf_    | _Internal_        | Defensive brand hold protecting our primary UK agency.       |
| **`theharleygroup.co.uk`**           | _Parent Defensive Hold_     | Corporate Holding     | _Brand Turf_    | _Internal_        | Defensive asset preserving corporate group integrity.        |

---

## 3. Resend 1-Click Automated Outbound Pitching

Outbound pitches are dispatched using **Resend API** from the verified sender address **`Robbie Harley <robbie@theharleygroup.org>`**.

### Email Pitch Anatomy & Commercial Principles

- **Concise & Direct:** Under 150 words. UK managing directors read emails on their mobile phones between jobs.
- **Commercial Value First:** Never sell "a website" or "a technical URL". Sell **defending their local market**, **capturing callouts before competitors**, and **reducing Checkatrade/Rated People fees**.
- **Transparent Options:** Always quote two clear paths: a clean upfront buyout OR a 12-month Lease-to-Own agreement.
- **PECR & GDPR Compliant:** Sent strictly to corporate entity email addresses (B2B corporate subscriber exemption under UK Privacy and Electronic Communications Regulations). Unsubscribe / opt-out link is included.

### Standard Pitch Copy

```text
Subject: Acquisition opportunity: [domainName] for [targetCompany]

Hi [Contact / Director],

I noticed [Target Company]’s strong commercial footprint across [Area/Sector].

We hold the rights to [domainName]—a high-intent, category-defining web address for your exact coverage area.

Rather than listing it publicly on generic auction sites, we prefer offering first refusal directly to the leading established operator in the region.

Owning this domain gives you two immediate commercial advantages:
1. Direct inbound customer enquiries routed straight to your phone or booking desk.
2. Complete brand protection—preventing a direct local competitor from operating under this name.

We have structured two simple settlement options:
• Full Outright Acquisition: £[BuyoutPrice] (100% legal transfer via Escrow.com or Nominet IPS-TAG).
• 12-Month Lease-to-Own: £[LeasePrice] / month (0% interest, live traffic points to your site immediately).

Would you be open to securing this before we open it to the wider market?

Kind regards,

Robbie Harley
Founder & Commercial Director
The Harley Group
Direct: 0117 214 1357 | WhatsApp: 07394 041487
```

---

## 4. Inbound Deal Ingestion & Live Webhook

When a prospect replies to an outbound pitch or submits an offer, the system captures the lead through two automated channels:

### Channel 1: Live Cloudflare Nitro Edge Webhook

- **Live Production Endpoint:** `https://harleydigitalworks.com/api/webhooks/domain-inbound`
- **Method:** `POST` (also responds `HTTP 200 OK` on `GET` for liveness health checks).
- **Inbound Providers:** Connected via Resend Inbound Webhooks or Cloudflare Email Routing.
- **Payload Format:**
  ```json
  {
    "domain": "gasboilerservices.co.uk",
    "buyerEmail": "director@boilers247.co.uk",
    "offerGbp": 1250,
    "dealType": "buyout",
    "notes": "Interested in securing both the buyout or 12-month lease."
  }
  ```
- **Automated Side Effects:**
  1. Validates domain against the 53-domain portfolio.
  2. Dispatches an urgent, high-priority alert block into Slack `#sales`.
  3. Returns `{ "ok": true, "status": "logged", "alertDispatched": true }`.

### Channel 2: 1-Click Response Logging in the Control Centre

If a buyer responds by telephone (0117 214 1357) or WhatsApp (07394 041487), Robbie can log it directly from the UI:

1. Click **"Log Inbound Response"** on the matching domain card.
2. Enter the buyer's email, offered price, deal type (`Buyout` or `Lease-to-Own`), and brief notes.
3. Click **"Save Response & Alert Slack"**.
4. The card instantly moves to **"Negotiating"** status and Slack `#sales` is alerted.

---

## 5. Real-Time Slack `#sales` Alerting Engine

All domain deal activity triggers instant notifications into Slack.

### Webhook Multiplexing Architecture

- **Primary Sales Channel:** Configured via `SLACK_WEBHOOK_URL_SALES` or UI modal setting (`localStorage: thg_domain_slack_webhook`).
- **Fail-Safe Multiplexing:** If `#sales` is not specifically configured, the system gracefully falls back to `SLACK_WEBHOOK_URL` (`#all-the-harley-group` / `#leads`).
- **Zero Lead Loss:** If Slack happens to be unreachable or rate-limited, the inbound offer is still recorded and logged—the customer flow never breaks.

### What the Slack Alert Looks Like

```
🚨 INBOUND DOMAIN DEAL ACTIVITY!
Domain: gasboilerservices.co.uk
Buyer: director@boilers247.co.uk
Offer: £1,250 (Buyout)
Notes: Director confirmed willingness to proceed if payment is on invoice.
Recommended Action: Issue Dan.com checkout link or initiate Escrow.com transaction.
```

---

## 6. Deal Closing & Settlement Runbook

Once a price is agreed with a buyer, follow this exact step-by-step procedure to ensure 100% financial security and zero chargeback risk.

### Scenario A: Outright Cash Buyout (>£500)

1. **Never release auth-codes or change IPS-TAG before funds are secured.**
2. **Initiate Escrow.com Transaction:**
   - Log into [Escrow.com](https://www.escrow.com).
   - Enter Buyer's email, agreed sale price (£), and domain name.
   - Select **Domain Name Sale**.
   - Inspection Period: **2 Business Days**.
   - Escrow Fee: Select **50% Buyer / 50% Seller** split (standard industry practice).
3. **Buyer Funds Escrow:** Escrow.com instructs the buyer to wire funds. Wait until Escrow.com confirms: _"Funds Secured in Trust"_.
4. **Initiate Domain Transfer:**
   - **For `.co.uk` / `.org.uk` (Nominet):** Ask the buyer for their registrar's **Nominet IPS-TAG** (e.g. `GODADDY`, `1AND1`, `NAMESCO`). Log into the registrar account (Porkbun / 123-Reg / Namecheap) and push the domain tag to the buyer's tag. The transfer completes in under 5 minutes.
   - **For `.com` / `.org` / `.net` (ICANN):** Unlock the domain, obtain the **EPP Auth Code / Transfer Key**, and submit it securely inside the Escrow.com transaction portal.
5. **Buyer Accepts & Escrow Releases Funds:**
   - Buyer verifies control and clicks "Accept".
   - Escrow.com disburses the proceeds via **UK BACS Wire Transfer** directly into The Harley Group bank account.
6. **Mark as Sold:** In the Control Centre, click "Mark Sold" to update the portfolio status and balance sheet.

### Scenario B: 12-Month Lease-to-Own (£75–£165/mo)

1. **Why Dan.com for Leases:** Dan.com acts as an automated digital escrow. They hold the legal domain title, collect the monthly subscription from the buyer's credit card or direct debit, and pay out to THG monthly.
2. **Buyer Setup:**
   - Log into [Dan.com](https://dan.com).
   - Generate a private **Lease-to-Own Checkout Link** for the agreed monthly fee (e.g. 12 months @ £115/mo).
   - Send the link to the buyer via email or WhatsApp.
3. **Automated DNS Delegation:**
   - Once the buyer's first payment clears, Dan.com grants the buyer DNS/nameserver control so they can point the domain to their website immediately.
   - The buyer **cannot** transfer or sell the domain away—Dan.com holds the underlying registry credentials until the 12th payment clears.
4. **Final Payout:** Upon month 12, Dan.com automatically transfers the domain to the buyer and releases the final tranche.

---

## 7. Emergency Diagnostic & Troubleshooting Guide

| Symptom                              | Probable Cause             | Action                                                                                                                                                                                     |
| :----------------------------------- | :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resend email not sending**         | Missing or invalid API key | Check `.env.local` or Cloudflare Worker secrets for `RESEND_API_KEY`. Verify `TRANSACTIONAL_SENDER_EMAIL` is set to `robbie@theharleygroup.org`.                                           |
| **Slack test alert fails**           | Invalid Slack webhook URL  | Open Domain Outbound Engine, click the Slack gear icon, paste the correct Incoming Webhook URL (`https://hooks.slack.com/services/...`), and click "Save & Test".                          |
| **Inbound webhook returns 404**      | Route path error           | The live URL is `https://harleydigitalworks.com/api/webhooks/domain-inbound` (notice `.com`, not `.co.uk`). Verify with `curl https://harleydigitalworks.com/api/webhooks/domain-inbound`. |
| **Nominet IPS-TAG transfer delayed** | Incorrect recipient TAG    | Nominet tags are uppercase and exact (e.g. `GODADDY`). Check with the buyer's IT manager or registrar support if the tag is not recognized.                                                |

---

## 8. Summary of Durable Code & System Locations

- **Outbound Deal Engine UI:** `src/components/admin/DomainOutboundEngine.tsx`
- **Domain Server Functions (Resend & Slack):** `src/lib/domain-pitch-dispatch.functions.ts`
- **Inbound Webhook Listener:** `src/routes/api.webhooks.domain-inbound.ts`
- **Slack Dispatcher Engine:** `src/lib/slack/dispatcher.ts`
- **Admin Knowledge Base Article:** `src/lib/knowledge-base.ts` (Accessible at `/admin/knowledge-base`)
- **Master Backlog Reference:** `MASTER_BACKLOG.md` (Tasks D01–D08, H49)
