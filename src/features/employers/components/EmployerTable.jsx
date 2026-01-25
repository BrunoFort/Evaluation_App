import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DeleteEmployerDialog } from "./DeleteEmployerDialog";

export function EmployerTable({ employers, onDelete }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="p-3 text-left">ID</th>
          <th className="p-3 text-left">Company Name</th>
          <th className="p-3 text-left">Business Number</th>
          <th className="p-3 text-left">Evaluator Name</th>
          <th className="p-3 text-left">Evaluator Position</th>
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Phone</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {employers.map((emp) => (
          <tr key={emp.id} className="border-b">
            <td className="p-3">{emp.id}</td>
            <td className="p-3">{emp.companyName}</td>
            <td className="p-3">{emp.businessNumber}</td>
            <td className="p-3">{emp.evaluatorName}</td>
            <td className="p-3">{emp.evaluatorPosition}</td>
            <td className="p-3">{emp.email}</td>
            <td className="p-3">{emp.phone}</td>

            <td className="p-3 flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/employers/edit/${emp.id}`}>Edit</Link>
              </Button>

              <DeleteEmployerDialog onConfirm={() => onDelete(emp.id)}>
                <Button variant="destructive">Delete</Button>
              </DeleteEmployerDialog>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
