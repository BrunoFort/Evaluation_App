// src/features/evaluations/hooks/useDeleteEvaluation.js

import { useState } from "react";
import { deleteEvaluation } from "/src/features/evaluations/api/evaluationsApi.js";

export function useDeleteEvaluation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function remove(id) {
    try {
      setLoading(true);
      setError(null);

      const result = await deleteEvaluation(id);
      return result;

    } catch (err) {
      setError(err.message || "Failed to delete evaluation");
      throw err;

    } finally {
      setLoading(false);
    }
  }

  return { remove, loading, error };
}
