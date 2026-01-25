import { useForm } from "react-hook-form";
import { validateBusinessNumber } from "../api/validateBusinessNumber";
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
        <label>Business Number (9 digits)</label>
        <input
          className="border p-2 w-full"
          {...register("businessNumber", { required: true })}
          onBlur={handleBNBlur}
        />
        {errors.businessNumber && (
          <p className="text-red-500 text-sm">Required</p>
        )}
      </div>

      {/* COMPANY NAME */}
      <div>
        <label>Company Name</label>
        <input
          className="border p-2 w-full"
          {...register("companyName", { required: true })}
          disabled={loadingBN}
        />
      </div>

      {/* FIRST NAME */}
      <div>
        <label>First Name</label>
        <input
          className="border p-2 w-full"
          {...register("firstName", { required: true })}
        />
      </div>

      {/* LAST NAME */}
      <div>
        <label>Last Name</label>
        <input
          className="border p-2 w-full"
          {...register("lastName", { required: true })}
        />
      </div>

      {/* JOB TITLE */}
      <div>
        <label>Job Title</label>
        <input
          className="border p-2 w-full"
          {...register("jobTitle", { required: true })}
          placeholder="HR Manager, Recruiter, etc."
        />
      </div>

      {/* EMAIL */}
      <div>
        <label>Email</label>
        <input
          className="border p-2 w-full"
          type="email"
          {...register("email", { required: true })}
        />
      </div>

      {/* PHONE */}
      <div>
        <label>Phone</label>
        <input
          className="border p-2 w-full"
          {...register("phone", { required: true })}
          placeholder="(555) 123-4567"
        />
      </div>

      {/* CONTACT PREFERENCE */}
      <div>
        <label>Preferred Contact</label>
        <select className="border p-2 w-full" {...register("contactPreference")}>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="both">Both</option>
        </select>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
}
