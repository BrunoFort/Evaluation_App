import { createEmployee } from "../api/employeesApi";

export function useCreateEmployee() {
  async function create(data) {
    return createEmployee(data);
  }
  return { create };
}
