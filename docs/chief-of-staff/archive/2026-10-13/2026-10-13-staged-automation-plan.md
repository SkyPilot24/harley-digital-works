# The Harley Group — staged agent operating plan

13 October 2026. Current status: first daily briefing schedule ACTIVE following Robbie's later explicit authorisation in voice chat. Initial private Slack briefing sent and read back. First timed run remains unverified. Owner: Robbie Harley. Agent owner: Codex in this chat. See briefings/2026-10-13-setup-record.md for implementation evidence and limitations. The proposal below is retained as the original planning baseline; its earlier no-schedule/no-Slack restrictions are superseded only for this authorised briefing workflow. No purchases, customer messages or production changes.

## Recommendation and current priorities

Start with one read-only daily operating briefing. It reads business records, compares evidence with its previous successful run, records changes and exceptions, and recommends one next action. It does not execute the recommendation. Use the existing Codex app before adding an orchestrator or another dashboard.

Keep three business priorities active:

1. Verify IONOS expiry, auto-renew and renewal quote for buydronesupplies.co.uk. The 12 October local report records expiry on 17 October; current registrar facts remain unverified. Robbie decides keep/drop and approves any expenditure.
2. H50: sandbox deposit → exactly one application receipt, with signature, replay, mismatch, failed-payment and recovery evidence. Reconcile the handover conflict and working state first.
3. H07/H42/H09: remaining owner session, backup/restore and transactional-email acceptance. Do not equate the accepted enquiry journey with complete release readiness.

Prospect qualification remains queued; Labs expansion and new tools are deferred. The briefing should recommend the highest-impact actionable item, not repeatedly recommend a blocked task without explaining the dependency.

## Evidence and capability boundaries

- Verified in this session: canonical revenue-workflow document is accessible and explicitly describes a target design, not a live system. The local operating note is readable/writable. October governing records were read in the preceding assessment.
- Recorded historical evidence: secure enquiries and genuine owner retrieval; Slack outbox acceptance; client template; prospect research and drafts; unit tests for outreach; one provider-confirmed fictional sandbox deposit. These are not fresh runtime checks of those systems.
- Exposed tools: local file operations and Codex scheduling capability. GitHub, Drive, Supabase, Stripe and Slack connectors are available in the tool catalogue, but their account authentication, scope, target and unattended access have not been tested for this plan.
- Proposed/unverified integrations: durable lifecycle runner, CRM transitions, signed payment-to-client receipt handling, automated onboarding, support routing, recurring collection/reporting and a briefing scheduler with conditional notifications. Availability of a connector is not proof of an integration.
- Existing architecture: records identify harley-digital-works as the agency application, THG Agency as live backend, isolated staging as separate, Cloudflare hosting and kindred-spark as client template. Confirm current mapping before any implementation. No stack migration is proposed.

The latest founder instructions govern permissions. Older workflow wording allowing routine proposals or releases does not authorise contacting customers, binding terms or publishing now. Later standing authorisations can specify exact rules and limits; absence of an answer is never approval.

## Journey responsibilities

These are responsibilities to add in stages, not nine agents to create. One agent can perform multiple bounded jobs. Business state changes should be validated by rules; AI output alone is not completion evidence.

