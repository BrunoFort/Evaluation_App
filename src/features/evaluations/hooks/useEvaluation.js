import { useEffect, useState } from "react";
import { getEvaluationById } from "/src/features/evaluations/api/evaluationsApi.js";

export function useEvaluation(id) {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!id) {
        setEvaluation(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await getEvaluationById(id);
        setEvaluation(data);
      } catch (err) {
        setError(err.message || "Failed to load evaluation");
        setEvaluation(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return { evaluation, loading, error };
}
