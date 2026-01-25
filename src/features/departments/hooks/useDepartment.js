import { useEffect, useState } from "react";
import { getDepartmentById } from "../api/departmentsApi";

export function useDepartment(id) {
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDepartmentById(id)
      .then(setDepartment)
      .finally(() => setLoading(false));
  }, [id]);

  return { department, loading };
}
