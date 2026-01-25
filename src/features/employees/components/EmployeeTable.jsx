import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DeleteEmployeeDialog } from "./DeleteEmployeeDialog";

export function EmployeeTable({ employees, onDelete }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="p-3 text-left">ID</th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Role</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id} className="border-b">
            <td className="p-3">{emp.id}</td>
            <td className="p-3">{emp.name}</td>
            <td className="p-3">{emp.role}</td>

            <td className="p-3 flex gap-2">
              {/* EDIT BUTTON */}
              <Button variant="outline" asChild>
                <Link to={`/employees/edit/${emp.id}`}>Edit</Link>
              </Button>

              {/* DELETE WITH MODAL */}
              <DeleteEmployeeDialog onConfirm={() => onDelete(emp.id)}>
                <Button variant="destructive">Delete</Button>
              </DeleteEmployeeDialog>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
