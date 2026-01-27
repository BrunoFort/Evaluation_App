import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicLayout from "../Layouts/PublicLayout";
import { Star, Link as LinkIcon } from "lucide-react";

function Stars({ score }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.round(score)
              ? "text-yellow-400 fill-yellow-400"
              : "text-slate-300"
          }`}
        />
      ))}
      <span className="text-xs text-slate-500 ml-1">{score.toFixed(1)}/5</span>
    </div>
  );
}

export default function EmployeeEvaluationDetails() {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/evaluations/${id}`)
      .then((res) => res.json())
      .then(setEvaluation);
  }, [id]);

  if (!evaluation) {
    return (
      <EmployeeLayout>
        <p className="text-slate-500">Loading...</p>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">{evaluation.title}</h2>

        <p className="text-sm text-slate-500">
          {new Date(evaluation.createdAt).toLocaleDateString()}
        </p>

        <div>
          <p className="text-xs uppercase text-slate-400">Overall Score</p>
          <Stars score={evaluation.overallScore} />
        </div>

        <div className="space-y-2 pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-700">
            <strong>Strengths:</strong> {evaluation.strengths || "—"}
          </p>
          <p className="text-sm text-slate-700">
            <strong>Areas for Improvement:</strong>{" "}
            {evaluation.improvements || "—"}
          </p>
          <p className="text-sm text-slate-700">
            <strong>Suggestions:</strong> {evaluation.suggestions || "—"}
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Evaluation Criteria
          </h3>

          {evaluation.criteria?.length ? (
            evaluation.criteria.map((c, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-lg p-4 bg-slate-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-slate-800">{c.name}</p>
                  <Stars score={c.score} />
                </div>
                <p className="text-sm text-slate-600">{c.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No criteria available.</p>
          )}
        </div>

        <div className="pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-2">Public Link</p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={`${window.location.origin}/evaluation/${evaluation.publicToken}`}
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/evaluation/${evaluation.publicToken}`
                );
                alert("Link copied!");
              }}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <LinkIcon className="w-4 h-4" />
              Copy
            </button>
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
}
