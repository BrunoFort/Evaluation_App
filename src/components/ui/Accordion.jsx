import { useState } from "react";

export default function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 font-medium text-slate-700 hover:bg-slate-50"
      >
        {title}
      </button>

      {open && <div className="px-4 py-3 border-t">{children}</div>}
    </div>
  );
}

