import { education } from "../content";
import { card } from "./About";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="pb-24 sm:pb-32">
      <Reveal>
        <h2
          id="education-heading"
          className="text-[clamp(28px,4vw,44px)] leading-tight font-semibold tracking-[-0.025em]"
        >
          {education.heading}
        </h2>
      </Reveal>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {education.items.map((item, i) => (
          <li key={item.degree}>
            <Reveal delay={i * 0.08} className={`${card} h-full p-7 sm:p-10`}>
              <p className="text-sm text-muted">{item.period}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{item.degree}</h3>
              <p className="mt-1 text-muted">{item.school}</p>
              <p className="mt-4">{item.detail}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {item.modules.map((m) => (
                  <li key={m} className="rounded-full border border-line px-3 py-1 text-sm">
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
