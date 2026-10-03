import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { about, site } from "../content";
import Reveal from "./Reveal";

export const card =
  "rounded-3xl border border-transparent bg-card shadow-soft dark:border-line";

/** Counts "20+" up from 0 the first time it scrolls into view. Writes to the DOM directly, no re-renders. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [, num, suffix] = value.match(/^(\d+)(.*)$/) ?? [];

  useEffect(() => {
    if (!inView || !num || reduceMotion) return;
    const controls = animate(0, Number(num), {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, num, suffix, reduceMotion]);

  return (
    <p ref={ref} className="text-3xl font-semibold tracking-tight tabular-nums sm:text-5xl">
      {num && !reduceMotion ? `0${suffix}` : value}
    </p>
  );
}

const pills: Variants = { visible: { transition: { staggerChildren: 0.04 } } };
const pill: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

// Bento layout (direction from 21st.dev "About Bento"): tall portrait tile beside bio and stats.
export default function About() {
  return (
    <div className="grid gap-4 pb-24 sm:pb-32 md:grid-cols-3">
      <Reveal className={`${card} relative aspect-square overflow-hidden md:row-span-2 md:aspect-auto`}>
        <img
          src={about.portrait.src}
          alt={about.portrait.alt}
          width={900}
          height={900}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/25 to-transparent px-6 pt-20 pb-5 text-white">
          <p className="text-xl font-semibold tracking-tight">{site.name}</p>
          <p className="text-[15px] text-white/85">{about.role}</p>
        </div>
      </Reveal>

      <Reveal delay={0.08} className={`${card} p-7 sm:p-10 md:col-span-2`}>
        <h2 className="text-[clamp(28px,4vw,44px)] leading-tight font-semibold tracking-[-0.025em]">
          {about.heading}
        </h2>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">{about.bio}</p>
      </Reveal>

      <Reveal delay={0.16} className={`${card} md:col-span-2`}>
        <ul className="grid grid-cols-3 divide-x divide-line">
          {about.stats.map((stat) => (
            <li key={stat.label} className="px-2 py-7 text-center sm:py-9">
              <CountUp value={stat.value} />
              <p className="mt-2 text-sm text-muted sm:text-base">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className={`${card} p-7 sm:p-10 md:col-span-3`}>
        <h3 className="text-[15px] font-semibold">Skills</h3>
        <motion.ul
          variants={pills}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-4 flex flex-wrap gap-2.5"
        >
          {about.skills.map((skill) => (
            <motion.li key={skill} variants={pill} className="rounded-full border border-line px-4 py-2 text-[15px]">
              {skill}
            </motion.li>
          ))}
        </motion.ul>
      </Reveal>
    </div>
  );
}
