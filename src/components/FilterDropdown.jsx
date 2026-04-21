import { forwardRef } from "react";

const FilterDropdown = forwardRef(function FilterDropdown(
  {
    label,
    selectedCount = 0,
    totalCount = 0,
    open,
    setOpen,
    id,
  },
  ref
) {
  const isOpen = open === id;
  const isAllSelected = totalCount > 0 && selectedCount === totalCount;
  const isPartialSelected = selectedCount > 0 && selectedCount < totalCount;

  let baseStyle = "section-control-idle";
  if (isAllSelected) baseStyle = "section-control-active";
  else if (isPartialSelected) baseStyle = "section-control-partial";

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setOpen((prev) => (prev === id ? null : id));
      }}
      className={`px-3 py-1.5 text-sm rounded-lg border transition flex items-center gap-2 ${baseStyle}`}
      style={{ boxShadow: isOpen ? "0 0 0 2px var(--section-accent-ring)" : undefined }}
    >
      {label}
      <span className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}>
        ▾
      </span>
    </button>
  );
});

export default FilterDropdown;