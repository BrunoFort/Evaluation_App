import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export function EmployeeForm({ defaultValues, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
      
      {/* NAME */}
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input
          {...register("name", { required: "Name is required" })}
          placeholder="Employee name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* ROLE */}
      <div className="flex flex-col gap-2">
        <Label>Role</Label>
        <Select
          onValueChange={(value) => setValue("role", value)}
          defaultValue={watch("role")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Employee">Employee</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="Director">Director</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}
      </div>

      {/* DEPARTMENT ID */}
      <div className="flex flex-col gap-2">
        <Label>Department ID</Label>
        <Input
          type="number"
          {...register("departmentId", {
            required: "Department ID is required",
            valueAsNumber: true,
          })}
          placeholder="1"
        />
        {errors.departmentId && (
          <p className="text-red-500 text-sm">{errors.departmentId.message}</p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
