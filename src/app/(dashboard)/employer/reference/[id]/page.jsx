// src/app/(dashboard)/employer/reference/[id]/page.jsx

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import Card from "/src/components/ui/Card.jsx";
import StatusPill from "/src/components/ui/StatusPill.jsx";
import { usePublicEvaluation } from "/src/features/evaluations/hooks/usePublicEvaluation.js";

export default function EmployerReferenceReportPage() {
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
      <EmployerDashboardLayout>
        <p className="p-6 text-neutral-500">Loading reference report...</p>
      </EmployerDashboardLayout>
    );
  }

  return (
    <EmployerDashboardLayout>
      <div className="max-w-3xl mx-auto p-6 space-y-10">

        {/* Header */}
        <header className="space-y-2 border-b pb-4">
          <h1 className="text-4xl font-bold text-neutral-900">
            Reference Report
          </h1>

          <p className="text-neutral-600">
            Based on evaluations provided by previous employers.
          </p>

          <p className="text-xs text-neutral-500">
            Access restricted to registered employers.
          </p>
        </header>

        {/* No evaluations */}
        {evaluations.length === 0 && (
          <Card className="p-6 text-neutral-600">
            This candidate has no evaluations yet.
          </Card>
        )}

        {/* Evaluations */}
        {evaluations.map((ev) => (
          <Card
            key={ev.id}
            className="p-6 space-y-4 border border-neutral-200 rounded-2xl shadow-sm"
          >
            {/* Title + Status */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-neutral-900">
                  {ev.title || "Evaluation"}
                </p>
                <p className="text-sm text-neutral-600">
                  {ev.created_at
                    ? new Date(ev.created_at).toLocaleDateString()
                    : "Unknown date"}
                </p>
              </div>
              <StatusPill status={ev.status} />
            </div>

            {/* Criteria */}
            {ev.scores && (
              <div className="space-y-3">
                {Array.isArray(ev.scores)
                  ? ev.scores.map((item, index) => (
                      <div
                        key={item.key || item.label || index}
                        className="border border-neutral-200 rounded-lg p-4"
                      >
                        <p className="font-medium text-neutral-900">
                          {item.label || item.key || `Criteria ${index + 1}`}
                        </p>
                        <p className="text-neutral-700 mt-1">
                          Score: {item.score ?? "N/A"}
                        </p>
                      </div>
                    ))
                  : Object.entries(ev.scores).map(([key, value]) => (
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

            <div>
              <p className="text-sm text-neutral-500 mb-1">Overall Score</p>
              <p className="text-neutral-900 font-semibold">
                {ev.overallScore ?? ev.overallscore ?? "N/A"}
              </p>
            </div>

            {/* Comments */}
            {ev.comments && (
              <div>
                <p className="text-sm text-neutral-500 mb-1">
                  General comments:
                </p>
                <p className="text-neutral-800">{ev.comments}</p>
              </div>
            )}

          </Card>
        ))}
      </div>
    </EmployerDashboardLayout>
  );
}
