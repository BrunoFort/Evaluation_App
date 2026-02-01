// src/features/evaluations/hooks/usePublicEvaluation.js

import { useEffect, useState } from "react";
import { getEvaluations } from "/src/features/evaluations/api/evaluationsApi.js";

export function usePublicEvaluation(token) {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        if (!token) {
          setEvaluation(null);
          return;
        }

        const all = await getEvaluations();
        const found = all.find((ev) => ev.publicToken === token);

        setEvaluation(found || null);

      } catch (err) {
        setError(err.message || "Failed to load evaluation");
        setEvaluation(null);

      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  return { evaluation, loading, error };
}
