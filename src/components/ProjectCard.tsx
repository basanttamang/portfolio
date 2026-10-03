import type { Project } from "../content";
import { card } from "./About";
import ProjectGraphic from "./ProjectGraphic";
import TiltCard from "./TiltCard";

export default function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <TiltCard className={`${card} h-full hover:shadow-lift`}>
      <article className="flex h-full flex-col">
        <div
          // Wide covers match the cover height of a regular card in the same row.
          className={`relative aspect-[16/10] overflow-hidden ${wide ? "sm:aspect-[10/3]" : ""}`}
          style={{ background: project.gradient }}
        >
          <div className="size-full transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none">
            <ProjectGraphic kind={project.graphic} />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-2 text-muted">{project.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-fg/6 px-3 py-1 text-[13px] text-fg/80">
                {tag}
              </li>
            ))}
          </ul>
          <a
            href={project.href}
            className="relative z-20 mt-auto pt-6 text-[15px] font-medium text-accent hover:underline"
            aria-label={`View project: ${project.title}`}
          >
            View project <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    </TiltCard>
  );
}
