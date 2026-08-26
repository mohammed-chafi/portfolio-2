import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['fr', 'en', 'ar'] as const;
export type Locale = (typeof locales)[number];

/** Locales that render right-to-left. */
export const rtlLocales: readonly Locale[] = ['ar'];

export function getDirection(locale: string): 'ltr' | 'rtl' {
  return rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr';
}

export const routing = defineRouting({
  locales,
  defaultLocale: 'fr',
  // Every locale is prefixed: /fr, /en, /ar
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
