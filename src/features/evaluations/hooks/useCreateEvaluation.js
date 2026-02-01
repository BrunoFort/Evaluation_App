// src/features/evaluations/hooks/useCreateEvaluation.js

import { useState } from "react";
import { createEvaluation } from "/src/features/evaluations/api/evaluationsApi.js";

export function useCreateEvaluation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function create(data) {
    try {
      setLoading(true);
      setError(null);

      const result = await createEvaluation(data);
      return result;

    } catch (err) {
      setError(err.message || "Failed to create evaluation");
      throw err;

    } finally {
      setLoading(false);
    }
  }

  return { create, loading, error };
}
