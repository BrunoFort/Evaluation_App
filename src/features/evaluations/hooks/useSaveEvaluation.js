// src/features/evaluations/hooks/useSaveEvaluation.js

import { useState } from "react";
import { createEvaluation } from "/src/features/evaluations/api/evaluationsApi.js";

export function useSaveEvaluation() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function saveEvaluation(data) {
    try {
      setSaving(true);
      setError(null);

      const result = await createEvaluation(data);
      return result;

    } catch (err) {
      setError(err.message || "Failed to save evaluation");
      throw err;

    } finally {
      setSaving(false);
    }
  }

  return { saveEvaluation, saving, error };
}