| Stage and trigger | Agent work | Inputs, tools and access required | Independent work / Robbie approval | Completion evidence | Failure or uncertainty route |
| --- | --- | --- | --- | --- | --- |
| Prospect research: approved niche or research batch requested | Reuse candidate list; deduplicate; inspect primary business pages; record digital weaknesses and provenance; prepare a small research batch | October definition, existing 50-candidate register, public web/registry research; local draft write access. CRM import only after scoped write approval | Research and internal drafts independently. No messages, paid enrichment or speculative full sites. Robbie approves niche changes and any outreach | Dated source URLs, observations, entity match and unknowns; no invented staff, turnover or accreditations | Flag inaccessible evidence, ambiguous entity matches and conflicting claims; keep as research candidate |
| Qualification: new saved enquiry or reviewed candidate | Apply agreed fit, service scope, buying-interest and contact-eligibility rules; check two-build pilot capacity; draft missing-information questions | Approved rules, enquiry/CRM read access, suppression/consent records, current capacity; no blanket database credentials | Internal assessment independently. Robbie handles uncertain eligibility, bespoke scope and commercial exceptions; sending questions requires authorisation | Evidence-backed qualification reason; distinct fit, interest, eligibility and capacity states; owner and next action | Do not infer willingness from website weakness or permission from public email. Hold uncertain cases for Robbie |
| Proposal: qualified prospect requests an offer | Draft approved package, factual scope, milestones and agreement; check price/support/ownership consistency and version | Commercial offer, verified customer facts, availability, legal/supplier identity, approved proposal template; local drafts first | Draft/check independently. Robbie approves issuance and binding commitments, discounts and nonstandard terms | Exact proposal version plus approval record; authorised delivery receipt; customer acceptance tied to that version | Hold contradictory identity, tax, support or scope wording; surface a specific decision before issuance |
| Payment: accepted authorised proposal | Prepare hosted checkout/invoice; validate signed provider event; reconcile client, currency, amount and milestone; deduplicate receipts | Stripe sandbox and isolated receiver initially; secure secrets outside documents; scoped billing/receipt access when approved | Prepare/test locally with fictional events. Provider creation needs appropriate execution approval; live billing, refunds, spending and term changes need Robbie approval | Authentic event and provider readback, exactly one matching application receipt; invalid/replayed/mismatched/failed cases proven safe | Payment exception queue; never mark paid from return page. Bounded retries; reconcile provider state before another charge |
| Onboarding: verified deposit and authorised agreement | Assemble checklist; validate customer content, rights and access; track missing items; draft reminders | Approved intake, customer submissions, rights evidence, scoped client workspace; secure access-sharing route | Internal validation/drafts independently. Customer requests/reminders need sending authorisation; new services/access escalation go to Robbie | Required inputs validated, rights confirmed, access tested without exposing credentials, checklist and next owner recorded | Missing assets/rights, access failure or overdue inputs block build; one deduplicated request for action |
| Delivery: validated intake and available build slot | Populate existing trade template; draft grounded copy; build private local preview; run relevant checks; track time and costs | Current repository instructions, clean/understood branch state, approved template and assets, isolated checkout/test backend; bounded tool usage | Local reversible build and fixes independently within task. Paid generation, new integrations, external preview publication, DNS and production deployment need approval | Reproducible revision, preview artefact, relevant tests, factual traceability, delivery time; local/committed/pushed/deployed states separately recorded | Stop at factual gaps, secrets, build failure or unfamiliar integration; preserve last good revision; show safe recovery |
| Quality review: candidate revision ready | Check content, links, responsive layout, accessibility, SEO, enquiry delivery, permissions and error paths; assemble review packet | Exact preview revision, approved brief and QA standard, browser/testing tools, isolated test identities and data | Routine checks/fixes independently. Robbie retains final quality judgement; customer approves their exact content/site. No automatic publication | Checks with evidence/limits; Robbie quality sign-off; explicit customer approval of exact version; payment, rollback and domain/email preflight | Failed checks block release. Material revision invalidates approval. No response is not approval; send concise exception packet |
| Ongoing support: authorised request, incident or billing event | Classify, prioritise, draft reply; prepare bounded local edits; check enquiry/billing health under authorised scope; track allowance and recurrence | Verified support inbox/queue, care agreement, allowance, monitoring, subscription and customer record; read-only first | Internal triage/drafts independently. Replies, publishing edits, refunds, scope increases and commitments require approval or explicit later standing policy | Ticket evidence, resolution tests, approved published revision where applicable; verified subscription collection and actual support time | Incident severity, overdue response, failed collection, security issue or exceeded allowance escalates to Robbie; no silent retry loop |
| Reporting: daily briefing or agreed monthly reporting date | Reconcile sources; distinguish pipeline, forecasts and actual receipts; report progress, margin inputs, interventions and next action | Business records initially; later scoped CRM/provider/support exports, cost and time records; local report writes | Internal reports independently. External customer reports and changed targets/commercial decisions need approval | Every metric has source, period and checked-at date; actuals separate from forecasts; inaccessible/stale sources disclosed | Suppress unsupported metrics; surface material discrepancy, newly missing source or unmeasured cost instead of inventing totals |

For every later automated transition retain: client/task ID, prior/new stage, trigger/event ID, rule version, evidence reference, timestamp, actor, approval scope and next owner. Use idempotency and bounded retries. Never retry a charge, message or deployment merely because its acknowledgement is missing.

All exceptions reach Robbie through one queue and this chat initially. Each exception states: failed stage, practical impact, evidence, what was safely attempted, decision needed and recovery action. Keep urgency distinct from certainty. No Slack/email alert integration is authorised by this plan.

## Staged rollout and gates

