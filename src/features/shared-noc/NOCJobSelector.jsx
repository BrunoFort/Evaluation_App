import React, { useState, useEffect, useMemo, useRef } from "react";
import Input from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { noc2021 } from "./noc2021";

export default function NOCJobSelector({
  label = "Job Title",

  value,
  onChange,

  customValue,
  onCustomChange,

  useCustom,
  onToggleCustom,

  search,
  onSearchChange,
}) {
  const [internalUseCustom, setInternalUseCustom] = useState(false);
  const [internalSearch, setInternalSearch] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);

  const effectiveUseCustom = useCustom ?? internalUseCustom;
  const effectiveSearch = search ?? internalSearch;

  // Flatten all synonyms into a single list
  const allSynonyms = useMemo(() => {
    return Object.values(noc2021).flat();
  }, []);

  // Filter synonyms by search term
  const filtered = useMemo(() => {
    if (!effectiveSearch) return allSynonyms;
    const term = effectiveSearch.toLowerCase();
    return allSynonyms.filter((s) => s.toLowerCase().includes(term));
  }, [effectiveSearch, allSynonyms]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleToggle(checked) {
    if (onToggleCustom) {
      onToggleCustom(checked);
    } else {
      setInternalUseCustom(checked);
    }

    if (!checked) {
      onCustomChange("");
    }
  }

  function handleSearchChange(e) {
    const val = e.target.value;

    if (onSearchChange) {
      onSearchChange(val);
    } else {
      setInternalSearch(val);
    }

    setOpen(true);
  }

  function handleSelect(synonym) {
    onChange(synonym);

    if (onSearchChange) {
      onSearchChange(synonym);
    } else {
      setInternalSearch(synonym);
    }

    setOpen(false);
  }

  return (
    <div className="space-y-3 relative" ref={containerRef}>
      <div className="flex items-center justify-between">
        <Label className="text-neutral-700 font-semibold">{label}</Label>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">Custom entry</span>
          <Switch checked={effectiveUseCustom} onCheckedChange={handleToggle} />
        </div>
      </div>

      {!effectiveUseCustom ? (
        <div className="relative">
          <Input
            value={effectiveSearch}
            onChange={handleSearchChange}
            placeholder="Search job titles..."
            className="bg-white"
            onFocus={() => setOpen(true)}
          />

          {open && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-neutral-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filtered.length === 0 && (
                <div className="px-3 py-2 text-sm text-neutral-500">
                  No results found
                </div>
              )}

              {filtered.map((synonym) => (
                <div
                  key={synonym}
                  onClick={() => handleSelect(synonym)}
                  className="px-3 py-2 text-sm hover:bg-neutral-100 cursor-pointer"
                >
                  {synonym}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Input
          value={customValue}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="Enter custom job title"
          className="bg-white"
        />
      )}

      <p className="text-xs text-neutral-500">
        Based on NOC 2021 — Synonym-level autocomplete
      </p>
    </div>
  );
}
