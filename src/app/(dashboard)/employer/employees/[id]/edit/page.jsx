// src/app/(dashboard)/employer/employees/[id]/edit/page.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import Card from "/src/components/ui/Card.jsx";
import Input from "/src/components/ui/Input.jsx";
import Button from "/src/components/ui/Button.jsx";
import { getEmployeeById, updateEmployee } from "/src/features/employees/api/employeesApi.js";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth.js";

export default function EmployerEmployeeEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { employer } = useEmployerAuth();
  const employerId = employer?.employerId;

  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    email: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEmployee() {
      try {
        setLoading(true);
        setError("");

        if (!employerId) {
          setError("Employer account not found. Please sign in again.");
          setEmployee(null);
          return;
        }

        const data = await getEmployeeById(id);

        if (String(data.employerid) !== String(employerId)) {
          setError("Unauthorized access.");
          setEmployee(null);
          return;
        }

        setEmployee({
          name: data.name || "",
          role: data.role || "",
          email: data.email || "",
        });
      } catch (err) {
        console.error("Failed to load employee:", err);
        setError("Employee not found.");
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    }

    loadEmployee();
  }, [id]);

  const handleChange = (field, value) => {
    setEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!employerId) {
        setError("Employer account not found. Please sign in again.");
        return;
      }

      await updateEmployee(id, {
        name: employee.name,
        role: employee.role,
        email: employee.email,
        employerid: employerId,
      });

      navigate("/employer/employees");
    } catch (err) {
      console.error("Failed to update employee:", err);
      setError("Failed to update employee.");
    }
  };

  return (
    <EmployerDashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10">

        <h1 className="text-4xl font-bold text-neutral-900">
          Edit Employee
        </h1>

        <Card className="p-8 border border-neutral-200 shadow-sm bg-white rounded-2xl">

          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}

          {loading ? (
            <p className="text-neutral-600 text-center">Loading employee...</p>
          ) : employee ? (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <Input
                  value={employee.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter full name"
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Role
                </label>
                <Input
                  value={employee.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  placeholder="Enter role"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={employee.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter email"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                  onClick={() => navigate("/employer/employees")}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Save Changes
                </Button>
              </div>

            </form>
          ) : (
            <p className="text-neutral-600 text-center">Employee not found.</p>
          )}

        </Card>
      </div>
    </EmployerDashboardLayout>
  );
}
