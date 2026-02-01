// src/app/(dashboard)/employer/employees/[id]/edit/page.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import Card from "/src/components/ui/Card.jsx";
import Input from "/src/components/ui/Input.jsx";
import Button from "/src/components/ui/Button.jsx";
import Textarea from "/src/components/ui/Textarea.jsx";

export default function EmployerEmployeeEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    async function loadEmployee() {
      try {
        setLoading(true);

        // MOCK — integração real virá depois
        const data = {
          name: "John Doe",
          position: "Frontend Developer",
          email: "john.doe@example.com",
          notes: "Strong performer, great communication.",
        };

        setEmployee(data);
      } finally {
        setLoading(false);
      }
    }

    loadEmployee();
  }, [id]);

  const handleChange = (field, value) => {
    setEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // MOCK — integração real virá depois
    navigate("/employer/employees");
  };

  return (
    <EmployerDashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10">

        <h1 className="text-4xl font-bold text-neutral-900">
          Edit Employee
        </h1>

        <Card className="p-8 border border-neutral-200 shadow-sm bg-white rounded-2xl">

          {loading ? (
            <p className="text-neutral-600 text-center">Loading employee...</p>
          ) : (
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
                  Position
                </label>
                <Input
                  value={employee.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                  placeholder="Enter position"
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

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Notes
                </label>
                <Textarea
                  rows={5}
                  value={employee.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Additional notes about this employee..."
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
          )}

        </Card>
      </div>
    </EmployerDashboardLayout>
  );
}
