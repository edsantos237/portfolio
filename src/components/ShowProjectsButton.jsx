export default function ShowProjectsButton({ onClick, count, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button ${className}`}
    >
      {count !== undefined
        ? `Show ${count} project${count !== 1 ? 's' : ''}`
        : 'Show projects'}
    </button>
  );
}
