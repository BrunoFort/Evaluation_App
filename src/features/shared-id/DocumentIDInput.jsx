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

export default function DocumentIDInput({
  documentType,
  onDocumentTypeChange,
  documentNumber,
  onDocumentNumberChange,
  label = "Personal ID",
  required = false,
  error = "",
}) {
  // Placeholder dinâmico conforme o tipo selecionado
  const getPlaceholder = () => {
    switch (documentType) {
      case "passport":
        return "AB123456";
      case "drivers_license":
        return "Driver’s License Number";
      case "provincial_id":
        return "Provincial ID Number";
      case "pr_card":
        return "PR Card Number";
      case "citizenship_certificate":
        return "Certificate Number";
      default:
        return "Enter document number";
    }
  };

  return (
    <div className="space-y-2">
      {/* LABEL */}
      <Label className="text-neutral-700 font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {/* SELECT DO TIPO DE DOCUMENTO */}
      <Select value={documentType} onValueChange={onDocumentTypeChange}>
        <SelectTrigger className="bg-white border-neutral-300">
          <SelectValue placeholder="Select document type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="passport">Passport</SelectItem>
          <SelectItem value="drivers_license">Driver’s License</SelectItem>
          <SelectItem value="provincial_id">Provincial ID Card</SelectItem>
          <SelectItem value="pr_card">Permanent Resident Card</SelectItem>
          <SelectItem value="citizenship_certificate">
            Citizenship Certificate
          </SelectItem>
        </SelectContent>
      </Select>

      {/* INPUT DO NÚMERO DO DOCUMENTO */}
      <Input
        value={documentNumber}
        onChange={(e) => onDocumentNumberChange(e.target.value.toUpperCase())}
        placeholder={getPlaceholder()}
        className={`bg-white uppercase font-mono ${
          error ? "border-red-500" : "border-neutral-300"
        }`}
      />

      {/* MENSAGEM DE ERRO */}
      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
    </div>
  );
}

