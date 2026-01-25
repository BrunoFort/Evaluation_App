import { deleteEvaluation } from "../api/evaluationsApi";

export function useDeleteEvaluation() {
  async function remove(id) {
    return deleteEvaluation(id);
  }
  return { remove };
}
