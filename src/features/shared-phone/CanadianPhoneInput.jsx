import React, { useEffect, useMemo, useRef, useState } from "react";

import Input from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { countryCodes as cachedCountryCodes, phoneRules } from "./countryCodes";

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

const normalizePhoneNumber = (value) => value.replace(/\D/g, "");

const isValidPhoneNumber = (value, countryCode) => {
  const digits = normalizePhoneNumber(value);
  if (!digits) return false;

  const rule = phoneRules[countryCode];
  if (rule) return digits.length >= rule.min && digits.length <= rule.max;

  return digits.length >= 8 && digits.length <= 15;
};

export default function CanadianPhoneInput({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  label = "Phone Number",
  required = false,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  const countryCodes = useMemo(() => {
    return [...cachedCountryCodes].sort((a, b) =>
      a.country.localeCompare(b.country)
    );
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    if (!search) return countryCodes;
    const term = search.toLowerCase();
    return countryCodes.filter(
      (item) =>
        item.country.toLowerCase().includes(term) ||
        item.code.toLowerCase().includes(term)
    );
  }, [search, countryCodes]);

  const selectedCountry =
    countryCodes.find((c) => c.code === countryCode) || countryCodes[0];

  const handleChange = (e) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input, countryCode);
    onChange(formatted);
  };

  return (
    <div className="space-y-2">
      <Label className="text-neutral-700 font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="flex gap-2">
        <div className="relative w-[190px]" ref={containerRef}>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="w-full h-[42px] border border-neutral-300 rounded-lg bg-white px-3 py-2 text-left text-sm"
          >
            <span className="flex items-center justify-between">
              <span className="truncate">
                {selectedCountry?.country} ({selectedCountry?.code})
              </span>
              <span className="text-neutral-500">▾</span>
            </span>
          </button>

          {open && (
            <div className="absolute z-50 mt-1 w-full bg-white border border-neutral-300 rounded-lg shadow-lg">
              <div className="p-2">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country or code..."
                  className="w-full h-9"
                />
              </div>
              <div className="max-h-56 overflow-y-auto">
                {filtered.length === 0 && (
                  <div className="px-3 py-2 text-sm text-neutral-500">
                    No results found
                  </div>
                )}
                {filtered.map((item) => (
                  <button
                    type="button"
                    key={`${item.country}-${item.code}`}
                    onClick={() => {
                      onCountryCodeChange(item.code);
                      setOpen(false);
                      setSearch("");
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-100"
                  >
                    {item.country} ({item.code})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Input
          value={value}
          onChange={handleChange}
          placeholder={countryCode === "+1" ? "(555) 123-4567" : "Enter phone number"}
          className="flex-1 bg-white"
        />
      </div>

      <p className="text-xs text-neutral-500">
        {normalizePhoneNumber(value).length === 0
          ? "Enter a phone number for the selected country."
          : isValidPhoneNumber(value, countryCode)
          ? "Phone number format looks valid."
          : "Phone number must match the selected country code."}
      </p>
    </div>
  );
}
