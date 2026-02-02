import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import Card from "/src/components/ui/Card.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";
import Input from "/src/components/ui/Input.jsx";
import Button from "/src/components/ui/Button.jsx";

export default function EmployerEmployeeAddPage() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    employeeId: "",
    role: "",
    department: "",
    firstName: "",
    lastName: "",
    personalIdType: "",
    personalIdNumber: "",
    email: "",
    phone: "",
    street: "",
    unit: "",
    postalCode: "",
    city: "",
    province: "",
    country: "",
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
      // MOCK — integração real virá depois
      console.log("Saving employee:", form);

      // Redireciona para a lista
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

        {error && (
          <Card className="border-red-200 bg-red-50 text-red-700 p-4">
            {error}
          </Card>
        )}

        <Card className="p-8 border border-neutral-200 shadow-sm bg-white rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* IDENTIFICATION */}
            <SectionCard title="Employee Identification">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Employee ID (Internal)
                  </label>
                  <Input
                    name="employeeId"
                    value={form.employeeId}
                    onChange={handleChange}
                    placeholder="Internal employee ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Role / Position
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
                    Department
                  </label>
                  <Input
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="Department"
                  />
                </div>

              </div>
            </SectionCard>

            {/* PERSONAL INFO */}
            <SectionCard title="Personal Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Personal ID Type
                  </label>
                  <Input
                    name="personalIdType"
                    value={form.personalIdType}
                    onChange={handleChange}
                    placeholder="Passport, ID, Driver License..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Personal ID Number
                  </label>
                  <Input
                    name="personalIdNumber"
                    value={form.personalIdNumber}
                    onChange={handleChange}
                    placeholder="Document number"
                  />
                </div>

              </div>
            </SectionCard>

            {/* CONTACT */}
            <SectionCard title="Contact Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Personal Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 123‑4567"
                  />
                </div>

              </div>
            </SectionCard>

            {/* ADDRESS */}
            <SectionCard title="Address">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Street / Number
                  </label>
                  <Input
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    placeholder="Street and number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Unit / Apartment
                  </label>
                  <Input
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    placeholder="Unit, apt, suite..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Postal Code
                  </label>
                  <Input
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="Postal code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    City
                  </label>
                  <Input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Province / State
                  </label>
                  <Input
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    placeholder="Province or state"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Country
                  </label>
                  <Input
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
