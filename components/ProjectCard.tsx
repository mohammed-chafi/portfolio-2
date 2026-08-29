import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { BrowserFrame } from '@/components/BrowserFrame';
import { ProjectVisual } from '@/components/ProjectVisual';
import { cn } from '@/lib/utils';

export type Project = {
  name: string;
  context: string;
  description: string;
  tags: string[];
  url?: string;
  urlLabel?: string;
  /** Screenshot of the live site, when there is one. */
  image?: string;
  /** Domain shown in the frame's address pill. */
  domain?: string;
  /** Which schematic to draw when there is no screenshot. */
  visual?: string;
};

type ProjectCardProps = {
  project: Project;
  visitLabel: string;
  /** The live project gets the wide slot and a side-by-side layout. */
  featured?: boolean;
};

export function ProjectCard({ project, visitLabel, featured = false }: ProjectCardProps) {
  const hasLink = Boolean(project.url);

  return (
    <article
      className={cn(
        'group flex h-full overflow-hidden rounded-card border border-line bg-surface shadow-sm transition-[transform,box-shadow] duration-card ease-out hover:-translate-y-0.5 hover:shadow-md',
        featured ? 'flex-col lg:flex-row-reverse' : 'flex-col'
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center justify-center bg-wash p-4 sm:p-5',
          featured
            ? 'border-b border-line lg:w-1/2 lg:border-b-0 lg:border-s lg:rtl:border-e lg:rtl:border-s-0'
            : 'border-b border-line'
        )}
      >
        {project.image ? (
          /*
            Real screenshot, framed as a browser window. The frame crops to a
            fixed ratio from the top, so every card lines up whatever the
            capture height, and the page reads as a site rather than a picture.
          */
          <BrowserFrame domain={project.domain} className="shadow-sm">
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes={featured ? '(min-width: 1024px) 46vw, 92vw' : '(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw'}
              className="object-cover object-top"
            />
          </BrowserFrame>
        ) : (
          <div dir="ltr" className="w-full max-w-[420px]">
            <ProjectVisual name={project.visual} className="h-auto w-full" />
          </div>
        )}
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

        <p className="mt-3 max-w-measure flex-1 text-[15px] leading-relaxed text-ink-2">
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
