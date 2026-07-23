// Host-based routing for published listings on their own custom domains.
//
// Once a listing's `custom_domain` is set (you've bought the domain, added it to
// the Vercel project, and pointed DNS), a request arriving on that host is
// served that listing at the root path. The homepage (src/pages/index.astro)
// calls listingByDomain() for any host that isn't one of ours.

import { getAdminClient } from './supabase-admin';
import type { Listing } from './types';

/** Hosts that belong to us — never treated as a client's custom domain. */
function isOwnHost(host: string): boolean {
  const h = host.toLowerCase().split(':')[0]; // strip any :port
  if (!h) return true;
  if (h === 'localhost' || h.endsWith('.localhost') || h === '127.0.0.1') return true;
  if (h.endsWith('.vercel.app')) return true;
  if (h === 'thelinovagroup.com' || h.endsWith('.thelinovagroup.com')) return true;
  return false;
}

/** True when this Host header is (or could be) a client's custom domain. */
export function isCustomHost(host: string | null | undefined): boolean {
  return !!host && !isOwnHost(host);
}

/** Normalize a domain for storage/compare: lowercase, no scheme/path/www/port. */
export function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split(':')[0]
    .trim();
}

/**
 * Find the published listing wired to this Host, or null. Matches with and
 * without a leading "www." and only returns UNLOCKED listings (a locked/unpaid
 * one must never appear on a live domain).
 */
export async function listingByDomain(host: string): Promise<Listing | null> {
  const bare = normalizeDomain(host);
  if (!bare) return null;
  try {
    const sb = getAdminClient();
    const { data } = await sb
      .from('listings')
      .select('*')
      .in('custom_domain', [bare, `www.${bare}`])
      .eq('locked', false)
      .maybeSingle();
    return (data as Listing) ?? null;
  } catch {
    return null;
  }
}
