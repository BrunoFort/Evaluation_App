import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { EmployeeForm } from "/src/features/employees/components/EmployeeForm.jsx";
import { useCreateEmployee } from "/src/features/employees/hooks/useCreateEmployee.js";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth.js";

import PageHeader from "/src/components/ui/PageHeader.jsx";
import Card from "/src/components/ui/Card.jsx";

export default function EmployeeCreatePage() {
  const navigate = useNavigate();
  const { create } = useCreateEmployee();
  const { employer } = useEmployerAuth();
  const employerId = employer?.employerId;

  async function handleCreate(data) {
    try {
      if (!employerId) {
        throw new Error("Employer account not found.");
      }

      await create({
        employerid: employerId,
        name: data.name,
        role: data.role,
        email: data.email,
      });
      toast.success("Employee created successfully!");
      navigate("/employees");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create employee");
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-10 p-6">

      <PageHeader
        title="Create Employee"
        subtitle="Add a new team member to your organization"
      />

      <Card className="p-8 border border-neutral-200 shadow-sm bg-white rounded-2xl">
        <EmployeeForm
          defaultValues={{
            name: "",
            role: "",
            email: "",
          }}
          onSubmit={handleCreate}
          isSubmitting={false}
        />
      </Card>

    </div>
  );
}
