// src/app/(dashboard)/employer/employees/page.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import Card from "/src/components/ui/Card.jsx";
import Button from "/src/components/ui/Button.jsx";
import Input from "/src/components/ui/Input.jsx";
import { getEmployees } from "/src/features/employees/api/employeesApi.js";

export default function EmployerEmployeeListPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadEmployees() {
      setLoading(true);
      try {
        const data = await getEmployees();
        setEmployees(data || []);
      } catch (err) {
        console.error("Failed to load employees:", err);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    (emp.name || emp.full_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <EmployerDashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-neutral-900">
            Employees
          </h1>

          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => navigate("/employer/employees/add")}
          >
            Add Employee
          </Button>
        </div>

        {/* Card */}
        <Card className="p-6 border border-neutral-200 shadow-sm bg-white rounded-2xl">

          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-neutral-600 text-center py-6">
              Loading employees...
            </p>
          )}

          {/* Empty */}
          {!loading && filteredEmployees.length === 0 && (
            <p className="text-neutral-600 text-center py-6">
              No employees found.
            </p>
          )}

          {/* Table */}
          {!loading && filteredEmployees.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="py-3 text-sm font-semibold text-neutral-700">Name</th>
                    <th className="py-3 text-sm font-semibold text-neutral-700">Position</th>
                    <th className="py-3 text-sm font-semibold text-neutral-700">Email</th>
                    <th className="py-3 text-sm font-semibold text-neutral-700 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="border-b border-neutral-100">
                      <td className="py-4 text-neutral-900">
                        {emp.name || emp.full_name || "Unknown"}
                      </td>
                      <td className="py-4 text-neutral-700">
                        {emp.position || emp.role || "-"}
                      </td>
                      <td className="py-4 text-neutral-700">{emp.email}</td>
                      <td className="py-4 text-right">
                        <Button
                          variant="outline"
                          className="border-neutral-300 text-neutral-700 hover:bg-neutral-100 mr-2"
                          onClick={() => navigate(`/employer/employees/${emp.id}`)}
                        >
                          View
                        </Button>

                        <Button
                          variant="outline"
                          className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                          onClick={() => navigate(`/employer/employees/${emp.id}/edit`)}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </Card>
      </div>
    </EmployerDashboardLayout>
  );
}

