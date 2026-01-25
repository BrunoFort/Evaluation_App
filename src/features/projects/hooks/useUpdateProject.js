import { updateProject } from "../api/projectsApi";

export function useUpdateProject() {
  async function update(id, data) {
    return updateProject(id, data);
  }
  return { update };
}
