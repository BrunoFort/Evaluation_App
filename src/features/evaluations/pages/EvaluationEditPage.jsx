// src/features/evaluations/pages/EvaluationEditPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompanyLayout from "../../../layouts/CompanyLayout";
import { useEvaluations } from "../hooks/useEvaluations";
import { useEmployees } from "../../employees/hooks/useEmployees";
import { useUpdateEvaluation } from "../hooks/useUpdateEvaluation";
import { EvaluationForm } from "../components/EvaluationForm";

export default function EvaluationEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { evaluations, loading } = useEvaluations();
  const { employees } = useEmployees();
  const { update, updating } = useUpdateEvaluation();

  if (loading) {
    return (
      <CompanyLayout>
        <p>Loading evaluation...</p>
      </CompanyLayout>
    );
  }

  const evaluation = evaluations.find((ev) => String(ev.id) === String(id));

  if (!evaluation) {
    return (
      <CompanyLayout>
        <p>Evaluation not found.</p>
      </CompanyLayout>
    );
  }

  async function handleSubmit(formData) {
    const result = await update(id, formData);

    if (result.success) {
      alert("Evaluation updated successfully.");
      navigate(`/evaluations/${id}`);
    }
  }

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Edit Evaluation
      </h1>

      <EvaluationForm
        employees={employees}
        onSubmit={handleSubmit}
        loading={updating}
        defaultValues={evaluation}
      />
    </CompanyLayout>
  );
}
