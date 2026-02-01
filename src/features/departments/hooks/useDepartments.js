import { useEffect, useState } from "react";
import { getDepartments } from "../api/departmentsApi";

export function useDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);

      try {
        const data = await getDepartments();
        if (active) setDepartments(data);
      } catch (err) {
        console.error("Failed to load departments:", err);
        if (active) setDepartments([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  return { departments, loading };
}
