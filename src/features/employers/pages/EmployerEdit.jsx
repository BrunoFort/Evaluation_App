import { useParams, useNavigate } from "react-router-dom";
import { useEmployer } from "../hooks/useEmployer";
import { useUpdateEmployer } from "../hooks/useUpdateEmployer";
import { EmployerForm } from "../components/EmployerForm";
import { toast } from "sonner";

export default function EmployerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { employer, loading } = useEmployer(id);
  const { update } = useUpdateEmployer();

  async function handleUpdate(data) {
    try {
      await update(id, data);
      toast.success("Employer updated successfully!");
      navigate("/employers");
    } catch (err) {
      toast.error("Failed to update employer");
      console.error(err);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!employer) return <p>Employer not found.</p>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Employer</h1>

      <EmployerForm
        defaultValues={{
          companyName: employer.companyName,
          businessNumber: employer.businessNumber,
          evaluatorName: employer.evaluatorName,
          evaluatorPosition: employer.evaluatorPosition,
          email: employer.email,
          phone: employer.phone,
        }}
        onSubmit={handleUpdate}
        isSubmitting={false}
      />
    </div>
  );
}
