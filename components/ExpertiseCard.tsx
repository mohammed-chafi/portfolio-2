import type { LucideIcon } from 'lucide-react';

type ExpertiseCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
};

export function ExpertiseCard({ icon: Icon, title, description, tags }: ExpertiseCardProps) {
  return (
    <article className="card-lift group flex h-full flex-col p-6 hover:bg-wash">
      <span
        aria-hidden
        className="flex size-10 shrink-0 items-center justify-center rounded-control border border-line bg-wash text-accent transition-colors duration-card group-hover:border-accent/30 group-hover:bg-surface"
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>

      <h3 className="mt-5 text-[17px] font-semibold leading-snug text-ink">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{description}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5 pt-1">
        {tags.map((tag) => (
          <li key={tag} className="tech-tag group-hover:bg-surface">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
