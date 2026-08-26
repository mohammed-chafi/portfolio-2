import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/Reveal';

export function About() {
  const t = useTranslations('about');
  const qualities = t.raw('qualities') as string[];
  const facts = t.raw('facts') as { label: string; value: string }[];

  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 id="about-title" className="mt-4 max-w-[22ch] text-section text-balance text-ink">
              {t('title')}
            </h2>
            <p className="mt-6 max-w-measure text-lead text-ink-2">{t('body')}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <p className="label-caps text-ink-3">{t('qualitiesLabel')}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {qualities.map((quality) => (
                <li key={quality} className="tech-tag">
                  {quality}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Reference block: the facts a recruiter or a client checks first. */}
        <Reveal delay={0.12} className="lg:col-span-5">
          <div className="rounded-card border border-line bg-surface p-6 shadow-sm lg:p-7">
            <p className="label-caps text-ink-3">{t('factsLabel')}</p>
            <dl className="mt-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 border-t border-line py-3.5 first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <dt className="text-meta text-ink-3">{fact.label}</dt>
                  <dd className="text-[15px] font-medium text-ink sm:text-end">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
