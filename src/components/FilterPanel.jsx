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
    const measureRef = useRef(null);
    const buttonRefs = useRef({});
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

    // When dropdown opens: scroll header into sticky position + constrain drawer height
    useEffect(() => {
        if (!openDropdown) return;

        let fallbackTimer;

        const onResize = () => {
            if (!drawerRef.current) return;
            const rect = drawerRef.current.getBoundingClientRect();
            const available = window.innerHeight - rect.top - 8;
            if (available < drawerRef.current.scrollHeight) {
                drawerRef.current.style.maxHeight = `${Math.max(available, 120)}px`;
                drawerRef.current.style.overflowY = 'auto';
            } else {
                drawerRef.current.style.maxHeight = '';
                drawerRef.current.style.overflowY = '';
            }
        };

        const frame = requestAnimationFrame(() => {
            if (!drawerRef.current) return;

            // Scroll the dropdown trigger button into view (horizontal)
            const triggerBtn = buttonRefs.current[openDropdown];
            if (triggerBtn) {
                triggerBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            }

            const stickyHeader = drawerRef.current.closest('.sticky');
            const stickyTop = stickyHeader
                ? parseFloat(getComputedStyle(stickyHeader).top) || 0
                : 0;

            const applyMaxHeight = () => {
                if (!drawerRef.current) return;
                const rect = drawerRef.current.getBoundingClientRect();
                const available = window.innerHeight - rect.top - 8;
                if (available < drawerRef.current.scrollHeight) {
                    drawerRef.current.style.maxHeight = `${Math.max(available, 120)}px`;
                    drawerRef.current.style.overflowY = 'auto';
                }
            };

            if (stickyHeader) {
                const headerRect = stickyHeader.getBoundingClientRect();
                if (headerRect.top > stickyTop + 2) {
                    // Scroll page so the header reaches its sticky position
                    window.scrollBy({ top: headerRect.top - stickyTop, behavior: 'smooth' });

                    const onScrollEnd = () => applyMaxHeight();
                    window.addEventListener('scrollend', onScrollEnd, { once: true });
                    fallbackTimer = setTimeout(() => {
                        window.removeEventListener('scrollend', onScrollEnd);
                        applyMaxHeight();
                    }, 600);
                } else {
                    applyMaxHeight();
                }
            } else {
                applyMaxHeight();
            }
        });

        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(fallbackTimer);
            window.removeEventListener('resize', onResize);
        };
    }, [openDropdown]);

    // Check if all items (including label + Clear all) fit in one row
    useEffect(() => {
        const checkFitness = () => {
            if (!measureRef.current) return;
            const el = measureRef.current;
            setNeedsStackLayout(el.scrollWidth > el.clientWidth);
        };

        checkFitness();
        window.addEventListener("resize", checkFitness);
        const timer = setTimeout(checkFitness, 100);

        return () => {
            window.removeEventListener("resize", checkFitness);
            clearTimeout(timer);
        };
    }, [filters, personal]);

    const toggleInList = (list, value) =>
        list.includes(value)
            ? list.filter((v) => v !== value)
            : [...list, value];

    const scrollSectionToTop = () => {
        const sec = (drawerRef.current && drawerRef.current.closest && drawerRef.current.closest('section')) ||
            (measureRef.current && measureRef.current.closest && measureRef.current.closest('section'));
        if (sec) {
            sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            {/* Hidden measurement row: always renders full single-row layout */}
            <div
                ref={measureRef}
                aria-hidden="true"
                className="flex gap-3 items-center overflow-hidden pointer-events-none"
                style={{ height: 0, visibility: 'hidden' }}
            >
                <span className="text-sm text-gray-400 mr-1 whitespace-nowrap">Filters:</span>
                {filters.map((f) => (
                    <Fragment key={f.id}>
                        <span className="px-3 py-1.5 text-sm whitespace-nowrap">{f.label} ▾</span>
                        {personal && f.id.includes("acad") && (
                            <span className="px-3 py-1.5 text-sm whitespace-nowrap">Personal</span>
                        )}
                    </Fragment>
                ))}
                <span className="ml-auto text-sm whitespace-nowrap">Clear all</span>
            </div>

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
                className={`flex gap-3 mb-4 items-center no-scrollbar ${needsStackLayout ? 'overflow-x-auto' : ''}`}
            >
                {/* Label: shown only when everything fits in one row */}
                {!needsStackLayout && (
                    <span className="text-sm text-gray-400 mr-1">
                        Filters:
                    </span>
                )}
                {filters.map((f) => (
                    <Fragment key={f.id}>
                        <FilterDropdown
                            ref={(el) => (buttonRefs.current[f.id] = el)}
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
                                onClick={() => { personal.setValue((v) => !v); scrollSectionToTop(); }}
                                className={`px-3 py-1.5 rounded-lg border text-sm whitespace-nowrap ${personal.value
                                    ? "section-control-active"
                                    : "section-control-idle"
                                    }`}
                            >
                                Personal
                            </button>
                        )}
                    </Fragment>
                ))}

                {/* Clear all button: shown only when everything fits in one row */}
                {!needsStackLayout && (
                    <button
                        onClick={() => { onClearAll(); scrollSectionToTop(); }}
                        className="ml-auto text-sm text-gray-400 hover:text-white whitespace-nowrap"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* DRAWERS */}
            {filters.map((f) => {
                if (openDropdown !== f.id) return null;

                return (
                    <div
                        ref={drawerRef}
                        onClick={(e) => e.stopPropagation()}
                        key={f.id}
                        className="mb-6 border rounded-xl p-4 filter-drawer-scrollbar section-card-strong"
                    >
                        {/* SIMPLE LIST */}
                        {f.items && (
                            <>
                                <div className="flex flex-wrap gap-2">
                                    {f.items.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                f.setSelected((prev) =>
                                                    toggleInList(prev, item.id)
                                                );
                                                scrollSectionToTop();
                                            }}
                                            className={`px-3 py-1.5 rounded-lg border text-sm ${f.selected.includes(item.id)
                                                ? "section-control-active"
                                                : "section-control-idle"
                                                }`}
                                        >
                                            {item.title}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-4 flex justify-between text-xs text-gray-400">
                                    <button
                                        onClick={() => {
                                            f.setSelected(f.items.map((i) => i.id));
                                            scrollSectionToTop();
                                        }}
                                    >
                                        All
                                    </button>
                                    <button onClick={() => { f.setSelected([]); scrollSectionToTop(); }}>
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
                                                            onClick={() => {
                                                                f.setSelected((prev) =>
                                                                    toggleInList(prev, skill.id)
                                                                );
                                                                scrollSectionToTop();
                                                            }}
                                                            className={`px-3 py-1.5 rounded-lg border text-xs ${f.selected.includes(skill.id)
                                                                ? "section-control-active"
                                                                : "section-control-idle"
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
                                    <button onClick={() => { f.setSelected([]); scrollSectionToTop(); }}>
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