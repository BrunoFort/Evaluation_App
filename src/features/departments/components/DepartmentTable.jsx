import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DeleteDepartmentDialog } from "./DeleteDepartmentDialog";

export function DepartmentTable({ departments, onDelete }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="p-3 text-left">ID</th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {departments.map((dep) => (
          <tr key={dep.id} className="border-b">
            <td className="p-3">{dep.id}</td>
            <td className="p-3">{dep.name}</td>

            <td className="p-3 flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/departments/edit/${dep.id}`}>Edit</Link>
              </Button>

              <DeleteDepartmentDialog onConfirm={() => onDelete(dep.id)}>
                <Button variant="destructive">Delete</Button>
              </DeleteDepartmentDialog>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
