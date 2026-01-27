import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicLayout from "../../../Layouts/PublicLayout";

export default function PublicEvaluationView() {
  const { token } = useParams();
  const [evaluation, setEvaluation] = useState(null);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    async function loadData() {
      const evRes = await fetch(`http://localhost:4000/evaluations?token=${token}`);
      const evList = await evRes.json();
      const ev = evList[0];
      setEvaluation(ev);

      if (ev?.employeeId) {
        const empRes = await fetch(`http://localhost:4000/employees/${ev.employeeId}`);
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
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            {evaluation.title}
          </h1>

          <p className="text-slate-500 text-sm mt-1">
            Created on{" "}
            {evaluation.createdAt
              ? new Date(evaluation.createdAt).toLocaleDateString()
              : "Unknown date"}
          </p>

          <div className="mt-4">
            <StatusPill status={evaluation.status} />
          </div>
        </div>

        {/* Employee Info */}
        {employee && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-6">
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
          </div>
        )}

        {/* Evaluation Content */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Evaluation Details
          </h2>

          <p className="text-slate-700 whitespace-pre-line">
            {evaluation.description || "No description provided."}
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}

function StatusPill({ status }) {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";

  if (status === "completed") {
    return (
      <span className={`${base} bg-emerald-50 text-emerald-700`}>
        Completed
      </span>
    );
  }

  if (status === "pending") {
    return (
      <span className={`${base} bg-amber-50 text-amber-700`}>
        Pending
      </span>
    );
  }

  return (
    <span className={`${base} bg-slate-50 text-slate-600`}>
      {status || "Unknown"}
    </span>
  );
}

