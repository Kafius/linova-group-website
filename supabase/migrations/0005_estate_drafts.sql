-- Estate Sites — agent accounts (Supabase Auth) + server-side drafts.
-- Run after 0004_estate_caching.sql.
--
-- Auth itself is built in (Supabase → Authentication). Enable the Email
-- provider (magic link) and add the site + preview URLs to the redirect
-- allowlist so the sign-in link returns to /estate-sites/new.

-- One in-progress draft per agent (the wizard autosaves here when signed in).
create table if not exists public.estate_drafts (
  agent_id   uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.estate_drafts enable row level security;

-- An agent may read/write only their own draft (enforced against the JWT).
create policy "agents manage own draft"
  on public.estate_drafts for all
  to authenticated
  using (agent_id = auth.uid())
  with check (agent_id = auth.uid());
