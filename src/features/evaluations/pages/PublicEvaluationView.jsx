// src/features/evaluations/pages/PublicEvaluationView.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { usePublicEvaluation } from "../hooks/usePublicEvaluation";
import CompanyLayout from "../../../Layouts/CompanyLayout";
import { FileText, AlertTriangle } from "lucide-react";

export default function PublicEvaluationView() {
  const { token } = useParams();
  const { evaluation, loading } = usePublicEvaluation(token);

  if (loading) {
    return (
      <CompanyLayout>
        <p className="text-slate-500">Loading evaluation...</p>
      </CompanyLayout>
    );
  }

  if (!evaluation) {
    return (
      <CompanyLayout>
        <div className="flex items-center gap-3 text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg">
          <AlertTriangle className="w-6 h-6" />
          <p>Evaluation not found or link expired.</p>
        </div>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900">
            Evaluation Report
          </h1>
        </div>

        <div className="space-y-4 text-slate-700">
          <p>
            <strong>Date:</strong>{" "}
            {new Date(evaluation.createdAt).toLocaleDateString()}
          </p>

          <p>
            <strong>Status:</strong> {evaluation.status}
          </p>

          {evaluation.score && (
            <p>
              <strong>Score:</strong> {evaluation.score}
            </p>
          )}

          <div className="pt-4 border-t border-slate-200">
            <h2 className="text-lg font-semibold mb-2">Evaluation Summary</h2>

            {evaluation.sections?.map((section, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium text-slate-800">{section.title}</p>
                <p className="text-slate-600">{section.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CompanyLayout>
  );
}
