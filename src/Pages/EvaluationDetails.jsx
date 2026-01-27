// src/Pages/EvaluationDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardContent } from "../components/ui/card";
import Button from "/src/components/ui/Button.jsx";
import { Star } from "lucide-react";
import { useEvaluations } from "../features/evaluations/hooks/useEvaluations";
import { useEmployees } from "../features/employees/hooks/useEmployees";
import { useEmployers } from "../features/employers/hooks/useEmployers";

export default function EvaluationDetails() {
  const { id } = useParams();
  const { evaluations, loading: loadingEval } = useEvaluations();
  const { employees } = useEmployees();
  const { employers } = useEmployers();

  if (loadingEval) {
    return (
      <CompanyLayout>
        <p>Loading evaluation...</p>
      </CompanyLayout>
    );
  }

  const evaluation = evaluations.find((ev) => String(ev.id) === String(id));

  if (!evaluation) {
    return (
      <CompanyLayout>
        <p>Evaluation not found.</p>
      </CompanyLayout>
    );
  }

  const employee = employees.find(
    (emp) => emp.id === evaluation.employeeId
  );

  const employer = employers.find(
    (emp) => emp.id === evaluation.employerId
  );

  return (
    <CompanyLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Evaluation Details
        </h1>

        {/* 🆕 Botão Edit */}
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => (window.location.href = `/evaluations/${id}/edit`)}
        >
          Edit Evaluation
        </Button>
      </div>

      <Card className="shadow-lg border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {employee?.fullName}
              </h2>
              <p className="text-slate-600">
                Evaluated by: {employer?.evaluatorName} ({employer?.companyName})
              </p>
              <p className="text-slate-500 text-sm">{evaluation.date}</p>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-xl">{evaluation.starRating}</span>
            </div>
          </div>

          {/* Score */}
          <div>
            <p className="text-sm text-slate-500">Overall Score</p>
            <p className="text-3xl font-bold">{evaluation.score}/100</p>
          </div>

          {/* Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["Quality & Productivity", evaluation.qualityProductivity],
              ["Knowledge & Skills", evaluation.knowledgeSkills],
              ["Goal Achievement", evaluation.goalAchievement],
              ["Teamwork & Collaboration", evaluation.teamworkCollaboration],
              ["Initiative & Proactivity", evaluation.initiativeProactivity],
              ["Self-Management", evaluation.selfManagement],
              ["Communication & Relationships", evaluation.communicationRelationships],
            ].map(([label, value]) => (
              <div key={label} className="p-4 border rounded bg-white shadow-sm">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-xl font-semibold">{value ?? "N/A"}</p>
              </div>
            ))}
          </div>

          {/* Comments */}
          {evaluation.comments && (
            <div>
              <p className="text-sm text-slate-500 mb-1">General Comments</p>
              <p className="text-slate-800">{evaluation.comments}</p>
            </div>
          )}

          {/* Reference Contact */}
          {evaluation.referenceContact && (
            <div>
              <p className="text-sm text-slate-500 mb-1">Reference Contact</p>
              <p className="text-slate-800">{evaluation.referenceContact}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
