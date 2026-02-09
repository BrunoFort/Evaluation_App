// src/app/(dashboard)/employer/evaluations/[id]/page.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEvaluation } from "/src/features/evaluations/hooks/useEvaluation.js";
import { useDeleteEvaluation } from "/src/features/evaluations/hooks/useDeleteEvaluation.js";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import Card from "/src/components/ui/Card.jsx";
import Button from "/src/components/ui/Button.jsx";
import StatusPill from "/src/components/ui/StatusPill.jsx";
import { DeleteEvaluationDialog } from "/src/features/evaluations/components/DeleteEvaluationDialog.jsx";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth.js";

export default function EmployerEvaluationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { evaluation, loading, error } = useEvaluation(id);
  const { remove, loading: deleting } = useDeleteEvaluation();
  const { employer } = useEmployerAuth();

  async function handleDelete() {
    await remove(id);
    navigate("/employer/evaluations");
  }

  if (loading) {
    return (
      <EmployerDashboardLayout>
        <p className="text-neutral-500">Loading evaluation...</p>
      </EmployerDashboardLayout>
    );
  }

  if (error || !evaluation) {
    return (
      <EmployerDashboardLayout>
        <p className="text-red-600">Evaluation not found.</p>
      </EmployerDashboardLayout>
    );
  }

  if (evaluation.employerId && employer?.employerId) {
    if (String(evaluation.employerId) !== String(employer.employerId)) {
      return (
        <EmployerDashboardLayout>
          <p className="text-red-600">Unauthorized access.</p>
        </EmployerDashboardLayout>
      );
    }
  }

  return (
    <EmployerDashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900">
              {evaluation.title}
            </h1>
            <p className="text-neutral-600 mt-1">
              Evaluation for employee {evaluation.employeeId}
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/employer/evaluations")}
            >
              Back
            </Button>

            <DeleteEvaluationDialog onConfirm={handleDelete}>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </DeleteEvaluationDialog>
          </div>
        </div>

        {/* Main Card */}
        <Card className="p-8 space-y-8 border border-neutral-200 rounded-2xl shadow-sm">

          {/* Status */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-600">Status</p>
            <StatusPill status={evaluation.status} />
          </div>

          {/* Created At */}
          <div>
            <p className="text-sm text-neutral-600 mb-1">Created At</p>
            <p className="text-neutral-900">
              {new Date(evaluation.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Overall Score */}
          <div>
            <p className="text-sm text-neutral-600 mb-1">Overall Score</p>
            <p className="text-neutral-900 font-semibold">
              {evaluation.overallScore ?? "N/A"}
            </p>
          </div>

          {/* Criteria */}
          {evaluation.criteria?.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-neutral-900">
                Criteria
              </h2>

              <div className="space-y-3">
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
            </div>
          )}

        </Card>
      </div>
    </EmployerDashboardLayout>
  );
}
