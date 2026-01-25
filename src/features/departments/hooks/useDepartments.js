import { useEffect, useState } from "react";
import { getDepartments } from "../api/departmentsApi";

export function useDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDepartments()
      .then(setDepartments)
      .finally(() => setLoading(false));
  }, []);

  return { departments, loading };
}
