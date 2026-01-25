import { useForm } from "react-hook-form";

export function EmployeeCompleteRegistrationForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      {/* WORK PERMIT */}
      <div>
        <label>Work Permit (1 letter + 9 digits)</label>
        <input
          className="border p-2 w-full"
          {...register("workPermit", {
            required: true,
            pattern: /^[A-Za-z]\d{9}$/,
          })}
          placeholder="U123456789"
        />
        {errors.workPermit && (
          <p className="text-red-500 text-sm">Invalid Work Permit</p>
        )}
      </div>

      {/* EXPIRATION DATE */}
      <div>
        <label>Work Permit Expiration</label>
        <input
          type="date"
          className="border p-2 w-full"
          {...register("workPermitExpiration", { required: true })}
        />
      </div>

      {/* ADDRESS */}
      <div>
        <label>Street / Avenue</label>
        <input
          className="border p-2 w-full"
          {...register("street", { required: true })}
        />
      </div>

      <div>
        <label>Number</label>
        <input
          className="border p-2 w-full"
          {...register("number", { required: true })}
        />
      </div>

      <div>
        <label>Postal Code</label>
        <input
          className="border p-2 w-full"
          {...register("postalCode", { required: true })}
        />
      </div>

      <div>
        <label>City</label>
        <input
          className="border p-2 w-full"
          {...register("city", { required: true })}
        />
      </div>

      <div>
        <label>Province</label>
        <input
          className="border p-2 w-full"
          {...register("province", { required: true })}
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label>Create Password</label>
        <input
          type="password"
          className="border p-2 w-full"
          {...register("password", { required: true, minLength: 6 })}
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Save and Continue
      </button>
    </form>
  );
}
