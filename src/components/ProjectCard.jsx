import Icon from "./Icon";
import { sources } from "../data/sources";
import ProjectStatusBadge, { getProjectBadgeTypes, getProjectCardBadgeWrapStyle } from "./ProjectStatusBadge";
import { groupDescriptionItems, renderGroups } from "../utils/descriptionRenderer.jsx";

function formatMonthYear(dateStr) {
  const [year, month] = dateStr.split("-");
  const date = new Date(year, month - 1);

  return {
    month: date.toLocaleString("en-US", { month: "short" }),
    year,
  };
}

function formatRange(date) {
  if (!date?.start) return null;

  const start = formatMonthYear(date.start);

  if (!date.end) {
    return `${start.month} ${start.year} — Present`;
  }

  const end = formatMonthYear(date.end);

  if (start.year !== end.year) {
    return `${start.month} ${start.year} — ${end.month} ${end.year}`;
  }

  if (start.month !== end.month) {
    return `${start.month} — ${end.month} ${start.year}`;
  }

  return `${start.month} ${start.year}`;
}

export default function ProjectCard({
  project,
  orderedSkills,
  companies,
  schools,
  projectsData,
  hasAssociatedPublications = false,
  onProjectClick,
}) {
  const dateLabel = formatRange(project.date);

  // 🔥 Resolve origin tags
  const origins = [];

  project.tags.forEach((tag) => {
    const company = companies.find((c) => c.id === tag);
    if (company) {
      origins.push({
        id: company.id,
        title: company.label ?? company.title,
        icon: company.icon,
      });
      return;
    }

    const school = schools.find((s) => s.id === tag);
    if (school) {
      origins.push({
        id: school.id,
        title: school.label ?? school.title,
        icon: school.icon,
      });
      return;
    }

    const proj = projectsData?.find((p) => p.id === tag);
    if (proj) {
      origins.push({
        id: proj.id,
        title: proj.label ?? proj.title,
        icon: proj.icon,
      });
      return;
    }

    if (tag === "personal") {
      origins.push({
        id: "personal",
        title: "Personal",
      });
    }
  });

  const badgeTypes = getProjectBadgeTypes(project, hasAssociatedPublications);
  const badgeWrapStyle = getProjectCardBadgeWrapStyle(badgeTypes.length);

  return (
    <div
      className="relative p-4 rounded-lg border h-full flex flex-col section-card cursor-pointer transition-colors section-soft-hover"
      onClick={() => onProjectClick?.(project.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onProjectClick?.(project.id); }}
    >
      <ProjectStatusBadge badges={badgeTypes} variant="card" />

      {/* HEADER */}
      <div className="mb-2">
        {badgeWrapStyle && (
          <div aria-hidden="true" style={badgeWrapStyle} />
        )}
        <h3 className="font-semibold text-white">
          {project.title}
        </h3>

        {dateLabel && (
          <p className="text-xs text-gray-500">
            {dateLabel}
          </p>
        )}
      </div>

      {/* ORIGIN TAGS */}
      {origins.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {origins.map((origin) => (
            <span
              key={origin.id}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip"
            >
              {origin.icon && <Icon icon={origin.icon} />}
              {origin.title}
            </span>
          ))}
        </div>
      )}

      {/* SUMMARY */}
      <div className="mb-4 flex-1">
        {Array.isArray(project.summary)
          ? renderGroups(groupDescriptionItems(project.summary), `project-summary-${project.id}`, null, { imageMaxH: 'max-h-48' })
          : project.summary && typeof project.summary === "object" && project.summary.type === "image"
            ? <img src={`res/${sources.res}/${project.summary.path}`} alt={project.title} className="w-full rounded-lg object-contain max-h-48" style={{ display: 'block', margin: '0 auto' }} loading="lazy" />
            : <p className="text-sm text-gray-400">{project.summary}</p>
        }
      </div>

      {/* SKILLS */}
      {orderedSkills.length > 0 && (
        <div className="flex flex-wrap-reverse justify-end gap-2 mt-auto" style={{ direction: 'rtl' }}>
          {orderedSkills.filter((skill) => !!skill.icon).slice().reverse().map((skill) => (
            <span
              key={skill.id}
              title={skill.title}
              aria-label={skill.title}
              className="flex items-center justify-center w-8 h-8 opacity-60"
              style={{ direction: 'ltr' }}
            >
              <Icon icon={skill.icon} className="w-4 h-4" />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}