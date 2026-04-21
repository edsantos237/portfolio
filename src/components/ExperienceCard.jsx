import { useState } from "react";
import Icon from "./Icon";
import ShowProjectsButton from "./ShowProjectsButton";
import { formatRange } from "../utils/dateFormat";

export default function ExperienceCard({ company, open, onToggle, forceOpen, roleSelectable, selectedRoleId, onSelectRole, showProjectsButton, projectCount, onShowProjects }) {
  // open/onToggle controlled externally; fallback to internal state if not provided
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = forceOpen ? true : (onToggle ? open : internalOpen);
  const toggle = forceOpen ? undefined : (onToggle ?? (() => setInternalOpen((v) => !v)));

  const formatDate = (d) => {
    if (!d) return "";
    // expect d to be an object { start, end } or a string
    if (typeof d === "string") return d;
    return formatRange(d);
  };

  return (
    <div className="relative">


      {/* HEADER + Show Projects Button */}
      <div className="flex flex-col gap-2">
        {forceOpen ? (
          <div className="w-full text-left flex items-center gap-4">
            <div className="flex items-center gap-3">
              {/* ICON */}
              <div className="w-8 h-8">
                <Icon icon={company.icon} />
              </div>
              {/* TITLE */}
              <div>
                <h3 className="text-lg font-semibold">
                  {company.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {company.department}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={toggle}
            className="w-full text-left flex items-center justify-between gap-4"
            tabIndex={0}
          >
            <div className="flex items-center gap-3">
              {/* ICON */}
              <div className="w-8 h-8">
                <Icon icon={company.icon} />
              </div>
              {/* TITLE */}
              <div>
                <h3 className="text-lg font-semibold">
                  {company.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {company.department}
                </p>
              </div>
            </div>
            <span className="text-gray-400 text-sm">
              {isOpen ? "−" : "+"}
            </span>
          </button>
        )}

        {/* Show Projects Button */}
        {showProjectsButton && (
          <ShowProjectsButton onClick={onShowProjects} count={projectCount} />
        )}
      </div>

      {/* EXPANDED ROLES */}
      {isOpen && (
        <div className="mt-4 ml-11 space-y-6 border-l border-gray-800 pl-4">
          {company.roles.map((role, i) => {
            const roleId = `${company.id}__role${i}`;
            const selected = roleSelectable && selectedRoleId === roleId;
            return (
              <div
                key={i}
                className={`space-y-1 ${roleSelectable ? "cursor-pointer rounded transition section-soft-hover" : ""} ${selected ? "section-soft-highlight section-outline-active border-l-4 pl-2" : ""}`}
                onClick={roleSelectable ? () => onSelectRole(i) : undefined}
                tabIndex={roleSelectable ? 0 : -1}
              >
                {/* ROLE TITLE */}
                <h4 className="font-medium text-gray-200">
                  {role.title}
                </h4>

                {/* DATES */}
                <p className="text-xs text-gray-400">
                  {formatDate(role.date)}
                </p>

                {/* DESCRIPTION */}
                {Array.isArray(role.description) ? (
                  role.description.map((line, idx) => (
                    <p key={idx} className="text-sm text-gray-300">
                      {line}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-300">
                    {role.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}