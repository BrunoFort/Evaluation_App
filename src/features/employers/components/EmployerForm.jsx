import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EmployerForm({ defaultValues, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
      <div className="flex flex-col gap-2">
        <Label>Company Name</Label>
        <Input
          {...register("companyName", { required: "Company name is required" })}
          placeholder="ABC Consulting Inc."
        />
        {errors.companyName && (
          <p className="text-red-500 text-sm">{errors.companyName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Business Number</Label>
        <Input
          {...register("businessNumber", {
            required: "Business Number is required",
          })}
          placeholder="123456789"
        />
        {errors.businessNumber && (
          <p className="text-red-500 text-sm">
            {errors.businessNumber.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Evaluator Name</Label>
        <Input
          {...register("evaluatorName", {
            required: "Evaluator name is required",
          })}
          placeholder="John Doe"
        />
        {errors.evaluatorName && (
          <p className="text-red-500 text-sm">
            {errors.evaluatorName.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Evaluator Position</Label>
        <Input
          {...register("evaluatorPosition", {
            required: "Evaluator position is required",
          })}
          placeholder="HR Manager"
        />
        {errors.evaluatorPosition && (
          <p className="text-red-500 text-sm">
            {errors.evaluatorPosition.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="hr@company.ca"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Phone</Label>
        <Input
          {...register("phone", { required: "Phone is required" })}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
