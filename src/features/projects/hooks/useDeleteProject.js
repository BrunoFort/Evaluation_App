import { deleteProject } from "../api/projectsApi";

export function useDeleteProject() {
  async function remove(id) {
    return deleteProject(id);
  }
  return { remove };
}
