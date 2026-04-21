import { useRef, useEffect } from "react";

export default function FilterChips({
  professional = [],
  academic = [],
  personal = false,
  skills = [],
  onRemoveProfessional,
  onRemoveAcademic,
  onRemovePersonal,
  onRemoveSkill,
}) {
  const containerRef = useRef(null);
  const prevCountRef = useRef(0);
  const totalCount = professional.length + academic.length + (personal ? 1 : 0) + skills.length;

  useEffect(() => {
    if (totalCount > prevCountRef.current && containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
    prevCountRef.current = totalCount;
  }, [totalCount]);

  const hasAny =
    professional.length ||
    academic.length ||
    personal ||
    skills.length;

  if (!hasAny) return null;

  return (
    <div ref={containerRef} className="flex gap-2 mb-6 text-xs text-gray-300 items-center overflow-x-auto whitespace-nowrap filter-chips-scrollbar">
      
      {/* PROFESSIONAL */}
      {professional.map((c) => (
        <span
          key={c.id}
          className="px-2 py-1 border rounded flex items-center gap-1 section-chip"
        >
          {c.title}
          <button
            onClick={() => onRemoveProfessional(c.id)}
            className="text-gray-400 hover:text-red-400"
          >
            ×
          </button>
        </span>
      ))}

      {professional.length > 0 &&
        (academic.length > 0 || personal || skills.length > 0) && (
          <span className="text-gray-600">|</span>
        )}

      {/* ACADEMIC */}
      {academic.map((s) => (
        <span
          key={s.id}
          className="px-2 py-1 border rounded flex items-center gap-1 section-chip"
        >
          {s.title}
          <button
            onClick={() => onRemoveAcademic(s.id)}
            className="text-gray-400 hover:text-red-400"
          >
            ×
          </button>
        </span>
      ))}

      {academic.length > 0 &&
        (personal || skills.length > 0) && (
          <span className="text-gray-600">|</span>
        )}

      {/* PERSONAL */}
      {personal && (
        <>
          <span className="px-2 py-1 border rounded flex items-center gap-1 section-chip">
            Personal
            <button
              onClick={onRemovePersonal}
              className="text-gray-400 hover:text-red-400"
            >
              ×
            </button>
          </span>

          {skills.length > 0 && (
            <span className="text-gray-600">|</span>
          )}
        </>
      )}

      {/* SKILLS */}
      {skills.map((s) => (
        <span
          key={s.id}
          className="px-2 py-1 border rounded flex items-center gap-1 section-chip"
        >
          {s.title}
          <button
            onClick={() => onRemoveSkill(s.id)}
            className="text-gray-400 hover:text-red-400"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}