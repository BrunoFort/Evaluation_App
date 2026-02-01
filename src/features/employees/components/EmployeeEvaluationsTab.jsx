import { Link } from "react-router-dom";
import { FileText, ArrowRight, Clock, CheckCircle } from "lucide-react";

export default function EmployeeEvaluationsTab({ evaluations, employeeId }) {
  return (
    <div className="space-y-6">

      {/* New Evaluation Button */}
      <div className="flex justify-end">
        <Link
          to={`/evaluations/new?employeeId=${employeeId}`}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          New Evaluation
        </Link>
      </div>

      {/* Empty State */}
      {evaluations.length === 0 && (
        <div className="text-center py-10 text-neutral-500 border border-neutral-200 rounded-lg bg-white">
          No evaluations found for this employee.
        </div>
      )}

      {/* Evaluation List */}
      <div className="space-y-4">
        {evaluations.map((ev) => (
          <div
            key={ev.id}
            className="border border-neutral-200 bg-white rounded-lg p-4 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {/* Icon Avatar */}
              <div className="w-12 h-12 bg-neutral-100 text-neutral-600 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>

              <div>
                <p className="font-semibold text-neutral-900">
                  Evaluation #{ev.id}
                </p>

                <p className="text-sm text-neutral-600">
                  {new Date(ev.createdAt).toLocaleDateString()}
                </p>

                <p className="text-sm text-neutral-700 flex items-center gap-1 mt-1">
                  {ev.status === "completed" && (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Completed — Score: {ev.score ?? "N/A"}
                    </>
                  )}

                  {ev.status === "pending" && (
                    <>
                      <Clock className="w-4 h-4 text-yellow-600" />
                      Pending
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {ev.status === "pending" && (
                <Link
                  to={`/evaluations/${ev.id}`}
                  className="px-3 py-2 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Continue
                </Link>
              )}

              <Link
                to={`/evaluations/${ev.id}`}
                className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium transition"
              >
                View
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
