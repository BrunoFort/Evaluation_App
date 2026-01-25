import { updateEmployee } from "../api/employeesApi";

export function useUpdateEmployee() {
  async function update(id, data) {
    return updateEmployee(id, data);
  }
  return { update };
}
