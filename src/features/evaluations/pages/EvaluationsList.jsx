// src/features/evaluations/pages/EvaluationsList.jsx
import React from "react";
import { useEvaluations } from "../hooks/useEvaluations";
import { useDeleteEvaluation } from "../hooks/useDeleteEvaluation";
import { EvaluationTable } from "../components/EvaluationTable";
import { Button } from "../../../components/ui/button";
import CompanyLayout from "../../../layouts/CompanyLayout";
import { createPageUrl } from "../../../utils";

export default function EvaluationsList() {
  const { evaluations, loading } = useEvaluations();
  const { deleteEvaluation } = useDeleteEvaluation();

  if (loading) {
    return (
      <CompanyLayout>
        <p>Loading evaluations...</p>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">All Evaluations</h1>

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => (window.location.href = "/evaluations/new")}
        >
          + New Evaluation
        </Button>
      </div>

      <EvaluationTable
        evaluations={evaluations}
        onDelete={deleteEvaluation}
        onView={(id) =>
          (window.location.href = createPageUrl(`EvaluationDetails?id=${id}`))
        }
      />
    </CompanyLayout>
  );
}
