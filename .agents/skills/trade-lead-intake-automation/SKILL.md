---
name: trade-lead-intake-automation
description: Use for designing, configuring, and testing automated lead capture pipelines, multi-step quote estimators, Slack/SMS/email notifications, and Supabase CRM synchronisation.
---

# Trade Lead Intake Automation

## When to Use

- Connecting public quote forms (`/contact`, quick quote calculators) to Supabase and external alerting systems.
- Setting up real-time lead alerts (Slack incoming webhooks, instant SMS, WhatsApp notifications to tradespeople on site).
- Implementing rate limiting, honeypot spam protection, and automated lead qualification scoring.
- Connecting website enquiries to CRM/operating tools (Supabase, HubSpot, Make, n8n).

## Key Architecture Patterns

### 1. Zero-Friction Multi-Step Quote Flow

- **Step 1**: Quick button selection for trade/service required (e.g. _New Boiler_, _Solar Panels_, _Full Rewire_).
- **Step 2**: Timeline / Urgency (e.g. _Emergency / Immediate_, _Within 30 Days_, _Planning_).
- **Step 3**: Contact details (Name, Phone number, Email, Postcode).

### 2. Lead Notification Pipeline

1. **Server Validation**: Validate submission against Zod schema (`src/lib/lead-schema.ts`).
2. **Spam Defense**: Check honeypot field + timestamp velocity.
3. **Database Record**: Insert into Supabase `leads` table with metadata (service, package, source, timestamp).
4. **Instant Push Alert**: Send formatted Slack block alert or SMS so the tradesperson can call back while the lead is hot (< 15 mins).
5. **Client Auto-Responder**: Send clean, plain-English confirmation email reassuring the customer when they will be contacted.
