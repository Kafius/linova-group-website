-- Estate Sites — single-property generator schema.
-- Run in Supabase SQL editor, or via `supabase db push` if using the CLI.

create extension if not exists "pgcrypto";

create table if not exists public.listings (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  agent_id      uuid references auth.users (id) on delete set null,

  -- hero / identity
  name          text not null,
  address       text not null,
  neighbourhood text,
  price         text,

  -- stats
  beds          int,
  baths         int,
  sqft          int,
  year_built    int,
  lot_text      text,

  -- story
  headline      text,
  description   text,

  -- media / data
  photos        jsonb not null default '[]'::jsonb,   -- array of URLs, [0] = hero
  pois          jsonb not null default '[]'::jsonb,   -- [{type,name,dist}]

  -- agent
  agent_name    text,
  brokerage     text,
  phone         text,

  -- state
  locked        boolean not null default true,
  custom_domain text,
  created_at    timestamptz not null default now()
);

create index if not exists listings_slug_idx on public.listings (slug);
create index if not exists listings_agent_idx on public.listings (agent_id);

-- Cache table for the /api/distances Google Maps proxy so re-renders of the
-- same (address, poi) pair don't re-bill the Distance Matrix API.
create table if not exists public.distance_cache (
  id         bigint generated always as identity primary key,
  address    text not null,
  poi_name   text not null,
  dist       text not null,
  created_at timestamptz not null default now(),
  unique (address, poi_name)
);

-- Row Level Security ---------------------------------------------------------
alter table public.listings enable row level security;

-- Anyone may read an UNLOCKED listing (the published site is public).
create policy "public reads unlocked listings"
  on public.listings for select
  using (locked = false);

-- An authenticated agent may read their own listings (locked or not) so the
-- builder/preview can show work in progress.
create policy "agents read own listings"
  on public.listings for select
  to authenticated
  using (agent_id = auth.uid());

-- All writes (insert/update, including unlock) go through server routes using
-- the service role key, which bypasses RLS. No anon/authenticated write policy
-- is granted here on purpose.
