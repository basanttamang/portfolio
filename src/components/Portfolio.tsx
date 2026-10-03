import { portfolio } from "../content";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

// Bento rhythm: wide cards keep every row full at 2 columns (0, 5) and at 3 columns (0, 3, 5).
const spans = ["sm:col-span-2", "", "", "lg:col-span-2", "", "sm:col-span-2"];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      // Full-bleed background band while content stays in the 1080px column.
      className="min-h-svh bg-band py-24 shadow-[0_0_0_100vmax_var(--band)] [clip-path:inset(0_-100vmax)] sm:py-32"
    >
      <Reveal className="text-center">
        <h2
          id="portfolio-heading"
          className="text-[clamp(40px,7vw,72px)] leading-[1.05] font-bold tracking-[-0.03em]"
        >
          {portfolio.heading}
        </h2>
        <p className="mt-4 text-[clamp(18px,2.4vw,24px)] font-light text-muted">
          {portfolio.subheading}
        </p>
      </Reveal>

      <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.projects.map((project, i) => (
          <li key={project.title} className={spans[i % spans.length]}>
            <Reveal delay={(i % 3) * 0.08} className="h-full">
              <ProjectCard project={project} wide={spans[i % spans.length] !== ""} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