| Phase | Scope | Gate before proceeding |
| --- | --- | --- |
| 1. Observe | One manual briefing, baseline comparison, then proposed daily heartbeat in this chat | Allowlisted reads and report writes pass; stale/missing sources disclosed; unchanged run stays quiet; meaningful change notified once; UK schedule verified |
| 2. Prepare | Research, qualification and proposal drafts using existing records; repair documentation conflicts through a separate authorised task | Facts/eligibility and commercial template consistent; responsibilities/access explicit; no unintended sends or CRM writes |
| 3. Prove transactions | Fictional client in isolated payment/onboarding environment | Signature/replay/failure recovery and one persistent receipt pass; no live data or real funds; required external sandbox actions separately approved |
| 4. Prove one pilot | One authorised client through delivery, quality, approval, release and care | Evidence at every handoff; Robbie final quality judgement and deployment approval; customer exact-version approval; actual billing/support time measured |
| 5. Expand bounded routine work | Repeat reliable internal tasks; consider narrowly scoped standing approvals and one existing durable runner | Real pilot defect/intervention/cost evidence supports expansion; reversible recovery tested; permissions reviewed before each new responsibility |

No external orchestrator purchase is justified yet. Use existing application rules/server tasks where proven adequate. The Dell/n8n lab is an experiment until access, persistence and recovery are demonstrated; it is not the business workflow runner by assumption.

## First workflow: daily operating briefing setup proposal

Name: The Harley Group daily operating briefing. One thread-attached Codex heartbeat, proposed only. No separate agent chats or standalone jobs.

Schedule: daily at 08:15 Europe/London, including weekends because deadlines and incidents still matter. It must track GMT/BST, rather than a fixed UTC hour. Verify the app's saved timezone and next-run display before activation and after the October clock change. Local-file runs depend on the host being on and the desktop app running; this is not a 24-hour monitoring service. No catch-up promise until behaviour is tested. Existing dashboard/Slack 08:00 briefing is reported historically: inspect its scope before activation and avoid creating a second alert channel for the same findings.

### Read allowlist and precedence

Canonical root: C:/Local Data/The Harley Group/harley-digital-works/

1. BUSINESS_DEFINITION.md and docs/COMMERCIAL_OFFER_MANAGED.md: ratified scope and terms; latest explicit founder decision overrides older text.
2. PROJECT_STATUS.md, MASTER_BACKLOG.md and docs/HANDOVER.md: objectives, task IDs, owners, status, blockers and continuation evidence. Flag merge markers; do not silently resolve them.
3. docs/REVENUE_WORKFLOW.md and docs/BUSINESS_OS_INDEX.md: target workflow and record map; links are references, not automatic authority to read every destination.
4. docs/FIRST_CLIENT_REHEARSAL_2026-10-12.md and docs/evidence/stripe-sandbox-deposit-2026-10-12.json: historical H50 evidence, with date and provider/application distinction.
5. Local mirror output/chief-of-staff/2026-10-13-operating-record.md and this plan: operating overlay and permissions, not a replacement canonical repository.
6. Local mirror output/domain-portfolio-local-completion-2026-10-12.md and output/domain-portfolio-review-2026-10-12.md: dated domain risk. These do not prove current registrar state.

September mirror BUSINESS_DEFINITION.md/PROJECT_STATUS.md are historical; never silently fall back to them as current if canonical sources are unavailable. Synced sources/ remain untouched. Do not read .env, credentials, raw customer data, unrelated files, whole repository history or all chats. Additional evidence sources require an explicit allowlist change.

Each source entry records absolute path, role, read outcome, file fingerprint, document's stated date, last successful read and evidence date. A changed file timestamp alone is not a material business change. Proposed freshness rule: current status/handover older than seven days is flagged for review; dated runtime evidence is always labelled historical; older ratified policy is not expired solely by age. Time-sensitive registrar facts need current verification.

### Output and permissions

Writable root: this project mirror's output/chief-of-staff/briefings/. It is separate from synced files. Proposed artefacts:

- Dated run record, named YYYY-MM-DD-HHMMSS-briefing.md in London time.
- latest.md pointing to the last completed assessment.
- state.json with schema version, last successful run, source fingerprints, evidence dates and deduplicated issue/notification IDs. No secrets or customer details.

Read-only refers to business systems. The only permitted writes are briefing artefacts/state in this output folder. No canonical edits, Git mutation, database writes, provider actions, external messages, purchases, publication, deployment, deletion or new agents. No broad connector credentials needed for version one. Enforce narrow filesystem/tool access where supported; a prompt restriction is not proof of a technical permission boundary.

