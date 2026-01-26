import React, { useEffect, useState } from "react";
import EmployeeLayout from "@/Layouts/EmployeeLayout";

export default function EmployeeProfileEdit() {
  const [employee, setEmployee] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoUrl: "",
    bio: "",
    linkedin: "",
    github: ""
  });

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
        github: emp.github || ""
      });
    }
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    if (!employee) return;

    try {
      const res = await fetch(`http://localhost:4000/candidates/${employee.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const updated = await res.json();
      localStorage.setItem("employee", JSON.stringify(updated));
      alert("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
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
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6 max-w-xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
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
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Photo URL
          </label>
          <input
            type="text"
            name="photoUrl"
            value={form.photoUrl}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />

          {form.photoUrl && (
            <img
              src={form.photoUrl}
              alt="Preview"
              className="mt-3 h-20 w-20 rounded-full object-cover border"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            LinkedIn
          </label>
          <input
            type="text"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            GitHub
          </label>
          <input
            type="text"
            name="github"
            value={form.github}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </EmployeeLayout>
  );
}

