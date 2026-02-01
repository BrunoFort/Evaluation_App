import { useNavigate } from "react-router-dom";
import { DepartmentForm } from "/src/features/departments/components/DepartmentForm";
import { useCreateDepartment } from "/src/features/departments/hooks/useCreateDepartment";
import { toast } from "sonner";

export default function DepartmentCreatePage() {
  const navigate = useNavigate();
  const { create } = useCreateDepartment();

  async function handleCreate(data) {
    try {
      await create(data);
      toast.success("Department created successfully!");
      navigate("/departments");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create department");
    }
  }

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">
        Create Department
      </h1>

      <DepartmentForm
        defaultValues={{ name: "" }}
        onSubmit={handleCreate}
        isSubmitting={false}
      />
    </div>
  );
}
