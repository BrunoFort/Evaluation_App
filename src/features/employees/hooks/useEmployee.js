import { useEffect, useState } from "react";
import { getEmployeeById } from "/src/features/employees/api/employeesApi";

export function useEmployee(id) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchEmployee() {
    setLoading(true);

    try {
      const data = await getEmployeeById(id);
      setEmployee(data);
    } catch (err) {
      console.error("Failed to fetch employee:", err);
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;
    fetchEmployee();
  }, [id]);

  return { employee, loading };
}

