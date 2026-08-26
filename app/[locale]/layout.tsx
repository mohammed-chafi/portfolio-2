import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { routing, getDirection, type Locale } from '@/lib/routing';
import { SITE_URL, CONTACT } from '@/lib/site';
import { cn } from '@/lib/utils';
import { MotionProvider } from '@/components/MotionProvider';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans',
});

/*
 * Arabic face, applied only on the ar locale (see the <html> class below).
 *
 * `preload: false` is deliberate. next/font resolves at module scope, so with
 * preloading on, every French and English page shipped preload hints for Arabic
 * font files it never used — which the browser reports as "preloaded but not
 * used". It is now fetched on demand, on the one locale that needs it.
 *
 * Only the `arabic` subset is requested. Latin runs inside Arabic copy (tech
 * names like ASP.NET Core) fall through to Inter via the font stack, which is
 * what we want anyway, and it halves the number of files.
 */
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
  variable: '--font-arabic',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}`])
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    applicationName: 'Mohammed Chafi',
    authors: [{ name: 'Mohammed Chafi', url: CONTACT.linkedin }],
    creator: 'Mohammed Chafi',
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: { ...languages, 'x-default': `${SITE_URL}/${routing.defaultLocale}` },
    },
    openGraph: {
      type: 'profile',
      siteName: 'Mohammed Chafi',
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}`,
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = getDirection(locale);
  const isArabic = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(inter.variable, isArabic && plexArabic.variable)}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
