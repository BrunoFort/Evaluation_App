import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EvaluationForm({ defaultValues, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
      {/* EMPLOYEE ID */}
      <div className="flex flex-col gap-2">
        <Label>Employee ID</Label>
        <Input
          type="number"
          {...register("employeeId", {
            required: "Employee ID is required",
            valueAsNumber: true,
          })}
          placeholder="1"
        />
        {errors.employeeId && (
          <p className="text-red-500 text-sm">{errors.employeeId.message}</p>
        )}
      </div>

      {/* EMPLOYER ID */}
      <div className="flex flex-col gap-2">
        <Label>Employer ID</Label>
        <Input
          type="number"
          {...register("employerId", {
            required: "Employer ID is required",
            valueAsNumber: true,
          })}
          placeholder="1"
        />
        {errors.employerId && (
          <p className="text-red-500 text-sm">{errors.employerId.message}</p>
        )}
      </div>

      {/* SCORE */}
      <div className="flex flex-col gap-2">
        <Label>Score</Label>
        <Input
          type="number"
          {...register("score", {
            required: "Score is required",
            min: { value: 0, message: "Minimum score is 0" },
            max: { value: 100, message: "Maximum score is 100" },
            valueAsNumber: true,
          })}
          placeholder="0–100"
        />
        {errors.score && (
          <p className="text-red-500 text-sm">{errors.score.message}</p>
        )}
      </div>

      {/* STAR RATING */}
      <div className="flex flex-col gap-2">
        <Label>Star Rating</Label>
        <Input
          type="number"
          {...register("starRating", {
            required: "Star rating is required",
            min: { value: 1, message: "Minimum is 1 star" },
            max: { value: 5, message: "Maximum is 5 stars" },
            valueAsNumber: true,
          })}
          placeholder="1–5"
        />
        {errors.starRating && (
          <p className="text-red-500 text-sm">{errors.starRating.message}</p>
        )}
      </div>

      {/* DATE */}
      <div className="flex flex-col gap-2">
        <Label>Date</Label>
        <Input
          type="date"
          {...register("date", { required: "Date is required" })}
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      {/* REFERENCE CONTACT */}
      <div className="flex flex-col gap-2">
        <Label>Reference Contact</Label>
        <Input
          {...register("referenceContact", {
            required: "Reference contact is required",
          })}
          placeholder="hr@company.ca or +1 (555) 123-4567"
        />
        {errors.referenceContact && (
          <p className="text-red-500 text-sm">
            {errors.referenceContact.message}
          </p>
        )}
      </div>

      {/* COMMENTS */}
      <div className="flex flex-col gap-2">
        <Label>Comments</Label>
        <Input
          {...register("comments")}
          placeholder="Optional comments about the employee"
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
