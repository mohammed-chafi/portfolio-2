import { useTranslations } from 'next-intl';
import { CalendarDays } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/Reveal';
import { ServiceCard, type Service } from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { cardIn } from '@/lib/motion';

export function ServicesGrid() {
  const t = useTranslations('services');
  const items = t.raw('items') as Service[];

  return (
    /* The one white band on the page: it marks the shift from CV to offer. */
    <section
      id="services"
      aria-labelledby="services-title"
      className="section-pad border-y border-line bg-surface"
    >
      <div className="container-page">
        <SectionHeading
          headingId="services-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          intro={t('intro')}
        />

        <RevealGroup
          as="ul"
          className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-3"
        >
          {items.map((service) => (
            <RevealItem as="li" key={service.title} variants={cardIn} className="h-full">
              <ServiceCard service={service} cta={t('cta')} />
            </RevealItem>
          ))}

          {/* Fills the tail of the grid with the action the section exists for. */}
          <RevealItem as="li" variants={cardIn} className="h-full md:col-span-2">
            <div className="flex h-full flex-col justify-center rounded-card border border-accent/30 bg-wash p-6 lg:p-8">
              <h3 className="max-w-[26ch] text-balance text-[19px] font-semibold leading-snug text-ink">
                {t('ctaPanel.title')}
              </h3>
              <p className="mt-2.5 max-w-measure text-[15px] leading-relaxed text-ink-2">
                {t('ctaPanel.body')}
              </p>
              <div className="mt-5">
                <Button asChild>
                  <a href="#contact">
                    <CalendarDays />
                    {t('ctaPanel.button')}
                  </a>
                </Button>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
