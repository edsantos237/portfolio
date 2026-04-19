import React from "react";

export default function FilterDropdown({
  label,
  selectedCount = 0,
  totalCount = 0,
  open,
  setOpen,
  id,
}) {
  const isOpen = open === id;
  const isAllSelected = totalCount > 0 && selectedCount === totalCount;
  const isPartialSelected = selectedCount > 0 && selectedCount < totalCount;

  let baseStyle = "bg-gray-900 text-gray-300 border-gray-700 hover:border-gray-500";
  if (isAllSelected) baseStyle = "bg-white text-black border-white";
  else if (isPartialSelected) baseStyle = "bg-gray-900 text-white border-gray-400";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setOpen((prev) => (prev === id ? null : id));
      }}
      className={`px-3 py-1.5 text-sm rounded-lg border transition flex items-center gap-2 ${baseStyle} ${
        isOpen ? "ring-2 ring-gray-400" : ""
      }`}
    >
      {label}
      <span className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}>
        ▾
      </span>
    </button>
  );
}