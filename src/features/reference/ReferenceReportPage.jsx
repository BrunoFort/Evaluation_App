// src/features/reference/ReferenceReportPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useEmployee } from "../employees/hooks/useEmployee";
import { useEvaluations } from "../evaluations/hooks/useEvaluations";
import { useEmployers } from "../employers/hooks/useEmployers";
import { CriteriaStars } from "./CriteriaStars";
import { validateReferenceToken } from "./referenceTokensStore";

export default function ReferenceReportPage() {
  const { employeeId, token } = useParams();
  const { employee, loading: loadingEmployee } = useEmployee(employeeId);
  const { evaluations, loading: loadingEvaluations } = useEvaluations();
  const { employers, loading: loadingEmployers } = useEmployers();

  const isTokenValid = validateReferenceToken(token, employeeId);

  if (!isTokenValid) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2">Invalid or expired link</h1>
        <p className="text-gray-600">
          This reference link is not valid anymore. Please ask the candidate to
          generate a new reference link.
        </p>
      </div>
    );
  }

  if (loadingEmployee || loadingEvaluations || loadingEmployers)
    return <div className="p-6">Loading reference report...</div>;

  if (!employee)
    return <div className="p-6">Employee not found or link is invalid.</div>;

  const employeeEvaluations = evaluations.filter(
    (ev) => ev.employeeId === Number(employeeId)
  );

  const evaluationsWithEmployer = employeeEvaluations.map((ev) => ({
    ...ev,
    employer: employers.find((emp) => emp.id === ev.employerId),
  }));

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header do candidato */}
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold">
          Reference report for {employee.fullName}
        </h1>
        <p className="text-gray-600">
          This report is based on evaluations provided by previous employers.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Access to this report is restricted to registered employers.
        </p>
      </header>

      {evaluationsWithEmployer.length === 0 && (
        <p>This candidate has no evaluations yet.</p>
      )}

      {evaluationsWithEmployer.map((ev) => (
        <div
          key={ev.id}
          className="border rounded-lg p-4 bg-white shadow-sm space-y-3"
        >
          {/* Employer info + score geral */}
          <div className="flex justify-between gap-4">
            <div>
              <p className="font-semibold">
                {ev.employer?.companyName || "Unknown company"}
              </p>
              <p className="text-sm text-gray-600">
                {ev.employer?.evaluatorName} —{" "}
                {ev.employer?.evaluatorPosition}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Contact: {ev.employer?.email} · {ev.employer?.phone}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">{ev.score}/100</p>
              <p className="text-yellow-500">
                {"★".repeat(ev.starRating)}
                {"☆".repeat(5 - ev.starRating)}
              </p>
              <p className="text-xs text-gray-500 mt-1">{ev.date}</p>
            </div>
          </div>

          {/* Critérios detalhados */}
          <CriteriaStars evaluation={ev} />

          {/* Comentários gerais */}
          {ev.comments && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-1">General comments:</p>
              <p className="text-gray-800">{ev.comments}</p>
            </div>
          )}

          {/* Contato de referência */}
          {ev.referenceContact && (
            <div className="mt-3 text-sm">
              <p className="text-gray-500">Reference contact provided:</p>
              <p className="font-medium">{ev.referenceContact}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

