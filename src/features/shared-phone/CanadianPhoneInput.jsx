import React from "react";
import Input from "@/components/ui/input.jsx";
import Label from "@/components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countryCodes = [
  { code: "+1", country: "Canada/USA", flag: "🇨🇦", format: "(XXX) XXX-XXXX" },
  { code: "+44", country: "UK", flag: "🇬🇧", format: "XXXX XXX XXXX" },
  { code: "+91", country: "India", flag: "🇮🇳", format: "XXXXX XXXXX" },
  { code: "+86", country: "China", flag: "🇨🇳", format: "XXX XXXX XXXX" },
  { code: "+52", country: "Mexico", flag: "🇲🇽", format: "XX XXXX XXXX" },
  { code: "+55", country: "Brazil", flag: "🇧🇷", format: "XX XXXXX XXXX" },
  { code: "+61", country: "Australia", flag: "🇦🇺", format: "XXX XXX XXX" },
  { code: "+49", country: "Germany", flag: "🇩🇪", format: "XXX XXXXXXX" },
  { code: "+33", country: "France", flag: "🇫🇷", format: "X XX XX XX XX" },
  { code: "+81", country: "Japan", flag: "🇯🇵", format: "XX XXXX XXXX" },
];

const formatPhoneNumber = (value, countryCode) => {
  const cleaned = value.replace(/\D/g, "");

  if (countryCode === "+1") {
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6)
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  }

  if (countryCode === "+44") {
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 7)
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(
      7,
      11
    )}`;
  }

  if (countryCode === "+91") {
    if (cleaned.length <= 5) return cleaned;
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5, 10)}`;
  }

  return cleaned.replace(/(\d{3})/g, "$1 ").trim();
};

export default function CanadianPhoneInput({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  label = "Phone Number",
  required = false,
}) {
  const handleChange = (e) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input, countryCode);
    onChange(formatted);
  };

  const selectedCountry =
    countryCodes.find((c) => c.code === countryCode) || countryCodes[0];

  return (
    <div className="space-y-2">
      <Label className="text-neutral-700 font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="flex gap-2">
        <Select value={countryCode} onValueChange={onCountryCodeChange}>
          <SelectTrigger className="w-[140px] border-neutral-300 bg-white">
            <SelectValue>
              <span className="flex items-center gap-2">
                <span>{selectedCountry.flag}</span>
                <span className="font-mono text-sm">{selectedCountry.code}</span>
              </span>
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {countryCodes.map(({ code, country, flag }) => (
              <SelectItem key={code} value={code}>
                <span className="flex items-center gap-2">
                  <span>{flag}</span>
                  <span>{country}</span>
                  <span className="font-mono text-neutral-500">({code})</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          value={value}
          onChange={handleChange}
          placeholder={selectedCountry.format}
          className="flex-1 bg-white"
        />
      </div>

      <p className="text-xs text-neutral-500">
        Format: {selectedCountry.format}
      </p>
    </div>
  );
}
