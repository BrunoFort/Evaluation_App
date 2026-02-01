// src/app/(dashboard)/employer/evaluations/page.jsx

import { Link } from "react-router-dom";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import { useEvaluations } from "/src/features/evaluations/hooks/useEvaluations.js";

import Card from "/src/components/ui/Card.jsx";
import Button from "/src/components/ui/Button.jsx";
import StatusPill from "/src/components/ui/StatusPill.jsx";

export default function EmployerEvaluationsListPage() {
  const { evaluations, loading, error } = useEvaluations();

  return (
    <EmployerDashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900">
              Evaluations
            </h1>
            <p className="text-neutral-600 mt-1">
              Manage all evaluations created by your company
            </p>
          </div>

          <Button as={Link} to="/employer/evaluations/create">
            New Evaluation
          </Button>
        </div>

        {/* Content */}
        <Card className="p-0 border border-neutral-200 rounded-2xl shadow-sm">
          {loading && (
            <p className="text-neutral-500 p-6">Loading evaluations...</p>
          )}

          {error && (
            <p className="text-red-600 p-6">Failed to load evaluations.</p>
          )}

          {!loading && evaluations.length === 0 && (
            <p className="text-neutral-500 p-6 text-center">
              No evaluations found.
            </p>
          )}

          {!loading && evaluations.length > 0 && (
            <div className="divide-y divide-neutral-200">
              {evaluations.map((ev) => (
                <Link
                  key={ev.id}
                  to={`/employer/evaluations/${ev.id}`}
                  className="flex items-center justify-between py-4 px-4 hover:bg-neutral-50 transition"
                >
                  <div>
                    <p className="font-medium text-neutral-900">{ev.title}</p>
                    <p className="text-sm text-neutral-500">
                      {ev.createdAt
                        ? new Date(ev.createdAt).toLocaleDateString()
                        : "Unknown date"}
                    </p>
                  </div>

                  <StatusPill status={ev.status || "pending"} />
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </EmployerDashboardLayout>
  );
}
