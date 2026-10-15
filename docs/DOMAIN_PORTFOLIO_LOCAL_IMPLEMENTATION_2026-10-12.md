# Domain Portfolio — local implementation

Authorised: reconciliation and local inventory, imports and renewal alerts. Production imports and deployment remain prohibited.

## State and evidence

Isolated clone of the HDW application at `8e6b818a6b398b032bde933074086138a5994ec4`, branch `codex/domain-portfolio-local`. Original checkout and unrelated uncommitted commercial work remain untouched. Changes are local and uncommitted: no push, deployment, production database migration/import, renewal action or external notification.

The supplied 12 October BIFF XLS contains 53 unique ACTIVE domains. All 53 matched database names in the preceding read-only audit. Against the 45-row 10 October reference register: 34 overlap, 19 export-only, 11 reference-only. Absence does not establish that a domain is no longer owned. The separately created register from earlier today could not be retrieved; this evidence gap remains explicit. The Group Portfolio Register is a company register, not a domain inventory.

26 expiries fall within 90 days of 12 October. Earliest: `buydronesupplies.co.uk`, 17 October (five days). Next: `holisticbeautykeynsham.co.uk`, 21 November; `douladeliveryhobart.com`, 24 November. The export contains neither renewal prices nor auto-renew settings, so both remain unknown. Historical invoice charges are not future renewal quotes or proof of payment.

Ignored `local-evidence/reconciliation.md` and `.json` contain names, dates and discrepancy lists without contract numbers or DNS targets. The original export is not copied into Git/public assets. Reproduce:

```powershell
node --experimental-strip-types scripts/reconcile-domain-export.mjs <export.xls> <reference.csv> local-evidence 2026-10-12
```

## Local functionality

- Searchable inventory with registrar/contract/status, expiry and observation dates, confirmed/unknown auto-renew, expected annual GBP cost, purpose and private notes. New rows default to review; no inferred sale status or valuation.
- IONOS CSV/XLS/XLSX imports in a worker with size/row limits, formula rejection, IDN normalisation, both Excel date systems and unambiguous ISO text dates. All rows preview before saving. Invalid/duplicate/older/conflicting observations block the entire import. Missing domains and manually entered details are preserved. File-content/date identity prevents duplicate local batches.
- Browser working-copy persistence, stale-tab revision checks, explicit storage errors, import history and downloadable private JSON backup. This is not shared database storage; browser cleanup can remove it. Backup restoration is future work.
- Overdue and 7/30/60/90-day renewal queue. Acknowledgements bind domain, expiry and urgency window; changed expiry or closer window resurfaces the decision. No renewal/drop actions or outgoing email/Slack.
- Existing branding, primitives, authentication shell, public catalogue/enquiries, finance and legacy Domain OS redirect preserved. New navigation/routes are development-only. `/domain-portfolio-preview` permits loopback local storage only; it grants no access to the admin/provider database. Production builds return not-found for both new routes.

Local preview: `http://127.0.0.1:4317/domain-portfolio-preview`. Existing authenticated development route: `/admin/domain-portfolio`.

## Database implementation, unapplied

Migration `20261012140000_domain_portfolio_inventory.sql` creates three private tables (inventory/imports/acknowledgements), narrow grants, admin RLS, expiry index and a transactional invoker import RPC. Imports serialize and roll back on failure; existing public listings/enquiries are untouched. No service key or provider database adapter is connected to the new module.

| Actor                   | Read                      | Import/update         | Acknowledge       |
| ----------------------- | ------------------------- | --------------------- | ----------------- |
| Anonymous               | Denied                    | Denied                | Denied            |
| Signed-in non-admin     | Denied by RLS             | Denied by role/RLS    | Denied by RLS     |
| Existing verified admin | Allowed after migration   | Atomic import allowed | Allowed           |
| Local preview           | Its own browser copy only | Its own copy only     | Its own copy only |

Ephemeral PostgreSQL tests prove simulated grants, RLS and rollback. They do not prove real Supabase Auth/PostgREST or deployed concurrency.

## Validation and release prerequisites

Completed checks: production build; typecheck; repository lint; formatting; diff whitespace; 66 platform checks, 67 existing regression tests, three service-worker tests and seven new domain tests passed. Dependency installation reported zero known vulnerabilities. Browser verification used the actual supplied XLS, 53 saved rows/26 alerts after refresh, editing with test notes restored, acknowledgement/reopen and a 390px mobile viewport with no page-wide overflow. Signed-out access to the new admin route redirected to the existing auth page, which correctly reports missing local configuration; no production credentials were copied. Build/test logs are local-only under `local-evidence/`.

Actual XLS browser preview/import, 53 persisted records after refresh, detail editing, alert acknowledgement/reopen and mobile layout were verified. Automated tests cover parser/date/duplicate/formula/conflict preservation, renewal boundaries and private-schema transactions. Existing regressions, typecheck, lint, formatting and build are recorded in completion evidence.

Official SheetJS 0.20.3 is used instead of the stale npm XLS package. TanStack Start 1.168.60/server-core 1.169.39 fixes the previously identified advisory; the root error boundary now accepts unknown errors for compatible patched router types. Existing safe fallback is retained. 21st remote inspiration returned 401; installed primitives/design tokens were reused with no additional design package or paid generation.

Next stages require separate approval:

1. Reconcile today's exact register and verify ownership/purpose, auto-renew and future costs, particularly the 17 October expiry.
2. Apply the migration to an isolated staging Supabase target, regenerate types and connect a user-authenticated database adapter. Test real anonymous/non-admin/admin Auth/Data API and concurrent imports. Browser working-copy persistence is not the production layer.
3. Add explicit conflict-resolution and backup-restore UX and test cross-tab races/retention before shared use.
4. Connect approved notification delivery to the existing infrastructure with durable retries and expiry/window idempotency. No scheduler or external reminders are enabled here.
5. Regression/backup rehearsal and separate production migration, import and deployment approval.

Financial reporting, valuations, marketplace publication and sales-pipeline expansion remain later stages. Do not treat a green build as production acceptance.
