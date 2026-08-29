import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { ProjectCard, type Project } from '@/components/ProjectCard';
import { cardIn } from '@/lib/motion';

export function Projects() {
  const t = useTranslations('projects');
  const items = t.raw('items') as Project[];

  /*
   * The wide slot goes to a project with a live site and a screenshot, found by
   * data rather than by position — the locales order this list differently, so
   * taking items[0] featured a different project on each language.
   */
  const featuredIndex = Math.max(
    0,
    items.findIndex((p) => p.url && p.image)
  );
  const featured = items[featuredIndex];
  const rest = items.filter((_, i) => i !== featuredIndex);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad">
      <div className="container-page">
        <SectionHeading
          headingId="projects-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          intro={t('intro')}
        />

        <div className="mt-10 lg:mt-12">
          <Reveal>
            <ProjectCard project={featured} visitLabel={t('visitLabel')} featured />
          </Reveal>

          <RevealGroup as="ul" className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((project) => (
              <RevealItem as="li" key={project.name} variants={cardIn} className="h-full">
                <ProjectCard project={project} visitLabel={t('visitLabel')} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
