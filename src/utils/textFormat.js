/** Format LaTeX-style dashes: "---" -> em dash, "--" -> en dash. */
export function formatHeading(text) {
  if (text == null) return text;
  return String(text).replace(/---/g, "—").replace(/--/g, "–");
}
