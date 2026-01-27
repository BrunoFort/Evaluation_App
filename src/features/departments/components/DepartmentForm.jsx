import { useForm } from "react-hook-form";
import Button from "/src/components/ui/Button.jsx";;
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
