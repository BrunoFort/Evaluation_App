// src/features/auth/RequireEmployerAuth.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useEmployerAuth } from "./useEmployerAuth";

export function RequireEmployerAuth({ children }) {
  const { employer, loading } = useEmployerAuth();
  const location = useLocation();

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!employer) {
    return <Navigate to="/employer/login" state={{ from: location }} replace />;
  }

  return children;
}
