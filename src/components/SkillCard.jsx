import Icon from "./Icon";
import ProjectStatusBadge from "./ProjectStatusBadge";

export default function SkillCard({ skill, highlighted = false, connected = false, onClick }) {
  const shapeClass = connected ? 'rounded-t-lg rounded-b-none border-b-0 relative z-10' : 'rounded-lg';
  const stateClass = highlighted ? 'section-control-active' : 'section-control-idle';
  const isFeatured = skill.tags?.includes("featured");

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative group flex items-center gap-3 px-3 py-2 ${isFeatured ? 'pr-8' : ''}
        ${shapeClass}
        border transition-colors duration-200 text-left w-full h-full
        ${stateClass}
      `}
      title={skill.title}
    >
      <ProjectStatusBadge
        badges={isFeatured ? ["featured"] : []}
        variant="card"
        className="origin-top-right scale-[0.64]"
        iconColor={highlighted ? "#ffffff" : undefined}
      />

      <div
        className={`flex-shrink-0 transition ${
          highlighted ? "" : "text-gray-300 group-hover:text-white"
        }`}
        style={highlighted ? { color: "var(--section-accent-text)" } : undefined}
      >
        <Icon icon={skill.icon} />
      </div>

      <span className="min-w-0 text-sm font-medium">{skill.title}</span>
    </button>
  );
}