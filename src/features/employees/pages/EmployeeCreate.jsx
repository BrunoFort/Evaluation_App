import { useNavigate } from "react-router-dom";
import { EmployeeForm } from "../components/EmployeeForm";
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { toast } from "sonner";

export default function EmployeeCreate() {
  const navigate = useNavigate();
  const { create } = useCreateEmployee();

  async function handleCreate(data) {
    try {
      await create(data);
      toast.success("Employee created successfully!");
      navigate("/employees");
    } catch (err) {
      toast.error("Failed to create employee");
      console.error(err);
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create Employee</h1>

      <EmployeeForm
        defaultValues={{
          name: "",
          role: "",
          departmentId: ""
        }}
        onSubmit={handleCreate}
        isSubmitting={false}
      />
    </div>
  );
}
