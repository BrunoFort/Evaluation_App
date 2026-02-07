import { useEffect, useState } from "react";
import EmployerDashboardLayout from "@/layouts/EmployerDashboardLayout.jsx";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth";
import { Building2, Save } from "lucide-react";
import { toast } from "sonner";
import NOCJobSelector from "@/features/shared-noc/NOCJobSelector";
import { validateBusinessNumber } from "@/features/auth/shared/api/validateBusinessNumber";
import { getEmployerById, updateEmployer } from "@/features/employers/api/employersApi";

const fsaMap = {
  K1A: { city: "Ottawa", province: "ON" },
  K2P: { city: "Ottawa", province: "ON" },
  M5V: { city: "Toronto", province: "ON" },
  M4B: { city: "Toronto", province: "ON" },
  H2X: { city: "Montréal", province: "QC" },
  H3Z: { city: "Montréal", province: "QC" },
  V6B: { city: "Vancouver", province: "BC" },
  V5K: { city: "Vancouver", province: "BC" },
};

export default function EmployerSettingsPage() {
  const { employer, login } = useEmployerAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    personalIdType: "",
    personalIdNumber: "",
    employeeRegistration: "",
    businessNumber: "",
    companyName: "",
    jobTitle: "",
    customJobTitle: "",
    allowCustomJobTitle: false,
    unit: "",
    street: "",
    number: "",
    city: "",
    province: "",
    country: "Canada",
    postalCode: "",
    phoneCountry: "+1",
    phoneNumber: "",
    contactEmail: "",
    preferredContact: {
      phone: false,
      email: true,
    },
  });

  const [saving, setSaving] = useState(false);
  const [loadingBN, setLoadingBN] = useState(false);

  useEffect(() => {
    async function load() {
      if (!employer?.employerId) return;

      try {
        const data = await getEmployerById(employer.employerId);

        setForm((prev) => ({
          ...prev,
          ...data,
          preferredContact: data.preferredContact || { phone: false, email: true },
        }));
      } catch (err) {
        console.error(err);
        toast.error("Error loading employer settings.");
      }
    }

    load();
  }, [employer]);

  function handleChange(e) {
    const { name, value, checked } = e.target;

    if (name.startsWith("preferredContact")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        preferredContact: {
          ...prev.preferredContact,
          [key]: checked,
        },
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validatePostalCode(code) {
    const regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    return regex.test(code);
  }

  function handlePostalCodeBlur() {
    if (!validatePostalCode(form.postalCode)) {
      toast.error("Invalid Canadian Postal Code format.");
      return;
    }

    const fsa = form.postalCode.substring(0, 3).toUpperCase();
    const match = fsaMap[fsa];

    if (match) {
      setForm((prev) => ({
        ...prev,
        city: match.city,
        province: match.province,
        country: "Canada",
      }));
    } else {
      toast.error("Postal Code not found in FSA database.");
    }
  }

  function validateBusinessNumberLocal(bn) {
    return /^\d{9}$/.test(bn);
  }

  async function handleBusinessNumberBlur(e) {
    const bn = e.target.value;
    if (!bn) return;

    if (!validateBusinessNumberLocal(bn)) {
      toast.error("Business Number must have exactly 9 digits.");
      return;
    }

    try {
      setLoadingBN(true);
      const result = await validateBusinessNumber(bn);
      setForm((prev) => ({
        ...prev,
        companyName: result.companyName || prev.companyName,
      }));
    } catch (err) {
      toast.error(err.message || "Error validating Business Number.");
    } finally {
      setLoadingBN(false);
    }
  }

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

    if (!validateBusinessNumberLocal(form.businessNumber)) {
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
      const updated = await updateEmployer(employer.employerId, form);

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
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-800">Employer</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">First Name *</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Last Name *</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Personal ID Type *</label>
                <select name="personalIdType" value={form.personalIdType} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2">
                  <option value="">Select ID Type</option>
                  <option value="Passport">Passport</option>
                  <option value="DriversLicense">Driver’s License</option>
                  <option value="ProvincialID">Provincial ID Card</option>
                  <option value="PRCard">Permanent Resident Card</option>
                  <option value="CitizenshipCertificate">Citizenship Certificate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Personal ID Number *</label>
                <input type="text" name="personalIdNumber" value={form.personalIdNumber} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-800">Company</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Employee Registration Number *</label>
                <input type="text" name="employeeRegistration" value={form.employeeRegistration} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-neutral-700">Job Title</label>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-700">Custom entry</span>
                    <input type="checkbox" checked={form.allowCustomJobTitle} onChange={(e) => setForm((prev) => ({ ...prev, allowCustomJobTitle: e.target.checked }))} />
                  </div>
                </div>

                <NOCJobSelector
                  useCustom={form.allowCustomJobTitle}
                  value={form.allowCustomJobTitle ? form.customJobTitle : form.jobTitle}
                  onChange={(v) =>
                    setForm((prev) =>
                      prev.allowCustomJobTitle ? { ...prev, customJobTitle: v } : { ...prev, jobTitle: v }
                    )
                  }
                  className="h-[42px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Business Number (9 digits) *</label>
                <input type="text" name="businessNumber" value={form.businessNumber} onChange={handleChange} onBlur={handleBusinessNumberBlur} maxLength={9} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Company Name *</label>
                <input type="text" name="companyName" value={form.companyName} readOnly disabled={loadingBN} className="w-full border border-neutral-300 rounded-lg px-3 py-2 bg-neutral-100" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <label className="block text-sm font-medium text-neutral-700 mb-1">Street *</label>
                <input type="text" name="street" value={form.street} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Number *</label>
                <input type="text" name="number" value={form.number} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Unit / Apartment</label>
                <input type="text" name="unit" value={form.unit} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">City *</label>
                <input type="text" name="city" value={form.city} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Province / Territory *</label>
                <input type="text" name="province" value={form.province} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Country *</label>
                <input type="text" name="country" value={form.country} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Postal Code *</label>
                <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} onBlur={handlePostalCodeBlur} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Country Code</label>
                <select name="phoneCountry" value={form.phoneCountry} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2">
                  <option value="+1">🇨🇦 +1 Canada</option>
                  <option value="+1">🇺🇸 +1 USA</option>
                  <option value="+55">🇧🇷 +55 Brazil</option>
                  <option value="+44">🇬🇧 +44 UK</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
                <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Contact Email *</label>
              <input type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange} className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">Preferred Contact Method</label>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="preferredContact.phone" checked={form.preferredContact.phone} onChange={handleChange} />
                  Phone
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" name="preferredContact.email" checked={form.preferredContact.email} onChange={handleChange} />
                  Email
                </label>
              </div>
            </div>

            <button onClick={handleSave} disabled={saving} className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 font-semibold">
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </EmployerDashboardLayout>
  );
}
