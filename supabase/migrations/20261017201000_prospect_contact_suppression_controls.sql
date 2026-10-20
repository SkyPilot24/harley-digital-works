-- H37 prospect/contact/suppression controls migration.
-- Repository migration: 20261017201000_prospect_contact_suppression_controls.sql
--
-- STATUS: UNAPPLIED. Do not apply to staging or production without the
-- separately authorised isolated-staging change and acceptance window.
--
-- Purpose:
--   Create the durable CRM records required to evidence prospect qualification,
--   contact eligibility, marketing suppression and outreach history. The only
--   send-eligibility function is service-role-only and returns a fail-closed
--   decision while appending an audit event.
--
-- Preconditions verified against staging on 2026-10-17:
--   * app_private.has_role(uuid, public.app_role) exists.
--   * prospect-control tables below do not already exist.
--
-- Operational requirements outside this migration:
--   * Call public.evaluate_outreach_eligibility immediately before every send.
--   * Do not queue or dispatch when eligible = false.
--   * Insert opt-outs/objections through a trusted server path using service_role.
--   * Regenerate src/integrations/supabase/types.ts after applying the migration.
--   * Run the acceptance cases at the end of this file in isolated staging.

BEGIN;

-- Fail early rather than merging this data model into an unexpected backend.
DO $$
BEGIN
  IF to_regprocedure('app_private.has_role(uuid,public.app_role)') IS NULL THEN
    RAISE EXCEPTION 'app_private.has_role(uuid, public.app_role) is required';
  END IF;

  IF to_regclass('public.prospects') IS NOT NULL
     OR to_regclass('public.prospect_contacts') IS NOT NULL
     OR to_regclass('public.marketing_suppressions') IS NOT NULL
     OR to_regclass('public.outreach_events') IS NOT NULL THEN
    RAISE EXCEPTION 'Prospect-control tables already exist; reconcile before applying this migration';
  END IF;
END;
$$;

-- One business-level record. Unknowns remain explicit and cannot pass the gate.
CREATE TABLE public.prospects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL CHECK (length(btrim(business_name)) BETWEEN 2 AND 160),
  website text NOT NULL CHECK (website = btrim(website) AND website ~ '^https?://'),
  website_domain text NOT NULL CHECK (
    website_domain = lower(btrim(website_domain))
    AND website_domain ~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$'
  ),
  company_number text CHECK (
    company_number IS NULL
    OR company_number = upper(btrim(company_number))
       AND company_number ~ '^[A-Z0-9]{6,8}$'
  ),
  entity_type text NOT NULL DEFAULT 'unknown' CHECK (
    entity_type IN ('corporate','sole_trader','partnership','unknown')
  ),
  entity_verification_status text NOT NULL DEFAULT 'unknown' CHECK (
    entity_verification_status IN ('unknown','pending','verified','failed')
  ),
  accreditation_verification_status text NOT NULL DEFAULT 'unknown' CHECK (
    accreditation_verification_status IN ('unknown','claimed','pending','verified','failed')
  ),
  staff_size_min smallint CHECK (staff_size_min IS NULL OR staff_size_min BETWEEN 1 AND 500),
  staff_size_max smallint CHECK (staff_size_max IS NULL OR staff_size_max BETWEEN 1 AND 500),
  staff_size_verification_status text NOT NULL DEFAULT 'unknown' CHECK (
    staff_size_verification_status IN ('unknown','pending','verified','failed')
  ),
  capacity_verification_status text NOT NULL DEFAULT 'unknown' CHECK (
    capacity_verification_status IN ('unknown','pending','verified','failed')
  ),
  qualification_status text NOT NULL DEFAULT 'discovered' CHECK (
    qualification_status IN ('discovered','qualification_hold','qualified','eligible','contacted','interested','closed','archived')
  ),
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(evidence) = 'object'),
  assessment_summary text CHECK (assessment_summary IS NULL OR length(assessment_summary) <= 5000),
  next_action text CHECK (next_action IS NULL OR length(next_action) <= 1000),
  eligibility_reviewed_at timestamptz,
  eligibility_reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (staff_size_max IS NULL OR staff_size_min IS NULL OR staff_size_max >= staff_size_min),
  CHECK (
    qualification_status <> 'eligible'
    OR (
      entity_type = 'corporate'
      AND entity_verification_status = 'verified'
      AND accreditation_verification_status = 'verified'
      AND staff_size_verification_status = 'verified'
      AND capacity_verification_status = 'verified'
      AND eligibility_reviewed_at IS NOT NULL
    )
  )
);

