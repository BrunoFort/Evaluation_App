import { useState } from "react";

export default function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  const panelId = `accordion-panel-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="border border-neutral-200 rounded-lg hover:border-neutral-300 transition">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full text-left px-4 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 transition"
      >
        {title}
      </button>

      {open && (
        <div
          id={panelId}
          className="px-4 py-3 border-t border-neutral-200 animate-fadeIn"
        >
          {children}
        </div>
      )}
    </div>
  );
}
