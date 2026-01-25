import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DeleteEvaluationDialog } from "./DeleteEvaluationDialog";

export function EvaluationTable({ evaluations, onDelete }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="p-3 text-left">ID</th>
          <th className="p-3 text-left">Employee ID</th>
          <th className="p-3 text-left">Score</th>
          <th className="p-3 text-left">Date</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {evaluations.map((ev) => (
          <tr key={ev.id} className="border-b">
            <td className="p-3">{ev.id}</td>
            <td className="p-3">{ev.employeeId}</td>
            <td className="p-3">{ev.score}</td>
            <td className="p-3">{ev.date}</td>

            <td className="p-3 flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/evaluations/edit/${ev.id}`}>Edit</Link>
              </Button>

              <DeleteEvaluationDialog onConfirm={() => onDelete(ev.id)}>
                <Button variant="destructive">Delete</Button>
              </DeleteEvaluationDialog>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
