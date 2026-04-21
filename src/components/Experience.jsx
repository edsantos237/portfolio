import { useState, useMemo } from "react";
import { getSectionTheme } from "../config/sections";
import { companies } from "../data/experience";
import { projects } from "../data/projects";
import ExperienceCard from "./ExperienceCard";
import VerticalTimeline from "./VerticalTimeline";

export default function Experience({ isActive, onShowProjects }) {
  const sectionTheme = getSectionTheme("experience");
  // If only one company, sub-entries (roles) are selectable and always expanded
  const single = companies.length === 1;
  const [selectedId, setSelectedId] = useState(null);
  const [openId, setOpenId] = useState(single ? companies[0].id : null);

  // sort by most recent role start date
  const sorted = useMemo(
    () =>
      [...companies].sort((a, b) => {
        const aDate = a.roles?.[0]?.date?.start || "";
        const bDate = b.roles?.[0]?.date?.start || "";
        return bDate.localeCompare(aDate);
      }),
    []
  );

  // Timeline: if single, use roles as entries; else, use companies
  const timelineEntries = useMemo(() => {
    if (single) {
      const company = companies[0];
      return company.roles.map((role, idx) => ({
        id: `${company.id}__role${idx}`,
        startDate: role.date?.start,
        endDate: role.date?.end,
      }));
    } else {
      return sorted.map((company) => {
        const starts = company.roles.map((r) => r.date?.start).filter(Boolean);
        const ends = company.roles.map((r) => r.date?.end).filter(Boolean);
        const startDate = starts.sort()[0];
        const endDate = ends.length === company.roles.length ? ends.sort().at(-1) : null;
        return { id: company.id, startDate, endDate };
      });
    }
  }, [single, companies, sorted]);

  // For single, highlight selected role; for multi, highlight selected company
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
		  <h2 className="text-3xl font-bold">Experience</h2>
		</div>
	  </div>

      <div className="flex gap-4 items-stretch">
        {/* Vertical timeline */}
        <VerticalTimeline entries={timelineEntries} activeId={activeId} />

        {/* Cards */}
        <div className="flex-1 space-y-10">
          {sorted.map((company, cidx) => {
            // Only show button if entry is open/selected (not sub-entry)
            const isEntryOpen = single || openId === company.id;
            // Count projects with this company id as tag
            const projectCount = projects.filter(p => p.tags.includes(company.id)).length;
            return (
              <ExperienceCard
                key={company.id}
                company={company}
                open={isEntryOpen}
                onToggle={single ? undefined : () => setOpenId(openId === company.id ? null : company.id)}
                forceOpen={single}
                roleSelectable={single}
                selectedRoleId={selectedId}
                onSelectRole={single ? (idx) => {
                  const roleId = `${company.id}__role${idx}`;
                  setSelectedId(selectedId === roleId ? null : roleId);
                } : undefined}
                showProjectsButton={isEntryOpen && projectCount > 0}
                projectCount={projectCount}
                onShowProjects={() => onShowProjects && onShowProjects(company.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}