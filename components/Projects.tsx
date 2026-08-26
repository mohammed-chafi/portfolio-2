import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { ProjectCard, type Project } from "@/components/ProjectCard";
import { cardIn } from "@/lib/motion";

export function Projects() {
  const t = useTranslations("projects");
  const items = t.raw("items") as Project[];

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="section-pad"
    >
      <div className="container-page">
        <SectionHeading
          headingId="projects-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
        />

        <div className="mt-10 lg:mt-12">
          <RevealGroup
            as="ul"
            className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((project, i) => (
              <RevealItem
                as="li"
                key={project.name}
                variants={cardIn}
                className="h-full"
              >
                <ProjectCard
                  project={project}
                  index={i}
                  visitLabel={t("visitLabel")}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
