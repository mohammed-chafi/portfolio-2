import { useTranslations } from 'next-intl';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { fadeUp } from '@/lib/motion';

type Client = { name: string; logo: string | null };

/**
 * Client wall: the marks, nothing else.
 *
 * Shown in their own colours, on one optical baseline. ITALBOX uses a
 * light-background variant of its logo — the original wordmark is white,
 * drawn for their dark header, and would be invisible here.
 */
export function Clients() {
  const t = useTranslations('clients');
  const items = (t.raw('items') as Client[]).filter((c) => c.logo);

  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="border-y border-line bg-surface py-14 lg:py-16"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 id="clients-title" className="sr-only">
            {t('title')}
          </h2>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-8 flex flex-wrap items-center justify-between gap-x-12 gap-y-10 sm:mt-10"
        >
          {items.map((client) => (
            <RevealItem as="li" key={client.name} variants={fadeUp} className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.logo as string}
                alt={client.name}
                loading="lazy"
                decoding="async"
                className="h-9 w-auto max-w-[170px] object-contain sm:h-11"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
