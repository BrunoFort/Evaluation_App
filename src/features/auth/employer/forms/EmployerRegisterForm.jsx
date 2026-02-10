import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

import NOCJobSelector from "@/features/shared-noc/NOCJobSelector";
import CanadianPhoneInput from "@/features/shared-phone/CanadianPhoneInput";
import { validateBusinessNumber } from "@/features/auth/shared/api/validateBusinessNumber";

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

export function EmployerRegisterForm({ onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
      preferredContact: { phone: false, email: true },
      password: "",
      confirmPassword: "",
    },
  });

  const [loadingBN, setLoadingBN] = useState(false);

  function validatePostalCode(code) {
    const regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    return regex.test(code);
  }

  function normalizePostalCode(code) {
    return code.replace(/\s/g, "").toUpperCase();
  }

  function handlePostalCodeBlur() {
    const raw = watch("postalCode");
    const code = normalizePostalCode(raw);

    setValue("postalCode", code, { shouldValidate: true });

    if (!validatePostalCode(code)) {
      toast.error("Invalid Canadian Postal Code format.");
      setError("postalCode", { type: "manual", message: "Invalid postal code." });
      return;
    }

    clearErrors("postalCode");

    const fsa = code.substring(0, 3).toUpperCase();
    const match = fsaMap[fsa];

    if (match) {
      setValue("city", match.city);
      setValue("province", match.province);
      setValue("country", "Canada");
    } else {
      toast.error("Postal Code not found in FSA database.");
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

  function validatePhoneNumber(number, countryCode) {
    const cleaned = number.replace(/\D/g, "");

    if (countryCode === "+1") return cleaned.length === 10;
    return cleaned.length >= 8 && cleaned.length <= 15;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(password) {
    if (!password || password.length < 8) return false;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[@#$%&*]/.test(password);
    return hasUpper && hasLower && hasNumber && hasSymbol;
  }

  function passwordHelpText() {
    return "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and one of @, #, $, %, &, *.";
  }

  async function handleBusinessNumberBlur() {
    const bn = watch("businessNumber");
    if (!bn) return;

    if (!/^\d{9}$/.test(bn)) {
      toast.error("Business Number must have exactly 9 digits.");
      setError("businessNumber", { type: "manual", message: "Enter 9 digits." });
      return;
    }

    clearErrors("businessNumber");

    try {
      setLoadingBN(true);
      const result = await validateBusinessNumber(bn);
      if (result?.companyName) {
        setValue("companyName", result.companyName, { shouldValidate: true });
      }
    } catch (err) {
      toast.error(err.message || "Error validating Business Number.");
      setError("businessNumber", {
        type: "manual",
        message: "Business Number could not be verified.",
      });
    } finally {
      setLoadingBN(false);
    }
  }

  function handlePreferredContactChange(type, checked) {
    const current = watch("preferredContact");
    setValue("preferredContact", {
      ...current,
      [type]: checked,
    });
  }

  function internalSubmit(data) {
    const normalizedPostalCode = normalizePostalCode(data.postalCode || "");
    const normalizedBusinessNumber = (data.businessNumber || "").replace(/\D/g, "");

    setValue("postalCode", normalizedPostalCode, { shouldValidate: true });
    setValue("businessNumber", normalizedBusinessNumber, { shouldValidate: true });

    data.postalCode = normalizedPostalCode;
    data.businessNumber = normalizedBusinessNumber;

    if (!validatePersonalIdNumber(data.personalIdType, data.personalIdNumber)) {
      toast.error("Invalid Personal ID Number.");
      return;
    }

    if (!/^\d{9}$/.test(data.businessNumber)) {
      toast.error("Business Number must have exactly 9 digits.");
      return;
    }

    if (!validatePostalCode(data.postalCode)) {
      toast.error("Invalid Postal Code.");
      return;
    }

    if (!validateEmail(data.contactEmail)) {
      toast.error("Invalid email format.");
      return;
    }

    if (!validatePhoneNumber(data.phoneNumber, data.phoneCountry)) {
      toast.error("Invalid phone number for selected country.");
      return;
    }

    if (!validatePassword(data.password)) {
      toast.error(passwordHelpText());
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Senhas nao correspondem");
      return;
    }

    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit(internalSubmit)} className="space-y-8">

      {/* EMPLOYER */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Employer</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">First Name *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("firstName", { required: true })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Last Name *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("lastName", { required: true })} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Personal ID Type *</label>
            <select className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("personalIdType", { required: true })}>
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
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("personalIdNumber", { required: true })}
              onChange={(e) => {
                const upper = e.target.value.toUpperCase();
                setValue("personalIdNumber", upper, { shouldValidate: true });
              }}
              onBlur={() => {
                const type = watch("personalIdType");
                const number = watch("personalIdNumber");
                if (!validatePersonalIdNumber(type, number)) {
                  setError("personalIdNumber", {
                    type: "manual",
                    message: "Invalid Personal ID Number.",
                  });
                } else {
                  clearErrors("personalIdNumber");
                }
              }} />
            {errors.personalIdNumber && (
              <p className="text-red-600 text-sm">{errors.personalIdNumber.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* COMPANY */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Company</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Employee Registration Number *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("employeeRegistration", { required: true })}
              onChange={(e) => {
                const upper = e.target.value.toUpperCase();
                setValue("employeeRegistration", upper, { shouldValidate: true });
              }} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-neutral-700">Job Title</label>

              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-700">Custom entry</span>
                <input type="checkbox"
                  checked={watch("allowCustomJobTitle")}
                  onChange={(e) => setValue("allowCustomJobTitle", e.target.checked)} />
              </div>
            </div>

            <NOCJobSelector
              useCustom={watch("allowCustomJobTitle")}
              value={watch("allowCustomJobTitle") ? watch("customJobTitle") : watch("jobTitle")}
              onChange={(v) =>
                setValue(
                  watch("allowCustomJobTitle") ? "customJobTitle" : "jobTitle",
                  v
                )
              }
              className="h-[42px]"
            />
            <input type="hidden" {...register("jobTitle")} />
            <input type="hidden" {...register("customJobTitle")} />
            <input type="hidden" {...register("allowCustomJobTitle")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Business Number (9 digits) *</label>
            <p className="text-xs text-neutral-500 mb-1">
              Format-only validation for now.
            </p>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("businessNumber", { required: true })}
              maxLength={9}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                setValue("businessNumber", digits, { shouldValidate: true });
              }}
              onBlur={handleBusinessNumberBlur} />
            {errors.businessNumber && (
              <p className="text-red-600 text-sm">{errors.businessNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Company Name *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("companyName", { required: true })}
              disabled={loadingBN} />
          </div>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Address</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Postal Code *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("postalCode", { required: true })}
              onBlur={handlePostalCodeBlur} />
            {errors.postalCode && (
              <p className="text-red-600 text-sm">{errors.postalCode.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">City *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("city", { required: true })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Province / Territory *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("province", { required: true })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Country *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("country", { required: true })} />
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Contact Information</h2>

        <CanadianPhoneInput
          value={watch("phoneNumber")}
          onChange={(v) => setValue("phoneNumber", v)}
          countryCode={watch("phoneCountry")}
          onCountryCodeChange={(v) => setValue("phoneCountry", v)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Contact Email *</label>
          <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
            type="email"
            {...register("contactEmail", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            onChange={(e) => {
              const lower = e.target.value.toLowerCase();
              setValue("contactEmail", lower, { shouldValidate: true });
            }} />
          {errors.contactEmail && (
            <p className="text-red-600 text-sm">{errors.contactEmail.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">Preferred Contact Method</label>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input type="checkbox"
                checked={watch("preferredContact.phone")}
                onChange={(e) => handlePreferredContactChange("phone", e.target.checked)} />
              Phone
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox"
                checked={watch("preferredContact.email")}
                onChange={(e) => handlePreferredContactChange("email", e.target.checked)} />
              Email
            </label>
          </div>
        </div>
      </div>

      {/* PASSWORD */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Account Security</h2>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Password *</label>
          <input
            type="password"
            className="w-full border border-neutral-300 rounded-lg px-3 py-2"
            {...register("password", {
              required: true,
              validate: (value) =>
                validatePassword(value) || passwordHelpText(),
            })}
            onBlur={() => {
              const value = watch("password");
              if (!validatePassword(value)) {
                setError("password", {
                  type: "manual",
                  message: passwordHelpText(),
                });
              } else {
                clearErrors("password");
              }
            }}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Confirm Password *</label>
          <input
            type="password"
            className="w-full border border-neutral-300 rounded-lg px-3 py-2"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === watch("password") || "Senhas nao correspondem",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-3 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
}
