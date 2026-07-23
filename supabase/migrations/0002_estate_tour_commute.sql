-- Estate Sites — add the scroll-tour rooms and GTA commute/access data.
-- Run after 0001_estate_listings.sql.

alter table public.listings
  add column if not exists rooms   jsonb not null default '[]'::jsonb,  -- [{photo,name,caption}]
  add column if not exists commute jsonb not null default '{}'::jsonb;  -- {downtown,airport,hwy401,hwy407,hwy404,hwy400,hospital}
