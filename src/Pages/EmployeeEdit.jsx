import React, { useState } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { createPageUrl } from "../utils";

export default function EmployeeEdit() {
  // MOCK employee data (substituir quando conectar backend)
  const [form, setForm] = useState({
    full_name: "John Doe",
    personal_email: "john.doe@gmail.com",
    work_email: "john.doe@company.com",
    phone_country_code: "+1",
    phone_number: "613-555-1234",
    position: "Software Developer",
    employee_id: "EMP-001",
    registration_number: "REG-2024-001",
    sin: "123-456-789",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Employee updated:", form);
    window.location.href = createPageUrl("ViewEmployee");
  };

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Edit Employee
      </h1>

      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Employee Information
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          {/* Country code */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Country Code
            </label>
            <Input
              value={form.phone_country_code}
              onChange={(e) => handleChange("phone_country_code", e.target.value)}
              className="bg-white w-32"
            />
          </div>

          {/* Other fields */}
          <div className="grid sm:grid-cols-2 gap-6">
            {Object.entries(form).map(([key, value]) => {
              if (key === "phone_country_code") return null;

              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {key.replace(/_/g, " ").toUpperCase()}
                  </label>
                  <Input
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="bg-white"
                  />
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-8">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
              onClick={handleSave}
            >
              Save Changes
            </Button>

            <Button
              variant="outline"
              className="w-full py-6 text-lg rounded-xl border-slate-300 hover:bg-slate-100 transition-all"
              onClick={() => (window.location.href = createPageUrl("ViewEmployee"))}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
