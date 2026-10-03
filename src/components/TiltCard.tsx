import { useReducedMotion } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";

// Adapted from 21st.dev "Tilt Card" (tom_ui/tilt-card). Writes styles straight to the
// element instead of React state, so pointer moves don't re-render the card.
export default function TiltCard({
  children,
  className = "",
  tiltLimit = 8,
  scale = 1.02,
  perspective = 1200,
}: {
  children: ReactNode;
  className?: string;
  tiltLimit?: number;
  scale?: number;
  perspective?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduceMotion || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(${perspective}px) rotateX(${(0.5 - py) * tiltLimit * 2}deg) rotateY(${(px - 0.5) * tiltLimit * 2}deg) scale3d(${scale}, ${scale}, ${scale})`;
    el.style.setProperty("--spot-x", `${px * 100}%`);
    el.style.setProperty("--spot-y", `${py * 100}%`);
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group relative overflow-hidden will-change-transform [transition:transform_0.2s_ease-out,box-shadow_0.3s] ${className}`}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:group-hover:opacity-60"
        style={{
          background:
            "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(255 255 255 / 0.25), transparent 40%)",
        }}
      />
    </div>
  );
}
