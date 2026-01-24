import React, { useState } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { createPageUrl } from "../utils";

export default function AddEmployee() {
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

  return (
    <CompanyLayout>
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900">
            Register New Employee
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardContent className="p-8">
          <form className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {Object.keys(form).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {key.replace(/_/g, " ").toUpperCase()}
                  </label>
                  <Input
                    value={form[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="bg-white"
                  />
                </div>
              ))}
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl">
              Register Employee
            </Button>
          </form>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
