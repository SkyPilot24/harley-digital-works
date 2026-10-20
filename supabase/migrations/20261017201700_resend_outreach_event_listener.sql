-- H37 Resend outreach event-listener migration.
-- Repository migration: 20261017201700_resend_outreach_event_listener.sql
--
-- STATUS: UNAPPLIED. Do not apply to staging or production without the
-- separately authorised isolated-staging change and acceptance window.
--
-- Prerequisite: apply the preceding 20261017201000 prospect/contact/
-- suppression migration first. Do not merge or reorder applied migrations.
--
-- This extension adds:
--   1. provider delivery identifiers to outreach_events;
--   2. atomic, service-role-only state transitions for send attempts,
--      provider acceptance and verified Resend webhook events; and
--   3. durable suppression for permanent bounces, complaints and provider-side
--      suppression events.
--
-- No raw webhook body, recipient address, subject or provider secret is stored.

BEGIN;

DO $$
BEGIN
  IF to_regclass('public.prospects') IS NULL
     OR to_regclass('public.prospect_contacts') IS NULL
     OR to_regclass('public.marketing_suppressions') IS NULL
     OR to_regclass('public.outreach_events') IS NULL THEN
    RAISE EXCEPTION 'Prospect-control tables are required before applying this extension';
  END IF;
END;
$$;

-- Provider event metadata is intentionally minimal. svix-id is retained only
-- for replay deduplication; provider_email_id links lifecycle events to the
-- accepted Resend send that already identifies prospect/contact internally.
ALTER TABLE public.outreach_events
  ADD COLUMN IF NOT EXISTS event_source text NOT NULL DEFAULT 'internal'
    CHECK (event_source IN ('internal','resend')),
  ADD COLUMN IF NOT EXISTS provider_event_id text
    CHECK (provider_event_id IS NULL OR length(provider_event_id) BETWEEN 1 AND 255),
  ADD COLUMN IF NOT EXISTS provider_email_id text
    CHECK (provider_email_id IS NULL OR length(provider_email_id) BETWEEN 1 AND 255);

-- The preceding migration names these constraints. Replace only these exact
-- constraints, preserving the independent decision/idempotency checks.
ALTER TABLE public.outreach_events
  DROP CONSTRAINT outreach_events_event_type_check;
ALTER TABLE public.outreach_events
  ADD CONSTRAINT outreach_events_event_type_check
  CHECK (event_type IN (
    'discovered','qualified','eligibility_checked','send_attempted',
    'provider_accepted','send_queued','sent','delivered','delivery_failed',
    'reply_received','suppression_recorded','hold_placed','manual_note'
  ));

-- Add an accurate reason for provider-side suppression rather than labelling it
-- as a customer opt-out or an unconfirmed hard bounce.
ALTER TABLE public.marketing_suppressions
  DROP CONSTRAINT marketing_suppressions_reason_code_check;
ALTER TABLE public.marketing_suppressions
  ADD CONSTRAINT marketing_suppressions_reason_code_check
  CHECK (reason_code IN (
    'opt_out','objection','unsubscribe','withdrawn_consent','hard_bounce',
    'complaint','provider_suppressed','manual_hold','legal_hold'
  ));

CREATE UNIQUE INDEX IF NOT EXISTS outreach_events_resend_provider_event_unique
  ON public.outreach_events (provider_event_id)
  WHERE event_source = 'resend' AND provider_event_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS outreach_events_resend_provider_acceptance_unique
  ON public.outreach_events (provider_email_id)
  WHERE event_source = 'resend'
    AND event_type = 'provider_accepted'
    AND provider_email_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS outreach_events_resend_provider_email_idx
  ON public.outreach_events (provider_email_id, occurred_at DESC)
  WHERE event_source = 'resend' AND provider_email_id IS NOT NULL;