CREATE UNIQUE INDEX prospects_company_number_unique
  ON public.prospects (company_number)
  WHERE company_number IS NOT NULL;
CREATE INDEX prospects_qualification_status_idx
  ON public.prospects (qualification_status, updated_at DESC);
CREATE INDEX prospects_website_domain_idx
  ON public.prospects (website_domain);

-- A contact route is separate from the business and can be retired without
-- erasing its relationship to historic suppression and outreach evidence.
CREATE TABLE public.prospect_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid NOT NULL REFERENCES public.prospects(id) ON DELETE RESTRICT,
  channel text NOT NULL CHECK (channel IN ('email','sms','phone','postal','social')),
  contact_value text NOT NULL CHECK (length(btrim(contact_value)) BETWEEN 3 AND 320),
  normalised_value text NOT NULL CHECK (length(btrim(normalised_value)) BETWEEN 3 AND 320),
  contact_kind text NOT NULL DEFAULT 'unknown' CHECK (
    contact_kind IN ('generic_business','named_business_contact','unknown')
  ),
  record_status text NOT NULL DEFAULT 'unverified' CHECK (
    record_status IN ('unverified','verified','invalid','retired')
  ),
  subscriber_classification text NOT NULL DEFAULT 'unknown' CHECK (
    subscriber_classification IN ('corporate','individual','unknown')
  ),
  marketing_lawful_basis text NOT NULL DEFAULT 'not_assessed' CHECK (
    marketing_lawful_basis IN ('not_assessed','legitimate_interests','consent','soft_opt_in','not_applicable')
  ),
  privacy_notice_version text,
  source_url text CHECK (source_url IS NULL OR source_url ~ '^https?://'),
  verified_at timestamptz,
  verified_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (normalised_value = lower(btrim(contact_value))),
  CHECK (
    channel <> 'email'
    OR normalised_value ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ),
  CHECK (
    record_status <> 'verified'
    OR (verified_at IS NOT NULL AND subscriber_classification <> 'unknown')
  ),
  CHECK (
    contact_kind <> 'named_business_contact'
    OR marketing_lawful_basis <> 'legitimate_interests'
    OR nullif(btrim(coalesce(privacy_notice_version, '')), '') IS NOT NULL
  ),
  UNIQUE (prospect_id, channel, normalised_value)
);

CREATE INDEX prospect_contacts_prospect_status_idx
  ON public.prospect_contacts (prospect_id, channel, record_status);
CREATE INDEX prospect_contacts_email_normalised_idx
  ON public.prospect_contacts (normalised_value)
  WHERE channel = 'email';

-- Suppressions are deliberately not deletable by authenticated users. The
-- minimal matching key allows future list screening without retaining a full
-- message body or unrelated personal data.
CREATE TABLE public.marketing_suppressions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid NOT NULL REFERENCES public.prospects(id) ON DELETE RESTRICT,
  contact_id uuid REFERENCES public.prospect_contacts(id) ON DELETE RESTRICT,
  scope text NOT NULL CHECK (scope IN ('prospect','contact','domain','company')),
  channel text NOT NULL DEFAULT 'all' CHECK (channel IN ('all','email','sms','phone','postal','social')),
  suppression_key text NOT NULL CHECK (
    suppression_key = lower(btrim(suppression_key))
    AND suppression_key ~ '^(email|domain|company|prospect):.+'
    AND length(suppression_key) <= 360
  ),
  reason_code text NOT NULL CONSTRAINT marketing_suppressions_reason_code_check CHECK (
    reason_code IN ('opt_out','objection','unsubscribe','withdrawn_consent','hard_bounce','complaint','manual_hold','legal_hold')
  ),
  evidence_reference text CHECK (evidence_reference IS NULL OR length(evidence_reference) <= 1000),
  active boolean NOT NULL DEFAULT true,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  recorded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  CHECK (
    (scope = 'contact' AND contact_id IS NOT NULL)
    OR (scope IN ('prospect','domain','company') AND contact_id IS NULL)
  )
);

