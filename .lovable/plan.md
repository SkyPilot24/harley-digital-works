## Goal
Verify that `/admin` (and its child routes) are gated so only users with the `admin` role can access them, and that non-admin authenticated users are denied (403 / access denied), while unauthenticated users are redirected to `/auth`.

## Approach

### 1. Static review of the auth gate
- Read `src/routes/_authenticated/route.tsx` to confirm the auth redirect for signed-out users.
- Read `src/routes/_authenticated/admin.tsx` (or the admin layout) and confirm it performs an admin role check via `has_role` / `user_roles` lookup and renders a 403 / "Access denied" state for non-admins.
- Read the admin server functions in `src/lib/admin-*.functions.ts` and confirm each one uses `requireSupabaseAuth` middleware plus an admin role check (defense in depth, so the API can't be called by a non-admin even if the UI is bypassed).

### 2. Runtime verification via Playwright
Run three scripts against `http://localhost:8080/admin`:

1. **Unauthenticated** — no session restored. Expect redirect to `/auth`. Screenshot.
2. **Non-admin user** — sign in (or seed) a throwaway user with no `user_roles` row, restore its session, hit `/admin`. Expect an "Access denied" / 403 state, not the admin dashboard. Screenshot + DOM assertion.
3. **Admin user** — restore the injected Supabase session (current user is admin). Hit `/admin`. Expect the dashboard to render. Screenshot.

Also directly call one admin server function (e.g. `getAuthUserTriggers`) as the non-admin user to confirm it rejects with an error, proving the server-side check works independently of the UI.

### 3. Report
Summarise findings with:
- Which layer(s) enforce the check (route guard, component, server function).
- Screenshot evidence for each of the 3 cases.
- Any gaps found (e.g. a server function missing the admin check) and a recommended fix.

## Notes
- No code changes are planned. This is a verification task. If a gap is found, I will surface it and propose a follow-up fix rather than editing in this pass.
- Creating a temporary non-admin test user requires either an existing test account or seeding one via `supabaseAdmin`. If no test account exists, I'll ask before creating one.

## Question before I start
Do you have a non-admin test account I should use, or should I create a temporary one (e.g. `nonadmin-test@example.com`) via the admin API for the duration of the check and delete it after?
