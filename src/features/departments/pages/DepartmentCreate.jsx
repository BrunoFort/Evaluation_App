import { useNavigate } from "react-router-dom";
import { DepartmentForm } from "../components/DepartmentForm";
import { useCreateDepartment } from "../hooks/useCreateDepartment";
import { toast } from "sonner";

export default function DepartmentCreate() {
  const navigate = useNavigate();
  const { create } = useCreateDepartment();

  async function handleCreate(data) {
    try {
      await create(data);
      toast.success("Department created successfully!");
      navigate("/departments");
    } catch (err) {
      toast.error("Failed to create department");
      console.error(err);
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create Department</h1>

      <DepartmentForm
        defaultValues={{ name: "" }}
        onSubmit={handleCreate}
        isSubmitting={false}
      />
    </div>
  );
}
