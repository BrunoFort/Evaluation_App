// src/features/evaluations/hooks/useEvaluations.js

import { useState, useEffect } from "react";
import { getEvaluations } from "/src/features/evaluations/api/evaluationsApi.js";

export function useEvaluations(filters = {}) {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getEvaluations(filters);
        setEvaluations(data);

      } catch (err) {
        setError(err.message || "Failed to load evaluations");

      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { evaluations, loading, error };
}
