import { useEffect, useState } from "react";
import { getEmployerById } from "../api/employersApi";

export function useEmployer(id) {
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployerById(id)
      .then(setEmployer)
      .finally(() => setLoading(false));
  }, [id]);

  return { employer, loading };
}
