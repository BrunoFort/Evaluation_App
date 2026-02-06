import { useForm } from "react-hook-form";
import { validateBusinessNumber } from "../../shared/api/validateBusinessNumber";
import { useState } from "react";

export function EmployerRegisterForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [loadingBN, setLoadingBN] = useState(false);

  async function handleBNBlur(e) {
    const bn = e.target.value;
    if (!bn) return;

    try {
      setLoadingBN(true);
      const result = await validateBusinessNumber(bn);
      setValue("companyName", result.companyName);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBN(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      {/* BUSINESS NUMBER */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Business Number (9 digits)
        </label>
        <input
          className="mt-1 w-full rounded-md border border-neutral-300 p-2 focus:border-purple-600 focus:ring-purple-600"
          {...register("businessNumber", { required: true })}
          onBlur={handleBNBlur}
          maxLength={9}
        />
        {errors.businessNumber && (
          <p className="text-red-600 text-sm mt-1">Required</p>
        )}
      </div>

      {/* COMPANY NAME (readOnly para alinhar com Settings) */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Company Name
        </label>
        <input
          className="mt-1 w-full rounded-md border border-neutral-300 p-2 focus:border-purple-600 focus:ring-purple-600 bg-neutral-100"
          {...register("companyName", { required: true })}
          readOnly
          disabled={loadingBN}
        />
      </div>

      {/* FIRST NAME */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          First Name
        </label>
        <input
          className="mt-1 w-full rounded-md border border-neutral-300 p-2 focus:border-purple-600 focus:ring-purple-600"
          {...register("firstName", { required: true })}
        />
      </div>

      {/* LAST NAME */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Last Name
        </label>
        <input
          className="mt-1 w-full rounded-md border border-neutral-300 p-2 focus:border-purple-600 focus:ring-purple-600"
          {...register("lastName", { required: true })}
        />
      </div>

      {/* JOB TITLE */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Job Title
        </label>
        <input
          className="mt-1 w-full rounded-md border border-neutral-300 p-2 focus:border-purple-600 focus:ring-purple-600"
          {...register("jobTitle", { required: true })}
          placeholder="HR Manager, Recruiter, etc."
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Email
        </label>
        <input
          className="mt-1 w-full rounded-md border border-neutral-300 p-2 focus:border-purple-600 focus:ring-purple-600"
          type="email"
          {...register("email", { required: true })}
        />
      </div>

      {/* PHONE */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Phone
        </label>
        <input
          className="mt-1 w-full rounded-md border border-neutral-300 p-2 focus:border-purple-600 focus:ring-purple-600"
          {...register("phone", { required: true })}
          placeholder="(555) 123-4567"
        />
      </div>

      {/* CONTACT PREFERENCE */}
      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Preferred Contact
        </label>
        <select
          className="mt-1 w-full rounded-md border border-neutral-300 p-2 focus:border-purple-600 focus:ring-purple-600"
          {...register("contactPreference")}
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="both">Both</option>
        </select>
      </div>

      <button
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}

