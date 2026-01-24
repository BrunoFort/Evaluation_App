import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { createPageUrl } from "../utils";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    personal_email: "",
    work_email: "",
    phone_country_code: "+1",
    phone_number: "",
    position: "",
    employee_id: "",
    registration_number: "",
    sin: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // MOCK submit
    console.log("Employee registered:", form);

    navigate(createPageUrl("ViewEmployee"));
  };

  const fields = [
    { key: "full_name", label: "Full Name", placeholder: "John Doe" },
    { key: "personal_email", label: "Personal Email", placeholder: "john@gmail.com" },
    { key: "work_email", label: "Work Email", placeholder: "john@company.com" },
    { key: "phone_number", label: "Phone Number", placeholder: "613-555-1234" },
    { key: "position", label: "Position", placeholder: "Software Developer" },
    { key: "employee_id", label: "Employee ID", placeholder: "EMP-001" },
    { key: "registration_number", label: "Registration #", placeholder: "REG-2024-001" },
    { key: "sin", label: "SIN", placeholder: "123-456-789" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Register New Employee
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700">
              Fill out the form below to add a new employee to your company.
            </p>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">

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
                {fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {field.label}
                    </label>
                    <Input
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="bg-white"
                    />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 mt-8">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Register Employee
                </Button>

                <Button
                  variant="outline"
                  className="w-full py-6 text-lg rounded-xl border-slate-300 hover:bg-slate-100 transition-all"
                  onClick={() => navigate(createPageUrl("CompanyDashboard"))}
                >
                  Cancel
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
