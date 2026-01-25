import { useParams, useNavigate } from "react-router-dom";
import { useEmployee } from "../hooks/useEmployee";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";
import { EmployeeForm } from "../components/EmployeeForm";
import { toast } from "sonner";

export default function EmployeeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { employee, loading } = useEmployee(id);
  const { update } = useUpdateEmployee();

  async function handleUpdate(data) {
    try {
      await update(id, data);
      toast.success("Employee updated successfully!");
      navigate("/employees");
    } catch (err) {
      toast.error("Failed to update employee");
      console.error(err);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!employee) return <p>Employee not found.</p>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Employee</h1>

      <EmployeeForm
        defaultValues={{
          name: employee.name,
          role: employee.role,
          departmentId: employee.departmentId
        }}
        onSubmit={handleUpdate}
        isSubmitting={false}
      />
    </div>
  );
}
