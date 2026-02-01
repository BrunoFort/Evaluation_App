// src/features/evaluations/hooks/useUpdateEvaluation.js

import { useState } from "react";
import { updateEvaluation } from "/src/features/evaluations/api/evaluationsApi.js";

export function useUpdateEvaluation() {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  async function update(id, data) {
    try {
      setUpdating(true);
      setError(null);

      const result = await updateEvaluation(id, data);
      return result;

    } catch (err) {
      setError(err.message || "Failed to update evaluation");
      throw err;

    } finally {
      setUpdating(false);
    }
  }

  return { update, updating, error };
}
