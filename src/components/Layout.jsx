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
  const [focusedSkill, setFocusedSkill] = useState(null);

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

  const showProjectsForSkill = (skillId) => {
    setFocusedSkill(skillId);
    jumpTo("projects");
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
        <main className="w-full py-6">
            <section id="skills" className={`px-6 lg:px-10 py-16 border-b border-gray-800 transition-colors duration-300 ${
              activeSection === "skills" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <Skills onShowProjects={showProjectsForSkill} />
              </div>
            </section>

            <section id="experience" className={`px-6 lg:px-10 py-16 border-b border-gray-800 transition-colors duration-300 ${
              activeSection === "experience" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <Experience />
              </div>
            </section>

            <section id="education" className={`px-6 lg:px-10 py-16 border-b border-gray-800 transition-colors duration-300 ${
              activeSection === "education" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <Education />
              </div>
            </section>

            <section id="projects" className={`px-6 lg:px-10 py-16 border-b border-gray-800 transition-colors duration-300 ${
              activeSection === "projects" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <Projects focusedSkill={focusedSkill} setFocusedSkill={setFocusedSkill} />
              </div>
            </section>

            <section id="contact" className={`px-6 lg:px-10 py-20 transition-colors duration-300 ${
              activeSection === "contact" ? "bg-gray-900/25" : ""
            }`}>
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p className="text-gray-300">Your contact info here</p>
              </div>
            </section>
        </main>
      </div>

      {/* ================= MOBILE CONTENT (below hero) ================= */}
      <div className="lg:hidden px-6">
        <section id="skills" className={`py-16 border-b border-gray-800 transition-colors duration-300 ${
          activeSection === "skills" ? "bg-gray-900/25" : ""
        }`}>
          <Skills onShowProjects={showProjectsForSkill} />
        </section>

        <section id="experience" className={`py-16 border-b border-gray-800 transition-colors duration-300 ${
          activeSection === "experience" ? "bg-gray-900/25" : ""
        }`}>
          <Experience />
        </section>

        <section id="education" className={`py-16 border-b border-gray-800 transition-colors duration-300 ${
          activeSection === "education" ? "bg-gray-900/25" : ""
        }`}>
          <Education />
        </section>

        <section id="projects" className={`py-16 border-b border-gray-800 transition-colors duration-300 ${
          activeSection === "projects" ? "bg-gray-900/25" : ""
        }`}>
          <Projects focusedSkill={focusedSkill} setFocusedSkill={setFocusedSkill} />
        </section>

        <section id="contact" className={`py-20 transition-colors duration-300 ${
          activeSection === "contact" ? "bg-gray-900/25" : ""
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        </section>
      </div>
    </div>
  );
}