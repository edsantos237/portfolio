import { useState, useMemo } from "react";
import { getSectionTheme } from "../config/sections";
import { activities } from "../data/activities";
import { companies } from "../data/experience";
import { schools } from "../data/education";
import { projects } from "../data/projects";
import Icon from "./Icon";
import ShowProjectsButton from "./ShowProjectsButton";
import { formatRange } from "../utils/dateFormat";
import VerticalTimeline from "./VerticalTimeline";

export default function Activities({ isActive, onShowProjects }) {
  const sectionTheme = getSectionTheme("activities");
  const single = activities.length === 1;
  const [selectedId, setSelectedId] = useState(null);
  const [openId, setOpenId] = useState(single ? activities[0].title : null);

  const sorted = useMemo(
    () =>
      [...activities].sort((a, b) => {
        const aDate = a.roles?.[0]?.date?.start || "";
        const bDate = b.roles?.[0]?.date?.start || "";
        return bDate.localeCompare(aDate);
      }),
    []
  );

  // Timeline: if single, use roles as entries; else, use activities
  const timelineEntries = useMemo(() => {
    if (single) {
      const act = activities[0];
      return act.roles.map((role, idx) => ({
        id: `${act.title}__role${idx}`,
        startDate: role.date?.start,
        endDate: role.date?.end,
      }));
    } else {
      return sorted.map((act) => {
        const starts = act.roles.map((r) => r.date?.start).filter(Boolean);
        const ends = act.roles.map((r) => r.date?.end).filter(Boolean);
        const startDate = starts.sort()[0];
        const endDate = ends.length === act.roles.length ? ends.sort().at(-1) : null;
        return { id: act.title, startDate, endDate };
      });
    }
  }, [single, activities, sorted]);

  const activeId = single ? selectedId : openId;

  return (
    <section id="activities" className="py-16">
      <div
        className="sticky top-12 lg:top-0 z-40 backdrop-blur border-b mb-10 relative transition-colors duration-300"
        style={{
          backgroundColor: isActive ? 'var(--section-active-bg)' : 'var(--section-base-bg)',
          borderBottomColor: isActive ? sectionTheme.accentBorder : sectionTheme.controlBorder
        }}
      >
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{ backgroundColor: isActive ? sectionTheme.stickyActiveOverlay : "transparent" }}
        />
        <div className="relative pt-4 pb-2">
          <h2 className="text-3xl font-bold">Activities</h2>
        </div>
      </div>

      <div className="flex gap-4 items-stretch">
        {/* Vertical timeline */}
        <VerticalTimeline entries={timelineEntries} activeId={activeId} />

        {/* Cards */}
        <div className="flex-1 space-y-10">

        {sorted.map((act, i) => {
          const isEntryOpen = single || openId === act.title;
          // Count projects with this activity title as tag
          const projectCount = projects.filter(p => p.tags.includes(act.title)).length;
          return (
            <div key={act.title} className="relative">
              <div className="flex flex-col gap-2">
                <button
                  onClick={single ? undefined : () => setOpenId(openId === act.title ? null : act.title)}
                  className={`w-full text-left flex items-center justify-between gap-4 ${single ? "cursor-default" : ""}`}
                  disabled={!!single}
                  tabIndex={single ? -1 : 0}
                >
                  <div>
                    <h3 className="text-lg font-semibold">{act.title}</h3>
                    {/** Origins (company / school / personal / raw tags) */}
                    {act.tags && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {act.tags.map((tag) => {
                          const company = companies.find((c) => c.id === tag);
                          if (company) {
                            return (
                              <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                                <Icon icon={company.icon} />
                                {company.title}
                              </span>
                            );
                          }

                          const school = schools.find((s) => s.id === tag);
                          if (school) {
                            return (
                              <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                                <Icon icon={school.icon} />
                                {school.title}
                              </span>
                            );
                          }

                          if (tag === "personal") {
                            return (
                              <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                                <Icon icon="user" />
                                Personal
                              </span>
                            );
                          }

                          if (tag === "volunteering") {
                            return (
                              <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                                <Icon icon="user" />
                                Volunteering
                              </span>
                            );
                          }

                          // fallback: render raw tag label
                          return (
                            <span key={tag} className="px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <span className="text-gray-400 text-sm">{single ? "−" : openId === act.title ? '−' : '+'}</span>
                </button>

                {/* Show Projects Button */}
                {isEntryOpen && projectCount > 0 && (
                  <ShowProjectsButton
                    className="ml-11 mt-1 shadow"
                    onClick={() => onShowProjects && onShowProjects(act.title)}
                    count={projectCount}
                  />
                )}
              </div>

              {/* Expanded roles (sub-entries) */}
              {(single || openId === act.title) && (
                <div className="mt-4 ml-11 space-y-6 border-l border-gray-800 pl-4">
                  {act.roles.map((role, idx) => {
                    const roleId = `${act.title}__role${idx}`;
                    const selected = single && roleId === selectedId;
                    return (
                      <div
                        key={idx}
                        className={`space-y-1 ${single ? "cursor-pointer rounded transition section-soft-hover" : ""} ${selected ? "section-soft-highlight section-outline-active border-l-4 pl-2" : ""}`}
                        onClick={single ? () => setSelectedId(roleId) : undefined}
                        tabIndex={single ? 0 : -1}
                      >
                        {role.title && <h4 className="font-medium text-gray-200">{role.title}</h4>}

                        <p className="text-xs text-gray-400">
                          {formatRange(role.date)}
                        </p>

                        {Array.isArray(role.description)
                          ? role.description.map((line, j) => (
                              <p key={j} className="text-sm text-gray-300">{line}</p>
                            ))
                          : <p className="text-sm text-gray-300">{role.description}</p>
                        }
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
    </section>
  );
}
