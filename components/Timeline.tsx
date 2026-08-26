'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/Reveal';
import { TimelineItem, type ExperienceEntry } from '@/components/TimelineItem';
import { VIEWPORT, drawY } from '@/lib/motion';

export function Timeline() {
  const t = useTranslations('experience');
  const entries = t.raw('items') as ExperienceEntry[];

  // One panel open at a time; the most recent role starts open.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const labels = {
    expand: t('expand'),
    collapse: t('collapse'),
    responsibilities: t('responsibilitiesLabel'),
    stack: t('stackLabel'),
  };

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad">
      <div className="container-page">
        <SectionHeading
          headingId="experience-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          intro={t('intro')}
        />

        <div className="relative mt-10 lg:mt-12">
          {/*
            The spine draws downward as the section arrives, and each node lands
            on it in turn — the career reads as being traced out rather than
            appearing all at once.
          */}
          <m.span
            aria-hidden
            className="absolute inset-y-0 w-px origin-top bg-line start-[7px]"
            variants={drawY}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          />

          <RevealGroup as="ol" className="relative" step={0.09} delay={0.15}>
            {entries.map((entry, i) => (
              <RevealItem
                as="li"
                key={`${entry.org}-${entry.period}`}
                className="relative ps-8 pb-6 last:pb-0 sm:ps-10"
              >
                <TimelineItem
                  id={`experience-${i}`}
                  entry={entry}
                  labels={labels}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
