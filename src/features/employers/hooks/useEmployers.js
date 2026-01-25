// src/features/employers/hooks/useEmployers.js
import { useState, useEffect } from "react";

const MOCK_EMPLOYERS = [
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
];

export function useEmployers() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de fetch
    setTimeout(() => {
      setEmployers(MOCK_EMPLOYERS);
      setLoading(false);
    }, 300);
  }, []);

  return { employers, loading };
}
