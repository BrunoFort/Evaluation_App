// src/features/evaluations/pages/PublicEvaluationView.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { usePublicEvaluation } from "../hooks/usePublicEvaluation";
import PublicLayout from "../../../Layouts/PublicLayout";
import { FileText, AlertTriangle, Star, User, Building2 } from "lucide-react";

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
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Evaluation Report
              </h1>
              <p className="text-sm text-slate-500">
                {new Date(evaluation.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {evaluation.overallScore && (
            <div className="text-right">
              <p className="text-xs uppercase text-slate-400">Overall score</p>
              <Stars score={evaluation.overallScore} />
            </div>
          )}
        </div>

        {/* Candidate Info */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center gap-4">
          <User className="w-10 h-10 text-blue-600" />
          <div>
            <p className="text-lg font-semibold text-slate-900">
              {evaluation.employeeName}
            </p>
            <p className="text-sm text-slate-600">{evaluation.employeeRole}</p>
          </div>
        </div>

        {/* Employer Info */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center gap-4">
          <Building2 className="w-10 h-10 text-purple-600" />
          <div>
            <p className="text-sm text-slate-500">Evaluation provided by</p>
            <p className="text-lg font-semibold text-slate-900">
              {evaluation.employerName}
            </p>
          </div>
        </div>

        {/* Status */}
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            Status: {evaluation.status}
          </span>
        </div>

        {/* Criteria */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Evaluation Criteria
          </h2>

          {evaluation.criteria?.length ? (
            evaluation.criteria.map((c, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-lg p-4 bg-slate-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-800">{c.name}</p>
                  <Stars score={c.score} />
                </div>
                <p className="text-sm text-slate-600">{c.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No criteria available for this evaluation.
            </p>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
