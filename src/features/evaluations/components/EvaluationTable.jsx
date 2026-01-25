// src/features/evaluations/components/EvaluationTable.jsx
import React from "react";
import { Button } from "../../../components/ui/button";

export function EvaluationTable({ evaluations, onView, onDelete }) {
  return (
    <div className="overflow-x-auto rounded border bg-white shadow">
      <table className="min-w-full text-left">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="p-3">Employee</th>
            <th className="p-3">Score</th>
            <th className="p-3">Rating</th>
            <th className="p-3">Date</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {evaluations.map((evaluation) => (
            <tr
              key={evaluation.id}
              className="border-t hover:bg-slate-50 transition"
            >
              <td className="p-3">{evaluation.employeeName || evaluation.employeeId}</td>
              <td className="p-3">{evaluation.score}</td>
              <td className="p-3">{evaluation.starRating} ★</td>
              <td className="p-3">{evaluation.date}</td>

              <td className="p-3 flex justify-end gap-2">
                {/* View */}
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => onView(evaluation.id)}
                >
                  View
                </Button>

                {/* Delete */}
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this evaluation?")) {
                      onDelete(evaluation.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}

          {evaluations.length === 0 && (
            <tr>
              <td colSpan="5" className="p-6 text-center text-slate-500">
                No evaluations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
