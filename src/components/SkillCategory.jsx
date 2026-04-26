import { Fragment, useLayoutEffect, useMemo, useState, useRef } from "react";
import SkillCard from "./SkillCard";
import Icon from "./Icon";

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
    const [activeInspectorId, setActiveInspectorId] = useState(null);
    const [isActiveInspectorOpen, setIsActiveInspectorOpen] = useState(false);
    const [closingInspectorId, setClosingInspectorId] = useState(null);
    const [isClosingInspectorOpen, setIsClosingInspectorOpen] = useState(false);
    const [contentVisible, setContentVisible] = useState(true);
    const panelDuration = 300;
    const contentFadeDuration = 180;

    // ✅ SAFETY: ensure stable sorted array
    const sorted = useMemo(() => {
        if (!Array.isArray(skills)) return [];

        return [...skills].sort((a, b) =>
            (a.title || "").localeCompare(b.title || "")
        );
    }, [skills]);

    const skillIds = useMemo(
        () => new Set(sorted.map((skill) => skill.id)),
        [sorted]
    );

    const selectedSkillInCategory =
        selectedSkillId && skillIds.has(selectedSkillId)
            ? selectedSkillId
            : null;

    const prevSelectedRef = useRef(null);

    useLayoutEffect(() => {
        let timeoutId;
        let fadeTimeoutId;
        let animationFrameId;
        const prevSelected = prevSelectedRef.current;
        const prevSelectedInCategory =
            prevSelected && skillIds.has(prevSelected)
                ? prevSelected
                : null;

        const prevRow = prevSelectedInCategory ? rowMap?.[prevSelectedInCategory] : undefined;
        const newRow = selectedSkillInCategory ? rowMap?.[selectedSkillInCategory] : undefined;

        // No-op when unchanged
        if (prevSelectedInCategory === selectedSkillInCategory) {
            // nothing
        } else if (!prevSelectedInCategory && selectedSkillInCategory) {
            // opening from closed: mount new inspector and open
            setClosingInspectorId(null);
            setIsClosingInspectorOpen(false);
            setContentVisible(true);
            setActiveInspectorId(selectedSkillInCategory);
            setIsActiveInspectorOpen(false);
            animationFrameId = window.requestAnimationFrame(() => {
                setIsActiveInspectorOpen(true);
            });
        } else if (prevSelectedInCategory && !selectedSkillInCategory) {
            // closing to none: collapse the previous panel in place
            setActiveInspectorId(null);
            setIsActiveInspectorOpen(false);
            setContentVisible(true);
            setClosingInspectorId(prevSelectedInCategory);
            setIsClosingInspectorOpen(true);
            animationFrameId = window.requestAnimationFrame(() => {
                setIsClosingInspectorOpen(false);
            });
            timeoutId = window.setTimeout(() => {
                setClosingInspectorId(null);
            }, panelDuration);
        } else {
            // switching between two skills:
            if (prevRow !== undefined && newRow !== undefined && prevRow === newRow) {
                // same visual row → keep inspector open, fade content between items
                setClosingInspectorId(null);
                setIsClosingInspectorOpen(false);
                setActiveInspectorId(prevSelectedInCategory);
                setIsActiveInspectorOpen(true);
                setContentVisible(false);
                fadeTimeoutId = window.setTimeout(() => {
                    setActiveInspectorId(selectedSkillInCategory);
                    animationFrameId = window.requestAnimationFrame(() => {
                        setContentVisible(true);
                    });
                }, contentFadeDuration);
            } else {
                // different row/category → close previous while opening the new one
                setContentVisible(true);
                setClosingInspectorId(prevSelectedInCategory);
                setIsClosingInspectorOpen(true);
                setActiveInspectorId(selectedSkillInCategory);
                setIsActiveInspectorOpen(false);
                animationFrameId = window.requestAnimationFrame(() => {
                    setIsClosingInspectorOpen(false);
                    setIsActiveInspectorOpen(true);
                });
                timeoutId = window.setTimeout(() => {
                    setClosingInspectorId(null);
                }, panelDuration);
            }
        }

        prevSelectedRef.current = selectedSkillId;

        return () => {
            if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
            if (fadeTimeoutId) window.clearTimeout(fadeTimeoutId);
            if (timeoutId) window.clearTimeout(timeoutId);
        };
    }, [selectedSkillId, selectedSkillInCategory, rowMap, skillIds]);

    const activeRow =
        activeInspectorId && rowMap?.[activeInspectorId] !== undefined
            ? rowMap[activeInspectorId]
            : null;

    const closingRow =
        closingInspectorId && rowMap?.[closingInspectorId] !== undefined
            ? rowMap[closingInspectorId]
            : null;

    const renderInspectorPanel = (skillId, isOpen, panelContentVisible) => {
        const usage = getUsage(skillId);
        const selectedSkill = sorted.find((skill) => skill.id === skillId);

        if (!usage || !selectedSkill) return null;

        return (
            <div
                className="col-span-full border rounded-t-lg rounded-b-lg text-sm text-gray-300 relative z-0 section-card"
                style={{ borderColor: isOpen ? 'var(--section-accent-border)' : 'transparent' }}
            >
                <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}
                >
                    <div className="overflow-hidden">
                        <div className={`p-5 transition-opacity duration-200 ease-in-out ${panelContentVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <h4 className="text-sm font-semibold mb-2 text-white">
                                {selectedSkill.title}
                            </h4>

                            <div className="flex flex-wrap gap-2 text-xs mb-4 text-gray-300">
                                {usage.professional?.map((company) => (
                                    <span
                                        key={company.id}
                                        className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip"
                                    >
                                        {company.icon && <Icon icon={company.icon} />}
                                        {company.title}
                                    </span>
                                ))}

                                {usage.academic?.map((school) => {
                                    const labelText = school.labels?.[0] ?? school.label ?? school.title;
                                    return (
                                        <span
                                            key={school.id}
                                            className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip"
                                        >
                                            {school.icon && <Icon icon={school.icon} />}
                                            {labelText}
                                        </span>
                                    );
                                })}

                                {usage.personal?.length > 0 && (
                                    <span className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                                        Personal
                                    </span>
                                )}
                            </div>

                            {usage.relatedProjects.length > 0 && (
                                <button
                                    onClick={() => onShowProjects(skillId)}
                                    className="px-3 py-1.5 text-xs rounded border section-accent-button"
                                >
                                    Show {usage.relatedProjects.length}{" "}
                                    {usage.relatedProjects.length === 1
                                        ? "project"
                                        : "projects"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

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

                    const isLastInActiveRow =
                        activeRow !== null &&
                        currentRow === activeRow &&
                        (nextRow === null || nextRow !== currentRow);

                    const isLastInClosingRow =
                        closingRow !== null &&
                        currentRow === closingRow &&
                        (nextRow === null || nextRow !== currentRow);

                    const isHighlighted = selectedSkillId === skill.id;
                    const isConnected =
                        isActiveInspectorOpen &&
                        activeInspectorId === skill.id &&
                        contentVisible;

                    return (
                        <Fragment key={skill.id}>
                            <div data-skill-id={skill.id} className={`min-w-0 ${isConnected ? 'relative z-10' : ''}`}>
                                <SkillCard
                                    skill={skill}
                                    highlighted={isHighlighted}
                                    connected={isConnected}
                                    onClick={() =>
                                        setSelectedSkillId(
                                            isHighlighted ? null : skill.id
                                        )
                                    }
                                />

                                {isConnected && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                            bottom: '-0.75rem',
                                            height: '0.75rem',
                                            backgroundColor: 'var(--section-accent-bg)',
                                            borderLeft: '1px solid var(--section-accent-border)',
                                            borderRight: '1px solid var(--section-accent-border)',
                                            pointerEvents: 'none',
                                        }}
                                    />
                                )}
                            </div>

                            {isLastInClosingRow && closingInspectorId &&
                                renderInspectorPanel(closingInspectorId, isClosingInspectorOpen, true)}

                            {isLastInActiveRow && activeInspectorId &&
                                renderInspectorPanel(activeInspectorId, isActiveInspectorOpen, contentVisible)}
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
}