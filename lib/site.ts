/** Single source of truth for links, anchors and third-party endpoints. */

/**
 * Canonical origin. Feeds the canonical tags, hreflang alternates, sitemap,
 * robots and the Person JSON-LD, so it must match where the site actually
 * lives — pointing these at a domain that is not serving the site is worse
 * than having no canonical at all.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — set this once the custom domain is attached.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel, so a deployment is
 *     self-describing before any custom domain exists.
 *  3. localhost, for development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();

export const CONTACT = {
  email: "mdchafi122@gmail.com",
  phone: "+212619258671",
  phoneDisplay: "+212 619258671",
  linkedin: "https://www.linkedin.com/in/mohammed-chafi",
} as const;

/**
 * Calendly scheduling link.
 *
 * Overridable at deploy time with NEXT_PUBLIC_CALENDLY_URL, so the account or
 * event type can be swapped from the hosting dashboard without a code change.
 * The fallback below resolves to a live "30 Minute Meeting" event.
 */
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/mohammed-chafi/30min";

/** Anchor ids, in page order. Used by the header nav, the footer and scroll targets. */
export const SECTIONS = [
  "about",
  "expertise",
  "experience",
  "projects",
  "services",
  "education",
  "contact",
] as const;

export type SectionId = (typeof SECTIONS)[number];

/** Shown in the header; the rest stay reachable through the footer and scrolling. */
export const HEADER_NAV: SectionId[] = [
  "about",
  "expertise",
  "experience",
  "projects",
  "services",
  "contact",
];
