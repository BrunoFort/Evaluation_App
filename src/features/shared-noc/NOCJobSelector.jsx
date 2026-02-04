import React, { useState, useMemo } from "react";
import { noc2021 } from "./noc2021";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function NOCJobSelector({
  value,
  onChange,
  customValue,
  onCustomChange,
  label = "Job Title",
}) {
  const [useCustom, setUseCustom] = useState(false);
  const [search, setSearch] = useState("");

  // Lista de grupos (títulos principais)
  const groups = useMemo(() => Object.keys(noc2021).sort(), []);

  // Lista de todos os títulos (para busca)
  const flattened = useMemo(() => {
    const list = [];
    for (const group of groups) {
      for (const title of noc2021[group]) {
        list.push({ group, title });
      }
    }
    return list;
  }, [groups]);

  // Resultados filtrados pela busca
  const filteredGroups = useMemo(() => {
    if (!search.trim()) return groups;

    const lower = search.toLowerCase();

    const matchedGroups = new Set();

    // Match por sinônimos
    for (const item of flattened) {
      if (item.title.toLowerCase().includes(lower)) {
        matchedGroups.add(item.group);
      }
    }

    // Match por título principal
    for (const group of groups) {
      if (group.toLowerCase().includes(lower)) {
        matchedGroups.add(group);
      }
    }

    return [...matchedGroups].sort();
  }, [search, groups, flattened]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-neutral-700 font-semibold">{label}</Label>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">Custom entry</span>
          <Switch
            checked={useCustom}
            onCheckedChange={(checked) => {
              setUseCustom(checked);
              if (!checked) onCustomChange("");
            }}
          />
        </div>
      </div>

      {!useCustom ? (
        <div className="space-y-2">
          {/* Campo de busca */}
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search job titles or synonyms..."
            className="bg-white"
          />

          {/* Dropdown */}
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
