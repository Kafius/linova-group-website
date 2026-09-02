Feature-category photographs, used in two places:

  - homepage act 3, the parts list cards, one file per siteSystems id
  - /services, the full parts list, one strip per featureGroup

Both lists live in src/data/siteFeatures.ts and both read this directory.
Drop one file per siteSystems id:

  booking.jpg  payments.jpg  cms.jpg        crm.jpg
  ecommerce.jpg  forms.jpg   analytics.jpg  reviews.jpg

The featureGroups on /services name their file explicitly in `photoFile`,
because the mapping is not one-to-one — four groups describe the same scene
as a system and reuse its file rather than holding a second copy:

  booking -> booking.jpg    selling -> payments.jpg
  content -> cms.jpg        enquiry -> forms.jpg

  trust.jpg  found.jpg  build.jpg     (the three groups with no system)

.jpg / .png / .webp / .avif all work. Astro optimises and serves webp at
400/640/900w, so supply something at least 1200px wide.

Until a file exists, FeaturePhoto.astro renders a dashed placeholder that
prints the art direction for that category (group.photo.subject) plus the
path it is waiting for. Nothing breaks; the card just says what is missing.

Landscape crops, roughly 16:10. They are cropped with object-cover into a
16:10 frame, so keep the subject away from the extreme edges.

---
CURRENT IMAGES - provenance
Sourced from Unsplash (Unsplash License: free for commercial use, no
permission or attribution required). Source photo IDs recorded so any image
can be traced or replaced:

  booking.jpg    photo-1587614379689-4095582a94c2
  payments.jpg   photo-1556742212-5b321f3c261b
  cms.jpg        photo-1625297671662-f073f2a91528
  crm.jpg        photo-1551434678-e076c223a692
  ecommerce.jpg  photo-1579105877218-5cd1f68618d9
  forms.jpg      photo-1628158088791-89567a8e84ec
  analytics.jpg  photo-1526628953301-3e589a6a8b74
  reviews.jpg    photo-1642165835095-528b68f00663

The three parts-list images came later, through the Unsplash API
(scripts/fetch-demo-photos.mjs --parts) rather than by hand. That route is
governed by the API Guidelines, not the plain Unsplash License, so these DO
require attribution — it is carried on /credits, generated from
src/data/demos/photo-credits.json. Replace one by hand and drop its entry
from that file.

  trust.jpg      xyKu1uyM078   Proxyclick Visitor Management System
  found.jpg      BJXAxQ1L7dI   henry perks
  build.jpg      Px3iBXV-4TU   Igor Miske

These are generic scenes, NOT vendor product screenshots. Dennis asked for
Cal.com/Calendly, Clover, and Sanity dashboards; those are the vendors'
copyrighted UI and trademarks, and republishing them on Linova's commercial
site both needs a licence we do not have and implies a partnership we cannot
claim. The safe version of that idea is screenshots of OUR OWN accounts -
Dennis's Calendly, this repo's Sanity Studio (mounts at /studio once
SANITY_PROJECT_ID is set), a client's Clover with their permission. Drop any
of those in over the same filename and it replaces the stock photo on the
next build.

Note: payments.jpg shows a Square terminal and ecommerce.jpg shows boxes
branded "medino". found.jpg shows Google Maps with a real shop, "Morley
Butchers", pinned. Incidental trademarks inside a licensed photograph are
normal; swap them if that reads wrong for a client conversation. found.jpg
is the one to watch on that count — the whole frame is a Google product,
which is on-message for "found & measured" but is a vendor's UI.
