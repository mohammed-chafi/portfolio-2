'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/routing';
import { locales, type Locale } from '@/lib/routing';
import { cn } from '@/lib/utils';

const LABELS: Record<Locale, string> = { fr: 'FR', en: 'EN', ar: 'AR' };

export function LanguageSwitcher({
  currentLocale,
  className,
}: {
  currentLocale: string;
  className?: string;
}) {
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav aria-label={t('languageLabel')} className={cn('flex items-center', className)}>
      {locales.map((locale, i) => {
        const isCurrent = locale === currentLocale;
        return (
          <span key={locale} className="flex items-center">
            {i > 0 ? (
              <span aria-hidden className="mx-1.5 text-[11px] text-line">
                /
              </span>
            ) : null}
            <Link
              href={pathname}
              locale={locale}
              hrefLang={locale}
              aria-current={isCurrent ? 'true' : undefined}
              className={cn(
                'rounded-[4px] px-0.5 text-[12px] font-semibold tracking-[0.06em] transition-colors duration-fast',
                isCurrent ? 'text-accent' : 'text-ink-3 hover:text-ink'
              )}
            >
              {LABELS[locale]}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
