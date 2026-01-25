import { useNavigate } from "react-router-dom";
import { EmployerForm } from "../components/EmployerForm";
import { useCreateEmployer } from "../hooks/useCreateEmployer";
import { toast } from "sonner";

export default function EmployerCreate() {
  const navigate = useNavigate();
  const { create } = useCreateEmployer();

  async function handleCreate(data) {
    try {
      await create(data);
      toast.success("Employer created successfully!");
      navigate("/employers");
    } catch (err) {
      toast.error("Failed to create employer");
      console.error(err);
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create Employer</h1>

      <EmployerForm
        defaultValues={{
          companyName: "",
          businessNumber: "",
          evaluatorName: "",
          evaluatorPosition: "",
          email: "",
          phone: "",
        }}
        onSubmit={handleCreate}
        isSubmitting={false}
      />
    </div>
  );
}
