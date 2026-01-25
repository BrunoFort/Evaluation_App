// src/features/evaluations/hooks/useSaveEvaluation.js
import { useState } from "react";

export function useSaveEvaluation() {
  const [saving, setSaving] = useState(false);

  async function saveEvaluation(data) {
    setSaving(true);

    // Em produção: POST /evaluations
    console.log("Saving evaluation (mock):", data);

    await new Promise((resolve) => setTimeout(resolve, 600));

    setSaving(false);
    return { success: true };
  }

  return { saveEvaluation, saving };
}