CREATE UNIQUE INDEX marketing_suppressions_active_key_unique
  ON public.marketing_suppressions (scope, channel, suppression_key)
  WHERE active;
CREATE INDEX marketing_suppressions_active_prospect_idx
  ON public.marketing_suppressions (prospect_id, channel)
  WHERE active;
CREATE INDEX marketing_suppressions_active_contact_idx
  ON public.marketing_suppressions (contact_id, channel)
  WHERE active AND contact_id IS NOT NULL;

-- Append-only operational history. No message body or sender credential belongs
-- here; use a provider receipt/reference in evidence_ref where appropriate.
CREATE TABLE public.outreach_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id uuid NOT NULL REFERENCES public.prospects(id) ON DELETE RESTRICT,
  contact_id uuid REFERENCES public.prospect_contacts(id) ON DELETE RESTRICT,
  event_type text NOT NULL CONSTRAINT outreach_events_event_type_check CHECK (
    event_type IN (
      'discovered','qualified','eligibility_checked','send_queued','sent',
      'delivered','delivery_failed','reply_received','suppression_recorded',
      'hold_placed','manual_note'
    )
  ),
  channel text CHECK (channel IS NULL OR channel IN ('email','sms','phone','postal','social')),
  decision text CHECK (decision IS NULL OR decision IN ('allowed','blocked')),
  reason_code text,
  policy_version text,
  idempotency_key uuid,
  evidence_ref text CHECK (evidence_ref IS NULL OR length(evidence_ref) <= 1000),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata) = 'object'),
  actor_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  CHECK (
    (event_type = 'eligibility_checked'
      AND decision IS NOT NULL
      AND nullif(btrim(coalesce(policy_version, '')), '') IS NOT NULL
      AND idempotency_key IS NOT NULL)
    OR (event_type <> 'eligibility_checked' AND decision IS NULL)
  )
);

CREATE UNIQUE INDEX outreach_events_idempotency_key_unique
  ON public.outreach_events (idempotency_key)
  WHERE idempotency_key IS NOT NULL;
CREATE INDEX outreach_events_prospect_timeline_idx
  ON public.outreach_events (prospect_id, occurred_at DESC);
CREATE INDEX outreach_events_contact_timeline_idx
  ON public.outreach_events (contact_id, occurred_at DESC)
  WHERE contact_id IS NOT NULL;

-- Reuse neither public inputs nor a SECURITY DEFINER helper for the update
-- timestamp. This private trigger function is callable only by trusted roles.
CREATE FUNCTION app_private.touch_prospecting_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at := pg_catalog.now();
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION app_private.touch_prospecting_updated_at() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION app_private.touch_prospecting_updated_at() TO authenticated, service_role;

CREATE TRIGGER prospects_touch_updated_at
  BEFORE UPDATE ON public.prospects
  FOR EACH ROW EXECUTE FUNCTION app_private.touch_prospecting_updated_at();
CREATE TRIGGER prospect_contacts_touch_updated_at
  BEFORE UPDATE ON public.prospect_contacts
  FOR EACH ROW EXECUTE FUNCTION app_private.touch_prospecting_updated_at();

-- Recording a suppression and its audit evidence must be atomic. The event
-- intentionally excludes the matching key to minimise repeated identifier data.
CREATE FUNCTION app_private.append_suppression_audit_event()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.outreach_events (
    prospect_id,
    contact_id,
    event_type,
    channel,
    reason_code,
    evidence_ref,
    metadata,
    actor_user_id
  ) VALUES (
    NEW.prospect_id,
    NEW.contact_id,
    'suppression_recorded',
    CASE WHEN NEW.channel = 'all' THEN NULL ELSE NEW.channel END,
    NEW.reason_code,
    NEW.evidence_reference,
    pg_catalog.jsonb_build_object(
      'scope', NEW.scope,
      'suppression_channel', NEW.channel,
      'active', NEW.active
    ),
    NEW.recorded_by
  );
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION app_private.append_suppression_audit_event() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION app_private.append_suppression_audit_event() TO service_role;

