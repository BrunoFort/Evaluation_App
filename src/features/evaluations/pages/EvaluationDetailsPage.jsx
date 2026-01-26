import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmployerLayout from "@/Layouts/EmployerLayout";
import { ClipboardCheck, Link as LinkIcon, AlertTriangle } from "lucide-react";

export default function EvaluationDetailsPage() {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchEvaluation() {
      try {
        const res = await fetch(`http://localhost:4000/evaluations/${id}`);
        const data = await res.json();
        setEvaluation(data);
      } catch (error) {
        console.error("Error fetching evaluation:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvaluation();
  }, [id]);

  function copyLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/evaluation/${evaluation.publicToken}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <EmployerLayout>
        <p className="text-slate-500">Loading evaluation...</p>
      </EmployerLayout>
    );
  }

  if (!evaluation) {
    return (
      <EmployerLayout>
        <div className="flex items-center gap-3 text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg">
          <AlertTriangle className="w-6 h-6" />
          <p>Evaluation not found.</p>
        </div>
      </EmployerLayout>
    );
  }

  return (
    <EmployerLayout>
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <ClipboardCheck className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900">
            Evaluation Details
          </h1>
        </div>

        <div className="space-y-4 text-slate-700">
          <p>
            <strong>Employee ID:</strong> {evaluation.employeeId}
          </p>
          <p>
            <strong>Title:</strong> {evaluation.title}
          </p>
          <p>
            <strong>Score:</strong> {evaluation.score}
          </p>
          <p>
            <strong>Status:</strong> {evaluation.status}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(evaluation.createdAt).toLocaleDateString()}
          </p>

          {/* Link público */}
          <div className="pt-4 border-t border-slate-200">
            <h2 className="text-lg font-semibold mb-2">Public Link</h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/evaluation/${evaluation.publicToken}`}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <button
                onClick={copyLink}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <LinkIcon className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Seções */}
          {evaluation.sections?.length > 0 && (
            <div className="pt-4 border-t border-slate-200">
              <h2 className="text-lg font-semibold mb-2">Evaluation Summary</h2>
              {evaluation.sections.map((section, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium text-slate-800">{section.title}</p>
                  <p className="text-slate-600">{section.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </EmployerLayout>
  );
}
