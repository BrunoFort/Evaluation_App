import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CompanyLayout from "../../../Layouts/CompanyLayout";

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
      <div className="space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {evaluation.title}
            </h1>
            <p className="text-slate-500 text-sm">
              Created on{" "}
              {new Date(evaluation.createdAt).toLocaleDateString()}
            </p>
          </div>

          <StatusPill status={evaluation.status} />
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
          </div>
        )}

        {/* Evaluation Content */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Evaluation Details
          </h2>

          <div className="space-y-4 text-slate-700">
            {evaluation.description ? (
              <p className="whitespace-pre-line">{evaluation.description}</p>
            ) : (
              <p className="text-slate-500">No description provided.</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
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

