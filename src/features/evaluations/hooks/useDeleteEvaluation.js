// src/features/evaluations/hooks/useDeleteEvaluation.js
import { useState } from "react";
import { deleteEvaluation } from "../evaluationsStore";

export function useDeleteEvaluation() {
  const [loading, setLoading] = useState(false);

  async function remove(id) {
    setLoading(true);

    // Simula um pequeno delay para UX consistente
    await new Promise((resolve) => setTimeout(resolve, 300));

    deleteEvaluation(id);

    setLoading(false);
    return { success: true };
  }

  return { remove, loading };
}
