import Button from "/src/components/ui/Button.jsx";;
import { Link } from "react-router-dom";
import { DeleteProjectDialog } from "./DeleteProjectDialog";

export function ProjectTable({ projects, onDelete }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="p-3 text-left">ID</th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Start Date</th>
          <th className="p-3 text-left">End Date</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {projects.map((proj) => (
          <tr key={proj.id} className="border-b">
            <td className="p-3">{proj.id}</td>
            <td className="p-3">{proj.name}</td>
            <td className="p-3">{proj.status}</td>
            <td className="p-3">{proj.startDate}</td>
            <td className="p-3">{proj.endDate}</td>

            <td className="p-3 flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/projects/edit/${proj.id}`}>Edit</Link>
              </Button>

              <DeleteProjectDialog onConfirm={() => onDelete(proj.id)}>
                <Button variant="destructive">Delete</Button>
              </DeleteProjectDialog>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
