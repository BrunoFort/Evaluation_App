// src/features/employees/hooks/useEmployee.js
import { useEffect, useState } from "react";

export function useEmployee(id) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchEmployee() {
    try {
      const res = await fetch(`http://localhost:4000/employees/${id}`);
      if (!res.ok) throw new Error("Employee not found");

      const data = await res.json();
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee:", error);
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  return { employee, loading };
}
