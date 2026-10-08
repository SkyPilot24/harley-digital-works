# Revenue launch — implementation record

Current-state pointer, 3 October 2026: this is a historical implementation log. Use ../PROJECT_STATUS.md, ../MASTER_BACKLOG.md and REVENUE_WORKFLOW.md for current evidence and the automated pilot. Repository records govern shared execution; Drive Business OS is the central entrypoint and explicitly reconciled mirror. Older access, unpushed and authority statements below describe their dates.

Updated 28 September 2026. Branch: `codex/revenue-readiness`.

## Outcome

The next business milestone is one genuine paying website customer: agreed scope, verified payment, an approved deliverable and an owned care process. A signed proposal, a sample invoice or planned recurring revenue does not count as collected revenue.

## First implementation increment

- Email server function now requires authentication and an explicit database admin role. Payload sizes are bounded. Provider acceptance is distinguished from delivery; unsuccessful provider requests cannot silently fall back to a second send.
- `TRANSACTIONAL_EMAIL_ENABLED` defaults to disabled. Keep disabled until sender verification, abuse quotas, audit records and delivery monitoring are ready. This increment does not mark audit H04/H09 fully complete.
- Contact phone details survive parsing, the stored message and email fallback. Legacy Pro, domain and care/consultation links select a real option. No schema migration is needed for these fixes: phone is preserved in the message and the existing source column identifies each brand.
- Corporate enquiry now uses the same validated server action, honeypot and timing field. Success appears only after the action succeeds. Missing backend configuration opens an explicitly labelled draft; it never claims receipt.
- Slack errors/timeouts no longer invalidate a saved enquiry. Notification retry/outbox work remains outstanding; staff must treat CRM records as authoritative.
- Public prototype routes `/audit`, `/tools/seo-inspector`, `/tools/review-booster`, `/care-desk`, `/onboarding`, `/proposals`, `/partners`, `/track` and `/track/*` redirect to an appropriately labelled enquiry. Source remains available for later completion. These features are deferred, not finished.
- Fifteen behavioural tests cover intake data, source/validation, notification failure, email authorization/status and route gating. CI now runs the test command.

## Backend discovery

Lovable project `f2aa963f-2beb-4507-b37e-a1865915cda7` reports an enabled Supabase database. Its `supabase/config.toml` identifies `worzpzbutngugwzhlvtj`, matching this repository. This explains why it is not listed under the separate connected Supabase account.

The Lovable database tool rejected a read-only metadata query because the connector lacks `projects:write`. Its prescribed remedy is removing and re-adding the Lovable app to refresh permissions; reconnecting the same grant does not refresh it. Do not create a replacement database, rotate unknown credentials or overwrite migrations merely because the separate account cannot see it.

Once authorized access works:

1. Inspect tables, applied migrations, RLS, admin bootstrap and record counts without exposing personal records.
2. Establish staging/test data and validate anonymous/admin access before any live schema change.
3. Securely map public build variables and private worker variables to the existing backend. Do not print or commit secrets.
4. Prove one controlled enquiry is persisted and retrievable by the intended staff account; verify a failed notification does not lose it.
5. Review and deploy the tested Cloudflare release; re-run controlled production checks. No deployment has occurred in this increment.

## Current commercial direction and central records

The founder has now selected an initial setup/build fee plus an ongoing monthly subscription for a productised digital service for trades. This supersedes the September 16 optional-setup direction. The recommended Managed MVP is £1,495 setup plus £249/month, but prices, VAT treatment, scope, payment/cancellation terms and support commitments remain proposals requiring approval before publication or charging. Existing public prices have not been changed by this documentation update.

