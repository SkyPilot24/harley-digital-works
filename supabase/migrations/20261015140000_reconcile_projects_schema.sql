-- Reconcile the legacy live `projects` table (client_name/package/deadline/progress/value)
-- with the schema the admin dashboard expects (client_id, name, summary, status enum, ...).
-- Verified before writing: live projects had 0 rows. The legacy table is renamed, never dropped.
-- Idempotent: does nothing once projects.client_id exists. Aborts if legacy rows exist.
DO $$
DECLARE
  legacy_rows bigint;
  role_fn text;
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'client_id'
  ) THEN
    RAISE NOTICE 'projects.client_id already exists; nothing to do';
    RETURN;
  END IF;

  IF to_regclass('public.projects') IS NOT NULL THEN
    EXECUTE 'SELECT count(*) FROM public.projects' INTO legacy_rows;
    IF legacy_rows > 0 THEN
      RAISE EXCEPTION 'Legacy projects table has % rows; map them manually before reconciling', legacy_rows;
    END IF;
  END IF;

  IF to_regclass('public.clients') IS NULL THEN
    RAISE EXCEPTION 'public.clients is required';
  END IF;

  IF to_regprocedure('app_private.has_role(uuid,public.app_role)') IS NOT NULL THEN
    role_fn := 'app_private.has_role';
  ELSIF to_regprocedure('public.has_role(uuid,public.app_role)') IS NOT NULL THEN
    role_fn := 'public.has_role';
  ELSE
    RAISE EXCEPTION 'has_role(uuid, app_role) not found';
  END IF;

  IF to_regclass('public.projects') IS NOT NULL THEN
    ALTER TABLE public.projects RENAME TO projects_legacy;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_status' AND typnamespace = 'public'::regnamespace) THEN
    CREATE TYPE public.project_status AS ENUM ('discovery','in_progress','review','launched','on_hold','archived');
  END IF;

  CREATE TABLE public.projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
    name text NOT NULL,
    summary text,
    status public.project_status NOT NULL DEFAULT 'discovery',
    budget_cents integer DEFAULT 0,
    start_date date,
    target_date date,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  );

  GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
  GRANT ALL ON public.projects TO service_role;
  ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

  EXECUTE format(
    'CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated
       USING (%1$s(auth.uid(), ''admin'')) WITH CHECK (%1$s(auth.uid(), ''admin''))', role_fn);

  CREATE POLICY "Clients can view their own projects" ON public.projects FOR SELECT TO authenticated
    USING (EXISTS (
      SELECT 1 FROM public.clients c
      WHERE c.id = projects.client_id AND c.contact_email IS NOT NULL
        AND lower(c.contact_email) = lower(auth.jwt() ->> 'email')));

  IF to_regprocedure('public.set_updated_at()') IS NOT NULL THEN
    CREATE TRIGGER projects_set_updated_at BEFORE UPDATE ON public.projects
      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
