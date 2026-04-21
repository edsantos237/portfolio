import Icon from "./Icon";
import ShowProjectsButton from "./ShowProjectsButton";

export default function SkillInspector({ skill, usage, onShowProjects }) {
  if (!skill) {
    return (
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-xl border p-5 text-sm text-gray-400 section-card">
          Select a skill to inspect where it was used.
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-xl border p-5 space-y-5 section-card">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border section-icon-surface">
            <Icon icon={skill.icon} />
          </div>

          <div>
            <h3 className="text-lg font-semibold">{skill.title}</h3>
            <p className="text-xs text-gray-400 capitalize">
              {(skill.tags?.[0] || "tool")}{" "}
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-300">
          Used in{" "}
          <span className="font-semibold text-white">
            {usage?.projects?.length || 0}
          </span>{" "}
          project{usage?.projects?.length === 1 ? "" : "s"}.
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-2">
              Professional
            </h4>
            {usage?.professional?.length ? (
              <div className="flex flex-wrap gap-2">
                {usage.professional.map((item) => (
                  <span
                    key={item.id}
                    className="px-2 py-1 rounded border text-xs section-chip"
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">None</p>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-2">
              Academic
            </h4>
            {usage?.academic?.length ? (
              <div className="flex flex-wrap gap-2">
                {usage.academic.map((item) => (
                  <span
                    key={item.id}
                    className="px-2 py-1 rounded border text-xs section-chip"
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">None</p>
            )}
          </div>
        </div>

        <ShowProjectsButton onClick={() => onShowProjects(skill.id)} />
      </div>
    </aside>
  );
}