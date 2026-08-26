import { Reveal } from '@/components/Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Ties the section landmark to its own heading for screen readers. */
  headingId: string;
};

export function SectionHeading({ eyebrow, title, intro, headingId }: SectionHeadingProps) {
  return (
    <Reveal className="max-w-measure">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingId} className="mt-4 text-section text-balance text-ink">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-lead text-ink-2">{intro}</p> : null}
    </Reveal>
  );
}
