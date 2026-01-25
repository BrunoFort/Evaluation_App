import { deleteEmployer } from "../api/employersApi";

export function useDeleteEmployer() {
  async function remove(id) {
    return deleteEmployer(id);
  }
  return { remove };
}
