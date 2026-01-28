import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import CompanyLayout from "../../../Layouts/CompanyLayout";
import Card from "/src/components/ui/card.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";
import StatusPill from "/src/components/ui/StatusPill.jsx";

export default function EvaluationView() {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState(null);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    async function loadData() {
      const evRes = await fetch(`http://localhost:4000/evaluations/${id}`);
      const ev = await evRes.json();
      setEvaluation(ev);

      if (ev.employeeId) {
        const empRes = await fetch(
          `http://localhost:4000/employees/${ev.employeeId}`
        );
        const emp = await empRes.json();
        setEmployee(emp);
      }
    }

    loadData();
  }, [id]);

  if (!evaluation) {
    return (
      <CompanyLayout>
        <p className="text-slate-500">Loading evaluation...</p>
      </CompanyLayout>
    );
  }

  return (
    <CompanyLayout>
      <div className="max-w-3xl mx-auto space-y-10">

        <PageHeader
          title={evaluation.title}
          subtitle={`Created on ${new Date(evaluation.createdAt).toLocaleDateString()}`}
          right={<StatusPill status={evaluation.status} />}
        />

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

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-slate-900">
                {employee.name}
              </h2>
              <p className="text-slate-600">{employee.email}</p>

              <Link
                to={`/employees/${employee.id}`}
                className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
              >
                View Employee →
              </Link>
            </div>
          </Card>
        )}

        {/* Evaluation Content */}
        <SectionCard title="Evaluation Details">
          {evaluation.description ? (
            <p className="text-slate-700 whitespace-pre-line">
              {evaluation.description}
            </p>
          ) : (
            <p className="text-slate-500">No description provided.</p>
          )}
        </SectionCard>

        {/* Actions */}
        <div className="flex justify-end">
          <Link
            to="/evaluations"
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Back
          </Link>
        </div>
      </div>
    </CompanyLayout>
  );
}

