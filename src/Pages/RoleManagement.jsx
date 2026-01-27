import React, { useState } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import Button from "/src/components/ui/Button.jsx";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";

export default function RoleManagement() {
  // MOCK employees with roles
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", role: "Employee" },
    { id: 2, name: "Sarah Miller", role: "Manager" },
    { id: 3, name: "Carlos Silva", role: "Employee" },
    { id: 4, name: "Maria Santos", role: "Admin" },
  ]);

  const roles = ["Employee", "Manager", "Admin"];

  const updateRole = (id, newRole) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, role: newRole } : emp
      )
    );
  };

  const saveChanges = () => {
    console.log("Updated roles:", employees);
  };

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Role Management
      </h1>

      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Manage User Roles
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  {emp.name}
                </p>
                <p className="text-slate-600 text-sm">Current role: {emp.role}</p>
              </div>

              <Select
                value={emp.role}
                onValueChange={(value) => updateRole(emp.id, value)}
              >
                <SelectTrigger className="w-48 bg-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all mt-6"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