CREATE TRIGGER marketing_suppressions_append_audit_event
  AFTER INSERT ON public.marketing_suppressions
  FOR EACH ROW EXECUTE FUNCTION app_private.append_suppression_audit_event();

ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospect_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_suppressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_events ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.prospects, public.prospect_contacts,
  public.marketing_suppressions, public.outreach_events
  FROM PUBLIC, anon, authenticated;

-- Admins may curate prospect and contact facts, but cannot directly create,
-- deactivate or delete suppression/audit records from the browser.
GRANT SELECT, INSERT, UPDATE ON public.prospects, public.prospect_contacts TO authenticated;
GRANT SELECT ON public.marketing_suppressions, public.outreach_events TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.prospects, public.prospect_contacts,
  public.marketing_suppressions, public.outreach_events TO service_role;

CREATE POLICY prospects_admin_select ON public.prospects
  FOR SELECT TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY prospects_admin_insert ON public.prospects
  FOR INSERT TO authenticated
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY prospects_admin_update ON public.prospects
  FOR UPDATE TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY prospect_contacts_admin_select ON public.prospect_contacts
  FOR SELECT TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY prospect_contacts_admin_insert ON public.prospect_contacts
  FOR INSERT TO authenticated
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY prospect_contacts_admin_update ON public.prospect_contacts
  FOR UPDATE TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY marketing_suppressions_admin_select ON public.marketing_suppressions
  FOR SELECT TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY outreach_events_admin_select ON public.outreach_events
  FOR SELECT TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::public.app_role));

-- This function is intentionally SECURITY INVOKER and executable only by the
-- server's service-role path. It is an eligibility check, not a send action.
-- It serialises by idempotency key and records every known-prospect decision.
CREATE FUNCTION public.evaluate_outreach_eligibility(
  p_prospect_id uuid,
  p_contact_id uuid,
  p_channel text,
  p_policy_version text,
  p_idempotency_key uuid
)
RETURNS TABLE (eligible boolean, reason_code text, event_id uuid)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_prospect public.prospects%ROWTYPE;
  v_contact public.prospect_contacts%ROWTYPE;
  v_existing_event public.outreach_events%ROWTYPE;
  v_event_id uuid;
  v_contact_id_for_event uuid;
  v_eligible boolean := false;
  v_reason text;
  v_suppressed boolean := false;
