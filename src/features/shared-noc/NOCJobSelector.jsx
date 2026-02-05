import React, { useState, useEffect, useMemo } from "react";

import Input from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useNOCGroups } from "./hooks/useNOCGroups";

export default function NOCJobSelector({
  label = "Job Title",

  // Valores controlados
  value,
  onChange,

  customValue,
  onCustomChange,

  // Controle externo (Settings)
  useCustom,
  onToggleCustom,

  // Controle externo da busca (Settings)
  search,
  onSearchChange,
}) {
  const [internalUseCustom, setInternalUseCustom] = useState(false);
  const [internalSearch, setInternalSearch] = useState("");

  const effectiveUseCustom = useCustom ?? internalUseCustom;
  const effectiveSearch = search ?? internalSearch;

  useEffect(() => {
    if (useCustom !== undefined) {
      setInternalUseCustom(useCustom);
    }
  }, [useCustom]);

  const groups = useNOCGroups();

  const filteredGroups = useMemo(() => {
    if (!effectiveSearch) return groups;

    const term = effectiveSearch.toLowerCase();

    return groups.filter((g) => g.toLowerCase().includes(term));
  }, [groups, effectiveSearch]);

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
  }

  function handleSelectChange(e) {
    onChange(e.target.value);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-neutral-700 font-semibold">{label}</Label>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">Custom entry</span>
          <Switch checked={effectiveUseCustom} onCheckedChange={handleToggle} />
        </div>
      </div>

      {!effectiveUseCustom ? (
        <div className="space-y-2">
          <Input
            value={effectiveSearch}
            onChange={handleSearchChange}
            placeholder="Search job titles or synonyms..."
            className="bg-white"
          />

          <div className="relative">
            <select
              value={value}
              onChange={handleSelectChange}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 bg-white text-sm"
            >
              <option value="">Select from NOC 2021</option>

              {filteredGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}

              {filteredGroups.length === 0 && (
                <option disabled value="">
                  No results found
                </option>
              )}
            </select>
          </div>
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
        Based on NOC 2021 Version 1.0 — National Occupational Classification
        (Canada)
      </p>
    </div>
  );
}

