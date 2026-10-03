import type { GraphicKind } from "./components/ProjectGraphic";

// All site copy lives here. Edit this file to update the portfolio.
// (Page <title>, meta description and Open Graph tags live in index.html.)

export const site = {
  name: "Basant Tamang",
  nav: [
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ],
};

export const hero = {
  eyebrow: "Hello, I'm",
  title: "Basant Tamang.",
  subtitle: "Designer & developer crafting simple, thoughtful digital experiences.",
  primaryCta: { label: "View my work", href: "#portfolio" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
};

export const about = {
  heading: "A little about me.",
  bio: "I'm Basant, a designer and developer based in Kathmandu, Nepal. I turn ideas into clean, fast and accessible products. I care about the details that most people never notice but everyone feels. When I'm not building, I'm exploring new tools, learning and sharing what I find.",
  role: "Designer & developer",
  // To change the photo, replace /public/portrait.webp (square works best).
  portrait: { src: "/portrait.webp", alt: "Portrait of Basant Tamang" },
  stats: [
    { value: "3+", label: "Years Experience" },
    { value: "20+", label: "Projects" },
    { value: "100%", label: "Passion" },
  ],
  skills: [
    "UI/UX Design",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Figma",
    "Node.js",
    "Responsive Design",
    "Performance",
  ],
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  /** CSS gradient behind the cover illustration. */
  gradient: string;
  /** Cover illustration, drawn in src/components/ProjectGraphic.tsx. */
  graphic: GraphicKind;
};

export const portfolio = {
  heading: "Selected work.",
  subheading: "A few things I've built recently.",
  // PLACEHOLDER PROJECTS: replace these with your real projects, descriptions and links.
  projects: [
    {
      title: "Himal Store",
      description: "An e-commerce storefront for handmade Nepali crafts.",
      tags: ["React", "Stripe", "Tailwind CSS"],
      href: "#",
      gradient: "linear-gradient(135deg, #ff9a8b 0%, #ff6a88 55%, #ff99ac 100%)",
      graphic: "store",
    },
    {
      title: "Taskly",
      description: "A minimal productivity app with drag-and-drop boards.",
      tags: ["TypeScript", "React", "dnd-kit"],
      href: "#",
      gradient: "linear-gradient(135deg, #a1c4fd 0%, #6f86d6 100%)",
      graphic: "kanban",
    },
    {
      title: "Trekker",
      description: "A trail planner and offline map companion.",
      tags: ["React Native", "Mapbox", "SQLite"],
      href: "#",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38a3a5 100%)",
      graphic: "map",
    },
    {
      title: "Pulse Dashboard",
      description: "An analytics dashboard with live charts.",
      tags: ["React", "D3", "WebSockets"],
      href: "#",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      graphic: "chart",
    },
    {
      title: "Brand Identity Kit",
      description: "A logo and design system for a local startup.",
      tags: ["Figma", "Branding", "Design System"],
      href: "#",
      gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
      graphic: "brand",
    },
    {
      title: "Weather Lite",
      description: "A clean weather app with a beautiful forecast UI.",
      tags: ["TypeScript", "Vite", "Open-Meteo"],
      href: "#",
      gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      graphic: "weather",
    },
  ] satisfies Project[],
};

export const contact = {
  heading: "Let's work together.",
  subheading: "Have a project in mind or just want to say hi? I'd love to hear from you.",
  // PLACEHOLDER: your real email address.
  email: "basanttamang8@gmail.com",
  location: "Kathmandu, Nepal",
  timeZone: "Asia/Kathmandu",
  // PLACEHOLDER: your real profile URLs.
  socials: [
    { label: "GitHub", href: "https://github.com/basanttamang", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/basanttamang", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/bashanttamang", icon: "instagram" }
  ] as const,
};

// Form submission. Leave empty to open the visitor's email app (mailto:).
// To use Formspree, create a form at formspree.io and paste its endpoint,
// e.g. "https://formspree.io/f/abcdwxyz".
export const FORM_ENDPOINT = "";

export const footer = {
  text: "© 2026 Basant Tamang. Designed & built with care.",
};
