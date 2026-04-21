import { useEffect, useMemo, useState } from "react";
import { projects } from "../data/projects";
import { companies } from "../data/experience";
import { schools } from "../data/education";
import { skills } from "../data/skills";
import ProjectCard from "./ProjectCard";
import FilterDropdown from "./FilterDropdown";
import FilterChips from "./FilterChips";
import FilterPanel from "./FilterPanel";
import Icon from "./Icon";
import { getSectionTheme } from "../config/sections";

export default function Projects({ focusedSkill, setFocusedSkill, focusedCompany, setFocusedCompany, focusedActivity, setFocusedActivity, focusedAcademic, setFocusedAcademic, isActive }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const [selectedProfessional, setSelectedProfessional] = useState([]);
  const [selectedAcademic, setSelectedAcademic] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [personalSelected, setPersonalSelected] = useState(false);

  // 🔥 Apply skill from Skills section
  useEffect(() => {
    if (focusedSkill) {
      setSelectedSkills((prev) =>
        prev.includes(focusedSkill) ? prev : [focusedSkill]
      );
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
      setFocusedSkill(null);
      setFocusedActivity(null);
      const section = document.getElementById("projects");
      section?.scrollIntoView({ behavior: "smooth" });
      setFocusedAcademic(null);
    }
  }, [focusedAcademic]);

  // 🔥 Apply activity from Activities section
  useEffect(() => {
    if (focusedActivity) {
      setSelectedProfessional([]);
      setSelectedSkills([]);
      setSelectedAcademic([]);
      setPersonalSelected(false);
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
    setOpenDropdown(null);
  };

  const selectedOrigins = [
    ...selectedProfessional,
    ...selectedAcademic,
    ...(personalSelected ? ["personal"] : []),
  ];

  const filteredProjects = projects.filter((p) => {
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

  const skillOrder = ["language", "framework", "tool", "platform", "domain"];

  const skillLabels = {
    language: "Languages",
    framework: "Frameworks",
    tool: "Tools",
    platform: "Platforms",
    domain: "Domains",
  };

  const skillGroups = useMemo(() => {
    return skills.reduce((acc, skill) => {
      const type = skill.tags?.[0] || "tool";
      if (!acc[type]) acc[type] = [];
      acc[type].push(skill);
      return acc;
    }, {});
  }, []);

  const chips = {
    professional: activeProfessional,
    academic: activeAcademic,
    personal: personalSelected,
    skills: activeSkills,
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

    const grouped = projectSkills.reduce((acc, skill) => {
      const type = skill.tags?.[0] || "tool";
      if (!acc[type]) acc[type] = [];
      acc[type].push(skill);
      return acc;
    }, {});

    return skillOrder.flatMap((type) => grouped[type] || []);
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
            filters={[
              {
                id: "prof",
                label: "Professional",
                items: companies,
                selected: selectedProfessional,
                setSelected: setSelectedProfessional,
              },
              {
                id: "acad",
                label: "Academic",
                items: schools,
                selected: selectedAcademic,
                setSelected: setSelectedAcademic,
              },
              {
                id: "skills",
                label: "Skills",
                grouped: skillGroups,
                order: skillOrder,
                labels: skillLabels,
                selected: selectedSkills,
                setSelected: setSelectedSkills,
              },
            ]}
            personal={{
              value: personalSelected,
              setValue: setPersonalSelected,
            }}
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
          />
        ))}
      </div>
    </section>
  );
}