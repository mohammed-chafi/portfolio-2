import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/lib/routing';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Mohammed Chafi — Software & AI Engineer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Arabic needs a font with Arabic glyphs; the built-in one has none. */
async function loadArabicFont(): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexsansarabic/IBMPlexSansArabic-SemiBold.ttf',
      { signal: AbortSignal.timeout(6000), cache: 'force-cache' }
    );
    if (!response.ok) return null;
    return await response.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const isArabic = locale === 'ar';
  const arabicFont = isArabic ? await loadArabicFont() : null;

  // Without the Arabic face the Arabic text would render as empty boxes,
  // so that build falls back to the Latin wordmark.
  const canRenderArabic = !isArabic || arabicFont !== null;
  const useArabic = isArabic && canRenderArabic;
  const dir = useArabic ? 'rtl' : 'ltr';

  /*
   * Satori (the renderer behind ImageResponse) shapes Arabic glyphs correctly
   * but does not run the Unicode bidi algorithm, so it lays words out in
   * logical rather than visual order. Reversing the tokens ourselves puts them
   * back in reading order. This is specific to the OG image — the site itself
   * is rendered by the browser, which handles bidi properly.
   */
  const rtl = (value: string) => (useArabic ? value.split(' ').reverse().join(' ') : value);

  /* Arabic that cannot be drawn falls back to Latin; fr/en use their own copy. */
  const field = (key: string, latinFallback: string) =>
    isArabic && !canRenderArabic ? latinFallback : rtl(t(key));

  const name = field('name', 'Mohammed Chafi');
  const role = field('role', 'Software & AI Engineer');
  const location = field('location', 'Tangier, Morocco');

  const stops = [
    field('range.web', 'Web'),
    field('range.ai', 'AI'),
    field('range.data', 'Data'),
    field('range.iot', 'IoT'),
    field('range.industry', 'Industry'),
  ];

  return new ImageResponse(
    (
      <div
        lang={locale}
        dir={dir}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAFA',
          padding: '72px 80px',
        }}
      >
        {/* Identity strip. Satori ignores `dir`, so RTL rows are mirrored by hand. */}
        <div
          style={{
            display: 'flex',
            flexDirection: useArabic ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <div style={{ width: 4, height: 34, backgroundColor: '#1D4ED8' }} />
          <div style={{ fontSize: 26, fontWeight: 600, color: '#0F172A' }}>{name}</div>
          <div style={{ fontSize: 26, color: '#64748B' }}>·</div>
          <div style={{ fontSize: 26, color: '#475569' }}>{location}</div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: useArabic ? 'flex-end' : 'flex-start',
          }}
        >
          <div
            style={{
              // The token reversal only survives on a single line, so the
              // Arabic headline is sized to fit one.
              fontSize: useArabic ? 60 : 74,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: useArabic ? '0' : '-0.02em',
              color: '#0F172A',
              maxWidth: 1040,
              whiteSpace: useArabic ? 'nowrap' : 'normal',
            }}
          >
            {role}
          </div>
          {/*
            The Latin sublines wrap cleanly. The Arabic one mixes scripts and
            parentheses, which the token reversal above cannot put back in order,
            so the Arabic card carries the headline alone.
          */}
          {useArabic ? null : (
            <div style={{ marginTop: 24, fontSize: 30, color: '#475569', maxWidth: 900 }}>
              {t('subline')}
            </div>
          )}
        </div>

        {/* The site's signature scale */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', width: '100%', height: 1, backgroundColor: '#E5E7EB' }} />
          <div
            style={{
              display: 'flex',
              flexDirection: useArabic ? 'row-reverse' : 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            {stops.map((stop, i) => {
              const endpoint = i === 0 || i === stops.length - 1;
              // In a mirrored row the first stop sits at the right edge.
              const edge = useArabic ? 'flex-end' : 'flex-start';
              const farEdge = useArabic ? 'flex-start' : 'flex-end';
              return (
                <div
                  key={stop}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: i === 0 ? edge : i === stops.length - 1 ? farEdge : 'center',
                  }}
                >
                  <div
                    style={{
                      width: 2,
                      height: endpoint ? 14 : 8,
                      backgroundColor: endpoint ? '#1D4ED8' : '#E5E7EB',
                    }}
                  />
                  <div
                    style={{
                      marginTop: 14,
                      fontSize: useArabic ? 18 : 20,
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      color: endpoint ? '#0F172A' : '#64748B',
                    }}
                  >
                    {stop}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: arabicFont
        ? [{ name: 'IBM Plex Sans Arabic', data: arabicFont, style: 'normal', weight: 600 }]
        : undefined,
    }
  );
}
