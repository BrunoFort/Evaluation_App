import { useParams } from "react-router-dom";
import { useEmployee } from "@/features/employees/hooks/useEmployee";
import { useEvaluations } from "@/features/evaluations/hooks/useEvaluations";
import { useEmployers } from "@/features/employers/hooks/useEmployers";
// aqui você pode depois validar o token no backend; por enquanto, só estrutura

export default function ReferenceReportPage() {
  const { employeeId, token } = useParams();
  const { employee, loading: loadingEmployee } = useEmployee(employeeId);
  const { evaluations, loading: loadingEvaluations } = useEvaluations();
  const { employers, loading: loadingEmployers } = useEmployers();

  if (loadingEmployee || loadingEvaluations || loadingEmployers)
    return <p>Loading...</p>;

  if (!employee) return <p>Employee not found.</p>;

  const employeeEvaluations = evaluations.filter(
    (ev) => ev.employeeId === Number(employeeId)
  );

  const evaluationsWithEmployer = employeeEvaluations.map((ev) => ({
    ...ev,
    employer: employers.find((emp) => emp.id === ev.employerId),
  }));

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold">
          Reference report for {employee.fullName}
        </h1>
        <p className="text-gray-600">
          This report is based on evaluations provided by previous employers.
        </p>
      </header>

      {evaluationsWithEmployer.map((ev) => (
        <div key={ev.id} className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">{ev.employer.companyName}</p>
              <p className="text-sm text-gray-600">
                {ev.employer.evaluatorName} — {ev.employer.evaluatorPosition}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Contact: {ev.employer.email} · {ev.employer.phone}
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

          {ev.comments && (
            <p className="mt-3 text-gray-800">{ev.comments}</p>
          )}

          <div className="mt-3 text-sm">
            <p className="text-gray-500">Reference contact provided:</p>
            <p className="font-medium">{ev.referenceContact}</p>
          </div>
        </div>
      ))}

      {evaluationsWithEmployer.length === 0 && (
        <p>This candidate has no evaluations yet.</p>
      )}
    </div>
  );
}
