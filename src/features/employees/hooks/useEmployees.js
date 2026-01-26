// src/features/employees/hooks/useEmployees.js
import { useEffect, useState } from "react";

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchEmployees() {
    try {
      const res = await fetch("http://localhost:4000/employees");
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading };
}
