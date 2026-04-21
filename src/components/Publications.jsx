import { publications } from "../data/publications";
import { getSectionTheme } from "../config/sections";
import { companies } from "../data/experience";
import { schools } from "../data/education";
import Icon from "./Icon";

function renderDate(date) {
  if (!date) return null;
  const parts = String(date).split("/");
  try {
    if (parts.length === 3) {
      const [year, month, day] = parts.map((p) => parseInt(p, 10));
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('en-US', { day: "numeric", month: "short", year: "numeric" });
    }

    if (parts.length === 2) {
      const [year, month] = parts.map((p) => parseInt(p, 10));
      const d = new Date(year, month - 1);
      return d.toLocaleDateString('en-US', { month: "short", year: "numeric" });
    }
  } catch (e) {
    // fallthrough
  }

  return date;
}

export default function Publications({ isActive }) {
  const sectionTheme = getSectionTheme("publications");

  return (
    <section id="publications" className="py-16">
      <div
        className="sticky top-12 lg:top-0 z-40 backdrop-blur border-b mb-6 relative transition-colors duration-300"
        style={{
          backgroundColor: isActive ? 'var(--section-active-bg)' : 'var(--section-base-bg)',
          borderBottomColor: isActive ? sectionTheme.accentBorder : sectionTheme.controlBorder
        }}
      >
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{ backgroundColor: isActive ? sectionTheme.stickyActiveOverlay : "transparent" }}
        />
        <div className="relative pt-4">
          <h2 className="text-3xl font-bold mb-2">Publications</h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {publications.map((pub, idx) => (
          <div key={`${pub.title}-${idx}`} className="p-4 rounded-lg border h-full flex flex-col section-card">
            <div className="mb-2">
              <h3 className="font-semibold text-white">{pub.title}</h3>
              {pub.date && (
                <p className="text-xs text-gray-500">{renderDate(pub.date)}</p>
              )}
            </div>
            {/** Origin pills: resolve companies/schools/personal from tags (ignore 'arcticle') */}
            {pub.tags && (
              <div className="flex flex-wrap gap-2 mb-3">
                {pub.tags.flatMap((t) => String(t).split(",").map(s => s.trim())).filter(Boolean).map((tag) => {
                  if (tag.toLowerCase() === "arcticle") return null;

                  const company = companies.find((c) => c.id === tag);
                  if (company) {
                    return (
                      <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                        <Icon icon={company.icon} />
                        {company.title}
                      </span>
                    );
                  }

                  const school = schools.find((s) => s.id === tag);
                  if (school) {
                    return (
                      <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                        <Icon icon={school.icon} />
                        {school.title}
                      </span>
                    );
                  }

                  if (tag.toLowerCase() === "personal") {
                    return (
                      <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                        <Icon icon="user" />
                        Personal
                      </span>
                    );
                  }

                  // fallback: render the cleaned tag text
                  return (
                    <span key={tag} className="px-2 py-1 text-xs rounded border whitespace-nowrap section-chip">
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}

            <div className="text-sm text-gray-400 mb-4 flex-1">
              {Array.isArray(pub.description)
                ? pub.description.map((d, i) => <p key={i}>{d}</p>)
                : <p>{pub.description}</p>}
            </div>

            {pub.links && pub.links.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-2">
                {pub.links.map((l, i) => (
                  <a
                    key={i}
                    href={l}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 text-xs rounded border section-accent-button"
                  >
                    {i === 0 && pub.publisher ? pub.publisher : "Link"}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
