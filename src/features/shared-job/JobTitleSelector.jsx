import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Input from "@/components/ui/Input.jsx";
import { Label } from "@/components/ui/label";

const canadianJobTitles = [
  // ... mesma lista
].sort();

export default function JobTitleSelector({
  value,
  onChange,
  label = "Job Title",
  required = false,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const filteredTitles = searchTerm
    ? canadianJobTitles.filter((title) =>
        title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : canadianJobTitles;

  return (
    <div className="space-y-2">
      <Label className="text-neutral-700 font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {!showCustom ? (
        <>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full bg-white border-neutral-300">
              <SelectValue placeholder="Select or search for a job title" />
            </SelectTrigger>

            <SelectContent className="max-h-[300px]">
              <div className="p-2 sticky top-0 bg-white border-b border-neutral-200">
                <Input
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-8"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {filteredTitles.length > 0 ? (
                filteredTitles.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))
              ) : (
                <div className="p-4 text-center text-neutral-500 text-sm">
                  No matching job titles found
                </div>
              )}
            </SelectContent>
          </Select>

          <button
            type="button"
            onClick={() => setShowCustom(true)}
            className="text-xs text-purple-600 hover:text-purple-700 underline"
          >
            My job title is not listed
          </button>
        </>
      ) : (
        <>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your job title"
            className="bg-white"
          />

          <button
            type="button"
            onClick={() => {
              setShowCustom(false);
              setSearchTerm("");
            }}
            className="text-xs text-purple-600 hover:text-purple-700 underline"
          >
            Select from list instead
          </button>
        </>
      )}
    </div>
  );
}

