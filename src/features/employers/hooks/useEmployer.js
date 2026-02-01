// src/features/employers/hooks/useEmployer.js

import { useEffect, useState } from "react";
import { getEmployerById } from "/src/features/employers/api/employersApi.js";

export function useEmployer(id) {
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getEmployerById(id);
        setEmployer(data);

      } catch (err) {
        setError(err.message || "Failed to load employer");

      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  return { employer, loading, error };
}
