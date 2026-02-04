import { useEffect, useState } from "react";
import EmployerDashboardLayout from "@/layouts/EmployerDashboardLayout.jsx";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth";
import { Building2, Save } from "lucide-react";
import { toast } from "sonner";

export default function EmployerSettingsPage() {
  const { employer, login } = useEmployerAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    employeeRegistration: "",
    businessNumber: "",
    companyName: "",
    jobTitle: "",
    customJobTitle: "",
    address: "",
    phoneCountry: "+1",
    phoneNumber: "",
    contactEmail: "",
    preferredContact: {
      phone: false,
      email: true,
    },
  });

  const [saving, setSaving] = useState(false);

  // Load employer data
  useEffect(() => {
    if (employer) {
      setForm({
        firstName: employer.firstName || "",
        lastName: employer.lastName || "",
        employeeRegistration: employer.employeeRegistration || "",
        businessNumber: employer.businessNumber || "",
        companyName: employer.companyName || "",
        jobTitle: employer.jobTitle || "",
        customJobTitle: employer.customJobTitle || "",
        address: employer.address || "",
        phoneCountry: employer.phoneCountry || "+1",
        phoneNumber: employer.phoneNumber || "",
        contactEmail: employer.contactEmail || "",
        preferredContact: employer.preferredContact || {
          phone: false,
          email: true,
        },
      });
    }
  }, [employer]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("preferredContact")) {
      const key = name.split(".")[1];
      setForm({
        ...form,
        preferredContact: {
          ...form.preferredContact,
          [key]: checked,
        },
      });
      return;
    }

    setForm({ ...form, [name]: value });
  }

  function validateBusinessNumber(bn) {
    return /^\d{9}$/.test(bn);
  }

  async function handleSave() {
    if (!form.firstName || !form.lastName) {
      toast.error("First name and last name are required.");
      return;
    }

    if (!validateBusinessNumber(form.businessNumber)) {
      toast.error("Business Number must have exactly 9 digits.");
      return;
    }

    if (!form.address.trim()) {
      toast.error("Company address is required.");
      return;
    }

    if (!form.contactEmail.includes("@")) {
      toast.error("Invalid email format.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(
        `http://localhost:4000/employers/${employer.employerId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const updated = await res.json();

      login({
        ...employer,
        ...updated,
      });

      toast.success("Settings saved successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Error saving settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <EmployerDashboardLayout>
      <div className="max-w-3xl mx-auto bg-white border border-neutral-200 rounded-xl shadow-sm p-8 space-y-10">

        {/* HEADER */}
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-neutral-900">
            Company Settings
          </h1>
        </div>

        <div className="space-y-8">

          {/* RESPONSIBLE PERSON */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-800">Responsible Person</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* EMPLOYEE REGISTRATION */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Employee Registration Number *
            </label>
            <input
              type="text"
              name="employeeRegistration"
              value={form.employeeRegistration}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* BUSINESS NUMBER */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Business Number (9 digits) *
            </label>
            <input
              type="text"
              name="businessNumber"
              value={form.businessNumber}
              onChange={handleChange}
              maxLength={9}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* COMPANY NAME */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* JOB TITLE */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Job Title (NOC 2021 v1.0)
            </label>

            <select
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2"
            >
              <option value="">Select a job title</option>
              <option value="Manager">Manager</option>
              <option value="Supervisor">Supervisor</option>
              <option value="HR Specialist">HR Specialist</option>
              <option value="Custom">Other (type manually)</option>
            </select>

            {form.jobTitle === "Custom" && (
              <input
                type="text"
                name="customJobTitle"
                value={form.customJobTitle}
                onChange={handleChange}
                placeholder="Enter custom job title"
                className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              />
            )}
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Company Address *
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* PHONE */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Country Code
              </label>
              <select
                name="phoneCountry"
                value={form.phoneCountry}
                onChange={handleChange}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              >
                <option value="+1">🇨🇦 +1 Canada</option>
                <option value="+1">🇺🇸 +1 USA</option>
                <option value="+55">🇧🇷 +55 Brazil</option>
                <option value="+44">🇬🇧 +44 UK</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Contact Email *
            </label>
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* PREFERRED CONTACT */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Preferred Contact Method
            </label>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="preferredContact.phone"
                  checked={form.preferredContact.phone}
                  onChange={handleChange}
                />
                Phone
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="preferredContact.email"
                  checked={form.preferredContact.email}
                  onChange={handleChange}
                />
                Email
              </label>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 font-semibold"
          >
            <Save className="w-5 h-5" />
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </EmployerDashboardLayout>
  );
}
