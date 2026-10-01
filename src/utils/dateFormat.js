export function formatMonthYear(dateStr) {
  if (!dateStr) return { month: "", year: "" };
  const parts = String(dateStr).split(/[-\/]/);
  const year = parseInt(parts[0], 10);
  const month = parts[1] ? parseInt(parts[1], 10) : 1;
  const d = new Date(year, month - 1);
  return {
    month: d.toLocaleString("en-US", { month: "short" }),
    year: String(year),
  };
}

export function formatRange(date) {
  if (!date) return "";
  const start = date.start ? formatMonthYear(date.start) : null;
  const end = date.end ? formatMonthYear(date.end) : null;

  if (!start) return "";
  if (!end) return `${start.month} ${start.year} — Present`;

  if (start.year !== end.year) {
    return `${start.month} ${start.year} — ${end.month} ${end.year}`;
  }

  if (start.month !== end.month) {
    return `${start.month} — ${end.month} ${start.year}`;
  }

  return `${start.month} ${start.year}`;
}

function parseMonthYear(dateStr) {
  if (!dateStr) return null;
  const parts = String(dateStr).split(/[-\/]/);
  const year = parseInt(parts[0], 10);
  const month = parts[1] ? parseInt(parts[1], 10) : 1;
  if (Number.isNaN(year) || Number.isNaN(month)) return null;
  return { year, month };
}

export function formatDuration(date) {
  if (!date || !date.start) return "";
  const start = parseMonthYear(date.start);
  if (!start) return "";

  let end = date.end ? parseMonthYear(date.end) : null;
  const isOngoing = !end;
  if (!end) {
    const now = new Date();
    end = { year: now.getFullYear(), month: now.getMonth() + 1 };
  }

  // Inclusive month count: the start month counts from its beginning and the end
  // month through its end — unless the range is still ongoing, in which case the
  // current month only counts up to today (so no "+1" for it).
  let totalMonths = (end.year - start.year) * 12 + (end.month - start.month);
  if (!isOngoing) totalMonths += 1;
  if (totalMonths <= 0) return "";

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts = [];
  if (years > 0 && months > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  } else if (years > 0) {
    parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  } else {
    parts.push(`${months} ${months === 1 ? "month" : "months"}`);
  }
  return parts.join(" ");
}

export function formatRangeWithDuration(date) {
  if (!date) return "";
  const range = formatRange(date);
  const duration = formatDuration(date);
  if (!duration) return range;
  if (!range) return duration;
  return `${duration} · ${range}`;
}

export function formatDates(dates) {
  if (!Array.isArray(dates) || !dates.length) return "";
  return dates.map((d) => formatRange(d)).filter(Boolean).join(", ");
}

export function formatDatesWithDuration(dates) {
  if (!Array.isArray(dates) || !dates.length) return "";
  return dates.map((d) => formatRangeWithDuration(d)).filter(Boolean).join(", ");
}

export function getEarliestStart(dates) {
  if (!Array.isArray(dates) || !dates.length) return null;
  const starts = dates.map((d) => d?.start).filter(Boolean).sort();
  return starts[0] || null;
}

export function getLatestEnd(dates) {
  if (!Array.isArray(dates) || !dates.length) return null;
  // If any entry has no end, the overall range is ongoing
  if (dates.some((d) => !d?.end)) return null;
  const ends = dates.map((d) => d.end).filter(Boolean).sort();
  return ends.at(-1) || null;
}

export function formatSingle(dateStr) {
  if (!dateStr) return "";
  const parts = String(dateStr).split(/[-\/]/);
  try {
    if (parts.length === 3) {
      const [year, month, day] = parts.map((p) => parseInt(p, 10));
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
    }
    if (parts.length === 2) {
      const [year, month] = parts.map((p) => parseInt(p, 10));
      const d = new Date(year, month - 1);
      return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
  } catch (e) {
    // fallthrough
  }
  return dateStr;
}
