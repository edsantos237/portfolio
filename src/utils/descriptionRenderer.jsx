import React from "react";
import Icon from "../components/Icon";

const ALLOWED_INLINE_TAGS = new Set(["a", "b", "strong", "i", "em", "u", "br", "code"]);

function sanitizeHref(href) {
  if (typeof href !== "string") return null;
  const trimmed = href.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("mailto:")) {
    return trimmed;
  }
  return null;
}

function renderInlineHtml(text, keyPrefix) {
  if (typeof text !== "string" || !/[<>]/.test(text) || typeof window === "undefined" || !window.DOMParser) {
    return text;
  }

  const parser = new window.DOMParser();
  const doc = parser.parseFromString(`<div>${text}</div>`, "text/html");
  const root = doc.body.firstChild;

  const renderNode = (node, path) => {
    if (node.nodeType === window.Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType !== window.Node.ELEMENT_NODE) {
      return null;
    }

    const tag = node.tagName.toLowerCase();
    const children = Array.from(node.childNodes)
      .map((child, index) => renderNode(child, `${path}-${index}`))
      .filter((child) => child !== null);

    if (!ALLOWED_INLINE_TAGS.has(tag)) {
      return <React.Fragment key={path}>{children}</React.Fragment>;
    }

    if (tag === "br") {
      return <br key={path} />;
    }

    if (tag === "a") {
      const href = sanitizeHref(node.getAttribute("href"));
      if (!href) {
        return <React.Fragment key={path}>{children}</React.Fragment>;
      }

      return (
        <a
          key={path}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-gray-500 underline-offset-2 hover:text-white"
        >
          {children}
        </a>
      );
    }

    return React.createElement(tag, { key: path }, children);
  };

  return Array.from(root.childNodes).map((node, index) => renderNode(node, `${keyPrefix}-${index}`));
}

export function getItemGroup(item) {
  if (typeof item === "string") return "text";
  if (!item || typeof item !== "object") return "text";
  if (["image", "video", "youtube", "pdf"].includes(item.type)) return "media";
  if (item.type === "button") return "button";
  return "text";
}

export function groupDescriptionItems(items = []) {
  const groups = [];
  for (const item of items) {
    if (item == null) continue;
    const type = getItemGroup(item);
    const last = groups[groups.length - 1];
    if (last && last.type === type && type !== "text") {
      last.items.push(item);
    } else {
      groups.push({ type, items: [item] });
    }
  }
  return groups;
}

export function renderMediaItem(item, key, opts = {}) {
  const compact = !!opts.compact;
  if (item.type === "image") {
    return (
      <img
        key={key}
        src={`res/${item.path}`}
        alt={item.alt || ""}
        className={`w-full rounded-lg object-contain ${compact ? 'max-h-20' : 'max-h-[32rem]'}`}
        style={{ display: "block", margin: "0 auto" }}
        loading="lazy"
      />
    );
  }

  if (item.type === "video") {
    return (
      <video key={key} className="w-full rounded-lg" controls preload="metadata">
        <source src={`res/${item.path}`} />
      </video>
    );
  }

  if (item.type === "youtube") {
    return (
      <iframe
        key={key}
        src={item.link}
        className="w-full aspect-video rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title={`Video ${key}`}
      />
    );
  }

  if (item.type === "pdf") {
    return (
      <div key={key} className="w-full">
        <iframe
          src={`res/${item.path}`}
          title={item.alt || item.path || `PDF ${key}`}
          className="w-full rounded-lg"
          style={{ height: compact ? "12rem" : "32rem" }}
        />
        <div className="mt-2 text-sm text-gray-400">
          <a href={`res/${item.path}`} target="_blank" rel="noopener noreferrer" className="underline">
            Open PDF in new tab
          </a>
        </div>
      </div>
    );
  }

  return null;
}

// Renders button items as a flat array (no wrapping div) — use inside your own flex container
export function renderFlatButtons(items, keyPrefix, onProjectLink) {
  return items.map((item, ii) => {
    const link = item.link;
    if (link && typeof link === "object") {
      return (
        <button
          key={`${keyPrefix}-flatbtn-${ii}`}
          type="button"
          onClick={() => onProjectLink?.(link)}
          className="w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button"
        >
          <span className="flex items-center gap-2">
            {item.icon ? (
              <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300">
                <Icon icon={item.icon} className="w-4 h-4" />
              </span>
            ) : null}
            <span>{item.label}</span>
          </span>
        </button>
      );
    }
    return (
      <a
        key={`${keyPrefix}-flatbtn-${ii}`}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button"
      >
        <span className="flex items-center gap-2">
          {item.icon ? (
            <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300">
              <Icon icon={item.icon} className="w-4 h-4" />
            </span>
          ) : null}
          <span>{item.label}</span>
        </span>
      </a>
    );
  });
}

export function renderGroups(groups, keyPrefix, onProjectLink, opts = {}) {
  return groups.map((group, gi) => {
    if (group.type === "text") {
      return (
        <p key={`${keyPrefix}-text-${gi}`} className="text-sm text-gray-300">
          {renderInlineHtml(group.items[0], `${keyPrefix}-text-${gi}`)}
        </p>
      );
    }

    if (group.type === "media") {
      const compact = !!opts.compact;
      return (
        <div key={`${keyPrefix}-media-${gi}`} className="flex flex-wrap gap-3">
          {group.items.map((item, ii) => (
            <div
              key={`${keyPrefix}-media-${gi}-${ii}`}
              className={compact ? "flex-1 min-w-0" : "flex-1 min-w-52 min-h-52"}
            >
              {renderMediaItem(item, `${keyPrefix}-${gi}-${ii}`, opts)}
            </div>
          ))}
        </div>
      );
    }

    if (group.type === "button") {
      return (
        <div key={`${keyPrefix}-button-${gi}`} className="flex flex-wrap gap-2">
          {group.items.map((item, ii) => {
            const link = item.link;

            if (link && typeof link === "object") {
              return (
                <button
                  key={`${keyPrefix}-button-${gi}-${ii}`}
                  type="button"
                  onClick={() => onProjectLink?.(link)}
                  className="w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button"
                >
                  <span className="flex items-center gap-2">
                    {item.icon ? (
                      <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300">
                        <Icon icon={item.icon} className="w-4 h-4" />
                      </span>
                    ) : null}
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            }

            return (
              <a
                key={`${keyPrefix}-button-${gi}-${ii}`}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit rounded border px-3 py-2 text-xs font-normal transition section-accent-button"
              >
                <span className="flex items-center gap-2">
                  {item.icon ? (
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-300">
                      <Icon icon={item.icon} className="w-4 h-4" />
                    </span>
                  ) : null}
                  <span>{item.label}</span>
                </span>
              </a>
            );
          })}
        </div>
      );
    }

    return null;
  });
}
