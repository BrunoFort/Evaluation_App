import { useEffect, useRef, useState } from "react";
import EmployeeDashboardLayout from "@/layouts/EmployeeDashboardLayout.jsx";
import { useEmployeeAuth } from "/src/features/auth/employee/hooks/useEmployeeAuth";
import { Save } from "lucide-react";
import { toast } from "sonner";
import SettingsIcon from "/src/assets/star-settings-svgrepo-com.svg";
import { getEmployeeById, updateEmployee } from "@/features/employees/api/employeesApi";
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

export default function EmployeeSettingsPage() {
  const { employee, login } = useEmployeeAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    document_type: "",
    document_number: "",
    address_city: "",
    address_province: "",
    address_country: "Canada",
    address_postal_code: "",
    address_street: "",
    address_number: "",
    phone_country_code: "+1",
    phone_number: "",
    personal_email: "",
    sin: "",
    work_permit: "",
    work_permit_expiry: "",
  });

  const [saving, setSaving] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const initialFormRef = useRef(null);

  useEffect(() => {
    async function load() {
      if (!employee?.employeeId) return;

      try {
        const data = await getEmployeeById(employee.employeeId);
        const { position, ...rest } = data || {};

        setForm((prev) => ({
          ...prev,
          ...rest,
        }));

        initialFormRef.current = { ...rest };
      } catch (err) {
        console.error(err);
        toast.error("Error loading employee settings.");
      }
    }

    load();
  }, [employee]);

  useEffect(() => {
    if (!employee?.employeeId) return;

    async function initializePhoto() {
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;

        const user = authData?.user;
        const confirmed = Boolean(user?.email_confirmed_at || user?.confirmed_at);
        setIsEmailConfirmed(confirmed);

        const pendingKey = user?.id
          ? `employee-settings-photo:${user.id}`
          : `employee-settings-photo:${employee.employeeId}`;
        const pendingPhoto = loadPhoto(pendingKey);

        console.log("🔵 Photo initialization - employeeId:", employee?.employeeId);
        console.log("🔵 userId from auth:", user?.id);
        console.log("🔵 email confirmed:", confirmed);

        if (pendingPhoto && !confirmed) {
          console.log("⚠️ Pending photo found but email NOT confirmed - upload blocked");
          toast.warning("Please confirm your email to upload your profile photo.");
        }

        if (pendingPhoto && confirmed) {
          console.log("🔵 Converting data URL to blob...");
          const blob = dataUrlToBlob(pendingPhoto);

          if (blob) {
            console.log("🔵 Uploading photo to Supabase...");
            const uploadResult = await uploadProfilePhoto({
              userId: employee.employeeId,
              file: blob,
              role: "employee",
            });

            if (uploadResult?.publicUrl) {
              console.log("🔵 Updating auth avatar...");
              await updateAuthAvatar({
                url: uploadResult.publicUrl,
                path: uploadResult.path,
              });
              setPhotoUrl(uploadResult.publicUrl);
              removePhoto(pendingKey);
              toast.success("Profile photo uploaded successfully!");
              return;
            }
          }
        }

        console.log("🔵 Loading existing avatar...");
        const metadata = await loadAuthAvatar();
        const avatarPath = metadata?.avatar_path || "";
        const avatarUrl = metadata?.avatar_url || "";
        const isEmployeeAvatar =
          avatarPath.includes("/employee/") || avatarUrl.includes("/employee/");
        setPhotoUrl(isEmployeeAvatar ? avatarUrl : null);
      } catch (err) {
        console.error("🔴 Photo initialization error:", err);
        try {
          const metadata = await loadAuthAvatar();
          const avatarPath = metadata?.avatar_path || "";
          const avatarUrl = metadata?.avatar_url || "";
          const isEmployeeAvatar =
            avatarPath.includes("/employee/") || avatarUrl.includes("/employee/");
          setPhotoUrl(isEmployeeAvatar ? avatarUrl : null);
        } catch (fallbackErr) {
          console.error("🔴 Fallback avatar load failed:", fallbackErr);
        }
      }
    }

    initializePhoto();
  }, [employee?.employeeId]);

  useEffect(() => {
    if (!initialFormRef.current) return;
    const current = JSON.stringify(form);
    const initial = JSON.stringify(initialFormRef.current);
    setIsDirty(current !== initial);
  }, [form]);

  async function handlePhotoUpload(file) {
    if (!employee?.employeeId) return;
    if (!isEmailConfirmed) {
      toast.error("Please confirm your email before uploading a photo.");
      return;
    }

    try {
      const metadata = await loadAuthAvatar();
      if (metadata?.avatar_path) {
        console.log("🗑️ Deleting old photo:", metadata.avatar_path);
        await deleteProfilePhoto(metadata.avatar_path);
      }

      const uploadResult = await uploadProfilePhoto({
        userId: employee.employeeId,
        file,
        role: "employee",
      });
      setPhotoUrl(uploadResult?.publicUrl || null);
      await updateAuthAvatar({
        url: uploadResult?.publicUrl,
        path: uploadResult?.path,
      });
      toast.success("Photo uploaded successfully!");
    } catch (err) {
      console.error("❌ Photo upload error:", err);
      toast.error("Failed to upload photo.");
    }
  }

  function handlePhotoDelete() {
    if (!employee?.employeeId) return;
    async function removeAvatar() {
      try {
        const metadata = await loadAuthAvatar();
        if (metadata?.avatar_path) {
          await deleteProfilePhoto(metadata.avatar_path);
        }
        await updateAuthAvatar({ url: null, path: null });
        setPhotoUrl(null);
        toast.success("Photo removed successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to remove photo.");
      }
    }

    removeAvatar();
  }

  function handleChange(e) {
    const { name, value } = e.target;
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
    const normalized = normalizePostalCode(form.address_postal_code || "");

    setForm((prev) => ({ ...prev, address_postal_code: normalized }));

    if (!validatePostalCode(normalized)) {
      toast.error("Invalid Canadian Postal Code format.");
      setFieldErrors((prev) => ({ ...prev, address_postal_code: "Invalid postal code." }));
      return;
    }

    setFieldErrors((prev) => ({ ...prev, address_postal_code: "" }));

    const fsa = normalized.substring(0, 3).toUpperCase();
    const match = fsaMap[fsa];

    if (match) {
      setForm((prev) => ({
        ...prev,
        address_city: match.city,
        address_province: match.province,
        address_country: "Canada",
      }));
    } else {
      toast.error("Postal Code not found in FSA database.");
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

  function validateSIN(sin) {
    // SIN format: XXX-XXX-XXX (can have spaces or hyphens)
    if (!sin) return false;
    const cleaned = (sin || "").replace(/[\s-]/g, "");
    return /^\d{9}$/.test(cleaned);
  }

  function validateWorkPermit(permit) {
    // Work permit format: 1 letter + 9 numbers
    if (!permit) return false;
    return /^[A-Za-z]\d{9}$/.test(permit);
  }

  async function handleSave() {
    setSuccessMessage("");

    if (!form.first_name || !form.last_name) {
      toast.error("First name and last name are required.");
      return;
    }

    if (!form.personal_email) {
      toast.error("Personal email is required.");
      setFieldErrors((prev) => ({ ...prev, personal_email: "Personal email is required." }));
      return;
    }

    if (!validateEmail(form.personal_email)) {
      toast.error("Invalid personal email format.");
      setFieldErrors((prev) => ({ ...prev, personal_email: "Invalid email format." }));
      return;
    }

    setFieldErrors((prev) => ({ ...prev, personal_email: "" }));

    if (!form.document_type) {
      toast.error("Document type is required.");
      return;
    }

    if (!form.document_number) {
      toast.error("Document number is required.");
      return;
    }

    if (!validateSIN(form.sin)) {
      toast.error("Invalid SIN format. Use XXX-XXX-XXX.");
      setFieldErrors((prev) => ({ ...prev, sin: "Invalid SIN format." }));
      return;
    }

    setFieldErrors((prev) => ({ ...prev, sin: "" }));

    if (!validateWorkPermit(form.work_permit)) {
      toast.error("Invalid Work Permit format. Use 1 letter + 9 numbers.");
      setFieldErrors((prev) => ({ ...prev, work_permit: "Invalid format." }));
      return;
    }

    setFieldErrors((prev) => ({ ...prev, work_permit: "" }));

    if (!form.work_permit_expiry) {
      toast.error("Work permit expiry date is required.");
      return;
    }

    if (!isValidPhoneNumber(form.phone_number, form.phone_country_code)) {
      toast.error("Invalid phone number for selected country.");
      setFieldErrors((prev) => ({ ...prev, phone_number: "Invalid phone number." }));
      return;
    }

    setFieldErrors((prev) => ({ ...prev, phone_number: "" }));

    if (!form.address_street || !form.address_number) {
      toast.error("Street name and number are required.");
      return;
    }

    if (!form.address_postal_code) {
      toast.error("Postal code is required.");
      return;
    }

    if (!validatePostalCode(form.address_postal_code)) {
      toast.error("Invalid Postal Code.");
      return;
    }

    if (!form.address_city || !form.address_province || !form.address_country) {
      toast.error("City, province, and country are required.");
      return;
    }

    setSaving(true);

    try {
      const updated = await updateEmployee(employee.employeeId, form);

      if (form.first_name?.trim() || form.last_name?.trim()) {
        console.log("📍 EMPLOYEE SETTINGS SAVE: Syncing name to auth metadata");
        
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            first_name: form.first_name?.trim() || null,
            last_name: form.last_name?.trim() || null,
          },
        });
        
        if (updateError) {
          console.warn("❌ Failed to sync name to auth metadata:", updateError);
        } else {
          console.log("✅ Successfully synced name to auth metadata");
        }
      }

      login({
        ...employee,
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
    const targetEmail = employee?.email || form.personal_email;

    if (!targetEmail) {
      toast.error("Email not found. Please update your personal email first.");
      return;
    }

    try {
      setSendingReset(true);

      const redirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/employee/reset-password`
          : undefined;

      const { error } = await supabase.auth.resetPasswordForEmail(targetEmail, {
        redirectTo,
      });

      if (error) throw error;

      toast.success("Password reset email sent successfully.");
    } catch (err) {
      console.error("❌ Error in password reset flow:", err);
      toast.error("Failed to send reset email.");
    } finally {
      setSendingReset(false);
    }
  }

  return (
    <EmployeeDashboardLayout>
      <div className="max-w-3xl mx-auto bg-white border border-neutral-200 rounded-xl shadow-sm p-8 space-y-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={SettingsIcon} alt="Settings" className="w-8 h-8" />
            <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          </div>

          <ProfilePhotoUploader
            photoUrl={photoUrl}
            onUpload={handlePhotoUpload}
            onDelete={handlePhotoDelete}
            disabled={!isEmailConfirmed}
          />
        </div>

        <div className="space-y-8">
          {!isEmailConfirmed && (
            <div className="text-amber-800 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg text-sm">
              Please confirm your email to upload or change your profile photo.
            </div>
          )}
          {successMessage && (
            <div className="text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-800">Personal Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Personal Email *
              </label>
              <input
                type="email"
                name="personal_email"
                value={form.personal_email}
                onChange={handleChange}
                onBlur={() => {
                    if (!form.personal_email) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        personal_email: "Personal email is required.",
                      }));
                    } else if (!validateEmail(form.personal_email)) {
                    setFieldErrors((prev) => ({
                      ...prev,
                      personal_email: "Invalid email format.",
                    }));
                  } else {
                    setFieldErrors((prev) => ({ ...prev, personal_email: "" }));
                  }
                }}
                  required
                className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              />
              {fieldErrors.personal_email && (
                <p className="text-red-600 text-sm">{fieldErrors.personal_email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Document Type *
                </label>
                <select
                  name="document_type"
                  value={form.document_type}
                  onChange={handleChange}
                  required
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select Document Type</option>
                  <option value="passport">Passport</option>
                  <option value="national_id">National ID</option>
                  <option value="drivers_license">Driver's License</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Document Number *
                </label>
                <input
                  type="text"
                  name="document_number"
                  value={form.document_number}
                  onChange={handleChange}
                  required
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                SIN (Social Insurance Number) *
              </label>
              <input
                type="text"
                name="sin"
                value={form.sin}
                onChange={handleChange}
                onBlur={() => {
                  if (!form.sin) {
                    setFieldErrors((prev) => ({ ...prev, sin: "SIN is required." }));
                    return;
                  }
                  if (!validateSIN(form.sin)) {
                    setFieldErrors((prev) => ({ ...prev, sin: "Invalid SIN format." }));
                    return;
                  }
                  setFieldErrors((prev) => ({ ...prev, sin: "" }));
                }}
                placeholder="XXX-XXX-XXX"
                required
                className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              />
              {fieldErrors.sin && <p className="text-red-600 text-sm">{fieldErrors.sin}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Work Permit *
              </label>
              <input
                type="text"
                name="work_permit"
                value={form.work_permit}
                onChange={handleChange}
                onBlur={() => {
                  if (!form.work_permit) {
                    setFieldErrors((prev) => ({
                      ...prev,
                      work_permit: "Work permit is required.",
                    }));
                    return;
                  }
                  if (!validateWorkPermit(form.work_permit)) {
                    setFieldErrors((prev) => ({
                      ...prev,
                      work_permit: "Invalid format.",
                    }));
                    return;
                  }
                  setFieldErrors((prev) => ({ ...prev, work_permit: "" }));
                }}
                placeholder="A123456789"
                required
                className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              />
              {fieldErrors.work_permit && (
                <p className="text-red-600 text-sm">{fieldErrors.work_permit}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Work Permit Expiry Date *
              </label>
              <input
                type="date"
                name="work_permit_expiry"
                value={form.work_permit_expiry}
                onChange={handleChange}
                required
                className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-800">Contact Information</h2>

            <div>
              <CanadianPhoneInput
                value={form.phone_number}
                onChange={(v) => setForm((prev) => ({ ...prev, phone_number: v }))}
                countryCode={form.phone_country_code}
                onCountryCodeChange={(v) =>
                  setForm((prev) => ({ ...prev, phone_country_code: v }))
                }
                label="Phone Number *"
              />
              {fieldErrors.phone_number && (
                <p className="text-red-600 text-sm">{fieldErrors.phone_number}</p>
              )}
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-800">Address</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Street Name *
                </label>
                <input
                  type="text"
                  name="address_street"
                  value={form.address_street}
                  onChange={handleChange}
                  required
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Street Number *
                </label>
                <input
                  type="text"
                  name="address_number"
                  value={form.address_number}
                  onChange={handleChange}
                  required
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Postal Code *
              </label>
              <input
                type="text"
                name="address_postal_code"
                value={form.address_postal_code}
                onChange={handleChange}
                onBlur={handlePostalCodeBlur}
                required
                className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              />
              {fieldErrors.address_postal_code && (
                <p className="text-red-600 text-sm">{fieldErrors.address_postal_code}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">City *</label>
                <input
                  type="text"
                  name="address_city"
                  value={form.address_city}
                  onChange={handleChange}
                  required
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Province *
                </label>
                <input
                  type="text"
                  name="address_province"
                  value={form.address_province}
                  onChange={handleChange}
                  required
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Country *</label>
                <input
                  type="text"
                  name="address_country"
                  value={form.address_country}
                  onChange={handleChange}
                  required
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="space-y-3 pt-4 border-t border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-800">Security</h2>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Account Email
              </label>
              <input
                type="email"
                value={employee?.email || form.personal_email || ""}
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

          {/* Save */}
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
    </EmployeeDashboardLayout>
  );
}
