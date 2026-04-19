import { useState, Fragment, useRef, useEffect } from "react";
import FilterDropdown from "./FilterDropdown";
import FilterChips from "./FilterChips";

export default function FilterPanel({
    filters = [],
    personal,
    onClearAll,
    chips, // ✅ NEW (passed from parent)
}) {
    const [openDropdown, setOpenDropdown] = useState(null);
    const drawerRef = useRef(null);
    const containerRef = useRef(null);
    const [needsStackLayout, setNeedsStackLayout] = useState(false);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Keep open only if clicking inside the drawer
            if (drawerRef.current && drawerRef.current.contains(e.target)) {
                return;
            }
            // Close for everything else (including filter bar)
            setOpenDropdown(null);
        };

        if (openDropdown) {
            document.addEventListener("click", handleClickOutside);
            return () => document.removeEventListener("click", handleClickOutside);
        }
    }, [openDropdown]);

    // Check if buttons fit in one row by measuring in a temporary container
    useEffect(() => {
        const checkFitness = () => {
            if (!containerRef.current) return;
            const container = containerRef.current;
            
            // Temporarily force one-row layout to get true measurement
            const originalDisplay = container.style.display;
            const originalFlexWrap = container.style.flexWrap;
            container.style.display = "flex";
            container.style.flexWrap = "nowrap";
            
            // Get the width needed if everything is in one row
            const neededWidth = container.scrollWidth;
            const availableWidth = container.parentElement?.clientWidth || 0;
            
            // Restore original styles
            container.style.display = originalDisplay;
            container.style.flexWrap = originalFlexWrap;
            
            setNeedsStackLayout(neededWidth > availableWidth);
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(checkFitness, 0);
        window.addEventListener("resize", checkFitness);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", checkFitness);
        };
    }, [filters, personal]);

    const toggleInList = (list, value) =>
        list.includes(value)
            ? list.filter((v) => v !== value)
            : [...list, value];

    return (
        <>
            {/* FILTER BAR */}
            {/* Stacked header: Filters label and Clear all - shown when buttons don't fit */}
            {needsStackLayout && (
                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-400">Filters:</span>
                    <button
                        onClick={onClearAll}
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Buttons container */}
            <div 
                ref={containerRef}
                className="flex gap-3 mb-4 items-center overflow-x-auto no-scrollbar"
            >
                {/* Always rendered so scrollWidth includes them — hidden in two-row mode */}
                <span className={`text-sm text-gray-400 mr-1 shrink-0 ${needsStackLayout ? "hidden" : ""}`}>
                    Filters:
                </span>
                {filters.map((f) => (
                    <Fragment key={f.id}>
                        <FilterDropdown
                            id={f.id}
                            label={f.label}
                            selectedCount={f.selected.length}
                            totalCount={
                                f.items
                                    ? f.items.length
                                    : Object.values(f.grouped || {}).flat().length
                            }
                            open={openDropdown}
                            setOpen={setOpenDropdown}
                        />

                        {/* 👇 works for BOTH "acad" and "skill-acad" */}
                        {personal && f.id.includes("acad") && (
                            <button
                                onClick={() => personal.setValue((v) => !v)}
                                className={`px-3 py-1.5 rounded-lg border text-sm whitespace-nowrap ${personal.value
                                    ? "bg-white text-black border-white"
                                    : "bg-gray-900 text-gray-300 border-gray-700"
                                    }`}
                            >
                                Personal
                            </button>
                        )}
                    </Fragment>
                ))}

                {/* Always rendered so scrollWidth includes it — hidden in two-row mode */}
                <button
                    onClick={onClearAll}
                    className={`ml-auto text-sm text-gray-400 hover:text-white whitespace-nowrap shrink-0 ${needsStackLayout ? "hidden" : ""}`}
                >
                    Clear all
                </button>
            </div>

            {/* DRAWERS */}
            {filters.map((f) => {
                if (openDropdown !== f.id) return null;

                return (
                    <div
                        ref={drawerRef}
                        onClick={(e) => e.stopPropagation()}
                        key={f.id}
                        className="mb-6 border border-gray-800 bg-gray-950 rounded-xl p-4"
                    >
                        {/* SIMPLE LIST */}
                        {f.items && (
                            <>
                                <div className="flex flex-wrap gap-2">
                                    {f.items.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() =>
                                                f.setSelected((prev) =>
                                                    toggleInList(prev, item.id)
                                                )
                                            }
                                            className={`px-3 py-1.5 rounded-lg border text-sm ${f.selected.includes(item.id)
                                                ? "bg-white text-black border-white"
                                                : "bg-gray-900 text-gray-300 border-gray-700"
                                                }`}
                                        >
                                            {item.title}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-4 flex justify-between text-xs text-gray-400">
                                    <button
                                        onClick={() =>
                                            f.setSelected(f.items.map((i) => i.id))
                                        }
                                    >
                                        All
                                    </button>
                                    <button onClick={() => f.setSelected([])}>
                                        Clear
                                    </button>
                                </div>
                            </>
                        )}

                        {/* GROUPED (skills) */}
                        {f.grouped && (
                            <>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                    {f.order.map((type) => {
                                        const group = f.grouped[type];
                                        if (!group) return null;

                                        return (
                                            <div key={type}>
                                                <h4 className="text-gray-400 mb-2">
                                                    {f.labels[type]}
                                                </h4>

                                                <div className="flex flex-wrap gap-2">
                                                    {group.map((skill) => (
                                                        <button
                                                            key={skill.id}
                                                            onClick={() =>
                                                                f.setSelected((prev) =>
                                                                    toggleInList(prev, skill.id)
                                                                )
                                                            }
                                                            className={`px-3 py-1.5 rounded-lg border text-xs ${f.selected.includes(skill.id)
                                                                ? "bg-white text-black border-white"
                                                                : "bg-gray-900 text-gray-300 border-gray-700"
                                                                }`}
                                                        >
                                                            {skill.title}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 flex justify-end text-xs text-gray-400">
                                    <button onClick={() => f.setSelected([])}>
                                        Clear
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}

            {/* CHIPS (now passed cleanly) */}
            {chips && <FilterChips {...chips} />}
        </>
    );
}