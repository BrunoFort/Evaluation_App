// src/features/evaluations/hooks/usePublicEvaluation.js
import { useEffect, useState } from "react";

export function usePublicEvaluation(token) {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchEvaluation() {
    try {
      const res = await fetch("http://localhost:4000/evaluations");
      const data = await res.json();

      const found = data.find((ev) => ev.publicToken === token);

      setEvaluation(found || null);
    } catch (error) {
      console.error("Error fetching public evaluation:", error);
      setEvaluation(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvaluation();
  }, [token]);

  return { evaluation, loading };
}
