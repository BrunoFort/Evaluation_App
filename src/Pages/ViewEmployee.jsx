import React from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Star, Mail, Phone, FileText } from "lucide-react";
import { createPageUrl } from "../utils";

export default function ViewEmployee() {
  const employee = {
    id: 1,
    full_name: "John Doe",
    position: "Software Developer",
    personal_email: "john.doe@gmail.com",
    work_email: "john.doe@company.com",
    phone_country_code: "+1",
    phone_number: "613-555-1234",
    employee_id: "EMP-001",
    registration_number: "REG-2024-001",
    sin: "123-456-789",
    profile_completed: true,
  };

  const evaluations = [];

  return (
    <CompanyLayout>
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-8">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-slate-900">{employee.full_name}</h1>
          <p className="text-slate-600">{employee.position}</p>
          <Badge className="mt-2 bg-green-500">Profile Complete</Badge>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-8">
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoItem icon={<Mail />} label="Personal Email" value={employee.personal_email} />
          <InfoItem icon={<Mail />} label="Work Email" value={employee.work_email} />
          <InfoItem
            icon={<Phone />}
            label="Phone"
            value={`${employee.phone_country_code} ${employee.phone_number}`}
          />
          <InfoItem icon={<FileText />} label="Employee ID" value={employee.employee_id} />
          <InfoItem icon={<FileText />} label="Registration #" value={employee.registration_number} />
          <InfoItem icon={<FileText />} label="SIN" value={employee.sin} />
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-2 text-slate-500 mb-1">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <p className="font-medium">{value}</p>
    </div>
  );
}
