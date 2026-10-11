BEGIN;
create table public.lead_submission_attempts (
  id bigint generated always as identity primary key,
  fingerprint text not null check (char_length(fingerprint) = 64),
  created_at timestamptz not null default now()
);

comment on table public.lead_submission_attempts is
  'Short-lived HMAC fingerprints used to rate-limit public lead submissions without storing raw IP addresses.';

alter table public.lead_submission_attempts enable row level security;

revoke all on table public.lead_submission_attempts from public;
revoke all on table public.lead_submission_attempts from anon;
revoke all on table public.lead_submission_attempts from authenticated;
revoke all on sequence public.lead_submission_attempts_id_seq from public;
revoke all on sequence public.lead_submission_attempts_id_seq from anon;
revoke all on sequence public.lead_submission_attempts_id_seq from authenticated;

grant select, insert, delete on table public.lead_submission_attempts to service_role;
grant usage, select on sequence public.lead_submission_attempts_id_seq to service_role;

create index lead_submission_attempts_fingerprint_created_at_idx
  on public.lead_submission_attempts (fingerprint, created_at desc);

create index lead_submission_attempts_created_at_idx
  on public.lead_submission_attempts (created_at);

comment on column public.lead_submission_attempts.fingerprint is
  'HMAC-SHA-256 of the request IP using a server-only key; never a raw network address.';

comment on column public.lead_submission_attempts.created_at is
  'Attempt timestamp; rows older than the operational retention window may be deleted.';


-- Forward compatibility for the independently inspected THG Agency backend.
-- Preserve existing records and role assignments; do not replay historical schema.

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



-- Forward-only hardening. Existing users, roles and lead records are preserved.
-- Deploy only after verifying the intended backend and server intake credentials.


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



-- Trusted server intake only. Invoker rights: no new RLS bypass.
-- Fixed lock order: fingerprint first, duplicate identity second.
CREATE FUNCTION public.submit_public_lead(
  p_fingerprint text, p_started_at bigint, p_lead jsonb
) RETURNS text LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE
  intake_time timestamptz;
  attempts integer;
  email_value text := lower(p_lead->>'email');
  message_value text := p_lead->>'message';
BEGIN
  IF p_fingerprint IS NULL OR p_fingerprint !~ '^[a-f0-9]{64}$'
     OR p_started_at IS NULL OR p_lead IS NULL
     OR coalesce(length(trim(p_lead->>'name')),0) NOT BETWEEN 1 AND 100
     OR coalesce(length(email_value),0) NOT BETWEEN 3 AND 255
     OR coalesce(length(message_value),0) NOT BETWEEN 5 AND 4000
     OR coalesce(p_lead->>'source','') NOT IN ('contact_form','group_contact_form') THEN
    RAISE EXCEPTION 'Invalid intake payload' USING ERRCODE = '22023';
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('lead-ip:' || p_fingerprint, 0));
  intake_time := pg_catalog.clock_timestamp();
  SELECT count(*) INTO attempts FROM public.lead_submission_attempts
    WHERE fingerprint = p_fingerprint AND created_at >= intake_time - interval '10 minutes';
  IF attempts >= 5 THEN RETURN 'rate_limited'; END IF;
  INSERT INTO public.lead_submission_attempts(fingerprint,created_at)
    VALUES (p_fingerprint,intake_time);
  -- Return rather than raise: rejected timing still consumes an attempt.
  IF p_started_at > extract(epoch FROM intake_time)*1000 + 60000
     OR extract(epoch FROM intake_time)*1000 - p_started_at < 1200 THEN
    RETURN 'too_fast';
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(
    'lead-duplicate:' || pg_catalog.jsonb_build_array(email_value,message_value)::text, 0));
  IF EXISTS (SELECT 1 FROM public.leads WHERE email = email_value
      AND message = message_value AND created_at >= pg_catalog.clock_timestamp() - interval '15 minutes') THEN
    RETURN 'duplicate';
  END IF;
  INSERT INTO public.leads(name,email,company,package,message,source)
    VALUES (p_lead->>'name',email_value,p_lead->>'company',p_lead->>'package',message_value,p_lead->>'source');
  RETURN 'saved';
END;
$$;
REVOKE ALL ON FUNCTION public.submit_public_lead(text,bigint,jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_public_lead(text,bigint,jsonb) TO service_role;

-- Invoke hourly from an approved scheduler; no traffic-dependent cleanup.
CREATE FUNCTION public.prune_lead_submission_attempts() RETURNS void
  LANGUAGE sql SECURITY INVOKER SET search_path = '' AS $$
    DELETE FROM public.lead_submission_attempts
    WHERE created_at < pg_catalog.now() - interval '24 hours';
  $$;
REVOKE ALL ON FUNCTION public.prune_lead_submission_attempts() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.prune_lead_submission_attempts() TO service_role;


-- Remove inherited PUBLIC execution missed by earlier role-specific revokes.
REVOKE ALL ON FUNCTION public.has_role(uuid,public.app_role) FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION app_private.has_role(uuid,public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION app_private.has_role(uuid,public.app_role) TO authenticated, service_role;
-- A provider-created event trigger is not an application RPC.
DO $$
BEGIN
  IF to_regprocedure('public.rls_auto_enable()') IS NOT NULL THEN
    EXECUTE 'REVOKE ALL ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated';
  END IF;
END;
$$;


COMMIT;
