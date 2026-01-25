import { useParams, useNavigate } from "react-router-dom";
import { useEvaluation } from "../hooks/useEvaluation";
import { useUpdateEvaluation } from "../hooks/useUpdateEvaluation";
import { EvaluationForm } from "../components/EvaluationForm";
import { toast } from "sonner";

export default function EvaluationEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { evaluation, loading } = useEvaluation(id);
  const { update } = useUpdateEvaluation();

  async function handleUpdate(data) {
    try {
      await update(id, data);
      toast.success("Evaluation updated successfully!");
      navigate("/evaluations");
    } catch (err) {
      toast.error("Failed to update evaluation");
      console.error(err);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!evaluation) return <p>Evaluation not found.</p>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Evaluation</h1>

      <EvaluationForm
        defaultValues={{
          employeeId: evaluation.employeeId,
          employerId: evaluation.employerId,
          score: evaluation.score,
          starRating: evaluation.starRating,
          date: evaluation.date,
          referenceContact: evaluation.referenceContact,
          comments: evaluation.comments || "",
        }}
        onSubmit={handleUpdate}
        isSubmitting={false}
      />
    </div>
  );
}
