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
  const { remove, loading: deleting } = useDeleteEvaluation();

  if (loading) {
    return (
      <CompanyLayout>
        <p>Loading evaluations...</p>
      </CompanyLayout>
    );
  }

  async function handleDelete(id) {
    const result = await remove(id);

    if (result.success) {
      alert("Evaluation deleted successfully.");
      // Nada mais é necessário — useEvaluations() já reflete o store atualizado
    }
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
        onView={(id) =>
          (window.location.href = createPageUrl(`EvaluationDetails?id=${id}`))
        }
        onDelete={handleDelete}
      />

      {deleting && (
        <p className="text-sm text-slate-500 mt-3">Deleting evaluation...</p>
      )}
    </CompanyLayout>
  );
}
