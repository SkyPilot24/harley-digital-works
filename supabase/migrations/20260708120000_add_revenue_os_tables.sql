CREATE TABLE public.revenue_os_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  stream text NOT NULL,
  status text NOT NULL DEFAULT 'Idea',
  owner text NOT NULL DEFAULT 'Robbie',
  next_action text NOT NULL DEFAULT '',
  target_revenue numeric NOT NULL DEFAULT 0,
  mrr_potential numeric NOT NULL DEFAULT 0,
  scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.revenue_os_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage revenue os assets"
ON public.revenue_os_assets
FOR ALL
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER revenue_os_assets_set_updated_at
  BEFORE UPDATE ON public.revenue_os_assets
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.revenue_os_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Revenue OS',
  priority text NOT NULL DEFAULT 'Medium',
  due_date date,
  source_asset_id uuid REFERENCES public.revenue_os_assets(id) ON DELETE SET NULL,
  source_asset_name text NOT NULL DEFAULT '',
  done boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.revenue_os_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage revenue os tasks"
ON public.revenue_os_tasks
FOR ALL
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER revenue_os_tasks_set_updated_at
  BEFORE UPDATE ON public.revenue_os_tasks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX revenue_os_assets_priority_idx ON public.revenue_os_assets USING gin (scores);
CREATE INDEX revenue_os_tasks_done_due_date_idx ON public.revenue_os_tasks (done, due_date);
