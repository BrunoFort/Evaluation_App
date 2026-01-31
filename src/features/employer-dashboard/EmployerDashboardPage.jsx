import React from "react";
import EmployerDashboardLayout from "@/layouts/EmployerDashboardLayout";
import Card from "@/components/ui/Card.jsx";
import Button from "@/components/ui/Button.jsx";
import { Users, FileText, UserPlus, LogOut } from "lucide-react";

export default function EmployerDashboardPage() {
  return (
    <EmployerDashboardLayout>

      <h1 className="text-4xl font-bold text-neutral-900 mb-10">
        Employer Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Card className="shadow-lg border border-neutral-200 bg-white rounded-2xl">
          <div className="p-6 flex flex-col items-center text-center">
            <Users className="h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Manage Employees
            </h2>
            <p className="text-neutral-600 mb-4">
              View, edit, and manage all employee profiles.
            </p>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => (window.location.href = "/employer/employees")}
            >
              Open
            </Button>
          </div>
        </Card>

        <Card className="shadow-lg border border-neutral-200 bg-white rounded-2xl">
          <div className="p-6 flex flex-col items-center text-center">
            <FileText className="h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Create Evaluation
            </h2>
            <p className="text-neutral-600 mb-4">
              Start a new performance evaluation for an employee.
            </p>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => (window.location.href = "/employer/evaluations/create")}
            >
              Start
            </Button>
          </div>
        </Card>

        <Card className="shadow-lg border border-neutral-200 bg-white rounded-2xl">
          <div className="p-6 flex flex-col items-center text-center">
            <UserPlus className="h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Add Employee
            </h2>
            <p className="text-neutral-600 mb-4">
              Register a new employee into your company system.
            </p>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => (window.location.href = "/employer/employees/add")}
            >
              Add
            </Button>
          </div>
        </Card>

        <Card className="shadow-lg border border-neutral-200 bg-white rounded-2xl">
          <div className="p-6 flex flex-col items-center text-center">
            <LogOut className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Logout
            </h2>
            <p className="text-neutral-600 mb-4">
              Sign out of your employer account.
            </p>
            <Button
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
              onClick={() => (window.location.href = "/employer/login")}
            >
              Logout
            </Button>
          </div>
        </Card>

      </div>

    </EmployerDashboardLayout>
  );
}
