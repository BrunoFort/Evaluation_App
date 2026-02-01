import { createContext, useContext, useEffect, useMemo, useState } from "react";

const EmployeeAuthContext = createContext(null);

export function EmployeeAuthProvider({ children }) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("employee");
    if (stored) {
      try {
        setEmployee(JSON.parse(stored));
      } catch {
        localStorage.removeItem("employee");
      }
    }

    setLoading(false);
  }, []);

  function login(data) {
    if (typeof window !== "undefined") {
      localStorage.setItem("employee", JSON.stringify(data));
    }
    setEmployee(data);
  }

  function logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("employee");
    }
    setEmployee(null);
  }

  const value = useMemo(
    () => ({
      employee,
      isAuthenticated: !!employee,
      loading,
      login,
      logout,
    }),
    [employee, loading]
  );

  return (
    <EmployeeAuthContext.Provider value={value}>
      {children}
    </EmployeeAuthContext.Provider>
  );
}

export function useEmployeeAuth() {
  return useContext(EmployeeAuthContext);
}
