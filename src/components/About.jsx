import { about, hobbies, strengths, languages } from "../data/about";
import { getSectionTheme } from "../config/sections";
import Icon from "./Icon";
import { useState } from "react";

function calculateAge(birthdate) {
  if (!birthdate) return null;
  const bd = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - bd.getFullYear();
  const m = today.getMonth() - bd.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) {
    age--;
  }
  return age;
}

export default function About({ isActive }) {
  const age = calculateAge(about.birthdate);
  const [openStrength, setOpenStrength] = useState(null);
  const sectionTheme = getSectionTheme("about-me");

  return (
    <div>
      <div
        className="sticky top-12 lg:top-0 z-40 backdrop-blur border-b mb-6 relative transition-colors duration-300"
        style={{
          backgroundColor: isActive ? 'var(--section-active-bg)' : 'var(--section-base-bg)',
          borderBottomColor: isActive ? sectionTheme.accentBorder : sectionTheme.controlBorder
        }}
      >
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{ backgroundColor: isActive ? sectionTheme.stickyActiveOverlay : "transparent" }}
        />
        <div className="relative pt-4">
          <h2 className="text-3xl font-bold mb-2">About me</h2>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 border rounded-xl p-5 section-card" style={{ scrollMarginTop: '10rem' }}>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Who am I?</h3>
            <div className="text-gray-300 space-y-3">
              {about.summary.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="md:col-span-1 border rounded-xl p-5 section-card" style={{ scrollMarginTop: '10rem' }}>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Details</h3>
            <div className="text-gray-300 space-y-3">
              <div>
                <div className="text-xs text-gray-400">Full name</div>
                <div className="font-medium">{about.full_name}</div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Age</div>
                <div className="font-medium">{age ?? "—"}</div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Address</div>
                <div className="font-medium">{about.address}</div>
              </div>

              <div>
                <div className="text-xs text-gray-400">Driver's license</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(about.drivers_license || []).map((d) => (
                    <span key={d} className="px-2 py-1 rounded border text-xs section-chip">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="border rounded-xl p-5 section-card" style={{ scrollMarginTop: '10rem' }}>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Hobbies</h3>
            <div className="grid grid-cols-2 gap-3">
              {hobbies.map((h) => {
                const IconComp = h.icon?.value;
                return (
                  <div key={h.title} className="flex min-w-0 items-center gap-3 px-3 py-2 rounded-lg border section-chip">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-gray-300">
                      {IconComp ? <IconComp className="w-5 h-5" /> : null}
                    </div>
                    <div className="text-sm text-gray-300 break-words">{h.title}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border rounded-xl p-5 section-card" style={{ scrollMarginTop: '10rem' }}>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Strengths</h3>
            <div className="space-y-3">
              {strengths.map((s, idx) => {
                const isOpen = openStrength === idx;
                return (
                  <div key={s.title}>
                    <button
                      onClick={() => setOpenStrength(isOpen ? null : idx)}
                      className={`
                        group flex items-center gap-3 px-3 py-2 
                        transition-all duration-200 text-left w-full h-full border
                        ${isOpen ? 'rounded-t-lg relative z-10 shadow-[0_10px_20px_-8px_rgba(0,0,0,0.7)]' : 'rounded-lg'}
                        ${
                          isOpen
                            ? "section-control-active"
                            : "section-control-idle"
                        }
                      `}
                    >
                      <span className="text-gray-400 text-sm mr-3">{isOpen ? "−" : "+"}</span>

                      <div className={`${isOpen ? "" : "text-gray-300"}`} style={isOpen ? { color: "var(--section-accent-text)" } : undefined}>
                        <h4 className="text-sm font-semibold">{s.title}</h4>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="-mt-1 rounded-b-lg border border-t-0 p-5 text-sm text-gray-300 relative z-0 section-card">
                        {s.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border rounded-xl p-5 section-card" style={{ scrollMarginTop: '10rem' }}>
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Languages</h3>
            <div className="space-y-4">
              {languages.map((l) => {
                const percent = Math.round((l.level / 5) * 100);
                return (
                  <div key={l.title}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-200">{l.title}</div>
                      </div>
                      <div className="text-xs text-gray-400">{l.proficiency}</div>
                    </div>

                    <div className="mt-2 w-full bg-gray-800 rounded-full h-2">
                      <div className="section-progress-fill h-2 rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}