-- Log an attempt only after a matching, allowed eligibility decision exists.
-- The stable attempt key must be persisted by the caller and reused on retry.
CREATE OR REPLACE FUNCTION public.record_outreach_email_attempt(
  p_prospect_id uuid,
  p_contact_id uuid,
  p_gate_event_id uuid,
  p_policy_version text,
  p_attempt_id uuid
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_gate public.outreach_events%ROWTYPE;
  v_contact public.prospect_contacts%ROWTYPE;
  v_existing public.outreach_events%ROWTYPE;
  v_attempt_id uuid;
BEGIN
  IF p_prospect_id IS NULL OR p_contact_id IS NULL OR p_gate_event_id IS NULL
     OR p_attempt_id IS NULL
     OR nullif(btrim(coalesce(p_policy_version, '')), '') IS NULL THEN
    RAISE EXCEPTION 'Invalid outreach attempt request' USING ERRCODE = '22023';
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('outreach-attempt:' || p_attempt_id::text, 0)
  );

  SELECT * INTO v_existing
  FROM public.outreach_events
  WHERE idempotency_key = p_attempt_id
  FOR UPDATE;

  IF FOUND THEN
    IF v_existing.event_type <> 'send_attempted'
       OR v_existing.prospect_id <> p_prospect_id
       OR v_existing.contact_id IS DISTINCT FROM p_contact_id
       OR v_existing.policy_version IS DISTINCT FROM btrim(p_policy_version) THEN
      RAISE EXCEPTION 'Attempt key is already bound to a different event' USING ERRCODE = '22023';
    END IF;
    RETURN v_existing.id;
  END IF;

  SELECT * INTO v_gate
  FROM public.outreach_events
  WHERE id = p_gate_event_id
    AND prospect_id = p_prospect_id
    AND contact_id = p_contact_id
    AND event_type = 'eligibility_checked'
    AND decision = 'allowed'
    AND policy_version = btrim(p_policy_version)
  FOR KEY SHARE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No matching allowed eligibility decision' USING ERRCODE = '22023';
  END IF;

  SELECT * INTO v_contact
  FROM public.prospect_contacts
  WHERE id = p_contact_id AND prospect_id = p_prospect_id
  FOR KEY SHARE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Contact is not linked to prospect' USING ERRCODE = '22023';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.marketing_suppressions s
    JOIN public.prospects p ON p.id = p_prospect_id
    WHERE s.active
      AND s.channel IN ('all','email')
      AND (
        s.prospect_id = p_prospect_id
        OR s.contact_id = p_contact_id
        OR s.suppression_key = 'email:' || v_contact.normalised_value
        OR s.suppression_key = 'domain:' || pg_catalog.split_part(v_contact.normalised_value, '@', 2)
        OR (p.company_number IS NOT NULL AND s.suppression_key = 'company:' || lower(p.company_number))
      )
  ) THEN
    RAISE EXCEPTION 'Active suppression blocks dispatch' USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.outreach_events (
    prospect_id, contact_id, event_type, channel, reason_code, policy_version,
    idempotency_key, metadata, event_source, actor_user_id
  ) VALUES (
    p_prospect_id, p_contact_id, 'send_attempted', 'email', 'dispatch_started',
    btrim(p_policy_version), p_attempt_id,
    pg_catalog.jsonb_build_object('gate_event_id', p_gate_event_id::text),
    'internal', auth.uid()
  ) RETURNING id INTO v_attempt_id;

  RETURN v_attempt_id;
END;
$$;

