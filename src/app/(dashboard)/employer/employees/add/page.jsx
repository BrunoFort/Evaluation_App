import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import Card from "/src/components/ui/Card.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";
import Input from "/src/components/ui/Input.jsx";
import Button from "/src/components/ui/Button.jsx";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth.js";
import { createEmployee } from "/src/features/employees/api/employeesApi.js";

export default function EmployerEmployeeAddPage() {
  const navigate = useNavigate();
  const { employer } = useEmployerAuth();
  const employerId = employer?.employerId;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (!employerId) {
        setError("Employer account not found. Please sign in again.");
        return;
      }

      await createEmployee({
        employerid: employerId,
        name: form.name || form.email || "Employee",
        role: form.role,
        email: form.email,
      });

      navigate("/employer/employees");
    } catch (err) {
      console.error(err);
      setError("There was an error saving the employee. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <EmployerDashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900">Add Employee</h1>
            <p className="text-neutral-600 mt-1">
              Register a new employee in your organization
            </p>
          </div>

          <Link
            to="/employer/employees"
            className="text-sm text-purple-600 hover:text-purple-800 transition"
          >
            Back to list
          </Link>
        </div>

            {/* BASIC INFO */}
            <SectionCard title="Employee Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Employee full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Role
                  </label>
                  <Input
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="Job title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                  />
                </div>

              </div>
            </SectionCard>
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Country"
                  />
                </div>

              </div>
            </SectionCard>

            {/* ACTIONS */}
            <div className="pt-4 flex justify-end gap-3">
              <Link
                to="/employer/employees"
                className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition"
              >
                Cancel
              </Link>

              <Button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white"
              >
                {saving ? "Saving..." : "Save Employee"}
              </Button>
            </div>

          </form>
        </Card>
      </div>
    </EmployerDashboardLayout>
  );
}
