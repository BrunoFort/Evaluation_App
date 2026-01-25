import { useNavigate } from "react-router-dom";
import { ProjectForm } from "../components/ProjectForm";
import { useCreateProject } from "../hooks/useCreateProject";
import { toast } from "sonner";

export default function ProjectCreate() {
  const navigate = useNavigate();
  const { create } = useCreateProject();

  async function handleCreate(data) {
    try {
      await create(data);
      toast.success("Project created successfully!");
      navigate("/projects");
    } catch (err) {
      toast.error("Failed to create project");
      console.error(err);
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create Project</h1>

      <ProjectForm
        defaultValues={{
          name: "",
          status: "",
          startDate: "",
          endDate: "",
        }}
        onSubmit={handleCreate}
        isSubmitting={false}
      />
    </div>
  );
}
