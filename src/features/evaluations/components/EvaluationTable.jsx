// src/features/evaluations/components/EvaluationTable.jsx

import Button from "/src/components/ui/Button.jsx";
import { DeleteEvaluationDialog } from "/src/features/evaluations/components/DeleteEvaluationDialog.jsx";

export function EvaluationTable({ evaluations, onView, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <table className="min-w-full text-left">
        <thead className="bg-neutral-50 text-neutral-700">
          <tr>
            <th className="p-3 text-sm font-semibold">Employee</th>
            <th className="p-3 text-sm font-semibold">Score</th>
            <th className="p-3 text-sm font-semibold">Rating</th>
            <th className="p-3 text-sm font-semibold">Date</th>
            <th className="p-3 text-right text-sm font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {evaluations.map((evaluation) => (
            <tr
              key={evaluation.id}
              className="border-t border-neutral-100 hover:bg-neutral-50 transition"
            >
              <td className="p-3 text-neutral-900">
                {evaluation.employeeName || evaluation.employeeId}
              </td>

              <td className="p-3 text-neutral-700">{evaluation.score}</td>

              <td className="p-3 text-neutral-700">
                {evaluation.starRating} ★
              </td>

              <td className="p-3 text-neutral-700">
                {evaluation.date || evaluation.createdAt}
              </td>

              <td className="p-3 flex justify-end gap-2">

                {/* View */}
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => onView(evaluation.id)}
                >
                  View
                </Button>

                {/* Delete */}
                <DeleteEvaluationDialog
                  onConfirm={() => onDelete(evaluation.id)}
                >
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Delete
                  </Button>
                </DeleteEvaluationDialog>

              </td>
            </tr>
          ))}

          {evaluations.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="p-6 text-center text-neutral-500"
              >
                No evaluations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
