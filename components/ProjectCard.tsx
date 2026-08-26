import { ArrowUpRight } from 'lucide-react';
import { ProjectVisual } from '@/components/ProjectVisual';
import { cn } from '@/lib/utils';

export type Project = {
  name: string;
  context: string;
  description: string;
  tags: string[];
  url?: string;
  urlLabel?: string;
};

type ProjectCardProps = {
  project: Project;
  index: number;
  visitLabel: string;
  /** The live project gets the wide slot and a side-by-side layout. */
  featured?: boolean;
};

export function ProjectCard({ project, index, visitLabel, featured = false }: ProjectCardProps) {
  const hasLink = Boolean(project.url);

  return (
    <article
      className={cn(
        'card-lift group flex h-full',
        featured ? 'flex-col lg:flex-row-reverse' : 'flex-col'
      )}
    >
      <div
        dir="ltr"
        className={cn(
          'flex shrink-0 items-center justify-center bg-wash p-4 sm:p-6',
          featured
            ? 'border-b border-line lg:w-1/2 lg:border-b-0 lg:border-s lg:rtl:border-e lg:rtl:border-s-0'
            : 'border-b border-line'
        )}
      >
        <ProjectVisual index={index} className="h-auto w-full max-w-[420px]" />
      </div>

      <div className={cn('flex flex-1 flex-col p-6', featured && 'lg:justify-center lg:p-9')}>
        <p className="label-caps text-ink-3">{project.context}</p>

        <h3
          className={cn(
            'mt-2.5 font-semibold leading-snug text-ink',
            featured ? 'text-[22px] lg:text-[26px]' : 'text-[19px]'
          )}
        >
          {project.name}
        </h3>

        <p className="mt-3 max-w-measure text-[15px] leading-relaxed text-ink-2">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="tech-tag">
              {tag}
            </li>
          ))}
        </ul>

        {hasLink ? (
          <p className="mt-6">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[4px] text-[15px] font-medium text-accent transition-colors duration-fast hover:text-accent-strong"
            >
              <span>
                {visitLabel}
                <span className="sr-only"> — {project.urlLabel}</span>
              </span>
              <span aria-hidden className="numeric text-ink-3">
                {project.urlLabel}
              </span>
              <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden />
            </a>
          </p>
        ) : null}
      </div>
    </article>
  );
}
