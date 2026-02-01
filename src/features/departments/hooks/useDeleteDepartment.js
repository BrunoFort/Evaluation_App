import { deleteDepartment } from "../api/departmentsApi";

export function useDeleteDepartment() {
  async function remove(id) {
    try {
      return await deleteDepartment(id);
    } catch (err) {
      console.error("Failed to delete department:", err);
      throw err;
    }
  }

  return { remove };
}
