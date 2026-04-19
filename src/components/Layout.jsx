import { useEffect, useState } from "react";
import Cover from "./Cover";
import SidebarNav from "./SidebarNav";
import MobileTopBar from "./MobileTopBar";

import Projects from "./Projects";
import Skills from "./Skills";
import Experience from "./Experience";
import Education from "./Education";

import { sections } from "../config/sections";
import { heroBackgroundStyle } from "../config/heroTheme";

export default function Layout() {
  const [activeSection, setActiveSection] = useState("about");
  const [isPastHero, setIsPastHero] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("cover-content-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { threshold: 1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrolling) return;

      let current = sections[0].id;

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = s.id;
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScrolling]);

  const jumpTo = (id) => {
    setIsManualScrolling(true);
    setActiveSection(id);

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    let t;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        setIsManualScrolling(false);
        window.removeEventListener("scroll", onScroll);
      }, 120);
    };

    window.addEventListener("scroll", onScroll);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* ================= HERO (with background image) ================= */}
      <div className="relative">
        {/* Background image */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={heroBackgroundStyle}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 -z-10 bg-black/60" />


        {/* Cover */}
        <Cover
          activeSection={activeSection}
          onJump={jumpTo}
        />
      </div>

      {/* Mobile Top Bar (anchored below cover, fades in) */}
      <MobileTopBar
        activeSection={activeSection}
        onJump={jumpTo}
        visible={isPastHero}
      />

      {/* ================= MAIN LAYOUT ================= */}
      <div className="lg:grid lg:grid-cols-[260px,1fr]">
        
        {/* Sidebar */}
        <SidebarNav
          activeSection={activeSection}
          visible={isPastHero}
          onJump={jumpTo}
        />

        {/* MAIN CONTENT */}
        <main className="px-6 lg:px-10 py-6 w-full">
          <div className="max-w-6xl mx-auto">

            <section id="skills" className="py-16">
              <Skills onShowProjects={() => jumpTo("projects")} />
            </section>

            <section id="experience" className="py-16">
              <Experience />
            </section>

            <section id="education" className="py-16">
              <Education />
            </section>

            <section id="projects" className="py-16">
              <Projects />
            </section>

            <section id="contact" className="py-20">
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p className="text-gray-300">Your contact info here</p>
            </section>

          </div>
        </main>
      </div>

      {/* ================= MOBILE CONTENT (below hero) ================= */}
      <div className="lg:hidden px-6">
        <section id="skills" className="py-16">
          <Skills onShowProjects={() => jumpTo("projects")} />
        </section>

        <section id="experience" className="py-16">
          <Experience />
        </section>

        <section id="education" className="py-16">
          <Education />
        </section>

        <section id="projects" className="py-16">
          <Projects />
        </section>

        <section id="contact" className="py-20">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        </section>
      </div>
    </div>
  );
}