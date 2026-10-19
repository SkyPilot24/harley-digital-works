-- H07 B1 REVIEW ONLY: do not execute without distinct production metadata approval.
-- Target must be the canonical production project verified from governing records.
-- No user-table rows, function bodies, policy expressions, credentials or secrets.
-- Every bounded list includes a total so truncation cannot silently pass.
BEGIN READ ONLY;
SET LOCAL statement_timeout = '5s';
SET LOCAL lock_timeout = '2s';

SELECT current_database() AS database_name,
       current_setting('server_version') AS server_version,
       current_setting('server_version_num') AS server_version_num,
       pg_database_size(current_database()) AS database_bytes;

SELECT nspname AS schema_name, count(*) OVER () AS total_schemas
FROM pg_catalog.pg_namespace
WHERE nspname NOT LIKE 'pg_%' AND nspname <> 'information_schema'
ORDER BY nspname LIMIT 200;

SELECT extname, extversion, count(*) OVER () AS total_extensions
FROM pg_catalog.pg_extension ORDER BY extname LIMIT 200;

SELECT n.nspname AS schema_name, c.relname AS relation_name, c.relkind,
       c.relpersistence, c.relrowsecurity, c.relforcerowsecurity,
       pg_catalog.pg_get_userbyid(c.relowner) AS owner_role,
       c.reltuples AS estimated_rows,
       count(*) OVER () AS total_relations
FROM pg_catalog.pg_class c
JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname NOT LIKE 'pg_%' AND n.nspname <> 'information_schema'
  AND c.relkind IN ('r', 'p', 'S', 'v', 'm', 'f')
ORDER BY n.nspname, c.relname LIMIT 1000;

SELECT n.nspname AS schema_name, c.relname AS table_name,
       a.attname AS column_name,
       pg_catalog.format_type(a.atttypid, a.atttypmod) AS data_type,
       a.attnotnull,
       count(*) OVER () AS total_columns
FROM pg_catalog.pg_attribute a
JOIN pg_catalog.pg_class c ON c.oid = a.attrelid
JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname NOT LIKE 'pg_%' AND n.nspname <> 'information_schema'
  AND c.relkind IN ('r', 'p') AND a.attnum > 0 AND NOT a.attisdropped
ORDER BY n.nspname, c.relname, a.attnum LIMIT 3000;

SELECT ns.nspname AS source_schema, src.relname AS source_table,
       nt.nspname AS target_schema, dst.relname AS target_table,
       con.conname, con.convalidated,
       count(*) OVER () AS total_foreign_keys
FROM pg_catalog.pg_constraint con
JOIN pg_catalog.pg_class src ON src.oid = con.conrelid
JOIN pg_catalog.pg_namespace ns ON ns.oid = src.relnamespace
JOIN pg_catalog.pg_class dst ON dst.oid = con.confrelid
JOIN pg_catalog.pg_namespace nt ON nt.oid = dst.relnamespace
WHERE con.contype = 'f'
  AND ns.nspname NOT LIKE 'pg_%' AND ns.nspname <> 'information_schema'
ORDER BY ns.nspname, src.relname, con.conname LIMIT 1000;

SELECT n.nspname AS schema_name, c.relname AS table_name,
       p.polname AS policy_name, p.polcmd, p.polpermissive,
       count(*) OVER () AS total_policies
FROM pg_catalog.pg_policy p
JOIN pg_catalog.pg_class c ON c.oid = p.polrelid
JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
ORDER BY n.nspname, c.relname, p.polname LIMIT 1000;

SELECT rolname, rolsuper, rolinherit, rolcreaterole, rolcreatedb,
       rolcanlogin, rolreplication, rolbypassrls,
       count(*) OVER () AS total_roles
FROM pg_catalog.pg_roles ORDER BY rolname LIMIT 200;

SELECT pubname, puballtables, pubinsert, pubupdate, pubdelete, pubtruncate,
       count(*) OVER () AS total_publications
FROM pg_catalog.pg_publication ORDER BY pubname LIMIT 200;

SELECT n.nspname AS schema_name, c.relname AS table_name,
       count(*) FILTER (WHERE NOT t.tgisinternal) AS user_trigger_count,
       count(*) OVER () AS total_trigger_relations
FROM pg_catalog.pg_trigger t
JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid
JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname NOT LIKE 'pg_%' AND n.nspname <> 'information_schema'
GROUP BY n.nspname, c.relname ORDER BY n.nspname, c.relname LIMIT 1000;

ROLLBACK;
