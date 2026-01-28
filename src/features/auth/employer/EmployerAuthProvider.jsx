import { createContext, useContext, useEffect, useState } from "react";

const EmployerAuthContext = createContext(null);

export function EmployerAuthProvider({ children }) {
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega sessão persistida
  useEffect(() => {
    const stored = localStorage.getItem("employer");
    if (stored) {
      setEmployer(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  function login(data) {
    localStorage.setItem("employer", JSON.stringify(data));
    setEmployer(data);
  }

  function logout() {
    localStorage.removeItem("employer");
    setEmployer(null);
  }

  return (
    <EmployerAuthContext.Provider
      value={{ employer, isAuthenticated: !!employer, loading, login, logout }}
    >
      {children}
    </EmployerAuthContext.Provider>
  );
}

export function useEmployerAuth() {
  return useContext(EmployerAuthContext);
}
