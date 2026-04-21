
import { useEffect, useRef, useState } from "react";
import { getSectionStyleVars, getSectionTheme, sections } from "../config/sections";
import { heroBackgroundStyle } from "../config/heroTheme";
import { about } from "../data/about";

export default function SidebarNav({ activeSection, visible, onJump }) {


  const navThemeVars = getSectionStyleVars(activeSection);
  const sectionBg = getSectionTheme(activeSection).activeBackground;
  const btnRefs = useRef({});
  const [stretchable, setStretchable] = useState({});

  useEffect(() => {
    function checkStretchable() {
      const updates = {};
      for (const s of sections) {
        const btn = btnRefs.current[s.id];
        const sectionEl = document.getElementById(s.id);
        if (!btn || !sectionEl) {
          updates[s.id] = false;
          continue;
        }
        const btnRect = btn.getBoundingClientRect();
        const sectionRect = sectionEl.getBoundingClientRect();
        // Check if the button is fully vertically contained in the section's viewport
        updates[s.id] =
          btnRect.top >= sectionRect.top &&
          btnRect.bottom <= sectionRect.bottom;
      }
      setStretchable(updates);
    }
    window.addEventListener("scroll", checkStretchable, { passive: true });
    window.addEventListener("resize", checkStretchable, { passive: true });
    checkStretchable();
    return () => {
      window.removeEventListener("scroll", checkStretchable);
      window.removeEventListener("resize", checkStretchable);
    };
  }, []);

  return (
    <aside
      className={`relative hidden lg:flex flex-col items-center text-center gap-5 bg-gray-950 bg-cover bg-center bg-no-repeat p-6 transition-all duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ ...heroBackgroundStyle, ...navThemeVars, "--section-bg": sectionBg }}
    >
      {/* DARK OVERLAY for readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10 sticky top-0 flex w-full flex-col items-center gap-5 pt-6">
        <img
          src={about.picture}
          alt={about.name}
          className="w-20 h-20 rounded-2xl object-contain"
        />

        <div>
          <h2 className="text-lg font-semibold">{about.name}</h2>
          <p className="text-sm text-gray-400">
            {about.headline_short?.[0] ?? ""}
          </p>
        </div>

        <nav className="w-full flex flex-col gap-2 mt-4 px-2">
          {sections.map((s) => {
            const sectionVars = getSectionStyleVars(s.id);
            const isActive = activeSection === s.id;
            const shouldStretch = isActive && stretchable[s.id];
            return (
              <button
                key={s.id}
                ref={el => (btnRefs.current[s.id] = el)}
                onClick={() => onJump(s.id)}
                className={`sidebar-tab-btn text-left px-3 py-2 border text-sm transition-all duration-200 ${
                  isActive ? "sidebar-tab-selected" : "sidebar-tab-idle"
                }${shouldStretch ? " sidebar-tab-active" : ""}`}
                style={isActive ? undefined : sectionVars}
              >
                {s.label}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}