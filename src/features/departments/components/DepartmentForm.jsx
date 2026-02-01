import { useForm } from "react-hook-form";
import Button from "/src/components/ui/Button.jsx";
import { Input } from "/src/components/ui/input.jsx";
import { Label } from "/src/components/ui/label.jsx";

export function DepartmentForm({ defaultValues, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
      
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input
          {...register("name", { required: "Name is required" })}
          placeholder="Department name"
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
