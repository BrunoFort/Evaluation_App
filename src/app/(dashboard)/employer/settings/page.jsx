import { useEffect, useMemo, useRef, useState } from "react";
import EmployerDashboardLayout from "@/layouts/EmployerDashboardLayout.jsx";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth";
import { Building2, Save } from "lucide-react";
import { toast } from "sonner";
import NOCJobSelector from "@/features/shared-noc/NOCJobSelector";
import { validateBusinessNumber } from "@/features/auth/shared/api/validateBusinessNumber";
import { getEmployerById, updateEmployer } from "@/features/employers/api/employersApi";
import { supabase } from "/src/lib/supabaseClient";
import CanadianPhoneInput from "@/features/shared-phone/CanadianPhoneInput";
import { phoneRules } from "@/features/shared-phone/countryCodes";
import ProfilePhotoUploader from "/src/features/shared-photo/ProfilePhotoUploader";
import {
  deleteProfilePhoto,
  dataUrlToBlob,
  loadAuthAvatar,
  updateAuthAvatar,
  uploadProfilePhoto,
} from "/src/features/shared-photo/supabasePhotoStorage";
import { loadPhoto, removePhoto } from "/src/features/shared-photo/photoStorage";

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
  const [sendingReset, setSendingReset] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [photoUrl, setPhotoUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const initialFormRef = useRef(null);

  useEffect(() => {
    async function load() {
      if (!employer?.employerId) return;

      try {
        const data = await getEmployerById(employer.employerId);

        const { street, number, unit, ...rest } = data || {};

        setForm((prev) => ({
          ...prev,
          ...rest,
          preferredContact: data?.preferredContact || { phone: false, email: true },
        }));

        initialFormRef.current = {
          ...rest,
          preferredContact: data?.preferredContact || { phone: false, email: true },
        };
      } catch (err) {
        console.error(err);
        toast.error("Error loading employer settings.");
      }
    }

    load();
  }, [employer]);

  useEffect(() => {
    if (!employer?.employerId) return;
    async function loadAvatar() {
      try {
        const metadata = await loadAuthAvatar();
        setPhotoUrl(metadata.avatar_url || null);
      } catch (err) {
        console.error(err);
      }
    }

    loadAvatar();
  }, [employer?.employerId]);

  useEffect(() => {
    if (!employer?.employerId) return;
    const pendingPhoto = loadPhoto("employer-register-photo");
    if (!pendingPhoto) return;

    async function uploadPending() {
      try {
        const blob = dataUrlToBlob(pendingPhoto);
        if (!blob) return;
        const uploadResult = await uploadProfilePhoto({
          userId: employer.employerId,
          file: blob,
          role: "employer",
        });
        await updateAuthAvatar({
          url: uploadResult?.publicUrl,
          path: uploadResult?.path,
        });
        setPhotoUrl(uploadResult?.publicUrl || null);
      } catch (err) {
        console.error(err);
      } finally {
        removePhoto("employer-register-photo");
      }
    }

    uploadPending();
  }, [employer?.employerId]);

  useEffect(() => {
    if (!initialFormRef.current) return;
    const current = JSON.stringify(form);
    const initial = JSON.stringify(initialFormRef.current);
    setIsDirty(current !== initial);
  }, [form]);

  async function handlePhotoUpload(file) {
    if (!employer?.employerId) return;
    const uploadResult = await uploadProfilePhoto({
      userId: employer.employerId,
      file,
      role: "employer",
    });
    setPhotoUrl(uploadResult?.publicUrl || null);
    await updateAuthAvatar({
      url: uploadResult?.publicUrl,
      path: uploadResult?.path,
    });
  }

  function handlePhotoDelete() {
    if (!employer?.employerId) return;
    async function removeAvatar() {
      try {
        const metadata = await loadAuthAvatar();
        if (metadata?.avatar_path) {
          await deleteProfilePhoto(metadata.avatar_path);
        }
        await updateAuthAvatar({ url: null, path: null });
        setPhotoUrl(null);
      } catch (err) {
        console.error(err);
      }
    }

    removeAvatar();
  }

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

  function normalizePostalCode(code) {
    return code.replace(/\s/g, "").toUpperCase();
  }

  function handlePostalCodeBlur() {
    const normalized = normalizePostalCode(form.postalCode || "");

    setForm((prev) => ({ ...prev, postalCode: normalized }));

    if (!validatePostalCode(normalized)) {
      toast.error("Invalid Canadian Postal Code format.");
      setFieldErrors((prev) => ({ ...prev, postalCode: "Invalid postal code." }));
      return;
    }

    setFieldErrors((prev) => ({ ...prev, postalCode: "" }));

    const fsa = normalized.substring(0, 3).toUpperCase();
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
      setFieldErrors((prev) => ({ ...prev, businessNumber: "Enter 9 digits." }));
      return;
    }

    setFieldErrors((prev) => ({ ...prev, businessNumber: "" }));

    try {
      setLoadingBN(true);
      const result = await validateBusinessNumber(bn);
      if (result?.companyName) {
        setForm((prev) => ({
          ...prev,
          companyName: result.companyName,
        }));
      }
    } catch (err) {
      toast.error(err.message || "Error validating Business Number.");
      setFieldErrors((prev) => ({
        ...prev,
        businessNumber: "Business Number could not be verified.",
      }));
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

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function normalizePhoneNumber(value) {
    return value.replace(/\D/g, "");
  }

  function isValidPhoneNumber(value, countryCode) {
    const digits = normalizePhoneNumber(value || "");
    if (!digits) return false;
    const rule = phoneRules[countryCode];
    if (rule) return digits.length >= rule.min && digits.length <= rule.max;
    return digits.length >= 8 && digits.length <= 15;
  }

  async function handleSave() {
    setSuccessMessage("");
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
      setFieldErrors((prev) => ({ ...prev, personalIdNumber: "Invalid Personal ID Number." }));
      return;
    }

    setFieldErrors((prev) => ({ ...prev, personalIdNumber: "" }));

    if (!validateBusinessNumberLocal(form.businessNumber)) {
      toast.error("Business Number must have exactly 9 digits.");
      setFieldErrors((prev) => ({ ...prev, businessNumber: "Enter 9 digits." }));
      return;
    }

    if (!form.companyName?.trim()) {
      toast.error("Company Name is required.");
      setFieldErrors((prev) => ({ ...prev, companyName: "Company Name is required." }));
      return;
    }

    setFieldErrors((prev) => ({ ...prev, companyName: "" }));

    if (!form.city || !form.province || !form.country) {
      toast.error("City, province/territory, and country are required.");
      return;
    }

    if (!validatePostalCode(form.postalCode)) {
      toast.error("Invalid Postal Code.");
      return;
    }

    if (!validateEmail(form.contactEmail)) {
      toast.error("Invalid email format.");
      setFieldErrors((prev) => ({ ...prev, contactEmail: "Invalid email format." }));
      return;
    }

    setFieldErrors((prev) => ({ ...prev, contactEmail: "" }));

    if (form.phoneNumber && !isValidPhoneNumber(form.phoneNumber, form.phoneCountry)) {
      toast.error("Invalid phone number for selected country.");
      setFieldErrors((prev) => ({ ...prev, phoneNumber: "Invalid phone number." }));
      return;
    }

    setFieldErrors((prev) => ({ ...prev, phoneNumber: "" }));

    setSaving(true);

    try {
      const updated = await updateEmployer(employer.employerId, form);

      login({
        ...employer,
        ...updated,
      });

      toast.success("Settings saved successfully.");
      setSuccessMessage("Settings saved successfully.");
      initialFormRef.current = form;
      setIsDirty(false);
    } catch (err) {
      console.error(err);
      toast.error("Error saving settings.");
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordResetEmail() {
    const targetEmail = employer?.email || form.contactEmail;

    if (!targetEmail) {
      toast.error("Email not found. Please update your contact email first.");
      return;
    }

    try {
      setSendingReset(true);

      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/employer/reset-password`
          : undefined;

      const { error } = await supabase.auth.resetPasswordForEmail(targetEmail, {
        redirectTo,
      });

      if (error) throw error;

      toast.success("Password reset email sent successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reset email.");
    } finally {
      setSendingReset(false);
    }
  }

  return (
    <EmployerDashboardLayout>
      <div className="max-w-3xl mx-auto bg-white border border-neutral-200 rounded-xl shadow-sm p-8 space-y-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          </div>

          <ProfilePhotoUploader
            photoUrl={photoUrl}
            onUpload={handlePhotoUpload}
            onDelete={handlePhotoDelete}
          />
        </div>

        <div className="space-y-8">
          {successMessage && (
            <div className="text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-sm">
              {successMessage}
            </div>
          )}
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
                <input
                  type="text"
                  name="personalIdNumber"
                  value={form.personalIdNumber}
                  onChange={handleChange}
                  onBlur={() => {
                    if (!validatePersonalIdNumber(form.personalIdType, form.personalIdNumber)) {
                      setFieldErrors((prev) => ({ ...prev, personalIdNumber: "Invalid Personal ID Number." }));
                    } else {
                      setFieldErrors((prev) => ({ ...prev, personalIdNumber: "" }));
                    }
                  }}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
                {fieldErrors.personalIdNumber && (
                  <p className="text-red-600 text-sm">{fieldErrors.personalIdNumber}</p>
                )}
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
                <p className="text-xs text-neutral-500 mb-1">
                  Format-only validation for now.
                </p>
                <input
                  type="text"
                  name="businessNumber"
                  value={form.businessNumber}
                  onChange={handleChange}
                  onBlur={handleBusinessNumberBlur}
                  maxLength={9}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
                {fieldErrors.businessNumber && (
                  <p className="text-red-600 text-sm">{fieldErrors.businessNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  disabled={loadingBN}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
                {fieldErrors.companyName && (
                  <p className="text-red-600 text-sm">{fieldErrors.companyName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  onBlur={handlePostalCodeBlur}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
                {fieldErrors.postalCode && (
                  <p className="text-red-600 text-sm">{fieldErrors.postalCode}</p>
                )}
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
            </div>

            <div>
              <CanadianPhoneInput
                value={form.phoneNumber}
                onChange={(v) => setForm((prev) => ({ ...prev, phoneNumber: v }))}
                countryCode={form.phoneCountry}
                onCountryCodeChange={(v) => setForm((prev) => ({ ...prev, phoneCountry: v }))}
                label="Phone Number"
              />
              {fieldErrors.phoneNumber && (
                <p className="text-red-600 text-sm">{fieldErrors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Contact Email *</label>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                onBlur={() => {
                  if (!validateEmail(form.contactEmail)) {
                    setFieldErrors((prev) => ({ ...prev, contactEmail: "Invalid email format." }));
                  } else {
                    setFieldErrors((prev) => ({ ...prev, contactEmail: "" }));
                  }
                }}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              />
              {fieldErrors.contactEmail && (
                <p className="text-red-600 text-sm">{fieldErrors.contactEmail}</p>
              )}
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

            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-800">Security</h2>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Account Email</label>
                <input
                  type="email"
                  value={employer?.email || form.contactEmail || ""}
                  readOnly
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 bg-neutral-100"
                />
              </div>

              <button
                onClick={handlePasswordResetEmail}
                disabled={sendingReset}
                className="w-full border border-neutral-300 text-neutral-800 py-3 rounded-lg hover:bg-neutral-50 flex items-center justify-center gap-2 font-semibold"
              >
                {sendingReset ? "Sending email..." : "Send password reset email"}
              </button>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-3 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
              >
                Cancel
              </button>

              {isDirty && (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 font-semibold"
                >
                  <Save className="w-5 h-5" />
                  {saving ? "Saving..." : "Save Settings"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </EmployerDashboardLayout>
  );
}
