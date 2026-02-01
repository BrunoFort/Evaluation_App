import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import CompanyLayout from "/src/layouts/CompanyLayout.jsx";
import Card from "/src/components/ui/Card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";

export default function AddEmployeePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          createdAt: new Date().toISOString(),
          status: "active",
        }),
      });

      if (!res.ok) throw new Error("Failed to save employee");

      const saved = await res.json();
      navigate(`/employees/${saved.id}`);
    } catch (err) {
      console.error(err);
      setError("There was an error saving the employee. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <CompanyLayout>
      <div className="max-w-2xl mx-auto space-y-10">

        <PageHeader
          title="Add Employee"
          subtitle="Register a new team member"
          right={
            <Link
              to="/employees"
              className="text-sm text-purple-600 hover:text-purple-800 transition"
            >
              Back to list
            </Link>
          }
        />

        {error && (
          <Card className="border-red-200 bg-red-50 text-red-700 p-4">
            {error}
          </Card>
        )}

        <Card className="p-8 border border-neutral-200 shadow-sm bg-white rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* BASIC INFO */}
            <SectionCard title="Basic Information">
              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Name
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Employee full name"
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
                    required
                    placeholder="email@example.com"
                  />
                </div>

              </div>
            </SectionCard>

            {/* JOB DETAILS */}
            <SectionCard title="Job Details">
              <div className="space-y-4">

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
                    Department
                  </label>
                  <Input
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="Department name"
                  />
                </div>

              </div>
            </SectionCard>

            {/* ACTIONS */}
            <div className="pt-4 flex justify-end gap-3">
              <Link
                to="/employees"
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
    </CompanyLayout>
  );
}

