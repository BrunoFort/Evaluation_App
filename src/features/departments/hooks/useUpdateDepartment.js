import { updateDepartment } from "../api/departmentsApi";

export function useUpdateDepartment() {
  async function update(id, data) {
    return updateDepartment(id, data);
  }
  return { update };
}
