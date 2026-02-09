import { useForm } from "react-hook-form";
import Button from "/src/components/ui/Button.jsx";
import { Input } from "/src/components/ui/input.jsx";
import { Label } from "/src/components/ui/label.jsx";

export function EmployeeForm({ defaultValues, onSubmit, isSubmitting }) {
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
          placeholder="Employee name"
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* ROLE */}
      <div className="flex flex-col gap-2">
        <Label>Role</Label>
        <Input
          {...register("role", { required: "Role is required" })}
          placeholder="Employee role"
        />
        {errors.role && (
          <p className="text-red-600 text-sm">{errors.role.message}</p>
        )}
      </div>

      {/* EMAIL */}
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="email@example.com"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
