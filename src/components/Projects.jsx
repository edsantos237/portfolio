import { useEffect, useMemo, useState } from "react";
import { projects } from "../data/projects";
import { companies } from "../data/experience";
import { schools } from "../data/education";
import { skills, categories, getSkillCategoryId } from "../data/skills";
import ProjectCard from "./ProjectCard";
import FilterDropdown from "./FilterDropdown";
import FilterChips from "./FilterChips";
import FilterPanel from "./FilterPanel";
import Icon from "./Icon";
import { getSectionTheme } from "../config/sections";

export default function Projects({ focusedSkill, setFocusedSkill, focusedCompany, setFocusedCompany, focusedActivity, setFocusedActivity, focusedProjectFilters, setFocusedProjectFilters, focusedAcademic, setFocusedAcademic, isActive, onProjectClick }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const [selectedProfessional, setSelectedProfessional] = useState([]);
  const [selectedAcademic, setSelectedAcademic] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [personalSelected, setPersonalSelected] = useState(false);
  const [featuredSelected, setFeaturedSelected] = useState(true);

  // Wrapped setters: enabling any filter disables Featured
  const wrappedSetSelectedProfessional = (valueOrUpdater) => {
    setSelectedProfessional((prev) => {
      const next = typeof valueOrUpdater === 'function' ? valueOrUpdater(prev) : valueOrUpdater;
      if (Array.isArray(next) && next.length > 0) setFeaturedSelected(false);
      return next;
    });
  };

  const wrappedSetSelectedAcademic = (valueOrUpdater) => {
    setSelectedAcademic((prev) => {
      const next = typeof valueOrUpdater === 'function' ? valueOrUpdater(prev) : valueOrUpdater;
      if (Array.isArray(next) && next.length > 0) setFeaturedSelected(false);
      return next;
    });
  };

  const wrappedSetSelectedSkills = (valueOrUpdater) => {
    setSelectedSkills((prev) => {
      const next = typeof valueOrUpdater === 'function' ? valueOrUpdater(prev) : valueOrUpdater;
      if (Array.isArray(next) && next.length > 0) setFeaturedSelected(false);
      return next;
    });
  };

  const wrappedSetPersonal = (valueOrUpdater) => {
    setPersonalSelected((prev) => {
      const next = typeof valueOrUpdater === 'function' ? valueOrUpdater(prev) : valueOrUpdater;
      if (next) setFeaturedSelected(false);
      return next;
    });
  };

  const baseProjects = useMemo(
    () => featuredSelected ? projects.filter((project) => project.tags.includes("featured")) : projects,
    [featuredSelected]
  );

  // 🔥 Apply skill from Skills section
  useEffect(() => {
    if (focusedSkill) {
      // Reset other filters and set only the focused skill
      setSelectedProfessional([]);
      setSelectedAcademic([]);
      setPersonalSelected(false);
      setFeaturedSelected(false);
      setOpenDropdown(null);
      setSelectedSkills([focusedSkill]);
      setFocusedCompany(null);
      setFocusedActivity(null);
      const section = document.getElementById("projects");
      section?.scrollIntoView({ behavior: "smooth" });
      setFocusedSkill(null);
    }
  }, [focusedSkill]);


  // 🔥 Apply company from Experience section
  useEffect(() => {
    if (focusedCompany) {
      setSelectedProfessional([focusedCompany]);
      setSelectedSkills([]);
      setSelectedAcademic([]);
      setPersonalSelected(false);
      setFeaturedSelected(false);
      setFocusedSkill(null);
      setFocusedActivity(null);
      const section = document.getElementById("projects");
      section?.scrollIntoView({ behavior: "smooth" });
      setFocusedCompany(null);
    }
  }, [focusedCompany]);

  // 🔥 Apply school from Education section
  useEffect(() => {
    if (focusedAcademic) {
      setSelectedAcademic([focusedAcademic]);
      setSelectedSkills([]);
      setSelectedProfessional([]);
      setPersonalSelected(false);
      setFeaturedSelected(false);
      setFocusedSkill(null);
      setFocusedActivity(null);
      const section = document.getElementById("projects");
      section?.scrollIntoView({ behavior: "smooth" });
      setFocusedAcademic(null);
    }
  }, [focusedAcademic]);

  useEffect(() => {
    if (!Array.isArray(focusedProjectFilters) || focusedProjectFilters.length === 0) {
      return;
    }

    setSelectedProfessional(
      focusedProjectFilters.filter((filter) =>
        companies.some((company) => company.id === filter)
      )
    );
    setSelectedAcademic(
      focusedProjectFilters.filter((filter) =>
        schools.some((school) => school.id === filter)
      )
    );
    setSelectedSkills(
      focusedProjectFilters.filter((filter) =>
        skills.some((skill) => skill.id === filter)
      )
    );
    setPersonalSelected(focusedProjectFilters.includes("personal"));
    // Featured only when the filters include only `featured` and nothing else
    const hasOther = focusedProjectFilters.some((f) => f !== "featured");
    setFeaturedSelected(focusedProjectFilters.includes("featured") && !hasOther);
    setOpenDropdown(null);
    setFocusedSkill(null);
    setFocusedCompany(null);
    setFocusedActivity(null);
    setFocusedAcademic(null);
    const section = document.getElementById("projects");
    section?.scrollIntoView({ behavior: "smooth" });
    setFocusedProjectFilters(null);
  }, [focusedProjectFilters, setFocusedActivity, setFocusedAcademic, setFocusedCompany, setFocusedProjectFilters, setFocusedSkill]);

  // 🔥 Apply activity from Activities section
  useEffect(() => {
    if (focusedActivity) {
      setSelectedProfessional([]);
      setSelectedSkills([]);
      setSelectedAcademic([]);
      setPersonalSelected(false);
      setFeaturedSelected(false);
      setFocusedSkill(null);
      setFocusedCompany(null);
      // Try to filter by activity tag
      setOpenDropdown(null);
      // Not all activities are tags, but if present, filter
      // (projects may use activity title as tag)
      // This will filter by activity tag if present
      setSelectedSkills([]);
      setSelectedProfessional([]);
      setSelectedAcademic([]);
      setPersonalSelected(false);
      // Add activity tag to selectedOrigins
      setSelectedProfessional([]);
      setSelectedAcademic([]);
      setSelectedSkills([]);
      setPersonalSelected(false);
      // Use selectedProfessional for activityTitle
      setSelectedProfessional([focusedActivity]);
      const section = document.getElementById("projects");
      section?.scrollIntoView({ behavior: "smooth" });
      setFocusedActivity(null);
    }
  }, [focusedActivity]);

  const toggleInList = (list, value) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const clearAll = () => {
    setSelectedProfessional([]);
    setSelectedAcademic([]);
    setSelectedSkills([]);
    setPersonalSelected(false);
    setFeaturedSelected(false);
    setOpenDropdown(null);
  };

  const selectedOrigins = [
    ...selectedProfessional,
    ...selectedAcademic,
    ...(personalSelected ? ["personal"] : []),
  ];

  const filteredProjects = baseProjects.filter((p) => {
    const originMatch =
      selectedOrigins.length === 0 ||
      p.tags.some((t) => selectedOrigins.includes(t));

    const skillMatch =
      selectedSkills.length === 0 ||
      p.tags.some((t) => selectedSkills.includes(t));

    return originMatch && skillMatch;
  });

  const activeProfessional = companies.filter((c) =>
    selectedProfessional.includes(c.id)
  );
  const activeAcademic = schools.filter((s) =>
    selectedAcademic.includes(s.id)
  );
  const activeSkills = skills.filter((s) =>
    selectedSkills.includes(s.id)
  );

  const skillOrder = categories.map((c) => c.id);
  const skillLabels = Object.fromEntries(categories.map((c) => [c.id, c.title]));

  const companiesWithProjects = useMemo(() =>
    companies.filter((c) => projects.some((p) => p.tags.includes(c.id))),
  []);

  const schoolsWithProjects = useMemo(() =>
    schools.filter((s) => projects.some((p) => p.tags.includes(s.id))),
  []);

  const hasPersonalProjects = useMemo(() =>
    projects.some((p) => p.tags.includes("personal")),
  []);

  const skillGroups = useMemo(() => {
    const skillsWithProjects = skills.filter((skill) =>
      projects.some((p) => p.tags.includes(skill.id))
    );
    return skillsWithProjects.reduce((acc, skill) => {
      const type = getSkillCategoryId(skill);
      if (!acc[type]) acc[type] = [];
      acc[type].push(skill);
      return acc;
    }, {});
  }, []);

  const chips = {
    featured: featuredSelected,
    professional: activeProfessional,
    academic: activeAcademic,
    personal: personalSelected,
    skills: activeSkills,
    onRemoveFeatured: () => setFeaturedSelected(false),
    onRemoveProfessional: (id) =>
      setSelectedProfessional((p) => p.filter((v) => v !== id)),
    onRemoveAcademic: (id) =>
      setSelectedAcademic((p) => p.filter((v) => v !== id)),
    onRemovePersonal: () => setPersonalSelected(false),
    onRemoveSkill: (id) =>
      setSelectedSkills((p) => p.filter((v) => v !== id)),
  };

  const renderProjectSkills = (project) => {
    const projectSkills = project.tags
      .map((tag) => skills.find((s) => s.id === tag))
      .filter(Boolean);

    // Group by category, sort alphabetically within each
    const grouped = projectSkills.reduce((acc, skill) => {
      const type = getSkillCategoryId(skill);
      if (!acc[type]) acc[type] = [];
      acc[type].push(skill);
      return acc;
    }, {});

    return skillOrder.flatMap((type) =>
      (grouped[type] || []).slice().sort((a, b) => a.title.localeCompare(b.title))
    );
  };

  return (
    <section id="projects" className="py-16">
      {/* Sticky header and filter bar */}
      <div
        className="sticky top-12 lg:top-0 z-40 backdrop-blur border-b mb-6 relative transition-colors duration-300"
        style={{
          backgroundColor: isActive ? 'var(--section-active-bg)' : 'var(--section-base-bg)',
          borderBottomColor: isActive ? getSectionTheme("projects").accentBorder : getSectionTheme("projects").controlBorder
        }}
      >
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{ backgroundColor: isActive ? 'var(--section-sticky-overlay)' : 'transparent' }}
        />
        <div className="relative pt-4">
          <h2 className="text-3xl font-bold mb-2">Projects</h2>
          {/* FILTER BAR */}
          <FilterPanel
            leadingControls={[
              {
                id: "projects-featured",
                label: "Featured",
                active: featuredSelected,
                onClick: () => setFeaturedSelected((value) => {
                  const next = !value;
                  if (next) {
                    // enabling Featured clears all other filters
                    setSelectedProfessional([]);
                    setSelectedAcademic([]);
                    setSelectedSkills([]);
                    setPersonalSelected(false);
                    setOpenDropdown(null);
                  }
                  return next;
                }),
              },
            ]}
            filters={[
              {
                id: "prof",
                label: "Professional",
                group: "associations",
                items: companiesWithProjects,
                selected: selectedProfessional,
                setSelected: wrappedSetSelectedProfessional,
              },
              {
                id: "acad",
                label: "Academic",
                group: "associations",
                items: schoolsWithProjects,
                selected: selectedAcademic,
                setSelected: wrappedSetSelectedAcademic,
              },
              {
                id: "skills",
                label: "Skills",
                group: "skills",
                grouped: skillGroups,
                order: skillOrder,
                labels: skillLabels,
                selected: selectedSkills,
                setSelected: wrappedSetSelectedSkills,
              },
            ]}
            personal={hasPersonalProjects ? {
              value: personalSelected,
              setValue: wrappedSetPersonal,
            } : null}
            onClearAll={clearAll}
            chips={chips}
          />
        </div>
      </div>

      {/* PROJECTS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={`${project.title}-${index}`}
            project={project}
            orderedSkills={renderProjectSkills(project)}
            companies={companies}
            schools={schools}
            onProjectClick={onProjectClick}
          />
        ))}
      </div>

      {featuredSelected && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setFeaturedSelected(false);
              const section = document.getElementById("projects");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button`}
          >
            {`Show all projects (${projects.length})`}
          </button>
        </div>
      )}
    </section>
  );
}