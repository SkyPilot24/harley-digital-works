-- Forward-only hardening. Existing users, roles and lead records are preserved.
-- Deploy only after verifying the intended backend and server intake credentials.
BEGIN;

DROP TRIGGER IF EXISTS on_auth_user_created_bootstrap ON auth.users;
-- No CASCADE: unexpected dependencies must stop this migration for review.
DROP FUNCTION IF EXISTS public.handle_new_user_bootstrap();

-- Public enquiries must use the validated, rate-limited server action.
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
-- Provider defaults may include TRUNCATE, REFERENCES and TRIGGER, which RLS
-- does not constrain. Retain only the operations used by authorised staff.
REVOKE ALL ON public.leads FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO service_role;
REVOKE ALL ON public.user_roles FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
DROP POLICY IF EXISTS "Admins insert leads" ON public.leads;
CREATE POLICY "Admins insert leads" ON public.leads FOR INSERT TO authenticated
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

COMMIT;
