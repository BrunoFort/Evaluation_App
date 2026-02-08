import React from "react";
import Input from "@/components/ui/input.jsx";
import Label from "@/components/ui/label.jsx";

export default function WorkPermitInput({ value, onChange, label = "Work Permit" }) {
  const formatWorkPermit = (input) => {
    const cleaned = input.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

    if (cleaned.length === 0) return "";

    const letter = cleaned.charAt(0).replace(/[^A-Z]/g, "");
    const numbers = cleaned.slice(1).replace(/[^0-9]/g, "").slice(0, 9);

    return letter + numbers;
  };

  const handleChange = (e) => {
    const formatted = formatWorkPermit(e.target.value);
    onChange(formatted);
  };

  const isValid = value && /^[A-Z]\d{9}$/.test(value);

  return (
    <div className="space-y-2">
      <Label className="text-neutral-700 font-semibold">{label}</Label>

      <Input
        value={value}
        onChange={handleChange}
        placeholder="U123456789"
        maxLength={10}
        className={`bg-white font-mono tracking-wider ${
          isValid ? "border-green-400 focus:ring-green-400" : "border-neutral-300"
        }`}
      />

      <p className="text-xs text-neutral-500">
        Format: 1 letter + 9 numbers (e.g., U993830598)
      </p>
    </div>
  );
}
