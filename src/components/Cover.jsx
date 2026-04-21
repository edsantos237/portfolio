import { useEffect, useRef, useState } from "react";
import { getSectionStyleVars, sections } from "../config/sections";
import { heroBackgroundStyle } from "../config/heroTheme";
import { about } from "../data/about";

export default function Cover({ activeSection, onJump }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [contentOffset, setContentOffset] = useState(0);
  const navThemeVars = getSectionStyleVars(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      const content = contentRef.current;
      if (!el || !content) return;
      const rect = el.getBoundingClientRect();

      if (rect.top >= 0) {
        setContentOffset(0);
        return;
      }

      const scrolled = -rect.top;
      const sectionH = el.offsetHeight;
      const contentH = content.offsetHeight;
      const bottomMargin = 48; // px gap before wrapper bottom
      // Ideal: center content in the visible portion
      const idealOffset = scrolled / 2;
      // Max: content bottom touches section bottom minus margin
      const maxOffset = sectionH - contentH - (sectionH - contentH) / 2 - bottomMargin;
      // (sectionH - contentH) / 2 is the initial top gap from flex centering

      setContentOffset(Math.min(idealOffset, Math.max(0, maxOffset)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="start"
      style={navThemeVars}
      className="relative h-screen min-h-screen grid place-items-center px-6 overflow-hidden"
    >
      {/* BACKGROUND IMAGE (fixed) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={heroBackgroundStyle}
      />

      {/* DARK OVERLAY for readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* CONTENT */}
      <div
        className="relative z-10 w-full max-w-5xl h-full flex items-center justify-center text-center px-6"
        style={{ transform: `translateY(${contentOffset}px)` }}
      >
        <div ref={contentRef} className="w-full">
          <div className="flex justify-center mb-6">
            <img
              src={about.picture}
              alt={about.name}
              className="w-40 h-40 sm:w-52 sm:h-52 rounded-3xl object-contain shadow-2xl"
            />
          </div>

          <p className="text-sm uppercase tracking-[0.25em] text-gray-400 mb-3">
            Portfolium Vitae
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            {about.name}
          </h1>

          <p className="mt-4 text-lg text-gray-300">
            {about.headline_long.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < about.headline_long.length - 1 && <br />}
              </span>
            ))}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {sections.map((s) => {
              const sectionVars = getSectionStyleVars(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => onJump(s.id)}
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    activeSection === s.id
                      ? "section-control-active"
                      : "section-control-idle"
                  }`}
                  style={activeSection === s.id ? undefined : sectionVars}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SEPARATOR */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-800" />

      {/* Sentinel: triggers nav bars when only margin is visible */}
      <div id="cover-content-sentinel" className="absolute bottom-12 left-0 right-0 h-px pointer-events-none" />
    </section>
  );
}