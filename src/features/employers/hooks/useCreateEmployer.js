import { createEmployer } from "../api/employersApi";

export function useCreateEmployer() {
  async function create(data) {
    return createEmployer(data);
  }
  return { create };
}
