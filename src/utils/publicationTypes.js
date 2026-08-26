/**
 * Entry type dictionary keyed by RIS "TY" values (case-insensitive).
 * Shared by publications and projects. Each entry maps a type tag to its
 * full and short labels.
 */
export const ENTRY_TYPES = {
  CONF: { full: "Conference Proceeding / Paper", short: "Conference" },
  DISSERT_MSC: { full: "Master's Dissertation", short: "Master's Dissertation" },
};

/**
 * Find the type entry referenced by an entry's tags (publications or projects).
 * Tag keys are matched case-insensitively against the RIS "TY" codes.
 */
export function getEntryType(entry) {
  const tags = (entry?.tags || []).flatMap((t) => String(t).split(",").map((s) => s.trim()));
  for (const tag of tags) {
    const key = tag.toUpperCase();
    const typeEntry = ENTRY_TYPES[key];
    if (typeEntry) return { key, tag, ...typeEntry };
  }
  return null;
}
