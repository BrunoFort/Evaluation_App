import { deleteEmployee } from "/src/features/employees/api/employeesApi";

export function useDeleteEmployee() {
  async function remove(id) {
    try {
      return await deleteEmployee(id);
    } catch (err) {
      console.error("Failed to delete employee:", err);
      throw err;
    }
  }

  return { remove };
}
