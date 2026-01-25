import { createProject } from "../api/projectsApi";

export function useCreateProject() {
  async function create(data) {
    return createProject(data);
  }
  return { create };
}
