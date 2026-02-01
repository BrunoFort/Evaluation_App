// src/features/employers/hooks/useEmployers.js

import { useState, useEffect } from "react";
import { getEmployers } from "/src/features/employers/api/employersApi.js";

export function useEmployers() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        // Quando integrar com API real, basta remover o mock:
        const data = await getEmployers();
        setEmployers(data);

      } catch (err) {
        setError(err.message || "Failed to load employers");

        // Fallback temporário (mock)
        setEmployers([
          {
            id: 1,
            companyName: "TechNova Solutions",
            evaluatorName: "John Smith",
            evaluatorPosition: "HR Manager",
            email: "john.smith@technova.com",
            phone: "(613) 555-1111",
          },
          {
            id: 2,
            companyName: "Maple Leaf Engineering",
            evaluatorName: "Sarah Lee",
            evaluatorPosition: "Engineering Lead",
            email: "sarah.lee@mapleleaf.com",
            phone: "(416) 555-2222",
          },
        ]);

      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { employers, loading, error };
}
