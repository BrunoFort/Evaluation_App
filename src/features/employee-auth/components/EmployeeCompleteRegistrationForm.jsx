import { useForm } from "react-hook-form";
import Input from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import Button from "@/components/ui/Button.jsx";

export function EmployeeCompleteRegistrationForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
      
      {/* WORK PERMIT */}
      <div className="flex flex-col gap-1">
        <Label>Work Permit (1 letter + 9 digits)</Label>
        <Input
          placeholder="U123456789"
          {...register("workPermit", {
            required: "Work Permit is required",
            pattern: {
              value: /^[A-Za-z]\d{9}$/,
              message: "Invalid Work Permit format",
            },
          })}
        />
        {errors.workPermit && (
          <p className="text-red-600 text-sm">{errors.workPermit.message}</p>
        )}
      </div>

      {/* EXPIRATION DATE */}
      <div className="flex flex-col gap-1">
        <Label>Work Permit Expiration</Label>
        <Input
          type="date"
          {...register("workPermitExpiration", {
            required: "Expiration date is required",
          })}
        />
        {errors.workPermitExpiration && (
          <p className="text-red-600 text-sm">
            {errors.workPermitExpiration.message}
          </p>
        )}
      </div>

      {/* ADDRESS */}
      <div className="flex flex-col gap-1">
        <Label>Street / Avenue</Label>
        <Input {...register("street", { required: "Street is required" })} />
        {errors.street && (
          <p className="text-red-600 text-sm">{errors.street.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label>Number</Label>
        <Input {...register("number", { required: "Number is required" })} />
        {errors.number && (
          <p className="text-red-600 text-sm">{errors.number.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label>Postal Code</Label>
        <Input
          {...register("postalCode", { required: "Postal Code is required" })}
        />
        {errors.postalCode && (
          <p className="text-red-600 text-sm">{errors.postalCode.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label>City</Label>
        <Input {...register("city", { required: "City is required" })} />
        {errors.city && (
          <p className="text-red-600 text-sm">{errors.city.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label>Province</Label>
        <Input {...register("province", { required: "Province is required" })} />
        {errors.province && (
          <p className="text-red-600 text-sm">{errors.province.message}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="flex flex-col gap-1">
        <Label>Create Password</Label>
        <Input
          type="password"
          {...register("password", {
            required: "Password is required",
            validate: (value) => {
              if (!value || value.length < 8) {
                return "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and one of @, #, $, %, &, *.";
              }
              const hasUpper = /[A-Z]/.test(value);
              const hasLower = /[a-z]/.test(value);
              const hasNumber = /\d/.test(value);
              const hasSymbol = /[@#$%&*]/.test(value);
              return (
                (hasUpper && hasLower && hasNumber && hasSymbol) ||
                "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and one of @, #, $, %, &, *."
              );
            },
          })}
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label>Confirm Password</Label>
        <Input
          type="password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === watch("password") || "Senhas nao correspondem",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg">
        Save and Continue
      </Button>
    </form>
  );
}
