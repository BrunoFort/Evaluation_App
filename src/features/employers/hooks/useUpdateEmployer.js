import { updateEmployer } from "../api/employersApi";

export function useUpdateEmployer() {
  async function update(id, data) {
    return updateEmployer(id, data);
  }
  return { update };
}
