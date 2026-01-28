import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PublicLayout from "../../../Layouts/PublicLayout";
import Card from "/src/components/ui/card.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";
import StatusPill from "/src/components/ui/StatusPill.jsx";

export default function PublicEvaluationView() {
  const { token } = useParams();
  const [evaluation, setEvaluation] = useState(null);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    async function loadData() {
      const evRes = await fetch(
        `http://localhost:4000/evaluations?token=${token}`
      );
      const evList = await evRes.json();
      const ev = evList[0];
      setEvaluation(ev);

      if (ev?.employeeId) {
        const empRes = await fetch(
          `http://localhost:4000/employees/${ev.employeeId}`
        );
        const emp = await empRes.json();
        setEmployee(emp);
      }
    }

    loadData();
  }, [token]);

  if (!evaluation) {
    return (
      <PublicLayout>
        <p className="text-slate-500">Loading evaluation...</p>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="space-y-10 max-w-3xl mx-auto">

        {/* Header */}
        <Card className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">
            {evaluation.title}
          </h1>

          <p className="text-slate-500 text-sm">
            Created on{" "}
            {evaluation.createdAt
              ? new Date(evaluation.createdAt).toLocaleDateString()
              : "Unknown date"}
          </p>

          <StatusPill status={evaluation.status} />
        </Card>

        {/* Employee Info */}
        {employee && (
          <Card className="flex items-center gap-6 p-6">
            {employee.photoUrl ? (
              <img
                src={employee.photoUrl}
                alt={employee.name}
                className="h-20 w-20 rounded-full object-cover border"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                No Photo
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {employee.name}
              </h2>
              <p className="text-slate-600">{employee.email}</p>
            </div>
          </Card>
        )}

        {/* Evaluation Content */}
        <SectionCard title="Evaluation Details">
          <p className="text-slate-700 whitespace-pre-line">
            {evaluation.description || "No description provided."}
          </p>
        </SectionCard>
      </div>
    </PublicLayout>
  );
}

