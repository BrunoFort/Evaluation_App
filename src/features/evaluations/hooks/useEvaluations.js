import { useEffect, useState } from "react";
import { getEvaluations } from "../api/evaluationsApi";

export function useEvaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvaluations()
      .then(setEvaluations)
      .finally(() => setLoading(false));
  }, []);

  return { evaluations, loading };
}
