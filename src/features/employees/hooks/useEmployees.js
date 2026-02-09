import { useEffect, useState } from "react";
import { getEmployees } from "/src/features/employees/api/employeesApi";

export function useEmployees(employerId) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchEmployees() {
    setLoading(true);

    try {
      const data = await getEmployees({ employerId });
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, [employerId]);

  return { employees, loading };
}
