import { useProjects } from "../hooks/useProjects";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { ProjectTable } from "../components/ProjectTable";
import Button from "/src/components/ui/Button.jsx";;
import { Link } from "react-router-dom";

export default function ProjectsList() {
  const { projects, loading } = useProjects();
  const { remove } = useDeleteProject();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>

        <Button asChild>
          <Link to="/projects/create">New Project</Link>
        </Button>
      </div>

      <ProjectTable projects={projects} onDelete={remove} />
    </div>
  );
}
