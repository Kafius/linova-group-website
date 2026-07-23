-- Estate Sites — custom-domain ordering.
-- Run after 0006_estate_lease.sql.
--
-- Two distinct fields:
--   requested_domain — what the client typed at Stripe checkout ("I'd like
--                      12ravinecrest.com"). Captured automatically by the webhook.
--   custom_domain    — the domain you've ACTUALLY wired up (bought + added to
--                      Vercel + DNS). Setting this is what makes the listing go
--                      live on that domain (host-based routing keys on it).
--
-- Manual runbook: read requested_domain → buy it → add it to the Vercel project
-- → set custom_domain to the same value on this row → the site is live there.

alter table public.listings
  add column if not exists requested_domain text;

-- Fast lookup when resolving an incoming Host header → its listing.
create index if not exists listings_custom_domain_idx
  on public.listings (custom_domain)
  where custom_domain is not null;
