// src/features/evaluations/pages/PublicEvaluationView.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { usePublicEvaluation } from "../hooks/usePublicEvaluation";
import PublicLayout from "../../../Layouts/PublicLayout";
import { FileText, AlertTriangle, Star } from "lucide-react";

function Stars({ score = 0 }) {
  const value = Number(score) || 0;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.round(value)
              ? "text-yellow-400 fill-yellow-400"
              : "text-slate-300"
          }`}
        />
      ))}
      <span className="text-xs text-slate-500 ml-1">{value.toFixed(1)}/5</span>
    </div>
  );
}

export default function PublicEvaluationView() {
  const { token } = useParams();
  const { evaluation, loading } = usePublicEvaluation(token);

  if (loading) {
    return (
      <PublicLayout>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 text-center text-slate-500">
          Loading evaluation...
        </div>
      </PublicLayout>
    );
  }

  if (!evaluation) {
    return (
      <PublicLayout>
        <div className="flex items-center gap-3 text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg">
          <AlertTriangle className="w-6 h-6" />
          <p>Evaluation not found or link expired.</p>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Evaluation Report
              </h1>
              <p className="text-sm text-slate-500">
                Date:{" "}
                {new Date(evaluation.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {evaluation.score && (
            <div className="text-right">
              <p className="text-xs uppercase text-slate-400">Overall score</p>
              <Stars score={evaluation.score} />
            </div>
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            Status: {evaluation.status}
          </span>
        </div>

        {/* Sections */}
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Evaluation Summary
          </h2>

          {evaluation.sections?.length ? (
            evaluation.sections.map((section, index) => (
              <div
                key={index}
                className="border border-slate-100 rounded-lg p-3 bg-slate-50"
              >
                <p className="font-medium text-slate-800 mb-1">
                  {section.title}
                </p>
                <p className="text-sm text-slate-600">{section.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No detailed sections were provided in this evaluation.
            </p>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
