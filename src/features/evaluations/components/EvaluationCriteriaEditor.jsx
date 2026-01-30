import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EmployerLayout from "@/Layouts/EmployerLayout";
import { useEmployerAuth } from "../../auth/employer/useEmployerAuth";
import { generatePublicToken } from "../../../utils/generatePublicToken";
import CriteriaEditor from "../components/EvaluationCriteriaEditor";
import { ClipboardCheck } from "lucide-react";

export default function EvaluationCreatePage() {
  const navigate = useNavigate();
  const { employer } = useEmployerAuth();
  const employerId = employer?.employerId;

  const [searchParams] = useSearchParams();
  const employeeIdFromURL = searchParams.get("employeeId");

  const [formData, setFormData] = useState({
    employeeId: employeeIdFromURL || "",
    title: "",
  });

  const [criteria, setCriteria] = useState([]);
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function calculateOverallScore() {
    if (criteria.length === 0) return 0;
    const total = criteria.reduce((sum, c) => sum + (Number(c.score) || 0), 0);
    return total / criteria.length;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const newEvaluation = {
      ...formData,
      employeeId: Number(formData.employeeId),
      employerId,
      employerName: employer.companyName,
      createdAt: new Date().toISOString(),
      status: "completed",
      publicToken: generatePublicToken(),
      criteria,
      overallScore: calculateOverallScore(),
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
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-8">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900">
            Create Evaluation
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Criteria Editor */}
          <CriteriaEditor criteria={criteria} setCriteria={setCriteria} />

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
    </EmployerLayout>
  );
}
