import SkillCategory from "./SkillCategory";
import FilterPanel from "./FilterPanel";
import { useState, useRef, useMemo, useEffect } from "react";
import { getSectionTheme } from "../config/sections";
import { skills } from "../data/skills";
import { projects } from "../data/projects";
import { companies } from "../data/experience";
import { schools } from "../data/education";

export default function Skills({ onShowProjects, isActive, isPrevious = false, activeAccentLine }) {
    const sectionTheme = getSectionTheme("skills");
    const headerBottomColor = isActive
        ? sectionTheme.accentBorder
        : isPrevious
        ? activeAccentLine
        : sectionTheme.controlBorder;
    const [selectedProfessional, setSelectedProfessional] = useState([]);
    const [selectedAcademic, setSelectedAcademic] = useState([]);
    const [personalSelected, setPersonalSelected] = useState(false);
    const [selectedSkillId, setSelectedSkillId] = useState(null);
    const categoryRefs = useRef({});
    const [rowMapByType, setRowMapByType] = useState({});

        const selectedOrigins = [
            ...selectedProfessional,
            ...selectedAcademic,
            ...(personalSelected ? ["personal"] : []),
        ];

        const filteredSkills = useMemo(() => {
            if (selectedOrigins.length === 0) return skills;
            return skills.filter((skill) =>
                projects.some(
                    (p) =>
                        p.tags.includes(skill.id) &&
                        p.tags.some((tag) => selectedOrigins.includes(tag))
                )
            );
        }, [selectedOrigins]);

        const typeOrder = ["language", "framework", "tool", "platform", "domain"];
        const typeLabels = {
            language: "Languages",
            framework: "Frameworks",
            tool: "Tools",
            platform: "Platforms",
            domain: "Domains",
        };

        const grouped = useMemo(() => {
            return filteredSkills.reduce((acc, skill) => {
                const type = skill.tags?.[0] || "tool";
                if (!acc[type]) acc[type] = [];
                acc[type].push(skill);
                return acc;
            }, {});
        }, [filteredSkills]);

        const getUsage = (skillId) => {
            const relatedProjects = projects.filter((p) =>
                p.tags.includes(skillId)
            );
            const professional = companies.filter((c) =>
                relatedProjects.some((p) => p.tags.includes(c.id))
            );
            const academic = schools.filter((s) =>
                relatedProjects.some((p) => p.tags.includes(s.id))
            );
            const personal = relatedProjects.some((p) =>
                p.tags.includes("personal")
            )
                ? [{ id: "personal", title: "Personal" }]
                : [];
            return { professional, academic, personal, relatedProjects };
        };

        const chips = {
            professional: companies.filter((c) =>
                selectedProfessional.includes(c.id)
            ),
            academic: schools.filter((s) =>
                selectedAcademic.includes(s.id)
            ),
            personal: personalSelected,
            skills: [],
            onRemoveProfessional: (id) =>
                setSelectedProfessional((p) => p.filter((v) => v !== id)),
            onRemoveAcademic: (id) =>
                setSelectedAcademic((p) => p.filter((v) => v !== id)),
            onRemovePersonal: () => setPersonalSelected(false),
            onRemoveSkill: () => { },
        };

        const clearAll = () => {
            setSelectedProfessional([]);
            setSelectedAcademic([]);
            setPersonalSelected(false);
            setSelectedSkillId(null);
        };

        useEffect(() => {
            const newRowMap = {};
            Object.entries(categoryRefs.current).forEach(([type, container]) => {
                if (!container) return;
                const nodes = container.querySelectorAll("[data-skill-id]");
                const map = {};
                let currentRowTop = null;
                let rowIndex = 0;
                nodes.forEach((node) => {
                    const rect = node.getBoundingClientRect();
                    if (currentRowTop === null) {
                        currentRowTop = rect.top;
                    }
                    if (Math.abs(rect.top - currentRowTop) > 5) {
                        rowIndex++;
                        currentRowTop = rect.top;
                    }
                    const id = node.getAttribute("data-skill-id");
                    map[id] = rowIndex;
                });
                newRowMap[type] = map;
            });
            setRowMapByType(newRowMap);
        }, [filteredSkills]);

        // Scroll category into view when a skill is selected
        useEffect(() => {
            if (!selectedSkillId) return;

            const skill = filteredSkills.find(s => s.id === selectedSkillId);
            if (!skill) return;
            const type = skill.tags?.[0] || 'tool';

            const container = categoryRefs.current[type];
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Fully visible → nothing to do
            if (rect.top >= 0 && rect.bottom <= viewportHeight) return;

            if (rect.height <= viewportHeight) {
                // Category fits in viewport - scroll to make it fully visible
                container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                // Category taller than viewport → scroll to the selected skill
                const skillEl = container.querySelector(`[data-skill-id="${selectedSkillId}"]`);
                if (skillEl) {
                    skillEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }, [selectedSkillId]);

        return (
            <section id="skills" className="py-16">
                <div
                    className="sticky top-12 lg:top-0 z-40 backdrop-blur border-b mb-6 relative transition-colors duration-300"
                    style={{
                        backgroundColor: isActive ? 'var(--section-active-bg)' : 'var(--section-base-bg)',
                        borderBottomColor: headerBottomColor
                    }}
                >
                    <div
                        className="absolute inset-0 transition-colors duration-300"
                        style={{ backgroundColor: isActive ? sectionTheme.stickyActiveOverlay : "transparent" }}
                    />
                    <div className="relative pt-4">
                        <h2 className="text-3xl font-bold mb-2">Skills</h2>
                        <FilterPanel
                            filters={[
                                {
                                    id: "skill-prof",
                                    label: "Professional",
                                    items: companies,
                                    selected: selectedProfessional,
                                    setSelected: setSelectedProfessional,
                                },
                                {
                                    id: "skill-acad",
                                    label: "Academic",
                                    items: schools,
                                    selected: selectedAcademic,
                                    setSelected: setSelectedAcademic,
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
                <div className="space-y-10">
                    {typeOrder.map((type) => {
                        const group = grouped[type];
                        if (!group) return null;
                        return (
                            <SkillCategory
                                key={type}
                                type={type}
                                label={typeLabels[type]}
                                skills={group}
                                rowMap={rowMapByType[type]}
                                containerRef={(el) => (categoryRefs.current[type] = el)}
                                selectedSkillId={selectedSkillId}
                                setSelectedSkillId={setSelectedSkillId}
                                getUsage={getUsage}
                                onShowProjects={onShowProjects}
                            />
                        );
                    })}
                </div>
            </section>
        );
}