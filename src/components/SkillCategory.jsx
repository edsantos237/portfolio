import { Fragment, useMemo } from "react";
import SkillCard from "./SkillCard";

export default function SkillContainer({
    type,
    label,
    skills = [],
    rowMap = {},
    containerRef, // 👈 add this
    selectedSkillId,
    setSelectedSkillId,
    getUsage,
    onShowProjects,
}) {
    // ✅ SAFETY: ensure stable sorted array
    const sorted = useMemo(() => {
        if (!Array.isArray(skills)) return [];

        return [...skills].sort((a, b) =>
            (a.title || "").localeCompare(b.title || "")
        );
    }, [skills]);

    const selectedRow =
        selectedSkillId && rowMap?.[selectedSkillId] !== undefined
            ? rowMap[selectedSkillId]
            : null;

    return (
        <div
            ref={containerRef}
            className="border rounded-xl p-5 section-card"
            style={{ scrollMarginTop: '10rem' }}
        >
            <h3 className="text-lg font-semibold mb-4 text-gray-300">
                {label}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                {sorted.map((skill, index) => {
                    const currentRow = rowMap?.[skill.id];
                    const nextSkill = sorted[index + 1];
                    const nextRow = nextSkill ? rowMap?.[nextSkill.id] : null;

                    const isLastInSelectedRow =
                        selectedRow !== null &&
                        currentRow === selectedRow &&
                        (nextRow === null || nextRow !== currentRow);

                    const isSelected = selectedSkillId === skill.id;

                    return (
                        <Fragment key={skill.id}>
                            <div data-skill-id={skill.id} className="min-w-0">
                                <SkillCard
                                    skill={skill}
                                    active={isSelected}
                                    onClick={() =>
                                        setSelectedSkillId(
                                            isSelected ? null : skill.id
                                        )
                                    }
                                />
                            </div>

                            {isLastInSelectedRow && selectedSkillId && (() => {
                                const usage = getUsage(selectedSkillId);
                                const selectedSkill = sorted.find(
                                    (s) => s.id === selectedSkillId
                                );

                                if (!usage || !selectedSkill) return null;

                                return (
                                    <div className="col-span-full mt-4 border rounded-lg p-5 section-card-strong">
                                        <h4 className="text-white font-semibold mb-2">
                                            {selectedSkill.title}
                                        </h4>

                                        <div className="flex flex-wrap gap-2 text-xs mb-4">
                                            {usage.professional?.map((c) => (
                                                <span
                                                    key={c.id}
                                                    className="px-2 py-1 border rounded section-chip"
                                                >
                                                    {c.title}
                                                </span>
                                            ))}

                                            {usage.professional?.length > 0 &&
                                                (usage.academic?.length > 0 ||
                                                    usage.personal?.length > 0) && (
                                                    <span className="text-gray-600">|</span>
                                                )}

                                            {usage.academic?.map((s) => (
                                                <span
                                                    key={s.id}
                                                    className="px-2 py-1 border rounded section-chip"
                                                >
                                                    {s.title}
                                                </span>
                                            ))}

                                            {usage.academic?.length > 0 &&
                                                usage.personal?.length > 0 && (
                                                    <span className="text-gray-600">|</span>
                                                )}

                                            {usage.personal?.length > 0 && (
                                                <span className="px-2 py-1 border rounded section-chip">
                                                    Personal
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            onClick={() =>
                                                onShowProjects(selectedSkillId)
                                            }
                                            className="px-3 py-1.5 text-xs rounded border section-accent-button"
                                        >
                                            Show {usage.relatedProjects.length}{" "}
                                            {usage.relatedProjects.length === 1
                                                ? "project"
                                                : "projects"}
                                        </button>
                                    </div>
                                );
                            })()}
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
}