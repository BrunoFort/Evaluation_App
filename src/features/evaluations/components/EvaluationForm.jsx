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

      {/* SCORE */}
      <div className="flex flex-col gap-2">
        <Label>Score</Label>
        <Input
          type="number"
          {...register("score", {
            required: "Score is required",
            min: { value: 1, message: "Minimum score is 1" },
            max: { value: 10, message: "Maximum score is 10" },
            valueAsNumber: true,
          })}
          placeholder="1 to 10"
        />
        {errors.score && (
          <p className="text-red-500 text-sm">{errors.score.message}</p>
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

      {/* COMMENTS */}
      <div className="flex flex-col gap-2">
        <Label>Comments</Label>
        <Input
          {...register("comments")}
          placeholder="Optional comments"
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
