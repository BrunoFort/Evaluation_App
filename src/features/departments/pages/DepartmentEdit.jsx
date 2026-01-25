import { useParams, useNavigate } from "react-router-dom";
import { useDepartment } from "../hooks/useDepartment";
import { useUpdateDepartment } from "../hooks/useUpdateDepartment";
import { DepartmentForm } from "../components/DepartmentForm";
import { toast } from "sonner";

export default function DepartmentEdit() {
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
      toast.error("Failed to update department");
      console.error(err);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!department) return <p>Department not found.</p>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Department</h1>

      <DepartmentForm
        defaultValues={{ name: department.name }}
        onSubmit={handleUpdate}
        isSubmitting={false}
      />
    </div>
  );
}
