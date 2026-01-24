import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { createPageUrl } from "../utils";

export default function EmployeeProfile() {
  const navigate = useNavigate();

  // MOCK employee data
  const employee = {
    name: "John Doe",
    email: "john.doe@example.com",
    position: "Software Developer",
    department: "Engineering",
    lastEvaluation: "2024-11-15",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <Card className="w-full max-w-2xl shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">
            Employee Profile
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Name</span>
              <span className="text-slate-900">{employee.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Email</span>
              <span className="text-slate-900">{employee.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Position</span>
              <span className="text-slate-900">{employee.position}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Department</span>
              <span className="text-slate-900">{employee.department}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Last Evaluation</span>
              <span className="text-slate-900">{employee.lastEvaluation}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
              onClick={() => navigate(createPageUrl("PublicEvaluation"))}
            >
              View Evaluation
            </Button>

            <Button
              variant="outline"
              className="w-full py-6 text-lg rounded-xl border-slate-300 hover:bg-slate-100 transition-all"
              onClick={() => navigate(createPageUrl("EmployeeLogin"))}
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
