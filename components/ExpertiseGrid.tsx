import { useTranslations } from 'next-intl';
import { BrainCircuit, Code2, Container, Cpu, Database, Layers } from 'lucide-react';
import { ExpertiseCard } from '@/components/ExpertiseCard';
import { SectionHeading } from '@/components/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/Reveal';
import { cardIn } from '@/lib/motion';

type ExpertiseItem = { title: string; description: string; tags: string[] };

// Order matches the message file; each icon names the domain, not a decoration.
const ICONS = [Code2, BrainCircuit, Database, Cpu, Layers, Container];

export function ExpertiseGrid() {
  const t = useTranslations('expertise');
  const items = t.raw('items') as ExpertiseItem[];

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="section-pad">
      <div className="container-page">
        <SectionHeading
          headingId="expertise-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          intro={t('intro')}
        />

        <RevealGroup
          as="ul"
          className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-3"
        >
          {items.map((item, i) => (
            <RevealItem as="li" key={item.title} variants={cardIn} className="h-full">
              <ExpertiseCard
                icon={ICONS[i] ?? Code2}
                title={item.title}
                description={item.description}
                tags={item.tags}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
