import React, { useState, useEffect, useMemo, useRef } from "react";
import Input from "@/components/ui/input.jsx";
import { noc2021 } from "./noc2021";

export default function NOCJobSelector({
  value,
  onChange,
  useCustom = false,
  className = "",
}) {
  const [search, setSearch] = useState(value || "");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const allSynonyms = useMemo(() => {
    const list = Object.values(noc2021).flat();
    return Array.from(new Set(list));
  }, []);

  const filtered = useMemo(() => {
    if (!search) return allSynonyms;
    const term = search.toLowerCase();
    return allSynonyms.filter((s) => s.toLowerCase().includes(term));
  }, [search, allSynonyms]);

  useEffect(() => {
    setSearch(value || "");
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleInput(e) {
    const val = e.target.value;
    setSearch(val);
    onChange(val);

    if (!useCustom) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  return (
    <div className="relative h-[42px]" ref={containerRef}>
      <Input
        value={search}
        onChange={handleInput}
        placeholder="Search job titles..."
        className={`w-full h-full border border-neutral-300 rounded-lg px-3 py-2 bg-white focus:ring-0 ${className}`}
        onFocus={() => {
          if (!useCustom) setOpen(true);
        }}
      />

      {!useCustom && open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-neutral-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="px-3 py-2 text-sm text-neutral-500">
              No results found
            </div>
          )}

          {filtered.map((synonym) => (
            <div
              key={synonym}
              onClick={() => {
                onChange(synonym);
                setSearch(synonym);
                setOpen(false);
              }}
              className="px-3 py-2 text-sm hover:bg-neutral-100 cursor-pointer"
            >
              {synonym}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
