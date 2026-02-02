// src/app/(dashboard)/employer/reference/[id]/page.jsx

import { useParams } from "react-router-dom";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import Card from "/src/components/ui/Card.jsx";

import { useEmployee } from "/src/features/employees/hooks/useEmployee.js";
import { useEvaluations } from "/src/features/evaluations/hooks/useEvaluations.js";
import { useEmployers } from "/src/features/employers/hooks/useEmployers.js";

import { CriteriaStars } from "/src/features/reference/components/CriteriaStars.jsx";
import { validateReferenceToken } from "/src/features/reference/referenceTokensStore.js";

export default function EmployerReferenceReportPage() {
  const { id: employeeId, token } = useParams();

  const { employee, loading: loadingEmployee } = useEmployee(employeeId);
  const { evaluations, loading: loadingEvaluations } = useEvaluations();
  const { employers, loading: loadingEmployers } = useEmployers();

  const isTokenValid = validateReferenceToken(token, employeeId);

  if (!isTokenValid) {
    return (
      <EmployerDashboardLayout>
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Invalid or expired link
          </h1>
          <p className="text-neutral-600">
            This reference link is no longer valid. Ask the candidate to
            generate a new one.
          </p>
        </div>
      </EmployerDashboardLayout>
    );
  }

  if (loadingEmployee || loadingEvaluations || loadingEmployers) {
    return (
      <EmployerDashboardLayout>
        <p className="p-6 text-neutral-500">Loading reference report...</p>
      </EmployerDashboardLayout>
    );
  }

  if (!employee) {
    return (
      <EmployerDashboardLayout>
        <p className="p-6 text-red-600">
          Employee not found or link is invalid.
        </p>
      </EmployerDashboardLayout>
    );
  }

  const employeeEvaluations = evaluations.filter(
    (ev) => ev.employeeId === Number(employeeId)
  );

  const evaluationsWithEmployer = employeeEvaluations.map((ev) => ({
    ...ev,
    employer: employers.find((emp) => emp.id === ev.employerId),
  }));

  return (
    <EmployerDashboardLayout>
      <div className="max-w-3xl mx-auto p-6 space-y-10">

        {/* Header */}
        <header className="space-y-2 border-b pb-4">
          <h1 className="text-4xl font-bold text-neutral-900">
            Reference Report for {employee.fullName}
          </h1>

          <p className="text-neutral-600">
            Based on evaluations provided by previous employers.
          </p>

          <p className="text-xs text-neutral-500">
            Access restricted to registered employers.
          </p>
        </header>

        {/* No evaluations */}
        {evaluationsWithEmployer.length === 0 && (
          <Card className="p-6 text-neutral-600">
            This candidate has no evaluations yet.
          </Card>
        )}

        {/* Evaluations */}
        {evaluationsWithEmployer.map((ev) => (
          <Card
            key={ev.id}
            className="p-6 space-y-4 border border-neutral-200 rounded-2xl shadow-sm"
          >
            {/* Employer + Score */}
            <div className="flex justify-between gap-6">
              <div>
                <p className="font-semibold text-neutral-900">
                  {ev.employer?.companyName || "Unknown company"}
                </p>

                <p className="text-sm text-neutral-600">
                  {ev.employer?.evaluatorName} —{" "}
                  {ev.employer?.evaluatorPosition}
                </p>

                <p className="text-xs text-neutral-500 mt-1">
                  Contact: {ev.employer?.email} · {ev.employer?.phone}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-neutral-900">
                  {ev.score}/100
                </p>

                <p className="text-yellow-500">
                  {"★".repeat(ev.starRating)}
                  {"☆".repeat(5 - ev.starRating)}
                </p>

                <p className="text-xs text-neutral-500 mt-1">
                  {ev.date}
                </p>
              </div>
            </div>

            {/* Criteria */}
            <CriteriaStars evaluation={ev} />

            {/* Comments */}
            {ev.comments && (
              <div>
                <p className="text-sm text-neutral-500 mb-1">
                  General comments:
                </p>
                <p className="text-neutral-800">{ev.comments}</p>
              </div>
            )}

            {/* Reference Contact */}
            {ev.referenceContact && (
              <div className="text-sm">
                <p className="text-neutral-500">Reference contact:</p>
                <p className="font-medium text-neutral-900">
                  {ev.referenceContact}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </EmployerDashboardLayout>
  );
}
