import { updateDepartment } from "../api/departmentsApi";

export function useUpdateDepartment() {
  async function update(id, data) {
    try {
      return await updateDepartment(id, data);
    } catch (err) {
      console.error("Failed to update department:", err);
      throw err;
    }
  }

  return { update };
}
