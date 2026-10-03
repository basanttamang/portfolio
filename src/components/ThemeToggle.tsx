import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

const root = document.documentElement;

function saved(): string | null {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

export default function ThemeToggle() {
  // The initial class is set by the inline script in index.html before first paint.
  const [dark, setDark] = useState(() => root.classList.contains("dark"));

  // Follow system changes until the visitor picks a theme themselves.
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (saved()) return;
      root.classList.toggle("dark", e.matches);
      setDark(e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = !dark;
    root.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid size-8 place-items-center rounded-full sm:size-9 text-fg/80 transition-colors hover:bg-fg/8 hover:text-fg"
    >
      {dark ? <SunIcon width={18} height={18} /> : <MoonIcon width={18} height={18} />}
    </button>
  );
}
