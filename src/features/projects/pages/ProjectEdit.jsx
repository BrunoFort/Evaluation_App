import { useParams, useNavigate } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { ProjectForm } from "../components/ProjectForm";
import { toast } from "sonner";

export default function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { project, loading } = useProject(id);
  const { update } = useUpdateProject();

  async function handleUpdate(data) {
    try {
      await update(id, data);
      toast.success("Project updated successfully!");
      navigate("/projects");
    } catch (err) {
      toast.error("Failed to update project");
      console.error(err);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

      <ProjectForm
        defaultValues={{
          name: project.name,
          status: project.status,
          startDate: project.startDate,
          endDate: project.endDate || "",
        }}
        onSubmit={handleUpdate}
        isSubmitting={false}
      />
    </div>
  );
}
