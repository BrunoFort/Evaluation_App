// src/features/evaluations/pages/EvaluationCreatePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { useSaveEvaluation } from "@/features/evaluations/hooks/useSaveEvaluation";
import { EvaluationForm } from "@/features/evaluations/components/EvaluationForm";
import { useAuth } from "@/features/auth/AuthProvider";

export default function EvaluationCreatePage() {
  const navigate = useNavigate();
  const { employees, loading: loadingEmployees } = useEmployees();
  const { saveEvaluation, saving } = useSaveEvaluation();
  const { user } = useAuth();

  if (!user || user.role !== "employer") {
    return (
      <div className="p-6">
        <p>You must be logged in as an employer to create evaluations.</p>
      </div>
    );
  }

  if (loadingEmployees) {
    return (
      <div className="p-6">
        <p>Loading employees...</p>
      </div>
    );
  }

  async function handleSubmit(formData) {
    const payload = {
      ...formData,
      employerId: user.employerId ?? 1, // mock
      date: new Date().toISOString().slice(0, 10),
    };

    const result = await saveEvaluation(payload);

    if (result.success) {
      alert("Evaluation saved (mock).");
      navigate("/evaluations");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Evaluation</h1>
      <p className="text-gray-600 text-sm">
        Fill in the fields below to register a professional evaluation for one
        of your employees.
      </p>

      <EvaluationForm
        employees={employees}
        onSubmit={handleSubmit}
        loading={saving}
      />
    </div>
  );
}
