import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "/src/components/ui/card.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import StatusPill from "/src/components/ui/StatusPill.jsx";

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:4000/employees");
      const data = await res.json();
      setEmployees(data);
    }
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <PageHeader
        title="Employees"
        subtitle="Manage your team"
        right={
          <Button as={Link} to="/employees/new">
            Add Employee
          </Button>
        }
      />

      <Card className="p-0">
        <div className="divide-y divide-slate-200">
          {employees.map((emp) => (
            <Link
              key={emp.id}
              to={`/employees/${emp.id}`}
              className="flex items-center justify-between py-4 px-4 hover:bg-slate-50 transition"
            >
              <div>
                <p className="font-medium text-slate-900">{emp.name}</p>
                <p className="text-sm text-slate-500">{emp.email}</p>
              </div>

              <StatusPill status={emp.status || "active"} />
            </Link>
          ))}

          {employees.length === 0 && (
            <p className="text-center text-slate-500 py-6">
              No employees found.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
