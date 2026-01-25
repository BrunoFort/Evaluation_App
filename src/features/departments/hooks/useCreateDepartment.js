import { createDepartment } from "../api/departmentsApi";

export function useCreateDepartment() {
  async function create(data) {
    return createDepartment(data);
  }
  return { create };
}
