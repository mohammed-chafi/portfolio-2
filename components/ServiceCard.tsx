import { ArrowRight } from 'lucide-react';

export type Service = { title: string; description: string; tags: string[] };

export function ServiceCard({ service, cta }: { service: Service; cta: string }) {
  return (
    <article className="card-lift group flex h-full flex-col p-6 hover:bg-wash">
      <h3 className="text-[17px] font-semibold leading-snug text-ink">{service.title}</h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-ink-2">{service.description}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <li key={tag} className="tech-tag group-hover:bg-surface">
            {tag}
          </li>
        ))}
      </ul>

      <p className="mt-auto pt-6">
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-[4px] text-meta font-medium text-accent transition-colors duration-fast hover:text-accent-strong"
        >
          {cta}
          <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
          <span className="sr-only">: {service.title}</span>
        </a>
      </p>
    </article>
  );
}
