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
