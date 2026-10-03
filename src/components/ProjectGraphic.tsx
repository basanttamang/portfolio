import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// White illustrations drawn over each project's gradient. viewBox is 16:10; wide cards
// letterbox it. Each one animates in once when scrolled into view (stagger set on the
// <svg>), and some react to hover via the "hover" variant.

export type GraphicKind = "store" | "kanban" | "map" | "chart" | "brand" | "weather";

const W = "#fff";
const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring", stiffness: 260, damping: 22 } as const;

const rise: Variants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: spring } };
const pop: Variants = { hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: spring } };
const grow: Variants = { hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: spring } };
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease } },
};

const graphics: Record<GraphicKind, ReactNode> = {
  // Product tiles rise in, then the cart button pops.
  store: (
    <>
      {[60, 160, 260].map((x, i) => (
        <motion.g key={x} variants={rise}>
          <rect x={x} y={50} width={80} height={120} rx={12} fill={W} fillOpacity={0.9} />
          <circle cx={x + 40} cy={95} r={[22, 18, 20][i]} fill={W} stroke="#000" strokeOpacity={0.08} strokeWidth={10} />
          <rect x={x + 14} y={132} width={52} height={7} rx={3.5} fill="#000" fillOpacity={0.15} />
          <rect x={x + 14} y={146} width={30} height={7} rx={3.5} fill="#000" fillOpacity={0.3} />
        </motion.g>
      ))}
      <motion.g variants={pop}>
        <rect x={140} y={188} width={120} height={28} rx={14} fill={W} />
        <rect x={168} y={199} width={64} height={6} rx={3} fill="#000" fillOpacity={0.3} />
      </motion.g>
    </>
  ),
  // Columns rise in; on hover the dragged card moves on to the next column.
  kanban: (
    <>
      {[50, 160, 270].map((x, c) => (
        <motion.g key={x} variants={rise}>
          <rect x={x} y={40} width={90} height={170} rx={12} fill={W} fillOpacity={0.22} />
          <rect x={x + 12} y={52} width={40} height={6} rx={3} fill={W} fillOpacity={0.9} />
          {[0, 1, 2].slice(0, [3, 2, 1][c]).map((r) => (
            <rect key={r} x={x + 10} y={70 + r * 42} width={70} height={34} rx={8} fill={W} fillOpacity={0.92} />
          ))}
        </motion.g>
      ))}
      <motion.g
        variants={{
          hidden: { opacity: 0, x: -40, rotate: 0 },
          visible: { opacity: 1, x: 0, rotate: -6, transition: { ...spring, delay: 0.5 } },
          hover: { x: 60, y: -36, rotate: 4, transition: spring },
        }}
      >
        <rect x={205} y={130} width={74} height={36} rx={8} fill={W} />
        <rect x={215} y={142} width={44} height={6} rx={3} fill="#000" fillOpacity={0.25} />
      </motion.g>
    </>
  ),
  // Contours fade in, the trail draws itself, then the pin drops (and hops on hover).
  map: (
    <>
      {[30, 55, 80, 105].map((r, i) => (
        <motion.ellipse key={r} variants={pop} cx={290} cy={95} rx={r * 1.4} ry={r} fill="none" stroke={W} strokeOpacity={0.35 - i * 0.05} strokeWidth={2} />
      ))}
      {[25, 50].map((r) => (
        <motion.ellipse key={r} variants={pop} cx={110} cy={185} rx={r * 1.5} ry={r} fill="none" stroke={W} strokeOpacity={0.3} strokeWidth={2} />
      ))}
      <motion.path variants={draw} d="M100 190 C 150 150, 160 210, 210 160 S 260 90, 290 95" fill="none" stroke={W} strokeWidth={4} strokeLinecap="round" />
      <motion.circle variants={pop} cx={100} cy={190} r={8} fill={W} />
      <motion.g
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0, transition: { ...spring, delay: 1.1 } },
          hover: { y: [0, -12, 0], transition: { duration: 0.5 } },
        }}
      >
        <path d="M290 95 m-14 -10 a14 14 0 1 1 28 0 c0 12 -14 26 -14 26 s-14 -14 -14 -26z" fill={W} />
        <circle cx={290} cy={84} r={5} fill="#000" fillOpacity={0.3} />
      </motion.g>
    </>
  ),
  // Bars grow from the baseline, then the trend line draws across them.
  chart: (
    <>
      <motion.rect variants={pop} x={60} y={40} width={280} height={170} rx={14} fill={W} fillOpacity={0.18} />
      {[40, 70, 55, 95, 80, 120, 105].map((h, i) => (
        <motion.rect key={i} variants={grow} style={{ originY: 1 }} x={86 + i * 36} y={190 - h} width={18} height={h} rx={5} fill={W} fillOpacity={0.45} />
      ))}
      <motion.path variants={draw} d="M95 150 L131 120 L167 132 L203 92 L239 104 L275 62 L311 74" fill="none" stroke={W} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      <motion.circle variants={pop} cx={275} cy={62} r={7} fill={W} />
      <motion.g variants={rise}>
        <rect x={76} y={54} width={74} height={24} rx={12} fill={W} />
        <rect x={90} y={63} width={46} height={6} rx={3} fill="#000" fillOpacity={0.3} />
      </motion.g>
    </>
  ),
  // Logo pops, type rises, swatches pop one by one (and bounce on hover).
  brand: (
    <>
      <motion.g variants={pop}>
        <circle cx={130} cy={110} r={52} fill={W} />
        <path d="M100 130 L122 92 L134 112 L142 100 L162 130 Z" fill="#000" fillOpacity={0.75} />
      </motion.g>
      <motion.text variants={rise} x={215} y={128} fontSize={64} fontWeight={700} fill={W} fontFamily="-apple-system, Inter, sans-serif">
        Aa
      </motion.text>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i}
          variants={{
            ...pop,
            hover: { y: [0, -10, 0], transition: { duration: 0.45, delay: i * 0.06 } },
          }}
          cx={110 + i * 45}
          cy={196}
          r={15}
          fill={W}
          fillOpacity={1 - i * 0.18}
        />
      ))}
    </>
  ),
  // Sun pops (and turns on hover), cloud drifts in, forecast tiles rise.
  weather: (
    <>
      <motion.g
        variants={{ ...pop, hover: { rotate: 90, transition: { duration: 0.8, ease } } }}
      >
        <circle cx={150} cy={90} r={34} fill={W} fillOpacity={0.95} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect key={a} x={148} y={40} width={4} height={10} rx={2} fill={W} transform={`rotate(${a} 150 90)`} />
        ))}
      </motion.g>
      <motion.path
        variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { ...spring, delay: 0.2 } } }}
        d="M120 140 a26 26 0 0 1 8 -50 a34 34 0 0 1 64 8 a22 22 0 0 1 4 42 z"
        fill={W}
        fillOpacity={0.75}
      />
      <motion.text variants={rise} x={225} y={128} fontSize={56} fontWeight={300} fill={W} fontFamily="-apple-system, Inter, sans-serif">
        23°
      </motion.text>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.g key={i} variants={rise}>
          <rect x={92 + i * 46} y={172} width={34} height={40} rx={10} fill={W} fillOpacity={0.22} />
          <circle cx={109 + i * 46} cy={186} r={6} fill={W} />
          <rect x={101 + i * 46} y={199} width={16} height={5} rx={2.5} fill={W} fillOpacity={0.8} />
        </motion.g>
      ))}
    </>
  ),
};

export default function ProjectGraphic({ kind }: { kind: GraphicKind }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 400 250"
      className="size-full"
      aria-hidden="true"
      focusable="false"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      whileHover={reduceMotion ? undefined : "hover"}
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
    >
      {graphics[kind]}
    </motion.svg>
  );
}
