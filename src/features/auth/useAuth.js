// src/features/auth/useAuth.js
import { useEffect, useState } from "react";

export function useAuth() {
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return {
    employer,
    isAuthenticated: !!employer,
    loading,
    login,
    logout,
  };
}
