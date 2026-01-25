import { useEffect, useState } from "react";
import { getEmployees } from "../api/employeesApi";

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .finally(() => setLoading(false));
  }, []);

  return { employees, loading };
}
