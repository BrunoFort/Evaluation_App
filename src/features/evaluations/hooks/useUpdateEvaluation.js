import { updateEvaluation } from "../api/evaluationsApi";

export function useUpdateEvaluation() {
  async function update(id, data) {
    return updateEvaluation(id, data);
  }
  return { update };
}
