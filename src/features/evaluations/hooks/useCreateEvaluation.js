import { createEvaluation } from "../api/evaluationsApi";

export function useCreateEvaluation() {
  async function create(data) {
    return createEvaluation(data);
  }
  return { create };
}
