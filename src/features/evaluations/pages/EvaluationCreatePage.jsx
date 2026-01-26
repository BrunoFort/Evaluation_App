// src/features/evaluations/pages/EvaluationCreatePage.jsx
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EmployerLayout from "@/Layouts/EmployerLayout";
import { useAuth } from "../../auth/useAuth";
import { generatePublicToken } from "../../../utils/generatePublicToken";
import { ClipboardCheck } from "lucide-react";

export default function EvaluationCreatePage() {
  const navigate = useNavigate();
  const { employer } = useAuth();
  const employerId = employer?.id;

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
      employerId,
      createdAt: new Date().toISOString(),
      status: "pending",
      publicToken: generatePublicToken(),
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
    <EmployerLayout>
      <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <ClipboardCheck className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900">
            Create Evaluation
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Score */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Score (0–5)
            </label>
            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              min="0"
              max="5"
              step="0.1"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {saving ? "Saving..." : "Create Evaluation"}
          </button>
        </form>
      </div>
    </EmployerLayout>
  );
}
