import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompanyLayout from "../../../Layouts/CompanyLayout";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    status: "",
    photoUrl: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/employees/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "",
          department: data.department || "",
          status: data.status || "",
          photoUrl: data.photoUrl || "",
        });
      });
  }, [id]);

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
      setError("There was an error updating this employee.");
    } finally {
      setSaving(false);
    }
  }

  if (!employee) {
    return (
      <CompanyLayout>
        <p className="text-slate-500">Loading employee...</p>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">

        <h1 className="text-2xl font-bold text-slate-900">Edit Employee</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Photo URL
            </label>
            <input
              name="photoUrl"
              value={form.photoUrl}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              placeholder="https://example.com/photo.jpg"
            />

            {form.photoUrl && (
              <img
                src={form.photoUrl}
                alt="Preview"
                className="h-24 w-24 rounded-full object-cover mt-3 border"
              />
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Email */}
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
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              placeholder="e.g. Software Engineer"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Department
            </label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              placeholder="e.g. Engineering"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="terminated">Terminated</option>
              <option value="on_leave">On Leave</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex justify-end gap-3">
            <Button
            variant="outline"
            type="button"
            onClick={() => navigate(`/employees/${id}`)}
            >
            Cancel
            </Button>

            <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
            </Button>

          </div>
        </form>
      </div>
    </CompanyLayout>
  );
}
