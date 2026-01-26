// src/features/evaluations/pages/EvaluationCreatePage.jsx
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CompanyLayout from "../../../Layouts/CompanyLayout";
import { useAuth } from "../../auth/useAuth";
import { generatePublicToken } from "../../../utils/generatePublicToken";

export default function EvaluationCreatePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const employerId = user?.id;

  const [searchParams] = useSearchParams();
  const employeeIdFromURL = searchParams.get("employeeId");

  const [formData, setFormData] = useState({
    employeeId: employeeIdFromURL || "",
    title: "",
    score: "",
    sections: [],
  });

  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const newEvaluation = {
      ...formData,
      employeeId: Number(formData.employeeId),
      employerId: employerId,
      createdAt: new Date().toISOString(),
      status: "pending",
      publicToken: generatePublicToken(), // 🔥 token gerado automaticamente
    };

    try {
      await fetch("http://localhost:4000/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvaluation),
      });

      navigate(`/evaluations`);
    } catch (error) {
      console.error("Error creating evaluation:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <CompanyLayout>
      <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Create Evaluation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Employee ID
            </label>
            <input
              type="number"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Score */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Score
            </label>
            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {saving ? "Saving..." : "Create Evaluation"}
          </button>
        </form>
      </div>
    </CompanyLayout>
  );
}
