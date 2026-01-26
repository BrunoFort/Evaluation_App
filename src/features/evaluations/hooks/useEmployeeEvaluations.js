// src/features/evaluations/hooks/useEmployeeEvaluations.js
import { useEffect, useState } from "react";

export function useEmployeeEvaluations(employeeId, employerId) {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchEvaluations() {
    try {
      const res = await fetch("http://localhost:4000/evaluations");
      const data = await res.json();

      // Filtra:
      // 1. Avaliações do funcionário
      // 2. Avaliações feitas pelo empregador logado
      const filtered = data.filter(
        (ev) =>
          String(ev.employeeId) === String(employeeId) &&
          String(ev.employerId) === String(employerId)
      );

      setEvaluations(filtered);
    } catch (error) {
      console.error("Error fetching evaluations:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvaluations();
  }, [employeeId, employerId]);

  return { evaluations, loading };
}
