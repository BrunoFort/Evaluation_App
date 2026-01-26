// src/features/evaluations/pages/EvaluationView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyLayout from "../../../Layouts/CompanyLayout";
import { generatePublicToken } from "../../../utils/generatePublicToken";
import { FileText, Link as LinkIcon, Loader2 } from "lucide-react";

export default function EvaluationView() {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchEvaluation() {
    try {
      const res = await fetch(`http://localhost:4000/evaluations/${id}`);
      const data = await res.json();
      setEvaluation(data);
    } catch (error) {
      console.error("Error loading evaluation:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvaluation();
  }, [id]);

  async function handleGenerateLink() {
    setSaving(true);

    const token = generatePublicToken();
    const updated = { ...evaluation, publicToken: token };

    try {
      await fetch(`http://localhost:4000/evaluations/${evaluation.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      setEvaluation(updated);
    } catch (error) {
      console.error("Error generating public link:", error);
    } finally {
      setSaving(false);
    }
  }

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
        <p className="text-red-600">Evaluation not found.</p>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900">
            Evaluation #{evaluation.id}
          </h1>
        </div>

        {/* Basic Info */}
        <div className="space-y-2 text-slate-700 mb-6">
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
        </div>

        {/* Public Link Section */}
        <div className="border-t border-slate-200 pt-6 mt-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-blue-600" />
            Public Access Link
          </h2>

          {evaluation.publicToken ? (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-slate-700 mb-2">
                Share this link with employers:
              </p>

              <code className="block p-2 bg-white border rounded text-blue-700 break-all">
                {`${window.location.origin}/evaluation/${evaluation.publicToken}`}
              </code>
            </div>
          ) : (
            <button
              onClick={handleGenerateLink}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Generate Public Link
            </button>
          )}
        </div>

        {/* Sections */}
        <div className="pt-6 border-t border-slate-200 mt-6">
          <h2 className="text-lg font-semibold mb-4">Evaluation Details</h2>

          {evaluation.sections?.length > 0 ? (
            evaluation.sections.map((section, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium text-slate-800">{section.title}</p>
                <p className="text-slate-600">{section.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-500">No sections added yet.</p>
          )}
        </div>
      </div>
    </CompanyLayout>
  );
}
