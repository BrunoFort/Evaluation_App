import React from "react";
import Input from "@/components/ui/Input.jsx";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const canadianProvinces = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon" },
];

export default function CanadianAddressInput({
  street,
  onStreetChange,
  number,
  onNumberChange,
  postalCode,
  onPostalCodeChange,
  city,
  onCityChange,
  province,
  onProvinceChange,
  label = "Address",
  required = false,
}) {
  const formatPostalCode = (value) => {
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (cleaned.length <= 3) return cleaned;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`;
  };

  return (
    <div className="space-y-3">
      <Label className="text-neutral-700 font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Input
            value={street}
            onChange={(e) => onStreetChange(e.target.value)}
            placeholder="Street/Avenue name"
          />
        </div>
        <div>
          <Input
            value={number}
            onChange={(e) => onNumberChange(e.target.value)}
            placeholder="Number"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          placeholder="City"
        />
        <Input
          value={postalCode}
          onChange={(e) => onPostalCodeChange(formatPostalCode(e.target.value))}
          placeholder="A1A 1A1"
          maxLength={7}
          className="uppercase"
        />
      </div>

      <Select value={province} onValueChange={onProvinceChange}>
        <SelectTrigger className="border-neutral-300">
          <SelectValue placeholder="Select province" />
        </SelectTrigger>
        <SelectContent>
          {canadianProvinces.map(({ code, name }) => (
            <SelectItem key={code} value={code}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

