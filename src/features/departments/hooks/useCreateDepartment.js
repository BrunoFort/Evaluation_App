import { createDepartment } from "../api/departmentsApi";

export function useCreateDepartment() {
  async function create(data) {
    try {
      return await createDepartment(data);
    } catch (err) {
      console.error("Failed to create department:", err);
      throw err;
    }
  }

  return { create };
}
