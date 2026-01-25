// src/features/employees/hooks/useEmployee.js
import { useState, useEffect } from "react";

const MOCK_EMPLOYEES = [
  {
    id: 1,
    fullName: "Bruno Silva",
    email: "bruno@example.com",
    phone: "(613) 555-1234",
    position: "Software Developer",
    startDate: "2022-05-10",
    endDate: null,
  },
  {
    id: 2,
    fullName: "Maria Santos",
    email: "maria@example.com",
    phone: "(416) 555-9876",
    position: "Project Manager",
    startDate: "2021-03-15",
    endDate: "2024-01-01",
  },
];

export function useEmployee(employeeId) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const found = MOCK_EMPLOYEES.find(
        (emp) => String(emp.id) === String(employeeId)
      );
      setEmployee(found || null);
      setLoading(false);
    }, 300);
  }, [employeeId]);

  return { employee, loading };
}