The [Business OS central index](https://drive.google.com/file/d/1_bPSSKnLH2FekfD8xSAPcloMbIZSySgl/view) governs business direction, decisions, activity and the 50-item delivery backlog. Update its status, activity log and relevant task evidence at each material milestone. Code stays in this repository; local implementation, deployed verification and actual revenue must be recorded separately. Earlier plans labelled REFERENCE are superseded, not alternative current instructions.

## Minimum first-sale process

1. Receive a genuine enquiry through the verified form or existing business inbox.
2. Qualify the business, decision-maker, services, geography, existing website/domain/email, required pages, assets, budget and timing. Record permission/preferences for follow-up.
3. Write a concise scope and approved price covering pages, copy, factual approvals, revisions, launch dependencies, payment schedule, ownership/cancellation and bounded care. Use actual business identity/tax details.
4. Obtain explicit acceptance of the exact scope and issue a real invoice/payment link from the chosen accounting/payment provider. Do not use the sample invoice or billing panels.
5. Confirm payment from the provider/ledger rather than a redirect or screenshot. Convert the lead to a client once; correct the existing package-text-derived recurring-revenue calculation before relying on CRM totals.
6. Collect verified facts/assets, build a private clearly labelled preview, perform QA and record approval of its exact version.
7. Launch against real DNS/hosting instructions, preserving business email, then hand over access, support expectations and a rollback record.
8. Reconcile collected revenue and actual delivery effort; complete one care request before expanding acquisition.

No prospect messages have been sent. Drafting prospect lists or outreach can follow later, but sending requires explicit authorization and a working fulfilment process.

## Verification of this increment

- TypeScript passed.
- Existing 54 smoke checks plus 15 behavioural tests passed.
- Cloudflare production build passed locally (client and server output). This is not yet a clean CI or deployed-live proof.
- Targeted lint passed for the new/core server, intake and route files. Repository-wide pre-existing lint/format debt remains.
- Local HTTP checks passed for homepage, contact preselection, corporate form and eight prototype redirects, including an unknown tracker token.
- Live database reads/writes, provider delivery, a production deployment and actual payment are not yet verified.

## Next increments

### Second implementation increment — sales records

- Creating a workspace now preserves prospect status and starts at zero recorded recurring value. Package text is never interpreted as an agreed price; the lead is not automatically marked won.
- The lead UUID is used as the new workspace's stable primary key. Duplicate-key races recover the existing workspace, without overwriting manually edited client values. Unexpected existing records are rejected for reconciliation. Legacy conversions created with unrelated IDs still require an account-level review once database access is restored.
- Client monthly totals include only active records with valid positive amounts and are explicitly labelled manually recorded, not collected revenue. New manual clients default to prospect/zero rather than active/£95.
- Dashboard win rate counts leads marked won rather than dividing unrelated active-client counts by enquiries. Database count failures propagate instead of becoming fabricated zeros; enquiry/client lists show retrieval failures with retry controls.
- Six additional behavioural checks cover package-price contamination, concurrent retries, preservation of existing client data, conflicting records, failed inserts and active-only monthly totals. All 75 checks/tests and typechecking passed; the updated production build passed. Live database/RLS concurrency testing remains pending, and no payment has been recorded or collected.

### Stabilisation follow-up - 29 September 2026

- Removed the operational staging simulator. Revenue OS now reports payment/provisioning as not connected and links to enquiries. No simulated webhook can insert won leads, claim payment, generate a live preview, or prepare a customer welcome message.
- Replaced the invoice page and client invoice modal with a shared unavailable state. Unverified bank/VAT details, sample customer invoices, manual paid receipts, invoice email drafts and the sample consolidation view are no longer exposed through these entry points. Billing must use the verified accounting provider until a persistent integration is implemented.
- Removing the simulator also removes the failing package-selector TypeScript assignment. Existing source history retains the prototype for reference; these capabilities are deferred, not complete.
- Lovable confirms the existing database is enabled. A read-only table/RLS metadata query still fails because the connector lacks `projects:write`. The tool requires removing and re-adding the Lovable app to refresh permissions. No database or credential changes were attempted.
- Provider choice remains undecided, as confirmed by the founder. Verified billing identity is also still required. Live enquiry persistence, access policies, payment receipt and deployment verification remain pending.

### Remaining execution sequence

1. Restore existing backend access and prove enquiry capture/admin retrieval.
2. Resolve offer/entity facts; remove unsupported proof and consolidate the retained public pages.
3. Verify the locally corrected CRM conversion against the intended database, then connect a real proposal/invoice/payment process using the existing provider if suitable.
4. Complete brand-domain metadata, deployment gates, monitoring and retained-journey QA.
5. Run the first authorized pilot and record collected revenue. Do not enable prototype portals merely to make the feature list look complete.
