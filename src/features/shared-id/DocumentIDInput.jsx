import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DocumentIDInput({
  documentType,
  onDocumentTypeChange,
  documentNumber,
  onDocumentNumberChange,
  label = "Employee ID",
  required = false,
}) {
  return (
    <div className="space-y-2">
      <Label className="text-neutral-700 font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <Select value={documentType} onValueChange={onDocumentTypeChange}>
        <SelectTrigger className="bg-white border-neutral-300">
          <SelectValue placeholder="Select document type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="passport">Passport</SelectItem>
          <SelectItem value="national_id">National ID</SelectItem>
          <SelectItem value="drivers_license">Driver's License</SelectItem>
        </SelectContent>
      </Select>

      <Input
        value={documentNumber}
        onChange={(e) => onDocumentNumberChange(e.target.value.toUpperCase())}
        placeholder={
          documentType === "passport"
            ? "AB123456"
            : documentType === "national_id"
            ? "Enter ID number"
            : documentType === "drivers_license"
            ? "License number"
            : "Enter document number"
        }
        className="bg-white uppercase font-mono"
      />
    </div>
  );
}

