import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PublicLayout from "/src/layouts/PublicLayout.jsx";
import Card from "/src/components/ui/Card.jsx";
import StatusPill from "/src/components/ui/StatusPill.jsx";
import { usePublicEvaluation } from "/src/features/evaluations/hooks/usePublicEvaluation.js";

export default function PublicEvaluationPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const { evaluations, loading, error } = usePublicEvaluation(token);

  useEffect(() => {
    if (!loading) {
      if (error === "expired") {
        navigate("/public/token-expired");
      } else if (error === "invalid") {
        navigate("/public/token-invalid");
      } else if (error) {
        navigate("/public/error");
      }
    }
  }, [loading, error, navigate]);

  if (loading) {
    return (
      <PublicLayout title="Loading – Shine">
        <p className="text-neutral-500">Loading evaluation...</p>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout title="Evaluation – Shine">
      <div className="max-w-3xl mx-auto space-y-10">
        {evaluations.map((evaluation) => (
          <Card
            key={evaluation.id}
            className="p-8 space-y-6 border border-neutral-200 rounded-2xl shadow-sm"
          >
            <h1 className="text-2xl font-bold text-neutral-900">
              {evaluation.title || "Evaluation"}
            </h1>

            <p className="text-neutral-600 text-sm">
              Created on{" "}
              {evaluation.created_at
                ? new Date(evaluation.created_at).toLocaleDateString()
                : "Unknown date"}
            </p>

            <StatusPill status={evaluation.status} />

            {evaluation.scores && (
              <div className="space-y-4 mt-6">
                <h2 className="text-xl font-semibold text-neutral-900">
                  Evaluation Criteria
                </h2>

                {Object.entries(evaluation.scores).map(([key, value]) => (
                  <div
                    key={key}
                    className="border border-neutral-200 rounded-lg p-4"
                  >
                    <p className="font-medium text-neutral-900">{key}</p>
                    <p className="text-neutral-700 mt-1">Score: {value}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-neutral-900">
                Overall Score
              </h2>
              <p className="text-neutral-800 text-lg mt-2">
                {evaluation.overallscore ?? "N/A"}
              </p>
            </div>

            {evaluation.comments && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-neutral-900">
                  Comments
                </h2>
                <p className="text-neutral-700 mt-2 whitespace-pre-line">
                  {evaluation.comments}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </PublicLayout>
  );
}
