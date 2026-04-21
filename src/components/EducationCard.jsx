import Icon from "./Icon";
import ShowProjectsButton from "./ShowProjectsButton";
import { formatRange } from "../utils/dateFormat";

export default function EducationCard({ school, open, onToggle, forceOpen, degreeSelectable, selectedDegreeId, onSelectDegree, showProjectsButton, projectCount, onShowProjects }) {
    const formatDate = (d) => {
        if (!d) return "";
        if (typeof d === 'string') return d;
        return formatRange(d);
    };

    const gradePercent =
        school.grade?.value && school.grade?.range
            ? Math.round((school.grade.value / school.grade.range) * 100)
            : null;

    const isOpen = forceOpen ? true : open;
    const toggle = forceOpen ? undefined : onToggle;


    return (
        <div className="relative">
            {/* HEADER + Show Projects Button */}
            <div className="flex flex-col gap-2">
                <button
                    onClick={toggle}
                    className={`w-full text-left flex items-center justify-between gap-4 ${forceOpen ? "cursor-default" : ""}`}
                    disabled={!!forceOpen}
                    tabIndex={forceOpen ? -1 : 0}
                >
                    <div className="flex items-center gap-3">
                        {/* ICON */}
                        <div className="w-8 h-8">
                            <Icon icon={school.icon} />
                        </div>
                        {/* TITLE */}
                        <div>
                            <h3 className="text-lg font-semibold">
                                {school.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {school.course}
                            </p>
                        </div>
                    </div>
                    <span className="text-gray-400 text-sm">
                        {isOpen ? "−" : "+"}
                    </span>
                </button>
                {showProjectsButton && (
                    <ShowProjectsButton onClick={onShowProjects} count={projectCount} />
                )}
            </div>

            {/* EXPANDED CONTENT */}
            {isOpen && (
                <div className="mt-4 ml-11 space-y-4 border-l border-gray-800 pl-4">

                    {/* DATES */}
                    <p className="text-sm text-gray-400">
                        {formatDate(school.date)}
                    </p>

                    {/* DEGREES */}
                    {school.degrees && (
                        <div className="text-sm text-gray-300 space-y-1">
                            {school.degrees.map((deg, i) => {
                                const degId = `${school.id}__deg${i}`;
                                const selected = degreeSelectable && selectedDegreeId === degId;
                                return (
                                    <p
                                        key={i}
                                        className={`pl-2 py-1 rounded cursor-pointer transition ${degreeSelectable ? "section-soft-hover" : ""} ${selected ? "section-soft-highlight section-outline-active border-l-4" : ""}`}
                                        onClick={degreeSelectable ? () => onSelectDegree(i) : undefined}
                                        tabIndex={degreeSelectable ? 0 : -1}
                                    >
                                        • {deg}
                                    </p>
                                );
                            })}
                        </div>
                    )}

                    {/* GRADE */}
                    {school.grade && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-300 mb-1">
                                Grade:{" "}
                                <span className="font-medium">
                                    {school.grade.value} / {school.grade.range}
                                </span>
                            </p>

                            {/* PROGRESS BAR */}
                            {gradePercent !== null && (
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div
                                        className="section-progress-fill h-2 rounded-full"
                                        style={{ width: `${gradePercent}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}