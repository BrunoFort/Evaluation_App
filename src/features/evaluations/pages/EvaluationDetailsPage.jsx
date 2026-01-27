import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Card from "../../../components/ui/Card.jsx";
import PageHeader from "../../../components/ui/PageHeader.jsx";
import SectionCard from "../../../components/ui/SectionCard.jsx";
import StatusPill from "../../../components/ui/StatusPill.jsx";
import Button from "../../../components/ui/Button.jsx";

export default function EvaluationDetailsPage() {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`http://localhost:4000/evaluations/${id}`);
      const data = await res.json();
      setEvaluation(data);
    }
    load();
  }, [id]);

  if (!evaluation) {
    return <p className="text-slate-500">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <PageHeader
        title={evaluation.title}
        subtitle={`Evaluation for ${evaluation.employeeName}`}
        right={
          <Button as={Link} to="/evaluations" variant="outline">
            Back
          </Button>
        }
      />

      <Card className="space-y-6">
        <SectionCard title="Evaluation Details">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">Status</p>
            <StatusPill status={evaluation.status} />
          </div>

          <div>
            <p className="text-sm text-slate-600 mb-1">Created At</p>
            <p className="text-slate-900">
              {evaluation.createdAt
                ? new Date(evaluation.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-600 mb-1">Evaluator</p>
            <p className="text-slate-900">{evaluation.evaluatorName}</p>
          </div>
        </SectionCard>

        <SectionCard title="Content">
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
            {evaluation.content}
          </p>
        </SectionCard>
      </Card>
    </div>
  );
}
