CREATE SCHEMA IF NOT EXISTS app_private;

CREATE OR REPLACE FUNCTION app_private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

GRANT USAGE ON SCHEMA app_private TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION app_private.has_role(uuid, public.app_role) TO authenticated, service_role;

ALTER POLICY "Admins manage agency settings"
  ON public.agency_settings
  USING (app_private.has_role(auth.uid(), 'admin'))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins manage clients"
  ON public.clients
  USING (app_private.has_role(auth.uid(), 'admin'))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins manage resources"
  ON public.cms_resources
  USING (app_private.has_role(auth.uid(), 'admin'))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Anyone reads published resources"
  ON public.cms_resources
  USING (published = true OR app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins manage services"
  ON public.cms_services
  USING (app_private.has_role(auth.uid(), 'admin'))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Anyone reads published services"
  ON public.cms_services
  USING (published = true OR app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins manage testimonials"
  ON public.cms_testimonials
  USING (app_private.has_role(auth.uid(), 'admin'))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Anyone reads published testimonials"
  ON public.cms_testimonials
  USING (published = true OR app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins delete leads"
  ON public.leads
  USING (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins read leads"
  ON public.leads
  USING (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins update leads"
  ON public.leads
  USING (app_private.has_role(auth.uid(), 'admin'))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins manage projects"
  ON public.projects
  USING (app_private.has_role(auth.uid(), 'admin'))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins manage team"
  ON public.team_members
  USING (app_private.has_role(auth.uid(), 'admin'))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins manage roles"
  ON public.user_roles
  USING (app_private.has_role(auth.uid(), 'admin'))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins read all roles"
  ON public.user_roles
  USING (app_private.has_role(auth.uid(), 'admin'));

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM service_role;