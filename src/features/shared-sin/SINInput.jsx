import React from "react";
import Input from "@/components/ui/Input.jsx";
import { Label } from "@/components/ui/label";

export default function SINInput({ value, onChange, label = "SIN" }) {
  const formatSIN = (input) => {
    const digits = input.replace(/\D/g, "").slice(0, 9);
    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 3));
    if (digits.length > 3) parts.push(digits.slice(3, 6));
    if (digits.length > 6) parts.push(digits.slice(6, 9));
    return parts.join("-");
  };

  const handleChange = (e) => {
    const formatted = formatSIN(e.target.value);
    onChange(formatted);
  };

  const isComplete = value && value.replace(/-/g, "").length === 9;

  return (
    <div className="space-y-2">
      <Label className="text-neutral-700 font-semibold">{label}</Label>

      <Input
        value={value}
        onChange={handleChange}
        placeholder="XXX-XXX-XXX"
        maxLength={11}
        className={`bg-white font-mono tracking-wider ${
          isComplete ? "border-green-400 focus:ring-green-400" : "border-neutral-300"
        }`}
      />

      <p className="text-xs text-neutral-500">
        9-digit Social Insurance Number
      </p>
    </div>
  );
}