-- Record Resend API acceptance after the provider returns its email ID. If this
-- call fails, the sender must not retry the email blindly; reconcile the receipt.
CREATE OR REPLACE FUNCTION public.record_resend_outreach_acceptance(
  p_attempt_event_id uuid,
  p_provider_email_id text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_attempt public.outreach_events%ROWTYPE;
  v_existing public.outreach_events%ROWTYPE;
  v_event_id uuid;
BEGIN
  IF p_attempt_event_id IS NULL
     OR nullif(btrim(coalesce(p_provider_email_id, '')), '') IS NULL
     OR length(p_provider_email_id) > 255 THEN
    RAISE EXCEPTION 'Invalid provider acceptance receipt' USING ERRCODE = '22023';
  END IF;

  SELECT * INTO v_attempt
  FROM public.outreach_events
  WHERE id = p_attempt_event_id AND event_type = 'send_attempted'
  FOR KEY SHARE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Unknown outreach send attempt' USING ERRCODE = '22023';
  END IF;

  SELECT * INTO v_existing
  FROM public.outreach_events
  WHERE event_source = 'resend'
    AND event_type = 'provider_accepted'
    AND provider_email_id = btrim(p_provider_email_id)
  FOR UPDATE;

  IF FOUND THEN
    IF v_existing.prospect_id <> v_attempt.prospect_id
       OR v_existing.contact_id IS DISTINCT FROM v_attempt.contact_id
       OR v_existing.metadata ->> 'attempt_event_id' IS DISTINCT FROM p_attempt_event_id::text THEN
      RAISE EXCEPTION 'Provider email ID is already bound to another send attempt' USING ERRCODE = '22023';
    END IF;
    RETURN v_existing.id;
  END IF;

  INSERT INTO public.outreach_events (
    prospect_id, contact_id, event_type, channel, reason_code, policy_version,
    provider_email_id, evidence_ref, metadata, event_source, actor_user_id
  ) VALUES (
    v_attempt.prospect_id, v_attempt.contact_id, 'provider_accepted', 'email',
    'resend_api_accepted', v_attempt.policy_version, btrim(p_provider_email_id),
    'resend-email:' || btrim(p_provider_email_id),
    pg_catalog.jsonb_build_object('attempt_event_id', p_attempt_event_id::text),
    'resend', auth.uid()
  ) RETURNING id INTO v_event_id;

  RETURN v_event_id;
END;
$$;

-- Persist exactly one verified Resend lifecycle event for a delivery. A missing
-- local provider-acceptance event is ignored so unrelated transactional email
-- does not populate outreach CRM data. Complaint, permanent-bounce and provider
-- suppression events atomically add an internal no-send suppression.
CREATE OR REPLACE FUNCTION public.record_resend_outreach_webhook_event(
  p_provider_event_id text,
  p_provider_email_id text,
  p_provider_event_type text,
  p_occurred_at timestamptz
)
RETURNS text
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_acceptance public.outreach_events%ROWTYPE;
  v_existing public.outreach_events%ROWTYPE;
  v_contact public.prospect_contacts%ROWTYPE;
  v_event_type text;
  v_suppression_reason text;
BEGIN
  IF nullif(btrim(coalesce(p_provider_event_id, '')), '') IS NULL
     OR nullif(btrim(coalesce(p_provider_email_id, '')), '') IS NULL
     OR p_occurred_at IS NULL
     OR length(p_provider_event_id) > 255
     OR length(p_provider_email_id) > 255
     OR p_provider_event_type NOT IN (
       'email.sent','email.delivered','email.bounced','email.complained',
       'email.failed','email.suppressed'
     ) THEN
    RAISE EXCEPTION 'Invalid Resend outreach webhook event' USING ERRCODE = '22023';
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('resend-webhook:' || p_provider_event_id, 0)
  );

  SELECT * INTO v_existing
  FROM public.outreach_events
  WHERE event_source = 'resend'
    AND provider_event_id = btrim(p_provider_event_id)
  FOR UPDATE;

  IF FOUND THEN
    IF v_existing.provider_email_id IS DISTINCT FROM btrim(p_provider_email_id)
       OR v_existing.reason_code IS DISTINCT FROM p_provider_event_type THEN
      RAISE EXCEPTION 'Provider event ID is already bound to different data' USING ERRCODE = '22023';
    END IF;
    RETURN 'duplicate';
  END IF;

  SELECT * INTO v_acceptance
  FROM public.outreach_events
  WHERE event_source = 'resend'
    AND event_type = 'provider_accepted'
    AND provider_email_id = btrim(p_provider_email_id)
  FOR KEY SHARE;

  IF NOT FOUND THEN
    RETURN 'ignored';
  END IF;

  SELECT * INTO v_contact
  FROM public.prospect_contacts
  WHERE id = v_acceptance.contact_id
    AND prospect_id = v_acceptance.prospect_id
  FOR KEY SHARE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Provider acceptance has no linked prospect contact' USING ERRCODE = '22023';
  END IF;

  v_event_type := CASE p_provider_event_type
    WHEN 'email.sent' THEN 'sent'
    WHEN 'email.delivered' THEN 'delivered'
    ELSE 'delivery_failed'
  END;

  INSERT INTO public.outreach_events (
    prospect_id, contact_id, event_type, channel, reason_code, policy_version,
    provider_event_id, provider_email_id, evidence_ref, metadata, event_source,
    occurred_at, actor_user_id
  ) VALUES (
    v_acceptance.prospect_id, v_acceptance.contact_id, v_event_type, 'email',
    p_provider_event_type, v_acceptance.policy_version,
    btrim(p_provider_event_id), btrim(p_provider_email_id),
    'resend-event:' || btrim(p_provider_event_id),
    pg_catalog.jsonb_build_object('provider', 'resend'), 'resend',
    p_occurred_at, auth.uid()
  );

  v_suppression_reason := CASE p_provider_event_type
    WHEN 'email.bounced' THEN 'hard_bounce'
    WHEN 'email.complained' THEN 'complaint'
    WHEN 'email.suppressed' THEN 'provider_suppressed'
    ELSE NULL
  END;

  IF v_suppression_reason IS NOT NULL THEN
    INSERT INTO public.marketing_suppressions (
      prospect_id, contact_id, scope, channel, suppression_key, reason_code,
      evidence_reference, recorded_by
    ) VALUES (
      v_acceptance.prospect_id, v_contact.id, 'contact', 'email',
      'email:' || v_contact.normalised_value, v_suppression_reason,
      'resend-event:' || btrim(p_provider_event_id), auth.uid()
    ) ON CONFLICT (scope, channel, suppression_key) WHERE active DO NOTHING;
  END IF;

  RETURN 'recorded';
END;
$$;

REVOKE ALL ON FUNCTION public.record_outreach_email_attempt(uuid,uuid,uuid,text,uuid)
  FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.record_resend_outreach_acceptance(uuid,text)
  FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.record_resend_outreach_webhook_event(text,text,text,timestamptz)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_outreach_email_attempt(uuid,uuid,uuid,text,uuid)
  TO service_role;
GRANT EXECUTE ON FUNCTION public.record_resend_outreach_acceptance(uuid,text)
  TO service_role;
GRANT EXECUTE ON FUNCTION public.record_resend_outreach_webhook_event(text,text,text,timestamptz)
  TO service_role;

NOTIFY pgrst, 'reload schema';

COMMIT;

-- Required isolated staging acceptance before production:
-- * Invalid/missing Svix signature never reaches Supabase.
-- * An allowed gate decision permits one send_attempted event per stable attempt key.
-- * A repeated attempt key returns the existing attempt and does not create a second row.
-- * Provider acceptance is idempotent by Resend email ID.
-- * A repeated svix-id returns duplicate and creates no new row.
-- * Unknown provider email ID returns ignored, not an error or a CRM record.
-- * email.bounced, email.complained and email.suppressed create/retain one active suppression.
-- * A subsequent eligibility gate returns active_suppression for that contact.
-- * Ordinary authenticated and anonymous callers cannot execute any new function.
