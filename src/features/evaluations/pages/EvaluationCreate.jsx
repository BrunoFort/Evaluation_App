import { useNavigate } from "react-router-dom";
import { EvaluationForm } from "../components/EvaluationForm";
import { useCreateEvaluation } from "../hooks/useCreateEvaluation";
import { toast } from "sonner";

export default function EvaluationCreate() {
  const navigate = useNavigate();
  const { create } = useCreateEvaluation();

  async function handleCreate(data) {
    try {
      await create(data);
      toast.success("Evaluation created successfully!");
      navigate("/evaluations");
    } catch (err) {
      toast.error("Failed to create evaluation");
      console.error(err);
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create Evaluation</h1>

      <EvaluationForm
        defaultValues={{
          employeeId: "",
          employerId: "",
          score: "",
          starRating: "",
          date: "",
          referenceContact: "",
          comments: "",
        }}
        onSubmit={handleCreate}
        isSubmitting={false}
      />
    </div>
  );
}
