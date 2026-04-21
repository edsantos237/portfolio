import Icon from "./Icon";

export default function SkillCard({ skill, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group flex items-center gap-3 px-3 py-2 rounded-lg border
        transition-all duration-200 text-left w-full h-full
        ${active ? "section-control-active" : "section-control-idle"}
      `}
      title={skill.title}
    >
      <div
        className={`flex-shrink-0 transition ${
          active ? "" : "text-gray-300 group-hover:text-white"
        }`}
        style={active ? { color: "var(--section-accent-text)" } : undefined}
      >
        <Icon icon={skill.icon} />
      </div>

      <span className="text-sm font-medium">{skill.title}</span>
    </button>
  );
}