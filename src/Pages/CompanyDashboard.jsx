import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { createPageUrl } from "../utils";
import { Users, FileText, LogOut, UserPlus } from "lucide-react";

export default function CompanyDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 text-center mb-10">
          Company Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Manage Employees */}
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
                onClick={() => navigate(createPageUrl("EmployeeList"))}
              >
                Open
              </Button>
            </CardContent>
          </Card>

          {/* Create Evaluation */}
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
                onClick={() => navigate(createPageUrl("CreateEvaluation"))}
              >
                Start
              </Button>
            </CardContent>
          </Card>

          {/* Add New Employee */}
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
                onClick={() => navigate(createPageUrl("EmployeeRegistration"))}
              >
                Add
              </Button>
            </CardContent>
          </Card>

          {/* Logout */}
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
                onClick={() => navigate(createPageUrl("CompanyLogin"))}
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
