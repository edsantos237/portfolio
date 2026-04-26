import { useEffect, useState } from "react";
import Cover from "./Cover";
import SidebarNav from "./SidebarNav";
import MobileTopBar from "./MobileTopBar";
import About from "./About";

import Projects from "./Projects";
import ProjectPage from "./ProjectPage";
import Publications from "./Publications";
import Activities from "./Activities";
import Skills from "./Skills";
import Experience from "./Experience";
import Education from "./Education";
import Contact from "./Contact";

import { getSectionStyleVars, getSectionTheme, sections } from "../config/sections";
import { heroBackgroundStyle } from "../config/heroTheme";

export default function Layout() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [focusedSkill, setFocusedSkill] = useState(null);
  const [focusedCompany, setFocusedCompany] = useState(null);
  const [focusedActivity, setFocusedActivity] = useState(null);
  const [focusedActivityId, setFocusedActivityId] = useState(null);
  const [focusedProjectFilters, setFocusedProjectFilters] = useState(null);
  // Academic filter for Education → Projects
  const [focusedAcademic, setFocusedAcademic] = useState(null);
  // Focus filters for Skills (applied when jumping to Skills section)
  const [focusedSkillFilters, setFocusedSkillFilters] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const showProjectsForAcademic = (schoolId) => {
    setFocusedAcademic(schoolId);
    jumpTo("projects");
  };

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

      // Choose the section that currently has the largest visible height
      let bestId = sections[0].id;
      let bestVisible = -1;

      const vh = window.innerHeight || document.documentElement.clientHeight;

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        // compute visible vertical overlap between element and viewport
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, vh);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > bestVisible) {
          bestVisible = visibleHeight;
          bestId = s.id;
        }
      }

      // Always update active section (React will bail out if same)
      setActiveSection(bestId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isManualScrolling]);

  const jumpTo = (id) => {
    setIsManualScrolling(true);
    setActiveSection(id);

    const el = document.getElementById(id);
    if (!el) return;

    // Use explicit scrollTo with computed absolute offset for better
    // reliability across mobile browsers (address bar, transforms, etc.)
    const rect = el.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    // Subtract any visible sticky header (mobile top bar) height so the
    // target section isn't hidden under it after layout shifts.
    const mobileBar = document.getElementById("mobile-top-bar");
    const headerOffset = mobileBar ? mobileBar.offsetHeight : 0;
    const target = Math.max(0, absoluteTop - headerOffset);
    window.scrollTo({ top: target, behavior: "smooth" });

    let t;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        setIsManualScrolling(false);
        window.removeEventListener("scroll", onScroll);
      }, 600);
    };

    window.addEventListener("scroll", onScroll);
  };

  const showProjectsForSkill = (skillId) => {
    setFocusedSkill(skillId);
    jumpTo("projects");
  };
  const showSkillsForCompany = (companyId) => {
    setFocusedSkillFilters({ professional: [companyId], academic: [], personal: false });
    jumpTo("skills");
  };
  const showSkillsForAcademic = (schoolId) => {
    setFocusedSkillFilters({ professional: [], academic: [schoolId], personal: false });
    jumpTo("skills");
  };
  const showProjectsForCompany = (companyId) => {
    setFocusedCompany(companyId);
    jumpTo("projects");
  };
  const showProjectsForActivity = (activityTitle) => {
    setFocusedActivity(activityTitle);
    jumpTo("projects");
  };
  const showProjectsForFilters = (filters) => {
    setFocusedProjectFilters(filters);
    jumpTo("projects");
  };

  // Open a specific project (scroll to projects and open the project page)
  const showProject = (projectId) => {
    if (!projectId) return;
    if (activeSection === "projects") {
      setSelectedProjectId(projectId);
      return;
    }

    jumpTo("projects");
    // allow scroll animation to start before opening the modal
    setTimeout(() => setSelectedProjectId(projectId), 420);
  };

  // Generic handler for link objects that point to projects/activities
  const handleProjectLink = (link) => {
    if (!link) return;
    if (typeof link === "string") {
      // fallback: open external links in new tab
      window.open(link, "_blank");
      return;
    }

    if (link.type === "projects") {
      if (link.project) {
        showProject(link.project);
        return;
      }
      if (link.filters) {
        showProjectsForFilters(link.filters);
        return;
      }
    }

    if (link.type === "activities" && link.activity) {
      showProjectsForActivity(link.activity);
      return;
    }
  };
  const showActivityById = (activityId) => {
    setFocusedActivityId(activityId);
    jumpTo("activities");
  };

  const getSectionSurfaceStyle = (sectionId) => {
    const theme = getSectionTheme(sectionId);
    const activeSeparatorColor = getSectionTheme(activeSection).accentLine;
    const isActive = activeSection === sectionId;
    const sectionIndex = sections.findIndex((s) => s.id === sectionId);
    const isPreviousOfActive =
      sectionIndex >= 0 && sections[sectionIndex + 1]?.id === activeSection;

    return {
      ...getSectionStyleVars(sectionId),
      backgroundColor: isActive ? theme.activeBackground : theme.baseBackground,
      borderLeftColor: isActive ? theme.accentBorder : theme.controlBorder,
      borderBottomColor: isActive || isPreviousOfActive ? activeSeparatorColor : undefined,
    };
  };

  // index of the currently active section and the active section's accent line
  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const activeAccentLine = getSectionTheme(activeSection).accentLine;

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
        <main className="w-full pb-6">
            <section id="about-me" style={getSectionSurfaceStyle("about-me")} className="px-6 lg:px-10 py-16 border-b border-gray-800 lg:border-l transition-colors duration-300">
              <div className="max-w-6xl mx-auto">
                <About
                  isActive={activeSection === "about-me"}
                  onShowProjectFilters={showProjectsForFilters}
                  onShowActivity={showActivityById}
                  onProjectLink={handleProjectLink}
                />
              </div>
            </section>

            <section id="skills" style={getSectionSurfaceStyle("skills")} className="px-6 lg:px-10 py-16 border-b border-gray-800 lg:border-l transition-colors duration-300">
              <div className="max-w-6xl mx-auto">
                <Skills
                  onShowProjects={showProjectsForSkill}
                  isActive={activeSection === "skills"}
                  isPrevious={sections[activeIndex - 1]?.id === "skills"}
                  activeAccentLine={activeAccentLine}
                  focusFilters={focusedSkillFilters}
                  onClearFocusFilters={() => setFocusedSkillFilters(null)}
                />
              </div>
            </section>

            <section id="experience" style={getSectionSurfaceStyle("experience")} className="px-6 lg:px-10 py-16 border-b border-gray-800 lg:border-l transition-colors duration-300">
              <div className="max-w-6xl mx-auto">
                <Experience isActive={activeSection === "experience"} onShowProjects={showProjectsForCompany} onShowSkills={showSkillsForCompany} onProjectLink={handleProjectLink} />
              </div>
            </section>

            <section id="education" style={getSectionSurfaceStyle("education")} className="px-6 lg:px-10 py-16 border-b border-gray-800 lg:border-l transition-colors duration-300">
              <div className="max-w-6xl mx-auto">
                <Education isActive={activeSection === "education"} onShowProjects={showProjectsForAcademic} onShowSkills={showSkillsForAcademic} onProjectLink={handleProjectLink} />
              </div>
            </section>

            <section id="projects" style={getSectionSurfaceStyle("projects")} className="px-6 lg:px-10 py-16 border-b border-gray-800 lg:border-l transition-colors duration-300">
              <div className="max-w-6xl mx-auto">
                <Projects
                  focusedSkill={focusedSkill} setFocusedSkill={setFocusedSkill}
                  focusedCompany={focusedCompany} setFocusedCompany={setFocusedCompany}
                  focusedActivity={focusedActivity} setFocusedActivity={setFocusedActivity}
                  focusedProjectFilters={focusedProjectFilters} setFocusedProjectFilters={setFocusedProjectFilters}
                  focusedAcademic={focusedAcademic} setFocusedAcademic={setFocusedAcademic}
                  isActive={activeSection === "projects"}
                  onProjectClick={showProject}
                />
              </div>
            </section>

            <section id="publications" style={getSectionSurfaceStyle("publications")} className="px-6 lg:px-10 py-16 border-b border-gray-800 lg:border-l transition-colors duration-300">
              <div className="max-w-6xl mx-auto">
                <Publications isActive={activeSection === "publications"} />
              </div>
            </section>

            <section id="activities" style={getSectionSurfaceStyle("activities")} className="px-6 lg:px-10 py-16 border-b border-gray-800 lg:border-l transition-colors duration-300">
              <div className="max-w-6xl mx-auto">
                <Activities
                  isActive={activeSection === "activities"}
                  onShowProjects={showProjectsForActivity}
                  onProjectLink={handleProjectLink}
                  focusedActivityId={focusedActivityId}
                  setFocusedActivityId={setFocusedActivityId}
                />
              </div>
            </section>

            <section id="contact" style={getSectionSurfaceStyle("contact")} className="px-6 lg:px-10 py-20 lg:border-l transition-colors duration-300">
              <div className="max-w-6xl mx-auto">
                <Contact
                  isActive={activeSection === "contact"}
                  isPrevious={sections[activeIndex - 1]?.id === "contact"}
                  activeAccentLine={activeAccentLine}
                />
              </div>
            </section>
        </main>
      </div>

      {/* ── Project detail page overlay ── */}
      {selectedProjectId && (
        <ProjectPage
          projectId={selectedProjectId}
          onBack={() => setSelectedProjectId(null)}
          onProjectLink={handleProjectLink}
        />
      )}
    </div>
  );
}