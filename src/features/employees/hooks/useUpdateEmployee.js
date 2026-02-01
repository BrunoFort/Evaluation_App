import { updateEmployee } from "/src/features/employees/api/employeesApi";

export function useUpdateEmployee() {
  async function update(id, data) {
    try {
      return await updateEmployee(id, data);
    } catch (err) {
      console.error("Failed to update employee:", err);
      throw err;
    }
  }

  return { update };
}
