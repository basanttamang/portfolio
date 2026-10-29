import type { GraphicKind } from "./components/ProjectGraphic";

// All site copy lives here. Edit this file to update the portfolio.
// (Page <title>, meta description and Open Graph tags live in index.html.)

export const site = {
  name: "Basant Tamang",
  nav: [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Work", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ],
};

export const hero = {
  eyebrow: "Hello, I'm",
  title: "Basant Tamang.",
  subtitle: "Software engineer building thoughtful, well-specified software.",
  primaryCta: { label: "View my work", href: "#portfolio" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
};

export const about = {
  heading: "A little about me.",
  bio: "I'm Basant, a software engineer from Kathmandu with an MSc in Software Engineering from Kingston University London. I build Android, web and data projects, and I like to start from how people actually use a service, then turn that into software that is tested and easy to trace back to a need.",
  role: "Software engineer",
  // To change the photo, replace /public/portrait.webp (square works best).
  portrait: { src: "/portrait.webp", alt: "Portrait of Basant Tamang" },
  stats: [
    { value: "6", label: "Projects" },
    { value: "83%", label: "Software Architecture module" },
    { value: "Merit", label: "MSc Software Engineering" },
  ],
  skills: [
    "Kotlin",
    "Python",
    "SQL",
    "Flutter",
    "React",
    "TypeScript",
    "Firebase",
    "Flask",
    "Software Architecture",
    "Requirements & Testing",
  ],
};

export const education = {
  heading: "Education.",
  items: [
    {
      degree: "MSc Software Engineering",
      school: "Kingston University, UK",
      period: "2023 – 2024",
      detail: "Graduated with Merit",
      modules: [
        "Software Architecture & Programming Models · 83%",
        "Agile Project Development · 70%",
        "Software Quality Engineering · 68%",
        "Applied Data Programming · 67%",
        "Project Dissertation: Electronic Marketplace Android app · 60%",
      ],
    },
    {
      degree: "BSc (Hons) Computing",
      school: "London Metropolitan University, via Islington College, Nepal",
      period: "2018 – 2021",
      detail: "Graduated with First Class Honours",
      modules: [
        "Software Engineering",
        "Advanced Database Systems Development",
        "Application Development",
        "Artificial Intelligence",
        "Networks and Operating Systems",
        "Final Year Project",
      ],
    },
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
  subheading: "Apps and case studies I've built.",
  projects: [
    {
      title: "eShop",
      description: "An Android marketplace where users list and buy used electronic devices. Built for my master's dissertation.",
      tags: ["Kotlin", "Firebase", "Android"],
      href: "https://github.com/basanttamang/eshop",
      gradient: "linear-gradient(135deg, #ff9a8b 0%, #ff6a88 55%, #ff99ac 100%)",
      graphic: "store",
    },
    {
      title: "Ward Office Appointment System",
      description: "An online booking system for ward offices, from citizen interviews and an SRS to an OpenAPI spec and a working prototype.",
      tags: ["SRS", "OpenAPI", "UAT"],
      href: "https://github.com/basanttamang/ward-appointment-system",
      gradient: "linear-gradient(135deg, #a1c4fd 0%, #6f86d6 100%)",
      graphic: "kanban",
    },
    {
      title: "Birth Register Migration",
      description: "Profiled a messy register of 2,000 records, designed the data model and migrated 1,883 with zero reconciliation mismatches.",
      tags: ["Python", "SQL", "Data Modelling"],
      href: "https://github.com/basanttamang/bith-register-migration",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      graphic: "chart",
    },
    {
      title: "K Wallpapers",
      description: "A Korean wallpaper app, published on the Google Play Store.",
      tags: ["Flutter", "Dart", "Android"],
      href: "https://play.google.com/store/apps/details?id=com.basanttamang.kwallpapers",
      gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
      graphic: "brand",
    },
    {
      title: "Expense Tracker",
      description: "A web app that helps you track your expenses.",
      tags: ["Python", "Flask", "HTML"],
      href: "https://github.com/basanttamang/expenses",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38a3a5 100%)",
      graphic: "weather",
    },
    {
      title: "Sifaris Feasibility Study",
      description: "Compared four ways to digitise ward recommendation letters, scored on cost, risk and benefit, with a phased rollout.",
      tags: ["Feasibility", "Options Analysis"],
      href: "https://github.com/basanttamang/digital-recommendation-letter--sifaris-",
      gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      graphic: "map",
    },
  ] satisfies Project[],
};

export const contact = {
  heading: "Let's work together.",
  subheading: "Have a project in mind or just want to say hi? I'd love to hear from you.",
  email: "basanttamang8@gmail.com",
  phone: "+977 9818163073",
  location: "Kathmandu, Nepal",
  timeZone: "Asia/Kathmandu",
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
