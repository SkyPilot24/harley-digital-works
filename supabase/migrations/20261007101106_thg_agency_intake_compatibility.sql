-- Forward compatibility for the independently inspected THG Agency backend.
-- Preserve existing records and role assignments; do not replay historical schema.
BEGIN;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS message text NOT NULL DEFAULT '';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE public.leads ALTER COLUMN package DROP NOT NULL;
ALTER TABLE public.leads ALTER COLUMN source DROP NOT NULL;
ALTER TABLE public.leads ALTER COLUMN source SET DEFAULT 'contact_form';
ALTER TABLE public.leads ALTER COLUMN status SET DEFAULT 'new';

DROP POLICY IF EXISTS public_insert_leads ON public.leads;
DROP POLICY IF EXISTS admin_all_leads ON public.leads;
-- Several legacy policies named admin_all_* actually allowed every signed-in user.
-- Narrow those staff-only policies, keeping distinct public catalogue policies.
DO $$
DECLARE policy record;
BEGIN
  FOR policy IN SELECT tablename,policyname FROM pg_policies
    WHERE schemaname='public' AND policyname LIKE 'admin\_all\_%' ESCAPE '\'
  LOOP
    EXECUTE format('ALTER POLICY %I ON public.%I TO authenticated USING (app_private.has_role(auth.uid(), ''admin''::public.app_role)) WITH CHECK (app_private.has_role(auth.uid(), ''admin''::public.app_role))',policy.policyname,policy.tablename);
  END LOOP;
END;
$$;
GRANT SELECT,INSERT,UPDATE,DELETE ON public.leads,public.user_roles TO service_role;
REVOKE ALL ON FUNCTION public.get_auth_user_triggers() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.get_auth_user_triggers() TO service_role;
COMMIT;
