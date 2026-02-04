import { useEffect, useState } from "react";
import EmployerDashboardLayout from "@/layouts/EmployerDashboardLayout.jsx";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth";
import { Building2, Save } from "lucide-react";
import { toast } from "sonner";

// FSA → City/Province mapping (expandable)
const fsaMap = {
  "K1A": { city: "Ottawa", province: "ON" },
  "K2P": { city: "Ottawa", province: "ON" },
  "M5V": { city: "Toronto", province: "ON" },
  "M4B": { city: "Toronto", province: "ON" },
  "H2X": { city: "Montréal", province: "QC" },
  "H3Z": { city: "Montréal", province: "QC" },
  "V6B": { city: "Vancouver", province: "BC" },
  "V5K": { city: "Vancouver", province: "BC" },
};

export default function EmployerSettingsPage() {
  const { employer, login } = useEmployerAuth();

  const [form, setForm] = useState({
    // Responsible person
    firstName: "",
    lastName: "",
    personalIdType: "",
    personalIdNumber: "",

    // Company
    employeeRegistration: "",
    businessNumber: "",
    companyName: "",
    jobTitle: "",
    customJobTitle: "",
    allowCustomJobTitle: false,

    // Address
    unit: "",
    street: "",
    number: "",
    city: "",
    province: "",
    country: "Canada",
    postalCode: "",

    // Contact
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
        ...form,
        ...employer,
        preferredContact: employer.preferredContact || { phone: false, email: true },
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

  // Postal Code validation (Canada)
  function validatePostalCode(code) {
    const regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    return regex.test(code);
  }

  // Autocomplete City/Province from FSA
  function handlePostalCodeBlur() {
    if (!validatePostalCode(form.postalCode)) {
      toast.error("Invalid Canadian Postal Code format.");
      return;
    }

    const fsa = form.postalCode.substring(0, 3).toUpperCase();
    const match = fsaMap[fsa];

    if (match) {
      setForm({
        ...form,
        city: match.city,
        province: match.province,
        country: "Canada",
      });
    } else {
      toast.error("Postal Code not found in FSA database.");
    }
  }

  // Business Number validation
  function validateBusinessNumber(bn) {
    return /^\d{9}$/.test(bn);
  }

  // Personal ID validation
  function validatePersonalIdNumber(type, number) {
    if (!number.trim()) return false;

    switch (type) {
      case "Passport":
        return /^[A-Za-z0-9]{6,9}$/.test(number);
      case "DriversLicense":
        return /^[A-Za-z0-9]{5,15}$/.test(number);
      case "ProvincialID":
        return /^[A-Za-z0-9]{5,12}$/.test(number);
      case "PRCard":
        return /^[A-Za-z0-9]{6,12}$/.test(number);
      case "CitizenshipCertificate":
        return /^[A-Za-z0-9]{6,12}$/.test(number);
      default:
        return false;
    }
  }

  async function handleSave() {
    // Required fields
    if (!form.firstName || !form.lastName) {
      toast.error("First name and last name are required.");
      return;
    }

    if (!form.personalIdType) {
      toast.error("Personal ID type is required.");
      return;
    }

    if (!validatePersonalIdNumber(form.personalIdType, form.personalIdNumber)) {
      toast.error("Invalid Personal ID Number.");
      return;
    }

    if (!validateBusinessNumber(form.businessNumber)) {
      toast.error("Business Number must have exactly 9 digits.");
      return;
    }

    if (!form.street || !form.number || !form.city || !form.province || !form.country) {
      toast.error("All address fields except Unit/Apartment are required.");
      return;
    }

    if (!validatePostalCode(form.postalCode)) {
      toast.error("Invalid Postal Code.");
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

            {/* PERSONAL ID */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Personal ID Type *
                </label>
                <select
                  name="personalIdType"
                  value={form.personalIdType}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select ID Type</option>
                  <option value="Passport">Passport</option>
                  <option value="DriversLicense">Driver’s License</option>
                  <option value="ProvincialID">Provincial ID Card</option>
                  <option value="PRCard">Permanent Resident Card</option>
                  <option value="CitizenshipCertificate">Citizenship Certificate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Personal ID Number *
                </label>
                <input
                  type="text"
                  name="personalIdNumber"
                  value={form.personalIdNumber}
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
              disabled={form.allowCustomJobTitle}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2"
            >
              <option value="">Select a job title</option>
              <option value="Manager">Manager</option>
              <option value="Supervisor">Supervisor</option>
              <option value="HR Specialist">HR Specialist</option>
            </select>

            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="allowCustomJobTitle"
                checked={form.allowCustomJobTitle}
                onChange={(e) =>
                  setForm({ ...form, allowCustomJobTitle: e.target.checked })
                }
              />
              I didn’t find my job title
            </label>

            {form.allowCustomJobTitle && (
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
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-800">Company Address</h2>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Postal Code *
              </label>
              <input
                type="text"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                onBlur={handlePostalCodeBlur}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Unit / Apt
                </label>
                <input
                  type="text"
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Street *
                </label>
                <input
                  type="text"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Number *
                </label>
                <input
                  type="text"
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Province *
                </label>
                <input
                  type="text"
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  readOnly
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 bg-neutral-100"
                />
              </div>
            </div>
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
