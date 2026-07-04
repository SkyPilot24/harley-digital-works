CREATE OR REPLACE FUNCTION public.get_auth_user_triggers()
RETURNS TABLE (
  trigger_name text,
  function_name text,
  enabled boolean,
  timing text,
  event text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
  SELECT
    t.tgname::text AS trigger_name,
    (n.nspname || '.' || p.proname)::text AS function_name,
    (t.tgenabled <> 'D') AS enabled,
    CASE
      WHEN (t.tgtype & 2) <> 0 THEN 'BEFORE'
      WHEN (t.tgtype & 64) <> 0 THEN 'INSTEAD OF'
      ELSE 'AFTER'
    END AS timing,
    CASE
      WHEN (t.tgtype & 4) <> 0 THEN 'INSERT'
      WHEN (t.tgtype & 8) <> 0 THEN 'DELETE'
      WHEN (t.tgtype & 16) <> 0 THEN 'UPDATE'
      WHEN (t.tgtype & 32) <> 0 THEN 'TRUNCATE'
      ELSE 'OTHER'
    END AS event
  FROM pg_trigger t
  JOIN pg_class c ON c.oid = t.tgrelid
  JOIN pg_namespace ns ON ns.oid = c.relnamespace
  JOIN pg_proc p ON p.oid = t.tgfoid
  JOIN pg_namespace n ON n.oid = p.pronamespace
  WHERE ns.nspname = 'auth'
    AND c.relname = 'users'
    AND NOT t.tgisinternal
  ORDER BY t.tgname;
$$;

REVOKE ALL ON FUNCTION public.get_auth_user_triggers() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_auth_user_triggers() TO authenticated, service_role;