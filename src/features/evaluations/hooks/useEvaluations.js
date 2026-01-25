// src/features/evaluations/hooks/useEvaluations.js
import { useState, useEffect } from "react";
import { getEvaluations } from "../evaluationsStore";

export function useEvaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula fetch
    setTimeout(() => {
      setEvaluations(getEvaluations());
      setLoading(false);
    }, 200);
  }, []);

  return { evaluations, loading };
}

