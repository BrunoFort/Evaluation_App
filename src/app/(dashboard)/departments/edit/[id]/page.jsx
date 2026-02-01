import { useParams, useNavigate } from "react-router-dom";
import { useDepartment } from "/src/features/departments/hooks/useDepartment";
import { useUpdateDepartment } from "/src/features/departments/hooks/useUpdateDepartment";
import { DepartmentForm } from "/src/features/departments/components/DepartmentForm";
import { toast } from "sonner";

export default function DepartmentEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { department, loading } = useDepartment(id);
  const { update } = useUpdateDepartment();

  async function handleUpdate(data) {
    try {
      await update(id, data);
      toast.success("Department updated successfully!");
      navigate("/departments");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update department");
    }
  }

  if (loading) return <p className="p-6 text-neutral-600">Loading...</p>;
  if (!department) return <p className="p-6 text-neutral-600">Department not found.</p>;

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">
        Edit Department
      </h1>

      <DepartmentForm
        defaultValues={{ name: department.name }}
        onSubmit={handleUpdate}
        isSubmitting={false}
      />
    </div>
  );
}

