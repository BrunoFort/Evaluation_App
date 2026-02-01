// src/app/(dashboard)/company/employees/page.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "/src/components/ui/Card.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import StatusPill from "/src/components/ui/StatusPill.jsx";

import { getEmployees } from "/src/features/employees/api/employeesApi";

export default function EmployeesListPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (err) {
        console.error("Failed to load employees:", err);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      <PageHeader
        title="Employees"
        subtitle="Manage your team"
        right={
          <Button
            as={Link}
            to="/employees/new"
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Add Employee
          </Button>
        }
      />

      <Card className="p-0 border border-neutral-200 shadow-sm rounded-2xl bg-white">
        <div className="divide-y divide-neutral-200">
          {employees.map((emp) => (
            <Link
              key={emp.id}
              to={`/employees/${emp.id}`}
              className="flex items-center justify-between py-4 px-4 hover:bg-neutral-50 transition"
            >
              <div>
                <p className="font-medium text-neutral-900">{emp.name}</p>
                <p className="text-sm text-neutral-600">{emp.email}</p>
              </div>

              <StatusPill status={emp.status || "active"} />
            </Link>
          ))}

          {employees.length === 0 && (
            <p className="text-center text-neutral-500 py-6">
              No employees found.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

