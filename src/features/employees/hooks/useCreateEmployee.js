import { createEmployee } from "/src/features/employees/api/employeesApi";

export function useCreateEmployee() {
  async function create(data) {
    try {
      return await createEmployee(data);
    } catch (err) {
      console.error("Failed to create employee:", err);
      throw err;
    }
  }

  return { create };
}
