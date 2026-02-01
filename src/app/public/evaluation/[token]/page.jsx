// src/app/public/evaluation/[token]/page.jsx

import { useParams } from "react-router-dom";

import PublicLayout from "/src/layouts/PublicLayout.jsx";
import Card from "/src/components/ui/Card.jsx";
import StatusPill from "/src/components/ui/StatusPill.jsx";

import { usePublicEvaluation } from "/src/features/evaluations/hooks/usePublicEvaluation.js";

export default function PublicEvaluationPage() {
  const { token } = useParams();
  const { evaluation, loading, error } = usePublicEvaluation(token);

  if (loading) {
    return (
      <PublicLayout>
        <p className="text-neutral-500">Loading evaluation...</p>
      </PublicLayout>
    );
  }

  if (error || !evaluation) {
    return (
      <PublicLayout>
        <p className="text-red-600">Evaluation not found.</p>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <Card className="p-8 space-y-4 border border-neutral-200 rounded-2xl shadow-sm">
          <h1 className="text-3xl font-bold text-neutral-900">
            {evaluation.title}
          </h1>

          <p className="text-neutral-600 text-sm">
            Created on{" "}
            {evaluation.createdAt
              ? new Date(evaluation.createdAt).toLocaleDateString()
              : "Unknown date"}
          </p>

          <StatusPill status={evaluation.status} />
        </Card>

        {/* Employer Info */}
        {evaluation.employerName && (
          <Card className="p-6 border border-neutral-200 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">
              Employer
            </h2>
            <p className="text-neutral-700 mt-1">{evaluation.employerName}</p>
          </Card>
        )}

        {/* Criteria */}
        {evaluation.criteria?.length > 0 && (
          <Card className="p-6 space-y-6 border border-neutral-200 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">
              Evaluation Criteria
            </h2>

            <div className="space-y-4">
              {evaluation.criteria.map((c, index) => (
                <div
                  key={index}
                  className="border border-neutral-200 rounded-lg p-4"
                >
                  <p className="font-medium text-neutral-900">{c.label}</p>
                  <p className="text-neutral-700 mt-1">Score: {c.score}</p>
                  {c.notes && (
                    <p className="text-neutral-600 mt-2 whitespace-pre-line">
                      {c.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Overall Score */}
        <Card className="p-6 border border-neutral-200 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900">
            Overall Score
          </h2>
          <p className="text-neutral-800 text-lg mt-2">
            {evaluation.overallScore ?? "N/A"}
          </p>
        </Card>
      </div>
    </PublicLayout>
  );
}
