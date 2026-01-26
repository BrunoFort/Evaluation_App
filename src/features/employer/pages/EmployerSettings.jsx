import React, { useEffect, useState } from "react";
import EmployerLayout from "@/Layouts/EmployerLayout";
import { useAuth } from "../../auth/useAuth";
import { Building2, Save } from "lucide-react";

export default function EmployerSettings() {
  const { employer, setEmployer } = useAuth();
  const [form, setForm] = useState({
    companyName: "",
    website: "",
    contactEmail: "",
    logoUrl: "",
    description: ""
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (employer) {
      setForm({
        companyName: employer.companyName || "",
        website: employer.website || "",
        contactEmail: employer.contactEmail || "",
        logoUrl: employer.logoUrl || "",
        description: employer.description || ""
      });
    }
  }, [employer]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    setSaving(true);

    try {
      const res = await fetch(`http://localhost:4000/employers/${employer.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const updated = await res.json();
      setEmployer(updated);
      alert("Settings saved successfully.");
    } catch (err) {
      console.error(err);
      alert("Error saving settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <EmployerLayout>
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-8">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900">Company Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Logo URL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Logo URL
            </label>
            <input
              type="text"
              name="logoUrl"
              value={form.logoUrl}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />

            {form.logoUrl && (
              <img
                src={form.logoUrl}
                alt="Logo preview"
                className="mt-3 h-16 object-contain border rounded-lg p-2 bg-white"
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </EmployerLayout>
  );
}
