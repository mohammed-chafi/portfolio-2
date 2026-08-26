'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { InlineWidget } from 'react-calendly';
import { ExternalLink } from 'lucide-react';
import { CALENDLY_URL } from '@/lib/site';

/**
 * Inline Calendly embed (never the popup). Mounted after hydration so the
 * third-party script never blocks first paint, with a reserved 700px well so
 * the section does not jump when the widget arrives.
 */
export function CalendlyEmbed({ locale }: { locale: string }) {
  const t = useTranslations('contact.calendly');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <div
        // The widget renders its own LTR chrome; keep it out of the RTL flow.
        dir="ltr"
        className="min-h-[700px] overflow-hidden rounded-card border border-line bg-surface"
      >
        {mounted ? (
          <InlineWidget
            // Pass the bare link: react-calendly builds the query string from
            // pageSettings. Appending the same params by hand duplicated them.
            url={CALENDLY_URL}
            styles={{ height: '700px', width: '100%' }}
            pageSettings={{
              // Colour overrides are honoured on Calendly paid plans only; on a
              // free plan they are ignored and the default theme is served.
              backgroundColor: 'ffffff',
              textColor: '0f172a',
              primaryColor: '1d4ed8',
              hideGdprBanner: true,
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
            }}
          />
        ) : (
          <div className="flex min-h-[700px] items-center justify-center">
            <p className="text-meta text-ink-3">{t('loading')}…</p>
          </div>
        )}
      </div>

      <p className="mt-3 text-meta text-ink-3">
        {t('fallback')}{' '}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          lang={locale}
          className="inline-flex items-center gap-1 font-medium text-accent transition-colors duration-fast hover:text-accent-strong"
        >
          {t('fallbackLink')}
          <ExternalLink className="size-3.5 rtl:-scale-x-100" aria-hidden />
        </a>
      </p>
    </div>
  );
}
