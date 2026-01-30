import { useMemo } from "react";
import { useEvaluations } from "@/features/evaluations/hooks/useEvaluations";
import { useEmployeeAuth } from "@/features/auth/employee/useEmployeeAuth";

export default function EmployeeProfilePage() {
  const { employee } = useEmployeeAuth(); // employee logado
  const { evaluations, loading } = useEvaluations();

  if (!employee || employee.role !== "employee") {
    return <p>Unauthorized.</p>;
  }

  if (loading) return <p>Loading...</p>;

  const employeeEvaluations = evaluations.filter(
    (ev) => ev.employeeId === employee.employeeId
  );

  const { avgScore, avgStars } = useMemo(() => {
    if (employeeEvaluations.length === 0) {
      return { avgScore: "N/A", avgStars: "N/A" };
    }

    const score =
      employeeEvaluations.reduce((sum, ev) => sum + ev.score, 0) /
      employeeEvaluations.length;

    const stars =
      employeeEvaluations.reduce((sum, ev) => sum + ev.starRating, 0) /
      employeeEvaluations.length;

    return {
      avgScore: score.toFixed(1),
      avgStars: stars.toFixed(1),
    };
  }, [employeeEvaluations]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{employee.fullName}</h1>
        <p className="text-gray-600">{employee.email}</p>
      </div>

      <div className="flex gap-6">
        <div>
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-xl font-semibold">{avgScore}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Average Rating</p>
          <p className="text-xl font-semibold">
            {avgStars === "N/A"
              ? "N/A"
              : "★".repeat(Math.round(Number(avgStars)))}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        This is a consolidated view of your professional evaluations. Detailed
        reports are only available to registered employers.
      </p>
    </div>
  );
}
