/**
 * Central Operational Knowledge Base for Harley Digital Works & The Harley Group
 *
 * This serves as the dashboard's structured source of truth, providing operators,
 * admins, and AI agents with complete operational knowledge, commercial rules,
 * architecture specifications, governance guidelines, and support runbooks.
 */

export interface KnowledgeArticle {
  id: string;
  category: "architecture" | "commercial" | "playbooks" | "governance" | "support" | "records";
  title: string;
  summary: string;
  keyPoints: string[];
  operationalDetails: string;
  statusBadge?: string;
  lastUpdated: string;
}

export const KNOWLEDGE_CATEGORIES = [
  { id: "all", label: "All Knowledge" },
  { id: "architecture", label: "Systems & Architecture" },
  { id: "commercial", label: "Commercial Model & Economics" },
  { id: "playbooks", label: "Workflows & Playbooks" },
  { id: "governance", label: "Governance & Escalations" },
  { id: "support", label: "Support & Runbooks" },
  { id: "records", label: "Governing Business Records" },
] as const;

export const KNOWLEDGE_BASE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "unified-business-contact-channels-2026-10-15",
    category: "governance",
    title: "Unified Business Contact Channels & Lead Intake Hierarchy",
    summary:
      "Official operational standard for customer-facing contact points, phone numbers, WhatsApp routing, and intake hierarchy across The Harley Group and Harley Digital Works.",
    statusBadge: "Ratified · 15 Oct 2026",
    lastUpdated: "2026-10-15",
    keyPoints: [
      "PRIMARY BUSINESS LANDLINE — 0117 214 1357 (UK format) / +44 117 214 1357 (international format, click-to-call: tel:+441172141357). Geographic location: Bristol, United Kingdom. Official primary published telephone number across both The Harley Group and Harley Digital Works.",
      "WHATSAPP BUSINESS — Verified canonical business number is +44 7394 041487 (wa.me format: 447394041487, display: 07394 041487, link: https://wa.me/447394041487). Contextual pre-filled messages configured for quote enquiries and care plan support.",
      "THREE-TIER CONTACT HIERARCHY — Tier 1: Direct Landline (0117 214 1357) for high-intent customer phone calls. Tier 2: WhatsApp Business for fast mobile messaging and trade photo sharing. Tier 3: Website Enquiry Forms with structured database capture.",
      "ADMIN CONTROL CENTRE INTEGRATION — Web form enquiries dispatch through submitLead to Supabase RPC submit_public_lead, appearing instantly in the Admin Control Centre (/admin/leads) with real-time triage, source attribution, and proposal generation.",
      "SINGLE SOURCE OF TRUTH — All contact variables are centralized in src/lib/site-config.ts (siteConfig for HDW and harleyGroupConfig for THG). Component-level hardcoded contact information is deprecated.",
      "OPERATING HOURS & SLAS — Studio operating hours: Monday–Friday 09:00–17:00 UK time. Phone callback SLA: under 2 hours. WhatsApp response SLA: under 15 minutes during operating hours. Web form submission follow-up: under 4 business hours.",
    ],
    operationalDetails:
      "Configuration: src/lib/site-config.ts (siteConfig, harleyGroupConfig). Form submission: src/lib/lead-intake.functions.ts and src/components/site/EnquiryForm.tsx. Admin intake dashboard: src/routes/_authenticated/admin.leads.tsx. Floating WhatsApp: src/components/site/FloatingWhatsAppDesk.tsx. Regional data: src/lib/location-data.ts.",
  },
  {
    id: "outbound-email-architecture-2026-10-12",
    category: "architecture",
    title: "Outbound Email & Automated Outreach Architecture",
    summary:
      "Operational specification for transactional email delivery via Resend API and scheduled automated corporate outreach.",
    statusBadge: "Ratified · 12 Oct 2026",
    lastUpdated: "2026-10-12",
    keyPoints: [
      "SENDER SPECIFICATION — All outbound cold outreach and founder communications are sent as Robbie Harley <robbie@theharleygroup.org>. Generic roles (hello@) are rejected for prospect outreach to maximize deliverability and trust.",
      "REPLY-TO ROUTING — reply_to is configured to robbie@theharleygroup.org so customer responses route directly to the founder and CRM channels.",
      "PROVIDER INTEGRATION — Dispatched via Resend API (https://api.resend.com/emails) with timeout bounds, signature verification, and immutable receipt ID capture.",
      "CONCURRENCY GUARD — Outreach engine enforces the strict 2-concurrent build limit before initiating any automated dispatch.",
      "PECR COMPLIANCE — Restricted strictly to verified UK corporate entities (Companies House) with observable digital opportunities. Public quote forms are never used.",
    ],
    operationalDetails:
      "Engine: src/lib/outreach-dispatcher.ts & src/lib/email-delivery.ts. Task: server/tasks/outreach-dispatcher.ts running at 09:00 UK weekdays. Environment: TRANSACTIONAL_EMAIL_ENABLED=true, RESEND_API_KEY, and TRANSACTIONAL_SENDER_EMAIL=robbie@theharleygroup.org.",
  },
  {
    id: "group-recent-activities-2026-10-09",
    category: "records",
    title: "Group recent activity review — 9 October 2026",
    summary:
      "Consolidated Headquarters, scanner, proposed brand, Dell lab, commercial and continuity record. Source publication and live release are separate states.",
    statusBadge: "Reviewed · release pending",
    lastUpdated: "2026-10-09",
    keyPoints: [
      "HEADQUARTERS — Shared-HQ links and group overview are on the Headquarters review branch. The reviewed scanner repair from PR #22 is included for combined verification.",
      "BRAND — Completed proposed pack and guide uploaded to Companies & Brands. Fresh ZIP integrity passes for 147 entries. Final decisions and live rollout remain separate.",
      "SOCIALS — Founder confirms accounts are not yet set up. Profile creation, publishing connections and analytics remain setup tasks; use the weekly content guide when ready.",
      "DELL / CONTINUITY — Dell KB included in main; workflows/recovery and live acceptance remain unverified. Main checkout is clean with no unpushed commits. Laptop checkout/host connection unresolved.",
      "OTHER SOURCE WORK — Commercial, Slack, skills and earlier CI changes are already in main. Historical acceptance is not a fresh live check. Older CI and untested dependency PRs remain separate.",
    ],
    operationalDetails:
      "Review: docs/RECENT_ACTIVITY_REVIEW_2026-10-09.md. Headquarters: /admin/headquarters. Combined review: https://github.com/SkyPilot24/harley-digital-works/pull/23. Main inspected at 5e0520dca8c8b9d633474cc9f64d2453b19e99cb. Complete review/CI before main release; verify deployed revision and genuine owner access afterwards.",
  },
  {
    id: "harley-labs-dell-build",
    category: "playbooks",
    title: "Harley Labs — Dell Build",
    summary:
      "19 October 2026: the separate Dell now has a verified, restricted database recovery lab. Synthetic backup/restore passed; production recovery remains pending distinct H07 approval. Earlier website/n8n lessons remain historical.",
    keyPoints: [
      "CURRENT VERIFIED CHECKPOINT — 19 October 2026: dedicated Dell laptop, 16 GB RAM. The primary development machine remains separate; its repository is not assumed to exist on the Dell.",
      "RECOVERY LAB — Docker Desktop 4.94.0, Linux Engine 29.8.2 and WSL2 verified. Official standalone Supabase CLI 2.121.0 checksum verified; no separate Node/npm installation or global PATH change. Supabase Postgres image 17.11.0.004 is pinned; full digest and archive checksum are in docs/THG_LAB_RECOVERY_2026-10-19.md.",
      "FINAL ISOLATION — Database-only container on an exclusive internal Docker network; zero effective published ports; 2 CPUs / 2 GiB RAM; restart policy no. Stopped after testing with its volume retained. Workspace restricted to Robbie, SYSTEM and Administrators; no encryption-at-rest claim. No full Studio/Auth/API/Storage stack.",
      "FRESH TESTS — Synthetic custom-format pg_dump/pg_restore into a separate database passed exact two-row comparison; temporary test databases/dump removed. Stop/start, readiness, network/ports and limits passed. No Windows reboot test or production-scale recovery measurement.",
      "NETWORKING EXCEPTION — CLI startup needed a host connection. A bridge retry unexpectedly reported wildcard bindings despite a localhost network default; the container was stopped on detection and moved to internal-only networking. No production data was present; LAN reachability during the interval was not tested. Final isolation does not imply uninterrupted isolation during setup.",
      "NEXT STEP / H07 — Prepare the exact production export/isolated-restore runbook and data-handling/compatibility/acceptance controls using existing evidence. Request distinct H07 Approval B before production access/export/restore. This does not authorise migrations or deployment and is separate from the older release-checklist section B. Synthetic recovery does not close H07.",
      "HISTORICAL LESSONS — The following 9 October website/n8n observations and prompts remain for that separate learning track. No new n8n onboarding/workflow/recovery acceptance is claimed; the unrelated stopped n8n/nginx containers were left unchanged.",
      "HISTORICAL STATUS AND EVIDENCE — Items below were observed by the founder on the Dell and reported during the guided session on 9 October 2026. This record is not a fresh inspection of that laptop. Verify the current state before continuing. Dashboard publication and live verification of this KB entry are pending the reviewed release.",
      "DEVICE BOUNDARY — Dell Precision 3581, 13th-gen Intel i9, 16 GB RAM, fresh Windows 11 Pro with its local Windows account retained. Lenovo Legion is the main development machine; Dell is a separate learning/test bench. Hosted production runs independently of either laptop. All localhost links and lab commands below belong on the Dell.",
      "COMPLETED — Hardware virtualisation enabled. WSL installed with wsl --install --no-distribution; restarted; default WSL version 2. No Ubuntu distribution installed. The WSL1 warning was harmless for this chosen WSL2 setup.",
      "COMPLETED — Docker Desktop x86_64 installed per user with WSL2; Windows containers unchecked. Existing Docker account sign-in completed. docker run --rm hello-world succeeded.",
      "COMPLETED — Visual Studio Code x64 User Installer installed; GitHub sign-in completed using mobile two-factor authentication. Documents/Harley-Lab opened and trusted on the Dell. Do not assume this folder exists on the Lenovo.",
      "COMPLETED — Original nginx container created with docker run -d --name lab-web -p 127.0.0.1:8080:80 nginx:alpine. Welcome page observed at http://localhost:8080 (Dell only); stop/start tested. This original container is separate from the custom Compose website on port 8081.",
      'COMPLETED — index.html includes <!doctype html>, lang="en", UTF-8, title Harley Lab, heading Welcome to Harley Lab and paragraph My first Docker learning project. Custom Compose website started with docker compose up -d; http://localhost:8081 (Dell only) showed the custom page; edit/save/refresh tested.',
      'WEBSITE CONFIGURATION — Keep this file separate from n8n.compose.yaml. compose.yaml, run from Documents/Harley-Lab on the Dell: services: { web: { image: "nginx:alpine", ports: ["127.0.0.1:8081:80"], volumes: ["./index.html:/usr/share/nginx/html/index.html:ro"] } }. This is YAML flow syntax for the recorded configuration. The bind mount serves the local index.html read-only.',
      'COMPLETED — Named-volume persistence exercise: docker volume create harley-lab-data; then docker run --rm -v harley-lab-data:/data alpine sh -c "echo Hello-from-Harley-Lab > /data/note.txt"; then docker run --rm -v harley-lab-data:/data:ro alpine cat /data/note.txt. The greeting survived removal of the first container. This proves this volume exercise only, not n8n restart or backup recovery.',
      "IN PROGRESS — Separate n8n.compose.yaml created and started. Logs reported the editor accessible; http://localhost:5678/setup loaded on the Dell after reopening the startup link from VS Code. Owner onboarding, owner account completion and a first workflow are not yet verified.",
      'N8N CONFIGURATION — Recorded n8n.compose.yaml in valid YAML flow syntax: { services: { n8n: { image: "n8nio/n8n", ports: ["127.0.0.1:5678:5678"], environment: { TZ: "Europe/London", GENERIC_TIMEZONE: "Europe/London", N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS: "true" }, volumes: ["n8n-data:/home/node/.n8n"] } }, volumes: { n8n-data: null } }. There is no restart policy. The image is not pinned; version selection, updates and backups are future lessons.',
      "N8N COMMANDS — From Documents/Harley-Lab on the Dell: docker compose -p harley-n8n -f n8n.compose.yaml up -d. Check status: docker compose -p harley-n8n -f n8n.compose.yaml ps. Check startup: docker compose -p harley-n8n -f n8n.compose.yaml logs --tail 40 n8n. Open http://localhost:5678 (Dell only); onboarding was observed at /setup. Use the same project/file arguments consistently so a second lab stack or volume is not created accidentally.",
      "TROUBLESHOOTING LEARNED — A filename ending compose.yaml.txt caused configuration-not-found; rename the full filename to compose.yaml and show file extensions. Docker was absent in the VS Code terminal until every VS Code window was closed and the app reopened to refresh PATH. Initial Cannot GET / on n8n cleared after reopening its startup link; diagnose status/logs before reinstalling or repeating onboarding.",
      "STILL NOT VERIFIED — RAM slot count/speed, Windows update status, planned 32 GB upgrade, n8n version/owner setup/workflow, n8n persistence after restart/reboot and n8n backup/restore. Docker versions and the separate synthetic database recovery check are verified in the 19 October checkpoint. Do not claim automatic startup after reboot: no restart policy was configured. Keep login details and recovery/encryption keys out of chat and KB records.",
      "BOUNDARIES AND GOAL — No external services or customer data connected. Real messages, customer integrations, production writes, billing, domain changes and releases are not authorized by this lab task. Begin with fictional enquiries: save/reference → classify → review queue → draft reply. Later automation should reduce routine administration while retaining human discovery, scope, pricing and exception review. Separate marketing is still needed to create inbound demand.",
      "COPYABLE PROMPT 1 — Continue Harley Labs — Dell Build from the dashboard KB. I am on the Dell Precision 3581, not the Lenovo. Verify the current Docker stack and n8n screen first. The 9 October checkpoint reached localhost:5678/setup; account completion is unverified. Guide me through owner onboarding privately, one clear step at a time, keeping credentials out of chat. Then create a manual-trigger first workflow using a fictional lead with reference LAB-001: save its fields, classify it, put it in a local review queue and draft a reply without sending anything. First inspect the current n8n version and available nodes/storage; do not assume older tutorials match. Use no external service credentials or real customer data. Record actual observations in this same KB entry and mark any unfinished step explicitly.",
      "COPYABLE PROMPT 2 — Continue Harley Labs — Dell Build on the Dell. First verify the n8n project name harley-n8n, file n8n.compose.yaml, actual named volume and current saved fictional workflow. Guide me through a stop/start persistence check using docker compose -p harley-n8n -f n8n.compose.yaml stop and docker compose -p harley-n8n -f n8n.compose.yaml start; then reopen localhost:5678 on the Dell and check account/workflow retention. Plan a separate Windows reboot check only when I am ready, and distinguish Docker Desktop startup from container startup. No restart policy was recorded. Never run down -v, remove volumes or reset the owner. Update the same KB with evidence and remaining gaps.",
      "COPYABLE PROMPT 3 — Continue Harley Labs — Dell Build. Before proposing backups, verify the running n8n version, container, actual Compose volume and storage mode on the Dell. Help me make a consistent backup of the lab data and Compose files, protect any encryption key privately, and document recovery steps without recording secrets. Demonstrate restore in a separate isolated lab instance with fictional data and a different localhost port/volume; preserve the original. A workflow export alone is not proof of full-instance recovery. Do not delete or overwrite data. Verify the restored account/workflow and record what was tested in the same KB.",
      "COPYABLE PROMPT 4 — Continue Harley Labs — Dell Build. The recorded image n8nio/n8n is unpinned. Read the actual running version/digest and current official compatibility/release guidance before choosing a version. Teach version pinning and a reviewed update/rollback procedure one step at a time, after a recoverable backup exists. Keep the existing data volume and project name. Do not pull a newer image, upgrade, recreate the stack or change production until the concrete plan is reviewed. Record proposed versus performed actions in the same KB.",
      "COPYABLE PROMPT 5 — Continue Harley Labs — Dell Build with the manual fictional-enquiry workflow. Verify the current nodes and local persistence before adding rule-based triage. Test clearly labelled fictional examples for an ordinary enquiry, missing information and an urgent exception. Save a stable lead reference, rule outcome, next action and review status; produce a draft reply and simulated acknowledgement only. Do not automatically quote, promise delivery dates, send real messages or make commercial decisions. Keep discovery, scoping and pricing with a human. Record each case and result in the same KB.",
      "COPYABLE PROMPT 6 — Continue Harley Labs — Dell Build. Inspect the existing fictional workflow and teach duplicate protection, retries and exception monitoring. Submit the same stable lead reference twice and prove one saved lead and one queued draft. Inject a controlled failed step, retry safely and show a visible failed/retry state without duplicate side effects. Define a bounded retry policy and an operator review queue using the current n8n capabilities. Send no real notifications and connect no customer systems. Record test cases, observed counts and unresolved risks in this same KB.",
      "COPYABLE PROMPT 7 — Continue Harley Labs — Dell Build. Verify the local fictional-enquiry workflow before adding a human review gate. Show a clear queue with lead reference, classification, draft reply, next action and approve/revise/reject state. Approved items may advance only to a simulated send result; an approval click is not authority to send a real message. Keep discovery, custom scope and pricing with the founder, and route exceptions to a review queue. Test approve/reject/duplicate approval with fictional data and update this same KB entry.",
      "COPYABLE PROMPT 8 — Continue Harley Labs — Dell Build and plan a staged integration with Harley Digital Works. Read AGENTS.md, PROJECT_STATUS.md and docs/HANDOVER.md first; inspect the actual branch, exact revision, existing GitHub checks and hosting pipeline before adding tools. Lenovo is development, Dell is the isolated test bench, and hosted production is independent of the Dell. Prepare branch/change → GitHub checks and review → exact revision tested on Dell with test data → hosted preview → human release approval → established release → live verification and rollback. Keep the agency platform in canonical code/Git and client trade sites in their separate Lovable repos. Planning does not authorize customer connections, messages, database writes or deployment. Record proposed, implemented, tested, committed, pushed, deployed and live-verified separately.",
      "COPYABLE PROMPT 9 — Continue Harley Labs — Dell Build from its central dashboard article, one practical step at a time. Start by checking whether another assistant or queued task has already updated it: use id harley-labs-dell-build and title Harley Labs — Dell Build, edit the existing entry rather than creating a duplicate. Confirm I am using the Dell and ask only for the minimum missing observation. Treat 9 October 2026 as a historical checkpoint; preserve verified progress, label new proposals and untested claims, and keep this same KB and relevant repository handover aligned. Never store credentials/customer data or update account-level memories for this lab record.",
    ],
    operationalDetails:
      "Current recovery record: docs/THG_LAB_RECOVERY_2026-10-19.md. Machine identifiers and the absolute workspace location remain in the restricted local runbook. Use its local Lab.ps1 Start, Check, TestRecovery and Stop actions; raw supabase start/db start does not meet the zero-published-port configuration. Preserve the data volume. Immediate recovery next step is the concrete H07 approval package; n8n lessons remain optional separate work. No production access/export/restore, application migrations or release authorised. This article supports L01/H07 and does not mark full disaster recovery, n8n or public Labs acceptance complete. Repository review, dashboard publication and live verification are separate states.",
    statusBadge: "Local recovery tested · H07 approval pending",
    lastUpdated: "2026-10-19",
  },
  {
    id: "platform-architecture-state",
    category: "architecture",
    title: "Production Infrastructure & Backend Environments",
    summary:
      "Overview of the dual-environment setup (Cloudflare Workers + Supabase) running the live customer portal and marketing surfaces.",
    keyPoints: [
      "Live backend: THG Agency (worzpzbutngugwzhlvtj) in Supabase eu-west-1.",
      "Staging backend: Isolated project (mfpnfxpgkfuqtedbcxvp) in SkyPilot24 org.",
      "Production host: Cloudflare Worker (skypilot24-harley-digital-works) with Nitro SSR runtime.",
      "Canonical source repository: SkyPilot24/harley-digital-works on GitHub main branch.",
      "Lovable THG Digital repository (thgdigital) remains a decoupled UI prototype environment.",
    ],
    operationalDetails:
      "All live database operations connect strictly to the THG Agency instance. The frontend is pre-rendered and served via Cloudflare edge nodes with SSR fallback. Secrets are managed in Cloudflare Worker environment bindings; the Supabase service role key is strictly quarantined to server tasks and never exposed to the public client bundle.",
    statusBadge: "Verified Live",
    lastUpdated: "7 October 2026",
  },
  {
    id: "automated-background-crons",
    category: "architecture",
    title: "Scheduled Background Crons & Task Workers",
    summary:
      "Configuration and mechanics of Cloudflare Worker and Nitro scheduled crons for outbox delivery and data retention.",
    keyPoints: [
      "Minute Cron (* * * * *): Dispatches lead alerts to Slack #all-the-harley-group.",
      "Disjoint leases: Uses FOR UPDATE SKIP LOCKED with a 2-minute lease window to prevent double-sends.",
      "Native fetch receiver: Global fetch wrapper preserves Cloudflare Worker context to avoid connection drops.",
      "Exponential backoff: 5-attempt retry schedule (1m, 5m, 15m, 60m) before marking failed.",
      "Hourly Cron (0 * * * *): Invokes prune_lead_submission_attempts() via service client for abuse retention pruning.",
    ],
    operationalDetails:
      "Crons are defined in nitro.config.ts and compiled into .output/server/wrangler.json. The lead notification task runs every minute, claiming unleased jobs atomically. Slack alerts contain only the brand, lead reference, and a secure CRM link (no customer PII). The hourly retention task deletes stale IP submission attempts older than retention limits to maintain GDPR compliance and database efficiency.",
    statusBadge: "Active Schedules",
    lastUpdated: "7 October 2026",
  },
  {
    id: "security-rls-intake-safeguards",
    category: "architecture",
    title: "Security Hardening, RLS & Abuse Protection",
    summary:
      "Multi-layered defense model protecting lead capture, authenticated administration, and user data privacy.",
    keyPoints: [
      "Atomic server intake: Leads submitted via public contact forms pass through an atomic database RPC.",
      "Strict Row-Level Security: Anonymous direct SELECT, UPDATE, and DELETE operations on leads are strictly denied.",
      "Rate limiting: IP-based bucket limits enforced using Cloudflare edge headers (CF-Connecting-IP).",
      "Zero auto-admin signup: Legacy bootstrap trigger disabled; new signups receive no administrative privileges.",
      "Isolated credentials: Real administrative sign-in requires confirmed email/password or magic link in THG Agency.",
    ],
    operationalDetails:
      "Prospect and client records are isolated by Postgres Row-Level Security. Ordinary authenticated users cannot view or mutate other users' records. The admin portal is restricted to users with explicit administrative metadata. All client-side builds undergo automated secret-leak scanning during CI/CD to prevent token exposure.",
    statusBadge: "Enforced RLS",
    lastUpdated: "7 October 2026",
  },
  {
    id: "commercial-offer-managed",
    category: "commercial",
    title: "Commercial Model: The Three Productised Packages",
    summary:
      "The three productised packages designed for UK trade contractors, anchored by the flagship Revenue Engine.",
    keyPoints: [
      "The Revenue Engine (Core Flagship): £1,495 setup (50/50 split £747.50) + £249/mo care. 5 pages, DFY trade copy, dual SMS/email lead desk, GBP local SEO + Schema JSON-LD, automated review kit, 30-min monthly edits.",
      "The Launchpad (Entry): £995 setup (50/50 split £497.50) + £149/mo care. 3 pages, DFY copy, email lead desk, GBP verification, Cloudflare edge hosting, 15-min monthly edits.",
      "The Market Leader (Expansion): £2,495 setup (50/50 split £1,247.50) + £399/mo care. 8 pages, 3 geo-targeted area landing pages, missed-call SMS auto-reply, priority review booster, Google LSA setup, 60-min monthly edits.",
      "Initial Target Niche: Established Electrical Contractors (2–8 staff) across Bristol, Bath, and the M4 Corridor.",
      "Acquisition Engine: Zero cold calling. Automated corporate B2B digital leak audits (PECR compliant) + private interactive prototypes.",
    ],
    operationalDetails:
      "Harley Digital Works positions as the digital operating infrastructure for UK trades: 'We build and run your complete digital enquiry desk — so high-value local customers find you, trust you, and book with you, while you stay focused on the tools.' All billing is milestone-gated (50% upfront deposit, 50% on preview sign-off before DNS cutover). Out-of-scope items (e-commerce, custom apps, site visits) are quoted separately.",
    statusBadge: "Ratified Tiers",
    lastUpdated: "7 October 2026",
  },
  {
    id: "unit-economics-and-vat",
    category: "commercial",
    title: "Unit Economics, Payback & VAT Compliance",
    summary:
      "Defensible cost breakdown, upfront contribution margins, recurring profitability, and statutory tax rules.",
    keyPoints: [
      "Upfront delivery cost (Base): £772.63 (14h build labour @ £40/hr + CAC overhead + Stripe fee).",
      "Illustrative setup contribution: +£722.37 (48.3%) after the full setup fee, not Day 0 cash from a half-deposit; actual delivery costs remain to measure.",
      "Monthly servicing cost (Base): £66.94 (prorated infrastructure + 1h support labour @ £40/hr + Stripe fee + incident buffer).",
      "Monthly recurring net contribution: +£182.06 / month (73.1% margin) per active client.",
      "Tax review required: seller VAT registration and invoice treatment must be confirmed before issue. Being below the threshold is not proof of a zero rate. Approved package prices remain unchanged; never invent a VAT number.",
    ],
    operationalDetails:
      "Unit economics are illustrative, not measured profit. Reconcile processing fees, actual labour, support and staged cash receipts. Full setup contribution cannot be reported as Day 0 cash from a half-deposit. Do not use historical zero-rated/not-applicable wording as an invoice rule; confirm registration and treatment with the seller/accountant first.",
    statusBadge: "Tax review required",
    lastUpdated: "14 October 2026",
  },
  {
    id: "capacity-and-operating-boundaries",
    category: "commercial",
    title: "Operator Capacity & Delivery Concurrency Caps",
    summary:
      "Operating rules protecting founder NHS schedule commitments while maintaining strict delivery SLAs.",
    keyPoints: [
      "Founder weekly capacity: 10–12 hours per week dedicated to Harley Digital Works.",
      "Automation target: roughly 70% of setup work; measured end-to-end pilot evidence is still required.",
      "Active labour target: 4–5 hours of founder touch per website; this is not an observed delivery result.",
      "Hard pilot cap: 2 concurrent builds. Wider two/three capacity records require decision-scope reconciliation before changing the guard.",
      "Fleet servicing: Support for active care clients requires ~0.5–1.0h/client/month, fitting within part-time capacity up to 15 active accounts.",
    ],
    operationalDetails:
      "Retain the two-build pilot guard and measure founder delivery/support time. Pause acquisition when the existing guard is reached. Expansion, staffing spend and response commitments require the applicable commercial decision and coverage evidence.",
    statusBadge: "2-build pilot cap",
    lastUpdated: "14 October 2026",
  },
  {
    id: "eight-step-turnaround-sequence",
    category: "playbooks",
    title: "8-Step Turnaround Delivery Sequence",
    summary:
      "The standardised client progression from initial inbound enquiry to launched care subscriber.",
    keyPoints: [
      "Step 1 - Qualify Enquiry: Verify trade accreditation, company status, and coverage area.",
      "Step 2 - Conversion Tools: Run Trade ROI Calculator, Local SEO Inspector, and Review Booster to demonstrate value.",
      "Step 3 - Approve Commercial Quote: Issue formal proposal (£1,495 setup + £249/mo) via LeadProposalModal.",
      "Step 4 - Verify Deposit Payment: Confirm 50% deposit (£747.50) in bank ledger before initializing workspace.",
      "Step 5 - Onboard & Assemble: Collect brand assets, project photos, write done-for-you technical copy.",
      "Step 6 - QA & Diagnostic Inspection: Run full suite diagnostics, check metadata, sitemap, and edge SSR.",
      "Step 7 - Launch & DNS Connection: Switch DNS to Cloudflare while safeguarding existing business email (MX records).",
      "Step 8 - Monthly Care Activation: Start £249/mo subscription, monthly health checks, and 30-min edit batches.",
    ],
    operationalDetails:
      "Every project follows this sequence strictly. Step 4 is a hard gate: no production build begins until the upfront deposit clears in the bank ledger. Creating a client workspace does not mark the lead won or record payment.",
    statusBadge: "Standard SOP",
    lastUpdated: "7 October 2026",
  },
  {
    id: "trade-vertical-playbooks",
    category: "playbooks",
    title: "Trade Vertical Playbooks & Target Audiences",
    summary:
      "Messaging, average contract sizes, and high-converting features across priority trade sectors.",
    keyPoints: [
      "Gas Safe Heating Engineers: Average job value £3.2k–£5.8k. Key feature: boiler brand selector & CP12 landlord reminder.",
      "NICEIC Electricians & EV: Average job value £1.8k–£9.5k. Key feature: instant EV charger quote & EICR intake.",
      "Master Builders & Construction: Average job value £45k–£150k. Key feature: before/after sliders & stage payment guides.",
      "Commercial Contractors: Average job value £12k–£85k/yr. Key feature: commercial fleet portal & PPM retainer calculator.",
    ],
    operationalDetails:
      "All landing hubs and proposed copy highlight verified accreditations (Gas Safe, NICEIC, FMB, CHAS). Initial pilot outreach focuses on Bristol & Bath regional trades before expanding UK-wide.",
    statusBadge: "Trade Verticals",
    lastUpdated: "7 October 2026",
  },
  {
    id: "governance-escalation-matrix",
    category: "governance",
    title: "Proposal Automation & Founder Escalation Triggers",
    summary:
      "Clear boundaries defining which customer proposals can advance automatically vs. those requiring founder approval.",
    keyPoints: [
      "Auto-Generate Allowed: Standard 5-page scope, £1,495 setup + £249/mo, 50/50 payment split, standard 30-day care terms.",
      "Halt - Scope Creep: Custom software, customer portals, e-commerce checkouts, or requests exceeding 7 total pages.",
      "Halt - Pricing Alterations: Any proposal requesting discounted setup (<£1,495) or waived monthly care.",
      "Halt - Delayed Deposit: Requests to commence work without upfront deposit payment.",
      "Halt - Contractual Liability: Custom NDAs, bespoke indemnities, or penalty-backed delivery deadlines.",
      "Halt - Capacity Breach: Pipeline exceeding 3 concurrent active onboarding builds.",
    ],
    operationalDetails:
      "If any escalation trigger occurs, the lead remains in 'Contacted' or 'Qualified' state until the founder reviews and provides written approval. No automated system is permitted to waive commercial terms.",
    statusBadge: "Escalation Matrix",
    lastUpdated: "7 October 2026",
  },
  {
    id: "revenue-recognition-rules",
    category: "governance",
    title: "Revenue Integrity & Accounting Safeguards",
    summary:
      "Rules enforcing truthful accounting and preventing speculative pipeline from being presented as collected revenue.",
    keyPoints: [
      "Zero assumed revenue: Lead enquiry interest or package selection NEVER records assumed revenue.",
      "Client workspace isolation: Initializing a client workspace creates zero monthly value and sets status to 'lead'.",
      "Bank ledger verification: Setup fees and monthly care values are only recorded as collected after bank or Stripe reconciliation.",
      "No dummy documents: No fake VAT invoices or mock tax records are permitted.",
      "Separate financial ledgers: Primary statutory accounting is reconciled outside this dashboard.",
    ],
    operationalDetails:
      "The CRM and Control Centre display pipeline counts and operational estimates. These are never presented as verified audited turnover. Invoices generated in the dashboard are payment notices and request templates, not statutory VAT invoices.",
    statusBadge: "Integrity Rule",
    lastUpdated: "7 October 2026",
  },
  {
    id: "notification-triage-runbook",
    category: "support",
    title: "Notification Failure Triage & Slack Runbook",
    summary:
      "Diagnostic procedure for monitoring outbox delivery, investigating failed alerts, and resetting delivery leases.",
    keyPoints: [
      "Monitor outbox: Check Control Centre or Automations & Health (/admin/diagnostics) for outbox job statuses.",
      "Status lifecycle: pending -> leased -> accepted (or failed after 5 attempts).",
      "Acceptance confirmation: 'Slack acknowledged this alert' indicates successful delivery to #all-the-harley-group.",
      "Lease recovery: Jobs stuck in 'leased' state automatically recover after the 2-minute lease window expires.",
      "Emergency webhook verification: Verify SLACK_WEBHOOK_URL is set in Cloudflare Worker environment bindings.",
    ],
    operationalDetails:
      "In the event of a Slack webhook error, the Cloudflare Worker task captures safe diagnostic error categories and schedules automatic retries with exponential backoff. Customer contact details are never logged in error traces. Customer enquiry submission is never blocked or rolled back if Slack delivery fails.",
    statusBadge: "Operational SOP",
    lastUpdated: "7 October 2026",
  },
  {
    id: "dns-email-continuity-runbook",
    category: "support",
    title: "DNS Cutover & Client Email Continuity Runbook",
    summary:
      "Step-by-step technical instructions for pointing client domains to Cloudflare without interrupting existing email services.",
    keyPoints: [
      "Pre-cutover DNS audit: Export and record all existing DNS records (MX, SPF, DKIM, DMARC, TXT, CNAME).",
      "Zero email disruption: NEVER touch or delete MX records during website launch.",
      "Web traffic routing: Point root domain (@) and www to Cloudflare edge CNAME or A records.",
      "SSL verification: Ensure Universal SSL or custom SSL certificate is active before switching nameservers.",
      "Post-launch verification: Send test emails to client's business address to confirm uninterrupted delivery.",
    ],
    operationalDetails:
      "The client always retains 100% legal ownership of their domain name and registrar account. Delegation via Cloudflare CNAME or DNS zone transfer must strictly preserve all email exchange configurations.",
    statusBadge: "DNS Checklist",
    lastUpdated: "7 October 2026",
  },
  {
    id: "business-os-central-records",
    category: "records",
    title: "Business OS Central Governing Documents",
    summary:
      "Direct references to the authoritative Google Drive mirrors and repository governance files.",
    keyPoints: [
      "Business OS Folder: 1A6e8LO2cElTH4WsIwdQAggJnH94xTJuP (Single entrypoint).",
      "Business Definition: 1sGcm_svP0v9WRrxRLSg33hq5G9BlkSx_ (Scope, pricing, operating boundaries).",
      "Master Backlog: 1CCRiiSJSUxBfbQKfFjQpa45_wrMoYSCn (Tasks H01-H50, D01-D08, L01).",
      "Project Status: 16dY7fXb2YAy9-BBYPrCrwoftoOV_GAvj (Verified deployment & milestones).",
      "Decisions & Activity: 1aLkoy5TKNCQi7fmvc8YqxLXzMWdDVkZj (Decision history & ratifications).",
      "Commercial Offer & Economics: docs/COMMERCIAL_OFFER_MANAGED.md in repository.",
    ],
    operationalDetails:
      "The shared repository governs technical execution, while Google Drive mirrors reflect business state at milestones. Updates are synchronized deliberately; changes in Drive do not automatically push to Git and vice versa.",
    statusBadge: "Drive Mirrors",
    lastUpdated: "7 October 2026",
  },
];