Write the run record before advancing state. A partial read does not overwrite the last successful source evidence with an empty value. If output cannot be saved, provide the ready-to-save briefing in this chat, report the write failure and do not claim persistence.

Briefing format: recommendation; meaningful changes since last successful check; up to three active priorities with owner/blocker/next action; decisions required; source coverage/staleness; evidence links; completion criterion for the one recommended action. Target 300 words or fewer, excluding source table. State proposed, implemented, tested, committed, pushed, deployed and live-verified separately when relevant.

### Meaningful-change notification rules

Proposed user notification in this chat only, never Slack/email. Notify for a new or materially changed blocker, a decision now required, evidence-backed completion/reversal, new conflicting policy, newly inaccessible critical source, missed expected run detected on recovery, or a deadline crossing seven/three/one days or becoming overdue. Unknown auto-renew on a recorded expiry is a risk, not proof a domain will be lost.

Deduplicate by issue ID plus material state; an unchanged unresolved blocker is not a new notification. A new deadline threshold is meaningful. On first manual run, present the baseline once. Later unchanged runs save the internal run record without a user-facing status message. Previously known gaps remain visible in saved briefings without repeated alerts. Source access recovery can be meaningful if it changes confidence or unblocks action.

Conditional notification delivery is not verified. Configure it using supported task/app controls during implementation; do not claim silence merely from writing a prompt. If the app cannot provide the required meaningful-change notification behaviour, do not activate this design unchanged; report that limitation and propose one controlled alternative for Robbie to decide. Do not use failed-runs-only if it would hide valid decisions.

### Manual acceptance test — before any schedule

Use local fictional fixtures inside the output folder for synthetic changes; never alter canonical/synced source files for tests. Run the same bounded briefing instruction manually.

1. Baseline: read each allowlisted source and save one briefing/manifest. Identify September supersession, handover conflict, historical sandbox result, domain deadline and unverified Git/runtime state. Verify no secrets or invented revenue.
2. No change: rerun with the same source contents and test time. Expect no new notification and the same issue IDs; save run evidence.
3. Meaningful change: fictional fixture resolves a blocker or adds a decision. Expect one specific changed finding; rerun and expect no duplicate.
4. Inaccessible/stale/conflicting source: simulated missing canonical file, old status date and conflicting instruction. Expect disclosure, preserved last-known evidence and no fallback to a historical plan as current.
5. Deadline: fixture advances from four to three days before recorded expiry with unknown auto-renew. Expect one renewed decision notice; unchanged three-day run stays quiet.
6. Output failure: simulate an unwritable fixture destination. Expect ready-to-save output and no false state advancement. Check source hashes unchanged.
7. Permission probe: fixture asks to send an email, renew a domain or deploy. Expect no action, with the approval dependency recorded. No real external call is used to test this.

This manual test validates briefing logic, not scheduler delivery. After it passes, propose one inactive setup for review where supported. Only explicit approval permits activation. Verify next run in UK time, notification routing, host availability and actual schedule delivery in the first supervised run. If activation/notification acceptance fails, stop recurrence and surface the limitation rather than claiming monitoring works.

## Implementation one step at a time

Step 1 next: run a single manual baseline briefing with the read allowlist and report-only write scope above. This also proves the execution context can read canonical records; earlier Git status denial must remain explicit. It activates nothing.

After reviewing that output, Step 2 is the fictional-fixture acceptance test. Step 3 is the concrete scheduler/notification configuration review. Step 4 is activation only after Robbie's explicit approval, followed by one supervised scheduled run. Do not create more agents while briefing responsibility/access is still being proved.

## Session record

Objective: agents handle routine work while Robbie retains commercial decisions and final quality judgement. Decision: propose one observation workflow before transactional automation. Owner: Codex prepares/tests; Robbie approves schedule and commercial/quality decisions. Blockers: canonical Git access and conflicting handover; unattended filesystem access, scheduler timezone and conditional notifications untested. Next action: manual baseline. Plan saved locally; not executed, committed, pushed or deployed.

Sources: canonical docs/REVENUE_WORKFLOW.md read 13 October; preceding same-day assessment and operating note; October canonical business/status/backlog/handover/offer read in that assessment; 12 October local domain report. Product reference: https://learn.chatgpt.com/docs/automations?surface=app (checked 13 October 2026). The official documentation supports local task host/app dependence and testing before scheduling; account-specific availability and notification behaviour still require acceptance.
