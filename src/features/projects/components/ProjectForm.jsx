import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProjectForm({ defaultValues, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">

      {/* NAME */}
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input
          {...register("name", { required: "Name is required" })}
          placeholder="Project name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* STATUS */}
      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <Input
          {...register("status", { required: "Status is required" })}
          placeholder="Active, Paused, Completed..."
        />
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      {/* START DATE */}
      <div className="flex flex-col gap-2">
        <Label>Start Date</Label>
        <Input
          type="date"
          {...register("startDate", { required: "Start date is required" })}
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm">{errors.startDate.message}</p>
        )}
      </div>

      {/* END DATE */}
      <div className="flex flex-col gap-2">
        <Label>End Date</Label>
        <Input
          type="date"
          {...register("endDate")}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
