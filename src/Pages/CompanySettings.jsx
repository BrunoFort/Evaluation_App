import React, { useState } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import Button from "/src/components/ui/Button.jsx";

export default function CompanySettings() {
  const [form, setForm] = useState({
    company_name: "My Company Inc.",
    company_email: "contact@mycompany.com",
    phone: "+1 613-555-9876",
    address: "123 Main Street, Ottawa, ON",
    website: "https://mycompany.com",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Company settings saved:", form);
  };

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Company Settings
      </h1>

      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Company Information
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Company Name
            </label>
            <Input
              value={form.company_name}
              onChange={(e) => handleChange("company_name", e.target.value)}
              className="bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Company Email
            </label>
            <Input
              value={form.company_email}
              onChange={(e) => handleChange("company_email", e.target.value)}
              className="bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </label>
            <Input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Address
            </label>
            <Input
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Website
            </label>
            <Input
              value={form.website}
              onChange={(e) => handleChange("website", e.target.value)}
              className="bg-white"
            />
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all mt-6"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
