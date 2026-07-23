-- Estate Sites — support leasing as well as selling.
-- Run after 0005_estate_drafts.sql.
--
-- Adds a listing_type discriminator plus the lease-specific terms. The column
-- defaults to 'sale' so any pre-existing rows keep their original meaning; the
-- builder form defaults NEW listings to 'lease'. `price` is reused to hold the
-- monthly rent when listing_type = 'lease'.

alter table public.listings
  add column if not exists listing_type   text not null default 'sale',
  add column if not exists lease_term     text,  -- "12 months", "Flexible"
  add column if not exists available_date text,  -- "Available Aug 1", "Immediate"
  add column if not exists furnished      text,  -- "Furnished" / "Unfurnished" / "Partially furnished"
  add column if not exists pets           text,  -- "Cats & small dogs OK", "No pets"
  add column if not exists utilities      text,  -- "Heat & water included"
  add column if not exists deposit        text;  -- "First & last", "$4,250"

-- Guard against typos: only 'sale' or 'lease' are valid.
alter table public.listings
  drop constraint if exists listings_listing_type_check;
alter table public.listings
  add constraint listings_listing_type_check
  check (listing_type in ('sale', 'lease'));
