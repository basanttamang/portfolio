import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "../content";
import ThemeToggle from "./ThemeToggle";

// Direction from two 21st.dev navbars: "Morphing Scroll Navbar" (full-width bar that
// becomes a floating glass capsule on scroll) and "Tubelight Navbar" (sliding active pill).
export default function Nav() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(site.nav[0].href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section crossing the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { href } of site.nav) {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none sticky top-0 z-50 h-14"
    >
      <nav
        aria-label="Main"
        className={`pointer-events-auto absolute inset-x-0 mx-auto flex items-center justify-between gap-2 border transition-[max-width,top,height,border-radius,background-color,border-color,box-shadow,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          scrolled
            ? "top-2 h-12 max-w-[calc(100%-0.5rem)] rounded-full border-line bg-nav pr-1 pl-4 sm:pl-5 shadow-soft backdrop-blur-xl backdrop-saturate-180 sm:max-w-[620px]"
            : "top-0 h-14 max-w-[1080px] rounded-none border-transparent px-3 sm:px-6"
        }`}
      >
        <a href="#about" className="shrink-0 text-[15px] font-semibold tracking-tight">
          {site.name}
        </a>
        <div className="flex items-center sm:gap-1">
          <ul className="flex items-center text-[13px] sm:text-sm">
            {site.nav.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative isolate block rounded-full px-2 py-1.5 transition-colors sm:px-3.5 ${
                      isActive ? "text-fg" : "text-fg/70 hover:text-fg"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-fg/[0.07]"
                        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
