// src/app/(dashboard)/employer/evaluations/create/page.jsx

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth.js";
import { generatePublicToken } from "/src/utils/generatePublicToken.js";
import { CriteriaEditor} from "/src/features/reference/components/CriteriaEditor.jsx";

export default function EmployerCreateEvaluationPage() {
  const navigate = useNavigate();
  const { employer } = useEmployerAuth();
  const employerId = employer?.employerId;

  const [searchParams] = useSearchParams();
  const employeeIdFromURL = searchParams.get("employeeId");

  const [formData, setFormData] = useState({
    employeeId: employeeIdFromURL || "",
    title: "",
  });

  const [criteria, setCriteria] = useState({
  qualityProductivity: 0,
  knowledgeSkills: 0,
  goalAchievement: 0,
  teamworkCollaboration: 0,
  initiativeProactivity: 0,
  selfManagement: 0,
  communicationRelationships: 0,
});
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function calculateOverallScore() {
    if (criteria.length === 0) return 0;
    const total = criteria.reduce(
      (sum, c) => sum + (Number(c.score) || 0),
      0
    );
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

      navigate("/employer/evaluations");
    } catch (error) {
      console.error("Error creating evaluation:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <EmployerDashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center gap-3">
          <ClipboardCheck className="w-8 h-8 text-purple-600" />
          <h1 className="text-4xl font-bold text-neutral-900">
            Create Evaluation
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Employee ID
            </label>
            <input
              type="number"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Criteria Editor */}
          <CriteriaEditor values={criteria} onChange={setCriteria} />

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            {saving ? "Saving..." : "Create Evaluation"}
          </button>
        </form>
      </div>
    </EmployerDashboardLayout>
  );
}
