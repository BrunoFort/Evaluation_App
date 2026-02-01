// src/features/evaluations/hooks/useEmployeeEvaluations.js

import { useEffect, useState } from "react";
import { getEvaluations } from "/src/features/evaluations/api/evaluationsApi.js";

export function useEmployeeEvaluations(employeeId, employerId) {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        // Evita chamadas desnecessárias
        if (!employeeId || !employerId) {
          setEvaluations([]);
          return;
        }

        const all = await getEvaluations();

        const filtered = all.filter(
          (ev) =>
            String(ev.employeeId) === String(employeeId) &&
            String(ev.employerId) === String(employerId)
        );

        setEvaluations(filtered);

      } catch (err) {
        setError(err.message || "Failed to load evaluations");

      } finally {
        setLoading(false);
      }
    }

    load();
  }, [employeeId, employerId]);

  return { evaluations, loading, error };
}
