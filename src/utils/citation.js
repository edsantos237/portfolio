import { getEntryType } from "./publicationTypes";

/** Remove **bold** emphasis markers used to highlight an author in the data */
function stripEmphasis(name) {
  return String(name ?? "").replace(/\*\*/g, "").trim();
}

/** "José Eduardo da Silva Santos" -> "J. E. S. Santos" */
function formatAuthorName(name) {
  const cleaned = stripEmphasis(name);
  if (!cleaned) return "";

  const tokens = cleaned.split(/\s+/).filter(Boolean);
  if (tokens.length === 1) return tokens[0];

  const family = tokens.pop();
  const initials = tokens
    // Ignore non-capitalized particles such as "da", "de", "dos"
    .filter((token) => token.charAt(0) === token.charAt(0).toUpperCase())
    .map((token) => `${token.charAt(0)}.`)
    .join(" ");

  return `${initials} ${family}`;
}

function formatAuthors(authors) {
  const raw = Array.isArray(authors) ? authors : typeof authors === "string" ? [authors] : [];
  const list = raw.map(formatAuthorName).filter(Boolean);

  if (list.length === 0) return "";
  if (list.length === 1) return list[0];
  return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
}

function getYear(dateStr) {
  if (!dateStr) return "";
  return String(dateStr).split(/[-/]/)[0];
}

/** "1--9" -> "1–9" */
function formatPages(pages) {
  if (!pages) return "";
  return String(pages).replace(/--+/g, "–");
}

function formatIdentifier(pub) {
  if (pub.doi) return `doi: ${pub.doi}`;
  if (pub.url) return pub.url;
  return "";
}

/** Trim trailing commas/spaces and guarantee a single closing period */
function finalizeParts(parts) {
  if (!parts.length) return parts;

  // Trim trailing commas/spaces from the very end
  const last = parts[parts.length - 1];
  last.text = last.text.replace(/[,; ]+$/, "");

  // Ensure a single closing period on the final non-empty segment
  const filtered = parts.filter((p) => p.text);
  if (filtered.length) {
    const final = filtered[filtered.length - 1];
    if (!/[.!?]$/.test(final.text)) final.text += ".";
  }
  return filtered;
}

function buildConferenceParts(pub) {
  const parts = [];
  const authors = formatAuthors(pub.authors);
  if (authors) parts.push({ text: `${authors},`, italic: false });
  if (pub.title) {
    parts.push({ text: ` "`, italic: false });
    parts.push({ text: pub.title, italic: false, bold: true });
    parts.push({ text: `",`, italic: false });
  }

  if (pub.booktitle) {
    parts.push({ text: " in ", italic: false });
    parts.push({ text: pub.series ? `${pub.booktitle} (${pub.series})` : pub.booktitle, italic: true });
    parts.push({ text: ",", italic: false });
  } else if (pub.publisher) {
    parts.push({ text: ` ${pub.publisher},`, italic: false });
  }

  const location = pub.location || pub.address || "";
  if (location) parts.push({ text: ` ${location},`, italic: false });

  const year = getYear(pub.date);
  if (year) parts.push({ text: ` ${year},`, italic: false });

  if (pub.pages) parts.push({ text: ` pp. ${formatPages(pub.pages)},`, italic: false });

  const identifier = formatIdentifier(pub);
  if (identifier) parts.push({ text: ` ${identifier}`, italic: false });

  return finalizeParts(parts);
}

function buildGenericParts(pub) {
  const parts = [];
  const authors = formatAuthors(pub.authors);
  if (authors) parts.push({ text: `${authors},`, italic: false });
  if (pub.title) {
    parts.push({ text: ` "`, italic: false });
    parts.push({ text: pub.title, italic: false, bold: true });
    parts.push({ text: `",`, italic: false });
  }

  if (pub.journal) {
    parts.push({ text: ` ${pub.journal},`, italic: true });
    if (pub.volume) parts.push({ text: ` vol. ${pub.volume},`, italic: false });
    if (pub.number) parts.push({ text: ` no. ${pub.number},`, italic: false });
    if (pub.pages) parts.push({ text: ` pp. ${formatPages(pub.pages)},`, italic: false });
  } else if (pub.publisher) {
    parts.push({ text: ` ${pub.publisher},`, italic: false });
    if (pub.pages) parts.push({ text: ` pp. ${formatPages(pub.pages)},`, italic: false });
  }

  const year = getYear(pub.date);
  if (year) parts.push({ text: ` ${year},`, italic: false });

  const identifier = formatIdentifier(pub);
  if (identifier) parts.push({ text: ` ${identifier}`, italic: false });

  return finalizeParts(parts);
}

/**
 * Build an IEEE-style citation as a list of { text, italic, bold } segments so
 * callers can render the bolded title and italicized container
 * (booktitle/journal) correctly.
 */
export function formatPublicationCitationParts(pub) {
  if (!pub) return [];
  return getEntryType(pub)?.key === "CONF"
    ? buildConferenceParts(pub)
    : buildGenericParts(pub);
}

/** Plain-text convenience (all segments concatenated) */
export function formatPublicationCitation(pub) {
  return formatPublicationCitationParts(pub).map((p) => p.text).join("");
}
