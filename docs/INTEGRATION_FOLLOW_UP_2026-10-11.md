# Integration follow-up — 11 October 2026

Baseline main e90da3bc6f8c8892c939ecbc3a360916b6e71462; PR #23 merged. Earlier pending-release records are historical. Scope: read-only provider checks and proposed digest correction. No production settings, database writes, customer contact or release.

## Verified findings

### Continued verification later on 11 October

- All final-head 88bc414 GitHub quality/security checks and Cloudflare preview build 29b07899-04ec-4e3e-bdb1-87d681b55a0a passed. PR #24 remains draft and unmerged.
- Genuine existing owner browser session successfully rendered /admin/headquarters: 122 links, 17 portfolio records, operational navigation and snapshot notice. No sign-in reset or bypass used. This supersedes earlier missing owner-access evidence, but does not establish every linked service or exact source revision.
- Cloudflare authenticated CLI reports current deployment 2086167e-948f-404f-9e15-47339035e341, created 9 October 21:06:16 UTC, serving version 1f52377f-524d-4174-9580-46c899add632 at 100%. Version metadata has no source SHA annotation. Timing aligns with main build but is not proof of exact commit. Builds API using existing scoped CLI auth returns 403; dashboard session requires login. Do not broaden token scopes just for audit.
- Supabase dashboard confirms THG Agency is on Free: no scheduled project backups; leaked-password protection is Pro-only. These are confirmed plan limits, not missing switches we can safely enable. No subscription purchase or backup restore performed. Need a founder spending decision or a separately approved secure logical-backup workflow with isolated recovery rehearsal.
- Dashboard overview reports Unhealthy while connector metadata remains ACTIVE_HEALTHY; database reads and owner app access succeed. These signals conflict. The focused last-24-hour postgres log error/fatal text query returned no rows; this does not disprove dashboard errors or establish all services healthy.
- Live admin diagnostics showed all 17 routes with HTTP 522. External GET with the same diagnostics user-agent returned HTTP 200 for homepage, contact and sitemap. Source performs global fetch back to the same public Worker hostname; Cloudflare docs explain worker-to-worker fetch requires service bindings or global_fetch_strictly_public. Same-zone fetch routing is a plausible cause, not a verified fix. Do not create 17 repair tasks from this result or declare a public outage. Validate a routing correction in isolated preview before release.
- Current-strategy UI copy still enforced two builds; updated to the founder-confirmed three. Digest already uses three.
- PR #8 is superseded: current workflow builds before testing in its separate Build & Test Suite job, and public strategy copy no longer contains the old variable-name trigger. Do not merge its old workflow patch. Closing it remains a separate maintenance decision.
- PR #21 action_required runs were triggered by Copilot on pull_request. This is an approval gate, distinct from the failed Cloudflare build; isolated reproduction passes build and typecheck, but lint fails with 18 errors and 59 warnings introduced by the upgraded rule set (effect state updates, impure render calls and unused assignments). Provider failure logs require dashboard access. Keep the grouped upgrade unmerged; repair or split it before approval.

### Earlier audit snapshot (superseded where stated above)

- harleydigitalworks.com and founder-confirmed theharleygroup.org return HTTP 200 through Cloudflare. Anonymous /admin/headquarters responds, but exact deployed Worker revision and genuine owner acceptance remain unverified. The .com Group address was incorrect and is not a site defect.
- Main quality/security pass; Cloudflare Workers Build 4d896e90-47eb-458a-8e3a-c5402514962f passes at baseline. GitHub deployment run 37991289115 passed but actual deploy step skipped. Reconcile the separate provider publishing route before adding credentials or changing workflows.
- main is unprotected. Rulesets API reports private-repository feature requires Pro or making repository public. Preserve privacy; no paid plan change. Proposed policy: PR plus one approval, required TypeScript Check, Lint & Format, Build & Test Suite, Dependency Audit, Secret & Credential Scan; disable force pushes/deletion. Confirm eligibility and check names before saving; avoid requiring a post-merge deployment check before merge.
- THG Agency worzpzbutngugwzhlvtj ACTIVE_HEALTHY, direct metadata/SELECT works despite list-projects omission. Inactive TRF Connect Prod is a separate project.
- Auth leaked-password protection disabled: proposed enable after eligibility and owner sign-in impact review. No Auth settings/backup tools exposed. H07 still needs latest backup, retention, named recovery owner and isolated restore evidence. Preserve existing owner session.
- Security INFO: lead_submission_attempts has RLS and no policies; can be intentional service-only access. Do not add public access to clear it. Performance: 35 RLS initplan, 15 multiple-policy warnings, 5 unindexed FKs; optimize in staging without changing authorization.
- Slack workspace T0BFQS2G2HZ has three visible channels. Digest dated 11 October 09:02 BST exists. Database aggregates: two accepted notification jobs, no pending/failed statuses; three new leads. Two leads match recorded 7 October acceptance tests; third unclassified. No outreach/status changes.
- Dispatcher uses default-webhook fallback for nine logical destinations; this does not prove nine real channels. Runtime commands/buttons remain untested. Capacity reconciled: Robbie confirmed three concurrent builds on 11 October. Business definition and commercial concurrency terms updated; code already uses three. Monthly intake wording is a separate limit and unchanged.
- Digest currently ignores returned database errors and claims edge HTTP health without a request. Proposed fix routes failed metrics queries into warning fallback and explicitly says live site health is unchecked. No invented live health test.
- Six PRs open: #8 historical CI repair, #16 checkout, #17 wrangler-action, #18 setup-node, #19 production dependencies, #21 dev dependencies. #21 head eb04203 has action_required Actions runs and failed Workers Build e753392d-b32d-4a8f-b383-bf96e045df0f; provider logs needed for cause. No reruns or major upgrades.

## Asset classification

| Asset                                           | Role / evidence limit                                                             |
| ----------------------------------------------- | --------------------------------------------------------------------------------- |
| harley-digital-works                            | Current agency/Group hub; Cloudflare configuration                                |
| kindred-spark                                   | Isolated Lovable client trade template per agency instructions                    |
| thgdigital                                      | Related older agency code; Vercel README is not deployment proof                  |
| thg-digital-agency                              | Archived; preserve                                                                |
| service-delivery-os                             | Candidate internal asset; generic Sites starter README does not prove acceptance  |
| vibe-coding-platform / vibe-coding-platform-thg | Separate Vercel prototype; production initial commit from 14 April, newer preview |
| TRF Connect Prod                                | Separate inactive backend                                                         |

## Prioritized next actions

Local validation: locked npm install (scripts disabled) reports zero vulnerabilities; build, typecheck, formatting and full tests pass (137 checks including one new regression); lint zero errors/nine existing warnings. No production credentials used. Application release gate RED for missing exact live-revision and interactive acceptance, not a demonstrated site outage. No browser visual/accessibility or interactive live action acceptance performed.

1. Review digest fix; approve release separately. Confirm live Worker version/publish route and owner Headquarters access.
2. Confirm GitHub protection eligibility, then apply proposed policy; preserve private repository.
3. Review eligible Auth password protection and provide H07 backup/restore evidence; stage performance changes.
4. Pilot concurrency is confirmed at three. Single-channel fallback confirmed for #all-the-harley-group; documentation reconciled; classify remaining lead before contact.
5. Inspect #21 provider failure and assess historical #8 against current main; preserve legacy assets pending retirement decisions.
