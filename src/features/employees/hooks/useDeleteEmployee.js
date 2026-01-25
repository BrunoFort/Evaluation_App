import { deleteEmployee } from "../api/employeesApi";

export function useDeleteEmployee() {
  async function remove(id) {
    return deleteEmployee(id);
  }
  return { remove };
}
