import React, { useState } from "react";
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
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full bg-white border-neutral-300">
            <SelectValue placeholder="Select from NOC 2021 Version 1.0" />
          </SelectTrigger>

          <SelectContent className="max-h-[300px]">
            {nocOccupations.map((occ) => (
              <SelectItem key={occ.code} value={occ.code}>
                <span className="flex items-center gap-2">
                  <span className="text-neutral-400 text-xs">{occ.code}</span>
                  <span>{occ.title}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
