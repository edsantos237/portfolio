import { useState } from "react";
import AnimatedCollapse from "./AnimatedCollapse";
import Icon from "./Icon";
import ShowProjectsButton from "./ShowProjectsButton";
import ShowSkillsButton from "./ShowSkillsButton";
import { formatRange } from "../utils/dateFormat";
import { groupDescriptionItems, renderGroups, renderFlatButtons } from "../utils/descriptionRenderer.jsx";

export default function ExperienceCard({ company, open, onToggle, forceOpen, roleSelectable, selectedRoleId, onSelectRole, showProjectsButton, projectCount, showSkillsButton, skillCount, onShowProjects, onShowSkills, onProjectLink }) {
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
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
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
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
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

        {/* Show Projects Button is shown on top of the sub-entries list (right of the left border) */}
      </div>

      {/* EXPANDED ROLES */}
      <AnimatedCollapse open={isOpen}>
          <div className="section-subentries mt-4 ml-4 pl-4 sm:ml-11">
            {/* Company-level description preview + ShowProjectsButton / trailing buttons */}
            {(() => {
              const desc = Array.isArray(company.description) ? company.description.slice() : [];
              // extract trailing button items
              const trailing = [];
              while (desc.length > 0) {
                const last = desc[desc.length - 1];
                if (last && typeof last === 'object' && last.type === 'button') {
                  trailing.unshift(last);
                  desc.pop();
                  continue;
                }
                break;
              }
              const groups = groupDescriptionItems(desc || []);

              return (
                  <div className="mb-2">
                    {(() => {
                      const textGroups = groups.filter((g) => g.type === 'text');
                      const otherGroups = groups.filter((g) => g.type !== 'text');
                      return (
                        <>
                          {textGroups.length > 0 && (
                            <div className="space-y-1">
                              {renderGroups(textGroups, `company-desc-${company.id}-text`, onProjectLink)}
                            </div>
                          )}

                          {(otherGroups.length > 0 || showProjectsButton || trailing.length > 0) && (
                            <div className="flex items-start gap-3 flex-wrap mt-2">
                              {otherGroups.length > 0 && (
                                <div className="min-w-0">
                                  {renderGroups(otherGroups, `company-desc-${company.id}-other`, onProjectLink, { compact: true })}
                                </div>
                              )}
                              {(showProjectsButton || trailing.length > 0 || showSkillsButton) && (
                                <div className="flex flex-wrap gap-2">
                                  {showProjectsButton && <ShowProjectsButton onClick={onShowProjects} count={projectCount} />}
                                  {showSkillsButton && skillCount > 0 && onShowSkills && <ShowSkillsButton onClick={() => onShowSkills(company.id)} count={skillCount} />}
                                  {renderFlatButtons(trailing, `company-desc-trail-${company.id}`, onProjectLink)}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
              );
            })()}
           {company.roles.map((role, i) => {
             const roleId = `${company.id}__role${i}`;
             const selected = roleSelectable && selectedRoleId === roleId;
             return (
               <div
                 key={i}
                 className={`space-y-1 ${roleSelectable ? "cursor-pointer rounded transition section-soft-hover" : ""} ${selected ? "section-soft-highlight pl-2" : ""}`}
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
                  role.description.map((line, idx) => {
                    if (typeof line === "string") {
                      return (
                        <p key={idx} className="text-sm text-gray-300">
                          {line}
                        </p>
                      );
                    }

                    if (!line || typeof line !== "object") return null;

                    // media items
                    if (["image", "video", "youtube"].includes(line.type)) {
                      if (line.type === "image") {
                        return (
                          <img
                            key={idx}
                            src={`res/${line.path}`}
                            alt={line.alt || ""}
                            className="w-full rounded-lg object-contain max-h-[20rem]"
                            loading="lazy"
                          />
                        );
                      }

                      if (line.type === "video") {
                        return (
                          <video key={idx} className="w-full rounded-lg" controls preload="metadata">
                            <source src={`res/${line.path}`} />
                          </video>
                        );
                      }

                      if (line.type === "youtube") {
                        return (
                          <iframe
                            key={idx}
                            src={line.link}
                            className="w-full aspect-video rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            title={`Video ${idx}`}
                          />
                        );
                      }
                    }

                    // button
                    if (line.type === "button") {
                      const link = line.link;

                      // link to internal projects (object)
                      if (link && typeof link === "object" && link.type === "projects") {
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => onProjectLink?.(link)}
                            className="inline-block w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button"
                          >
                            <span className="flex items-center gap-2">
                              {line.icon ? (
                                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300">
                                  <Icon icon={line.icon} className="w-4 h-4" />
                                </span>
                              ) : null}
                              <span>{line.label}</span>
                            </span>
                          </button>
                        );
                      }

                      // generic object link (let parent handler decide) -> call onProjectLink
                      if (link && typeof link === "object") {
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => onProjectLink?.(link)}
                            className="inline-block w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button"
                          >
                            <span className="flex items-center gap-2">
                              {line.icon ? (
                                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300">
                                  <Icon icon={line.icon} className="w-4 h-4" />
                                </span>
                              ) : null}
                              <span>{line.label}</span>
                            </span>
                          </button>
                        );
                      }

                      // string URL -> regular anchor
                      if (typeof link === "string") {
                        return (
                          <a
                            key={idx}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button"
                          >
                            <span className="flex items-center gap-2">
                              {line.icon ? (
                                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300">
                                  <Icon icon={line.icon} className="w-4 h-4" />
                                </span>
                              ) : null}
                              <span>{line.label}</span>
                            </span>
                          </a>
                        );
                      }
                    }

                    return null;
                  })
                ) : (
                  <p className="text-sm text-gray-300">{role.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </AnimatedCollapse>
    </div>
  );
}