BEGIN
  IF p_prospect_id IS NULL
     OR p_contact_id IS NULL
     OR p_channel IS DISTINCT FROM 'email'
     OR nullif(btrim(coalesce(p_policy_version, '')), '') IS NULL
     OR p_idempotency_key IS NULL THEN
    RAISE EXCEPTION 'Invalid outreach eligibility request' USING ERRCODE = '22023';
  END IF;

  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended('outreach-gate:' || p_idempotency_key::text, 0)
  );

  SELECT * INTO v_existing_event
  FROM public.outreach_events
  WHERE idempotency_key = p_idempotency_key
  FOR UPDATE;

  IF FOUND THEN
    IF v_existing_event.event_type <> 'eligibility_checked'
       OR v_existing_event.prospect_id <> p_prospect_id
       OR v_existing_event.contact_id IS DISTINCT FROM p_contact_id
       OR v_existing_event.channel IS DISTINCT FROM p_channel
       OR v_existing_event.policy_version IS DISTINCT FROM btrim(p_policy_version) THEN
      RAISE EXCEPTION 'Idempotency key is already bound to a different event' USING ERRCODE = '22023';
    END IF;

    RETURN QUERY SELECT
      v_existing_event.decision = 'allowed',
      v_existing_event.reason_code,
      v_existing_event.id;
    RETURN;
  END IF;

  SELECT * INTO v_prospect
  FROM public.prospects
  WHERE id = p_prospect_id
  FOR KEY SHARE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Unknown prospect' USING ERRCODE = '22023';
  END IF;

  SELECT * INTO v_contact
  FROM public.prospect_contacts
  WHERE id = p_contact_id AND prospect_id = p_prospect_id
  FOR KEY SHARE;

  IF NOT FOUND THEN
    v_reason := 'contact_not_linked';
  ELSE
    v_contact_id_for_event := v_contact.id;

    SELECT EXISTS (
      SELECT 1
      FROM public.marketing_suppressions s
      WHERE s.active
        AND s.channel IN ('all', p_channel)
        AND (
          s.prospect_id = v_prospect.id
          OR s.contact_id = v_contact.id
          OR s.suppression_key = 'email:' || v_contact.normalised_value
          OR s.suppression_key = 'domain:' || pg_catalog.split_part(v_contact.normalised_value, '@', 2)
          OR (
            v_prospect.company_number IS NOT NULL
            AND s.suppression_key = 'company:' || lower(v_prospect.company_number)
          )
        )
    ) INTO v_suppressed;

    IF v_suppressed THEN
      v_reason := 'active_suppression';
    ELSIF v_prospect.qualification_status <> 'eligible' THEN
      v_reason := 'prospect_not_eligible';
    ELSIF v_prospect.entity_type <> 'corporate'
          OR v_prospect.entity_verification_status <> 'verified' THEN
      v_reason := 'entity_not_verified_corporate';
    ELSIF v_prospect.accreditation_verification_status <> 'verified'
          OR v_prospect.staff_size_verification_status <> 'verified'
          OR v_prospect.capacity_verification_status <> 'verified'
          OR v_prospect.eligibility_reviewed_at IS NULL THEN
      v_reason := 'qualification_evidence_incomplete';
    ELSIF v_contact.channel <> 'email' OR v_contact.record_status <> 'verified' THEN
      v_reason := 'contact_not_verified_email';
    ELSIF v_contact.subscriber_classification <> 'corporate' THEN
      v_reason := 'contact_not_corporate';
    ELSIF v_contact.contact_kind = 'unknown' THEN
      v_reason := 'contact_kind_unknown';
    ELSIF v_contact.contact_kind = 'named_business_contact'
          AND (
            v_contact.marketing_lawful_basis <> 'legitimate_interests'
            OR nullif(btrim(coalesce(v_contact.privacy_notice_version, '')), '') IS NULL
          ) THEN
      v_reason := 'personal_data_basis_incomplete';
    ELSIF v_contact.contact_kind = 'generic_business'
          AND v_contact.marketing_lawful_basis NOT IN ('legitimate_interests','not_applicable') THEN
      v_reason := 'contact_basis_incomplete';
    ELSE
      v_eligible := true;
      v_reason := 'eligible';
    END IF;
  END IF;

  INSERT INTO public.outreach_events (
    prospect_id,
    contact_id,
    event_type,
    channel,
    decision,
    reason_code,
    policy_version,
    idempotency_key,
    metadata,
    actor_user_id
  ) VALUES (
    v_prospect.id,
    v_contact_id_for_event,
    'eligibility_checked',
    p_channel,
    CASE WHEN v_eligible THEN 'allowed' ELSE 'blocked' END,
    v_reason,
    btrim(p_policy_version),
    p_idempotency_key,
    pg_catalog.jsonb_build_object('gate', 'evaluate_outreach_eligibility'),
    auth.uid()
  ) RETURNING id INTO v_event_id;

  RETURN QUERY SELECT v_eligible, v_reason, v_event_id;
END;
$$;

REVOKE ALL ON FUNCTION public.evaluate_outreach_eligibility(uuid,uuid,text,text,uuid)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.evaluate_outreach_eligibility(uuid,uuid,text,text,uuid)
  TO service_role;

NOTIFY pgrst, 'reload schema';

COMMIT;

-- Required isolated staging acceptance cases before any production migration:
-- 1. Anonymous and ordinary authenticated users cannot read or mutate any new table.
-- 2. An admin can read all four tables and manage only prospects/contacts.
-- 3. A service-role call blocks a prospect with any active prospect/contact/email/domain/company suppression.
-- 4. A service-role call blocks a sole trader, unknown entity, unverified contact,
--    missing accreditation/staff/capacity evidence, or incomplete named-contact basis.
-- 5. A fully verified corporate prospect with a verified eligible email contact is allowed.
-- 6. The same idempotency key returns the original decision and creates no second event.
-- 7. Reusing an idempotency key with a different prospect/contact is rejected.
-- 8. A normal app dispatch path cannot queue/send without a successful gate result.
--
-- Not included by design:
-- * An automated sender, scheduled follow-ups, external inbox integration or a production apply.
-- * Automatic expiry/deletion of objections or opt-outs.
-- * Any raw recipient data, seed prospect or historic outreach backfill.
