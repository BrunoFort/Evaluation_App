// src/features/evaluations/hooks/useSaveEvaluation.js
import { useState } from "react";
import { addEvaluation } from "../evaluationsStore";

export function useSaveEvaluation() {
  const [saving, setSaving] = useState(false);

  async function saveEvaluation(data) {
    setSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    addEvaluation(data);

    setSaving(false);
    return { success: true };
  }

  return { saveEvaluation, saving };
}
