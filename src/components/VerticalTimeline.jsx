import { useMemo } from "react";

/**
 * VerticalTimeline
 *
 * Props:
 *   entries  – array of { id, startDate, endDate }
 *              where startDate / endDate are "YYYY-MM" strings (endDate null = present)
 *   activeId – id of the currently selected entry (or null)
 *   height   – total pixel height to render the bar (default 100% via flex)
 */
export default function VerticalTimeline({ entries, activeId }) {
  const NOW = "2026-04";
  const TIMELINE_WIDTH = 88;
  const TRACK_X = 68;
  const TICK_WIDTH = 16;
  const LABEL_WIDTH = TRACK_X - TICK_WIDTH / 2 - 6;

  const toMonths = (dateStr) => {
    if (!dateStr) return toMonths(NOW);
    const [y, m = "01"] = dateStr.split("-");
    return parseInt(y, 10) * 12 + parseInt(m, 10);
  };

  const toYear = (dateStr) => parseInt((dateStr || NOW).split("-")[0], 10);

  // Find min/max months for all entries
  const { minM, maxM, minYear, maxYear } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    let minDate = NOW;
    let maxDate = NOW;

    for (const e of entries) {
      const s = toMonths(e.startDate);
      const en = toMonths(e.endDate);

      if (s < min) {
        min = s;
        minDate = e.startDate || NOW;
      }

      if (en > max) {
        max = en;
        maxDate = e.endDate || NOW;
      }
    }

    // add a small padding at top and bottom (3 months each)
    min -= 3;
    max += 3;

    return {
      minM: min,
      maxM: max,
      minYear: toYear(minDate),
      maxYear: toYear(maxDate),
    };
  }, [entries]);

  const totalMonths = Math.max(maxM - minM, 1);

  // convert a "YYYY-MM" to a 0–1 fraction from top (recent) to bottom (old)
  const toFrac = (dateStr) => {
    const m = toMonths(dateStr);
    return (maxM - m) / totalMonths;
  };

  const active = entries.find((e) => e.id === activeId);
  let highlightTop, highlightBot;
  if (active) {
    highlightTop = toFrac(active.endDate);
    highlightBot = toFrac(active.startDate);
  }
  const activeStartYear = active ? toYear(active.startDate) : null;
  const activeEndYear = active ? toYear(active.endDate) : null;

  // Collect years to show: always minYear and maxYear, and if active, its start/end years
  const yearLabels = useMemo(() => {
    const set = new Set([minYear, maxYear]);
    if (active) {
      set.add(activeStartYear);
      set.add(activeEndYear);
    }
    return Array.from(set).sort((a, b) => b - a);
  }, [active, activeEndYear, activeStartYear, maxYear, minYear]);

  // Calculate the top and height for the main vertical line
  let lineTop = 0, lineHeight = '100%';
  if (minYear !== maxYear) {
    const topFrac = toFrac(`${maxYear}-01`);
    const botFrac = toFrac(`${minYear}-01`);
    lineTop = `${topFrac * 100}%`;
    lineHeight = `${(botFrac - topFrac) * 100}%`;
  }

  return (
    <div className="relative self-stretch" style={{ width: TIMELINE_WIDTH, minWidth: TIMELINE_WIDTH }}>
      {/* Main vertical line */}
      <div
        className="absolute bg-gray-700"
        style={{
          left: TRACK_X,
          width: 1,
          top: lineTop,
          height: lineHeight,
        }}
      />

      {/* Highlight segment */}
      {active && (
        <>
          <div
            className="absolute transition-all duration-300 section-timeline-accent"
            style={{
              left: TRACK_X,
              width: 1,
              top: `${highlightTop * 100}%`,
              height: `${(highlightBot - highlightTop) * 100}%`,
            }}
          />
          {/* Highlighted dot at the top if ongoing */}
          {active && !active.endDate && (
            <div
              className="absolute rounded-full shadow section-timeline-accent"
              style={{
                left: TRACK_X - 6,
                top: `${highlightTop * 100}%`,
                width: 12,
                height: 12,
                zIndex: 2,
              }}
            />
          )}
        </>
      )}

      {/* Year labels: only oldest, most recent, and active entry's years */}
      {yearLabels.map((year) => {
        const frac = toFrac(`${year}-01`);
        const isActiveYear = year === activeStartYear || year === activeEndYear;
        // Only hide tick if dot and tick are visually overlapping (within 7px)
        let hideTick = false;
        if (active && !active.endDate) {
          const dotFrac = toFrac(active.endDate);
          // The container is relative, so use percent of container height
          // 7px is half the dot diameter
          hideTick = Math.abs(frac - dotFrac) * 100 < 1.5; // 1.5% of height ≈ 7px if container is ~480px tall
        }

        return (
          <div
            key={year}
            className="absolute inset-x-0 pointer-events-none flex items-center"
            style={{
              top: `${frac * 100}%`,
              transform: "translateY(-50%)",
              height: 16,
            }}
          >
            <span
              className={`text-[10px] leading-4 text-right select-none ${isActiveYear ? "section-year-active font-bold" : "text-gray-500"}`}
              style={{ width: LABEL_WIDTH }}
            >
              {year}
            </span>
            {!hideTick && (
              <span
                className={`${isActiveYear ? "section-year-tick-active" : "bg-gray-600"}`}
                style={{ position: "absolute", left: TRACK_X - TICK_WIDTH / 2, width: TICK_WIDTH, height: 1 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
