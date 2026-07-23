-- Estate Sites — caching + rate limiting for the billed maps/AI endpoints.
-- Run after 0003_estate_wizard.sql.

-- Cache of /api/nearby results, keyed by normalized (lowercased) address.
create table if not exists public.nearby_cache (
  address    text primary key,
  data       jsonb not null,
  created_at timestamptz not null default now()
);

-- Fixed-window request counters for /api/* rate limiting.
create table if not exists public.api_rate_limits (
  ident        text not null,
  route        text not null,
  window_start timestamptz not null,
  count        int not null default 0,
  primary key (ident, route, window_start)
);
create index if not exists api_rate_limits_window_idx on public.api_rate_limits (window_start);

-- Both tables are touched only by the service-role API routes. Enable RLS with
-- no policies so the anon key cannot read/write them; the service role bypasses.
alter table public.nearby_cache enable row level security;
alter table public.api_rate_limits enable row level security;

-- Optional housekeeping: prune old rate-limit rows (run on a schedule).
--   delete from public.api_rate_limits where window_start < now() - interval '1 day';
