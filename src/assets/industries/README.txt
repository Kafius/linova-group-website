Hero photographs — one per vertical.

Every slug currently has an interim stock photo (Unsplash, free for commercial
use). See CREDITS.md for sources. These are stand-ins for real client/shoot
photography, not the finished art.

To replace one, drop a file named after the industry slug (see
src/data/industries.ts):

  barbershops  restaurants  contractors  schools  supply  retail  transport

.jpg / .jpeg / .png / .webp / .avif all work. Astro optimizes and serves webp
at 420/640/900w, so use the largest original you have — at least 1200px on the
short edge. Sources here are normalized to 1200x1200 because the hero frame is
close to square on desktop and slightly portrait on mobile; anything taller is
cropped away and just costs bytes.

If no file matches a slug, the hero renders a placeholder frame printing that
industry's heroPhoto.subject note instead — so a newly added industry shows its
own art direction until you shoot it.

The left third of the frame is masked out behind the headline: keep the subject
right of center.
