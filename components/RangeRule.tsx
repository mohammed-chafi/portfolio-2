import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

/**
 * Signature element.
 *
 * The positioning claim is a *range* — "from the web to the industrial floor" —
 * so it is drawn as a measurement scale instead of being restated in prose. The
 * two endpoints carry the claim and are marked in accent; the three intermediate
 * stops are what lives inside the span.
 *
 * The rule draws itself from the inline start, then the ticks land along it in
 * order, so the scale reads as being *measured out* rather than faded in. It
 * flips automatically in RTL: the transform origin follows the writing
 * direction, so the rule always draws from where reading begins.
 *
 * CSS-driven, like the rest of the hero — it must never be left half-drawn.
 */
export function RangeRule() {
  const t = useTranslations('hero');

  const stops = [
    { key: 'web', label: t('range.web'), endpoint: true },
    { key: 'ai', label: t('range.ai'), endpoint: false },
    { key: 'data', label: t('range.data'), endpoint: false },
    { key: 'iot', label: t('range.iot'), endpoint: false },
    { key: 'industry', label: t('range.industry'), endpoint: true },
  ];

  return (
    <div className="w-full">
      <p className="label-caps animate-rise text-ink-3" style={{ animationDelay: '700ms' }}>
        {t('rangeLabel')}
      </p>

      <div className="relative mt-4 pb-6">
        {/* The rule itself. */}
        <div
          aria-hidden
          className="h-px w-full origin-left animate-draw-x bg-line rtl:origin-right"
          style={{ animationDelay: '760ms' }}
        />

        <ol>
          {stops.map((stop, i) => {
            const isFirst = i === 0;
            const isLast = i === stops.length - 1;
            return (
              <li
                key={stop.key}
                className={cn('absolute top-0 animate-rise', !stop.endpoint && 'hidden sm:block')}
                style={{
                  // The closing stop is anchored to the end edge rather than to
                  // 100% from the start, so its box stays inside the container
                  // instead of pushing the page wide on narrow screens.
                  ...(isLast ? { insetInlineEnd: 0 } : { insetInlineStart: `${i * 25}%` }),
                  animationDelay: `${900 + i * 70}ms`,
                }}
              >
                {/* Endpoint ticks are taller and in accent — they carry the claim. */}
                <span
                  aria-hidden
                  className={cn(
                    'absolute top-0 block w-px',
                    isLast ? 'end-0' : 'start-0',
                    stop.endpoint ? 'h-2.5 bg-accent' : 'h-1.5 bg-line'
                  )}
                />
                <span
                  className={cn(
                    'label-caps mt-4 block whitespace-nowrap font-medium',
                    stop.endpoint ? 'text-ink' : 'text-ink-3',
                    !isFirst && !isLast && '-translate-x-1/2 rtl:translate-x-1/2'
                  )}
                >
                  {stop.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
