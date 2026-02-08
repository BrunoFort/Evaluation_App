import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

import NOCJobSelector from "@/features/shared-noc/NOCJobSelector";
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
      street: "",
      number: "",
      unit: "",
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
    },
  });

  const [loadingBN, setLoadingBN] = useState(false);

  function validatePostalCode(code) {
    const regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    return regex.test(code);
  }

  function handlePostalCodeBlur() {
    const code = watch("postalCode");

    if (!validatePostalCode(code)) {
      toast.error("Invalid Canadian Postal Code format.");
      return;
    }

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

  function validateBusinessNumberLocal(bn) {
    return /^\d{9}$/.test(bn);
  }

  async function handleBusinessNumberBlur() {
    const bn = watch("businessNumber");
    if (!bn) return;

    if (!validateBusinessNumberLocal(bn)) {
      toast.error("Business Number must have exactly 9 digits.");
      return;
    }

    try {
      setLoadingBN(true);
      const result = await validateBusinessNumber(bn);
      setValue("companyName", result.companyName || "");
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

  function handlePreferredContactChange(type, checked) {
    const current = watch("preferredContact");
    setValue("preferredContact", {
      ...current,
      [type]: checked,
    });
  }

  function internalSubmit(data) {
    if (!validatePersonalIdNumber(data.personalIdType, data.personalIdNumber)) {
      toast.error("Invalid Personal ID Number.");
      return;
    }

    if (!validateBusinessNumberLocal(data.businessNumber)) {
      toast.error("Business Number must have exactly 9 digits.");
      return;
    }

    if (!validatePostalCode(data.postalCode)) {
      toast.error("Invalid Postal Code.");
      return;
    }

    if (!data.contactEmail.includes("@")) {
      toast.error("Invalid email format.");
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
              {...register("personalIdNumber", { required: true })} />
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
              {...register("employeeRegistration", { required: true })} />
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
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Business Number (9 digits) *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("businessNumber", { required: true })}
              maxLength={9}
              onBlur={handleBusinessNumberBlur} />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Company Name *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2 bg-neutral-100"
              {...register("companyName", { required: true })}
              readOnly
              disabled={loadingBN} />
          </div>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Address</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Street *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("street", { required: true })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Number *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("number", { required: true })} />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Unit / Apartment</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("unit")} />
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

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Postal Code *</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("postalCode", { required: true })}
              onBlur={handlePostalCodeBlur} />
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">Contact Information</h2>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Country Code</label>
            <select className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("phoneCountry")}>
              <option value="+1">🇨🇦 +1 Canada</option>
              <option value="+1">🇺🇸 +1 USA</option>
              <option value="+55">🇧🇷 +55 Brazil</option>
              <option value="+44">🇬🇧 +44 UK</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              {...register("phoneNumber")} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Contact Email *</label>
          <input className="w-full border border-neutral-300 rounded-lg px-3 py-2"
            type="email"
            {...register("contactEmail", { required: true })} />
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

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 font-semibold"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
