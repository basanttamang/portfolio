import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { hero } from "../content";

export const buttonPrimary =
  "inline-flex items-center justify-center rounded-full bg-accent-fill px-6 py-3 text-[15px] font-medium text-white transition-[filter] hover:brightness-110";
export const buttonSecondary =
  "inline-flex items-center justify-center rounded-full border border-accent px-6 py-3 text-[15px] font-medium text-accent transition-colors hover:bg-accent/10";

/** Spring press feedback shared by the site's pill buttons. */
export const buttonMotion = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 400, damping: 17 },
} as const;

// One orchestrated entrance: label, name, subtitle, then buttons.
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  // As the hero scrolls away it drifts up slightly and fades.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, reduceMotion ? 0 : -60]);
  const opacity = useTransform(scrollY, [0, 450], [1, reduceMotion ? 1 : 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center py-24 text-center"
    >
      <motion.p variants={item} className="text-lg font-medium text-muted sm:text-xl">
        {hero.eyebrow}
      </motion.p>
      <motion.h1
        variants={item}
        className="mt-3 text-[clamp(48px,11vw,96px)] leading-[1.02] font-bold tracking-[-0.035em]"
      >
        {hero.title}
      </motion.h1>
      <motion.p
        variants={item}
        className="mx-auto mt-6 max-w-[34ch] text-[clamp(20px,3vw,28px)] leading-snug font-light text-muted"
      >
        {hero.subtitle}
      </motion.p>
      <motion.div variants={item} className="mt-10 flex flex-wrap justify-center gap-3">
        <motion.a href={hero.primaryCta.href} className={buttonPrimary} {...buttonMotion}>
          {hero.primaryCta.label}
        </motion.a>
        <motion.a href={hero.secondaryCta.href} className={buttonSecondary} {...buttonMotion}>
          {hero.secondaryCta.label}
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
