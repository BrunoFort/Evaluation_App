import { deleteDepartment } from "../api/departmentsApi";

export function useDeleteDepartment() {
  async function remove(id) {
    return deleteDepartment(id);
  }
  return { remove };
}
