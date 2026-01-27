import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EmployeeLayout from "../Layouts/EmployeeLayout";

export default function EmployeeEvaluationDetails() {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/evaluations/${id}`)
      .then((res) => res.json())
      .then(setEvaluation);
  }, [id]);

  if (!evaluation) {
    return (
      <EmployeeLayout>
        <p className="text-slate-500">Loading evaluation...</p>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <div className="space-y-10">

        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {evaluation.title}
            </h1>
            <p className="text-slate-500 text-sm">
              Created on{" "}
              {evaluation.createdAt
                ? new Date(evaluation.createdAt).toLocaleDateString()
                : "Unknown date"}
            </p>
          </div>

          <StatusPill status={evaluation.status} />
        </div>

        {/* Content */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Evaluation Details
          </h2>

          <p className="text-slate-700 whitespace-pre-line">
            {evaluation.description || "No description provided."}
          </p>
        </div>

        {/* Back button */}
        <div className="flex justify-end">
          import Button from "../components/ui/Button.jsx";

          <Button as={Link} to="/employee" variant="outline">
            Back
          </Button>


        </div>
      </div>
    </EmployeeLayout>
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

