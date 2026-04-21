import { useState, useMemo } from "react";
import { getSectionTheme } from "../config/sections";
import { schools } from "../data/education";
import { projects } from "../data/projects";
import EducationCard from "./EducationCard";
import VerticalTimeline from "./VerticalTimeline";

export default function Education({ isActive, onShowProjects }) {
  const sectionTheme = getSectionTheme("education");
  const single = schools.length === 1;
  const [selectedId, setSelectedId] = useState(null);
  const [openId, setOpenId] = useState(single ? schools[0].id : null);

  const sorted = useMemo(
    () =>
      [...schools].sort((a, b) =>
        (b.date?.start || "").localeCompare(a.date?.start || "")
      ),
    []
  );

  // Timeline: if single, use degrees as entries; else, use schools
  const timelineEntries = useMemo(() => {
    if (single) {
      const school = schools[0];
      // Use each degree as a timeline entry, using school date for all
      return (school.degrees || []).map((deg, idx) => ({
        id: `${school.id}__deg${idx}`,
        startDate: school.date?.start,
        endDate: school.date?.end,
      }));
    } else {
      return sorted.map((school) => ({
        id: school.id,
        startDate: school.date?.start,
        endDate: school.date?.end,
      }));
    }
  }, [single, schools, sorted]);

  const activeId = single ? selectedId : openId;

  return (
    <section className="py-16">
      {/* Sticky header */}
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
		  <h2 className="text-3xl font-bold">Education</h2>
		</div>
	  </div>

      <div className="flex gap-4 items-stretch">
        {/* Vertical timeline */}
        <VerticalTimeline entries={timelineEntries} activeId={activeId} />

        {/* Cards */}
        <div className="flex-1 space-y-10">
          {sorted.map((school, sidx) => {
            const isEntryOpen = single || openId === school.id;
            const projectCount = projects.filter(p => p.tags.includes(school.id)).length;
            return (
              <EducationCard
                key={school.id}
                school={school}
                open={isEntryOpen}
                onToggle={single ? undefined : () => setOpenId(openId === school.id ? null : school.id)}
                forceOpen={single}
                degreeSelectable={single}
                selectedDegreeId={selectedId}
                onSelectDegree={single ? (idx) => setSelectedId(`${school.id}__deg${idx}`) : undefined}
                showProjectsButton={isEntryOpen && projectCount > 0}
                projectCount={projectCount}
                onShowProjects={() => onShowProjects && onShowProjects(school.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}