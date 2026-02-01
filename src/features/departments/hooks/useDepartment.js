import { useEffect, useState } from "react";
import { getDepartmentById } from "../api/departmentsApi";

export function useDepartment(id) {
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);

      try {
        const data = await getDepartmentById(id);
        if (active) setDepartment(data);
      } catch (err) {
        console.error("Failed to load department:", err);
        if (active) setDepartment(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [id]);

  return { department, loading };
}
