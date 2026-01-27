import React, { useEffect, useState } from "react";
import EmployeeLayout from "../Layouts/EmployeeLayout";

export default function EmployeeProfileEdit() {
  const [employee, setEmployee] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoUrl: "",
    bio: "",
    linkedin: "",
    github: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("employee");
    if (stored) {
      const emp = JSON.parse(stored);
      setEmployee(emp);

      setForm({
        name: emp.name || "",
        email: emp.email || "",
        photoUrl: emp.photoUrl || "",
        bio: emp.bio || "",
        linkedin: emp.linkedin || "",
        github: emp.github || "",
      });
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:4000/employees/${employee.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = { ...employee, ...form };
      localStorage.setItem("employee", JSON.stringify(updated));

      window.location.href = "/employee/profile";
    } catch (err) {
      console.error(err);
      setError("There was an error updating your profile.");
    } finally {
      setSaving(false);
    }
  }

  if (!employee) {
    return (
      <EmployeeLayout>
        <p className="text-slate-500">Loading...</p>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit Profile</h1>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Foto */}
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

          {/* Nome */}
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

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              placeholder="Tell us a bit about yourself..."
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              LinkedIn
            </label>
            <input
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              GitHub
            </label>
            <input
              name="github"
              value={form.github}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              placeholder="https://github.com/username"
            />
          </div>

          {/* Botões */}
          <div className="pt-4 flex justify-end gap-3">
            <a
              href="/employee/profile"
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </a>

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
    </EmployeeLayout>
  );
}
