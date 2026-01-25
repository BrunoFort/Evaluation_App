import { useEvaluations } from "../hooks/useEvaluations";
import { useDeleteEvaluation } from "../hooks/useDeleteEvaluation";
import { EvaluationTable } from "../components/EvaluationTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function EvaluationsList() {
  const { evaluations, loading } = useEvaluations();
  const { remove } = useDeleteEvaluation();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Evaluations</h1>

        <Button asChild>
          <Link to="/evaluations/create">New Evaluation</Link>
        </Button>
      </div>

      <EvaluationTable evaluations={evaluations} onDelete={remove} />
    </div>
  );
}
