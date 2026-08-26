import { useTranslations } from 'next-intl';
import { GraduationCap } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';

type Degree = { title: string; school: string; location: string };
type Language = { name: string; level: string; score: number };

const LEVEL_STEPS = 3;

export function Education() {
  const t = useTranslations('education');
  const degrees = t.raw('degrees') as Degree[];
  const languages = t.raw('languages') as Language[];

  return (
    <section id="education" aria-labelledby="education-title" className="section-pad">
      <div className="container-page">
        <SectionHeading
          headingId="education-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
        />

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-card border border-line bg-surface p-6 shadow-sm lg:p-7">
              <p className="label-caps text-ink-3">{t('degreesLabel')}</p>
              <ul className="mt-5 space-y-5">
                {degrees.map((degree) => (
                  <li key={degree.title} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-control border border-line bg-wash text-accent"
                    >
                      <GraduationCap className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold leading-snug text-ink">
                        {degree.title}
                      </h3>
                      <p className="mt-1 text-[15px] text-ink-2">{degree.school}</p>
                      <p className="mt-0.5 text-meta text-ink-3">{degree.location}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-card border border-line bg-surface p-6 shadow-sm lg:p-7">
              <p className="label-caps text-ink-3">{t('languagesLabel')}</p>
              <ul className="mt-4">
                {languages.map((language) => (
                  <li
                    key={language.name}
                    className="flex items-center justify-between gap-6 border-t border-line py-4 first:border-t-0 first:pt-1"
                  >
                    <div>
                      <p className="text-[15px] font-medium text-ink">{language.name}</p>
                      <p className="mt-0.5 text-meta text-ink-3">{language.level}</p>
                    </div>
                    {/* Level as filled segments — same tick vocabulary as the hero scale. */}
                    <span
                      className="flex shrink-0 items-center gap-1"
                      role="img"
                      aria-label={`${language.name}: ${language.level}`}
                    >
                      {Array.from({ length: LEVEL_STEPS }).map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            'block h-1 w-6 rounded-full',
                            i < language.score ? 'bg-accent' : 'bg-line'
                          )}
                        />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
