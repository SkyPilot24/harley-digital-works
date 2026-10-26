-- Multi-Tenant AI Virtual Phone Receptionist Schema
-- Provides tenant-isolated configuration, call logs, transcripts, and usage meters.
-- Backwards-compatible and additive. Existing public routes and CRM tables remain unaffected.

BEGIN;

-- 1. Tenants Table: Defines each business's virtual receptionist switchboard
CREATE TABLE IF NOT EXISTS public.receptionist_tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  tenant_slug text NOT NULL UNIQUE CHECK (tenant_slug = lower(tenant_slug) AND length(tenant_slug) <= 100),
  business_name text NOT NULL CHECK (length(business_name) BETWEEN 2 AND 200),
  trade_type text NOT NULL DEFAULT 'general_contractor',
  assigned_did text NOT NULL DEFAULT '',
  transfer_phone text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'onboarding', 'paused', 'cancelled')),
  tier text NOT NULL DEFAULT 'pro' CHECK (tier IN ('solo', 'pro', 'fleet', 'bundle_addon')),
  monthly_call_allowance integer NOT NULL DEFAULT 150 CHECK (monthly_call_allowance >= 0),
  voice_id text NOT NULL DEFAULT 'en-GB-Neural2-B',
  greeting_text text NOT NULL,
  business_hours jsonb NOT NULL DEFAULT '{"mon_fri": "08:00-18:00", "sat": "09:00-13:00", "sun": "closed", "emergency_24_7": true}'::jsonb,
  service_areas jsonb NOT NULL DEFAULT '["Bristol", "Bath", "Gloucestershire", "Somerset"]'::jsonb,
  faq_knowledge jsonb NOT NULL DEFAULT '[]'::jsonb,
  qualification_fields jsonb NOT NULL DEFAULT '["caller_name", "caller_phone", "location", "service_scope", "urgency"]'::jsonb,
  emergency_keywords text[] NOT NULL DEFAULT ARRAY['gas leak', 'sparking', 'burning smell', 'power outage', 'burst pipe', 'flooding']::text[],
  notification_destination jsonb NOT NULL DEFAULT '{"whatsapp": "+447394041487", "email": "hello@harleydigitalworks.com"}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Call Logs Table: Persists caller details, outcomes, extracted leads, and transcripts
CREATE TABLE IF NOT EXISTS public.receptionist_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.receptionist_tenants(id) ON DELETE CASCADE,
  caller_phone text NOT NULL DEFAULT '',
  caller_name text,
  call_duration_seconds integer NOT NULL DEFAULT 0 CHECK (call_duration_seconds >= 0),
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  outcome text NOT NULL DEFAULT 'general_info' CHECK (outcome IN ('lead_captured', 'callback_requested', 'emergency_escalated', 'transferred', 'general_info', 'spam_dropped')),
  urgency text NOT NULL DEFAULT 'standard' CHECK (urgency IN ('standard', 'urgent_emergency')),
  lead_details jsonb NOT NULL DEFAULT '{}'::jsonb,
  call_summary text NOT NULL DEFAULT '',
  transcript jsonb NOT NULL DEFAULT '[]'::jsonb,
  recording_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Monthly Usage Table: Aggregates call minutes and enforces commercial allowances
CREATE TABLE IF NOT EXISTS public.receptionist_monthly_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.receptionist_tenants(id) ON DELETE CASCADE,
  billing_period text NOT NULL CHECK (billing_period ~ '^\d{4}-\d{2}$'),
  total_calls integer NOT NULL DEFAULT 0 CHECK (total_calls >= 0),
  total_duration_seconds integer NOT NULL DEFAULT 0 CHECK (total_duration_seconds >= 0),
  allowance_limit integer NOT NULL DEFAULT 150 CHECK (allowance_limit >= 0),
  overage_calls integer NOT NULL DEFAULT 0 CHECK (overage_calls >= 0),
  estimated_cost_cents integer NOT NULL DEFAULT 0 CHECK (estimated_cost_cents >= 0),
  status text NOT NULL DEFAULT 'within_limit' CHECK (status IN ('within_limit', 'approaching_cap', 'exceeded')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, billing_period)
);

-- Indexes for performant filtering by tenant, date, and urgency
CREATE INDEX IF NOT EXISTS idx_receptionist_calls_tenant_id ON public.receptionist_calls(tenant_id);
CREATE INDEX IF NOT EXISTS idx_receptionist_calls_created_at ON public.receptionist_calls(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_receptionist_calls_urgency ON public.receptionist_calls(urgency) WHERE urgency = 'urgent_emergency';
CREATE INDEX IF NOT EXISTS idx_receptionist_tenants_did ON public.receptionist_tenants(assigned_did);

-- Enable Row-Level Security
ALTER TABLE public.receptionist_tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receptionist_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receptionist_monthly_usage ENABLE ROW LEVEL SECURITY;

-- Revoke default public access
REVOKE ALL ON public.receptionist_tenants, public.receptionist_calls, public.receptionist_monthly_usage FROM PUBLIC, anon;

-- Grant administrative and authenticated access
GRANT SELECT, INSERT, UPDATE, DELETE ON public.receptionist_tenants TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.receptionist_calls TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.receptionist_monthly_usage TO authenticated;

-- Policies: Admins have full access across all tenants and calls
CREATE POLICY receptionist_tenants_admin ON public.receptionist_tenants
  FOR ALL TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY receptionist_calls_admin ON public.receptionist_calls
  FOR ALL TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY receptionist_usage_admin ON public.receptionist_monthly_usage
  FOR ALL TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

-- Seed HDW Primary Agency Tenant (Protected Baseline)
INSERT INTO public.receptionist_tenants (
  id,
  tenant_slug,
  business_name,
  trade_type,
  assigned_did,
  transfer_phone,
  status,
  tier,
  monthly_call_allowance,
  voice_id,
  greeting_text,
  business_hours,
  service_areas,
  faq_knowledge,
  qualification_fields,
  emergency_keywords,
  notification_destination
) VALUES (
  '00000000-0000-4000-8000-000000000001',
  'hdw-primary',
  'Harley Digital Works',
  'digital_agency',
  '+447394041487',
  '+447394041487',
  'active',
  'fleet',
  1000,
  'en-GB-Neural2-B',
  'Thank you for calling Harley Digital Works. I am your 24/7 virtual receptionist. Are you calling to enquire about a new bespoke website for your trade business?',
  '{"mon_fri": "08:00-18:00", "sat": "09:00-14:00", "emergency_24_7": true}'::jsonb,
  '["Bristol", "Bath", "Gloucester", "Cheltenham", "South West UK"]'::jsonb,
  '[
    {"question": "How much does a trade website cost?", "answer": "Our signature managed website package is a fixed £1,495 setup plus £249/month ongoing care, with 50% deposit (£747.50) on agreement and 50% on preview approval."},
    {"question": "Do I have to write copy or do homework?", "answer": "Zero homework and zero tech jargon. We provide 100% done-for-you professional trade copywriting."},
    {"question": "What is the 24/7 AI Receptionist?", "answer": "When we build your website, we can install this exact British voice receptionist on your business number to answer calls while you are working."}
  ]'::jsonb,
  '["caller_name", "trade_specialism", "van_count", "location", "contact_phone"]'::jsonb,
  ARRAY['emergency', 'urgent', 'sparks', 'gas leak', 'smoke']::text[],
  '{"whatsapp": "+447394041487", "email": "hello@harleydigitalworks.com"}'::jsonb
) ON CONFLICT (tenant_slug) DO NOTHING;

COMMIT;
