// src/features/employees/pages/EditEmployee.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CompanyLayout from "../../../Layouts/CompanyLayout";
import { useEmployee } from "../hooks/useEmployee";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee, loading } = useEmployee(id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load employee data into form
  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name || "",
        email: employee.email || "",
        role: employee.role || "",
        department: employee.department || "",
      });
    }
  }, [employee]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:4000/employees/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update employee");

      navigate(`/employees/${id}`);
    } catch (err) {
      console.error(err);
      setError("There was an error updating the employee. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <CompanyLayout>
        <p className="text-slate-500">Loading employee...</p>
      </CompanyLayout>
    );
  }

  if (!employee) {
    return (
      <CompanyLayout>
        <p className="text-red-600">Employee not found.</p>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="max-w-xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Edit Employee</h1>

          <Link
            to={`/employees/${id}`}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Back to profile
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg border border-slate-200 shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Employee full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Job title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Department
            </label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Department name"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Link
              to={`/employees/${id}`}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </CompanyLayout>
  );
}
