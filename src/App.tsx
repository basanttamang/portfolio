import { MotionConfig } from "framer-motion";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Portfolio from "./components/Portfolio";

export default function App() {
  return (
    // reducedMotion="user": transform animations are skipped when the OS asks for less motion.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent-fill focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <section id="about" aria-label="About" className="min-h-svh">
          <Hero />
          <About />
        </section>
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
