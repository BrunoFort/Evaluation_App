import { useMemo } from "react";
import { useEvaluations } from "/src/features/evaluations/hooks/useEvaluations";
import { useEmployeeAuth } from "/src/features/auth/employee/useEmployeeAuth";

export default function EmployeeProfilePage() {
  const { employee } = useEmployeeAuth();
  const { evaluations, loading } = useEvaluations();

  if (!employee || employee.role !== "employee") {
    return <p className="p-6 text-neutral-600">Unauthorized.</p>;
  }

  if (loading) {
    return <p className="p-6 text-neutral-600">Loading...</p>;
  }

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

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">
          {employee.fullName}
        </h1>
        <p className="text-neutral-600">{employee.email}</p>
      </div>

      {/* Stats */}
      <div className="flex gap-6">
        <div>
          <p className="text-sm text-neutral-500">Average Score</p>
          <p className="text-xl font-semibold text-neutral-900">{avgScore}</p>
        </div>

        <div>
          <p className="text-sm text-neutral-500">Average Rating</p>
          <p className="text-xl font-semibold text-neutral-900">
            {avgStars === "N/A"
              ? "N/A"
              : "★".repeat(Math.round(Number(avgStars)))}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-600">
        This is a consolidated view of your professional evaluations. Detailed
        reports are only available to registered employers.
      </p>
    </div>
  );
}
