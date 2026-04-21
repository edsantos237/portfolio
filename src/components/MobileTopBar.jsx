import { useRef, useEffect } from "react";
import { getSectionStyleVars, sections } from "../config/sections";

export default function MobileTopBar({ activeSection, onJump, visible }) {
  const buttonRefs = useRef({});
  const navThemeVars = getSectionStyleVars(activeSection);

  useEffect(() => {
    const btn = buttonRefs.current[activeSection];
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [activeSection]);

  return (
    <div id="mobile-top-bar" style={navThemeVars} className={`lg:hidden sticky top-0 z-50 border-b border-gray-800 bg-gray-950 transition-all duration-500 ${
      visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        {sections.map((s) => {
          const sectionVars = getSectionStyleVars(s.id);
          return (
            <button
              key={s.id}
              ref={(el) => (buttonRefs.current[s.id] = el)}
              onClick={() => onJump(s.id)}
              className={`px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap ${
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
  );
}