import { createContext, useContext, useEffect, useState } from "react";

const EmployeeAuthContext = createContext(null);

export function EmployeeAuthProvider({ children }) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("employee");
    if (stored) {
      setEmployee(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  function login(data) {
    localStorage.setItem("employee", JSON.stringify(data));
    setEmployee(data);
  }

  function logout() {
    localStorage.removeItem("employee");
    setEmployee(null);
  }

  return (
    <EmployeeAuthContext.Provider
      value={{ employee, isAuthenticated: !!employee, loading, login, logout }}
    >
      {children}
    </EmployeeAuthContext.Provider>
  );
}

export function useEmployeeAuth() {
  return useContext(EmployeeAuthContext);
}
