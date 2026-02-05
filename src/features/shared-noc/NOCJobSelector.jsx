import React, { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Input from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useNOCGroups } from "./hooks/useNOCGroups";
import { useNOCSearch } from "./hooks/useNOCSearch";

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
}) {
  const [internalUseCustom, setInternalUseCustom] = useState(false);
  const [search, setSearch] = useState("");

  // Se o componente recebe controle externo, sincroniza
  const effectiveUseCustom = useCustom ?? internalUseCustom;

  useEffect(() => {
    if (useCustom !== undefined) {
      setInternalUseCustom(useCustom);
    }
  }, [useCustom]);

  const groups = useNOCGroups();
  const filteredGroups = useNOCSearch(search);

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search job titles or synonyms..."
            className="bg-white"
          />

          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full bg-white border-neutral-300">
              <SelectValue placeholder="Select from NOC 2021" />
            </SelectTrigger>

            <SelectContent className="max-h-[300px] overflow-y-auto">
              {filteredGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}

              {filteredGroups.length === 0 && (
                <div className="px-3 py-2 text-sm text-neutral-500">
                  No results found
                </div>
              )}
            </SelectContent>
          </Select>
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
