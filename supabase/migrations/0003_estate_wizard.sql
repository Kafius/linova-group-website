-- Estate Sites — wizard support: agent email + a public photo bucket.
-- Run after 0002_estate_tour_commute.sql.

-- Agent email (collected in Step 1).
alter table public.listings
  add column if not exists email text;

-- rooms jsonb already exists (0002). Its shape is now:
--   [{ name, category, guidance, caption, photo, shots:[{url,angle}] }]
-- jsonb needs no migration for the richer shape.

-- Public bucket for uploaded listing photos + floor plans.
insert into storage.buckets (id, name, public)
values ('listing-photos', 'listing-photos', true)
on conflict (id) do nothing;

-- Anyone may read the photos (they appear on the published sites).
create policy "public read listing photos"
  on storage.objects for select
  using (bucket_id = 'listing-photos');

-- Uploads/updates/deletes go through /api/upload using the service-role key,
-- which bypasses RLS. No anon write policy is granted here on purpose.
