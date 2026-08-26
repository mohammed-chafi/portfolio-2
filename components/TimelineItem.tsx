'use client';

import { m } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { dotIn } from '@/lib/motion';
import { cn } from '@/lib/utils';

export type ExperienceEntry = {
  period: string;
  role: string;
  contract: string;
  org: string;
  location: string;
  summary: string;
  responsibilities: string[];
  stack: string[];
};

type TimelineItemProps = {
  entry: ExperienceEntry;
  open: boolean;
  onToggle: () => void;
  labels: {
    expand: string;
    collapse: string;
    responsibilities: string;
    stack: string;
  };
  id: string;
};

export function TimelineItem({ entry, open, onToggle, labels, id }: TimelineItemProps) {
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;

  return (
    <>
      {/* Node on the spine. The canvas ring cuts the line so the dot reads as a stop. */}
      <m.span
        aria-hidden
        variants={dotIn}
        className="absolute top-[26px] size-[9px] rounded-full bg-accent ring-4 ring-canvas start-[3px]"
      />

      <article
        className={cn(
          'rounded-card border bg-surface shadow-sm transition-[border-color,box-shadow] duration-card',
          open ? 'border-accent/35 shadow-md' : 'border-line'
        )}
      >
        <div className="p-5 sm:p-6">
          <p className="label-caps numeric text-accent">{entry.period}</p>

          <h3 className="mt-2.5 text-[17px] font-semibold leading-snug text-ink">
            {entry.role}
            <span className="ms-2 align-middle text-meta font-medium text-ink-3">
              {entry.contract}
            </span>
          </h3>

          <p className="mt-1 text-[15px] font-medium text-ink-2">
            {entry.org}
            <span aria-hidden className="mx-1.5 text-line">
              ·
            </span>
            <span className="font-normal text-ink-3">{entry.location}</span>
          </p>

          <p className="mt-3 max-w-measure text-[15px] leading-relaxed text-ink-2">
            {entry.summary}
          </p>

          <button
            type="button"
            id={buttonId}
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-4 inline-flex items-center gap-1.5 rounded-[4px] text-meta font-medium text-accent transition-colors duration-fast hover:text-accent-strong"
          >
            {open ? labels.collapse : labels.expand}
            <ChevronDown
              className={cn(
                'size-4 transition-transform duration-card',
                open && 'rotate-180'
              )}
              aria-hidden
            />
          </button>
        </div>

        {/* Collapsible detail. Grid rows animate without measuring heights. */}
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          aria-hidden={!open}
          className={cn(
            'grid transition-[grid-template-rows] duration-card ease-out',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-line px-5 py-5 sm:px-6">
              <p className="label-caps text-ink-3">{labels.responsibilities}</p>
              <ul className="mt-3 space-y-2">
                {entry.responsibilities.map((task) => (
                  <li
                    key={task}
                    className="relative ps-4 text-[15px] leading-relaxed text-ink-2 before:absolute before:top-[0.65em] before:size-[3px] before:rounded-full before:bg-ink-3 before:content-[''] before:start-0"
                  >
                    {task}
                  </li>
                ))}
              </ul>

              <p className="label-caps mt-5 text-ink-3">{labels.stack}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {entry.stack.map((tech) => (
                  <li key={tech} className="tech-tag">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
