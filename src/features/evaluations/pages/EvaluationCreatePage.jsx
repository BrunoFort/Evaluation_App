import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import CompanyLayout from "../../../Layouts/CompanyLayout";
import { useAuth } from "../../auth/useAuth";
import { generatePublicToken } from "../../../utils/generatePublicToken";

import Card from "/src/components/ui/card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";

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
    <CompanyLayout>
      <div className="max-w-xl mx-auto space-y-10">

        <PageHeader
          title="Create Evaluation"
          subtitle="Start a new evaluation for an employee"
          right={
            <Button variant="outline" onClick={() => navigate("/evaluations")}>
              Cancel
            </Button>
          }
        />

        <Card className="p-8 space-y-8">

          <SectionCard
            title={
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-blue-600" />
                Evaluation Details
              </div>
            }
          >
            <div className="space-y-4">

              {/* Employee ID */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Employee ID
                </label>
                <Input
                  type="number"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  placeholder="Enter employee ID"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title
                </label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Evaluation title"
                  required
                />
              </div>

              {/* Score */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Score (0–5)
                </label>
                <Input
                  type="number"
                  name="score"
                  value={formData.score}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="Optional score"
                />
              </div>

            </div>
          </SectionCard>

          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={saving}
            className="w-full py-3"
          >
            {saving ? "Saving..." : "Create Evaluation
