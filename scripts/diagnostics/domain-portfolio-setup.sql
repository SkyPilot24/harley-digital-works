-- Read-only setup diagnosis. Run only against the explicitly selected Agency target.
-- Catalog evidence does not prove end-user Auth/Data API acceptance.
SELECT
  to_regclass('public.domain_portfolio_inventory')::text AS inventory_table,
  to_regclass('public.domain_portfolio_imports')::text AS imports_table,
  to_regclass('public.domain_portfolio_alert_acknowledgements')::text AS acknowledgements_table,
  to_regprocedure('public.import_domain_portfolio(uuid,text,date,jsonb)')::text AS import_rpc,
  to_regclass('public.domain_listings')::text AS public_listing_table,
  to_regprocedure('app_private.has_role(uuid,public.app_role)')::text AS trusted_role_function;
SELECT EXISTS (
  SELECT 1 FROM supabase_migrations.schema_migrations WHERE version = '20261012155701'
) AS portfolio_migration_recorded;
