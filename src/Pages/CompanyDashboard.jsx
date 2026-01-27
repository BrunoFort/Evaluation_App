import React from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardContent } from "../components/ui/card";
import Button from "/src/components/ui/Button.jsx";
import { createPageUrl } from "../utils";
import { Users, FileText, UserPlus, LogOut } from "lucide-react";

export default function CompanyDashboard() {
  return (
    <CompanyLayout>
      <h1 className="text-4xl font-bold text-slate-900 mb-10">
        Company Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg border-2 border-blue-100 bg-white/80 backdrop-blur">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Users className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Manage Employees
            </h2>
            <p className="text-slate-600 mb-4">
              View, edit, and manage all employee profiles.
            </p>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => (window.location.href = createPageUrl("ViewEmployee"))}
            >
              Open
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-2 border-blue-100 bg-white/80 backdrop-blur">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <FileText className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Create Evaluation
            </h2>
            <p className="text-slate-600 mb-4">
              Start a new performance evaluation for an employee.
            </p>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => (window.location.href = createPageUrl("CreateEvaluation"))}
            >
              Start
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-2 border-blue-100 bg-white/80 backdrop-blur">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <UserPlus className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Add Employee
            </h2>
            <p className="text-slate-600 mb-4">
              Register a new employee into your company system.
            </p>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => (window.location.href = createPageUrl("AddEmployee"))}
            >
              Add
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-2 border-blue-100 bg-white/80 backdrop-blur">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <LogOut className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Logout
            </h2>
            <p className="text-slate-600 mb-4">
              Sign out of your company account.
            </p>
            <Button
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
              onClick={() => (window.location.href = createPageUrl("CompanyLogin"))}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </CompanyLayout>
  );
}
