import Button from "/src/components/ui/Button.jsx";
import { Link } from "react-router-dom";
import { DeleteDepartmentDialog } from "./DeleteDepartmentDialog";

export function DepartmentTable({ departments, onDelete }) {
  return (
    <table className="w-full border-collapse text-neutral-800">
      <thead>
        <tr className="border-b">
          <th className="p-3 text-left font-medium">ID</th>
          <th className="p-3 text-left font-medium">Name</th>
          <th className="p-3 text-left font-medium">Actions</th>
        </tr>
      </thead>

      <tbody>
        {departments.map((dep) => (
          <tr key={dep.id} className="border-b hover:bg-neutral-50">
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

